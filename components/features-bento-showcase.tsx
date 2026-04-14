"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  FileCheck2,
  FileInput,
  MailCheck,
  MousePointerClick,
  Receipt,
  RefreshCw,
  ScrollText,
  SlidersHorizontal,
} from "lucide-react";

const BRAND = "#00377e";

type StyleKey = "standard" | "interactive" | "stream";
type PersonaKey = "private" | "pro";

type Feature = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  detail: string;
  tags?: string[];
  icon: typeof ArrowRight;
};

const FEATURES: Record<PersonaKey, Feature[]> = {
  private: [
    {
      id: "busta-paga-automatica",
      kicker: "Payroll on autopilot",
      title: "Busta paga automatica il 27 di ogni mese",
      description:
        "Il 27 di ogni mese Libra Colf genera e invia la busta paga via email alla tua collaboratrice. Tu non devi cliccare nulla.",
      detail:
        "Calendario fiscale integrato, invio PDF firmato e backup automatico nell'archivio personale.",
      tags: ["100% automatico", "Ogni mese"],
      icon: MailCheck,
    },
    {
      id: "promemoria-inps",
      kicker: "Scadenze INPS",
      title: "Promemoria bollettini INPS",
      description:
        "Ti avvisiamo prima di ogni scadenza trimestrale con il bollettino gia pronto. Zero sorprese, zero more.",
      detail:
        "Notifiche push ed email, importo precalcolato e link al pagamento PagoPA in un tap.",
      icon: BellRing,
    },
    {
      id: "ccnl-aggiornato",
      kicker: "Contratto",
      title: "Sempre aggiornato al CCNL",
      description:
        "Ogni aggiornamento del contratto collettivo viene applicato automaticamente. Non devi seguire notizie o circolari.",
      detail:
        "Tabelle minimi retributivi, scatti di anzianita e nuove voci applicate in tempo reale.",
      icon: RefreshCw,
    },
    {
      id: "cu-pronta",
      kicker: "Fine anno",
      title: "Certificazione Unica sempre pronta",
      description:
        "A fine anno la CU e generata automaticamente, pronta per la dichiarazione dei redditi.",
      detail:
        "Format ministeriale conforme, invio telematico preconfigurato e copia archiviata per 10 anni.",
      icon: FileCheck2,
    },
    {
      id: "variazioni-click",
      kicker: "Eccezioni",
      title: "Variazioni in un click",
      description:
        "Ferie, malattia, straordinari? Inserisci solo le eccezioni. Il sistema ricalcola tutto da solo.",
      detail:
        "Calendario drag & drop, giustificativi allegabili e ricalcolo istantaneo di netto e contributi.",
      icon: MousePointerClick,
    },
  ],
  pro: [
    {
      id: "import-inps",
      kicker: "Onboarding lampo",
      title: "Import automatico dal contratto INPS",
      description:
        "Basta caricare il PDF del contratto INPS: il sistema estrae tutti i dati e configura l'anagrafica in pochi secondi. Addio data-entry manuale.",
      detail:
        "OCR specializzato, validazione dei codici contratto e mapping automatico con il CCNL corrente.",
      tags: ["PDF Parsing", "Zero Errori"],
      icon: FileInput,
    },
    {
      id: "invio-buste",
      kicker: "Distribuzione",
      title: "Invio automatico buste paga",
      description:
        "Il 27 di ogni mese il sistema genera e invia automaticamente le buste paga via email. Senza che tu debba cliccare nulla.",
      detail:
        "Template white-label, firma digitale e tracciamento delle aperture per ogni lavoratore.",
      icon: MailCheck,
    },
    {
      id: "variazioni-mensili",
      kicker: "Operativita minima",
      title: "Solo le variazioni mensili",
      description:
        "Non inserisci piu le presenze standard. Il sistema prevede che tutto sia regolare, inserisci solo le variazioni (ferie, malattie, straordinari).",
      detail:
        "Bulk edit per piu lavoratori, shortcut da tastiera e audit log delle modifiche per ogni pratica.",
      icon: SlidersHorizontal,
    },
    {
      id: "bollettini-trimestrali",
      kicker: "Compliance",
      title: "Bollettini Trimestrali Automatici",
      description:
        "Download dei bollettini MAV/PagoPA e inoltro automatico ai datori di lavoro via email. Zero click da parte tua.",
      detail:
        "Riconciliazione automatica, stato pagamento in dashboard e reminder ai ritardatari.",
      icon: Receipt,
    },
    {
      id: "aggiornamento-future",
      kicker: "Forward sync",
      title: "Aggiornamento Buste Future",
      description:
        "Ogni modifica contrattuale si riflette istantaneamente su tutti i periodi futuri, mantenendo il ledger sempre coerente.",
      detail:
        "Simulazione impatto, propagazione selettiva per pratica e versioning delle modifiche.",
      icon: ScrollText,
    },
  ],
};

