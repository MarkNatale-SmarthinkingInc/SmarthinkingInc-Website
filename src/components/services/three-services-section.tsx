// Static for now — becomes a repeatable Prismic group when the page is wired up.
const SERVICES = [
  {
    title: ["Brand", "Foundation"],
    copy: "Where brands are born, the formulation of the essential elements needed to create a remarkable brand.",
    mark: "/img/services-new/brand-foundation.svg",
    href: "/services/brand-foundation",
  },
  {
    title: ["Brand", "Activation"],
    copy: "A beautiful amalgamation of brochures, websites, renderings, films, preopening collateral and more.",
    mark: "/img/services-new/brand-activation.svg",
    href: "#",
  },
  {
    title: ["Marketing", "Orchestration"],
    copy: "Plan the work. Work the plan. Smarthinking Inc. develops and executes your integrated annual marketing communications.",
    mark: "/img/services-new/marketing-orchestration.svg",
    href: "#",
  },
];

export default function ThreeServicesSection() {
  return (
    <section id="three-services" className="BgDark">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-80 White three-services-title">
              Our expertise revolves around{" "}
              {/* Comp breaks here; at phone widths a forced break just strands
                  a word, so let it reflow. The space sits before the <br> so
                  the words stay separated once it is hidden. */}
              <br className="xs-hidden" />
              these <span className="Brown">three services.</span>
            </h2>
          </div>
        </div>

        <div className="st-grid sm-wrap xl-top-3">
          {SERVICES.map((service) => (
            <article
              key={service.title.join(" ")}
              className="st-xl-5 st-xl-os-1 st-sm-18 st-sm-os-0 sm-top-2 service-card"
            >
              <h3 className="f-40 Red upper">
                {service.title[0]}{" "}
                {/* Two lines in the comp's narrow desktop column. Once the
                    cards stack they have the width to sit on one, so the
                    break goes away at the same breakpoint. */}
                <br className="sm-hidden" />
                {service.title[1]}
              </h3>

              <figure className="service-card-mark">
                <img
                  src={service.mark}
                  alt=""
                  width={578}
                  height={578}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <p className="f-24 Title White">{service.copy}</p>

              <div className="button-wrap">
                <a href={service.href} className="button service-card-button">
                  Learn more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
