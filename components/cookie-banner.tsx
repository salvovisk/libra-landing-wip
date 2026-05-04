"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "libra_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl"
        >
          <div className="rounded-[20px] border border-slate-200/80 bg-white/95 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl ring-1 ring-inset ring-black/5 sm:flex sm:items-center sm:gap-6 sm:px-6 sm:py-4">
            <p className="text-sm leading-6 text-slate-600">
              Utilizziamo cookie tecnici per il corretto funzionamento del sito.{" "}
              <Link href="/privacy#cookie" className="font-semibold text-primary underline-offset-2 hover:underline">
                Cookie policy
              </Link>
              {" · "}
              <Link href="/termini" className="font-semibold text-primary underline-offset-2 hover:underline">
                Termini
              </Link>
            </p>
            <div className="mt-3 flex shrink-0 gap-3 sm:mt-0">
              <button
                onClick={decline}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Rifiuta
              </button>
              <button
                onClick={accept}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0a3478]"
              >
                Accetta
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
