import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type PodcastSectionProps = {
  data: Content.BlogDocumentData;
};

export default async function PodcastSection({ data }: PodcastSectionProps) {
  const client = createClient();
  // Newest episode first. Without an explicit ordering the API returns podcasts
  // roughly in the order they were first published, so a newly added episode
  // landed last and was cut off by the three-episode slice below.
  const podcasts = await client.getAllByType("podcast", {
    orderings: [
      { field: "my.podcast.date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <section id="podcast" className="piano-wrap xs-bottom-6">
      <canvas id="piano" className="fadeIn xs-hidden"></canvas>
      {/* PREVIEW: was #podcast::before. A real element so the piano can measure
          it. mode="trim" keeps the natural key rhythm and drops the leftover
          part-key rather than stretching it to meet the content. */}
      <div
        className="podcast-mask"
        data-piano-gap="0"
        data-piano-gap-mode="trim"
      ></div>
      <div className="st-grid grid-margin xs-wrap">
        <div className="st-xl-9 st-sm-6 st-xs-18 xs-both-2 fadeUp">
          <h2 className="sup-title">{data.podcast_section_title}</h2>
        </div>
        <div className="st-xl-9 st-sm-12 st-xs-18 podcast-list fadeUp">
          {podcasts.slice(0, 3).map((podcast) => (
            <article key={podcast.id}>
              <PrismicNextLink field={podcast.data.link} className="st-grid">
                <figure className="st-xl-3 st-sm-4 st-xs-6 xs-self-start">
                  <img
                    alt={podcast.data.image?.alt ?? ""}
                    src={`${podcast.data.image?.url}&fit=clip&w=1920&q=85`}
                    srcSet={[
                      `${podcast.data.image?.url}&fit=clip&w=768&q=85 768w`,
                      `${podcast.data.image?.url}&fit=clip&w=1024&q=85 1024w`,
                      `${podcast.data.image?.url}&fit=clip&w=1440&q=85 1440w`,
                      `${podcast.data.image?.url}&fit=clip&w=1920&q=85 1920w`,
                    ].join(", ")}
                    sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
                    width={podcast.data.image?.dimensions?.width || 1440}
                    height={podcast.data.image?.dimensions?.height || 810}
                    loading="lazy"
                    decoding="async"
                    className="lazy"
                  />
                </figure>
                <div className="st-xl-6 st-sm-8 st-xs-12">
                  <div className="st-grid p-details f-16 upper CopyBold">
                    <span className="p-date">{podcast.data.date}</span>
                    <span className="p-episode">{podcast.data.episode}</span>
                    <span className="p-time">{podcast.data.time}</span>
                  </div>
                  <h2 className="f-32">{podcast.data.title}</h2>
                  <div className="f-18 Brown">Design Development</div>
                </div>
              </PrismicNextLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
