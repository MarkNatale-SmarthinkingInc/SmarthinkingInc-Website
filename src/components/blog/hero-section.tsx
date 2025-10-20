import Image from "next/image";

interface BlogHeroProps {
  data: import("@prismicio/client").Content.BlogDocumentData;
}

export default function BlogHeroSection({ data }: BlogHeroProps) {
  return (
    <section id="hero">
      <figure className="parallax">
        <Image
          alt={data.hero_image?.alt ?? ""}
          src={`${data.hero_image?.url}&fit=clip&w=1440`}
          sizes="(max-width: 768px) 100vw, 1440px"
          blurDataURL={`${data.hero_image?.url}&w=100&blur=40`}
          placeholder="blur"
          width={data.hero_image?.dimensions?.width || 1440}
          height={data.hero_image?.dimensions?.height || 810}
          className="lazy"
          priority
        />
      </figure>
      <div className="hero-img-title grid-margin center">
        <h1 className="st-xl-10 st-xl-os-4 st-xs-16 st-xs-os-1 f-180 upper hero-split chars">
          {data.hero_title}
        </h1>
      </div>
    </section>
  );
}
