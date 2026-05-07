"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";

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

          <div className="mt-10">
            <a
              href="#prezzi"
              onClick={() => posthog.capture("lead_magnet_cta_clicked")}
              className="inline-flex min-h-[74px] items-center justify-center rounded-[14px] bg-white px-12 text-lg font-extrabold text-[#23458c] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#264b96]"
            >
              Scegli il tuo piano
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
