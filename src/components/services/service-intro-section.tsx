import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";

interface ServiceIntroProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default function ServiceIntroSection({ data }: ServiceIntroProps) {
  return (
    <section id="service-intro" className="grid-margin">
      <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 offset-paragraph xl-top-4">
        {data.service_intro_title && (
          <h2 className="sup-title">{data.service_intro_title}</h2>
        )}
        {data.service_intro_heading && (
          <p className="f-60 CopyLight st-xl-16 st-sm-18">
            {data.service_intro_heading}
          </p>
        )}
      </div>
      <div className="st-grid xs-bottom-10">
        <div className="st-xl-7 st-xl-os-1 st-lg-6 st-sm-4 st-sm-os-0 xs-hidden xl-top-2 center">
          {data.service_intro_trademark_svg?.url ? (
            <Image
              alt={data.service_intro_trademark_svg?.alt ?? ""}
              src={`${data.service_intro_trademark_svg?.url}`}
              sizes="(max-width: 768px) 100vw, 1440px"
              width={
                data.service_intro_trademark_svg?.dimensions?.width || 1440
              }
              height={
                data.service_intro_trademark_svg?.dimensions?.height || 810
              }
              className="lazy"
            />
          ) : (
            <img
              src="/img/services/trademark.svg"
              alt="Trademark outline icon"
            />
          )}
        </div>
        <div className="st-xl-9 column-2 xl-top-2 st-lg-10 st-sm-14 st-xs-18 st-xs-os-0 xs-top-5">
          <figure>
            {data.service_intro_image?.url ? (
              <Image
                alt={data.service_intro_image?.alt ?? ""}
                src={`${data.service_intro_image?.url}&fit=clip&w=1440`}
                sizes="(max-width: 768px) 100vw, 1440px"
                blurDataURL={`${data.service_intro_image?.url}&w=100&blur=40`}
                placeholder="blur"
                width={data.service_intro_image?.dimensions?.width || 1440}
                height={data.service_intro_image?.dimensions?.height || 810}
                className="lazy"
              />
            ) : (
              <img
                className="lazy"
                src="/img/services/intro-img-prel.jpg"
                data-src="/img/services/intro-img@1x.jpg"
                data-src-big="/img/services/intro-img@2x.jpg"
                alt="Cozy wooden reception"
              />
            )}
          </figure>
          <p className="f-18">
            <PrismicRichText
              field={data.service_intro_paragraph_1}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </p>
          <p className="f-18">
            <PrismicRichText
              field={data.service_intro_paragraph_2}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
