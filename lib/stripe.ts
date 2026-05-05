import Stripe from "stripe";

export const hasStripeSecret = Boolean(process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_missing");
