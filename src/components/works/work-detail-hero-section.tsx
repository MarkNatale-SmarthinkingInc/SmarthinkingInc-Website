import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

interface WorkDetailHeroSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailHeroSection({
  work,
}: WorkDetailHeroSectionProps) {
  const attachedService = isFilled.contentRelationship(
    work?.data?.attached_service
  )
    ? work?.data?.attached_service
    : null;
  const otherServicesFromSlices = work?.data.slices
    .filter((slice) => slice.slice_type === "work_detail_category_block")
    .map(
      (slice) => (slice as Content.WorkDetailCategoryBlockSlice).primary.service
    )
    .filter(isFilled.contentRelationship)
    .filter((service) => service.id !== attachedService?.id);

  console.log(work?.data?.hero_image?.url);
  return (
    <section id="hero">
      <figure className="parallax">
        <Image
          alt={work?.data?.hero_image?.alt ?? ""}
          src={`${work?.data?.hero_image?.url}&fit=clip&w=1440`}
          sizes="(max-width: 768px) 100vw, 1440px"
          blurDataURL={`${work?.data?.hero_image?.url}&w=100&blur=40`}
          placeholder="blur"
          priority
          width={work?.data?.hero_image?.dimensions?.width || 1440}
          height={work?.data?.hero_image?.dimensions?.height || 810}
          className="lazy"
        />
      </figure>
      <div className="hero-captions grid-margin">
        <div className="st-grid">
          <div className="st-xl-3 xs-hidden fadeUp link-back">
            <PrismicNextLink href="/work" className="caption">
              <img src="/img/svg/icon-semi-arrow-white.svg" alt="Arrow icon" />
              <span>Back to projects</span>
            </PrismicNextLink>
          </div>
          <div className="st-xl-4 st-xl-os-4 st-xs-10 st-xs-os-4 center fadeUp">
            <ul className="caption">
              {attachedService && <li>{attachedService?.data?.title}</li>}
              {otherServicesFromSlices?.map((service) => (
                <li key={service.id}>{service.data?.title}</li>
              ))}
            </ul>
          </div>
          <div className="st-xl-3 st-xl-os-4 right xs-hidden fadeUp">
            <p className="caption">{work?.data?.location}</p>
          </div>
        </div>
      </div>
      <div className="hero-img-title grid-margin center">
        <i className="v-line"></i>
        <h1 className="f-180 upper hero-split chars">{work?.data?.title}</h1>
      </div>
      <div className="st-grid grid-margin hero-bottom">
        <div className="st-xl-8 st-xl-os-5 st-xs-16 st-xs-os-1 fadeUp">
          <div className="f-28 center">
            <PrismicRichText
              field={work?.data?.hero_description}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
