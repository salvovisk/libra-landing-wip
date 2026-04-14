"use client";

import { motion } from "framer-motion";
import { Building2, Home } from "lucide-react";

import type { Persona } from "@/lib/site-data";

type PersonaSwitcherProps = {
  persona: Persona;
  onChange: (persona: Persona) => void;
};

export function PersonaSwitcher({ persona, onChange }: PersonaSwitcherProps) {
  return (
    <section id="persona-switcher" className="py-10 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-primary/40">
          Seleziona il profilo
        </p>
        <p className="mb-6 max-w-xl text-base font-medium leading-7 text-muted sm:text-lg">
          Scegli il tuo profilo per vedere le funzionalita piu rilevanti per te.
        </p>
        <div className="relative inline-grid w-full max-w-[900px] grid-cols-2 rounded-[28px] border border-white/70 bg-white/80 p-1 shadow-soft backdrop-blur-xl ring-1 ring-inset ring-black/5">
          <motion.span
            initial={false}
            animate={{ left: persona === "private" ? "0.25rem" : "50%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
            className="absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-[24px] bg-primary shadow-[0_14px_32px_rgba(11,59,136,0.22)]"
          />
          <button
            onClick={() => onChange("private")}
            className={`relative inline-flex items-center justify-center gap-3 rounded-[24px] px-6 py-5 text-base font-semibold transition ${
              persona === "private" ? "text-white" : "text-slate-600"
            }`}
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              <Home className="h-5 w-5" />
              Privato
            </span>
          </button>
          <button
            onClick={() => onChange("pro")}
            className={`relative inline-flex items-center justify-center gap-3 rounded-[24px] px-6 py-5 text-base font-semibold transition ${
              persona === "pro" ? "text-white" : "text-slate-600"
            }`}
          >
            <span className="relative z-10 inline-flex items-center gap-3">
              <Building2 className="h-5 w-5" />
              CAF / Studio
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
