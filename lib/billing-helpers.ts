import type Stripe from "stripe";

import type { BillingDetails } from "@/lib/billing-types";
import type { Billing, Persona } from "@/lib/site-data";

export type PaymentIntentBody = {
  priceId: string;
  billingDetails: BillingDetails;
};

export function isItalianPostalCode(value: unknown) {
  return typeof value === "string" && /^[0-9]{5}$/.test(value.trim());
}

export function isItalianVatNumber(value: unknown) {
  return typeof value === "string" && /^(IT)?[0-9]{11}$/i.test(value.replace(/\s+/g, ""));
}

export function isItalianTaxCode(value: unknown) {
  if (value == null || value === "") return false;
  return typeof value === "string" && /^[A-Za-z0-9]{11,16}$/.test(value.replace(/\s+/g, ""));
}

export function isItalianTaxCodeOptional(value: unknown) {
  if (value == null || value === "") return true;
  return isItalianTaxCode(value);
}

export function isItalianInvoiceDestination(value: unknown) {
  if (value == null || value === "") return true;
  return typeof value === "string" && (
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim()) ||
    /^[A-Za-z0-9]{7}$/.test(value.trim()) ||
    value.trim() === "0000000"
  );
}

export function isPaymentIntentBody(body: unknown): body is PaymentIntentBody {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  const billing = data.billingDetails as Record<string, unknown> | undefined;

  return Boolean(
    typeof data.priceId === "string" &&
      data.priceId.startsWith("price_") &&
      billing &&
      typeof billing.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email) &&
      typeof billing.name === "string" &&
      billing.name.trim().length > 1 &&
      typeof billing.addressLine1 === "string" &&
      billing.addressLine1.trim().length > 3 &&
      isItalianPostalCode(billing.postalCode) &&
      typeof billing.city === "string" &&
      billing.city.trim().length > 1 &&
      billing.country === "IT" &&
      typeof billing.invoiceRequested === "boolean" &&
      (
        !billing.invoiceRequested ||
        (
          typeof billing.companyName === "string" &&
          billing.companyName.trim().length > 1 &&
          (isItalianVatNumber(billing.vatNumber) || isItalianTaxCode(billing.taxCode)) &&
          (billing.vatNumber == null || billing.vatNumber === "" || isItalianVatNumber(billing.vatNumber)) &&
          (billing.taxCode == null || billing.taxCode === "" || isItalianTaxCodeOptional(billing.taxCode)) &&
          isItalianInvoiceDestination(billing.pec)
        )
      )
  );
}

export function normalizeVatNumber(value: string | undefined) {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, "").toUpperCase();
  return cleaned.startsWith("IT") ? cleaned : `IT${cleaned}`;
}

export function splitMetadataList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\n|\||,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function resolvePersona(planId: string, metadataPersona: string | undefined): Persona | null {
  if (metadataPersona === "private" || metadataPersona === "pro") return metadataPersona;
  if (planId.startsWith("private-")) return "private";
  if (planId.startsWith("pro-")) return "pro";
  return null;
}

export function resolveBilling(price: Pick<Stripe.Price, "metadata" | "recurring">): Billing | null {
  if (price.metadata.billing === "monthly") return "monthly";
  if (price.metadata.billing === "yearly") return "yearly";
  if (price.recurring?.interval === "month") return "monthly";
  if (price.recurring?.interval === "year") return "yearly";
  return null;
}

export function normalizeTrialDays(productMetadata: Stripe.Metadata, priceMetadata: Stripe.Metadata) {
  const trialDays = Number(productMetadata.trialDays ?? priceMetadata.trialDays ?? 0);
  return Number.isFinite(trialDays) && trialDays > 0 ? trialDays : 0;
}

export function getInvoiceClientSecret(invoice: Stripe.Invoice | null): string | null {
  if (invoice?.confirmation_secret?.client_secret) {
    return invoice.confirmation_secret.client_secret;
  }

  const legacyInvoice = invoice as (Stripe.Invoice & {
    payment_intent?: string | Stripe.PaymentIntent | null;
  }) | null;
  const paymentIntent = legacyInvoice?.payment_intent;
  if (paymentIntent && typeof paymentIntent !== "string") {
    return paymentIntent.client_secret;
  }

  return null;
}

export function getSetupClientSecret(subscription: Stripe.Subscription): string | null {
  const setupIntent = subscription.pending_setup_intent;
  if (setupIntent && typeof setupIntent !== "string") {
    return setupIntent.client_secret;
  }

  return null;
}

export function getPlanCtaLabel({
  contactOnly,
  trialDays,
  cta,
  name,
}: {
  contactOnly?: boolean;
  trialDays?: number;
  cta: string;
  name: string;
}) {
  if (!contactOnly && trialDays && trialDays > 0) {
    return `Prova gratis ${trialDays} giorni`;
  }

  if (!contactOnly && /prova|gratis|trial/i.test(cta)) {
    return `Scegli ${name}`;
  }

  return cta;
}

// "incomplete" excluded: it means payment never attempted (abandoned checkout).
// Treating it as blocking would permanently lock an email after one abandoned form submission.
const blockingSubscriptionStatuses = new Set(["active", "trialing", "past_due"]);

export function isBlockingSubscriptionStatus(status: string) {
  return blockingSubscriptionStatuses.has(status);
}

export function hasUsedTrial(subscription: Pick<Stripe.Subscription, "status" | "trial_start" | "trial_end" | "metadata">) {
  // Only count a trial as used if Stripe actually started one (trial_start set) AND the
  // subscription reached a non-abandoned state. Checking metadata.trialUsed alone was
  // unreliable because it was previously written at customer-creation time, before payment.
  const stripeTrialRan = Boolean(subscription.trial_start);
  const wasActivated = subscription.status !== "incomplete" && subscription.status !== "incomplete_expired";
  return stripeTrialRan && wasActivated;
}

export function hasTrialMarker(metadata: Stripe.Metadata | undefined) {
  return metadata?.trialUsed === "true";
}

export function resolveAllowedTrialDays(configuredTrialDays: number, previousTrialUsed: boolean) {
  return previousTrialUsed ? 0 : configuredTrialDays;
}
