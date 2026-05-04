import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout annullato | Libra Colf",
  robots: { index: false, follow: false },
};

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
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
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#5f6b84"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-[#0f172a]">
          Checkout annullato
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#5f6b84]">
          Nessun addebito è stato effettuato. Puoi scegliere un piano in
          qualsiasi momento quando sei pronto.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/#prezzi"
            className="rounded-[22px] bg-[#0b3b88] px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0a3478]"
          >
            Rivedi i piani
          </Link>
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
