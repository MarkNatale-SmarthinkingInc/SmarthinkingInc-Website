import type { Content } from "@prismicio/client";

type ManifestoSectionProps = {
  data: Content.AboutDocumentData;
};

export default function ManifestoSection({ data }: ManifestoSectionProps) {
  return (
    <section id="manifesto" className="bg-dark">
      <div className="grid-margin">
        <h2 className="sup-title">{data.manifesto_title}</h2>
      </div>
      <div className="m-list">
        {data.manifesto_items?.map((item, index) => (
          <div
            key={`m-item-${item.label}-${index}`}
            className="m-list-item st-grid"
          >
            <div className="stripe-bg"></div>
            <div className="st-xl-1 st-xl-os-8 st-xs-4 st-xs-os-0">
              <span className="f-32">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="st-xl-7 st-xl-os-1 st-xs-12 st-xs-os-1">
              <p className="f-24 stripe-label">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
