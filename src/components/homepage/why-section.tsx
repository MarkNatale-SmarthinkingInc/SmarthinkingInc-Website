import type { Content } from "@prismicio/client";

interface WhySectionProps {
  data: Content.HomepageDocumentData;
}

export default function WhySection({ data }: WhySectionProps) {
  return (
    <section id="why" className="xl-top-5 xs-top-1 BgDark White">
      <div className="grid-margin">
        <div className="st-xl-14 st-xl-os-2 center">
          {data.why_section_title && (
            <h2 className="caption">{data.why_section_title}</h2>
          )}
          <div className="diamonds">
            <img
              src="/img/svg/icon-diamond-white.svg"
              alt="White diamond icon"
            />
            <img
              src="/img/svg/icon-diamond-white.svg"
              alt="White diamond icon"
            />
            <img
              src="/img/svg/icon-diamond-white.svg"
              alt="White diamond icon"
            />
          </div>
          {data.why_description && (
            <p className="f-60 CopyLight split words">{data.why_description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
