"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";

import { emailTemplatePreviews } from "@/lib/email-templates";

export function EmailTemplatePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(emailTemplatePreviews[0]?.id ?? "");

  const activeTemplate = useMemo(
    () => emailTemplatePreviews.find((template) => template.id === activeId) ?? emailTemplatePreviews[0],
    [activeId]
  );

  const downloadTemplate = () => {
    if (!activeTemplate) return;

    const blob = new Blob([activeTemplate.html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${activeTemplate.id}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  };

  if (process.env.NODE_ENV === "production") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-5 top-40 z-[190] inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-[0_14px_32px_rgba(15,23,42,0.12)] transition hover:border-slate-300 hover:bg-slate-50"
      >
        <Mail className="h-4 w-4" strokeWidth={2.3} />
        Preview emails
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[230] flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-md"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[88svh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_45px_140px_rgba(2,12,27,0.4)]"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Chiudi preview email"
                className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-5 w-5" strokeWidth={2.3} />
              </button>

              <div className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary/55">
                        Email templates
                      </p>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Dev only
                      </span>
                    </div>
                    <h2 className="mt-2 font-[var(--font-manrope)] text-3xl font-extrabold tracking-[-0.04em] text-ink">
                      Preview template email
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Email transazionali: abbonamento, prova gratuita, pagamento e disdetta. Più lead magnet (guida PDF, demo).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={downloadTemplate}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,59,136,0.18)] transition hover:bg-[#0a3478]"
                  >
                    Download HTML
                  </button>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]">
                <aside className="border-b border-slate-200 bg-slate-50/80 p-4 lg:border-b-0 lg:border-r lg:p-5">
                  <div className="grid gap-3">
                    {emailTemplatePreviews.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setActiveId(template.id)}
                        className={`rounded-[20px] border px-4 py-4 text-left transition ${
                          template.id === activeTemplate.id
                            ? "border-primary/15 bg-primary/6 text-primary"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <p className="text-sm font-bold">{template.label}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{template.subject}</p>
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="flex min-h-0 flex-col bg-[#eef3fa]">
                  <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/55">
                      Subject
                    </p>
                    <p className="mt-1 text-base font-semibold text-ink">{activeTemplate.subject}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-primary/55">
                      Preheader
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{activeTemplate.preheader}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-primary/55">
                      CTA URL
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-600">{activeTemplate.ctaHref}</p>
                  </div>

                  <div className="min-h-0 flex-1 p-4 sm:p-6">
                    <iframe
                      title={activeTemplate.subject}
                      srcDoc={activeTemplate.html}
                      sandbox=""
                      className="h-full w-full rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
