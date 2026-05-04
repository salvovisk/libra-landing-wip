"use client";

import { motion } from "framer-motion";

import { valueReasonsCopy } from "@/lib/site-data";

export function ValueReasons() {
  return (
    <section id="vantaggi" className="px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-[1500px] rounded-[40px] border border-slate-200/80 bg-white px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
            {valueReasonsCopy.title} {''}
            {valueReasonsCopy.highlight} per 4 motivi
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {valueReasonsCopy.reasons.map((reason, index) => (
            <motion.article
              key={reason.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.32, delay: index * 0.05 }}
              className="rounded-[28px] border border-slate-100 bg-[#F5F8FF] p-7 lg:p-8"
            >
              <div className="text-5xl font-extrabold tracking-[-0.06em] text-primary/25 lg:text-6xl">
                {reason.index}
              </div>
              <h3 className="mt-6 text-[1.9rem] font-extrabold leading-tight tracking-[-0.04em] text-ink">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-[28ch] text-base leading-8 text-slate-600">
                {reason.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
