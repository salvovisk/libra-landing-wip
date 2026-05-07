"use client";

import { useState } from "react";

import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { FAQSection } from "@/components/faq-section";
import { LeadMagnetSection } from "@/components/lead-magnet-section";
import { Navbar } from "@/components/navbar";
import { PersonaBento } from "@/components/persona-bento";
import { PersonaProblem } from "@/components/persona-problem";
import { PersonaSwitcher } from "@/components/persona-switcher";
import { PricingEngine } from "@/components/pricing-engine";
import { Testimonials } from "@/components/testimonials";
import { ValueReasons } from "@/components/value-reasons";
import { WorkflowSection } from "@/components/workflow-section";
import type { Billing, Persona } from "@/lib/site-data";
import { HeroEnriched } from "./hero-enriched";

export function LandingShell() {
  const [persona, setPersona] = useState<Persona>("private");
  const [billingCycle, setBillingCycle] = useState<Billing>("monthly");

  return (
    <div className="pb-4">
      <Navbar persona={persona} onPersonaChange={setPersona} />
      <CookieBanner />
      <main>
        <HeroEnriched />
        <ValueReasons />
        <WorkflowSection />
        <PersonaSwitcher persona={persona} onChange={setPersona} />
        <PersonaProblem persona={persona} />
        <PersonaBento persona={persona} />
        <Testimonials />
        <PricingEngine
          persona={persona}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />
        <FAQSection />
        <LeadMagnetSection />
      </main>
      <Footer />
    </div>
  );
}
