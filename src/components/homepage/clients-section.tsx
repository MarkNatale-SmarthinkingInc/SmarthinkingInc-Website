import { type Content, isFilled } from "@prismicio/client";
import Image from "next/image";

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
                <Image
                  alt={client.client_logo?.alt ?? ""}
                  src={`${client.client_logo?.url}&fit=clip&w=1440`}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  blurDataURL={`${client.client_logo?.url}&w=100&blur=40`}
                  placeholder="blur"
                  width={client.client_logo?.dimensions?.width || 1440}
                  height={client.client_logo?.dimensions?.height || 810}
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
