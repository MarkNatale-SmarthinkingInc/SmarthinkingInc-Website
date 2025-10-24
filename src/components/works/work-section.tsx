import { createClient } from "@/prismicio";
import Image from "next/image";
import { PrismicNextLink } from "@prismicio/next";

export default async function WorkSection() {
  const client = createClient();
  const works = await client.getAllByType("work", {
    fetchLinks: [
      "work.title",
      "work.main_image",
      "work.medium_image",
      "work.small_image",
      "work.location",
      "work.short_description",
    ],
  });
  return (
    <section id="work" className="grid-margin">
      {works.map((work, index) => (
        <article key={`work-${work.id}-${index}`}>
          <PrismicNextLink document={work} className="st-grid imgIn">
            <div className="st-xl-6 st-xs-8 imgIn">
              <figure>
                {work.data.main_image?.url && (
                  <Image
                    alt={work.data.main_image?.alt ?? ""}
                    src={`${work.data.main_image?.url}&fit=clip&w=1440`}
                    sizes="(max-width: 768px) 100vw, 1440px"
                    blurDataURL={`${work.data.main_image?.url}&w=100&blur=40`}
                    placeholder="blur"
                    width={work.data.main_image?.dimensions?.width || 1440}
                    height={work.data.main_image?.dimensions?.height || 810}
                    className="lazy"
                  />
                )}
              </figure>
            </div>
            <div className="st-xl-12 st-xs-10 st-grid xs-wrap">
              <div className="st-xl-7 st-xs-10">
                <h2 className="st-xl-13 st-xs-10 f-60 fadeUp">
                  {work.data.title} <i></i>
                </h2>
                <div className="st-xl-7 st-grid img-2x self-end">
                  <figure className="st-xl-4 xs-hidden scroll-img-1 imgIn">
                    <Image
                      alt={work.data.medium_image?.alt ?? ""}
                      src={`${work.data.medium_image?.url}&fit=clip&w=1440`}
                      sizes="(max-width: 768px) 100vw, 1440px"
                      blurDataURL={`${work.data.medium_image?.url}&w=100&blur=40`}
                      placeholder="blur"
                      width={work.data.medium_image?.dimensions?.width || 1440}
                      height={work.data.medium_image?.dimensions?.height || 810}
                      className="lazy"
                    />
                  </figure>
                  <figure className="st-xl-3 xs-hidden scroll-img-2 self-start imgIn">
                    <Image
                      alt={work.data.small_image?.alt ?? ""}
                      src={`${work.data.small_image?.url}&fit=clip&w=1440`}
                      sizes="(max-width: 768px) 100vw, 1440px"
                      blurDataURL={`${work.data.small_image?.url}&w=100&blur=40`}
                      placeholder="blur"
                      width={work.data.small_image?.dimensions?.width || 1440}
                      height={work.data.small_image?.dimensions?.height || 810}
                      className="lazy"
                    />
                  </figure>
                  <div className="st-xl-5 st-xs-10 xs-self-end xs-top-1 scroll-text self-start imgIn">
                    <h3 className="f-24">{work.data.location}</h3>
                    <p className="f-18">{work.data.short_description}</p>
                    <img
                      src="/img/svg/icon-semi-arrow-red.svg"
                      alt="Curved red arrow icons pointing towards the right direction"
                    />
                  </div>
                </div>
              </div>
            </div>
          </PrismicNextLink>
        </article>
      ))}
    </section>
  );
}
