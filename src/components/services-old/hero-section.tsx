import { PrismicRichText } from "@prismicio/react";

interface HeroSectionProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section id="hero">
      <figure className="parallax">
        <img
          alt={data.hero_background_image?.alt ?? ""}
          src={`${data.hero_background_image?.url}&fit=clip&w=1920&q=85`}
          srcSet={[
            `${data.hero_background_image?.url}&fit=clip&w=768&q=85 768w`,
            `${data.hero_background_image?.url}&fit=clip&w=1024&q=85 1024w`,
            `${data.hero_background_image?.url}&fit=clip&w=1440&q=85 1440w`,
            `${data.hero_background_image?.url}&fit=clip&w=1920&q=85 1920w`,
          ].join(", ")}
          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
          width={data.hero_background_image?.dimensions?.width || 1440}
          height={data.hero_background_image?.dimensions?.height || 810}
          loading="eager"
          decoding="async"
          className="lazy"
        />
      </figure>

      <div className="hero-captions grid-margin">
        <div className="st-grid">
          <div className="st-xl-3 st-sm-5 fadeUp">
            {data.hero_left_caption && (
              <p className="caption xs-hidden">
                <PrismicRichText
                  field={data.hero_left_caption}
                  components={{
                    paragraph: ({ children }) => <span>{children}</span>,
                  }}
                />
              </p>
            )}
          </div>
          <div className="st-xl-4 st-xl-os-4 st-sm-6 st-sm-os-1 st-xs-8 st-xs-os-0 center fadeUp">
            {data.hero_center_caption && (
              <p className="caption">{data.hero_center_caption}</p>
            )}
          </div>
          <div className="st-xl-3 st-xl-os-4 st-sm-5 st-sm-os-1 st-xs-os-0 right fadeUp">
            <a
              href="/contact"
              className="hero-contact caption st-grid grid-end xs-hidden"
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
          <h1 className="st-xl-16 st-xl-os-1 st-xs-18 st-xs-os-0 f-140 upper hero-split chars">
            {data.hero_main_title}
          </h1>
        )}
      </div>

      <div className="st-grid grid-margin hero-bottom">
        <div className="st-xl-8 st-xl-os-5 st-xs-16 st-xs-os-1 xs-top-2">
          <h2 className="f-28 center">
            <PrismicRichText
              field={data.hero_subtitle}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </h2>
        </div>
      </div>
    </section>
  );
}
