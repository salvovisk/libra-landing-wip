"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { OPEN_BOOKING_MODAL_EVENT } from "@/components/demo-booking-modal";
import type { Persona } from "@/lib/site-data";

type DemoSectionProps = {
  persona: Persona;
};

const slides = [
  {
    src: "/dashboard.jpg",
    alt: "Dashboard Libra Colf",
    label: "Dashboard",
    description: "Scadenze, contratti attivi e stato operativo in un colpo d'occhio.",
  },
  {
    src: "/pagina-busta-paga-mensile.jpg",
    alt: "Busta paga mensile in Libra Colf",
    label: "Busta paga",
    description: "La busta paga mensile pronta, leggibile e già allineata al rapporto.",
  },
  {
    src: "/documenti.jpg",
    alt: "Archivio documentale di Libra Colf",
    label: "Documenti",
    description: "Documenti e bollettini raccolti in un archivio unico e verificabile.",
  },
  {
    src: "/pagina-variazioni.jpg",
    alt: "Schermata variazioni di Libra Colf",
    label: "Variazioni",
    description: "Ferie, malattia e straordinari gestiti senza ricalcoli manuali.",
  },
] as const;

export function DemoSection({ persona }: DemoSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSlide]);

  const copy =
    persona === "pro"
      ? {
          eyebrow: "Demo dedicata",
          title: "Scopri come Libra Colf si adatta al tuo Studio",
          description:
            "Una demo guidata per vedere gestione massiva, flussi operativi e automazioni su buste paga, contributi INPS e scadenze ricorrenti.",
        }
      : {
          eyebrow: "Demo guidata",
          title: "Prenota una demo per vedere Libra Colf in azione",
          description:
            "Una panoramica pratica su come gestire buste paga colf e badanti, contributi INPS, scadenze e documenti in un unico flusso chiaro.",
        };

  const current = slides[activeSlide];

  const goToPrevious = () =>
    setActiveSlide((c) => (c - 1 + slides.length) % slides.length);
  const goToNext = () => setActiveSlide((c) => (c + 1) % slides.length);

  return (
    <section id="demo" className="relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-primary/70">
              {copy.eyebrow}
            </p>
            <h2 className="text-balance font-[var(--font-manrope)] text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
              {copy.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_BOOKING_MODAL_EVENT))}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5"
            >
              Prenota una demo gratuita
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <a
              href="#prezzi"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-7 py-4 text-base font-bold text-primary backdrop-blur transition hover:bg-white"
            >
              Vedi i piani
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{copy.description}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="order-2 grid grid-cols-2 gap-4 lg:order-1 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-4">
            {slides.map((s, idx) => {
              const active = activeSlide === idx;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-current={active}
                  className={`group flex flex-col justify-between rounded-[20px] p-5 text-left transition ${
                    active
                      ? "bg-primary text-white shadow-[0_18px_44px_rgba(11,59,136,0.2)]"
                      : "bg-[#e9f0ff] text-ink hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center justify-center rounded-[8px] px-2 py-1 font-[var(--font-manrope)] text-[11px] font-extrabold tracking-[0.14em] ${
                        active ? "bg-white/15 text-white" : "bg-white text-primary"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {active && <span className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <div className="mt-6">
                    <p
                      className={`text-[17px] font-extrabold leading-tight tracking-[-0.02em] ${
                        active ? "text-white" : "text-ink"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p
                      className={`mt-2 text-[13px] leading-[1.55] ${
                        active ? "text-blue-100/85" : "text-slate-700/80"
                      }`}
                    >
                      {s.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-8">
            <div className="relative w-full max-w-[880px] rounded-[32px] border border-white/60 bg-white/60 p-3 shadow-soft ring-1 ring-inset ring-black/5 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-[#edf3fb]">
                <div className="relative aspect-[16/11]">
                  <motion.div
                    key={current.src}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top"
                      priority={activeSlide === 0}
                    />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className="pointer-events-auto inline-flex items-center rounded-full bg-primary px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(11,59,136,0.18)]">
                      {current.label}
                    </span>
                    <div className="pointer-events-auto flex gap-2">
                      <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Screenshot precedente"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
                      </button>
                      <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Screenshot successivo"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition hover:bg-white"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
