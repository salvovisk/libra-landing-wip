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
  title: "Libra Colf | Gestione professionale del lavoro domestico",
  description:
    "Libra Colf semplifica buste paga, contributi INPS, archiviazione e gestione documentale per famiglie, CAF e studi professionali.",
  keywords: [
    "Libra Colf",
    "lavoro domestico",
    "buste paga colf",
    "INPS colf",
    "software CAF lavoro domestico",
    "gestione badanti"
  ],
  openGraph: {
    title: "Libra Colf | Gestione professionale del lavoro domestico",
    description:
      "Una piattaforma SaaS ad alta precisione per famiglie e professionisti che gestiscono lavoro domestico, payroll e INPS.",
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
    title: "Libra Colf | Gestione professionale del lavoro domestico",
    description:
      "Payroll, contributi INPS, archivio e portale clienti per privati e studi professionali.",
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
