"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { OPEN_BOOKING_MODAL_EVENT } from "@/components/demo-booking-modal";
import type { Persona } from "@/lib/site-data";

type EngagementModalProps = {
  persona: Persona;
  onDemoRequest?: () => void;
  minDesktopWidth?: number;
  minTimeOnPageMs?: number;
  minScrollProgress?: number;
};

const SEEN_SESSION_KEY = "libra:engagement-modal:seen";
const PORTAL_ID = "engagement-modal-root";
const DEFAULT_MIN_DESKTOP_WIDTH = 1024;
const DEFAULT_MIN_TIME_ON_PAGE_MS = 10_000;
const DEFAULT_MIN_SCROLL_PROGRESS = 0.5;

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

export function EngagementModal({
  persona,
  onDemoRequest,
  minDesktopWidth = DEFAULT_MIN_DESKTOP_WIDTH,
  minTimeOnPageMs = DEFAULT_MIN_TIME_ON_PAGE_MS,
  minScrollProgress = DEFAULT_MIN_SCROLL_PROGRESS,
}: EngagementModalProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);
  const portalNode = useMemo(() => {
    if (!isClient) return null;

    let node = document.getElementById(PORTAL_ID) as HTMLElement | null;

    if (!node) {
      node = document.createElement("div");
      node.id = PORTAL_ID;
      document.body.appendChild(node);
    }

    return node;
  }, [isClient]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerLockRef = useRef(false);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const timeGatePassedRef = useRef(false);
  const scrollGatePassedRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();

  const copy =
    persona === "pro"
      ? {
          eyebrow: "Demo dedicata",
          title: "Non andartene! Hai ancora dubbi?",
          description:
            "Ottimizza il tuo Studio. Scopri la gestione massiva in una demo dedicata.",
          cta: "Sì, voglio una demo gratuita",
        }
      : {
          eyebrow: "Demo gratuita",
          title: "Non andartene! Hai ancora dubbi?",
          description:
            "Prenota una demo gratuita di 15 minuti e scopri come Libra può semplificare il tuo lavoro.",
          cta: "Sì, voglio una demo gratuita",
        };

  const openModal = useEffectEvent(() => {
    if (triggerLockRef.current) return;
    if (window.sessionStorage.getItem(SEEN_SESSION_KEY) === "true") return;

    window.sessionStorage.setItem(SEEN_SESSION_KEY, "true");
    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    triggerLockRef.current = true;
    setIsOpen(true);
  });

  const forceOpenModal = useCallback(() => {
    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePrimaryAction = useCallback(() => {
    closeModal();

    if (onDemoRequest) {
      onDemoRequest();
      return;
    }

    window.dispatchEvent(new CustomEvent(OPEN_BOOKING_MODAL_EVENT));
  }, [closeModal, onDemoRequest]);

  useEffect(() => {
    const timeGateTimer = window.setTimeout(() => {
      timeGatePassedRef.current = true;
    }, minTimeOnPageMs);

    const updateScrollGate = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        scrollGatePassedRef.current = false;
        return;
      }

      const progress = window.scrollY / scrollableHeight;
      scrollGatePassedRef.current = progress >= minScrollProgress;
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (window.innerWidth < minDesktopWidth) return;
      if (event.relatedTarget !== null) return;
      if (event.clientY > 12) return;
      if (!timeGatePassedRef.current || !scrollGatePassedRef.current) return;

      openModal();
    };

    updateScrollGate();

    window.addEventListener("scroll", updateScrollGate, { passive: true });
    window.addEventListener("resize", updateScrollGate);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.clearTimeout(timeGateTimer);
      window.removeEventListener("scroll", updateScrollGate);
      window.removeEventListener("resize", updateScrollGate);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [minDesktopWidth, minScrollProgress, minTimeOnPageMs]);

  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const focusableElements = getFocusableElements(dialogRef.current);
      const firstFocusable = focusableElements[0];

      firstFocusable?.focus();
    };

    const animationFrame = window.requestAnimationFrame(focusFirst);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(dialogRef.current);

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!isClient || !portalNode) return null;

  return createPortal(
    <>
      {process.env.NODE_ENV !== "production" ? (
        <button
          type="button"
          onClick={forceOpenModal}
          className="fixed right-5 top-24 z-[190] inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
        >
          Open modal
        </button>
      ) : null}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6"
            onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-5xl gap-0 overflow-hidden rounded-[32px] bg-white shadow-[0_45px_140px_rgba(2,12,27,0.4)] lg:grid-cols-[1.08fr_0.92fr]"
              onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
                if (event.key === "Enter" && event.target === event.currentTarget) {
                  event.preventDefault();
                  handlePrimaryAction();
                }
              }}
            >
              <button
                type="button"
                aria-label="Chiudi finestra"
                onClick={() => closeModal()}
                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
              >
                <X className="h-5 w-5" strokeWidth={2.3} />
              </button>

              <div className="relative min-h-[260px] overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eaf1fb_100%)] p-5 sm:p-6 lg:min-h-[520px] lg:p-8">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#00377e]/10 to-transparent" />
              <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-[#00377e]/10 blur-3xl" />
              <div className="relative h-full rounded-[24px] border border-white/70 bg-white/75 p-3 shadow-[0_24px_70px_rgba(0,55,126,0.16)] backdrop-blur">
                <div className="relative h-full min-h-[228px] overflow-hidden rounded-[18px] bg-[#f3f7fc]">
                  <div className="absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#f3f7fc]/65 to-transparent" />
                  <Image
                    src="/pagina-busta-paga-mensile.jpg"
                    alt="Anteprima della busta paga mensile in Libra Colf"
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="inline-flex w-fit items-center rounded-full bg-[#00377e]/6 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00377e] ring-1 ring-inset ring-[#00377e]/10">
                  {copy.eyebrow}
                </span>
                <h2
                  id={titleId}
                  className="mt-5 font-[var(--font-manrope)] text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-[3.25rem]"
                >
                  {copy.title}
                </h2>
                <p id={descriptionId} className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  {copy.description}
                </p>
                <div className="mt-6 rounded-[22px] bg-slate-50 px-5 py-4 ring-1 ring-inset ring-slate-200/80">
                  <p className="text-sm font-semibold text-slate-900">Cosa vedrai nella demo</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Flussi operativi, gestione delle variazioni, automazioni su buste paga e contributi, e come Libra si adatta al tuo caso.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handlePrimaryAction()}
                    className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#00377e] px-7 text-base font-extrabold text-white shadow-[0_18px_48px_rgba(0,55,126,0.26)] transition hover:-translate-y-0.5 hover:bg-[#002f6b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00377e]/25 focus-visible:ring-offset-2"
                  >
                    {copy.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="inline-flex items-center justify-center text-sm font-semibold text-slate-500 transition hover:text-slate-700"
                  >
                    Continua a navigare
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    portalNode
  );
}
