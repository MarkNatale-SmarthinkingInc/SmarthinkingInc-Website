import { createClient } from "@/prismicio";
import { type Content, isFilled } from "@prismicio/client";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";

interface ServicesSectionProps {
  data: Content.HomepageDocumentData;
}

export default async function ServicesSection({ data }: ServicesSectionProps) {
  const client = createClient();
  const services = await client.getAllByType("service");
  return (
    <section id="services" className="grid-margin xl-top-5 xs-top-10">
      {data.services_section_title && (
        <h2 className="sup-title">{data.services_section_title}</h2>
      )}

      {data.services_intro_text && (
        <p className="f-60 CopyLight st-sm-15 st-xs-18">
          {data.services_intro_text}
        </p>
      )}

      <div className="st-grid xs-wrap xs-reverse">
        <div className="st-xl-9 st-xs-18 st-grid img-combo xs-wrap xs-self-start">
          {isFilled.image(data.services_image_small) && (
            <figure className="st-xl-3 st-xs-9 xl-self-start">
              <Image
                alt={data.services_image_small?.alt ?? ""}
                src={`${data.services_image_small?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${data.services_image_small?.url}&w=100&blur=40`}
                placeholder="blur"
                width={data.services_image_small?.dimensions?.width || 1440}
                height={data.services_image_small?.dimensions?.height || 810}
                className="lazy"
              />
            </figure>
          )}
          {isFilled.image(data.services_image_large) && (
            <figure className="st-xl-6 st-xs-9 xs-self-start">
              <Image
                alt={data.services_image_large?.alt ?? ""}
                src={`${data.services_image_large?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${data.services_image_large?.url}&w=100&blur=40`}
                placeholder="blur"
                width={data.services_image_large?.dimensions?.width || 1440}
                height={data.services_image_large?.dimensions?.height || 810}
                className="lazy"
              />
            </figure>
          )}
        </div>
        <div className="st-xl-9 st-xs-18 st-grid grid-row grid-between">
          {data.services_outro_text && (
            <p className="f-60 CopyLight">{data.services_outro_text}</p>
          )}
          <div className="st-xl-os-3 st-sm-os-0 sm-top-2 xs-top-4 xs-bottom-4">
            {services && services.length > 0 && (
              <ul className="f-20">
                {services.map((serviceItem, index) => {
                  return (
                    <li key={`service-${index}-${serviceItem.data.title}`}>
                      <PrismicNextLink document={serviceItem}>
                        <span>{serviceItem.data.title}</span>
                      </PrismicNextLink>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="arrow-link">
              <a href="/services" className="st-grid">
                <img
                  src="/img/svg/icon-semi-arrow-red.svg"
                  alt="Red arrow pointing to right"
                />
                <span>View All Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
