"use client";

import { useState } from "react";

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PersonaBento } from "@/components/persona-bento";
import { PersonaProblem } from "@/components/persona-problem";
import { PersonaSwitcher } from "@/components/persona-switcher";
import { PricingEngine } from "@/components/pricing-engine";
import { ValueReasons } from "@/components/value-reasons";
import { WorkflowSection } from "@/components/workflow-section";
import type { Billing, Persona } from "@/lib/site-data";

export function LandingShell() {
  const [persona, setPersona] = useState<Persona>("private");
  const [billingCycle, setBillingCycle] = useState<Billing>("monthly");

  return (
    <div className="pb-4">
      <Navbar persona={persona} onPersonaChange={setPersona} />
      <main className="pt-20 sm:pt-22 lg:pt-24">
        <Hero />
        <ValueReasons />
        <WorkflowSection />
        <PersonaSwitcher persona={persona} onChange={setPersona} />
        <PersonaProblem persona={persona} />
        <PersonaBento persona={persona} />
        <PricingEngine
          persona={persona}
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />
      </main>
      <Footer />
    </div>
  );
}
