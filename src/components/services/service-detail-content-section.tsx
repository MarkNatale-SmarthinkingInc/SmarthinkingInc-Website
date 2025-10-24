import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface ServiceDetailContentSectionProps {
  service: Content.ServiceDocument;
}

export default function ServiceDetailContentSection({
  service,
}: ServiceDetailContentSectionProps) {
  return (
    <section id="service-content" className="grid-margin">
      <div className="st-xl-16 st-xl-os-1 st-xs-18 st-xs-os-0">
        <div className="offset-paragraph xl-top-5 xs-both-6">
          {service.data.thinking_title && (
            <h2 className="sup-title">{service.data.thinking_title}</h2>
          )}
          <p className="f-60 CopyLight st-xl-16 st-xs-18">
            <PrismicRichText
              field={service.data.thinking_description}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
                strong: ({ children }) => <strong>{children}</strong>,
                em: ({ children }) => <em>{children}</em>,
              }}
            />
          </p>
        </div>
        <div className="service-list">
          {service.data.service_items?.map((item, index) => {
            if (!item.title) return null;

            return (
              <article key={item.title} className="st-grid">
                <div className="st-xl-3">
                  <span className="f-180 outline">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="st-xl-7 st-xl-os-6 st-sm-9 st-sm-os-4 st-xs-13 st-xs-os-2">
                  <h3 className="sup-title">{item.title}</h3>
                  {item.description && (
                    <p className="f-18">{item.description}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="st-xl-os-9 st-sm-os-7 service-contact xl-top-2 xl-bottom-5 st-xs-13 st-xs-os-5 xs-bottom-10">
          {service.data.contact_text && (
            <p className="f-32">{service.data.contact_text}</p>
          )}
          <div className="button-wrap">
            <PrismicNextLink
              href="/contact"
              className="button"
              aria-label="Go to contact form"
            >
              <div className="main-bg"></div>
              <div className="icon">
                <i>
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>arrow</title>
                    <path
                      d="M1 0.000488281V6.00049C1 7.10506 1.89543 8.00049 3 8.00049H17"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.8659 8.99999C16.1473 8.99999 13.7269 9.73748 13.7269 12.1982L13.726 12.1964C13.7478 12.5615 13.8325 13 13.8325 13H12.488C12.5395 12.2291 12.5759 11.6591 12.5975 10.7954C12.5843 8.84857 11.8099 8.92314 10.106 8.92314C10.0028 8.92314 9.9136 8.92137 9.83713 8.91802C9.48212 8.93841 3.43332 8.96573 2.86603 8.99999V6.99999C3.43005 7.03406 9.4768 7.06127 9.83097 7.08161C9.9088 7.07809 10 7.07622 10.106 7.07622C11.8086 7.07622 12.5832 6.65121 12.5974 4.70835C12.5759 4.34712 12.5394 3.77857 12.488 3H13.8325C13.8325 3 13.7482 3.45785 13.7264 3.82071L13.7269 3.81964C13.7269 6.27856 16.1474 6.99999 17.866 6.99999C17.866 7.37754 17.8659 8.85183 17.8659 8.99999Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>arrow</title>
                    <path
                      d="M1 0.000488281V6.00049C1 7.10506 1.89543 8.00049 3 8.00049H17"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.8659 8.99999C16.1473 8.99999 13.7269 9.73748 13.7269 12.1982L13.726 12.1964C13.7478 12.5615 13.8325 13 13.8325 13H12.488C12.5395 12.2291 12.5759 11.6591 12.5975 10.7954C12.5843 8.84857 11.8099 8.92314 10.106 8.92314C10.0028 8.92314 9.9136 8.92137 9.83713 8.91802C9.48212 8.93841 3.43332 8.96573 2.86603 8.99999V6.99999C3.43005 7.03406 9.4768 7.06127 9.83097 7.08161C9.9088 7.07809 10 7.07622 10.106 7.07622C11.8086 7.07622 12.5832 6.65121 12.5974 4.70835C12.5759 4.34712 12.5394 3.77857 12.488 3H13.8325C13.8325 3 13.7482 3.45785 13.7264 3.82071L13.7269 3.81964C13.7269 6.27856 16.1474 6.99999 17.866 6.99999C17.866 7.37754 17.8659 8.85183 17.8659 8.99999Z"
                      fill="white"
                    />
                  </svg>
                </i>
              </div>
              <div className="label-wrap">
                <span>Contact Us</span>
                <span>Contact Us</span>
              </div>
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
