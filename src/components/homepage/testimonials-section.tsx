import { type Content, isFilled } from "@prismicio/client";
interface TestimonialsSectionProps {
  data: Content.HomepageDocumentData;
}

export default function TestimonialsSection({
  data,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="xl-top-5 xs-top-10">
      <h2 className="f-200">
        <img
          className="rotate-img"
          src="/img/home/testimonial-title.svg"
          alt="Word on Street"
        />
        {data.testimonials_section_title && (
          <span className="White">{data.testimonials_section_title}</span>
        )}
      </h2>
      <div className="grid-margin">
        <div className="st-xl-8 st-xl-os-5 st-sm-10 st-sm-os-4 st-xs-16 st-xs-os-1">
          <div className="st-grid t-controls grid-middle">
            <div className="st-xl-1">
              <button type="button" className="arrow arrow-left">
                <img
                  src="/img/svg/icon-semi-arrow-white.svg"
                  alt="Arrow icon"
                />
              </button>
            </div>
            <figure className="st-xl-6 st-xl-os-1 st-sm-6 st-xs-8 t-image">
              {data.testimonials?.map((testimonial, index) =>
                isFilled.image(testimonial.testimonial_image) ? (
                  <img
                    key={`testimonial-image-${index}-${testimonial.testimonial_image}`}
                    alt={testimonial.testimonial_image?.alt ?? ""}
                    src={`${testimonial.testimonial_image?.url}&fit=clip&w=1920&q=85`}
                    srcSet={[
                      `${testimonial.testimonial_image?.url}&fit=clip&w=768&q=85 768w`,
                      `${testimonial.testimonial_image?.url}&fit=clip&w=1024&q=85 1024w`,
                      `${testimonial.testimonial_image?.url}&fit=clip&w=1440&q=85 1440w`,
                      `${testimonial.testimonial_image?.url}&fit=clip&w=1920&q=85 1920w`,
                    ].join(", ")}
                    sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                    width={
                      testimonial.testimonial_image?.dimensions?.width || 1440
                    }
                    height={
                      testimonial.testimonial_image?.dimensions?.height || 810
                    }
                    loading="lazy"
                    decoding="async"
                    className="lazy"
                  />
                ) : null
              )}
            </figure>
            <div className="st-xl-1 st-xl-os-1">
              <button type="button" className="arrow arrow-right">
                <img
                  src="/img/svg/icon-semi-arrow-white.svg"
                  alt="Arrow icon"
                />
              </button>
            </div>
          </div>
          <div className="t-content">
            {data.testimonials?.map((testimonial, index) => (
              <div
                key={`testimonial-${index}-${testimonial.author_name || `item-${index}`}`}
                className={`t-item ${index === 0 ? "active" : ""}`}
              >
                {testimonial.quote && (
                  <p className="f-28 center">{testimonial.quote}</p>
                )}
                <div className="author center">
                  {testimonial.author_name && (
                    <div className="upper Brown CopyBold">
                      {testimonial.author_name}
                    </div>
                  )}
                  {testimonial.author_title && (
                    <div className="f-20">{testimonial.author_title}</div>
                  )}
                  {testimonial.author_company && (
                    <div className="f-20">{testimonial.author_company}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
