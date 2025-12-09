import { type Content, isFilled } from "@prismicio/client";
interface ClientsSectionProps {
  data: Content.HomepageDocumentData;
}

export default function ClientsSection({ data }: ClientsSectionProps) {
  // Group clients into rows of 6 for proper layout
  const clientsPerRow = 6;
  const clientRows: Array<
    Array<typeof data.client_logos extends Array<infer T> ? T : never>
  > = [];

  if (data.client_logos) {
    for (let i = 0; i < data.client_logos.length; i += clientsPerRow) {
      clientRows.push(data.client_logos.slice(i, i + clientsPerRow));
    }
  }

  return (
    <section id="clients" className="xl-top-3 xs-top-8">
      {clientRows.map((row, rowIndex) => (
        <div
          key={`client-row-${rowIndex}-${row.length}`}
          className={`client-row st-grid sm-wrap grid-between ${
            rowIndex >= 2 ? "xs-hidden" : ""
          }
          ${rowIndex % 2 ? "client-row-right" : ""}
          `}
          data-direction={rowIndex % 2 ? "-1" : "1"}
        >
          {row.map((client, clientIndex) => {
            const globalIndex = rowIndex * clientsPerRow + clientIndex;
            return isFilled.image(client.client_logo) ? (
              <figure
                className="st-xl-4 st-xs-6"
                key={`client-${globalIndex}-${client.client_name || `logo-${globalIndex}`}`}
              >
                <img
                  alt={client.client_logo?.alt ?? ""}
                  src={`${client.client_logo?.url}&fit=clip&w=1920&q=85`}
                  srcSet={[
                    `${client.client_logo?.url}&fit=clip&w=768&q=85 768w`,
                    `${client.client_logo?.url}&fit=clip&w=1024&q=85 1024w`,
                    `${client.client_logo?.url}&fit=clip&w=1440&q=85 1440w`,
                    `${client.client_logo?.url}&fit=clip&w=1920&q=85 1920w`,
                  ].join(", ")}
                  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                  width={client.client_logo?.dimensions?.width || 1440}
                  height={client.client_logo?.dimensions?.height || 810}
                  loading="lazy"
                  decoding="async"
                  className="lazy"
                />
              </figure>
            ) : null;
          })}
        </div>
      ))}
    </section>
  );
}
