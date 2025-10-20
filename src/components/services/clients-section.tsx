import Image from "next/image";

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
                <Image
                  alt={item.client_logo?.alt ?? ""}
                  src={`${item.client_logo?.url}&fit=clip&w=1440`}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  blurDataURL={`${item.client_logo?.url}&w=100&blur=40`}
                  placeholder="blur"
                  width={item.client_logo?.dimensions?.width || 1440}
                  height={item.client_logo?.dimensions?.height || 810}
                  className="lazy"
                />
              )}
            </figure>
          ))}
      </div>
    </section>
  );
}
