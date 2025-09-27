import { createClient } from "@/prismicio";
import { type Content, filter } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

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
                <PrismicNextImage
                  field={relatedWork.data.homepage_image_1}
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
                <PrismicNextImage
                  field={relatedWork.data.homepage_image_2}
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
