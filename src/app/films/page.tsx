import FooterSection from "@/components/global/footer-section";
import {
  FilmsHeroSection,
  FilmsIntroSection,
  FilmsVideosSection,
} from "@/components/films";
import type { Metadata } from "next";

import "@/css/pages/films.css";

export const metadata: Metadata = {
  title: "Featured Films | Smarthinking Inc.",
  description:
    "Films like these turn simple inquiries into motivated leads. Want yours to do the same? Book a discovery call.",
};

/**
 * Standalone showcase page that Smarthinking links to directly. Not in the
 * nav or linked from any other page.
 */
export default function FilmsPage() {
  return (
    <main id="smooth-wrapper" data-barba="container" data-barba-namespace="films">
      <div id="smooth-content" className="films" data-page="Films">
        <FilmsHeroSection />
        <FilmsIntroSection />
        <FilmsVideosSection />
        <FooterSection />
      </div>
    </main>
  );
}
