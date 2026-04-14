"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Minus } from "lucide-react";

import {
  pricingEngineCopy,
  type Billing,
  type Persona,
  type PricingCompareCategory,
  type PricingCompareValue,
  type PricingEnginePlan,
} from "@/lib/site-data";

type PricingEngineProps = {
  persona: Persona;
  billingCycle: Billing;
  onBillingCycleChange: (billingCycle: Billing) => void;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.28, ease: "easeOut" },
};

function PriceDisplay({
  amount,
  contactOnly,
  featured,
  billingCycle,
}: {
  amount: string | null;
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
  plans: PricingEnginePlan[];
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
  plans: PricingEnginePlan[];
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

export function PricingEngine({
  persona,
  billingCycle,
  onBillingCycleChange,
}: PricingEngineProps) {
  const [compareOpen, setCompareOpen] = useState(false);

  const plans = pricingEngineCopy.plans[persona];
  const compareCategories = pricingEngineCopy.compare[persona];
  const desktopGridClass = persona === "private" ? "lg:mx-auto lg:max-w-[920px] lg:grid-cols-2" : "lg:grid-cols-4";
  const personaLabel =
    pricingEngineCopy.personae.find((item) => item.id === persona)?.label ?? pricingEngineCopy.personae[0].label;

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
              onClick={() => onBillingCycleChange("monthly")}
              className={`flex-1 rounded-[18px] px-5 py-3 text-sm font-semibold transition ${billingCycle === "monthly"
                ? "bg-primary text-white shadow-card"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              {pricingEngineCopy.billing.monthly}
            </button>
            <button
              onClick={() => onBillingCycleChange("yearly")}
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
            {plans.map((plan) => {
              const amount = billingCycle === "monthly" ? plan.monthly : plan.yearly;

              return (
                <motion.article
                  key={plan.id}
                  layout
                  className={`flex min-h-[560px] flex-col rounded-[40px] border p-8 ${plan.featured
                    ? "border-[#18499b] bg-[linear-gradient(180deg,#0d3f92_0%,#0b2f6d_100%)] text-white shadow-[0_26px_80px_rgba(11,59,136,0.22)]"
                    : "border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] text-ink shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-black/5"
                    }`}
                >
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
                      {plan.badge ? (
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] ${plan.featured ? "bg-white/15 text-white" : "bg-primary text-white"
                            }`}
                        >
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-100/80" : "text-muted"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <PriceDisplay
                    amount={amount}
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

                  <button
                    className={`mt-8 rounded-[22px] px-5 py-4 text-sm font-bold transition ${plan.featured
                      ? "bg-white text-primary hover:bg-slate-50"
                      : "bg-primary text-white hover:-translate-y-0.5 hover:bg-[#0a3478]"
                      }`}
                  >
                    {plan.cta}
                  </button>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${persona}-${billingCycle}`}
            {...fadeUp}
            className="-mx-6 mt-12 overflow-x-auto px-6 pb-2 lg:hidden"
          >
            <div className="flex snap-x snap-mandatory gap-4">
              {plans.map((plan) => {
                const amount = billingCycle === "monthly" ? plan.monthly : plan.yearly;

                return (
                  <article
                    key={`mobile-${plan.id}`}
                    className={`flex min-h-[520px] w-[86vw] max-w-[360px] shrink-0 snap-start flex-col rounded-[36px] border p-7 ${plan.featured
                      ? "border-[#18499b] bg-[linear-gradient(180deg,#0d3f92_0%,#0b2f6d_100%)] text-white shadow-[0_24px_70px_rgba(11,59,136,0.22)]"
                      : "border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] text-ink shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-black/5"
                      }`}
                  >
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
                        {plan.badge ? (
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] ${plan.featured ? "bg-white/15 text-white" : "bg-primary text-white"
                              }`}
                          >
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-100/80" : "text-muted"}`}>
                        {plan.description}
                      </p>
                    </div>

                    <PriceDisplay
                      amount={amount}
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

                    <button
                      className={`mt-8 rounded-[22px] px-5 py-4 text-sm font-bold transition ${plan.featured
                        ? "bg-white text-primary hover:bg-slate-50"
                        : "bg-primary text-white hover:bg-[#0a3478]"
                        }`}
                    >
                      {plan.cta}
                    </button>
                  </article>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-14">
          <button
            onClick={() => setCompareOpen((open) => !open)}
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
    </section>
  );
}
