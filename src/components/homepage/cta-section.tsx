import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface CtaSectionProps {
  data: Content.HomepageDocumentData;
}

export default function CtaSection({ data }: CtaSectionProps) {
  return (
    <section id="cta">
      {isFilled.image(data.cta_background_image) && (
        <figure className="parallax">
          <PrismicNextImage
            field={data.cta_background_image}
            className="lazy"
          />
        </figure>
      )}
      <div className="st-xl-6 st-sm-10 st-xs-16 cta-content center">
        {isFilled.image(data.cta_inner_image) && (
          <figure className="parallax">
            <PrismicNextImage field={data.cta_inner_image} className="lazy" />
            {data.cta_caption && (
              <figcaption className="caption">{data.cta_caption}</figcaption>
            )}
          </figure>
        )}
        <h2 className="f-60">
          <PrismicRichText
            field={data.cta_heading}
            components={{
              paragraph: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => (
                <span className="Brown">{children}</span>
              ),
            }}
          />
        </h2>
        {data.cta_email && (
          <>
            <a className="f-24" href={`mailto:${data.cta_email}`}>
              {data.cta_email}
            </a>
            <br />
          </>
        )}
        {data.cta_phone && (
          <a className="f-24" href={`tel:${data.cta_phone.replace(/\./g, "")}`}>
            {data.cta_phone}
          </a>
        )}
      </div>
    </section>
  );
}
