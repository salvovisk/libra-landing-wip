"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { type MouseEvent } from "react";

import { heroCopy } from "@/lib/site-data";
import Link from "next/link";

export function Hero() {
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
    <section className="relative overflow-hidden px-6 pb-16 pt-6 sm:pb-24 sm:pt-8 lg:min-h-[calc(100svh-6.5rem)] lg:py-10">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-hero-grid bg-[size:54px_54px] opacity-30 [mask-image:linear-gradient(180deg,white,transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 max-w-[680px]"
        >
          <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {heroCopy.badge}
          </span>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary/55">
            {heroCopy.kicker}
          </p>
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
            <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5">
              Ottieni una demo gratuita
            </button>
            <Link href="#funzionalita" className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-7 py-4 text-base font-bold text-primary backdrop-blur transition hover:bg-white">
              Scopri di più
            </Link>

          </div>


        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-300/25 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-emerald/20 blur-3xl" />
          <motion.div
            style={{ transform }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="relative rounded-[32px] border border-white/60 bg-white/60 p-3 shadow-soft backdrop-blur-xl ring-1 ring-inset ring-black/5"
          >
            <Image
              src="/dashboard.jpg"
              alt="Dashboard Libra Colf"
              width={2000}
              height={1000}
              priority
              className="rounded-[26px] border border-white/70 object-cover shadow-card"
            />
          </motion.div>
        </motion.div>
      </div >
    </section >
  );
}
