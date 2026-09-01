/**
 * HOW THIS WORKS — the copy block plus the rotating circle podium.
 *
 * The circle markup is ported verbatim from the old Services page
 * (`src/components/services-old/services-section.tsx`) so the SVG layers keep
 * the class names `circleStage()` in `public/js/modules/circle-stage.js`
 * animates: `.circle-1/2/3` counter-rotate into alignment, `.circle-rotate`
 * spins forever.
 *
 * The strings live in their own section below (see strings-section.tsx) rather
 * than behind the circle: the stage starts translated down and rises as it
 * animates, so anything sitting behind it showed around the edges before the
 * animation had run.
 *
 * No ancestor of #circle-stage may set overflow:hidden — the stage is pinned,
 * and clipping a pinned element's ancestor slices it in half.
 */
export default function HowSection() {
  return (
    <section id="ba-how">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-120 upper why-title">
              <span className="Brown">How</span> This Works
            </h2>
          </div>
        </div>
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-4 st-sm-18 st-sm-os-0 center">
            <p className="f-20 Title ba-how-copy">
              Smarthinking Inc. applies the <strong>Brand Strategy</strong> to
              all interactions the target markets have with the brand. This
              symphonic approach creates a beautiful amalgamation of brand
              expressions that tell your story and solidify your position within
              the market.
            </p>
          </div>
        </div>
      </div>

      <div id="circle-stage">
        <div className="stage-inner">
          <div className="circle-wrap">
            <img
              className="circle-shape circle-1"
              src="/img/services/circle-1.svg"
              alt=""
            />
            <img
              className="circle-shape circle-2"
              src="/img/services/circle-2.svg"
              alt=""
            />
            <img
              className="circle-shape circle-3"
              src="/img/services/circle-3.svg"
              alt=""
            />
          </div>
          <div className="circle-target">
            <img
              className="circle-center"
              src="/img/services/circle-center.svg"
              alt="Since 2006 — conducting excellence, symphonic effect"
            />
            <img
              className="circle-rotate"
              src="/img/services/circle-rotate-text.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
