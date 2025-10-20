import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";

type PodcastSectionProps = {
  data: Content.BlogDocumentData;
};

export default async function PodcastSection({ data }: PodcastSectionProps) {
  const client = createClient();
  const podcasts = await client.getAllByType("podcast", {
    fetchLinks: [
      "podcast.title",
      "podcast.image",
      "podcast.date",
      "podcast.episode",
      "podcast.time",
      "podcast.link",
    ],
  });

  return (
    <section id="podcast" className="piano-wrap xs-bottom-6">
      <canvas id="piano" className="fadeIn xs-hidden"></canvas>
      <div className="st-grid grid-margin xs-wrap">
        <div className="st-xl-9 st-sm-6 st-xs-18 xs-both-2 fadeUp">
          <h2 className="sup-title">{data.podcast_section_title}</h2>
        </div>
        <div className="st-xl-9 st-sm-12 st-xs-18 podcast-list fadeUp">
          {podcasts.slice(0, 3).map((podcast) => (
            <article key={podcast.id}>
              <PrismicNextLink document={podcast} className="st-grid">
                <figure className="st-xl-3 st-sm-4 st-xs-6 xs-self-start">
                  <Image
                    alt={podcast.data.image?.alt ?? ""}
                    src={`${podcast.data.image?.url}&fit=clip&w=1440`}
                    sizes="(max-width: 768px) 100vw, 1440px"
                    blurDataURL={`${podcast.data.image?.url}&w=100&blur=40`}
                    placeholder="blur"
                    width={podcast.data.image?.dimensions?.width || 1440}
                    height={podcast.data.image?.dimensions?.height || 810}
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
