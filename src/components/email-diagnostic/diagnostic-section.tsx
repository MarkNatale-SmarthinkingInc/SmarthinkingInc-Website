import StatsGraphic from "./stats-graphic";

export default function DiagnosticSection() {
  return (
    <section id="ed-diagnostic" className="BgFade">
      <div className="ed-split ed-split--image-right ed-split--flush-top">
        <div className="ed-split-copy">
          <img
            className="ed-icon ed-icon--magnifier"
            src="/img/email-diagnostic/icon-letter-magnifier.svg"
            alt=""
            width={101}
            height={74}
          />
          <h2 className="Title upper ed-title">
            <span className="Dark">The</span>
            <br />
            <span className="Brown">Diagnostic</span>
          </h2>
          <p className="Copy ed-copy ed-body">
            Smarthinking Inc. starts with a comprehensive audit of your current
            email program, in which we review your list health, segmentation,
            content, automation, deployment cadence, and performance against
            category benchmarks. The Diagnostic is the underpinning of your
            future success.
          </p>
        </div>
        <figure className="ed-split-image img-anim">
          <img
            src="/img/email-diagnostic/ed-waterfall.jpg"
            alt="Water spilling over weathered timber steps into a stone pool"
            width={2072}
            height={1558}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>

      <StatsGraphic />
    </section>
  );
}
