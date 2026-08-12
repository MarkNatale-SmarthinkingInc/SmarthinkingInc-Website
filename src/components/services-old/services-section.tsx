import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

interface ServicesSectionProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default async function ServicesSection({ }: ServicesSectionProps) {
  const client = createClient();
  const services = await client.getAllByType("service", {
    orderings: [
      {
        field: "my.service.order",
        direction: "asc",
      },
    ],
  });

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
                        <img
                          alt={svc.data.featured_image?.alt ?? ""}
                          src={`${svc.data.featured_image?.url}&fit=clip&w=1920&q=85`}
                          srcSet={[
                            `${svc.data.featured_image?.url}&fit=clip&w=768&q=85 768w`,
                            `${svc.data.featured_image?.url}&fit=clip&w=1024&q=85 1024w`,
                            `${svc.data.featured_image?.url}&fit=clip&w=1440&q=85 1440w`,
                            `${svc.data.featured_image?.url}&fit=clip&w=1920&q=85 1920w`,
                          ].join(", ")}
                          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                          width={
                            svc.data.featured_image?.dimensions?.width || 1440
                          }
                          height={
                            svc.data.featured_image?.dimensions?.height || 810
                          }
                          loading="lazy"
                          decoding="async"
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
