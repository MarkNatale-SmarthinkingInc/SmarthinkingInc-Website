import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface ServiceDetailHeroSectionProps {
  service: Content.ServiceDocument;
}

export default function ServiceDetailHeroSection({
  service,
}: ServiceDetailHeroSectionProps) {
  return (
    <section id="hero">
      <div className="hero-title grid-margin center">
        {service.data.title && (
          <h1 className="sup-title">{service.data.title}</h1>
        )}
        <h2 className="st-xl-16 st-xl-os-1 f-120 upper">
          <PrismicRichText
            field={service.data.hero_title}
            components={{
              paragraph: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => (
                <span className="Brown">{children}</span>
              ),
              em: ({ children }) => <span className="italic">{children}</span>,
            }}
          />
        </h2>
      </div>
      <div className="string-canvas xs-top-4">
        <canvas className="string-lines grid80"></canvas>
        <div className="st-grid grid-margin hero-images xs-wrap">
          {isFilled.image(service.data.physical_image) && (
            <figure className="st-xl-6 self-end xs-self-start st-xs-9">
              <PrismicNextImage field={service.data.physical_image} />
            </figure>
          )}
          {isFilled.image(service.data.human_image) && (
            <figure className="st-xl-6 st-xs-9">
              <PrismicNextImage field={service.data.human_image} />
            </figure>
          )}
          {isFilled.image(service.data.digital_image) && (
            <figure className="st-xl-6 self-start st-xs-12">
              <PrismicNextImage field={service.data.digital_image} />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
