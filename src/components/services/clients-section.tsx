import { PrismicNextImage } from "@prismicio/next";

interface ServicesClientsProps {
  data: import("@prismicio/client").Content.ServicesDocumentData;
}

export default function ServicesClientsSection({ data }: ServicesClientsProps) {
  const logos = data.client_logos;

  return (
    <section id="clients">
      <div className="client-row st-grid xs-wrap grid-between">
        {logos &&
          logos.length > 0 &&
          logos.map((item) => (
            <figure
              key={`client-logo-${item.client_name || item.client_logo?.url}`}
            >
              {item.client_logo?.url && (
                <PrismicNextImage field={item.client_logo} />
              )}
            </figure>
          ))}
      </div>
    </section>
  );
}
