/**
 * The /work hero (src/components/works/hero-section.tsx) with its title
 * swapped. Static rather than Prismic: this page has no document of its own.
 */
export default function HeroSection() {
  return (
    <section id="hero" className="grid-margin xl-bottom-2 xs-bottom-3">
      <div className="st-grid xs-wrap">
        <div className="st-xl-3 fadeUp st-xs-18 xs-center xs-bottom-2" />
        <div className="st-xl-12 st-xs-18 center">
          <h1 className="f-140 upper hero-split chars">
            <span>
              Featured <span className="Brown">Films</span>
            </span>
          </h1>
        </div>
        <div className="st-xl-3 right xs-hidden fadeUp">
          <a href="/contact" className="hero-contact caption st-grid grid-end">
            <img
              src="/img/svg/hero-cta-icon-dark.svg"
              alt="dark arrow pointing to right"
            />
            <span>Contact us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
