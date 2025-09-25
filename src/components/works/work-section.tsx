import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

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
          <PrismicNextLink document={work} className="st-grid">
            <div className="st-xl-6 st-xs-8 imgIn">
              <figure>
                <PrismicNextImage field={work.data.main_image} />
              </figure>
            </div>
            <div className="st-xl-12 st-xs-10 st-grid xs-wrap">
              <div className="st-xl-7 st-xs-10">
                <h2 className="st-xl-13 st-xs-10 f-60 fadeUp">
                  {work.data.title} <i></i>
                </h2>
                <div className="st-xl-7 st-grid img-2x self-end">
                  <figure className="st-xl-4 xs-hidden scroll-img-1 imgIn">
                    <PrismicNextImage field={work.data.medium_image} />
                  </figure>
                  <figure className="st-xl-3 xs-hidden scroll-img-2 self-start imgIn">
                    <PrismicNextImage field={work.data.small_image} />
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
