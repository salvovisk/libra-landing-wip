import { LandingShell } from "@/components/landing-shell";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Libra Colf",
  url: "/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "it-IT",
  offers: [
    {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "EUR",
      category: "Privati"
    },
    {
      "@type": "Offer",
      price: "8.90",
      priceCurrency: "EUR",
      category: "Professionisti"
    }
  ],
  description:
    "Piattaforma SaaS per la gestione del lavoro domestico con buste paga, contributi INPS, archivio digitale e workflow per CAF e studi.",
  image: "/dashboard.jpg",
  audience: [
    {
      "@type": "Audience",
      audienceType: "Famiglie"
    },
    {
      "@type": "Audience",
      audienceType: "CAF e Studi Professionali"
    }
  ],
  brand: {
    "@type": "Brand",
    name: "Libra Colf"
  }
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <LandingShell />
    </>
  );
}
