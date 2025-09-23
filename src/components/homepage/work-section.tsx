import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface WorkSectionProps {
  data: Content.HomepageDocumentData;
}

export default function WorkSection({ data }: WorkSectionProps) {
  return (
    <section id="work" className="Top40 grid-margin">
      <div className="st-grid">
        <div className="st-xl-6 st-sm-5 xs-hidden">
          <h3 className="caption">Featured</h3>
        </div>
        <div className="st-xl-6 st-sm-8 st-xs-14 st-xs-os-2 center">
          {data.work_section_description && (
            <p className="f-32">{data.work_section_description}</p>
          )}
        </div>
        <div className="st-xl-6 st-sm-5 right xs-hidden">
          <h3 className="caption">Projects</h3>
        </div>
      </div>
      <h2 className="outline work-title center xl-top-5 xs-top-10">Work</h2>
      <div className="work-listing">
        {data.featured_projects?.map((project, index) => {
          const workItem = project.work_item;

          // Check if the work item is a valid document with data
          if (!isFilled.contentRelationship(workItem) || !workItem.data) {
            return null;
          }

          return (
            <article
              key={`project-${index}-${workItem.data.title || workItem.uid}`}
              className="row-item"
            >
              <canvas className="equalizer-canvas"></canvas>
              <PrismicNextLink field={workItem} className="st-grid">
                {isFilled.image(workItem.data.homepage_image_1) && (
                  <figure className="st-xl-4 st-xs-9 img-left">
                    <PrismicNextImage
                      field={workItem.data.homepage_image_1}
                      className="lazy"
                    />
                  </figure>
                )}
                <div className="st-xl-10 st-xs-8 st-xs-os-1 center xs-left">
                  <h1 className="f-40">{workItem.data.title}</h1>
                  <i>
                    <img
                      src="/img/svg/icon-semi-arrow-red.svg"
                      alt="Red arrow pointing to right"
                    />
                  </i>
                </div>
                {isFilled.image(workItem.data.homepage_image_2) && (
                  <figure className="st-xl-4 xs-hidden img-right">
                    <PrismicNextImage
                      field={workItem.data.homepage_image_2}
                      className="lazy"
                    />
                  </figure>
                )}
              </PrismicNextLink>
            </article>
          );
        })}
        <div className="center">
          <div className="arrow-link">
            <a href="/work" className="st-grid">
              <img
                src="/img/svg/icon-semi-arrow-red.svg"
                alt="Red arrow pointing to right"
              />
              <span>View All Work</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
