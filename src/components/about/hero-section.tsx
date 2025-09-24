import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type HeroSectionProps = {
  data: Content.AboutDocumentData;
};

export default function HeroSection({ data }: HeroSectionProps) {
  const fullYear = new Date().getFullYear();
  return (
    <section id="hero">
      <figure className="parallax">
        <PrismicNextImage field={data.hero_background_image} />
      </figure>
      <div className="hero-captions grid-margin">
        <div className="st-grid">
          <div className="st-xl-3 st-sm-5">
            <p className="caption xs-hidden">
              <PrismicRichText
                field={data.hero_left_caption}
                components={{
                  paragraph: ({ children }) => <span>{children}</span>,
                  strong: ({ children }) => (
                    <span className="Brown">{children}</span>
                  ),
                  em: ({ children }) => (
                    <span className="italic">{children}</span>
                  ),
                }}
              />
            </p>
          </div>
          <div className="st-xl-4 st-xl-os-4 st-sm-6 st-sm-os-1 st-xs-8 st-xs-os-0 center">
            <p className="caption">{data.hero_center_caption}</p>
          </div>
          <div className="st-xl-3 st-xl-os-4 st-sm-5 st-sm-os-1 st-xs-os-0 right">
            <p className="caption xs-hidden">
              &copy;<span className="year">{fullYear}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="hero-img-title grid-margin center">
        <i className="v-line"></i>
        <h1 className="st-xl-16 st-xl-os-1 st-xs-18 st-xs-os-0 f-120 upper">
          {data.hero_main_title}
        </h1>
      </div>
      <div className="st-grid grid-margin hero-bottom">
        <div className="st-xl-8 st-xl-os-5 st-xs-16 st-xs-os-1 xs-top-2">
          <div className="f-28 center">
            <PrismicRichText
              field={data.hero_bottom_paragraph}
              components={{ paragraph: ({ children }) => <p>{children}</p> }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
