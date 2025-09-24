import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

type BeliefSectionProps = {
  data: Content.AboutDocumentData;
};

export default function BeliefSection({ data }: BeliefSectionProps) {
  return (
    <section id="belief" className="xs-top-2">
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
          <img src="../img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
          <img src="../img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
          <img src="../img/svg/icon-diamond-red.svg" alt="Red diamond icon" />
        </div>
        <div className="st-xl-6 st-xl-os-6 st-xs-12 st-xs-os-3 center xl-bottom-1 xs-bottom-4">
          <h3 className="f-40 upper">{data.belief_subheading}</h3>
        </div>
      </div>
      <div className="circle-slider xl-bottom-5 xs-bottom-10 grid-margin">
        <div className="arc-path">
          <svg
            viewBox="0 0 1906 1905"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="beliefArcTitle"
          >
            <title id="beliefArcTitle">Belief circular slider arc path</title>
            <defs>
              <path
                id="path"
                d="M189.173 1209.28C47.4479 787.164 274.534 330.013 696.383 188.2C1118.23 46.3861 1575.1 273.613 1716.83 695.724C1858.55 1117.84 1631.47 1574.99 1209.62 1716.8C787.767 1858.61 330.899 1631.39 189.173 1209.28Z"
                fill="none"
              />
            </defs>
            <text wordSpacing="100">
              <textPath className="circle-text" href="#path">
                {data.belief_circle_words?.map((item) => (
                  <tspan key={`belief-word-${item.word}`}>{item.word}</tspan>
                ))}
              </textPath>
            </text>
          </svg>
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
