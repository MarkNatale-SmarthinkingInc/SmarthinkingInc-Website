import FooterSection from "@/components/global/footer-section";
import {
  BlogSection,
  ClientsSection,
  CtaSection,
  HeroSection,
  ServicesSection,
  TestimonialsSection,
  WhySection,
  WorkSection,
} from "@/components/homepage";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";
// import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("homepage", {
    fetchLinks: [
      "work.title",
      "work.featured_image",
      "work.uid",
      "service.title",
      "blog_post.title",
      "blog_post.featured_image",
      "blog_post.excerpt",
      "blog_post.tags",
    ],
  });
  return generateMeta(homepage.id);
}

export default async function Home() {
  const client = createClient();
  const { data } = await client.getSingle("homepage", {
    fetchLinks: [
      "work.title",
      "work.featured_image",
      "work.uid",
      "service.title",
      "blog_post.title",
      "blog_post.featured_image",
      "blog_post.excerpt",
      "blog_post.tags",
    ],
  });
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="home"
    >
      <div id="smooth-content" className="home" data-page="Home">
        <HeroSection data={data} />
        <WorkSection data={data} />
        <ClientsSection data={data} />
        <TestimonialsSection data={data} />
        <ServicesSection data={data} />
        <WhySection data={data} />
        <CtaSection data={data} />
        <BlogSection data={data} />
        <FooterSection />
      </div>
    </main>
  );
}
