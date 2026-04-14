"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navItems, type Persona } from "@/lib/site-data";

type NavbarProps = {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
};

export function Navbar({ persona, onPersonaChange }: NavbarProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [showPersonaControl, setShowPersonaControl] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const id = href.replace("#", "");
    const target = document.getElementById(id);

    setMobileOpen(false);

    if (!target) return;

    const offset = 112;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => {
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);

        return element ? { href: item.href, element } : null;
      })
      .filter((section): section is { href: string; element: HTMLElement } => Boolean(section));

    const personaSection = document.getElementById("persona-switcher");

    if (!sections.length && !personaSection) return;

    const updateState = () => {
      if (sections.length) {
        const triggerLine = window.scrollY + 180;

        if (triggerLine < sections[0].element.offsetTop) {
          setActiveHref(null);
        } else {
          let nextActive: string | null = null;

          for (let index = 0; index < sections.length; index += 1) {
            const current = sections[index];
            const next = sections[index + 1];
            const currentTop = current.element.offsetTop;
            const nextTop = next?.element.offsetTop ?? Number.POSITIVE_INFINITY;

            if (triggerLine >= currentTop && triggerLine < nextTop) {
              nextActive = current.href;
              break;
            }
          }

          setActiveHref(nextActive);
        }
      }

      if (personaSection) {
        const rect = personaSection.getBoundingClientRect();
        const passedSwitcher = rect.bottom <= 92;
        const stillVisible = rect.top < window.innerHeight && rect.bottom > 92;
        const shouldShow = passedSwitcher && !stillVisible && window.innerWidth >= 1280;

        setShowPersonaControl(shouldShow);
      } else {
        setShowPersonaControl(false);
      }

      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-6"
    >
      <nav className="pointer-events-auto w-full max-w-[1200px] rounded-[28px] border border-white/70 bg-white/70 shadow-soft backdrop-blur-xl ring-1 ring-inset ring-black/5">
        <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 lg:gap-10">
            <a href="#" className="shrink-0 text-2xl font-[800] tracking-[-0.04em] text-primary">
              Libra Colf
            </a>
            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={`inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                    activeHref === item.href
                      ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/12"
                      : "text-slate-600 hover:bg-slate-100/90 hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <AnimatePresence>
              {showPersonaControl ? (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.22 }}
                  className="hidden xl:block"
                >
                  <div className="relative inline-grid grid-cols-2 rounded-full border border-slate-200 bg-slate-100/90 p-1 ring-1 ring-inset ring-black/5">
                    <motion.span
                      initial={false}
                      animate={{ left: persona === "private" ? "0.25rem" : "50%" }}
                      transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
                      className="absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-[0_10px_24px_rgba(11,59,136,0.18)]"
                    />
                    <button
                      onClick={() => onPersonaChange("private")}
                      className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        persona === "private" ? "text-white" : "text-slate-600"
                      }`}
                    >
                      Privato
                    </button>
                    <button
                      onClick={() => onPersonaChange("pro")}
                      className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        persona === "pro" ? "text-white" : "text-slate-600"
                      }`}
                    >
                      CAF / Studio
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button className="hidden items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition duration-200 hover:bg-[#0a3478] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 sm:inline-flex">
              Accedi
            </button>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-primary shadow-sm transition hover:bg-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={2.2} /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-slate-200/80 px-4 pb-4 pt-3 sm:px-6">
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={`mobile-${item.href}`}
                      href={item.href}
                      onClick={handleNavClick(item.href)}
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className={`inline-flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        activeHref === item.href
                          ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/12"
                          : "text-slate-700 hover:bg-slate-100/90 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-4">
                  <button className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-[#0a3478]">
                    Accedi
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
