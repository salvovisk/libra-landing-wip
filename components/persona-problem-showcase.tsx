"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { personaProblemCopy, type Persona } from "@/lib/site-data";

const BRAND = "#00377e";

type StyleKey = "editorial" | "manuscript" | "quiet";

const STYLE_OPTIONS: { id: StyleKey; label: string; hint: string }[] = [
  { id: "editorial", label: "Editorial Column", hint: "Ritmo verticale, tipografico" },
  { id: "manuscript", label: "Split Manuscript", hint: "Due colonne, magazine" },
  { id: "quiet", label: "Quiet List", hint: "Numeri display, linee sottili" },
];

export function PersonaProblemShowcase() {
  const [style, setStyle] = useState<StyleKey>("editorial");
  const [persona, setPersona] = useState<Persona>("private");
  const content = personaProblemCopy.content[persona];

  return (
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${BRAND}33, transparent)` }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 flex flex-col items-start gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em]"
              style={{ color: `${BRAND}99` }}
            >
              Problem Section · Design Exploration
            </p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Tre modi, <span style={{ color: BRAND }}>piu silenziosi</span>, di<br className="hidden sm:block" /> inquadrare lo stesso problema.
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <PersonaToggle persona={persona} onChange={setPersona} />
            <StyleToggle style={style} onChange={setStyle} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${style}-${persona}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {style === "editorial" && <EditorialColumn content={content} />}
            {style === "manuscript" && <SplitManuscript content={content} />}
            {style === "quiet" && <QuietList content={content} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

type Content = (typeof personaProblemCopy)["content"][Persona];

/* ------------------------------- Toggles ------------------------------- */

function PersonaToggle({
  persona,
  onChange,
}: {
  persona: Persona;
  onChange: (p: Persona) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-black/5 bg-white/80 p-1 text-sm shadow-sm backdrop-blur">
      {(["private", "pro"] as const).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="relative rounded-full px-4 py-1.5 font-medium transition"
          style={{ color: persona === p ? "#fff" : "#475569" }}
        >
          {persona === p && (
            <motion.span
              layoutId="problem-persona-pill"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: BRAND }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10">
            {p === "private" ? "Privato" : "CAF / Studio"}
          </span>
        </button>
      ))}
    </div>
  );
}

function StyleToggle({
  style,
  onChange,
}: {
  style: StyleKey;
  onChange: (s: StyleKey) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-2">
      {STYLE_OPTIONS.map((opt) => {
        const active = style === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="rounded-2xl border px-4 py-2 text-left transition"
            style={{
              borderColor: active ? BRAND : "rgba(15,23,42,0.08)",
              backgroundColor: active ? BRAND : "#fff",
              color: active ? "#fff" : "#0f172a",
              boxShadow: active ? `0 10px 30px ${BRAND}33` : "none",
            }}
          >
            <div className="text-sm font-semibold leading-tight">{opt.label}</div>
            <div
              className="text-[11px] font-medium leading-tight"
              style={{ color: active ? "#ffffffcc" : "#64748b" }}
            >
              {opt.hint}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------------- LAYOUT A ------------------------------- */
/* Editorial Column — quiet vertical rhythm, typographic hierarchy */

function EditorialColumn({ content }: { content: Content }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p
        className="mb-6 text-[11px] font-bold uppercase tracking-[0.32em]"
        style={{ color: `${BRAND}aa` }}
      >
        {personaProblemCopy.eyebrow}
      </p>
      <h3 className="text-balance text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.75rem]">
        {content.title}
      </h3>
      <p className="mt-6 text-lg leading-8 text-muted">{content.description}</p>

      <div className="mt-14 border-t border-slate-200" />

      <ol className="mt-4">
        {content.pains.map((pain, i) => (
          <motion.li
            key={pain.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            className="border-b border-slate-200 py-10"
          >
            <div className="flex items-baseline gap-6">
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: `${BRAND}aa` }}
              >
                0{i + 1}
              </span>
              <div>
                <h4 className="max-w-[32ch] text-2xl font-semibold leading-snug tracking-tight text-ink">
                  {pain.title}
                </h4>
                <p className="mt-3 max-w-[60ch] text-base leading-7 text-muted">
                  {pain.description}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ----------------------------- LAYOUT B ------------------------------- */
/* Split Manuscript — magazine feel, two columns */

function SplitManuscript({ content }: { content: Content }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div
          className="mb-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: `${BRAND}aa` }}
        >
          <span className="h-px w-8" style={{ backgroundColor: `${BRAND}66` }} />
          {personaProblemCopy.eyebrow}
        </div>

        <h3 className="text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3rem]">
          {content.title}
        </h3>

        <p className="mt-8 text-lg leading-8 text-muted">{content.description}</p>

        <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.26em] text-slate-400">
          <span>Osservato su</span>
          <span className="tabular-nums text-slate-600">3 aree</span>
          <span className="h-px flex-1" style={{ backgroundColor: "#e2e8f0" }} />
        </div>
      </aside>

      <div className="space-y-10">
        {content.pains.map((pain, i) => (
          <motion.article
            key={pain.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            className="relative pl-10"
          >
            <span
              className="absolute left-0 top-1 text-xs font-bold tracking-[0.18em] tabular-nums"
              style={{ color: BRAND }}
            >
              N° 0{i + 1}
            </span>
            <h4 className="text-[1.6rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[1.75rem]">
              {pain.title}
            </h4>
            <p className="mt-3 max-w-[56ch] text-base leading-7 text-muted">
              {pain.description}
            </p>
            {i < content.pains.length - 1 && (
              <div
                className="mt-10 h-px w-16"
                style={{ backgroundColor: `${BRAND}33` }}
              />
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- LAYOUT C ------------------------------- */
/* Quiet List — display numerals, hairline separators */

function QuietList({ content }: { content: Content }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-10 border-b border-slate-200 pb-12 lg:grid-cols-[auto_1fr] lg:gap-20">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: `${BRAND}aa` }}
        >
          {personaProblemCopy.eyebrow}
        </p>
        <div>
          <h3 className="text-balance text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2.75rem]">
            {content.title}
          </h3>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-muted">
            {content.description}
          </p>
        </div>
      </div>

      <ul>
        {content.pains.map((pain, i) => (
          <motion.li
            key={pain.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
            className="grid items-start gap-6 border-b border-slate-200 py-10 lg:grid-cols-[auto_1fr] lg:gap-20"
          >
            <span
              className="text-6xl font-semibold leading-none tracking-tight tabular-nums sm:text-7xl"
              style={{ color: `${BRAND}22` }}
            >
              0{i + 1}
            </span>
            <div className="lg:pt-3">
              <div
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em]"
                style={{ color: `${BRAND}aa` }}
              >
                Punto critico
              </div>
              <h4 className="max-w-[34ch] text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                {pain.title}
              </h4>
              <p className="mt-4 max-w-[60ch] text-base leading-7 text-muted">
                {pain.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
