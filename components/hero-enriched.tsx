"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent } from "react";
import posthog from "posthog-js";

import { heroCopy } from "@/lib/site-data";

export function HeroEnriched() {
  const rotateX = useSpring(useMotionValue(3), { stiffness: 110, damping: 16 });
  const rotateY = useSpring(useMotionValue(-7), { stiffness: 110, damping: 16 });
  const translateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const translateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const transform = useMotionTemplate`perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const percentX = offsetX / rect.width - 0.5;
    const percentY = offsetY / rect.height - 0.5;

    rotateY.set(percentX * 10);
    rotateX.set(percentY * -8);
    translateX.set(percentX * 14);
    translateY.set(percentY * 10);
  }

  function reset() {
    rotateX.set(3);
    rotateY.set(-7);
    translateX.set(0);
    translateY.set(0);
  }

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-6 sm:pb-28 sm:pt-8 lg:min-h-[calc(100svh-6.5rem)] lg:py-10">
      {/* Grid pattern — taller & more visible */}
      <div className="absolute inset-x-0 top-0 h-[820px] bg-hero-grid bg-[size:54px_54px] opacity-40 [mask-image:linear-gradient(180deg,white,transparent)]" />

      {/* Radial glow behind left column */}
      <div className="pointer-events-none absolute left-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />

      {/* Horizontal accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-[60%] h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

      {/* Geometric decorations — boosted opacity */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large circle outline top-right */}
        <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-primary/12" />
        <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-primary/10" />
        {/* Small accent rings bottom-left */}
        <div className="absolute -bottom-16 -left-16 h-[280px] w-[280px] rounded-full border border-emerald/14" />
        <div className="absolute -bottom-8 -left-8 h-[180px] w-[180px] rounded-full border border-emerald/12" />
        {/* Diagonal line cluster top-left */}
        <svg className="absolute left-0 top-0 h-64 w-64 opacity-[0.10]" viewBox="0 0 200 200" fill="none">
          <line x1="0" y1="40" x2="200" y2="240" stroke="#0b3b88" strokeWidth="1" />
          <line x1="0" y1="80" x2="200" y2="280" stroke="#0b3b88" strokeWidth="1" />
          <line x1="0" y1="120" x2="200" y2="320" stroke="#0b3b88" strokeWidth="1" />
          <line x1="0" y1="160" x2="200" y2="360" stroke="#0b3b88" strokeWidth="1" />
        </svg>
        {/* Dot grid cluster bottom-right — bigger & more visible */}
        <svg className="absolute bottom-12 right-8 h-64 w-64 opacity-[0.14]" viewBox="0 0 120 120" fill="#0b3b88">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" />
            ))
          )}
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-[1fr_1fr]">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-[680px]"
        >
          <h1 className="max-w-3xl text-balance text-[3.6rem] font-extrabold leading-[0.92] tracking-[-0.065em] text-ink sm:text-[4.5rem] lg:text-[5.6rem]">
            {heroCopy.title}{" "}
            <span className="bg-gradient-to-r from-primary via-sky-600 to-emerald bg-clip-text text-transparent">
              {heroCopy.highlight}
            </span>
          </h1>
          <p className="mt-10 max-w-[640px] text-xl font-medium leading-9 text-muted sm:text-[1.42rem]">
            {heroCopy.description}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#prezzi"
              onClick={() => posthog.capture("hero_cta_clicked", { cta: "free_trial" })}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5"
            >
              Prova gratuita 30 giorni
            </Link>
            <Link
              href="#funzionalita"
              onClick={() => posthog.capture("hero_cta_clicked", { cta: "learn_more" })}
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-7 py-4 text-base font-bold text-primary backdrop-blur transition hover:bg-white"
            >
              Scopri di più
            </Link>
          </div>

        </motion.div>

        {/* Right column — product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative lg:-mr-8"
        >
          {/* Blur glows — enlarged */}
          <div className="absolute -left-10 top-8 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-emerald/25 blur-3xl" />

          {/* Ground shadow */}
          <div className="absolute -bottom-6 left-[10%] right-[10%] h-12 rounded-[50%] bg-primary/[0.06] blur-2xl" />

          {/* Browser frame with 3D interaction */}
          <motion.div
            style={{ transform }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white shadow-soft ring-1 ring-inset ring-black/5"
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-3 border-b border-slate-100 bg-[#f5f7fb] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex flex-1 items-center gap-1.5 rounded-md border border-slate-200/80 bg-white px-3 py-1">
                <span className="font-mono text-[11px] text-slate-400">app.libracolf.it / dashboard</span>
              </div>
            </div>
            <Image
              src="/dashboard-new.png"
              alt="Dashboard Libra Colf"
              width={2600}
              height={1400}
              priority
              className="w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
