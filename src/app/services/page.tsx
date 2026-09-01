import FooterSection from "@/components/global/footer-section";
import CtaSection from "@/components/global/cta-section";
import {
  CapabilitiesSection,
  InterplaySection,
  OurServicesSection,
  ProofSection,
  ResultsSection,
  ServicesHeroSection,
  ServicesClientsSection,
  ServicesTestimonialsSection,
  ThreeServicesSection,
  WorkLinkSection,
} from "@/components/services";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";

import "@/css/components/cta.css";
import "@/css/pages/services.css";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const services = await client.getSingle("services");
  return generateMeta(services.id);
}

export default async function ServicesPage() {
  const client = createClient();
  const { data } = await client.getSingle("services");
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="services"
    >
      <div id="smooth-content" className="services" data-page="Services">
        <ServicesHeroSection data={data} />
        <OurServicesSection />
        <ThreeServicesSection />
        <InterplaySection />
        <CapabilitiesSection />
        <ProofSection />
        <ResultsSection />
        <CtaSection />
        <ServicesTestimonialsSection data={data} />
        <ServicesClientsSection data={data} />
        <WorkLinkSection data={data} />
        {/* Sections are added here one at a time. */}
        <FooterSection />
      </div>
    </main>
  );
}
