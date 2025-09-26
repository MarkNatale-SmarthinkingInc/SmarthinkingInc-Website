import { PrismicRichText } from "@prismicio/react";

interface ServicesTestimonialsProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default function ServicesTestimonialsSection({
  data,
}: ServicesTestimonialsProps) {
  const testimonials = data.testimonials;

  return (
    <section id="testimonial-box" className="grid-margin">
      <div className="st-grid xs-wrap xl-both-5 xs-both-10">
        <div className="st-xl-7 st-xl-os-1 st-xs-18 st-xs-os-0">
          <h2 className="f-100">
            <PrismicRichText
              field={data.testimonials_section_title}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
                strong: ({ children }) => (
                  <span className="Brown">{children}</span>
                ),
              }}
            />
          </h2>
        </div>
        <div className="st-xl-8 st-xl-os-1 st-xs-os-0 st-xs-18 st-xs-os-0">
          <div className="t-control">
            {(testimonials.length ? testimonials : [1, 2, 3])
              .slice(0, 3)
              .map((_, i) => (
                <button
                  type="button"
                  className={i === 0 ? "active" : undefined}
                  data-slide={i + 1}
                  key={`t-btn-${i + 1}`}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </button>
              ))}
          </div>
          {testimonials.length && (
            <div className="testimonial-wrap">
              {testimonials?.slice(0, 3).map((t, i) => (
                <div
                  data-t-item={i + 1}
                  className={i === 0 ? "active" : undefined}
                  key={`t-item-${i + 1}`}
                >
                  <p className="f-32 split words">{t?.quote}</p>
                  <div className="author">
                    <div className="f-18 upper CopyBold">{t?.author_name}</div>
                    {t?.author_title && (
                      <div className="f-18">{t.author_title}</div>
                    )}
                    {t?.author_company && (
                      <div className="f-18">{t.author_company}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
