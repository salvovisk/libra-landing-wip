"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { CalendarDays, CheckCircle2, X } from "lucide-react";

import type { Persona } from "@/lib/site-data";

const PORTAL_ID = "demo-booking-modal-root";
export const OPEN_BOOKING_MODAL_EVENT = "libra:open-booking-modal";

type DemoBookingModalProps = {
  persona: Persona;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

export function DemoBookingModal({ persona }: DemoBookingModalProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
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

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const copy =
    persona === "pro"
      ? {
          eyebrow: "Demo dedicata",
          title: "Prenota una demo dedicata al tuo Studio",
          description:
            "Compila il form e ti contatteremo per mostrarti gestione massiva, flussi operativi e automazioni di Libra Colf.",
          success:
            "Richiesta inviata. Ti contatteremo a breve per organizzare la demo dedicata.",
        }
      : {
          eyebrow: "Demo gratuita",
          title: "Prenota una demo gratuita di Libra Colf",
          description:
            "Compila il form e ti contatteremo per mostrarti come gestire buste paga, contributi INPS e scadenze senza stress.",
          success:
            "Richiesta inviata. Ti contatteremo a breve per organizzare la tua demo gratuita.",
        };

  const openModal = useCallback(() => {
    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
    setError(null);
    setIsSubmitted(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.firstName.trim() || !formState.lastName.trim() || !formState.email.trim()) {
      setError("Compila nome, cognome ed email per continuare.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_type: "demo_booking",
          persona,
          ...formState,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsSubmitted(true);
      setFormState(initialFormState);
    } catch {
      setError("Qualcosa è andato storto. Riprova tra un attimo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleOpenRequest = () => openModal();

    window.addEventListener(OPEN_BOOKING_MODAL_EVENT, handleOpenRequest);

    return () => {
      window.removeEventListener(OPEN_BOOKING_MODAL_EVENT, handleOpenRequest);
    };
  }, [openModal]);

  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const animationFrame = window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements(dialogRef.current);
      focusableElements[0]?.focus();
    });

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
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-md sm:px-6"
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
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_45px_140px_rgba(2,12,27,0.4)] lg:grid-cols-[0.88fr_1.12fr]"
            onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Chiudi finestra"
              onClick={closeModal}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-5 w-5" strokeWidth={2.3} />
            </button>

            <div className="relative flex flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(11,59,136,0.18),transparent_38%),linear-gradient(180deg,#f7fbff_0%,#eaf1fb_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[620px] lg:px-10 lg:py-12">
              <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-sky-300/18 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-primary">
                  {copy.eyebrow}
                </span>
                <h2
                  id={titleId}
                  className="mt-6 max-w-sm font-[var(--font-manrope)] text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-ink sm:text-5xl"
                >
                  {copy.title}
                </h2>
                <p id={descriptionId} className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                  {copy.description}
                </p>
              </div>

              <div className="relative mt-10 space-y-4">
                <div className="flex items-start gap-3 rounded-[22px] bg-white/86 px-5 py-4 ring-1 ring-inset ring-slate-200/80">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.2} />
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Una chiamata breve per capire flussi, tempi e adozione operativa.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-[22px] bg-white/86 px-5 py-4 ring-1 ring-inset ring-slate-200/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.2} />
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Ti mostreremo il prodotto su casi reali, non una demo generica.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" strokeWidth={2.3} />
                  </div>
                  <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.04em] text-ink">
                    Richiesta inviata
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-slate-600">{copy.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                      Nome
                      <input
                        type="text"
                        value={formState.firstName}
                        onChange={handleChange("firstName")}
                        placeholder="Il tuo nome"
                        className="min-h-[50px] rounded-full border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                      Cognome
                      <input
                        type="text"
                        value={formState.lastName}
                        onChange={handleChange("lastName")}
                        placeholder="Il tuo cognome"
                        className="min-h-[50px] rounded-full border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                      Email
                      <input
                        type="email"
                        value={formState.email}
                        onChange={handleChange("email")}
                        placeholder="nome@email.com"
                        className="min-h-[50px] rounded-full border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                      Telefono
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange("phone")}
                        placeholder="Numero di telefono"
                        className="min-h-[50px] rounded-full border border-slate-200 bg-white px-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5 pt-1 text-sm font-semibold text-slate-700">
                    Raccontaci il tuo caso
                    <textarea
                      value={formState.notes}
                      onChange={handleChange("notes")}
                      rows={6}
                      className="min-h-[146px] rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                      placeholder="Numero di rapporti, tipo di gestione attuale, dubbi principali..."
                    />
                  </label>

                  {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 inline-flex min-h-[58px] items-center justify-center rounded-2xl bg-primary px-7 text-base font-bold text-white shadow-[0_16px_38px_rgba(11,59,136,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0a3478] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Invio in corso..." : "Richiedi la demo"}
                  </button>

                  <p className="text-sm leading-6 text-slate-500">
                    Nessuno spam. Ti contatteremo solo per organizzare la demo o rispondere alla tua richiesta.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalNode
  );
}
