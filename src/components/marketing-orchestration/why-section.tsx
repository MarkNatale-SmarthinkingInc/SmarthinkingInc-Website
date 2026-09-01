import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

/**
 * WHY MARKETING ORCHESTRATION — dark band. Two body paragraphs here, where the
 * other two subpages run one.
 */
interface WhySectionProps {
  /** The page's Prismic document, or null when it has not been created yet. */
  page?: Content.ServiceSubpageDocument | null;
}

export default function WhySection({ page }: WhySectionProps) {
  // Falls back to the copy below whenever the field is empty.
  const copy = page?.data.why_copy;

  return (
    <section id="mo-why" className="BgDark">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-18 center">
            <figure className="subpage-mark">
              <img
                src="/img/services-new/marketing-orchestration.svg"
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
              <span className="Brown">Why</span> Marketing
              <br />
              Orchestration
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
                Working within remarkable properties is a high-demand endeavor for
                property teams. We know this because we have done this. Like you,
                we have stood toe-to-toe with the guest. We know that you often
                interface directly with guests, residents, and members, doing
                whatever it takes to operate a first-class property.
              </p>
              <p className="f-20 Title White mo-why-second">
                Sometimes you need additional assistance to properly orchestrate
                the marketing required to reach your potential. Whether
                that&rsquo;s for headcount or the distance required for an
                objective perspective, Smarthinking Inc. has the solution.
                Marketing Orchestration provides a focused, dynamic effort that
                results in effective marketing rooted in ROI, not simply in
                completing tasks.
              </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
