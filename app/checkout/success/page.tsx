import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abbonamento attivato | Libra Colf",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string }>;
}) {
  await searchParams;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(103,160,255,0.14), transparent 40%), radial-gradient(circle at top right, rgba(20,184,106,0.10), transparent 30%), linear-gradient(180deg, #f9fbff 0%, #eef3fa 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-md">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#14b86a]/10">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#14b86a"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-[#0f172a]">
          Abbonamento attivato
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#5f6b84]">
          Benvenuto in Libra Colf. Il tuo piano è ora attivo — puoi iniziare a
          gestire il lavoro domestico senza pensieri.
        </p>
        <p className="mt-2 text-sm text-[#5f6b84]">
          Riceverai una email di conferma con i dettagli del tuo abbonamento.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="https://app.libracolf.it"
            className="rounded-[22px] bg-[#0b3b88] px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0a3478]"
          >
            Accedi alla piattaforma
          </a>
          <Link
            href="/"
            className="text-sm font-semibold text-[#0b3b88] underline-offset-4 hover:underline"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </main>
  );
}
