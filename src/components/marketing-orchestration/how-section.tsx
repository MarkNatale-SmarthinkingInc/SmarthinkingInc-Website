import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

/**
 * HOW THIS WORKS — copy only. The circle podium belongs to Brand Activation;
 * this page's comp runs the heading and paragraph straight into Deliverables.
 */
interface HowSectionProps {
  /** The page's Prismic document, or null when it has not been created yet. */
  page?: Content.ServiceSubpageDocument | null;
}

export default function HowSection({ page }: HowSectionProps) {
  // Falls back to the copy below whenever the field is empty.
  const copy = page?.data.how_copy;

  return (
    <section id="mo-how">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-120 upper why-title">
              <span className="Brown">How</span> This Works
            </h2>
          </div>
        </div>
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-4 st-sm-18 st-sm-os-0 center">
            {isFilled.richText(copy) ? (
              <PrismicRichText
                field={copy}
                components={{
                  paragraph: ({ children }) => (
                    <p className="f-20 Title">{children}</p>
                  ),
                }}
              />
            ) : (
              <>
              <p className="f-20 Title">
                Marketing Orchestration produces a twelve-month Marketing
                Communications Strategy, including a discovery and audit, followed
                by a twelve-month execution plan that covers development,
                execution, management, and reporting across all initiatives. The
                result is a sustained marketing presence across the buyer&rsquo;s
                journey and a coordinated marketing system with performance
                metrics rooted in objective financial analytics.
              </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
