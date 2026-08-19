import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { type Content, filter, isFilled } from "@prismicio/client";
// biome-ignore lint/correctness/noUnusedImports: PREVIEW - used by temporarily hidden column
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
// biome-ignore lint/correctness/noUnusedImports: PREVIEW - used by temporarily hidden column
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
    <section className="st-grid grid-margin xs-wrap scroll-fix-wrap">
      {/* PREVIEW: left newsletter column temporarily hidden */}
      {/* <div className="st-xl-5 newsletter-wrap sm-hidden">
        <NewsletterBox
          variant="blog-detail"
          title={data.newsletter_title}
          subtitle={data.newsletter_subtitle}
        />
      </div> */}

      <div
        id="blog-content"
        className="st-xl-12 st-xl-os-3 st-sm-16 st-sm-os-1 st-xs-18 st-xs-os-0"
      >
        {isFilled.richText(blogPost.data.introduction) && (
          <p className="f-24">
            <PrismicRichText
              field={blogPost.data.introduction}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </p>
        )}
        <SliceZone slices={blogPost.data.slices} components={components} />
      </div>

      {/* PREVIEW: right "More reading" column temporarily hidden */}
      {/* <div className="st-xl-5 st-sm-6 st-xs-18 related-articles xs-top-6">
        <div className="scroll-fix">
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
      </div> */}
    </section>
  );
}
