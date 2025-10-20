import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

interface BlogDetailHeroSectionProps {
  blogPost?: Content.BlogPostDocument;
}

export default function BlogDetailHeroSection({
  blogPost,
}: BlogDetailHeroSectionProps) {
  return (
    <section id="hero">
      <div className="hero-title grid-margin center st-xl-14 st-xl-os-2 st-xs-18 st-xs-os-0">
        <PrismicNextLink href="/blog" className="caption fadeUp">
          Back to Blog
        </PrismicNextLink>
        <h1 className="f-80 hero-split chars">{blogPost?.data?.title}</h1>
      </div>
      <div className="piano-wrap fadeIn">
        <canvas id="piano" className="xs-hidden"></canvas>
        <div className="st-grid grid-margin">
          <div className="st-xl-5 st-sm-3 empty-left xs-hidden"></div>
          <div className="st-xl-8 st-sm-12 st-xs-18">
            <div className="st-grid grid-middle grid-between author-box xs-wrap">
              <div className="st-xl-3 st-xs-18 st-grid grid-middle grid-start xs-grid-center xs-both-2 fadeUp">
                <figure>
                  <Image
                    alt={blogPost?.data.author_image?.alt ?? ""}
                    src={`${blogPost?.data.author_image?.url}&fit=clip&w=1440`}
                    sizes="(max-width: 768px) 100vw, 1440px"
                    blurDataURL={`${blogPost?.data.author_image?.url}&w=100&blur=40`}
                    placeholder="blur"
                    width={
                      blogPost?.data.author_image?.dimensions?.width || 1440
                    }
                    height={
                      blogPost?.data.author_image?.dimensions?.height || 810
                    }
                    className="lazy"
                  />
                </figure>
                <div className="caption">
                  <span className="Brown">By: </span>
                  {blogPost?.data.author_name}
                </div>
              </div>
              <div className="st-xl-5 st-xs-9 st-xs-18 right xs-center xs-bottom-2 fadeUp">
                <div className="tags">
                  {blogPost?.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <figure className="hero-img fadeUp">
              <Image
                alt={blogPost?.data?.featured_image?.alt ?? ""}
                src={`${blogPost?.data?.featured_image?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${blogPost?.data?.featured_image?.url}&w=100&blur=40`}
                placeholder="blur"
                width={
                  blogPost?.data?.featured_image?.dimensions?.width || 1440
                }
                height={
                  blogPost?.data?.featured_image?.dimensions?.height || 810
                }
                className="lazy"
                priority
              />
            </figure>
          </div>
          <div className="st-xl-5 st-sm-3 empty-right xs-hidden"></div>
        </div>
      </div>
    </section>
  );
}
