"use client";

import { useState } from "react";

import { Footer } from "@/components/footer";
import { DemoBookingModal } from "@/components/demo-booking-modal";
import { EngagementModal } from "@/components/engagement-modal";
import { EmailTemplatePreview } from "@/components/email-template-preview";
import { DemoSection } from "@/components/demo-section";
import { FAQSection } from "@/components/faq-section";
import { FakeChatbot } from "@/components/fake-chatbot";
import { Hero } from "@/components/hero";
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

export function LandingShell() {
  const [persona, setPersona] = useState<Persona>("private");
  const [billingCycle, setBillingCycle] = useState<Billing>("monthly");

  return (
    <div className="pb-4">
      <Navbar persona={persona} onPersonaChange={setPersona} />
      <EngagementModal persona={persona} />
      <DemoBookingModal persona={persona} />
      <EmailTemplatePreview />
      <FakeChatbot persona={persona} />
      <main className="pt-20 sm:pt-22 lg:pt-24">
        <Hero />
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
        <DemoSection persona={persona} />
        <FAQSection />
        <LeadMagnetSection />
      </main>
      <Footer />
    </div>
  );
}
