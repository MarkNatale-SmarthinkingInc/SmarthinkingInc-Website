import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface WhySectionProps {
  /** The page's Prismic document, or null when it has not been created yet. */
  page?: Content.ServiceSubpageDocument | null;
}

export default function WhySection({ page }: WhySectionProps) {
  // Falls back to the copy below whenever the field is empty.
  const copy = page?.data.why_copy;

  return (
    <section id="bf-why">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-120 upper why-title">
              <span className="Brown">Why</span> Brand
              <br />
              Foundation
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
              <p className="f-20 Title">
              Too often, we see brands design for the sake of design. A
              beautification project for no other reason. A brand&rsquo;s true
              potential is far more than simple aesthetics. It&rsquo;s a living,
              breathing experience that your team must execute each day, with
              far-reaching effects not only on marketing but also on human
              resources efforts and P&amp;L responsibility.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
