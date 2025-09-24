interface ContactHeroProps {
  data: import("@prismicio/client").Content.ContactDocumentData;
}

export default function ContactHeroSection({ data }: ContactHeroProps) {
  return (
    <section id="hero" className="grid-margin">
      <h1 className="outline upper">{data.hero_title}</h1>
    </section>
  );
}
