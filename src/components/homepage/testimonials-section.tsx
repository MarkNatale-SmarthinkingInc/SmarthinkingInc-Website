import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

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
                  <PrismicNextImage
                    key={`testimonial-image-${index}-${testimonial.testimonial_image}`}
                    field={testimonial.testimonial_image}
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
