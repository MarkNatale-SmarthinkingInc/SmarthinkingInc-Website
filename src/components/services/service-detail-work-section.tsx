import { createClient } from "@/prismicio";
import { type Content, filter } from "@prismicio/client";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";

interface ServiceDetailWorkSectionProps {
  service: Content.ServiceDocument;
}

export default async function ServiceDetailWorkSection({
  service,
}: ServiceDetailWorkSectionProps) {
  const client = createClient();

  // Get work items to display
  const workItems = await client.getAllByType("work", {
    fetchLinks: ["work.title", "work.featured_image"],
    filters: [filter.at("my.work.attached_service", service.id)],
    limit: 2,
  });

  if (!workItems.length) return null;

  return (
    <section id="work" className="grid-margin xl-top-4 xs-top-10">
      <div className="st-xl-8 st-xl-os-5 st-sm-12 st-sm-os-3 center">
        <h2 className="f-100">
          <span className="Brown">{service.data.title}</span>
          <br />
          Projects
        </h2>
      </div>
      <div className="work-listing xl-top-2">
        {workItems.map((work: Content.WorkDocument, index: number) => {
          return (
            <article key={`work-${index}-${work.uid}`} className="row-item">
              <canvas className="equalizer-canvas"></canvas>
              <PrismicNextLink document={work} className="st-grid">
                <figure className="st-xl-4 st-xs-9 img-left">
                  <Image
                    alt={work.data.homepage_image_1?.alt ?? ""}
                    src={`${work.data.homepage_image_1?.url}&fit=clip&w=1440`}
                    sizes="(max-width: 768px) 100vw, 1440px"
                    blurDataURL={`${work.data.homepage_image_1?.url}&w=100&blur=40`}
                    placeholder="blur"
                    width={
                      work.data.homepage_image_1?.dimensions?.width || 1440
                    }
                    height={
                      work.data.homepage_image_1?.dimensions?.height || 810
                    }
                    className="lazy"
                  />
                </figure>
                <div className="st-xl-10 st-xs-8 st-xs-os-1 center xs-left">
                  <h1 className="f-40">{work.data.title}</h1>
                  <i>
                    <img
                      src="/img/svg/icon-semi-arrow-red.svg"
                      alt="Red arrow pointing to right"
                    />
                  </i>
                </div>
                <figure className="st-xl-4 xs-hidden img-right">
                  <Image
                    alt={work.data.homepage_image_2?.alt ?? ""}
                    src={`${work.data.homepage_image_2?.url}&fit=clip&w=1440`}
                    sizes="(max-width: 768px) 100vw, 1440px"
                    blurDataURL={`${work.data.homepage_image_2?.url}&w=100&blur=40`}
                    placeholder="blur"
                    width={
                      work.data.homepage_image_2?.dimensions?.width || 1440
                    }
                    height={
                      work.data.homepage_image_2?.dimensions?.height || 810
                    }
                    className="lazy"
                  />
                </figure>
              </PrismicNextLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
