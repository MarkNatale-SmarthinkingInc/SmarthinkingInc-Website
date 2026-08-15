interface SubpageHeroSectionProps {
  /** Title lines — the comp breaks these manually rather than letting them reflow. */
  title: string[];
  image: string;
  imageAlt?: string;
}

// Static for now — becomes Prismic fields when the subpages are wired up.
const PRIORITY_SERVICES = [
  "Brand Strategy",
  "Strategic Messaging",
  "Photography",
  "Graphic & Product Design",
  "Website & Interactive",
];

/**
 * Hero shared by the three service subpages. Same anatomy as the services hero —
 * parallax figure, caption row, vertical rule, split-char headline — but the
 * headline is smaller and there is no subtitle beneath.
 */
export default function SubpageHeroSection({
  title,
  image,
  imageAlt = "",
}: SubpageHeroSectionProps) {
  return (
    <section id="hero">
      <figure className="parallax">
        <img
          src={image}
          alt={imageAlt}
          width={1972}
          height={1642}
          loading="eager"
          decoding="async"
        />
      </figure>

      <div className="hero-captions grid-margin">
        <div className="st-grid">
          <div className="st-xl-3 st-sm-5 fadeUp">
            <p className="caption xs-hidden">
              <span>Think Critically.</span>
              <br />
              <span>Act Creatively.&reg;</span>
            </p>
          </div>
          <div className="st-xl-4 st-xl-os-4 st-sm-6 st-sm-os-1 st-xs-8 st-xs-os-0 center fadeUp">
            <ul className="caption hero-services">
              {PRIORITY_SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div className="st-xl-3 st-xl-os-4 st-sm-5 st-sm-os-1 st-xs-os-0 right fadeUp">
            <a
              href="/contact"
              className="hero-contact caption st-grid grid-end xs-hidden"
            >
              <img
                src="/img/svg/hero-cta-icon.svg"
                alt="Red arrow pointing to right"
              />
              <span>Contact us</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-img-title grid-margin center">
        <i className="v-line"></i>
        <h1 className="st-xl-16 st-xl-os-1 st-xs-18 st-xs-os-0 f-100 upper hero-split chars subpage-hero-title">
          {title.map((line, i) => (
            <span key={line}>
              {line}
              {i < title.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
