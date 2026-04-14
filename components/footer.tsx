import { Globe, Mail, Share2 } from "lucide-react";

import { resourceItems } from "@/lib/site-data";

export function Footer() {
  return (
    <>
      {/*  <section className="px-6 py-24" id="risorse">
        <div className="mx-auto max-w-7xl rounded-[36px] bg-[linear-gradient(135deg,#0b3b88_0%,#07214f_100%)] px-8 py-14 text-white shadow-card sm:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-200">
                Risorse e supporto
              </p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
                Pronto a semplificare il tuo lavoro domestico?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100/85">
                Un'unica piattaforma per famiglie, CAF e studi che vogliono precisione, velocita
                e un'esperienza cliente credibile.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="rounded-2xl bg-white px-7 py-4 text-sm font-bold text-primary transition hover:bg-slate-50">
                  Prova gratis 14 giorni
                </button>
                <button className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                  Parla con un esperto
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {resourceItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* <footer className="border-t border-slate-200/80 px-6 pb-10 pt-12">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
          <div>
            <a href="#" className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
              Libra Colf
            </a>
            <p className="mt-4 text-sm leading-7 text-muted">
              La piattaforma SaaS per una gestione trasparente, professionale e scalabile del
              lavoro domestico in Italia.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, Share2, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Prodotto</h3>
            <div className="mt-5 grid gap-3 text-sm text-muted">
              <a href="#funzionalita">Funzionalita</a>
              <a href="#prezzi">Prezzi</a>
              <a href="#risorse">Risorse</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Risorse</h3>
            <div className="mt-5 grid gap-3 text-sm text-muted">
              <a href="#">Help center</a>
              <a href="#">Blog normativo</a>
              <a href="#">Guide CCNL</a>
              <a href="#">Webinar</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Supporto</h3>
            <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-6 text-muted">Serve aiuto con il setup o la migrazione?</p>
              <button className="mt-4 w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white">
                Chatta con noi
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-slate-200/80 pt-6 text-xs font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Libra Colf S.r.l. Tutti i diritti riservati. P.IVA IT12345678901</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Termini di Servizio</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer> */}
    </>
  );
}
