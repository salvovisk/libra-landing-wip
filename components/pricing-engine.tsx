"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Loader2, Minus, X } from "lucide-react";
import posthog from "posthog-js";

import { CheckoutSuccess, EmbeddedCheckout } from "@/components/embedded-checkout";
import { getPlanCtaLabel } from "@/lib/billing-helpers";
import type { BillingDetails, LiveBillingPlan } from "@/lib/billing-types";
import {
  pricingEngineCopy,
  type Billing,
  type Persona,
  type PricingCompareCategory,
  type PricingCompareValue,
} from "@/lib/site-data";

type PricingEngineProps = {
  persona: Persona;
  billingCycle: Billing;
  onBillingCycleChange: (billingCycle: Billing) => void;
};

type CheckoutIntent = {
  clientSecret: string;
  intentType: "payment" | "setup";
  subscriptionId?: string;
  customerId?: string;
  priceId?: string;
  trialWaived?: boolean;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.28, ease: "easeOut" },
};

function PriceDisplay({
  amount,
  monthlyAmount,
  contactOnly,
  featured,
  billingCycle,
}: {
  amount: string | null;
  monthlyAmount: string | null;
  contactOnly?: boolean;
  featured?: boolean;
  billingCycle: Billing;
}) {
  if (contactOnly) {
    return (
      <div className="mt-10 min-h-[76px]">
        <div className={`text-4xl font-extrabold tracking-[-0.06em] ${featured ? "text-white" : "text-ink"}`}>
          Contattaci
        </div>
        <p className={`mt-2 text-sm font-medium ${featured ? "text-blue-100/75" : "text-muted"}`}>
          Preventivo su misura e onboarding dedicato
        </p>
      </div>
    );
  }

  if (!amount) {
    return (
      <div className="mt-10 min-h-[76px]">
        <div className={`text-3xl font-extrabold tracking-[-0.05em] ${featured ? "text-white" : "text-ink"}`}>
          Non disponibile
        </div>
        <p className={`mt-2 text-sm font-medium ${featured ? "text-blue-100/75" : "text-muted"}`}>
          Prezzo non attivo per questo ciclo
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-[76px]">
      <div className="flex items-end gap-2">
        <div className="relative h-[56px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${billingCycle}-${amount}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={`text-5xl font-extrabold tracking-[-0.07em] ${featured ? "text-white" : "text-primary"}`}
            >
              €{amount}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className={`pb-1 text-sm font-semibold ${featured ? "text-blue-100/75" : "text-slate-500"}`}>
          /{billingCycle === "monthly" ? "mese" : "anno"}
        </span>
      </div>
      {billingCycle === "yearly" && monthlyAmount && (
        <p className={`mt-1 text-sm ${featured ? "text-blue-100/60" : "text-muted"}`}>
          <span className="line-through">€{monthlyAmount}/mese</span>
          {" · "}
          <span className={`font-semibold ${featured ? "text-white/80" : "text-emerald"}`}>-20%</span>
        </p>
      )}
    </div>
  );
}

function CompareValue({ value }: { value: PricingCompareValue }) {
  if (value === true) {
    return <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.4} />;
  }

  if (value === "minus") {
    return <Minus className="h-4 w-4 text-slate-300" strokeWidth={2.4} />;
  }

  if (value === "contact") {
    return <span className="text-sm font-semibold text-primary">Contattaci</span>;
  }

  return <span className="text-sm font-semibold text-slate-700">{value}</span>;
}

