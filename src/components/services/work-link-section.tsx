import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface WorkLinkProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default function WorkLinkSection({ data }: WorkLinkProps) {
  return (
    <section id="work-link" className="BgDark">
      <h2 className="outline outline-white center">
        {data.work_link_title || "Work"}
      </h2>
      <div className="grid-margin">
        <div className="st-xl-8 st-xl-os-5 st-xs-16 st-xs-os-1 center">
          {data.work_link_description && (
            <p className="f-28 ">{data.work_link_description}</p>
          )}
          <div className="button-wrap xl-top-1">
            {data.work_link_button_link ? (
              <PrismicNextLink
                field={data.work_link_button_link}
                className="button button-white"
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
                        stroke="#721444"
                        strokeWidth="2"
                      />
                      <path
                        d="M17.8659 8.99999C16.1473 8.99999 13.7269 9.73748 13.7269 12.1982L13.726 12.1964C13.7478 12.5615 13.8325 13 13.8325 13H12.488C12.5395 12.2291 12.5759 11.6591 12.5975 10.7954C12.5843 8.84857 11.8099 8.92314 10.106 8.92314C10.0028 8.92314 9.9136 8.92137 9.83713 8.91802C9.48212 8.93841 3.43332 8.96573 2.86603 8.99999V6.99999C3.43005 7.03406 9.4768 7.06127 9.83097 7.08161C9.9088 7.07809 10 7.07622 10.106 7.07622C11.8086 7.07622 12.5832 6.65121 12.5974 4.70835C12.5759 4.34712 12.5394 3.77857 12.488 3H13.8325C13.8325 3 13.7482 3.45785 13.7264 3.82071L13.7269 3.81964C13.7269 6.27856 16.1474 6.99999 17.866 6.99999C17.866 7.37754 17.8659 8.85183 17.8659 8.99999Z"
                        fill="#721444"
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
                        stroke="#721444"
                        strokeWidth="2"
                      />
                      <path
                        d="M17.8659 8.99999C16.1473 8.99999 13.7269 9.73748 13.7269 12.1982L13.726 12.1964C13.7478 12.5615 13.8325 13 13.8325 13H12.488C12.5395 12.2291 12.5759 11.6591 12.5975 10.7954C12.5843 8.84857 11.8099 8.92314 10.106 8.92314C10.0028 8.92314 9.9136 8.92137 9.83713 8.91802C9.48212 8.93841 3.43332 8.96573 2.86603 8.99999V6.99999C3.43005 7.03406 9.4768 7.06127 9.83097 7.08161C9.9088 7.07809 10 7.07622 10.106 7.07622C11.8086 7.07622 12.5832 6.65121 12.5974 4.70835C12.5759 4.34712 12.5394 3.77857 12.488 3H13.8325C13.8325 3 13.7482 3.45785 13.7264 3.82071L13.7269 3.81964C13.7269 6.27856 16.1474 6.99999 17.866 6.99999C17.866 7.37754 17.8659 8.85183 17.8659 8.99999Z"
                        fill="#721444"
                      />
                    </svg>
                  </i>
                </div>
                <div className="label-wrap">
                  <span>{data.work_link_button_label || "View Our Work"}</span>
                  <span>{data.work_link_button_label || "View Our Work"}</span>
                </div>
              </PrismicNextLink>
            ) : null}
          </div>
        </div>
        <div className="st-grid st-xl-os-3 xl-top-2 st-xs-os-1 xs-top-4">
          <figure className="st-xl-3 st-xs-4 self-end">
            {data.work_link_image_left?.url ? (
              <PrismicNextImage
                field={data.work_link_image_left}
                className="lazy"
              />
            ) : null}
          </figure>
          <figure className="st-xl-6 st-xs-8">
            {data.work_link_image_center?.url ? (
              <PrismicNextImage
                field={data.work_link_image_center}
                className="lazy"
              />
            ) : null}
          </figure>
          <figure className="st-xl-3 st-xs-4 self-end">
            {data.work_link_image_right?.url ? (
              <PrismicNextImage
                field={data.work_link_image_right}
                className="lazy"
              />
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
