import { type Content, type EmbedField, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

/**
 * Extract video ID from Prismic embed field
 * Tries video_id property first, falls back to parsing the html string
 */
function getVideoIdFromEmbed(embed: EmbedField): string | null {
  if (!embed) return null;
  if (embed.video_id) return String(embed.video_id);
  const html = embed.html ?? "";
  const match = html.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

interface ServiceDetailHeroSectionProps {
  service: Content.ServiceDocument;
}

export default function ServiceDetailHeroSection({
  service,
}: ServiceDetailHeroSectionProps) {
  return (
    <section id="hero">
      <div className="hero-title grid-margin center">
        {service.data.title && (
          <h1 className="sup-title fadeUp">{service.data.title}</h1>
        )}
        <h2 className="st-xl-16 st-xl-os-1 f-120 upper hero-split chars">
          <PrismicRichText
            field={service.data.hero_title}
            components={{
              paragraph: ({ children }) => <span>{children}</span>,
              strong: ({ children }) => (
                <span className="Brown">{children}</span>
              ),
              em: ({ children }) => <span className="italic">{children}</span>,
            }}
          />
        </h2>
      </div>
      <div className="string-canvas xs-top-4">
        <canvas className="string-lines grid80 fadeIn"></canvas>
        <div className="st-grid grid-margin hero-images xs-wrap">
          {isFilled.embed(service.data.left_video) ? (
            <figure className="st-xl-6 self-end xs-self-start st-xs-9 imgIn">
              <div
                className="video-embed"
                style={{ aspectRatio: 16 / 9, backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <iframe
                  src={`https://player.vimeo.com/video/${getVideoIdFromEmbed(service.data.left_video)}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Background video"
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>
            </figure>
          ) : isFilled.image(service.data.physical_image) && (
            <figure className="st-xl-6 self-end xs-self-start st-xs-9 imgIn">
              <img
                alt={service.data.physical_image?.alt ?? ""}
                src={`${service.data.physical_image?.url}&fit=clip&w=1920&q=85`}
                srcSet={[
                  `${service.data.physical_image?.url}&fit=clip&w=768&q=85 768w`,
                  `${service.data.physical_image?.url}&fit=clip&w=1024&q=85 1024w`,
                  `${service.data.physical_image?.url}&fit=clip&w=1440&q=85 1440w`,
                  `${service.data.physical_image?.url}&fit=clip&w=1920&q=85 1920w`,
                ].join(", ")}
                sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                width={service.data.physical_image?.dimensions?.width || 1440}
                height={service.data.physical_image?.dimensions?.height || 810}
                loading="eager"
                decoding="async"
                className="lazy"
              />
            </figure>
          )}
          {isFilled.image(service.data.human_image) && (
            <figure className="st-xl-6 st-xs-9 imgIn">
              <img
                alt={service.data.human_image?.alt ?? ""}
                src={`${service.data.human_image?.url}&fit=clip&w=1920&q=85`}
                srcSet={[
                  `${service.data.human_image?.url}&fit=clip&w=768&q=85 768w`,
                  `${service.data.human_image?.url}&fit=clip&w=1024&q=85 1024w`,
                  `${service.data.human_image?.url}&fit=clip&w=1440&q=85 1440w`,
                  `${service.data.human_image?.url}&fit=clip&w=1920&q=85 1920w`,
                ].join(", ")}
                sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                width={service.data.human_image?.dimensions?.width || 1440}
                height={service.data.human_image?.dimensions?.height || 810}
                loading="eager"
                decoding="async"
                className="lazy"
              />
            </figure>
          )}
          {isFilled.embed(service.data.right_video) ? (
            <figure className="st-xl-6 self-start st-xs-12 imgIn">
              <div
                className="video-embed"
                style={{ aspectRatio: 16 / 9, backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <iframe
                  src={`https://player.vimeo.com/video/${getVideoIdFromEmbed(service.data.right_video)}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Background video"
                  style={{ width: "100%", height: "100%", border: 0 }}
                />
              </div>
            </figure>
          ) : isFilled.image(service.data.digital_image) && (
            <figure className="st-xl-6 self-start st-xs-12 imgIn">
              <img
                alt={service.data.digital_image?.alt ?? ""}
                src={`${service.data.digital_image?.url}&fit=clip&w=1920&q=85`}
                srcSet={[
                  `${service.data.digital_image?.url}&fit=clip&w=768&q=85 768w`,
                  `${service.data.digital_image?.url}&fit=clip&w=1024&q=85 1024w`,
                  `${service.data.digital_image?.url}&fit=clip&w=1440&q=85 1440w`,
                  `${service.data.digital_image?.url}&fit=clip&w=1920&q=85 1920w`,
                ].join(", ")}
                sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                width={service.data.digital_image?.dimensions?.width || 1440}
                height={service.data.digital_image?.dimensions?.height || 810}
                loading="eager"
                decoding="async"
                className="lazy"
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
