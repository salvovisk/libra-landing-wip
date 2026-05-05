import { NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  normalizeTrialDays,
  resolveBilling,
  resolvePersona,
  splitMetadataList,
} from "@/lib/billing-helpers";
import type { BillingPlansPayload, LiveBillingPlan } from "@/lib/billing-types";
import { pricingEngineCopy, type Persona } from "@/lib/site-data";
import { hasStripeSecret, stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const planOrder = new Map(
  Object.values(pricingEngineCopy.plans)
    .flat()
    .map((plan, index) => [plan.id, index])
);

function getProduct(price: Stripe.Price): Stripe.Product | null {
  if (typeof price.product === "string" || "deleted" in price.product) return null;
  return price.product;
}

function buildBasePlan(price: Stripe.Price, product: Stripe.Product, planId: string): LiveBillingPlan | null {
  const persona = resolvePersona(planId, product.metadata.persona);
  if (!persona) return null;

  const staticPlan = pricingEngineCopy.plans[persona].find((plan) => plan.id === planId);
  const features = splitMetadataList(product.metadata.features ?? price.metadata.features);
  const trialDays = normalizeTrialDays(product.metadata, price.metadata);

  return {
    id: planId,
    persona,
    name: product.metadata.displayName ?? staticPlan?.name ?? product.name,
    description: product.description ?? staticPlan?.description ?? "",
    cta: product.metadata.cta ?? staticPlan?.cta ?? "Scegli piano",
    featured: product.metadata.featured === "true" || Boolean(staticPlan?.featured),
    badge: product.metadata.badge || staticPlan?.badge,
    note: product.metadata.note || staticPlan?.note,
    features: features.length > 0 ? features : staticPlan?.featureSummary ?? [],
    featureSummary: features.length > 0 ? features : staticPlan?.featureSummary ?? [],
    trialDays,
    prices: {},
  };
}

export async function GET() {
  if (!hasStripeSecret) {
    return NextResponse.json(
      { ok: false, error: "STRIPE_SECRET_KEY non configurata." },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  try {
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
      limit: 100,
      type: "recurring",
    });

    const livePlans = new Map<string, LiveBillingPlan>();
    const selectedPriceCreated = new Map<string, number>();

    for (const price of prices.data) {
      const product = getProduct(price);
      if (!product || !product.active || price.unit_amount == null) continue;

      const planId = price.metadata.planId || product.metadata.planId;
      const billing = resolveBilling(price);
      if (!planId || !billing) continue;
      const priceKey = `${planId}:${billing}`;
      const currentCreated = selectedPriceCreated.get(priceKey) ?? 0;
      if (price.created < currentCreated) continue;

      const plan = livePlans.get(planId) ?? buildBasePlan(price, product, planId);
      if (!plan) continue;

      plan.prices[billing] = {
        priceId: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        interval: price.recurring?.interval === "year" ? "year" : "month",
      };
      selectedPriceCreated.set(priceKey, price.created);
      livePlans.set(planId, plan);
    }

    const payload: BillingPlansPayload = {
      ok: true,
      plans: {
        private: [],
        pro: [],
      },
    };

    for (const plan of livePlans.values()) {
      payload.plans[plan.persona].push(plan);
    }

    for (const persona of Object.keys(payload.plans) as Persona[]) {
      payload.plans[persona].sort((a, b) => (planOrder.get(a.id) ?? 999) - (planOrder.get(b.id) ?? 999));
    }

    const enterprisePlan = pricingEngineCopy.plans.pro.find((plan) => plan.contactOnly);
    if (enterprisePlan) {
      payload.plans.pro.push({
        id: enterprisePlan.id,
        persona: "pro",
        name: enterprisePlan.name,
        description: enterprisePlan.description,
        cta: enterprisePlan.cta,
        featured: Boolean(enterprisePlan.featured),
        badge: enterprisePlan.badge,
        note: enterprisePlan.note,
        contactOnly: true,
        trialDays: 0,
        features: enterprisePlan.featureSummary,
        featureSummary: enterprisePlan.featureSummary,
        prices: {},
      });
    }

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("[billing/plans]", err);
    return NextResponse.json(
      { ok: false, error: "Impossibile sincronizzare i piani Stripe." },
      { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
