import Stripe from "stripe";
import { readFileSync } from "fs";

// Read key directly from .env.local
const env = readFileSync(".env.local", "utf8");
const keyLine = env.split("\n").find((l) => l.startsWith("STRIPE_SECRET_KEY="));
const key = keyLine?.split("=")[1]?.trim();

if (!key || key === "sk_test_REPLACE_WITH_YOUR_KEY") {
  console.error("No valid STRIPE_SECRET_KEY found in .env.local");
  process.exit(1);
}

const stripe = new Stripe(key);

const plans = [
  { id: "private-base",     name: "Libra Colf — Privato Base",     monthly: 499,   yearly: 4490  },
  { id: "private-premium",  name: "Libra Colf — Privato Premium",  monthly: 599,   yearly: 4990  },
  { id: "pro-base",         name: "Libra Colf — Pro Base",         monthly: 890,   yearly: 6490  },
  { id: "pro-premium",      name: "Libra Colf — Pro Premium",      monthly: 1990,  yearly: 16990 },
  { id: "pro-premium-plus", name: "Libra Colf — Pro Premium+",     monthly: 2590,  yearly: 24990 },
];

for (const plan of plans) {
  const product = await stripe.products.create({
    name: plan.name,
    metadata: { planId: plan.id },
  });
  const monthly = await stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: plan.monthly,
    recurring: { interval: "month" },
    metadata: { planId: plan.id, billing: "monthly" },
  });
  const yearly = await stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: plan.yearly,
    recurring: { interval: "year" },
    metadata: { planId: plan.id, billing: "yearly" },
  });
  console.log(`${plan.id}:`);
  console.log(`  monthly: "${monthly.id}",`);
  console.log(`  yearly:  "${yearly.id}",`);
}
