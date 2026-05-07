import { NextResponse } from "next/server";

import { hasUsedTrial, isBlockingSubscriptionStatus, normalizeTrialDays, resolveAllowedTrialDays } from "@/lib/billing-helpers";
import { getPostHogClient } from "@/lib/posthog-server";
import { hasStripeSecret, stripe } from "@/lib/stripe";

async function cleanupOrphanCustomers(email: string, keepCustomerId: string) {
  let cursor: string | undefined;
  while (true) {
    const others = await stripe.customers.list({
      email,
      limit: 100,
      ...(cursor ? { starting_after: cursor } : {}),
    });
    for (const c of others.data) {
      if (c.id === keepCustomerId) continue;
      const subs = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 1 });
      if (subs.data.length === 0) {
        await stripe.customers.del(c.id).catch(() => {});
      }
    }
    if (!others.has_more) break;
    cursor = others.data[others.data.length - 1]!.id;
  }
}

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

    // Verify customer exists and belongs to this Stripe account.
    const customer = await stripe.customers.retrieve(body.customerId);
    if ("deleted" in customer) {
      return NextResponse.json({ ok: false, error: "Cliente non trovato." }, { status: 404 });
    }

    // Guard against duplicate active subscriptions — this endpoint can be called
    // independently of payment-intent, so we must check here too.
    const existingSubscriptions = await stripe.subscriptions.list({
      customer: body.customerId,
      status: "all",
      limit: 100,
    });
    const blockingSub = existingSubscriptions.data.find(
      (s) => isBlockingSubscriptionStatus(s.status) && s.status !== "incomplete"
    );
    if (blockingSub) {
      return NextResponse.json(
        { ok: false, error: "Esiste già un abbonamento attivo per questo cliente." },
        { status: 409 }
      );
    }

    // Determine trial eligibility from subscription history.
    let previousTrialUsed = customer.metadata?.trialWaived === "true";
    if (!previousTrialUsed) {
      previousTrialUsed = existingSubscriptions.data.some((s) => hasUsedTrial(s));
    }

    const trialDays = resolveAllowedTrialDays(configuredTrialDays, previousTrialUsed);

    let paymentMethodId = body.paymentMethodId;

    if (!paymentMethodId && body.setupIntentId) {
      const setupIntent = await stripe.setupIntents.retrieve(body.setupIntentId);

      // Verify this setup intent belongs to the claimed customer — prevents cross-customer PM attachment.
      if (setupIntent.customer !== body.customerId || setupIntent.status !== "succeeded") {
        return NextResponse.json({ ok: false, error: "Metodo di pagamento non confermato." }, { status: 409 });
      }

      paymentMethodId = typeof setupIntent.payment_method === "string" ? setupIntent.payment_method : undefined;
    }

    if (!paymentMethodId) {
      return NextResponse.json({ ok: false, error: "Metodo di pagamento non disponibile." }, { status: 400 });
    }

    // Verify the payment method belongs to this customer before attaching.
    const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (pm.customer && pm.customer !== body.customerId) {
      return NextResponse.json({ ok: false, error: "Metodo di pagamento non valido." }, { status: 400 });
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

    // Fire-and-forget: delete orphan customers with same email that have no subscriptions.
    if (customer.email) {
      cleanupOrphanCustomers(customer.email, body.customerId).catch((err) => {
        console.warn("[billing/subscription] orphan cleanup failed", err);
      });
    }

    const posthog = getPostHogClient();
    const distinctId = customer.email ?? body.customerId;
    posthog.capture({
      distinctId,
      event: "subscription_created",
      properties: {
        subscription_id: subscription.id,
        subscription_status: subscription.status,
        price_id: body.priceId,
        plan_id: price.metadata.planId || product.metadata.planId || "",
        plan_name: product.name,
        amount: price.unit_amount,
        currency: price.currency,
        billing_interval: price.recurring?.interval,
        trial_days: trialDays,
        trial_waived: previousTrialUsed,
      },
    });
    posthog.identify({
      distinctId,
      properties: {
        subscription_status: subscription.status,
        subscribed_plan_id: price.metadata.planId || product.metadata.planId || "",
        subscribed_plan_name: product.name,
        billing_interval: price.recurring?.interval,
        trial_active: trialDays > 0,
      },
    });

    return NextResponse.json({
      ok: true,
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (err) {
    console.error("[billing/subscription]", err);
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: "anonymous",
      event: "subscription_creation_failed",
      properties: {
        error: err instanceof Error ? err.message : String(err),
      },
    });
    return NextResponse.json(
      { ok: false, error: "Impossibile attivare l'abbonamento. Riprova tra qualche momento." },
      { status: 502 }
    );
  }
}
