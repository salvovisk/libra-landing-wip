"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { heroCopy, navItems } from "@/lib/site-data";

const stats = [
  { value: "1.240+", label: "famiglie attive" },
  { value: "27", label: "il giorno della busta paga" },
  { value: "0", label: "errori di calcolo" },
];

export function HeroProduct() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f9fbff] to-[#eef3fa]">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,59,136,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,106,0.08),transparent_50%)]" />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:56px_56px] opacity-[0.05] [mask-image:linear-gradient(180deg,white_0%,transparent_80%)]" />

      {/* Floating navbar */}
      <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="flex items-center gap-6 rounded-[18px] border border-line bg-white/80 px-5 py-3 shadow-soft backdrop-blur-[14px]">
          <BrandLogo compact />
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 pl-2">
            <Link href="#" className="hidden text-sm font-semibold text-primary lg:block">
              Accedi
            </Link>
            <button
              type="button"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              Prenota demo
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-36 lg:grid-cols-[minmax(440px,0.95fr)_1.05fr] lg:gap-12 lg:pb-24 lg:pt-32">

        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary">
              Versione 2.0 · in produzione
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-[clamp(2.8rem,5vw,4.625rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink">
            {heroCopy.title}{" "}
            <span className="bg-[linear-gradient(95deg,#0b3b88,#2a6fd6,#14b86a)] bg-clip-text italic text-transparent">
              {heroCopy.highlight}
            </span>
          </h1>

          {/* Lede */}
          <p className="mt-7 max-w-[500px] text-[18px] leading-8 text-muted" style={{ fontWeight: 450 }}>
            {heroCopy.description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5"
            >
              Prova gratuita 30 giorni
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <Link
              href="#funzionalita"
              className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/85 px-7 py-4 text-base font-bold text-primary backdrop-blur transition hover:bg-white"
            >
              Scopri di più
            </Link>
          </div>
        </motion.div>

        {/* Right column — Product visual */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* 3D frame */}
          <div
            className="relative"
            style={{ perspective: "1800px" }}
          >
            <div
              className="relative rounded-[20px] border border-line bg-white shadow-[0_32px_80px_rgba(11,59,136,0.18),0_4px_16px_rgba(15,23,42,0.08)] lg:[transform:perspective(1800px)_rotateY(-6deg)_rotateX(2deg)]"
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-3 flex flex-1 items-center gap-2 rounded-md border border-line bg-white px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-emerald/60" />
                  <span className="font-mono text-xs text-muted">
                    app.libracolf.it / dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard screenshot */}
              <div className="overflow-hidden rounded-b-[20px]">
                <Image
                  src="/dashboard-new.png"
                  alt="Dashboard Libra Colf"
                  width={2400}
                  height={1200}
                  priority
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
