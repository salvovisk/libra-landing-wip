"use client";

import Image from "next/image";
import { animate, AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { workflowCopy } from "@/lib/site-data";
import { Bell, CalendarDays, CheckCircle2, Download, Euro, FileText, FolderArchive, Send, Stamp, UserCircle2 } from "lucide-react";
type Step = {
  id: string;
  step: string;
  headline: string;
  subtext: string;
};

const STEPS: Step[] = [
  {
    id: "01",
    step: "01",
    headline: "Inserisci i dati del contratto",
    subtext: "Nome, livello, ore settimanali e data di inizio. Ci vogliono meno di 5 minuti."
  },
  {
    id: "02",
    step: "02",
    headline: "Il sistema calcola tutto automaticamente",
    subtext: "Stipendio, contributi INPS, trattenute, tredicesima e TFR: calcolati ogni mese nel rispetto del CCNL."
  },
  {
    id: "03",
    step: "03",
    headline: "La busta paga parte da sola ogni 27",
    subtext: "Ogni mese la busta paga viene generata e inviata automaticamente via email alla tua collaboratrice."
  },
  {
    id: "04",
    step: "04",
    headline: "Ricevi il promemoria per i bollettini INPS",
    subtext: "Prima di ogni scadenza trimestrale ricevi una notifica con il bollettino già calcolato e pronto da pagare."
  },
  {
    id: "05",
    step: "05",
    headline: "Fine anno: Certificazione Unica già pronta",
    subtext: "A gennaio la CU è disponibile automaticamente per la tua dichiarazione dei redditi."
  }
];


export function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepsListRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsListRef,
    offset: ["start 35%", "end 65%"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;

    const updateActiveStep = () => {
      const targetLine = window.innerHeight * 0.38;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - targetLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  return (
    <section
      id="funzionalita"
      ref={sectionRef}
      className="bg-[#F8FAFC] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/55">
            {workflowCopy.eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-extrabold tracking-[-0.05em] text-ink sm:text-5xl">
            {workflowCopy.heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">{workflowCopy.subheading}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-start">
          <div className="relative">
            <div className="absolute left-[19px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-slate-200 lg:block" />
            <motion.div
              style={{ height: progressHeight }}
              className="absolute left-[19px] top-3 hidden w-px bg-primary lg:block"
            />

            <div ref={stepsListRef} className="space-y-10 lg:pb-[40vh]">
              {workflowCopy.steps.map((step, index) => {
                const active = index === activeIndex;

                return (
                  <div
                    key={step.id}
                    ref={(node) => {
                      stepRefs.current[index] = node;
                    }}
                    className="relative pl-0 lg:pl-14"
                  >
                    <div className="absolute left-0 top-1 hidden lg:block">
                      <div
                        className={`h-10 w-10 rounded-full border-2 transition ${active
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white text-slate-400"
                          }`}
                      >
                        <div className="flex h-full items-center justify-center text-xs font-extrabold tracking-[0.18em]">
                          {step.step}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`rounded-[24px] border p-6 transition duration-300 sm:p-7 ${active
                        ? "border-primary/15 bg-white shadow-[0_20px_45px_rgba(11,59,136,0.08)] opacity-100"
                        : "border-transparent bg-transparent opacity-30"
                        }`}
                    >
                      <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary lg:hidden">
                        Step {step.step}
                      </div>
                      <h3
                        className={`text-3xl font-extrabold tracking-[-0.045em] transition ${active ? "text-primary" : "text-ink"
                          }`}
                      >
                        {step.headline}
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                        {step.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — sticky glass theater */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start h-[580px]">
            <Theater active={activeIndex} total={STEPS.length} />
          </div>
        </div>
      </div>
    </section>
  );
}


function Theater({
  active,
  total,
  compact = false
}: {
  active: number;
  total: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/30 bg-white/40 backdrop-blur-md shadow-[0_40px_120px_-20px_rgba(0,55,126,0.25)] ${compact ? "aspect-[4/5]" : ""
        }`}
    >
      <GhostLayer />

      <motion.div
        aria-hidden
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,55,126,0.35), transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-3 py-1 text-xs font-medium text-[#00377e] backdrop-blur-md">
        <span className="tabular-nums">0{active + 1}</span>
        <span className="text-slate-400">/</span>
        <span className="tabular-nums text-slate-400">0{total}</span>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm"
          >
            {active === 0 && <Panel1 />}
            {active === 1 && <Panel2 />}
            {active === 2 && <Panel3 />}
            {active === 3 && <Panel4 />}
            {active === 4 && <Panel5 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function GhostLayer() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 opacity-60">
      <div className="absolute left-10 top-16 h-40 w-32 rounded-xl border border-white/40 bg-white/20 backdrop-blur-sm" />
      <div className="absolute bottom-16 right-14 h-28 w-28 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-sm" />
      <div className="absolute left-1/3 bottom-10 h-20 w-44 rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm" />
    </div>
  );
}
const PRIMARY = "#00377e";

function ProgressRail({ active, total }: { active: number; total: number }) {
  const pct = ((active + 1) / total) * 100;
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-slate-100/50">
      <motion.div
        className="h-full"
        style={{ background: PRIMARY }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ---------- PANELS ---------- */

function Panel1() {
  return (
    <div className="relative">
      <motion.div
        className="relative rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-md"
        initial={{ rotateX: 8 }}
        animate={{ rotateX: 0 }}
      >
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#00377e]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contratto CCNL</span>
        </div>

        <div className="space-y-3">
          {[90, 70, 85, 60].map((w, i) => (
            <div key={i} className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-[#00377e]/80"
                initial={{ width: "0%" }}
                animate={{ width: `${w}%` }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {["Livello B", "25h/sett"].map((t) => (
            <div key={t} className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs text-slate-600">
              {t}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-4 -top-5 z-10 flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-1.5 shadow-lg"
        initial={{ x: 60, y: -30, opacity: 0, scale: 0.6 }}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
      >
        <UserCircle2 className="h-5 w-5 text-[#00377e]" />
        <span className="text-xs font-medium text-slate-700">Maria R.</span>
      </motion.div>
    </div>
  );
}

function Panel2() {
  const chips = [
    { label: "INPS", angle: 0 },
    { label: "TFR", angle: 90 },
    { label: "13ma", angle: 180 },
    { label: "Ferie", angle: 270 }
  ];

  return (
    <div className="relative flex h-72 items-center justify-center">
      <div className="absolute h-56 w-56 rounded-full border border-dashed border-[#00377e]/30" />
      <div className="absolute h-40 w-40 rounded-full border border-[#00377e]/20" />

      <motion.div
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white shadow-[0_0_40px_rgba(0,55,126,0.35)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Euro className="h-10 w-10 text-[#00377e]" strokeWidth={2.2} />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 rgba(0,55,126,0.4)" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(0,55,126,0.4)", "0 0 0 20px rgba(0,55,126,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-white/90 px-4 py-1.5 text-sm font-semibold tabular-nums text-[#00377e] shadow-md backdrop-blur-md">
        <Counter to={1284.5} />
        <span className="ml-1 text-xs text-slate-400">€ netti</span>
      </div>

      {chips.map((chip, i) => (
        <OrbitChip key={chip.label} label={chip.label} angle={chip.angle} delay={0.1 + i * 0.12} />
      ))}
    </div>
  );
}

function OrbitChip({ label, angle, delay }: { label: string; angle: number; delay: number }) {
  const r = 110;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;

  return (
    <motion.div
      className="absolute rounded-full border border-white/70 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-md"
      initial={{ x, y, opacity: 0, scale: 0.8 }}
      animate={{ x: [x, x, 0], y: [y, y, 0], opacity: [0, 1, 0], scale: [0.8, 1, 0.4] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  );
}

function Counter({ to }: { to: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0,00");

  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    const unsub = mv.on("change", (v) => setDisplay(v.toFixed(2).replace(".", ",")));
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, to]);

  return <span>{display}</span>;
}

function Panel3() {
  return (
    <div className="relative">
      <motion.div
        className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Busta paga</span>
          <span className="text-xs text-slate-400">27 del mese</span>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Lordo</span>
            <span className="font-medium text-slate-800">€ 1.540,00</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Contributi</span>
            <span className="font-medium text-slate-800">-€ 255,50</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-semibold text-[#00377e]">
            <span>Netto</span>
            <span>€ 1.284,50</span>
          </div>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-[#00377e]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-400">Invio automatico in corso…</div>
      </motion.div>

      <motion.div
        className="absolute right-6 top-4 text-[#00377e]"
        initial={{ x: 0, y: 0, opacity: 0, rotate: -20 }}
        animate={{ x: 120, y: -80, opacity: [0, 1, 1, 0], rotate: -10 }}
        transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
      >
        <Send className="h-6 w-6" />
      </motion.div>

      <motion.div
        className="absolute -top-4 right-0 flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-lg"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 18 }}
      >
        <CheckCircle2 className="h-4 w-4" />
        Inviata
      </motion.div>
    </div>
  );
}

function Panel4() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const target = 20;

  return (
    <div className="space-y-4">
      <motion.div
        className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#00377e]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Aprile 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => {
            const isTarget = d === target;
            return (
              <div
                key={d}
                className={`relative flex aspect-square items-center justify-center rounded-md text-[10px] font-medium ${isTarget ? "text-white" : "text-slate-400"
                  }`}
              >
                {isTarget && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-[#00377e]"
                    animate={{ boxShadow: ["0 0 0 0 rgba(0,55,126,0.6)", "0 0 0 8px rgba(0,55,126,0)"] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">{d}</span>
                {isTarget && (
                  <motion.div
                    className="absolute -top-1 -right-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <Bell className="h-2.5 w-2.5 text-[#00377e]" fill="currentColor" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-[#00377e]/20 bg-[#00377e] px-4 py-3 text-left text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-wider opacity-70">PagoPA • Bollettino INPS</div>
          <div className="text-sm font-semibold tabular-nums">€ 327,18</div>
        </div>
        <div className="flex flex-col gap-0.5">
          {[4, 2, 3, 1, 4, 2, 3].map((h, i) => (
            <div key={i} className="flex gap-0.5">
              {Array.from({ length: h }).map((_, j) => (
                <div key={j} className="h-0.5 w-0.5 rounded-full bg-white/90" />
              ))}
            </div>
          ))}
        </div>
      </motion.button>
    </div>
  );
}

function Panel5() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative h-56 w-56">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-sm shadow-md"
            style={{ zIndex: i }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: i * -8, x: i * 6, opacity: 1 - i * 0.2 }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
          />
        ))}

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl border border-white/70 bg-white p-5 shadow-xl"
          style={{ transform: "translate(18px, -24px)" }}
          initial={{ y: 0 }}
          animate={{ y: [-24, -30, -24] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FolderArchive className="h-10 w-10 text-[#00377e]" />
          <div className="mt-2 text-xs font-semibold text-slate-800">CU 2026</div>
          <div className="text-[10px] text-slate-400">Certificazione Unica</div>

          <motion.div
            className="mt-3 flex items-center gap-1.5 rounded-full bg-[#00377e] px-3 py-1.5 text-[10px] font-medium text-white shadow-md"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: [0, -3, 0], opacity: 1 }}
            transition={{ opacity: { delay: 0.9 }, y: { delay: 1.1, duration: 1.6, repeat: Infinity } }}
          >
            <Download className="h-3 w-3" />
            Scarica
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -right-6 -top-6 z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#00377e]/60 bg-white/80 backdrop-blur-md"
          initial={{ scale: 0, rotate: -60 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 14 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path id="seal-circle" d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
              </defs>
              <text className="fill-[#00377e]/70 text-[9px] font-semibold tracking-widest">
                <textPath href="#seal-circle">• UFFICIALE • LIBRA • 2026 </textPath>
              </text>
            </svg>
          </motion.div>
          <Stamp className="h-6 w-6 text-[#00377e]" />
        </motion.div>
      </div>
    </div>
  );
}
