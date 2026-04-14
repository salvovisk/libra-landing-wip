"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftRight, FileUp, MailPlus, ReceiptText } from "lucide-react";

import { personaBentoCopy, type Persona, type PersonaBentoCard } from "@/lib/site-data";

type PersonaBentoProps = {
  persona: Persona;
};

const icons = {
  fileUp: FileUp,
  mailSend: MailPlus,
  refresh: ArrowLeftRight,
  receipt: ReceiptText,
};

function BentoCard({ card }: { card: PersonaBentoCard }) {
  const Icon = icons[card.icon];
  const primary = card.variant === "primary";

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className={`h-full rounded-[24px] px-8 py-8 sm:px-10 sm:py-10 ${
        primary
          ? "bg-primary text-white shadow-[0_22px_60px_rgba(11,59,136,0.18)]"
          : "bg-[#e9f0ff] text-ink"
      }`}
    >
      <Icon className={`h-9 w-9 ${primary ? "text-white" : "text-primary"}`} strokeWidth={2.2} />

      <h3
        className={`mt-8 max-w-[15ch] text-[2rem] font-extrabold leading-[1.15] tracking-[-0.05em] sm:text-[2.15rem] ${
          primary ? "text-white" : "text-ink"
        }`}
      >
        {card.title}
      </h3>

      <p className={`mt-5 max-w-[42ch] text-lg leading-9 ${primary ? "text-blue-100/85" : "text-slate-700"}`}>
        {card.description}
      </p>

      {primary && card.chips?.length ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {card.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-[10px] bg-white/10 px-3.5 py-2 text-sm font-bold text-white"
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}

export function PersonaBento({ persona }: PersonaBentoProps) {
  const cards = personaBentoCopy.cards[persona];
  const [primary, topRight, bottomLeft, bottomCenter, bottomRight] = cards;

  return (
    <section id="funzionalita" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-primary/70">
            {personaBentoCopy.eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
            {personaBentoCopy.title}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28 }}
            className="mt-14 grid gap-6 lg:grid-cols-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="lg:col-span-8"
            >
              <BentoCard card={primary} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05 }}
              className="lg:col-span-4"
            >
              <BentoCard card={topRight} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
              className="lg:col-span-4"
            >
              <BentoCard card={bottomLeft} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.15 }}
              className="lg:col-span-4"
            >
              <BentoCard card={bottomCenter} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <BentoCard card={bottomRight} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
