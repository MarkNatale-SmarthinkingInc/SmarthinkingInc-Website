import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type HeroSectionProps = {
  data: Content.WorksDocumentData;
};

export default async function HeroSection({ data }: HeroSectionProps) {
  const fullYear = new Date().getFullYear();
  const client = createClient();
  const works = await client.getAllByType("work");

  return (
    <section id="hero" className="grid-margin xl-bottom-2 xs-bottom-3">
      <div className="st-grid">
        <div className="st-xl-3 fadeUp">
          <p className="caption">({works.length})</p>
        </div>
        <div className="st-xl-12 center">
          <h1 className="f-140 upper hero-split chars">
            <PrismicRichText
              field={data.hero_title}
              components={{
                paragraph: ({ children }) => <span>{children}</span>,
                strong: ({ children }) => (
                  <span className="Brown">{children}</span>
                ),
              }}
            />
          </h1>
        </div>
        <div className="st-xl-3 st-xl-os-4 st-sm-5 st-sm-os-1 st-xs-os-0 right fadeUp">
          <a href="/contact" className="hero-contact caption st-grid grid-end">
            <img
              src="/img/svg/hero-cta-icon.svg"
              alt="Red arrow pointing to right"
            />
            <span>Contact us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
