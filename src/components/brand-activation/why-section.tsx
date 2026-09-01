import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

/**
 * WHY BRAND ACTIVATION — dark band carrying the generative mark above the
 * title, matching the Brand Foundation treatment.
 */
interface WhySectionProps {
  /** The page's Prismic document, or null when it has not been created yet. */
  page?: Content.ServiceSubpageDocument | null;
}

export default function WhySection({ page }: WhySectionProps) {
  // Falls back to the copy below whenever the field is empty.
  const copy = page?.data.why_copy;

  return (
    <section id="ba-why" className="BgDark">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-18 center">
            <figure className="subpage-mark">
              <img
                src="/img/services-new/brand-activation.svg"
                alt=""
                width={578}
                height={578}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-120 upper why-title">
              <span className="Brown">Why</span> Brand
              <br />
              Activation
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
                    <p className="f-20 Title White">{children}</p>
                  ),
                }}
              />
            ) : (
              <>
              <p className="f-20 Title White">
                As your initiatives are deployed in target markets, your position
                must be clearly articulated across all customer-facing artifacts
                to ensure consistent brand representation. This avoids stock
                expressions: launch materials that read like everyone else&rsquo;s,
                sales tools that don&rsquo;t close deals, and environmental
                graphics designed without operational realities in mind. This list
                goes on&hellip;
              </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
