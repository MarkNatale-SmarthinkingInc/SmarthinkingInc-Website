import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type BeliefSectionProps = {
  data: Content.AboutDocumentData;
};

export default function BeliefSection({ data }: BeliefSectionProps) {
  return (
    <section id="belief">
      <div className="piano-wrap">
        <canvas id="piano"></canvas>
        <h2 className="outline outline-white work-title center">
          {data.belief_title}
        </h2>
      </div>
      <div className="grid-margin">
        <div className="st-xl-6 st-xl-os-6 st-sm-10 st-sm-os-4 st-xs-16 st-xs-os-1 center f-20 xs-top-2 xl-top-1">
          <PrismicRichText
            field={data.belief_intro_paragraph}
            components={{ paragraph: ({ children }) => <p>{children}</p> }}
          />
        </div>
        <div className="diamonds center xs-both-5">
          <img src="/img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
          <img src="/img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
          <img src="/img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
        </div>
        <div className="st-xl-6 st-xl-os-6 st-xs-12 st-xs-os-3 center xl-bottom-1 xs-bottom-4">
          <h3 className="f-40 upper">{data.belief_subheading}</h3>
        </div>
      </div>
      <div className="circle-slider xl-bottom-5 xs-bottom-10 grid-margin">
        <div className="arc-path">
          <img src="/img/about/circle-text.svg" alt="Circle text" />
        </div>
        <div className="st-xl-6 st-xl-os-6 st-sm-8 st-sm-os-5 st-xs-12 st-xs-os-3 slider-img">
          {data.belief_slider_images?.map((item) => (
            <figure key={`belief-img-${item.image?.alt || "image"}`}>
              <PrismicNextImage field={item.image} />
            </figure>
          ))}
        </div>
        <div className="st-xl-6 st-xl-os-6 st-lg-8 st-lg-os-5 st-xs-16 st-xs-os-1 center circle-copy">
          <div className="f-24">
            <PrismicRichText
              field={data.belief_bottom_paragraph}
              components={{ paragraph: ({ children }) => <p>{children}</p> }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
