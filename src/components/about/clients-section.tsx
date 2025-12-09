interface AboutClientsProps {
  data: import("@prismicio/client").Content.AboutDocumentData;
}

export default function AboutClientsSection({ data }: AboutClientsProps) {
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
                <img
                  alt={item.client_logo?.alt ?? ""}
                  src={`${item.client_logo?.url}&fit=clip&w=1920&q=85`}
                  srcSet={[
                    `${item.client_logo?.url}&fit=clip&w=768&q=85 768w`,
                    `${item.client_logo?.url}&fit=clip&w=1024&q=85 1024w`,
                    `${item.client_logo?.url}&fit=clip&w=1440&q=85 1440w`,
                    `${item.client_logo?.url}&fit=clip&w=1920&q=85 1920w`,
                  ].join(", ")}
                  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                  width={item.client_logo?.dimensions?.width || 1440}
                  height={item.client_logo?.dimensions?.height || 810}
                  loading="lazy"
                  decoding="async"
                  className="lazy"
                />
              )}
            </figure>
          ))}
      </div>
    </section>
  );
}
