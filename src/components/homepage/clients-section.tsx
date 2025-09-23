import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

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
          }`}
        >
          {row.map((client, clientIndex) => {
            const globalIndex = rowIndex * clientsPerRow + clientIndex;
            return isFilled.image(client.client_logo) ? (
              <figure
                key={`client-${globalIndex}-${client.client_name || `logo-${globalIndex}`}`}
              >
                <PrismicNextImage field={client.client_logo} className="lazy" />
              </figure>
            ) : null;
          })}
        </div>
      ))}
    </section>
  );
}
