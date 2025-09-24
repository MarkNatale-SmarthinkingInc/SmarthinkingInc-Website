import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface ServicesSectionProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default async function ServicesSection({ data }: ServicesSectionProps) {
  const sinceYear = data.services_since_year || "2011";
  const client = createClient();
  const services = await client.getAllByType("service");

  const columns: (typeof services)[] = [[], [], []];
  services.forEach((svc, index) => {
    columns[index % 3].push(svc);
  });
  const lags = [".1", ".2", ".3"] as const;

  return (
    <section id="services">
      <div id="circle-stage">
        <div className="stage-inner">
          <div className="circle-wrap">
            <img
              className="circle-shape circle-1"
              src="/img/services/circle-1.svg"
              alt="some label"
            />
            <img
              className="circle-shape circle-2"
              src="/img/services/circle-2.svg"
              alt="some label"
            />
            <img
              className="circle-shape circle-3"
              src="/img/services/circle-3.svg"
              alt="some label"
            />
          </div>
          <div className="circle-target">
            <img
              className="circle-center"
              src="/img/services/circle-center.svg"
              alt="some label"
            />
            <img
              className="circle-rotate"
              src="/img/services/circle-rotate-text.svg"
              alt="some label"
            />
          </div>
        </div>
      </div>

      <div className="service-listing string-canvas">
        <div className="canvas-wrap">
          <canvas className="string-lines canvas-fix grid18"></canvas>
        </div>
        <div className="service-grid">
          {columns.map((col, colIndex) => (
            <div
              className="service-col"
              data-lag={lags[colIndex]}
              key={`service-col-${lags[colIndex]}`}
            >
              {col.map((svc) => (
                <article className="st-xs-18" key={svc.id}>
                  <PrismicNextLink document={svc}>
                    <figure>
                      {svc.data.featured_image?.url ? (
                        <PrismicNextImage
                          field={svc.data.featured_image}
                          className="lazy"
                        />
                      ) : null}
                    </figure>
                    <h3 className="f-24">
                      {svc.data.title}
                      <img
                        src="/img/svg/icon-arrow-white.svg"
                        alt="White arrow icon pointing to right"
                      />
                    </h3>
                  </PrismicNextLink>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
