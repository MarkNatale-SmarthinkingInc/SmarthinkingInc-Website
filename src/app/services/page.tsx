import FooterSection from "@/components/global/footer-section";
import {
  ServiceIntroSection,
  ServicesClientsSection,
  ServicesHeroSection,
  ServicesSection,
  ServicesTestimonialsSection,
  WorkLinkSection,
} from "@/components/services";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";
// import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("services");
  return generateMeta(homepage.id);
}

export default async function Home() {
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
        <ServiceIntroSection data={data} />
        <ServicesSection data={data} />
        <ServicesTestimonialsSection data={data} />
        <ServicesClientsSection data={data} />
        <WorkLinkSection data={data} />
        <FooterSection />
      </div>
    </main>
  );
}
