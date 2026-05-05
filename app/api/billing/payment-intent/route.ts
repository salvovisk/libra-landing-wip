import { NextResponse } from "next/server";

import {
  getInvoiceClientSecret,
  getSetupClientSecret,
  hasTrialMarker,
  hasUsedTrial,
  isBlockingSubscriptionStatus,
  isPaymentIntentBody,
  normalizeTrialDays,
  normalizeVatNumber,
  resolveAllowedTrialDays,
} from "@/lib/billing-helpers";
import { hasStripeSecret, stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasStripeSecret) {
    return NextResponse.json({ ok: false, error: "STRIPE_SECRET_KEY non configurata." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  if (!isPaymentIntentBody(body)) {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  try {
    const price = await stripe.prices.retrieve(body.priceId, { expand: ["product"] });

    if (!price.active || price.unit_amount == null || !price.recurring) {
      return NextResponse.json({ ok: false, error: "Prezzo non disponibile." }, { status: 404 });
    }

    const product = typeof price.product === "string" || "deleted" in price.product ? null : price.product;
    if (!product?.active) {
      return NextResponse.json({ ok: false, error: "Piano non disponibile." }, { status: 404 });
    }
    const configuredTrialDays = normalizeTrialDays(product.metadata, price.metadata);
    const existingCustomers = await stripe.customers.list({
      email: body.billingDetails.email,
      limit: 10,
    });
    let previousTrialUsed = false;

    for (const existingCustomer of existingCustomers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: existingCustomer.id,
        status: "all",
        limit: 10,
      });
      const existingSubscription = subscriptions.data.find((subscription) =>
        isBlockingSubscriptionStatus(subscription.status)
      );

      if (existingSubscription) {
        return NextResponse.json(
          {
            ok: false,
            error: "Esiste già un abbonamento associato a questa email. Accedi alla piattaforma o contattaci per modificarlo.",
          },
          { status: 409 }
        );
      }

      previousTrialUsed ||= hasTrialMarker(existingCustomer.metadata) ||
        subscriptions.data.some((subscription) => hasUsedTrial(subscription));
    }
    const trialDays = resolveAllowedTrialDays(configuredTrialDays, previousTrialUsed);

    const customer = await stripe.customers.create({
      email: body.billingDetails.email,
      name: body.billingDetails.invoiceRequested && body.billingDetails.companyName
        ? body.billingDetails.companyName
        : body.billingDetails.name,
      address: {
        line1: body.billingDetails.addressLine1,
        postal_code: body.billingDetails.postalCode,
        city: body.billingDetails.city,
        country: "IT",
      },
      metadata: {
        planId: price.metadata.planId || product.metadata.planId || "",
        priceId: price.id,
        billingName: body.billingDetails.name,
        invoiceRequested: String(body.billingDetails.invoiceRequested),
        trialUsed: configuredTrialDays > 0 || previousTrialUsed ? "true" : "false",
        trialWaived: previousTrialUsed && configuredTrialDays > 0 ? "true" : "false",
        vatNumber: body.billingDetails.vatNumber ?? "",
        taxCode: body.billingDetails.taxCode ?? "",
        pec: body.billingDetails.pec ?? "",
      },
    });
    const vatNumber = normalizeVatNumber(body.billingDetails.vatNumber);
    if (body.billingDetails.invoiceRequested && vatNumber) {
      await stripe.customers.createTaxId(customer.id, {
        type: "eu_vat",
        value: vatNumber,
      }).catch((err: unknown) => {
        console.warn("[billing/payment-intent] VAT tax id not attached", err);
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice", "pending_setup_intent"],
      ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
      metadata: {
        planId: price.metadata.planId || product.metadata.planId || "",
        priceId: price.id,
        trialUsed: configuredTrialDays > 0 || previousTrialUsed ? "true" : "false",
        trialWaived: previousTrialUsed && configuredTrialDays > 0 ? "true" : "false",
      },
    });

    const invoice = typeof subscription.latest_invoice === "string" ? null : subscription.latest_invoice;
    const paymentClientSecret = getInvoiceClientSecret(invoice);

    if (paymentClientSecret) {
      return NextResponse.json({
        ok: true,
        clientSecret: paymentClientSecret,
        intentType: "payment",
        subscriptionId: subscription.id,
        trialWaived: previousTrialUsed && configuredTrialDays > 0,
      });
    }

    const setupClientSecret = getSetupClientSecret(subscription);
    if (setupClientSecret) {
      return NextResponse.json({
        ok: true,
        clientSecret: setupClientSecret,
        intentType: "setup",
        subscriptionId: subscription.id,
        trialWaived: previousTrialUsed && configuredTrialDays > 0,
      });
    }

    console.warn("[billing/payment-intent] Falling back to setup intent", {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      latestInvoice: invoice
        ? {
            id: invoice.id,
            status: invoice.status,
            amountDue: invoice.amount_due,
            confirmationSecret: Boolean(invoice.confirmation_secret),
          }
        : null,
      pendingSetupIntent: Boolean(subscription.pending_setup_intent),
    });

    if (subscription.status === "incomplete") {
      await stripe.subscriptions.cancel(subscription.id);
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: "off_session",
      automatic_payment_methods: { enabled: true },
      metadata: {
        planId: price.metadata.planId || product.metadata.planId || "",
        priceId: price.id,
        trialUsed: configuredTrialDays > 0 || previousTrialUsed ? "true" : "false",
        trialWaived: previousTrialUsed && configuredTrialDays > 0 ? "true" : "false",
      },
    });

    if (!setupIntent.client_secret) {
      throw new Error("Missing SetupIntent client secret.");
    }

    return NextResponse.json({
      ok: true,
      clientSecret: setupIntent.client_secret,
      intentType: "setup",
      customerId: customer.id,
      priceId: price.id,
      trialWaived: previousTrialUsed && configuredTrialDays > 0,
    });
  } catch (err) {
    console.error("[billing/payment-intent]", err);
    return NextResponse.json(
      { ok: false, error: "Impossibile preparare il pagamento. Riprova tra qualche momento." },
      { status: 502 }
    );
  }
}
