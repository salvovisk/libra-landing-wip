import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { resolvePriceId, getTrialDays } from "@/lib/site-data";

export const runtime = "nodejs";

type CheckoutBody = {
  planId: string;
  billingCycle: "monthly" | "yearly";
};

function isValidBody(body: unknown): body is CheckoutBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.planId === "string" &&
    b.planId.length > 0 &&
    (b.billingCycle === "monthly" || b.billingCycle === "yearly")
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidBody(body)) {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const { planId, billingCycle } = body;
  const priceId = resolvePriceId(planId, billingCycle);

  if (!priceId) {
    return NextResponse.json(
      { ok: false, error: "Piano non trovato." },
      { status: 404 }
    );
  }

  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const trialDays = getTrialDays(planId);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      locale: "it",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/checkout/success?plan=${planId}&billing=${billingCycle}`,
      cancel_url: `${siteUrl}/checkout/cancel?plan=${planId}`,
      ...(trialDays
        ? { subscription_data: { trial_period_days: trialDays } }
        : {}),
    });

    if (!session.url) throw new Error("Nessun URL di sessione ricevuto.");

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { ok: false, error: "Impossibile avviare il checkout. Riprova tra qualche momento." },
      { status: 502 }
    );
  }
}
