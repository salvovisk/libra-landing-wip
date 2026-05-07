import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Libra Colf",
  description: "Informativa sul trattamento dei dati personali e sui cookie del sito libracolf.it.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm font-semibold text-[#0b3b88] underline-offset-4 hover:underline"
        >
          ← Torna alla home
        </Link>
      </div>

      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0b3b88]/60">
        Informativa legale
      </p>
      <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-[#0f172a]">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-[#5f6b84]">
        Ultimo aggiornamento: maggio 2026
      </p>

      <div className="mt-12 space-y-10 text-[#0f172a]">

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            1. Titolare del trattamento
          </h2>
          <div className="mt-4 rounded-2xl border border-[#dbe3f0] bg-[#f5f7fb] px-6 py-5 text-sm leading-7 text-[#5f6b84]">
            <p><strong className="text-[#0f172a]">[RAGIONE SOCIALE]</strong></p>
            <p>Sede legale: [INDIRIZZO]</p>
            <p>P.IVA: [PARTITA IVA]</p>
            <p>Email: <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a></p>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Il Titolare del trattamento è la società indicata sopra, responsabile della raccolta e del trattamento dei dati personali degli utenti che visitano il sito <strong>libracolf.it</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            2. Dati raccolti su questo sito
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Questo sito raccoglie i seguenti dati:
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#5f6b84]">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Indirizzo email</strong> — inserito volontariamente nel form di iscrizione alla newsletter o alla lista d&apos;attesa.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Dati di pagamento</strong> — nel caso di acquisto di un abbonamento, i dati della carta di credito/debito vengono trasmessi direttamente a Stripe Inc. tramite connessione sicura. Libra Colf non archivia né ha accesso ai dati di pagamento.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Dati tecnici di navigazione</strong> — indirizzo IP, tipo di browser, sistema operativo, raccolti automaticamente dai server per finalità di sicurezza e log tecnici. Non vengono utilizzati per profilazione.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Dati di navigazione e comportamento sul sito</strong> — raccolti tramite PostHog (piattaforma di analisi), <em>previo consenso dell&apos;utente</em>. Includono: pagine visitate, interazioni con elementi del sito (es. clic sui piani, avvio del checkout), tipo di dispositivo e browser, indirizzo IP anonimizzato. Nessun dato identificativo viene raccolto senza consenso.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            3. Finalità e base giuridica del trattamento
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#5f6b84]">
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Email — Comunicazioni commerciali</p>
              <p className="mt-1">Base giuridica: <em>consenso dell&apos;interessato</em> (Art. 6, par. 1, lett. a del GDPR). Il consenso è revocabile in qualsiasi momento tramite il link di disiscrizione presente in ogni email.</p>
            </div>
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Pagamento — Esecuzione del contratto</p>
              <p className="mt-1">Base giuridica: <em>esecuzione di un contratto</em> (Art. 6, par. 1, lett. b del GDPR). I dati sono necessari per completare l&apos;acquisto dell&apos;abbonamento.</p>
            </div>
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Log tecnici — Sicurezza</p>
              <p className="mt-1">Base giuridica: <em>legittimo interesse</em> (Art. 6, par. 1, lett. f del GDPR) alla sicurezza informatica e al corretto funzionamento del sito.</p>
            </div>
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Analisi comportamentale — Miglioramento del servizio</p>
              <p className="mt-1">Base giuridica: <em>consenso dell&apos;interessato</em> (Art. 6, par. 1, lett. a del GDPR). Il consenso è prestato tramite il banner cookie al primo accesso ed è revocabile in qualsiasi momento tramite le impostazioni del browser o scrivendo a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            4. Terze parti e trasferimento dati
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            I dati di pagamento sono trattati da <strong className="text-[#0f172a]">Stripe Inc.</strong> (USA) in qualità di responsabile del trattamento. Il trasferimento avviene nel rispetto del GDPR tramite le Clausole Contrattuali Standard approvate dalla Commissione Europea. Per maggiori informazioni: <a href="https://stripe.com/it/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">Privacy Policy di Stripe</a>.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            I dati di analisi comportamentale sono trattati da <strong className="text-[#0f172a]">PostHog Inc.</strong> (USA) tramite server localizzati nell&apos;Unione Europea (regione EU). Il trasferimento avviene nel rispetto del GDPR tramite le Clausole Contrattuali Standard. Per maggiori informazioni: <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">Privacy Policy di PostHog</a>.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            I dati non vengono venduti né ceduti a terze parti per scopi di marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            5. Periodo di conservazione
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#5f6b84]">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Email:</strong> conservata fino alla revoca del consenso (disiscrizione).</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Dati di abbonamento:</strong> per la durata del contratto e nei termini previsti dagli obblighi fiscali (10 anni).</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3b88]/40" />
              <span><strong className="text-[#0f172a]">Log tecnici:</strong> massimo 30 giorni.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            6. Diritti dell&apos;interessato
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Ai sensi degli articoli 15–21 del GDPR, l&apos;interessato ha il diritto di:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[#5f6b84]">
            {[
              "accedere ai propri dati personali",
              "ottenerne la rettifica o la cancellazione",
              "opporsi al trattamento o richiederne la limitazione",
              "richiedere la portabilità dei dati",
              "revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente",
            ].map((right) => (
              <li key={right} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14b86a]" />
                <span>{right}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Per esercitare i propri diritti scrivere a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>. È inoltre possibile proporre reclamo al <strong className="text-[#0f172a]">Garante per la protezione dei dati personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">garanteprivacy.it</a>).
          </p>
        </section>

        <section id="cookie">
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            7. Cookie e tecnologie simili
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Questo sito utilizza due categorie di cookie e tecnologie di archiviazione locale:
          </p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#5f6b84]">
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Cookie tecnici (necessari)</p>
              <ul className="mt-2 space-y-1">
                <li>— <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">libra_cookie_consent</code> (localStorage) — salva la preferenza cookie dell&apos;utente. Durata: permanente fino a cancellazione manuale.</li>
              </ul>
              <p className="mt-2">Questi dati sono necessari per ricordare la scelta dell&apos;utente e non richiedono consenso.</p>
            </div>
            <div className="rounded-2xl border border-[#dbe3f0] px-5 py-4">
              <p className="font-semibold text-[#0f172a]">Cookie analitici (previo consenso)</p>
              <ul className="mt-2 space-y-1">
                <li>— Cookie PostHog (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">ph_*</code>) — analisi del comportamento degli utenti sul sito. Finalità: miglioramento dell&apos;esperienza utente e delle funzionalità del sito. Durata: fino a 1 anno. Fornitore: PostHog Inc., server EU.</li>
              </ul>
              <p className="mt-2">Questi cookie vengono attivati solo dopo il consenso esplicito tramite il banner al primo accesso.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            L&apos;utente può revocare il consenso in qualsiasi momento eliminando la chiave <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">libra_cookie_consent</code> dal localStorage del browser (Strumenti sviluppatore → Application → Local Storage) e ricaricando la pagina, oppure scrivendo a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            Non vengono utilizzati cookie di profilazione o cookie di terze parti per scopi pubblicitari.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            8. Modifiche alla presente policy
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Il Titolare si riserva di aggiornare questa informativa in qualsiasi momento. Le modifiche sostanziali saranno comunicate tramite avviso sul sito o via email agli utenti registrati. La data in cima alla pagina indica l&apos;ultima revisione.
          </p>
        </section>

      </div>

      <div className="mt-16 border-t border-[#dbe3f0] pt-8 text-sm text-[#5f6b84]">
        <p>
          Leggi anche:{" "}
          <Link href="/termini" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">
            Termini e Condizioni
          </Link>
        </p>
      </div>
    </main>
  );
}
