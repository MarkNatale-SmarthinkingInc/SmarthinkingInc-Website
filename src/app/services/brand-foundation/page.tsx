import FooterSection from "@/components/global/footer-section";
import CtaSection from "@/components/global/cta-section";
import {
  BrandFoundationDeliverablesSection,
  BrandFoundationIntroSection,
  BrandFoundationProofSection,
  BrandFoundationQuestionsSection,
  BrandFoundationWhatsNextSection,
  BrandFoundationWhySection,
  BrandFoundationWorkSection,
} from "@/components/brand-foundation";
import { SubpageHeroSection } from "@/components/services";
import type { Metadata } from "next";

import "@/css/components/cta.css";
import "@/css/pages/service-subpage.css";

export const metadata: Metadata = {
  title: "Brand Foundation | Smarthinking Inc.",
  description:
    "Where brands are born — the strategy, insights and definitive point of view that a remarkable brand is forged from.",
};

export default function BrandFoundationPage() {
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="service-subpage"
    >
      <div
        id="smooth-content"
        className="service-subpage brand-foundation"
        data-page="Brand Foundation"
      >
        <SubpageHeroSection
          title={["Where Brands", "Are Born"]}
          image="/img/services-new/brand-foundation/Service-Brand-Foundation-1.jpg"
          imageAlt="Concept sketch of a spa bathing hall resolving into a finished render"
        />
        <BrandFoundationIntroSection />
        <BrandFoundationQuestionsSection />
        <BrandFoundationWhySection />
        <BrandFoundationDeliverablesSection />
        <BrandFoundationProofSection />
        <BrandFoundationWorkSection />
        <BrandFoundationWhatsNextSection />
        <CtaSection />
        <FooterSection />
      </div>
    </main>
  );
}
