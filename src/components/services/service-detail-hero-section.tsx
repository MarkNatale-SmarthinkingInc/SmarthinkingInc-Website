import { type Content, isFilled } from "@prismicio/client";
import Image from "next/image";
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
          <h1 className="sup-title fadeUp">{service.data.title}</h1>
        )}
        <h2 className="st-xl-16 st-xl-os-1 f-120 upper hero-split chars">
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
        <canvas className="string-lines grid80 fadeIn"></canvas>
        <div className="st-grid grid-margin hero-images xs-wrap">
          {isFilled.image(service.data.physical_image) && (
            <figure className="st-xl-6 self-end xs-self-start st-xs-9 imgIn">
              <Image
                alt={service.data.physical_image?.alt ?? ""}
                src={`${service.data.physical_image?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${service.data.physical_image?.url}&w=100&blur=40`}
                placeholder="blur"
                width={service.data.physical_image?.dimensions?.width || 1440}
                height={service.data.physical_image?.dimensions?.height || 810}
                className="lazy"
                priority
              />
            </figure>
          )}
          {isFilled.image(service.data.human_image) && (
            <figure className="st-xl-6 st-xs-9 imgIn">
              <Image
                alt={service.data.human_image?.alt ?? ""}
                src={`${service.data.human_image?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${service.data.human_image?.url}&w=100&blur=40`}
                placeholder="blur"
                width={service.data.human_image?.dimensions?.width || 1440}
                height={service.data.human_image?.dimensions?.height || 810}
                className="lazy"
                priority
              />
            </figure>
          )}
          {isFilled.image(service.data.digital_image) && (
            <figure className="st-xl-6 self-start st-xs-12 imgIn">
              <Image
                alt={service.data.digital_image?.alt ?? ""}
                src={`${service.data.digital_image?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${service.data.digital_image?.url}&w=100&blur=40`}
                placeholder="blur"
                width={service.data.digital_image?.dimensions?.width || 1440}
                height={service.data.digital_image?.dimensions?.height || 810}
                className="lazy"
                priority
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