const STYLE_OPTIONS: { id: StyleKey; label: string; hint: string }[] = [
  { id: "standard", label: "Standard Bento", hint: "Tipografia e gerarchia" },
  { id: "interactive", label: "Interactive Cards", hint: "Micro-interazioni" },
  { id: "stream", label: "Bento-Stream", hint: "Flusso e connessioni" },
];

export function FeaturesBentoShowcase() {
  const [style, setStyle] = useState<StyleKey>("standard");
  const [persona, setPersona] = useState<PersonaKey>("private");

  const features = FEATURES[persona];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 0%, ${BRAND}18, transparent 55%), radial-gradient(circle at 85% 90%, ${BRAND}10, transparent 50%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10 flex flex-col items-start gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.28em]"
              style={{ color: `${BRAND}99` }}
            >
              Features · Design Exploration
            </p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Tre modi di raccontare <span style={{ color: BRAND }}>la stessa cosa</span>.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Scegli il layout per la sezione Features. Contenuti identici, ritmi visivi diversi.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <PersonaToggle persona={persona} onChange={setPersona} />
            <StyleToggle style={style} onChange={setStyle} />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${style}-${persona}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {style === "standard" && <StandardBento features={features} />}
            {style === "interactive" && <InteractiveCards features={features} />}
            {style === "stream" && <BentoStream features={features} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PersonaToggle({
  persona,
  onChange,
}: {
  persona: PersonaKey;
  onChange: (p: PersonaKey) => void;
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
              layoutId="persona-pill"
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
            className="group rounded-2xl border px-4 py-2 text-left transition"
            style={{
              borderColor: active ? BRAND : "rgba(15,23,42,0.08)",
              backgroundColor: active ? BRAND : "#ffffff",
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

/* ------------------------------- LAYOUT A ------------------------------- */

function StandardBento({ features }: { features: Feature[] }) {
  const [hero, second, ...rest] = features;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[72px]">
      <BentoCard
        className="md:col-span-8 md:row-span-5"
        feature={hero}
        size="lg"
        accent
      />
      <BentoCard
        className="md:col-span-4 md:row-span-5"
        feature={second}
        size="md"
      />
      {rest.map((f) => (
        <BentoCard
          key={f.id}
          className="md:col-span-4 md:row-span-4"
          feature={f}
          size="sm"
        />
      ))}
    </div>
  );
}

function BentoCard({
  feature,
  className = "",
  size = "md",
  accent = false,
}: {
  feature: Feature;
  className?: string;
  size?: "sm" | "md" | "lg";
  accent?: boolean;
}) {
  const Icon = feature.icon;
  const titleSize =
    size === "lg"
      ? "text-4xl sm:text-5xl"
      : size === "md"
      ? "text-2xl sm:text-3xl"
      : "text-xl";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-7 ${className}`}
      style={{
        borderColor: accent ? "transparent" : "rgba(15,23,42,0.06)",
        background: accent
          ? `linear-gradient(135deg, ${BRAND} 0%, #0a1f4a 100%)`
          : "#ffffff",
        color: accent ? "#fff" : "#0f172a",
        boxShadow: accent
          ? `0 30px 80px ${BRAND}44`
          : "0 12px 36px rgba(15,23,42,0.06)",
      }}
    >
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #ffffff55, transparent 60%)" }}
        />
      )}

      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: accent ? "#ffffff1a" : `${BRAND}12`,
            color: accent ? "#fff" : BRAND,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent ? "#ffffffaa" : `${BRAND}99` }}
        >
          {feature.kicker}
        </span>
      </div>

      <div className="mt-8">
        <h3 className={`font-semibold leading-[1.05] tracking-tight ${titleSize}`}>
          {feature.title}
        </h3>
        <p
          className="mt-3 max-w-md text-sm leading-6 sm:text-base"
          style={{ color: accent ? "#ffffffcc" : "#5f6b84" }}
        >
          {feature.description}
        </p>
      </div>

      {feature.tags && feature.tags.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {feature.tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{
                backgroundColor: accent ? "#ffffff1f" : `${BRAND}10`,
                color: accent ? "#fff" : BRAND,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : (
        <div
          className="mt-6 flex items-center gap-2 text-sm font-semibold"
          style={{ color: accent ? "#fff" : BRAND }}
        >
          Scopri di piu <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </motion.article>
  );
}

/* ------------------------------- LAYOUT B ------------------------------- */

function InteractiveCards({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      {features.map((f, i) => (
        <FlipCard
          key={f.id}
          feature={f}
          index={i}
          className={
            i === 0
              ? "md:col-span-3"
              : i === 1
              ? "md:col-span-3"
              : "md:col-span-2"
          }
        />
      ))}
    </div>
  );
}

function FlipCard({
  feature,
  index,
  className = "",
}: {
  feature: Feature;
  index: number;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 22 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      className={`relative h-[320px] cursor-pointer [perspective:1400px] ${className}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border p-7 [backface-visibility:hidden]"
          style={{
            borderColor: "rgba(15,23,42,0.06)",
            backgroundColor: "#fff",
            boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
          }}
        >
          <motion.span
            animate={{ rotate: flipped ? 15 : 0, scale: flipped ? 1.08 : 1 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${BRAND}12`, color: BRAND }}
          >
            <Icon className="h-6 w-6" />
          </motion.span>
          <div>
            <div
              className="text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: `${BRAND}99` }}
            >
              {feature.kicker}
            </div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-ink">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            Passa sopra per i dettagli <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            background: `linear-gradient(160deg, ${BRAND} 0%, #081a40 100%)`,
            boxShadow: `0 24px 60px ${BRAND}55`,
          }}
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Come funziona
            </div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
              {feature.title}
            </h3>
          </div>
          <p className="text-sm leading-6 text-white/85">{feature.detail}</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            Vai alla demo <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------- LAYOUT C ------------------------------- */

function BentoStream({ features }: { features: Feature[] }) {
  const offsets = ["md:mt-0", "md:mt-16", "md:mt-4", "md:mt-20", "md:mt-8"];
  const paths = [
    "M 110 140 C 220 140, 240 260, 340 260",
    "M 340 260 C 440 260, 460 160, 560 160",
    "M 560 160 C 660 160, 680 280, 780 280",
    "M 780 280 C 880 280, 900 200, 980 200",
  ];

  return (
    <div className="relative">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        preserveAspectRatio="none"
        viewBox="0 0 1080 440"
      >
        <defs>
          <linearGradient id="stream-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BRAND} stopOpacity="0" />
            <stop offset="50%" stopColor={BRAND} stopOpacity="0.9" />
            <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#stream-grad)"
            strokeWidth={1.5}
            strokeDasharray="6 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: i * 0.2, ease: "easeOut" }}
          />
        ))}
      </svg>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-5">
        {features.map((f, i) => (
          <StreamNode key={f.id} feature={f} index={i} offsetClass={offsets[i] ?? "md:mt-0"} />
        ))}
      </div>

      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-xs sm:text-sm"
        style={{ borderColor: `${BRAND}22`, backgroundColor: `${BRAND}08`, color: BRAND }}
      >
        <span
          className="inline-block h-2 w-2 animate-pulse rounded-full"
          style={{ backgroundColor: BRAND }}
        />
        <span className="font-semibold">Flusso dati:</span>
        <span className="text-muted">
          {features.map((f) => f.title.split(" ").slice(0, 3).join(" ")).join("  →  ")}
        </span>
      </div>
    </div>
  );
}

function StreamNode({
  feature,
  index,
  offsetClass,
}: {
  feature: Feature;
  index: number;
  offsetClass: string;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.12, type: "spring", stiffness: 180, damping: 22 }}
      className={`relative ${offsetClass}`}
    >
      <div
        className="relative overflow-hidden rounded-3xl border bg-white p-6"
        style={{
          borderColor: "rgba(15,23,42,0.06)",
          boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: BRAND, color: "#fff" }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ borderColor: `${BRAND}33`, color: BRAND }}
          >
            Step {index + 1}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight text-ink">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>

        <div
          className="mt-5 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium"
          style={{ backgroundColor: `${BRAND}0d`, color: BRAND }}
        >
          <span>{feature.kicker}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4 }}
        className="absolute -right-2 top-10 block h-4 w-4 rounded-full"
        style={{ backgroundColor: `${BRAND}55` }}
      />
    </motion.div>
  );
}
