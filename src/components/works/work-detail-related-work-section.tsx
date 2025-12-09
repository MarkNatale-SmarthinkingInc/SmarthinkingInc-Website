import { createClient } from "@/prismicio";
import { type Content, filter } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface WorkDetailRelatedWorkSectionProps {
  work?: Content.WorkDocument;
}

export default async function WorkDetailRelatedWorkSection({
  work,
}: WorkDetailRelatedWorkSectionProps) {
  const client = createClient();
  const otherWorks = await client.getByType("work", {
    filters: [...(work?.id ? [filter.not("document.id", work.id)] : [])],
    pageSize: 2,
    fetchLinks: [
      "work.title",
      "work.attached_service",
      "work.homepage_image_1",
      "work.homepage_image_2",
    ],
  });

  if (otherWorks.results.length === 0) {
    return null;
  }

  return (
    <section id="work" className="grid-margin xl-top-4 xs-top-10">
      <div className="st-xl-8 st-xl-os-5 st-sm-12 st-sm-os-3 center">
        <h2 className="f-100">
          <span className="Brown">More</span> Projects
        </h2>
      </div>
      <div className="work-listing xl-top-2">
        {otherWorks.results.map((relatedWork, index) => (
          <article key={relatedWork.id} className="row-item">
            <canvas className="equalizer-canvas"></canvas>
            <PrismicNextLink document={relatedWork} className="st-grid">
              <figure className="st-xl-4 st-xs-9 img-left">
                <img
                  alt={relatedWork.data.homepage_image_1?.alt ?? ""}
                  src={`${relatedWork.data.homepage_image_1?.url}&fit=clip&w=1920&q=85`}
                  srcSet={[
                    `${relatedWork.data.homepage_image_1?.url}&fit=clip&w=768&q=85 768w`,
                    `${relatedWork.data.homepage_image_1?.url}&fit=clip&w=1024&q=85 1024w`,
                    `${relatedWork.data.homepage_image_1?.url}&fit=clip&w=1440&q=85 1440w`,
                    `${relatedWork.data.homepage_image_1?.url}&fit=clip&w=1920&q=85 1920w`,
                  ].join(", ")}
                  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                  width={
                    relatedWork.data.homepage_image_1?.dimensions?.width || 1440
                  }
                  height={
                    relatedWork.data.homepage_image_1?.dimensions?.height || 810
                  }
                  loading="lazy"
                  decoding="async"
                  className="lazy"
                />
              </figure>
              <div className="st-xl-10 st-xs-8 st-xs-os-1 center xs-left">
                <h1 className="f-40">{relatedWork.data.title}</h1>
                <i>
                  <img
                    src="/img/svg/icon-semi-arrow-red.svg"
                    alt="Red arrow pointing to right"
                  />
                </i>
              </div>
              <figure className="st-xl-4 xs-hidden img-right">
                <img
                  alt={relatedWork.data.homepage_image_2?.alt ?? ""}
                  src={`${relatedWork.data.homepage_image_2?.url}&fit=clip&w=1920&q=85`}
                  srcSet={[
                    `${relatedWork.data.homepage_image_2?.url}&fit=clip&w=768&q=85 768w`,
                    `${relatedWork.data.homepage_image_2?.url}&fit=clip&w=1024&q=85 1024w`,
                    `${relatedWork.data.homepage_image_2?.url}&fit=clip&w=1440&q=85 1440w`,
                    `${relatedWork.data.homepage_image_2?.url}&fit=clip&w=1920&q=85 1920w`,
                  ].join(", ")}
                  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                  width={
                    relatedWork.data.homepage_image_2?.dimensions?.width || 1440
                  }
                  height={
                    relatedWork.data.homepage_image_2?.dimensions?.height || 810
                  }
                  loading="lazy"
                  decoding="async"
                  className="lazy"
                />
              </figure>
            </PrismicNextLink>
          </article>
        ))}
      </div>
    </section>
  );
}
