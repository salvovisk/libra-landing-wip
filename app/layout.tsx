import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Libra Colf | Software per lavoro domestico, buste paga e INPS",
  description:
    "Software per gestire lavoro domestico, buste paga colf e badanti, contributi INPS e documenti. Pensato per famiglie, CAF e studi professionali.",
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Libra Colf",
    "lavoro domestico",
    "buste paga colf",
    "INPS colf",
    "software lavoro domestico",
    "badanti",
    "software CAF lavoro domestico",
    "gestione badanti"
  ],
  openGraph: {
    title: "Libra Colf | Software per lavoro domestico, buste paga e INPS",
    description:
      "Software per famiglie, CAF e studi che gestiscono colf e badanti: buste paga, contributi INPS e documenti in un unico flusso.",
    locale: "it_IT",
    type: "website",
    siteName: "Libra Colf",
    images: [
      {
        url: "/dashboard.jpg",
        width: 1747,
        height: 730,
        alt: "Dashboard Libra Colf"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Libra Colf | Software per lavoro domestico, buste paga e INPS",
    description:
      "Buste paga colf e badanti, contributi INPS, documenti e gestione operativa per famiglie e professionisti.",
    images: ["/dashboard.jpg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">{children}</body>
    </html>
  );
}
