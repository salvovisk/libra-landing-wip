"use client";

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { navItems, type Persona } from "@/lib/site-data";

type NavbarProps = {
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
};

const NAV_RANGE_MAP: Record<string, string[]> = {
  "#funzionalita": ["funzionalita"],
  "#persona-switcher": [
    "persona-switcher",
    "persona-problem",
    "strumenti",
    "testimonianze",
  ],
  "#prezzi": ["prezzi"],
  "#demo": ["demo"],
  "#faq": ["faq", "cta-finale"],
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
      .filter((section): section is { href: string; element: HTMLElement } => Boolean(section))
      .sort((left, right) => left.element.offsetTop - right.element.offsetTop);

    const personaSection = document.getElementById("persona-switcher");

    if (!sections.length && !personaSection) return;

    const updateLayoutState = () => {
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

      const activationOffset = 140;
      const scrollPosition = window.scrollY + activationOffset;
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 24;

      if (viewportBottom >= pageBottom) {
        setActiveHref("#faq");
        return;
      }

      const ranges = navItems
        .map((item, index) => {
          const ids = NAV_RANGE_MAP[item.href] ?? [item.href.replace("#", "")];
          const ownedElements = ids
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => Boolean(element));

          if (!ownedElements.length) return null;

          const start = Math.min(
            ...ownedElements.map(
              (element) => element.getBoundingClientRect().top + window.scrollY
            )
          );

          const nextItem = navItems[index + 1];
          const nextStart = nextItem
            ? (() => {
                const nextIds = NAV_RANGE_MAP[nextItem.href] ?? [
                  nextItem.href.replace("#", ""),
                ];
                const nextElements = nextIds
                  .map((id) => document.getElementById(id))
                  .filter((element): element is HTMLElement => Boolean(element));

                if (!nextElements.length) return Number.POSITIVE_INFINITY;

                return Math.min(
                  ...nextElements.map(
                    (element) => element.getBoundingClientRect().top + window.scrollY
                  )
                );
              })()
            : Number.POSITIVE_INFINITY;

          return {
            href: item.href,
            start,
            end: nextStart,
          };
        })
        .filter(
          (
            range
          ): range is {
            href: string;
            start: number;
            end: number;
          } => Boolean(range)
        );

      if (!ranges.length) {
        setActiveHref(null);
        return;
      }

      if (scrollPosition < ranges[0].start) {
        setActiveHref(null);
        return;
      }

      const currentRange =
        ranges.find(
          (range) => scrollPosition >= range.start && scrollPosition < range.end
        ) ??
        [...ranges].reverse().find((range) => scrollPosition >= range.start) ??
        ranges[0];

      setActiveHref(currentRange?.href ?? sections[0]?.href ?? null);
    };

    updateLayoutState();
    window.addEventListener("scroll", updateLayoutState, { passive: true });
    window.addEventListener("resize", updateLayoutState);

    return () => {
      window.removeEventListener("scroll", updateLayoutState);
      window.removeEventListener("resize", updateLayoutState);
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
            <a href="#" className="shrink-0" aria-label="Libra Colf">
              <BrandLogo />
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
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
