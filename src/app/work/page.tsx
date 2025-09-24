import FooterSection from "@/components/global/footer-section";
import HeroSection from "@/components/works/hero-section";
import WorkSection from "@/components/works/work-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";
// import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("works");
  return generateMeta(homepage.id);
}

export default async function Home() {
  const client = createClient();
  const { data } = await client.getSingle("works");
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="work"
    >
      <div id="smooth-content" className="work" data-page="Work">
        <HeroSection data={data} />
        <WorkSection />
        <FooterSection />
      </div>
    </main>
  );
}
