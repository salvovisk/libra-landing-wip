"use client";

import { BrandLogo } from "@/components/brand-logo";
import { OPEN_BOOKING_MODAL_EVENT } from "@/components/demo-booking-modal";

const productLinks = [
  { label: "Come funziona", href: "#funzionalita" },
  { label: "Per chi è pensato", href: "#persona-switcher" },
  { label: "Testimonianze", href: "#testimonianze" },
  { label: "Prezzi", href: "#prezzi" },
  { label: "Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
  { label: "Perché Libra", href: "#vantaggi" },
];

const utilityLinks = [
  { label: "Richiedi una demo", href: "#book-demo" },
  { label: "Torna in alto", href: "#" },
];

function scrollToAnchor(href: string) {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "#");
    return;
  }

  const id = href.replace("#", "");
  const target = document.getElementById(id);

  if (!target) return;

  const offset = 112;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.history.replaceState(null, "", href);
  window.scrollTo({ top, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white px-6 pb-10 pt-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-xl">
          <a href="#" className="inline-flex" aria-label="Libra Colf">
            <BrandLogo />
          </a>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Software per gestire lavoro domestico, buste paga, contributi INPS e documenti in un flusso unico, chiaro e verificabile.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
            Navigazione
          </h3>
          <div className="mt-5 grid gap-3">
            {productLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor(link.href);
                }}
                className="text-sm font-medium text-slate-600 transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
            Collegamenti
          </h3>
          <div className="mt-5 grid gap-3">
            {utilityLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  if (link.href === "#book-demo") {
                    window.dispatchEvent(new CustomEvent(OPEN_BOOKING_MODAL_EVENT));
                    return;
                  }

                  scrollToAnchor(link.href);
                }}
                className="text-sm font-medium text-slate-600 transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200/80 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Libra Colf. Tutti i diritti riservati.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="/privacy" className="transition hover:text-primary">Privacy Policy</a>
          <a href="/termini" className="transition hover:text-primary">Termini e Condizioni</a>
          <a href="/privacy#cookie" className="transition hover:text-primary">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
