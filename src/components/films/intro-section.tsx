/**
 * Lead line in the style of the service subpage intros
 * (src/components/brand-activation/intro-section.tsx).
 */
export default function IntroSection() {
  return (
    <section id="films-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <p className="f-40 Title films-lead fadeUp">
              Films like these turn simple inquiries into motivated leads. Want
              yours to do the same?{" "}
              <a href="/contact">
                <strong>Book a discovery call.</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
