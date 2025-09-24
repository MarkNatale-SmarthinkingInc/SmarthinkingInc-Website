import ContactDetailSection from "@/components/contact/contact-detail-section";
import ContactHeroSection from "@/components/contact/hero-section";
import FooterSection from "@/components/global/footer-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("contact");
  return generateMeta(homepage.id);
}

export default async function Home() {
  const client = createClient();
  const { data } = await client.getSingle("contact");
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="contact"
    >
      <div id="smooth-content" className="contact" data-page="Contact">
        <ContactHeroSection data={data} />
        <ContactDetailSection data={data} />
        <FooterSection />
      </div>
    </main>
  );
}
