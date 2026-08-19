/**
 * TAKE NOTE — dark band placing Brand Activation between the other two
 * services.
 *
 * NOTE: the comp draws a generative triangular mark here with the three
 * service names set around its points. That artwork is NOT among the supplied
 * assets — the folder ships the three individual service marks only. The
 * activation mark stands in for now so the section reads correctly; swap
 * `MARK` for the real export when it arrives.
 */
const MARK = "/img/services-new/brand-activation.svg";

export default function TakeNoteSection() {
  return (
    <section id="ba-note" className="BgDark">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-100 upper ba-note-title">Take Note</h2>
          </div>
        </div>
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-4 st-sm-18 st-sm-os-0 center">
            <p className="f-18 Title White">
              A short note of clarification, Brand Activation works best after
              Brand Foundation. With that said, Activation can be applied to an
              existing brand if needed. Additionally, Brand Activation is
              typically the bridge to a more intricate Marketing Orchestration
              relationship.
            </p>
          </div>
        </div>

        <div className="ba-note-diagram">
          <figure className="ba-note-mark">
            <img
              src={MARK}
              alt=""
              width={578}
              height={578}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <span className="ba-note-label ba-note-label-top f-20 White upper">
            Brand
            <br />
            Activation
          </span>
          <span className="ba-note-label ba-note-label-left f-20 White upper">
            Brand
            <br />
            Foundation
          </span>
          <span className="ba-note-label ba-note-label-right f-20 White upper">
            Marketing
            <br />
            Orchestration
          </span>
        </div>
      </div>
    </section>
  );
}
