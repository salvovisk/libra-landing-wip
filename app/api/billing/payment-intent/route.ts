import { NextResponse } from "next/server";

import {
  hasUsedTrial,
  isBlockingSubscriptionStatus,
  isPaymentIntentBody,
  normalizeVatNumber,
} from "@/lib/billing-helpers";
import { getPostHogClient } from "@/lib/posthog-server";
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

    // Scan all customers for this email: block if active sub exists, track trial history,
    // collect orphan customer IDs (no subscriptions ever) for deletion.
    let previousTrialUsed = false;
    const orphanCustomerIds: string[] = [];
    let cursor: string | undefined;

    outerLoop: while (true) {
      const existingCustomers = await stripe.customers.list({
        email: body.billingDetails.email,
        limit: 100,
        ...(cursor ? { starting_after: cursor } : {}),
      });

      for (const existingCustomer of existingCustomers.data) {
        let subCursor: string | undefined;
        let hasAnySub = false;

        while (true) {
          const subscriptions = await stripe.subscriptions.list({
            customer: existingCustomer.id,
            status: "all",
            limit: 100,
            ...(subCursor ? { starting_after: subCursor } : {}),
          });

          if (subscriptions.data.length > 0) hasAnySub = true;

          for (const sub of subscriptions.data) {
            if (isBlockingSubscriptionStatus(sub.status)) {
              return NextResponse.json(
                {
                  ok: false,
                  error: "Esiste già un abbonamento associato a questa email. Accedi alla piattaforma o contattaci per modificarlo.",
                },
                { status: 409 }
              );
            }
          }

          previousTrialUsed ||= subscriptions.data.some((s) => hasUsedTrial(s));

          if (!subscriptions.has_more) break;
          subCursor = subscriptions.data[subscriptions.data.length - 1]!.id;
        }

        if (!hasAnySub) {
          orphanCustomerIds.push(existingCustomer.id);
        }
      }

      if (!existingCustomers.has_more) break outerLoop;
      cursor = existingCustomers.data[existingCustomers.data.length - 1]!.id;
    }

    // Delete orphan customers before creating a new one — keeps Stripe clean.
    await Promise.all(orphanCustomerIds.map((id) => stripe.customers.del(id).catch(() => {})));

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

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: "off_session",
      automatic_payment_methods: { enabled: true },
      metadata: {
        planId: price.metadata.planId || product.metadata.planId || "",
        priceId: price.id,
      },
    });

    if (!setupIntent.client_secret) {
      throw new Error("Missing SetupIntent client secret.");
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: body.billingDetails.email,
      event: "checkout_initiated",
      properties: {
        price_id: price.id,
        plan_id: price.metadata.planId || product.metadata.planId || "",
        plan_name: product.name,
        amount: price.unit_amount,
        currency: price.currency,
        billing_interval: price.recurring?.interval,
        trial_waived: previousTrialUsed,
        invoice_requested: body.billingDetails.invoiceRequested,
      },
    });
    posthog.identify({
      distinctId: body.billingDetails.email,
      properties: {
        email: body.billingDetails.email,
        name: body.billingDetails.name,
        plan_id: price.metadata.planId || product.metadata.planId || "",
        plan_name: product.name,
        billing_interval: price.recurring?.interval,
        invoice_requested: body.billingDetails.invoiceRequested,
      },
    });

    return NextResponse.json({
      ok: true,
      clientSecret: setupIntent.client_secret,
      intentType: "setup",
      customerId: customer.id,
      priceId: price.id,
      trialWaived: previousTrialUsed,
    });
  } catch (err) {
    console.error("[billing/payment-intent]", err);
    return NextResponse.json(
      { ok: false, error: "Impossibile preparare il pagamento. Riprova tra qualche momento." },
      { status: 502 }
    );
  }
}
