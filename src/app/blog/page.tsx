import BlogSection from "@/components/blog/blog-section";
import BlogHeroSection from "@/components/blog/hero-section";
import PodcastSection from "@/components/blog/podcast-section";
import FooterSection from "@/components/global/footer-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const doc = await client.getSingle("blog");
  return generateMeta(doc.id);
}

export default async function Home() {
  const client = createClient();
  const { data } = await client.getSingle("blog", {
    fetchLinks: ["blog_post.title", "blog_post.featured_image"],
  });
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="blog"
    >
      <div id="smooth-content" className="blog" data-page="Blog">
        <BlogHeroSection data={data} />
        <PodcastSection data={data} />
        <BlogSection data={data} />
        <FooterSection />
      </div>
    </main>
  );
}
