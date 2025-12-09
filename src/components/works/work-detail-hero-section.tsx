import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

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
        <img
          alt={work?.data?.hero_image?.alt ?? ""}
          src={`${work?.data?.hero_image?.url}&fit=clip&w=1920&q=85`}
          srcSet={[
            `${work?.data?.hero_image?.url}&fit=clip&w=768&q=85 768w`,
            `${work?.data?.hero_image?.url}&fit=clip&w=1024&q=85 1024w`,
            `${work?.data?.hero_image?.url}&fit=clip&w=1440&q=85 1440w`,
            `${work?.data?.hero_image?.url}&fit=clip&w=1920&q=85 1920w`,
          ].join(", ")}
          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
          width={work?.data?.hero_image?.dimensions?.width || 1920}
          height={work?.data?.hero_image?.dimensions?.height || 1080}
          loading="eager"
          decoding="async"
          className="lazy"
        />
      </figure>
      <div className="hero-captions grid-margin">
        <div className="st-grid">
          <div className="st-xl-5 xs-hidden fadeUp link-back">
            <PrismicNextLink href="/work" className="caption">
              <img src="/img/svg/icon-semi-arrow-white.svg" alt="Arrow icon" />
              <span>Back to projects</span>
            </PrismicNextLink>
          </div>
          <div className="st-xl-4 st-xl-os-2 st-xs-10 st-xs-os-4 center fadeUp">
            <ul className="caption">
              {attachedService && <li>{attachedService?.data?.title}</li>}
              {otherServicesFromSlices?.map((service) => (
                <li key={service.id}>{service.data?.title}</li>
              ))}
            </ul>
          </div>
          <div className="st-xl-3 st-xl-os-4 st-sm-4 st-sm-os-3 st-xs-5 st-xs-os-2 right xs-hidden fadeUp">
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
