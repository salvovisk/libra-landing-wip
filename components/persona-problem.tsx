"use client";

import { motion } from "framer-motion";

import { personaProblemCopy, type Persona } from "@/lib/site-data";

type PersonaProblemProps = {
  persona: Persona;
};

const reveal = {
  hidden: { opacity: 0, y: 10 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function PersonaProblem({ persona }: PersonaProblemProps) {
  const content = personaProblemCopy.content[persona];

  return (
    <section id="persona-problem" className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/65">
            {personaProblemCopy.eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
            {content.title} <span className="text-[#00377e]">{content.highlight}</span>
          </h2>
        </div>

        <div className="mt-12 bg-slate-200 p-px">
          <div className="grid grid-cols-1 gap-px md:grid-cols-2 xl:grid-cols-3">
            {content.pains.map((pain, index) => (
              <motion.article
                key={`${persona}-${pain.id}`}
                custom={index}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="flex h-full flex-col bg-[#F8FAFC] px-6 py-7 sm:px-7 sm:py-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold tracking-[0.24em] text-[#00377e]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    {pain.label}
                  </span>
                </div>

                <h3 className="mt-10 max-w-[16ch] text-[1.9rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-ink sm:text-[2.05rem]">
                  {pain.title}
                </h3>

                <p className="mt-5 max-w-[34ch] text-[1.02rem] leading-8 text-slate-600">
                  {pain.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