function DesktopCompareTable({
  categories,
  plans,
}: {
  categories: PricingCompareCategory[];
  plans: Array<Pick<LiveBillingPlan, "id" | "name" | "note" | "description">>;
}) {
  return (
    <div className="hidden lg:block">
      <div className="overflow-hidden rounded-[32px] border border-slate-200/90 bg-white/82 backdrop-blur-xl ring-1 ring-inset ring-black/5">
        <div className="max-h-[640px] overflow-auto">
          <div
            className="sticky top-0 z-10 grid border-b border-slate-200/90 bg-[rgba(255,255,255,0.96)] backdrop-blur-xl"
            style={{ gridTemplateColumns: `minmax(260px, 1.4fr) repeat(${plans.length}, minmax(0, 1fr))` }}
          >
            <div className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.26em] text-primary/55">
              Confronta piani
            </div>
            {plans.map((plan) => (
              <div key={plan.id} className="border-l border-slate-200/90 px-5 py-5">
                <p className="text-base font-extrabold tracking-[-0.04em] text-ink">{plan.name}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{plan.note ?? plan.description}</p>
              </div>
            ))}
          </div>

          {categories.map((category) => (
            <div key={category.name}>
              <div
                className="grid border-b border-slate-200/90 bg-slate-100/80"
                style={{ gridTemplateColumns: `minmax(260px, 1.4fr) repeat(${plans.length}, minmax(0, 1fr))` }}
              >
                <div className="px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary/65">
                  {category.name}
                </div>
                {plans.map((plan) => (
                  <div key={`${category.name}-${plan.id}`} className="border-l border-slate-200/90 px-5 py-3" />
                ))}
              </div>

              {category.rows.map((row) => (
                <div
                  key={`${category.name}-${row.label}`}
                  className="grid border-b border-slate-200/90 bg-white/88 last:border-b-0"
                  style={{ gridTemplateColumns: `minmax(260px, 1.4fr) repeat(${plans.length}, minmax(0, 1fr))` }}
                >
                  <div className="px-6 py-4 text-sm font-medium leading-6 text-slate-700">{row.label}</div>
                  {row.values.map((value, index) => (
                    <div
                      key={`${row.label}-${plans[index]?.id ?? index}`}
                      className="flex items-center border-l border-slate-200/90 px-5 py-4"
                    >
                      <CompareValue value={value} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCompareList({
  categories,
  plans,
}: {
  categories: PricingCompareCategory[];
  plans: Array<Pick<LiveBillingPlan, "id" | "name" | "note" | "description">>;
}) {
  return (
    <div className="space-y-5 lg:hidden">
      {categories.map((category) => (
        <section
          key={category.name}
          className="overflow-hidden rounded-[28px] border border-slate-200/90 bg-white/88 backdrop-blur-xl ring-1 ring-inset ring-black/5"
        >
          <div className="border-b border-slate-200/90 bg-slate-100/85 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary/65">
            {category.name}
          </div>
          <div className="divide-y divide-slate-200/90">
            {category.rows.map((row) => (
              <div key={`${category.name}-${row.label}`} className="bg-white/86 px-5 py-4">
                <p className="text-sm font-semibold leading-6 text-ink">{row.label}</p>
                <div className="mt-4 space-y-3">
                  {plans.map((plan, index) => (
                    <div
                      key={`${row.label}-${plan.id}`}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50/90 px-4 py-3"
                    >
                      <span className="text-sm text-muted">{plan.name}</span>
                      <div className="flex items-center gap-2">
                        <CompareValue value={row.values[index]} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function useCheckout() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkoutIntents, setCheckoutIntents] = useState<Record<string, CheckoutIntent>>({});
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [billingReady, setBillingReady] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    email: "",
    name: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "IT",
    invoiceRequested: false,
    companyName: "",
    vatNumber: "",
    taxCode: "",
    pec: "",
  });
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  function updateBillingDetails(field: keyof BillingDetails, value: string | boolean) {
    setBillingDetails((current) => ({ ...current, [field]: value }));
  }

  function openCheckoutModal(plan: LiveBillingPlan, billingCycle: Billing, persona: string) {
    if (plan.contactOnly) return;
    const priceId = plan.prices[billingCycle]?.priceId;
    if (!priceId) return;

    posthog.capture("plan_cta_clicked", {
      plan_id: plan.id,
      plan_name: plan.name,
      billing_cycle: billingCycle,
      price_id: priceId,
      trial_days: plan.trialDays ?? 0,
      persona,
    });

    setErrorId(null);
    setSuccessId(null);
    setBillingReady(false);
    setActivePlanId(plan.id);
  }

  function scheduleErrorClear() {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setErrorId(null), 4000);
  }

  async function prepareCheckout(plan: LiveBillingPlan, billingCycle: Billing, persona: string) {
    const priceId = plan.prices[billingCycle]?.priceId;
    if (!priceId) return false;

    setLoadingId(plan.id);
    setErrorId(null);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/billing/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, billingDetails }),
      });
      const data: {
        ok: boolean;
        clientSecret?: string;
        intentType?: "payment" | "setup";
        subscriptionId?: string;
        customerId?: string;
        priceId?: string;
        trialWaived?: boolean;
        error?: string;
      } = await res.json();

      if (!data.ok || !data.clientSecret || !data.intentType) {
        setErrorId(plan.id);
        setErrorMessage(data.error ?? "Controlla i dati e riprova.");
        if (res.status !== 409) scheduleErrorClear();
        return false;
      }

      setCheckoutIntents((current) => ({
        ...current,
        [plan.id]: {
          clientSecret: data.clientSecret ?? "",
          intentType: data.intentType ?? "payment",
          subscriptionId: data.subscriptionId,
          customerId: data.customerId,
          priceId: data.priceId,
          trialWaived: data.trialWaived,
        },
      }));
      posthog.capture("checkout_opened", {
        plan_id: plan.id,
        plan_name: plan.name,
        billing_cycle: billingCycle,
        price_id: data.priceId,
        trial_waived: data.trialWaived ?? false,
        persona,
      });
      posthog.capture("$set", { $set_once: { first_plan_viewed: plan.name, first_billing_cycle: billingCycle, first_persona: persona } });
      setActivePlanId(plan.id);
      return true;
    } catch {
      setErrorId(plan.id);
      setErrorMessage("Impossibile preparare il pagamento. Riprova tra qualche momento.");
      scheduleErrorClear();
      return false;
    } finally {
      setLoadingId(null);
    }
  }

  return {
    openCheckoutModal,
    prepareCheckout,
    billingDetails,
    updateBillingDetails,
    loadingId,
    errorId,
    errorMessage,
    checkoutIntents,
    activePlanId,
    setActivePlanId,
    successId,
    setSuccessId,
    billingReady,
    setBillingReady,
  };
}

function formatAmount(amount: number | undefined, currency: string | undefined) {
  if (amount == null || !currency) return null;
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function getPlanCta(plan: LiveBillingPlan) {
  return getPlanCtaLabel(plan);
}

function CheckoutModal({
  plan,
  amount,
  billingCycle,
  intent,
  success,
  loading,
  error,
  errorMessage,
  billingDetails,
  updateBillingDetails,
  billingReady,
  onBillingReady,
  onBillingReset,
  onClose,
  onPrepare,
  onSuccess,
}: {
  plan: LiveBillingPlan;
  amount: string | null;
  billingCycle: Billing;
  intent?: CheckoutIntent;
  success: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  billingDetails: BillingDetails;
  updateBillingDetails: (field: keyof BillingDetails, value: string | boolean) => void;
  billingReady: boolean;
  onBillingReady: () => void;
  onBillingReset: () => void;
  onClose: () => void;
  onPrepare: () => Promise<boolean>;
  onSuccess: () => void;
}) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    if (billingReady && !intent && !success) {
      onPrepare().then((ok) => {
        if (!ok) onBillingReset();
      });
    }
  }, [billingReady, intent, success]);

  function handleBillingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBillingReady();
  }

  const inputClass =
    "w-full rounded-[14px] border border-line bg-white px-[22px] py-[15px] text-[15px] font-medium text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:shadow-[0_0_0_2px_rgba(11,59,136,0.1)]";
  const labelClass = "text-sm font-bold text-ink";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-end justify-center bg-[#071322]/55 px-0 pt-6 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button className="absolute inset-0 cursor-default" aria-label="Chiudi pagamento" onClick={onClose} />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          className="relative flex max-h-[92svh] w-full max-w-[600px] flex-col overflow-hidden rounded-t-[30px] border border-slate-200/90 bg-white text-ink shadow-[0_34px_110px_rgba(7,19,34,0.28)] ring-1 ring-inset ring-black/5 sm:max-h-[92vh] sm:rounded-[32px]"
          initial={{ opacity: 0, y: 34, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-200 sm:hidden" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 sm:right-5 sm:top-5"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-y-auto px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pb-8 sm:pt-8">
            <div className="pr-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/60">
                {intent?.trialWaived
                  ? "Pagamento sicuro"
                  : plan.trialDays && plan.trialDays > 0
                  ? `${plan.trialDays} giorni gratis`
                  : "Pagamento sicuro"}
              </p>
              <h3 id="checkout-modal-title" className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-ink">
                {plan.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{plan.description}</p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
              <span className={!intent && !billingReady ? "text-ink" : "text-muted"}>1 · Dati</span>
              <span className="text-slate-300">—</span>
              <span className={intent || billingReady ? "text-ink" : "text-muted"}>2 · Pagamento</span>
            </div>

            <div className="mt-6 rounded-[24px] border border-line bg-surface px-4 py-4 sm:px-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/55">
                    {billingCycle === "monthly" ? "Mensile" : "Annuale"}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {intent?.trialWaived
                      ? "Prova gratuita già utilizzata: addebito immediato"
                      : plan.trialDays && plan.trialDays > 0
                      ? `Addebito dopo ${plan.trialDays} giorni di prova`
                      : "Addebito immediato"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold tracking-[-0.06em] text-primary">€{amount}</p>
                  <p className="text-xs font-semibold text-slate-500">
                    /{billingCycle === "monthly" ? "mese" : "anno"}
                  </p>
                </div>
              </div>
            </div>

            {success ? (
              <CheckoutSuccess onClose={onClose} />
            ) : intent ? (
              <EmbeddedCheckout
                clientSecret={intent.clientSecret}
                intentType={intent.intentType}
                subscriptionId={intent.subscriptionId}
                customerId={intent.customerId}
                priceId={intent.priceId}
                featured={plan.featured}
                onSuccess={onSuccess}
              />
            ) : billingReady ? (
              <div className="mt-10 flex flex-col items-center justify-center gap-3 py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-muted">Preparazione pagamento...</p>
              </div>
            ) : (
              <form onSubmit={handleBillingSubmit} className="mt-6 space-y-4">
              {plan.trialDays && plan.trialDays > 0 ? (
                <p className="text-xs leading-5 text-muted">
                  Se hai già utilizzato la prova gratuita, l&apos;addebito sarà immediato.
                </p>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Email</span>
                  <input
                    className={inputClass}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="mario.rossi@email.it"
                    value={billingDetails.email}
                    onChange={(event) => updateBillingDetails("email", event.target.value)}
                  />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Nome e cognome</span>
                  <input
                    className={inputClass}
                    required
                    autoComplete="name"
                    placeholder="Mario Rossi"
                    value={billingDetails.name}
                    onChange={(event) => updateBillingDetails("name", event.target.value)}
                  />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Indirizzo di fatturazione</span>
                  <input
                    className={inputClass}
                    required
                    autoComplete="billing street-address"
                    placeholder="Via Roma 1"
                    value={billingDetails.addressLine1}
                    onChange={(event) => updateBillingDetails("addressLine1", event.target.value)}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>CAP</span>
                  <input
                    className={inputClass}
                    required
                    inputMode="numeric"
                    autoComplete="billing postal-code"
                    placeholder="00100"
                    pattern="[0-9]{5}"
                    title="Inserisci un CAP italiano di 5 cifre."
                    value={billingDetails.postalCode}
                    onChange={(event) => updateBillingDetails("postalCode", event.target.value)}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Città</span>
                  <input
                    className={inputClass}
                    required
                    autoComplete="billing address-level2"
                    placeholder="Roma"
                    value={billingDetails.city}
                    onChange={(event) => updateBillingDetails("city", event.target.value)}
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 rounded-[18px] border border-line bg-surface px-4 py-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-primary"
                  checked={billingDetails.invoiceRequested}
                  onChange={(event) => updateBillingDetails("invoiceRequested", event.target.checked)}
                />
                <span>
                  <span className="block text-sm font-bold text-ink">Richiedo fattura</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">
                    Inserisci partita IVA o codice fiscale per la fatturazione italiana.
                  </span>
                </span>
              </label>

              {billingDetails.invoiceRequested ? (
                <div className="grid gap-4 rounded-[22px] border border-line bg-white p-4 sm:grid-cols-2">
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>Ragione sociale</span>
                    <input
                      className={inputClass}
                      required
                      placeholder="Studio Rossi SRL"
                      value={billingDetails.companyName}
                      onChange={(event) => updateBillingDetails("companyName", event.target.value)}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>
                      Partita IVA
                      {!billingDetails.taxCode && <span className="ml-1 text-rose-500">*</span>}
                    </span>
                    <input
                      className={inputClass}
                      required={!billingDetails.taxCode}
                      placeholder="IT12345678901"
                      inputMode="text"
                      pattern="^(IT)?[0-9]{11}$"
                      title="Inserisci una partita IVA italiana di 11 cifre, con o senza prefisso IT."
                      value={billingDetails.vatNumber}
                      onChange={(event) => updateBillingDetails("vatNumber", event.target.value)}
                    />
                    <span className="block text-xs leading-5 text-muted">11 cifre, con o senza prefisso IT.</span>
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>
                      Codice fiscale
                      {!billingDetails.vatNumber && <span className="ml-1 text-rose-500">*</span>}
                    </span>
                    <input
                      className={inputClass}
                      required={!billingDetails.vatNumber}
                      placeholder="RSSMRA80A01H501U"
                      pattern="^[A-Za-z0-9]{11,16}$"
                      title="Inserisci un codice fiscale valido: 16 caratteri per persone fisiche o 11 cifre per aziende."
                      value={billingDetails.taxCode}
                      onChange={(event) => updateBillingDetails("taxCode", event.target.value)}
                    />
                    <span className="block text-xs leading-5 text-muted">
                      {billingDetails.vatNumber ? "Opzionale se hai la Partita IVA." : "16 caratteri o 11 cifre."}
                    </span>
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>PEC o codice destinatario</span>
                    <input
                      className={inputClass}
                      placeholder="nome@pec.it oppure ABC1234"
                      pattern="^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}|[A-Za-z0-9]{7}|0000000)$"
                      title="Inserisci una PEC valida, un codice destinatario di 7 caratteri o 0000000."
                      value={billingDetails.pec}
                      onChange={(event) => updateBillingDetails("pec", event.target.value)}
                    />
                    <span className="block text-xs leading-5 text-muted">PEC, codice destinatario a 7 caratteri o 0000000.</span>
                  </label>
                </div>
              ) : null}

              {error ? <p className="text-sm font-medium leading-6 text-rose-500">{errorMessage ?? "Controlla i dati e riprova."}</p> : null}

              <p className="text-xs leading-5 text-muted">
                Proseguendo accetti i{" "}
                <a href="/termini" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline">
                  Termini e Condizioni
                </a>{" "}
                e confermi di aver letto la{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-2 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-[22px] py-[15px] text-sm font-bold text-white transition hover:bg-[#0a3478] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Preparazione...</span>
                  </>
                ) : (
                  "Continua al pagamento"
                )}
              </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EnterpriseCallout({ plan }: { plan: LiveBillingPlan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="mt-6 overflow-hidden rounded-[32px] border border-[#18499b] bg-[linear-gradient(135deg,#0d3f92_0%,#0b2f6d_100%)] shadow-[0_26px_80px_rgba(11,59,136,0.18)] ring-1 ring-inset ring-white/10"
    >
      <div className="flex flex-col gap-8 px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12 lg:py-10">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-100/60">
            {plan.note ?? "Custom"}
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-3xl">
            {plan.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100/80">
            {plan.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {plan.featureSummary.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-inset ring-white/10"
              >
                <Check className="h-3.5 w-3.5 text-blue-200" strokeWidth={2.4} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
          <div className="text-right">
            <p className="text-2xl font-extrabold tracking-[-0.04em] text-white">Hai bisogno di un piano su misura?</p>
            <p className="mt-1 text-sm font-medium text-blue-100/70">Preventivo personalizzato e onboarding dedicato.</p>
          </div>
          <a
            href="mailto:info@libracolf.it?subject=Richiesta%20Enterprise"
            className="inline-flex items-center gap-2 rounded-[14px] bg-white px-8 py-[15px] text-sm font-bold text-primary shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:bg-slate-50 hover:-translate-y-0.5"
          >
            Contattaci
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCardSkeleton({ count, mobile = false }: { count: number; mobile?: boolean }) {
  const items = Array.from({ length: count });
  return (
    <>
      {items.map((_, index) => (
        <article
          key={`pricing-skeleton-${mobile ? "mobile" : "desktop"}-${index}`}
          className={`relative flex animate-pulse flex-col rounded-[40px] border border-slate-200/90 bg-white/75 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-inset ring-black/5 ${
            mobile ? "min-h-[520px] w-[86vw] max-w-[360px] shrink-0 snap-start" : "min-h-[560px]"
          }`}
        >
          <div className="h-3 w-28 rounded-full bg-slate-200" />
          <div className="mt-5 h-9 w-32 rounded-full bg-slate-200" />
          <div className="mt-5 space-y-3">
            <div className="h-3 w-full rounded-full bg-slate-200" />
            <div className="h-3 w-4/5 rounded-full bg-slate-200" />
          </div>
          <div className="mt-10 h-14 w-36 rounded-[18px] bg-slate-200" />
          <div className="mt-10 flex flex-1 flex-col gap-4">
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
            <div className="h-4 w-4/5 rounded-full bg-slate-200" />
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
          </div>
          <div className="mt-8 h-[52px] rounded-[14px] bg-slate-200" />
        </article>
      ))}
    </>
  );
}

function useLivePlans() {
  const [plans, setPlans] = useState<Record<Persona, LiveBillingPlan[]> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      setError(false);
      try {
        const res = await fetch(`/api/billing/plans?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!cancelled && data.ok) setPlans(data.plans);
        if (!cancelled && !data.ok) setError(true);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    loadPlans();

    function refetchVisiblePlans() {
      if (document.visibilityState === "visible") loadPlans();
    }

    document.addEventListener("visibilitychange", refetchVisiblePlans);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", refetchVisiblePlans);
    };
  }, []);

  return { plans, error };
}

export function PricingEngine({
  persona,
  billingCycle,
  onBillingCycleChange,
}: PricingEngineProps) {
  const [compareOpen, setCompareOpen] = useState(false);
  const {
    openCheckoutModal,
    prepareCheckout,
    billingDetails,
    updateBillingDetails,
    loadingId,
    errorId,
    errorMessage,
    checkoutIntents,
    activePlanId,
    setActivePlanId,
    successId,
    setSuccessId,
    billingReady,
    setBillingReady,
  } = useCheckout();
  const { plans: livePlans, error: plansError } = useLivePlans();

  const plans = livePlans?.[persona] ?? [];
  const regularPlans = plans.filter((plan) => !plan.contactOnly);
  const enterprisePlan = plans.find((plan) => plan.contactOnly) ?? null;
  const compareCategories = pricingEngineCopy.compare[persona];
  const desktopGridClass =
    regularPlans.length === 2
      ? "lg:mx-auto lg:max-w-[920px] lg:grid-cols-2"
      : regularPlans.length === 3
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4";
  const personaLabel =
    pricingEngineCopy.personae.find((item) => item.id === persona)?.label ?? pricingEngineCopy.personae[0].label;
  const isLoadingPlans = !livePlans && !plansError;
  const skeletonCount = persona === "private" ? 2 : 3;
  const activePlan = activePlanId ? plans.find((plan) => plan.id === activePlanId) : null;
  const activeIntent = activePlanId ? checkoutIntents[activePlanId] : null;
  const activeAmount = activePlan
    ? formatAmount(activePlan.prices[billingCycle]?.amount, activePlan.prices[billingCycle]?.currency)
    : null;

  return (
    <section id="prezzi" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/55">
            {pricingEngineCopy.eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
            {pricingEngineCopy.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">{pricingEngineCopy.description}</p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Stai vedendo i piani per: {personaLabel}
          </div>

          <div className="inline-flex w-full max-w-[360px] rounded-[24px] border border-slate-200/90 bg-white/92 p-1.5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] backdrop-blur-xl ring-1 ring-inset ring-black/5">
            <button
              onClick={() => { posthog.capture("billing_cycle_changed", { billing_cycle: "monthly" }); onBillingCycleChange("monthly"); }}
              className={`flex-1 rounded-[18px] px-5 py-3 text-sm font-semibold transition ${billingCycle === "monthly"
                ? "bg-primary text-white shadow-card"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              {pricingEngineCopy.billing.monthly}
            </button>
            <button
              onClick={() => { posthog.capture("billing_cycle_changed", { billing_cycle: "yearly" }); onBillingCycleChange("yearly"); }}
              className={`flex-1 rounded-[18px] px-5 py-3 text-sm font-semibold transition ${billingCycle === "yearly"
                ? "bg-primary text-white shadow-card"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <span>{pricingEngineCopy.billing.yearly}</span>
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] ${billingCycle === "yearly"
                  ? "bg-white/15 text-white"
                  : "bg-emerald-500/10 text-emerald-600"
                  }`}
              >
                {pricingEngineCopy.billing.yearlyBadge}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${persona}-${billingCycle}`}
            {...fadeUp}
            className={`mt-14 hidden gap-6 lg:grid ${desktopGridClass}`}
          >
            {isLoadingPlans ? <PricingCardSkeleton count={skeletonCount} /> : null}
            {!isLoadingPlans && regularPlans.map((plan) => {
              const price = plan.prices[billingCycle];
              const amount = formatAmount(price?.amount, price?.currency);
              const monthlyAmount = formatAmount(plan.prices.monthly?.amount, plan.prices.monthly?.currency);
              const cta = getPlanCta(plan);

              return (
                <motion.article
                  key={plan.id}
                  layout
                  className={`relative flex min-h-[560px] flex-col rounded-[40px] border p-8 ${plan.featured
                    ? "border-[#18499b] bg-[linear-gradient(180deg,#0d3f92_0%,#0b2f6d_100%)] text-white shadow-[0_26px_80px_rgba(11,59,136,0.22)]"
                    : "border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] text-ink shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-black/5"
                    }`}
                >
                  {plan.badge && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[40px]">
                      <div
                        className={`absolute py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] shadow-sm ${plan.featured ? "bg-white/25 text-white" : "bg-emerald text-white"}`}
                        style={{
                          top: 36,
                          right: -44,
                          width: 180,
                          textAlign: "center",
                          transform: "rotate(45deg)",
                        }}
                      >
                        {plan.badge}
                      </div>
                    </div>
                  )}
                  <div className="min-h-[140px]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-[0.22em] ${plan.featured ? "text-blue-100/70" : "text-primary/55"}`}>
                          {plan.note}
                        </p>
                        <h3 className={`mt-4 text-[2rem] font-extrabold tracking-[-0.05em] ${plan.featured ? "text-white" : "text-ink"}`}>
                          {plan.name}
                        </h3>
                      </div>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-100/80" : "text-muted"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <PriceDisplay
                    amount={amount}
                    monthlyAmount={monthlyAmount}
                    contactOnly={plan.contactOnly}
                    featured={plan.featured}
                    billingCycle={billingCycle}
                  />

                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {plan.featureSummary.map((item) => (
                      <li key={`${plan.id}-${item}`} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${plan.featured ? "bg-white/15" : "bg-primary/10"
                            }`}
                        >
                          <Check className={`h-3.5 w-3.5 ${plan.featured ? "text-white" : "text-primary"}`} strokeWidth={2.3} />
                        </span>
                        <span className={`text-sm leading-6 ${plan.featured ? "text-white/90" : "text-slate-700"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.contactOnly ? (
                    <a
                      href="mailto:info@libracolf.it?subject=Richiesta%20Enterprise"
                      className={`mt-8 flex items-center justify-center rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition ${plan.featured
                        ? "bg-white text-primary hover:bg-slate-50"
                        : "bg-primary text-white hover:-translate-y-0.5 hover:bg-[#0a3478]"
                        }`}
                    >
                      {cta}
                    </a>
                  ) : (
                    <div>
                      <button
                        onClick={() => openCheckoutModal(plan, billingCycle, persona)}
                        disabled={loadingId === plan.id || !price}
                        aria-busy={loadingId === plan.id}
                        className={`mt-8 flex w-full items-center justify-center gap-2 rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${plan.featured
                          ? "bg-white text-primary hover:bg-slate-50"
                          : "bg-primary text-white hover:-translate-y-0.5 hover:bg-[#0a3478]"
                          }`}
                      >
                        {loadingId === plan.id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Caricamento...</span>
                          </>
                        ) : successId === plan.id ? "Pagamento completato" : cta}
                      </button>
                      {errorId === plan.id && (
                        <p className="mt-2 text-center text-xs text-red-400">
                          Errore durante l&apos;avvio del pagamento. Riprova.
                        </p>
                      )}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
        {plansError ? (
          <p className="mt-6 text-center text-sm font-medium text-rose-500">
            Non siamo riusciti a sincronizzare i prezzi Stripe. Riprova tra qualche momento.
          </p>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${persona}-${billingCycle}`}
            {...fadeUp}
            className="-mx-6 mt-12 overflow-x-auto px-6 pb-2 lg:hidden"
          >
            <div className="flex snap-x snap-mandatory gap-4">
              {isLoadingPlans ? <PricingCardSkeleton count={skeletonCount} mobile /> : null}
              {!isLoadingPlans && regularPlans.map((plan) => {
                const price = plan.prices[billingCycle];
                const amount = formatAmount(price?.amount, price?.currency);
                const monthlyAmount = formatAmount(plan.prices.monthly?.amount, plan.prices.monthly?.currency);
                const cta = getPlanCta(plan);

                return (
                  <article
                    key={`mobile-${plan.id}`}
                    className={`relative flex min-h-[520px] w-[86vw] max-w-[360px] shrink-0 snap-start flex-col rounded-[36px] border p-7 ${plan.featured
                      ? "border-[#18499b] bg-[linear-gradient(180deg,#0d3f92_0%,#0b2f6d_100%)] text-white shadow-[0_24px_70px_rgba(11,59,136,0.22)]"
                      : "border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] text-ink shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-black/5"
                      }`}
                  >
                    {plan.badge && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
                        <div
                          className={`absolute px-10 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] ${plan.featured ? "bg-white/20 text-white" : "bg-emerald text-white"}`}
                          style={{
                            top: 24,
                            right: -32,
                            width: 130,
                            textAlign: "center",
                            transform: "rotate(45deg)",
                          }}
                        >
                          {plan.badge}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-[0.22em] ${plan.featured ? "text-blue-100/70" : "text-primary/55"}`}>
                            {plan.note}
                          </p>
                          <h3 className={`mt-4 text-[1.9rem] font-extrabold tracking-[-0.05em] ${plan.featured ? "text-white" : "text-ink"}`}>
                            {plan.name}
                          </h3>
                        </div>
                      </div>
                      <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-100/80" : "text-muted"}`}>
                        {plan.description}
                      </p>
                    </div>

                    <PriceDisplay
                      amount={amount}
                      monthlyAmount={monthlyAmount}
                      contactOnly={plan.contactOnly}
                      featured={plan.featured}
                      billingCycle={billingCycle}
                    />

                    <ul className="mt-8 flex flex-1 flex-col gap-3">
                      {plan.featureSummary.map((item) => (
                        <li key={`${plan.id}-${item}-mobile`} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${plan.featured ? "bg-white/15" : "bg-primary/10"
                              }`}
                          >
                            <Check className={`h-3.5 w-3.5 ${plan.featured ? "text-white" : "text-primary"}`} strokeWidth={2.3} />
                          </span>
                          <span className={`text-sm leading-6 ${plan.featured ? "text-white/90" : "text-slate-700"}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                  {plan.contactOnly ? (
                    <a
                      href="mailto:info@libracolf.it?subject=Richiesta%20Enterprise"
                      className={`mt-8 flex items-center justify-center rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition ${plan.featured
                        ? "bg-white text-primary hover:bg-slate-50"
                        : "bg-primary text-white hover:bg-[#0a3478]"
                        }`}
                    >
                      {cta}
                    </a>
                  ) : (
                    <div>
                      <button
                        onClick={() => openCheckoutModal(plan, billingCycle, persona)}
                        disabled={loadingId === plan.id || !price}
                        aria-busy={loadingId === plan.id}
                        className={`mt-8 flex w-full items-center justify-center gap-2 rounded-[14px] px-[22px] py-[15px] text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${plan.featured
                          ? "bg-white text-primary hover:bg-slate-50"
                          : "bg-primary text-white hover:bg-[#0a3478]"
                          }`}
                      >
                        {loadingId === plan.id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Caricamento...</span>
                          </>
                        ) : successId === plan.id ? "Pagamento completato" : cta}
                      </button>
                      {errorId === plan.id && (
                        <p className="mt-2 text-center text-xs text-red-400">
                          Errore durante l&apos;avvio del pagamento. Riprova.
                        </p>
                      )}
                    </div>
                  )}
                  </article>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {enterprisePlan ? <EnterpriseCallout plan={enterprisePlan} /> : null}

        <div className="mt-14">
          <button
            onClick={() => {
              const next = !compareOpen;
              setCompareOpen(next);
              if (next) posthog.capture("compare_plans_opened", { persona, billing_cycle: billingCycle });
            }}
            className="group inline-flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/92 px-5 py-3 text-sm font-semibold text-ink shadow-[0_12px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl ring-1 ring-inset ring-black/5 transition hover:bg-white"
          >
            <span>Confronta Piani</span>
            <motion.span
              animate={{ rotate: compareOpen ? 180 : 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ChevronDown className="h-4 w-4 text-primary" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {compareOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 rounded-[36px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(241,246,252,0.92)_100%)] p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-black/5 sm:p-6">
                  <DesktopCompareTable categories={compareCategories} plans={plans} />
                  <MobileCompareList categories={compareCategories} plans={plans} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {activePlan ? (
        <CheckoutModal
          plan={activePlan}
          amount={activeAmount}
          billingCycle={billingCycle}
          intent={activeIntent ?? undefined}
          success={successId === activePlan.id}
          loading={loadingId === activePlan.id}
          error={errorId === activePlan.id}
          errorMessage={errorMessage}
          billingDetails={billingDetails}
          updateBillingDetails={updateBillingDetails}
          billingReady={billingReady}
          onBillingReady={() => setBillingReady(true)}
          onBillingReset={() => setBillingReady(false)}
          onClose={() => {
            if (successId !== activePlan.id) {
              posthog.capture("checkout_abandoned", {
                plan_id: activePlan.id,
                plan_name: activePlan.name,
                billing_cycle: billingCycle,
                persona,
              });
            }
            setActivePlanId(null);
            setSuccessId(null);
            setBillingReady(false);
          }}
          onPrepare={() => prepareCheckout(activePlan, billingCycle, persona)}
          onSuccess={() => setSuccessId(activePlan.id)}
        />
      ) : null}
    </section>
  );
}
