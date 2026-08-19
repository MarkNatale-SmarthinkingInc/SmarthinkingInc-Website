export default function IntroSection() {
  return (
    <section id="mo-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <h2 className="f-18 upper subpage-eyebrow">
              Marketing Orchestration
            </h2>
            {/* Three dots divider — decorative, so hidden from assistive tech. */}
            <p className="dot-rule" aria-hidden="true">
              <span />
              <span />
              <span />
            </p>
            <p className="f-40 Title subpage-lead">
              Your brand is symphonic in nature, so all efforts need
              orchestration: playing in the right key, keeping tempo, and
              hitting the crescendos. Sometimes you need an external conductor
              to optimize performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
