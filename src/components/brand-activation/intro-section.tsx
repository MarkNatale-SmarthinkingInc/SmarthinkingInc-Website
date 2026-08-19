export default function IntroSection() {
  return (
    <section id="ba-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <h2 className="f-18 upper subpage-eyebrow">Brand Activation</h2>
            {/* Three dots divider — decorative, so hidden from assistive tech. */}
            <p className="dot-rule" aria-hidden="true">
              <span />
              <span />
              <span />
            </p>
            <p className="f-40 Title subpage-lead">
              Once armed with a <strong>Brand Foundation</strong>, bring your
              collective brand expressions to life. Smarthinking Inc.&rsquo;s
              Symphonic Approach applies to every interaction, ensuring a
              compelling and consistent brand narrative globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
