import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

interface WorkDetailCtaSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailCtaSection({
  work,
}: WorkDetailCtaSectionProps) {
  return (
    <section id="cta">
      <figure className="parallax">
        <PrismicNextImage
          field={work?.data?.cta_background_image}
          className="lazy"
        />
      </figure>
      <div className="st-xl-6 st-lg-8 st-sm-10 st-xs-16 cta-content center">
        <figure className="parallax">
          <PrismicNextImage
            field={work?.data?.cta_foreground_image}
            className="lazy"
          />
          <figcaption className="caption">Contact us</figcaption>
        </figure>
        <h2 className="f-60">
          It <span className="Brown">Begins</span> Here
        </h2>
        <a className="f-24" href={`mailto:${work?.data?.cta_email}`}>
          {work?.data?.cta_email}
        </a>
        <br />
        <a className="f-24" href={`tel:${work?.data?.cta_phone}`}>
          {work?.data?.cta_phone}
        </a>
      </div>
    </section>
  );
}
