"use client";

import { createClient } from "@/prismicio";
import { type Content, filter, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink } from "@prismicio/next";
import { useCallback, useEffect, useState } from "react";
import NewsletterBox from "./newsletter-box";

type BlogSectionProps = {
  data: Content.BlogDocumentData;
};

export default function BlogSection({ data }: BlogSectionProps) {
  const [blogPosts, setBlogPosts] = useState<Content.BlogPostDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const client = createClient();
  const pageSize = 6;

  const featuredPosts = data.featured_blog_posts
    .map((item) => item.post)
    .filter((post) => isFilled.contentRelationship(post) && post.data)
    .slice(0, 3);

  const featuredPostIds = featuredPosts
    .map((item) =>
      isFilled.contentRelationship(item) && item.id ? item.id : null
    )
    .filter((item) => item !== null);

  // Create individual filter.not() conditions for each featured post ID
  const excludeFilters = featuredPostIds.map((id) =>
    filter.not("document.id", id)
  );

  const fetchBlogPosts = useCallback(
    async (page: number, append = false) => {
      setIsLoading(true);
      try {
        const response = await client.getByType("blog_post", {
          page,
          pageSize,
          orderings: [
            { field: "document.first_publication_date", direction: "desc" },
          ],
          fetchLinks: [
            "blog_post.title",
            "blog_post.featured_image",
            "blog_post.tags",
            "blog_post.excerpt",
          ],
          filters: excludeFilters,
        });

        if (append) {
          setBlogPosts((prev) => [...prev, ...response.results]);
        } else {
          setBlogPosts(response.results);
        }

        // Check if there are more pages
        setHasMore(page < response.total_pages);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [client, excludeFilters]
  );

  useEffect(() => {
    fetchBlogPosts(1);
  }, [fetchBlogPosts]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchBlogPosts(nextPage, true);
    }
  };

  return (
    <section id="blog" className="grid-margin">
      <h2 className="sup-title xs-both-2">{data.blog_section_title}</h2>
      <div className="blog-featured st-grid xl-top-1 xs-wrap">
        {featuredPosts.map((item) => {
          if (!isFilled.contentRelationship(item) || !item.data) return null;

          return (
            <article className="st-xl-6 st-xs-18" key={item.id}>
              <figure>
                <PrismicNextLink field={item}>
                  <PrismicNextImage
                    field={item.data.featured_image}
                    className="lazy"
                  />
                </PrismicNextLink>
              </figure>
              <div className="tags"></div>
              <h3 className="f-24">
                <PrismicNextLink field={item}>
                  {item.data.title}
                </PrismicNextLink>
              </h3>
            </article>
          );
        })}
      </div>

      <div className="blog-wrap st-grid xl-bottom-5/">
        <div className="st-xl-6 newsletter-box scroll-fix xs-hidden">
          <NewsletterBox
            variant="blog-listing"
            title={data.newsletter_title}
            subtitle={data.newsletter_subtitle}
          />
        </div>
        <div className="st-xl-12 st-xs-18 blog-listing xl-bottom-5 xs-bottom-10">
          {blogPosts.map((post) => (
            <article className="st-grid" key={post.id}>
              <figure className="st-xl-6 st-xs-7 xs-self-start">
                <PrismicNextLink document={post}>
                  <PrismicNextImage
                    field={post.data.featured_image}
                    className="lazy"
                  />
                </PrismicNextLink>
              </figure>
              <div className="st-xl-6 st-xs-11">
                <div className="tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="f-24">
                  <PrismicNextLink document={post}>
                    {post.data.title}
                  </PrismicNextLink>
                </h2>
              </div>
            </article>
          ))}

          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="button button-reload button-dark"
              disabled={isLoading}
              type="button"
            >
              <div className="main-bg"></div>
              <div className="icon">
                <i>
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="loadMoreIcon1"
                  >
                    <title id="loadMoreIcon1">Load more icon</title>
                    <path
                      d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C13.1987 21 15.2316 20.2904 16.8824 19.0878"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 16.3779C20 14.6592 19.2625 12.2388 16.8018 12.2388L16.8036 12.238C16.4385 12.2598 16 12.3445 16 12.3445L16 11C16 11 17.3116 10.9783 18.1753 10.9998L24.2284 10.9998C24.5896 10.9783 26 11 26 11L26 12.3445C26 12.3445 25.5421 12.2602 25.1793 12.2383L25.1804 12.2388C22.7214 12.2388 22 14.6594 22 16.378L20 16.3779Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="loadMoreIcon2"
                  >
                    <title id="loadMoreIcon2">Load more icon</title>
                    <path
                      d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C13.1987 21 15.2316 20.2904 16.8824 19.0878"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 16.3779C20 14.6592 19.2625 12.2388 16.8018 12.2388L16.8036 12.238C16.4385 12.2598 16 12.3445 16 12.3445L16 11C16 11 17.3116 10.9783 18.1753 10.9998L24.2284 10.9998C24.5896 10.9783 26 11 26 11L26 12.3445C26 12.3445 25.5421 12.2602 25.1793 12.2383L25.1804 12.2388C22.7214 12.2388 22 14.6594 22 16.378L20 16.3779Z"
                      fill="white"
                    />
                  </svg>
                </i>
              </div>
              <div className="label-wrap">
                <span>{isLoading ? "Loading..." : "Load More"}</span>
                <span>{isLoading ? "Loading..." : "Load More"}</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
