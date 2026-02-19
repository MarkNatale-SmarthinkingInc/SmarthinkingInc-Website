import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface WorkDetailTestimonialsSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailTestimonialsSection({
  work,
}: WorkDetailTestimonialsSectionProps) {
  if(!isFilled.richText(work?.data.testimonial_quote)) return null
  return (
    <section id="testimonials" className="xl-top-5 xs-top-6">
      <div className="st-grid grid-margin xs-wrap">
        <div className="st-xl-7 st-xl-os-1 st-xs-16">
          <h2 className="f-100">
            Word <span className="Brown">on Street</span>
          </h2>
        </div>
        <div className="st-xl-8 st-xl-os-1 st-xs-16 xs-top-6">
          <div className="f-32 split words">
            <PrismicRichText
              field={work?.data?.testimonial_quote}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
                strong: ({ children }) => <strong>{children}</strong>,
                em: ({ children }) => <em>{children}</em>,
              }}
            />
          </div>
          <div className="client-name self-end">
            <div className="sup-title">
              {work?.data?.testimonial_client_name}
            </div>
            <span className="f-20">{work?.data?.testimonial_client_title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
