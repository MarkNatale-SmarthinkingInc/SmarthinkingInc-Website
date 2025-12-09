import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type AboutSectionProps = {
  data: Content.AboutDocumentData;
};

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="grid-margin">
        <div className="offset-paragraph">
          <h2 className="sup-title">{data.about_sup_title}</h2>
          <p className="f-60 CopyLight st-xl-16">
            <PrismicRichText
              field={data.about_left_paragraph_1}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </p>
        </div>
        <div className="st-grid">
          <div className="st-xl-9 st-xs-8 st-grid img-combo xs-wrap xs-self-start">
            <figure className="st-xl-3 st-xs-8 xl-self-start">
              <img
                alt={data.about_left_image_small?.alt ?? ""}
                src={`${data.about_left_image_small?.url}&fit=clip&w=1920&q=85`}
                srcSet={[
                  `${data.about_left_image_small?.url}&fit=clip&w=768&q=85 768w`,
                  `${data.about_left_image_small?.url}&fit=clip&w=1024&q=85 1024w`,
                  `${data.about_left_image_small?.url}&fit=clip&w=1440&q=85 1440w`,
                  `${data.about_left_image_small?.url}&fit=clip&w=1920&q=85 1920w`,
                ].join(", ")}
                sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                width={data.about_left_image_small?.dimensions?.width || 1440}
                height={data.about_left_image_small?.dimensions?.height || 810}
                loading="lazy"
                decoding="async"
                className="lazy"
              />
            </figure>
            <figure className="st-xl-6 st-xs-8 xs-self-start">
              <img
                alt={data.about_left_image_large?.alt ?? ""}
                src={`${data.about_left_image_large?.url}&fit=clip&w=1920&q=85`}
                srcSet={[
                  `${data.about_left_image_large?.url}&fit=clip&w=768&q=85 768w`,
                  `${data.about_left_image_large?.url}&fit=clip&w=1024&q=85 1024w`,
                  `${data.about_left_image_large?.url}&fit=clip&w=1440&q=85 1440w`,
                  `${data.about_left_image_large?.url}&fit=clip&w=1920&q=85 1920w`,
                ].join(", ")}
                sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                width={data.about_left_image_large?.dimensions?.width || 1440}
                height={data.about_left_image_large?.dimensions?.height || 810}
                loading="lazy"
                decoding="async"
                className="lazy"
              />
            </figure>
          </div>
          <div className="st-xl-9 st-xs-10 st-grid grid-row grid-between">
            <p className="f-60 CopyLight">{data.about_right_heading}</p>
            <div className="st-xl-os-3 st-sm-os-0 sm-top-2">
              <p className="f-20 paragraph-offset">
                <PrismicRichText
                  field={data.about_right_paragraph}
                  components={{
                    paragraph: ({ children }) => <span>{children}</span>,
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
