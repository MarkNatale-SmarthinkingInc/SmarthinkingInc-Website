import { PrismicNextImage } from "@prismicio/next";

interface BlogHeroProps {
  data: import("@prismicio/client").Content.BlogDocumentData;
}

export default function BlogHeroSection({ data }: BlogHeroProps) {
  return (
    <section id="hero">
      <figure className="parallax">
        <PrismicNextImage field={data.hero_image} />
      </figure>
      <div className="hero-img-title grid-margin center">
        <h1 className="st-xl-10 st-xl-os-4 f-180 upper hero-split chars">
          {data.hero_title}
        </h1>
      </div>
    </section>
  );
}
