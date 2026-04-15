"use client";

import { motion } from "framer-motion";

import { OPEN_BOOKING_MODAL_EVENT } from "@/components/demo-booking-modal";

export function LeadMagnetSection() {
  return (
    <section id="cta-finale" className="bg-[#264b96] px-6 py-24 text-white sm:py-28 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex max-w-4xl flex-col items-center text-center"
        >
          <h2 className="max-w-[900px] font-[var(--font-manrope)] text-4xl font-extrabold leading-[0.94] tracking-[-0.065em] text-white sm:text-5xl lg:text-[4.5rem]">
            Smetti di preoccuparti.
            <br />
            Ci pensa Libra Colf.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-50/88 sm:text-[1.65rem] sm:leading-10">
            Oltre 3.200 famiglie hanno già scelto di gestire il lavoro domestico senza stress.
          </p>

          <div className="mt-10 flex w-full max-w-[700px] flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="#prezzi"
              className="inline-flex min-h-[74px] flex-1 items-center justify-center rounded-[14px] bg-white px-8 text-lg font-extrabold text-[#23458c] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#264b96]"
            >
              Scegli il tuo piano
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(OPEN_BOOKING_MODAL_EVENT))}
              className="inline-flex min-h-[74px] flex-1 items-center justify-center rounded-[14px] border-2 border-white/80 bg-transparent px-8 text-lg font-extrabold text-white transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#264b96]"
            >
              Prenota una demo gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
