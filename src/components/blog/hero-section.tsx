interface BlogHeroProps {
  data: import("@prismicio/client").Content.BlogDocumentData;
}

export default function BlogHeroSection({ data }: BlogHeroProps) {
  return (
    <section id="hero">
      <figure className="parallax">
        <img
          alt={data.hero_image?.alt ?? ""}
          src={`${data.hero_image?.url}&fit=clip&w=1920&q=85`}
          srcSet={[
            `${data.hero_image?.url}&fit=clip&w=768&q=85 768w`,
            `${data.hero_image?.url}&fit=clip&w=1024&q=85 1024w`,
            `${data.hero_image?.url}&fit=clip&w=1440&q=85 1440w`,
            `${data.hero_image?.url}&fit=clip&w=1920&q=85 1920w`,
          ].join(", ")}
          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
          width={data.hero_image?.dimensions?.width || 1440}
          height={data.hero_image?.dimensions?.height || 810}
          loading="eager"
          decoding="async"
          className="lazy"
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
