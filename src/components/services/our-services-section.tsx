import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import LabelledCopySection from "./labelled-copy-section";

/** The copy the page shipped with, used until the Prismic field is filled. */
const FALLBACK = [
  "Building truly remarkable brands is about much more than a slick logo and a memorable tagline. It’s about creating living, breathing experiences that consistently immerse the customer in a story.",
  "Successful brands strategically integrate images, words, products, services, people, and spaces to create an experience for the customer.",
];

interface OurServicesSectionProps {
  data?: Content.ServicesDocumentData;
}

export default function OurServicesSection({ data }: OurServicesSectionProps) {
  const copy = data?.our_services_copy;

  return (
    <LabelledCopySection id="our-services" label="Our Services">
      {isFilled.richText(copy) ? (
        <PrismicRichText
          field={copy}
          components={{
            paragraph: ({ children }) => (
              <p className="f-20 Title">{children}</p>
            ),
            strong: ({ children }) => <strong>{children}</strong>,
          }}
        />
      ) : (
        <>
          {FALLBACK.map((para) => (
            <p className="f-20 Title" key={para.slice(0, 32)}>
              {para}
            </p>
          ))}
          {/* The third paragraph carries inline emphasis, so it is written out
              rather than sitting in the plain-string fallback above. */}
          <p className="f-20 Title">
            Smarthinking Inc.&rsquo;s <strong>Symphonic Approach</strong>{" "}
            ensures your brand building is an orchestrated effort creating a
            remarkable and immersive brand.
          </p>
        </>
      )}
    </LabelledCopySection>
  );
}
