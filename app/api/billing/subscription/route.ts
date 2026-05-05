import { NextResponse } from "next/server";

import { hasUsedTrial, normalizeTrialDays, resolveAllowedTrialDays } from "@/lib/billing-helpers";
import { hasStripeSecret, stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubscriptionBody = {
  customerId: string;
  priceId: string;
  paymentMethodId?: string;
  setupIntentId?: string;
};

function isBody(body: unknown): body is SubscriptionBody {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.customerId === "string" &&
    data.customerId.startsWith("cus_") &&
    typeof data.priceId === "string" &&
    data.priceId.startsWith("price_") &&
    (
      (typeof data.paymentMethodId === "string" && data.paymentMethodId.startsWith("pm_")) ||
      (typeof data.setupIntentId === "string" && data.setupIntentId.startsWith("seti_"))
    )
  );
}

export async function POST(request: Request) {
  if (!hasStripeSecret) {
    return NextResponse.json({ ok: false, error: "STRIPE_SECRET_KEY non configurata." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  if (!isBody(body)) {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  try {
    const price = await stripe.prices.retrieve(body.priceId, { expand: ["product"] });
    const product = typeof price.product === "string" || "deleted" in price.product ? null : price.product;
    if (!price.active || !product?.active) {
      return NextResponse.json({ ok: false, error: "Piano non disponibile." }, { status: 404 });
    }
    const configuredTrialDays = normalizeTrialDays(product.metadata, price.metadata);

    // Determine if trial was already waived by a previous step (payment-intent sets this on the customer)
    // or fall back to a full subscription history scan for customers created via other paths.
    let previousTrialUsed = false;
    const customer = await stripe.customers.retrieve(body.customerId);
    if (!("deleted" in customer)) {
      previousTrialUsed = customer.metadata?.trialWaived === "true";

      if (!previousTrialUsed) {
        const subscriptions = await stripe.subscriptions.list({
          customer: body.customerId,
          status: "all",
          limit: 10,
        });
        previousTrialUsed = subscriptions.data.some((s) => hasUsedTrial(s));
      }
    }

    const trialDays = resolveAllowedTrialDays(configuredTrialDays, previousTrialUsed);
    let paymentMethodId = body.paymentMethodId;

    if (!paymentMethodId && body.setupIntentId) {
      const setupIntent = await stripe.setupIntents.retrieve(body.setupIntentId);
      if (setupIntent.customer !== body.customerId || setupIntent.status !== "succeeded") {
        return NextResponse.json({ ok: false, error: "Metodo di pagamento non confermato." }, { status: 409 });
      }
      paymentMethodId = typeof setupIntent.payment_method === "string" ? setupIntent.payment_method : undefined;
    }

    if (!paymentMethodId) {
      return NextResponse.json({ ok: false, error: "Metodo di pagamento non disponibile." }, { status: 400 });
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: body.customerId,
    }).catch((err: unknown) => {
      const stripeErr = err as { code?: string };
      if (stripeErr.code !== "resource_already_exists") throw err;
    });

    await stripe.customers.update(body.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: body.customerId,
      items: [{ price: body.priceId }],
      default_payment_method: paymentMethodId,
      payment_settings: { save_default_payment_method: "on_subscription" },
      ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
      metadata: {
        planId: price.metadata.planId || product.metadata.planId || "",
        priceId: body.priceId,
        trialUsed: configuredTrialDays > 0 || previousTrialUsed ? "true" : "false",
        trialWaived: previousTrialUsed && configuredTrialDays > 0 ? "true" : "false",
      },
    });

    return NextResponse.json({
      ok: true,
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (err) {
    console.error("[billing/subscription]", err);
    return NextResponse.json(
      { ok: false, error: "Impossibile attivare l'abbonamento. Riprova tra qualche momento." },
      { status: 502 }
    );
  }
}
