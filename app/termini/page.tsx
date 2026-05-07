import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Libra Colf",
  description: "Termini e condizioni di utilizzo e di abbonamento al servizio Libra Colf.",
  robots: { index: true, follow: true },
};

export default function TerminiPage() {
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
        Termini e Condizioni
      </h1>
      <p className="mt-3 text-sm text-[#5f6b84]">
        Ultimo aggiornamento: maggio 2026
      </p>

      <div className="mt-12 space-y-10 text-[#0f172a]">

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            1. Oggetto
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            I presenti Termini e Condizioni disciplinano l&apos;acquisto e l&apos;utilizzo degli abbonamenti al servizio <strong className="text-[#0f172a]">Libra Colf</strong>, piattaforma software per la gestione di buste paga, contributi INPS e documentazione relativa al lavoro domestico, erogata da <strong className="text-[#0f172a]">[RAGIONE SOCIALE]</strong> (di seguito &quot;Libra Colf&quot; o &quot;il Fornitore&quot;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            2. Accettazione dei termini
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Procedendo all&apos;acquisto di un abbonamento tramite questo sito, l&apos;utente dichiara di aver letto, compreso e accettato integralmente i presenti Termini e Condizioni nonché la <Link href="/privacy" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            3. Piani e prezzi
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Libra Colf offre diversi piani di abbonamento (Base, Premium, Premium+) con fatturazione mensile o annuale. I prezzi mostrati sul sito sono espressi in euro. L&apos;utente è invitato a verificare se i prezzi indicati sono IVA inclusa o esclusa al momento dell&apos;acquisto nella schermata di riepilogo fornita da Stripe.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            Il Fornitore si riserva il diritto di modificare i prezzi dei piani con un preavviso di almeno 30 giorni comunicato via email. Le modifiche non si applicano ai periodi già pagati.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            4. Prova gratuita
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Alcuni piani prevedono un periodo di prova gratuita, la cui durata e disponibilità sono indicate nella schermata di acquisto. Durante il periodo di prova non viene effettuato alcun addebito. Al termine, l&apos;abbonamento si attiva automaticamente e viene addebitato il costo del piano scelto, salvo cancellazione prima della scadenza.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            La prova gratuita è disponibile una sola volta per indirizzo email. In caso di utilizzo precedente, l&apos;abbonamento sarà attivato senza periodo di prova con addebito immediato.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            Per annullare durante il periodo di prova senza costi, l&apos;utente può accedere al portale di gestione dell&apos;abbonamento tramite il link ricevuto via email oppure scrivendo a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            5. Rinnovo e cancellazione
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Gli abbonamenti si rinnovano automaticamente al termine di ogni periodo (mensile o annuale), con addebito sul metodo di pagamento registrato.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            L&apos;utente può cancellare il proprio abbonamento in qualsiasi momento tramite il portale clienti Stripe (link disponibile nell&apos;email di conferma) o scrivendo a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>. La cancellazione ha effetto alla fine del periodo già pagato; non è previsto rimborso pro-quota per periodi parziali, salvo quanto previsto dal diritto di recesso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            6. Diritto di recesso
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            I consumatori (persone fisiche che acquistano per scopi non professionali) hanno il diritto di recedere dal contratto entro <strong className="text-[#0f172a]">14 giorni</strong> dalla conclusione, ai sensi del D.Lgs. 206/2005 (Codice del Consumo, art. 52 e ss.), senza dover fornire alcuna motivazione.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            Per esercitare il diritto di recesso, inviare una comunicazione esplicita a <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a> entro il termine indicato. Il rimborso verrà erogato entro 14 giorni dalla ricezione della comunicazione, tramite lo stesso metodo di pagamento utilizzato.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            <strong className="text-[#0f172a]">Eccezione:</strong> se l&apos;utente richiede espressamente l&apos;attivazione immediata del servizio prima della scadenza del periodo di recesso, il diritto di recesso decade all&apos;avvenuta erogazione completa del servizio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            7. Proprietà intellettuale
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Il software Libra Colf, il sito libracolf.it, i marchi, i loghi e tutti i contenuti sono di proprietà esclusiva di [RAGIONE SOCIALE] e sono protetti dalle leggi sul diritto d&apos;autore e sulla proprietà intellettuale. È vietata qualsiasi riproduzione o utilizzo non autorizzato.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            8. Limitazione di responsabilità
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Il servizio è fornito &quot;così com&apos;è&quot; (<em>as is</em>). Il Fornitore si impegna a garantire la massima disponibilità e accuratezza del servizio, ma non offre garanzie di disponibilità continua al 100%. In nessun caso il Fornitore sarà responsabile per danni indiretti, perdita di dati o mancati guadagni derivanti dall&apos;utilizzo o dall&apos;impossibilità di utilizzo del servizio.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#5f6b84]">
            La responsabilità complessiva del Fornitore nei confronti dell&apos;utente è in ogni caso limitata all&apos;importo pagato negli ultimi 12 mesi per il piano sottoscritto.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            9. Legge applicabile e foro competente
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall&apos;interpretazione o dall&apos;esecuzione dei presenti Termini, il foro competente è quello di <strong className="text-[#0f172a]">[CITTÀ]</strong>, salvo che la normativa applicabile preveda il foro del consumatore come inderogabile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-extrabold tracking-[-0.03em]">
            10. Contatti
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f6b84]">
            Per qualsiasi domanda relativa ai presenti Termini o al servizio, scrivere a:{" "}
            <a href="mailto:[EMAIL]" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">[EMAIL]</a>.
          </p>
        </section>

      </div>

      <div className="mt-16 border-t border-[#dbe3f0] pt-8 text-sm text-[#5f6b84]">
        <p>
          Leggi anche:{" "}
          <Link href="/privacy" className="font-semibold text-[#0b3b88] underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
