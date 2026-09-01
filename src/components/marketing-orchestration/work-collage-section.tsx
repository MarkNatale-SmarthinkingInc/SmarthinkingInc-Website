const DIR = "/img/services-new/marketing-orchestration";

/**
 * Work collage. The comp does NOT run these edge to edge — only the opening
 * plan and the closing report bleed full width, and the three pieces between
 * them step inward at different insets, which is what gives the block its
 * rhythm. Widths and insets are measured off the comp; see `#mo-work` in
 * service-subpage.css.
 *
 * The paired row carries the vertical phone film. Per the site-wide rule it
 * autoplays muted, looped and inline, with no controls.
 */
export default function WorkCollageSection() {
  return (
    <section id="mo-work">
      <figure className="mo-work-band mo-work-plan mo-reveal">
        <img
          src={`${DIR}/asset-1.jpg`}
          alt="Printed annual marketing plan and strategy covers"
          width={2400}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="mo-work-band mo-work-laptop mo-reveal">
        <img
          src={`${DIR}/asset-2.jpg`}
          alt="Property website open on a laptop"
          width={2400}
          height={1613}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="mo-work-band mo-work-booklet mo-reveal">
        <img
          src={`${DIR}/asset-3.jpg`}
          alt="Open brochure spread showing a coastal photograph"
          width={2400}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="mo-work-grid">
        <figure className="mo-work-item mo-work-film mo-reveal">
          <video
            className="mo-work-video"
            src={`${DIR}/asset-4.mp4`}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Vertical social film playing on a phone"
          />
        </figure>
        <figure className="mo-work-item mo-work-phones mo-reveal">
          <img
            src={`${DIR}/asset-5.jpg`}
            alt="Social media feeds on two phones"
            width={2400}
            height={1600}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>

      <figure className="mo-work-band mo-work-report mo-reveal">
        <img
          src={`${DIR}/asset-6.jpg`}
          alt="Quarterly report covers"
          width={2400}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
