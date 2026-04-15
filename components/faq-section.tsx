"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Ho bisogno di competenze particolari?",
    answer:
      "No. Libra Colf è pensato per chi non ha alcuna conoscenza di buste paga o CCNL. Basta inserire i dati del contratto una volta sola.",
  },
  {
    question: "Cosa succede se cambio le condizioni di lavoro?",
    answer:
      "Basta aggiornare i dati: Libra Colf ricalcola automaticamente tutti i periodi futuri. Nessun ricalcolo manuale.",
  },
  {
    question: "Come funzionano i bollettini INPS trimestrali?",
    answer:
      "Scadono 4 volte l'anno. Ricevi un promemoria prima di ogni scadenza con il bollettino già calcolato e pronto da pagare.",
  },
  {
    question: "Posso disdire quando voglio?",
    answer:
      "Sì. Nessun vincolo contrattuale: puoi disdire il piano mensile in qualsiasi momento senza penali.",
  },
  {
    question: "I miei dati sono al sicuro?",
    answer:
      "Assolutamente sì. Libra Colf è conforme al GDPR e utilizza connessioni cifrate. Le informazioni non vengono mai cedute a terzi.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionId = useId();

  return (
    <section id="faq" className="bg-[#f9fafb] px-6 py-24 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/55">
            FAQ
          </p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.05em] text-[#0f1c2c] sm:text-5xl">
            Domande frequenti
          </h2>
        </div>

        <div className="mt-12 divide-y divide-slate-200 rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${sectionId}-panel-${index}`;
            const buttonId = `${sectionId}-button-${index}`;

            return (
              <div key={item.question} className="px-5 sm:px-7">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg font-semibold leading-7 text-[#0f1c2c] sm:text-[1.15rem]">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="shrink-0 text-slate-400"
                  >
                    <ChevronDown className="h-5 w-5" strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="pb-6 pr-10 text-base leading-8 text-[#4b5563]"
                      >
                        {item.answer}
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
