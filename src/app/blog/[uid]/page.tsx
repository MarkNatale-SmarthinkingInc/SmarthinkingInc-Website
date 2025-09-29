import BlogDetailContentSection from "@/components/blog/blog-detail-content-section";
import BlogDetailCtaSection from "@/components/blog/blog-detail-cta-section";
import BlogDetailHeroSection from "@/components/blog/blog-detail-hero-section";
import FooterSection from "@/components/global/footer-section";
import { createClient } from "@/prismicio";
import { generateMeta } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  const client = createClient();

  const blogPost = await client.getByUID("blog_post", uid);
  return generateMeta(blogPost.id);
}

export async function generateStaticParams() {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  return blogPosts.map((blogPost) => ({ uid: blogPost.uid }));
}

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  const client = createClient();
  const blogPost = await client.getByUID("blog_post", uid);
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="blog-detail"
    >
      <div id="smooth-content" className="blog-detail" data-page="Blog">
        <BlogDetailHeroSection blogPost={blogPost} />
        <BlogDetailContentSection blogPost={blogPost} />
        <BlogDetailCtaSection blogPost={blogPost} />
        <FooterSection />
      </div>
    </main>
  );
};

export default BlogDetailPage;
