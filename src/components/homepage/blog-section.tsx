import { createClient } from "@/prismicio";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface BlogSectionProps {
  data: Content.HomepageDocumentData;
}

export default async function BlogSection({ data }: BlogSectionProps) {
  const client = createClient();

  // Fetch latest 3 blog posts
  const latestBlogPosts = await client.getAllByType("blog_post", {
    limit: 3,
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
    fetchLinks: [
      "blog_post.title",
      "blog_post.featured_image",
      "blog_post.tags",
    ],
  });

  // Combine featured blog posts with latest blog posts
  const featuredPosts =
    data.featured_blog_posts
      ?.map((item) => item.blog_post)
      .filter((post) => isFilled.contentRelationship(post) && post.data) || [];

  const allPosts = [...featuredPosts, ...latestBlogPosts];

  // Remove duplicates and slice to 3 articles
  const uniquePosts = allPosts
    .filter((post: any, index: number, arr: any[]) => {
      if (!post || !post.id) return false;
      return arr.findIndex((p: any) => p && p.id === post.id) === index;
    })
    .slice(0, 3);

  return (
    <section id="blog" className="xl-top-5 xs-top-10">
      <div className="st-grid grid-between grid-margin xs-wrap">
        <h2 className="f-100">
          <PrismicRichText
            field={data.blog_section_title}
            components={{
              paragraph: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => (
                <span className="Brown">{children}</span>
              ),
            }}
          />
        </h2>
        <div className="arrow-link self-end xs-both-2">
          <a href="/blog" className="st-grid">
            <img
              src="/img/svg/icon-semi-arrow-red.svg"
              alt="Red arrow pointing to right"
            />
            <span>View All Posts</span>
          </a>
        </div>
      </div>
      <div className="articles">
        {uniquePosts.map((blogPost: any, index) => {
          if (!blogPost || !blogPost.data) {
            return null;
          }

          return (
            <article
              key={`blog-post-${index}-${blogPost.data?.title || blogPost.uid}`}
            >
              {isFilled.image(blogPost.data?.featured_image) && (
                <figure>
                  <PrismicNextLink document={blogPost}>
                    {blogPost.data.featured_image?.url && (
                      <img
                        alt={blogPost.data.featured_image?.alt ?? ""}
                        src={`${blogPost.data.featured_image?.url}&fit=clip&w=1920&q=85`}
                        srcSet={[
                          `${blogPost.data.featured_image?.url}&fit=clip&w=768&q=85 768w`,
                          `${blogPost.data.featured_image?.url}&fit=clip&w=1024&q=85 1024w`,
                          `${blogPost.data.featured_image?.url}&fit=clip&w=1440&q=85 1440w`,
                          `${blogPost.data.featured_image?.url}&fit=clip&w=1920&q=85 1920w`,
                        ].join(", ")}
                        sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                        width={
                          blogPost.data.featured_image?.dimensions?.width ||
                          1440
                        }
                        height={
                          blogPost.data.featured_image?.dimensions?.height ||
                          810
                        }
                        loading="lazy"
                        decoding="async"
                        className="lazy"
                      />
                    )}
                  </PrismicNextLink>
                </figure>
              )}
              <div>
                {/*{blogPost?.tags &&
                  Array.isArray(blogPost.tags) &&
                  blogPost.tags.length > 0 && (
                    <div className="tags">
                      {blogPost.tags.map((tag: string) => (
                        <span key={`tag-${tag}`} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}*/}
                {blogPost.data?.title && (
                  <h3 className="f-24">
                    <PrismicNextLink document={blogPost}>
                      {blogPost.data.title}
                    </PrismicNextLink>
                  </h3>
                )}
              </div>
              <PrismicNextLink document={blogPost} className="blog-button">
                <img
                  src="/img/svg/icon-arrow-white.svg"
                  alt="Arrow pointing to right"
                />
              </PrismicNextLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
