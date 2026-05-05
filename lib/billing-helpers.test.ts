import { describe, expect, it } from "vitest";

import {
  getInvoiceClientSecret,
  getPlanCtaLabel,
  getSetupClientSecret,
  hasTrialMarker,
  hasUsedTrial,
  isItalianInvoiceDestination,
  isItalianPostalCode,
  isItalianTaxCode,
  isItalianVatNumber,
  isBlockingSubscriptionStatus,
  isPaymentIntentBody,
  normalizeTrialDays,
  normalizeVatNumber,
  resolveBilling,
  resolveAllowedTrialDays,
  resolvePersona,
  splitMetadataList,
} from "@/lib/billing-helpers";

const validBillingDetails = {
  email: "cliente@example.com",
  name: "Mario Rossi",
  addressLine1: "Via Roma 1",
  postalCode: "00100",
  city: "Roma",
  country: "IT",
  invoiceRequested: false,
} as const;

describe("billing helpers", () => {
  it("validates required billing details for a payment intent request", () => {
    expect(isPaymentIntentBody({
      priceId: "price_123",
      billingDetails: validBillingDetails,
    })).toBe(true);
  });

  it("requires company name and VAT number when invoice is requested", () => {
    expect(isPaymentIntentBody({
      priceId: "price_123",
      billingDetails: {
        ...validBillingDetails,
        invoiceRequested: true,
      },
    })).toBe(false);

    expect(isPaymentIntentBody({
      priceId: "price_123",
      billingDetails: {
        ...validBillingDetails,
        invoiceRequested: true,
        companyName: "Studio Rossi SRL",
        vatNumber: "12345678901",
      },
    })).toBe(true);
  });

  it("normalizes Italian VAT numbers for Stripe EU VAT tax ids", () => {
    expect(normalizeVatNumber("123 456 78901")).toBe("IT12345678901");
    expect(normalizeVatNumber("it12345678901")).toBe("IT12345678901");
    expect(normalizeVatNumber(undefined)).toBeNull();
  });

  it("validates Italian fiscal field formats", () => {
    expect(isItalianPostalCode("00100")).toBe(true);
    expect(isItalianPostalCode("100")).toBe(false);

    expect(isItalianVatNumber("IT12345678901")).toBe(true);
    expect(isItalianVatNumber("12345678901")).toBe(true);
    expect(isItalianVatNumber("123")).toBe(false);

    expect(isItalianTaxCode("RSSMRA80A01H501U")).toBe(true);
    expect(isItalianTaxCode("12345678901")).toBe(true);
    expect(isItalianTaxCode("")).toBe(true);

    expect(isItalianInvoiceDestination("azienda@pec.it")).toBe(true);
    expect(isItalianInvoiceDestination("ABC1234")).toBe(true);
    expect(isItalianInvoiceDestination("0000000")).toBe(true);
    expect(isItalianInvoiceDestination("ABC")).toBe(false);
  });

  it("normalizes trial days and preserves explicit no-trial as 0", () => {
    expect(normalizeTrialDays({ trialDays: "30" }, {})).toBe(30);
    expect(normalizeTrialDays({}, { trialDays: "14" })).toBe(14);
    expect(normalizeTrialDays({ trialDays: "0" }, {})).toBe(0);
    expect(normalizeTrialDays({ trialDays: "not-a-number" }, {})).toBe(0);
  });

  it("splits metadata features from supported dashboard formats", () => {
    expect(splitMetadataList("Buste paga|INPS,Archivio\nAssistenza")).toEqual([
      "Buste paga",
      "INPS",
      "Archivio",
      "Assistenza",
    ]);
  });

  it("resolves persona and billing from metadata or recurring interval", () => {
    expect(resolvePersona("private-base", undefined)).toBe("private");
    expect(resolvePersona("custom-id", "pro")).toBe("pro");
    expect(resolvePersona("custom-id", undefined)).toBeNull();

    expect(resolveBilling({ metadata: { billing: "monthly" }, recurring: null })).toBe("monthly");
    expect(resolveBilling({ metadata: {}, recurring: { interval: "year" } })).toBe("yearly");
    expect(resolveBilling({ metadata: {}, recurring: { interval: "week" } })).toBeNull();
  });

  it("extracts client secrets from modern and legacy Stripe subscription responses", () => {
    expect(getInvoiceClientSecret({
      confirmation_secret: { client_secret: "pi_secret_modern", type: "payment_intent" },
    } as never)).toBe("pi_secret_modern");

    expect(getInvoiceClientSecret({
      payment_intent: { client_secret: "pi_secret_legacy" },
    } as never)).toBe("pi_secret_legacy");

    expect(getSetupClientSecret({
      pending_setup_intent: { client_secret: "seti_secret" },
    } as never)).toBe("seti_secret");
  });

  it("shows trial CTA only when live metadata has positive trial days", () => {
    expect(getPlanCtaLabel({
      name: "Premium",
      cta: "Inizia con Premium",
      trialDays: 30,
    })).toBe("Prova gratis 30 giorni");

    expect(getPlanCtaLabel({
      name: "Base",
      cta: "Prova gratis 30 giorni",
      trialDays: 0,
    })).toBe("Scegli Base");

    expect(getPlanCtaLabel({
      name: "Enterprise",
      cta: "Contattaci",
      contactOnly: true,
      trialDays: 30,
    })).toBe("Contattaci");
  });

  it("blocks duplicate checkout for statuses that can already consume a plan", () => {
    expect(isBlockingSubscriptionStatus("active")).toBe(true);
    expect(isBlockingSubscriptionStatus("trialing")).toBe(true);
    expect(isBlockingSubscriptionStatus("incomplete")).toBe(true);
    expect(isBlockingSubscriptionStatus("past_due")).toBe(true);
    expect(isBlockingSubscriptionStatus("canceled")).toBe(false);
    expect(isBlockingSubscriptionStatus("incomplete_expired")).toBe(false);
  });

  it("detects previous trial usage even after the subscription is no longer active", () => {
    expect(hasTrialMarker({ trialUsed: "true" })).toBe(true);
    expect(hasTrialMarker({ trialUsed: "false" })).toBe(false);

    expect(hasUsedTrial({
      trial_start: 1777900000,
      trial_end: 1778000000,
      metadata: {},
    })).toBe(true);

    expect(hasUsedTrial({
      trial_start: null,
      trial_end: null,
      metadata: { trialUsed: "true" },
    })).toBe(true);

    expect(hasUsedTrial({
      trial_start: null,
      trial_end: null,
      metadata: {},
    })).toBe(false);
  });

  it("waives configured trial days for emails that already used a trial", () => {
    expect(resolveAllowedTrialDays(30, false)).toBe(30);
    expect(resolveAllowedTrialDays(30, true)).toBe(0);
    expect(resolveAllowedTrialDays(0, true)).toBe(0);
  });
});
