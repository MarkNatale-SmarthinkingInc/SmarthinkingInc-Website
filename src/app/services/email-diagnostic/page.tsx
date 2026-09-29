import {
  EmailDiagnosticAboutSection,
  EmailDiagnosticDiagnosticSection,
  EmailDiagnosticHeroSection,
  EmailDiagnosticIntroSection,
  EmailDiagnosticMockupSection,
  EmailDiagnosticResultSection,
  EmailDiagnosticWhySection,
} from "@/components/email-diagnostic";
import CtaSection from "@/components/global/cta-section";
import FooterSection from "@/components/global/footer-section";
import type { Metadata } from "next";

import "@/css/components/cta.css";
import "@/css/pages/email-diagnostic.css";

export const metadata: Metadata = {
  title: "The Email Diagnostic | Smarthinking Inc.",
  description:
    "A proper email initiative should return 20 to 60 times its cost for remarkable properties. The Diagnostic audits your email program and shows where your ROI is leaking.",
};

/**
 * Standalone landing page for email campaigns. It isn't linked from the nav or
 * from /services yet. It lives under /services/ but is matched before the
 * Prismic [uid] catch-all in both main.js and pageToPage.tsx.
 */
export default function EmailDiagnosticPage() {
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="email-diagnostic"
    >
      <div
        id="smooth-content"
        className="email-diagnostic"
        data-page="Email Diagnostic"
      >
        <EmailDiagnosticHeroSection />
        <EmailDiagnosticIntroSection />
        <EmailDiagnosticMockupSection />
        <EmailDiagnosticDiagnosticSection />
        <EmailDiagnosticResultSection />
        <EmailDiagnosticWhySection />
        <EmailDiagnosticAboutSection />
        <CtaSection
          invitation="See where your ROI is leaking."
          callToAction="Connect with Smarthinking Inc. today."
        />
        <FooterSection />
      </div>
    </main>
  );
}
