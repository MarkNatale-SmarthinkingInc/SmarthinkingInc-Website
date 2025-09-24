import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { type Content, filter } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import NewsletterBox from "./newsletter-box";

type BlogDetailContentSectionProps = {
  blogPost: Content.BlogPostDocument;
};

export default async function BlogDetailContentSection({
  blogPost,
}: BlogDetailContentSectionProps) {
  const client = createClient();
  const { data } = await client.getSingle("blog");

  const otherBlogPosts = await client.getByType("blog_post", {
    filters: [filter.not("document.id", blogPost.id)],
    pageSize: 3,
    fetchLinks: ["blog_post.title", "blog_post.tags"],
  });

  return (
    <section className="st-grid grid-margin xs-wrap">
      <div className="st-xl-5 newsletter-wrap sm-hidden">
        <NewsletterBox
          variant="blog-detail"
          title={data.newsletter_title}
          subtitle={data.newsletter_subtitle}
        />
      </div>

      <div id="blog-content" className="st-xl-8 st-sm-12 st-xs-18">
        <p className="f-24">
          <PrismicRichText
            field={blogPost.data.introduction}
            components={{
              paragraph: ({ children }) => <span>{children}</span>,
            }}
          />
        </p>
        <SliceZone slices={blogPost.data.slices} components={components} />
      </div>

      <div className="st-xl-5 st-sm-6 st-xs-18 related-articles xs-top-6">
        <h3 className="caption xs-top-3 xs-bottom-1">More reading</h3>
        {otherBlogPosts.results.map((post) => (
          <article key={post.id}>
            <h3 className="f-20">
              <PrismicNextLink document={post}>
                {post.data.title}
              </PrismicNextLink>
            </h3>
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
