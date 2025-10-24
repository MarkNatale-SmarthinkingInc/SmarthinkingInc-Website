import { createClient } from "@/prismicio";
import { type Content, isFilled } from "@prismicio/client";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface HeroSectionPrismicProps {
  data: Content.HomepageDocumentData;
}

export default async function HeroSectionPrismic({
  data,
}: HeroSectionPrismicProps) {
  const currentYear = new Date().getFullYear();
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return (
    <section id="hero">
      <figure className="parallax">
        {data.hero_background_image?.url && (
          <Image
            alt={data.hero_background_image?.alt ?? ""}
            src={`${data.hero_background_image?.url}&fit=clip&w=800`}
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 1440px"
            blurDataURL={`${data.hero_background_image?.url}&w=100&blur=40`}
            placeholder="blur"
            width={data.hero_background_image?.dimensions?.width || 1440}
            height={data.hero_background_image?.dimensions?.height || 810}
            className="lazy"
            priority
          />
        )}
      </figure>

      <div className="hero-captions grid-margin fadeUp">
        <div className="st-grid">
          <div className="st-xl-3 st-sm-5">
            {data.hero_left_caption && (
              <p className="caption xs-hidden">{data.hero_left_caption}</p>
            )}
          </div>
          <div className="st-xl-4 st-xl-os-4 st-sm-6 st-sm-os-1 st-xs-8 st-xs-os-0 center fadeUp">
            {data.hero_center_caption && (
              <p className="caption">{data.hero_center_caption}</p>
            )}
          </div>
          <div className="st-xl-3 st-xl-os-4 st-sm-5 st-sm-os-1 st-xs-os-0 right fadeUp xs-hidden">
            <a
              href="/contact"
              className="hero-contact caption st-grid grid-end"
              aria-label="Contact us"
            >
              <img
                src="/img/svg/hero-cta-icon.svg"
                alt="Red arrow pointing to right"
              />
              <span>Contact us</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-img-title grid-margin center">
        <i className="v-line"></i>
        {data.hero_main_title && (
          <h1 className="f-120 upper hero-split chars">
            {data.hero_main_title}
          </h1>
        )}
      </div>

      <div className="st-grid grid-margin hero-bottom">
        <div className="st-xl-5 st-xl-os-1 st-xs-18 xs-center st-xs-os-0">
          <h2 className="f-40">
            <PrismicRichText
              field={data.hero_subtitle}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </h2>
        </div>

        <nav className="st-xl-3 st-xl-os-8 st-xs-4 st-xs-os-4 f-18 xs-hidden nav-white">
          {navigation.data.links?.map((item, index) =>
            item.link && isFilled.link(item.link) ? (
              <span key={`nav-${index}-${item.link.text}`}>
                <PrismicNextLink
                  field={item.link}
                  className="text-link link-white"
                >
                  {item.link.text}
                </PrismicNextLink>
                <br />
              </span>
            ) : null
          )}
        </nav>
      </div>
    </section>
  );
}
