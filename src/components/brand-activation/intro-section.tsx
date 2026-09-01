import { SubpageDotNav } from "@/components/services";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface IntroSectionProps {
  /** The page's Prismic document, or null when it has not been created yet. */
  page?: Content.ServiceSubpageDocument | null;
}

export default function IntroSection({ page }: IntroSectionProps) {
  // Falls back to the copy below whenever the field is empty.
  const lead = page?.data.intro_lead;

  return (
    <section id="ba-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <h2 className="upper subpage-eyebrow">Brand Activation</h2>
            <SubpageDotNav current="brand-activation" />
            {isFilled.richText(lead) ? (
              <PrismicRichText
                field={lead}
                components={{
                  paragraph: ({ children }) => (
                    <p className="f-40 Title subpage-lead">{children}</p>
                  ),
                  strong: ({ children }) => <strong>{children}</strong>,
                }}
              />
            ) : (
              <p className="f-40 Title subpage-lead">
              Once armed with a <strong>Brand Foundation</strong>, bring your
              collective brand expressions to life. Smarthinking Inc.&rsquo;s
              Symphonic Approach applies to every interaction, ensuring a
              compelling and consistent brand narrative globally.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
