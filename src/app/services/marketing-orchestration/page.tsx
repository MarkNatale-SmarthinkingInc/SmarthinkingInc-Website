import FooterSection from "@/components/global/footer-section";
import CtaSection from "@/components/global/cta-section";
import {
  MarketingOrchestrationDeliverablesSection,
  MarketingOrchestrationHowSection,
  MarketingOrchestrationIntroSection,
  MarketingOrchestrationProofSection,
  MarketingOrchestrationWhatsNextSection,
  MarketingOrchestrationWhySection,
  MarketingOrchestrationWorkSection,
} from "@/components/marketing-orchestration";
import { SubpageHeroSection } from "@/components/services";
import { getServiceSubpage } from "@/utils/service-subpage";
import type { Metadata } from "next";

import "@/css/components/cta.css";
import "@/css/pages/service-subpage.css";

export const metadata: Metadata = {
  title: "Marketing Orchestration | Smarthinking Inc.",
  description:
    "Your brand is symphonic in nature, so all efforts need orchestration — playing in the right key, keeping tempo, and hitting the crescendos.",
};

export default async function MarketingOrchestrationPage() {
  // null until the Prismic document exists; every section below falls
  // back to the copy in its own component.
  const page = await getServiceSubpage("marketing-orchestration");

  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="service-subpage"
    >
      <div
        id="smooth-content"
        className="service-subpage marketing-orchestration"
        data-page="Marketing Orchestration"
      >
        <SubpageHeroSection
          title={["Conducting The", "Symphony"]}
          image="/img/services-new/marketing-orchestration/hero.jpg"
          imageAlt="Abstract burst of colour radiating from a bright centre"
        />
        <MarketingOrchestrationIntroSection page={page} />
        <MarketingOrchestrationWhySection page={page} />
        <MarketingOrchestrationHowSection page={page} />
        <MarketingOrchestrationDeliverablesSection />
        <MarketingOrchestrationProofSection />
        <MarketingOrchestrationWorkSection />
        <MarketingOrchestrationWhatsNextSection />
        <CtaSection />
        <FooterSection />
      </div>
    </main>
  );
}
