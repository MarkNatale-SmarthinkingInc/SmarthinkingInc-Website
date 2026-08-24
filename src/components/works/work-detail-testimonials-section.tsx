import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface WorkDetailTestimonialsSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailTestimonialsSection({
  work,
}: WorkDetailTestimonialsSectionProps) {
  if(!isFilled.richText(work?.data.testimonial_quote)) return null

  const clientName = work?.data?.testimonial_client_name;
  const clientTitle = work?.data?.testimonial_client_title;
  const hasAttribution =
    isFilled.keyText(clientName) || isFilled.keyText(clientTitle);

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
          {/* Each line is optional on its own: the wrapper carries a ~16vw
              top margin, so rendering it for an unfilled name left a tall
              empty gap under the quote. */}
          {hasAttribution && (
            <div className="client-name self-end">
              {isFilled.keyText(clientName) && (
                <div className="sup-title">{clientName}</div>
              )}
              {isFilled.keyText(clientTitle) && (
                <span className="f-20">{clientTitle}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
