"use client";

import { CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    id: "marco",
    quote:
      "LibraColf mi ha aiutato a risparmiare almeno 5 ore ogni mese di conteggi manuali. Indispensabile.",
    author: "Marco R.",
    role: "Datore di lavoro domestico",
    initials: "MR",
  },
  {
    id: "elena",
    quote:
      "Il software è perfetto per gestire le mie due badanti senza errori. Finalmente dormo sonni tranquilli.",
    author: "Elena V.",
    role: "Famiglia con due rapporti attivi",
    initials: "EV",
  },
  {
    id: "giuseppe",
    quote:
      "Interfaccia pulita e semplicissima. Non serve essere esperti di buste paga.",
    author: "Giuseppe T.",
    role: "Datore di lavoro privato",
    initials: "GT",
  },
  {
    id: "alessia",
    quote:
      "I promemoria per i bollettini INPS sono una salvezza. Mai più pagamenti in ritardo.",
    author: "Alessia M.",
    role: "Gestione domestica ricorrente",
    initials: "AM",
  },
  {
    id: "francesca",
    quote:
      "Prima tenevo tutto su fogli sparsi. Ora ho documenti, scadenze e busta paga nello stesso posto.",
    author: "Francesca L.",
    role: "Datrice di lavoro domestico",
    initials: "FL",
  },
  {
    id: "paolo",
    quote:
      "La parte migliore è la chiarezza: capisco subito cosa devo fare ogni mese senza chiedere aiuto a nessuno.",
    author: "Paolo C.",
    role: "Gestione colf e adempimenti",
    initials: "PC",
  },
];

function TestimonialCard({
  testimonial,
  index,
  mobile = false,
}: {
  testimonial: Testimonial;
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`break-inside-avoid rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.1)] ${
        mobile ? "min-w-[84vw] max-w-[84vw] snap-center sm:min-w-[460px] sm:max-w-[460px]" : "mb-5"
      }`}
    >
      <div className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className="h-4 w-4 fill-[#facc15] text-[#facc15]"
            strokeWidth={2}
          />
        ))}
      </div>

      <p className="mt-5 text-base leading-7 text-slate-700">{testimonial.quote}</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-sm font-extrabold text-primary">
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#0f1c2c]">{testimonial.author}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.2} />
              Verificato
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24" id="testimonianze">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[var(--font-manrope)] text-4xl font-extrabold tracking-[-0.05em] text-[#0f1c2c] sm:text-5xl">
            Scelto da oltre 3.200 famiglie in tutta Italia
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Ecco cosa dicono i datori di lavoro che hanno semplificato la loro burocrazia con Libra.
          </p>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`mobile-${testimonial.id}`}
              testimonial={testimonial}
              index={index}
              mobile
            />
          ))}
        </div>

        <div className="mt-14 hidden gap-5 md:block md:columns-2 md:[column-fill:_balance] lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
