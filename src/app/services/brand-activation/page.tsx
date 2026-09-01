import FooterSection from "@/components/global/footer-section";
import CtaSection from "@/components/global/cta-section";
import {
  BrandActivationDeliverablesSection,
  BrandActivationHowSection,
  BrandActivationIntroSection,
  BrandActivationProofSection,
  BrandActivationStringsSection,
  BrandActivationTakeNoteSection,
  BrandActivationWhatsNextSection,
  BrandActivationWhySection,
  BrandActivationWorkSection,
} from "@/components/brand-activation";
import { SubpageHeroSection } from "@/components/services";
import { getServiceSubpage } from "@/utils/service-subpage";
import type { Metadata } from "next";

import "@/css/components/cta.css";
import "@/css/pages/service-subpage.css";

export const metadata: Metadata = {
  title: "Brand Activation | Smarthinking Inc.",
  description:
    "Bring your collective brand expressions to life — a symphonic approach that applies to every interaction, ensuring a compelling and consistent brand narrative globally.",
};

export default async function BrandActivationPage() {
  // null until the Prismic document exists; every section below falls
  // back to the copy in its own component.
  const page = await getServiceSubpage("brand-activation");

  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="service-subpage"
    >
      <div
        id="smooth-content"
        className="service-subpage brand-activation"
        data-page="Brand Activation"
      >
        <SubpageHeroSection
          title={["A Beautiful", "Amalgamation"]}
          image="/img/services-new/brand-activation/hero.jpg"
          imageAlt="Magazine spread pairing a portrait with a jaguar"
        />
        <BrandActivationIntroSection page={page} />
        <BrandActivationWhySection page={page} />
        <BrandActivationHowSection page={page} />
        <BrandActivationStringsSection />
        <BrandActivationDeliverablesSection />
        <BrandActivationProofSection />
        <BrandActivationWorkSection />
        <BrandActivationTakeNoteSection />
        <BrandActivationWhatsNextSection />
        <CtaSection />
        <FooterSection />
      </div>
    </main>
  );
}
