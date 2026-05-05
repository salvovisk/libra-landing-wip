import type { Billing, Persona } from "@/lib/site-data";

export type LiveBillingPlan = {
  id: string;
  persona: Persona;
  name: string;
  description: string;
  cta: string;
  featured: boolean;
  badge?: string;
  note?: string;
  contactOnly?: boolean;
  features: string[];
  featureSummary: string[];
  trialDays?: number;
  prices: Partial<Record<Billing, {
    priceId: string;
    amount: number;
    currency: string;
    interval: "month" | "year";
  }>>;
};

export type BillingPlansPayload = {
  ok: true;
  plans: Record<Persona, LiveBillingPlan[]>;
};

export type BillingDetails = {
  email: string;
  name: string;
  addressLine1: string;
  postalCode: string;
  city: string;
  country: "IT";
  invoiceRequested: boolean;
  companyName?: string;
  vatNumber?: string;
  taxCode?: string;
  pec?: string;
};
