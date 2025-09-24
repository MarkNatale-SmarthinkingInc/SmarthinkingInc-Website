import AboutSection from "@/components/about/about-section";
import BeliefSection from "@/components/about/belief-section";
import AboutClientsSection from "@/components/about/clients-section";
import HeroSection from "@/components/about/hero-section";
import ManifestoSection from "@/components/about/manifesto-section";
import AboutTestimonialsSection from "@/components/about/testimonials-section";
import FooterSection from "@/components/global/footer-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("about");
  return generateMeta(homepage.id);
}

export default async function Home() {
  const client = createClient();
  const { data } = await client.getSingle("about");
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="about"
    >
      <div id="smooth-content" className="about" data-page="About">
        <HeroSection data={data} />
        <AboutSection data={data} />
        <BeliefSection data={data} />
        <ManifestoSection data={data} />
        <AboutTestimonialsSection data={data} />
        <AboutClientsSection data={data} />
        <FooterSection />
      </div>
    </main>
  );
}
