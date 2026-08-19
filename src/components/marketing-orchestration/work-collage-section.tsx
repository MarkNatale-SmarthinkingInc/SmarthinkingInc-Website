const DIR = "/img/services-new/marketing-orchestration";

/**
 * Work collage: three full-bleed bands, a paired row, then a closing band,
 * following the comp's order.
 *
 * The paired row carries the vertical phone film. Per the site-wide rule it
 * autoplays muted, looped and inline, with no controls.
 */
export default function WorkCollageSection() {
  return (
    <section id="mo-work">
      <figure className="mo-work-band mo-reveal">
        <img
          src={`${DIR}/asset-1.jpg`}
          alt="Printed annual marketing plan and strategy covers"
          width={2400}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="mo-work-band mo-reveal">
        <img
          src={`${DIR}/asset-2.jpg`}
          alt="Property website open on a laptop"
          width={2400}
          height={1613}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="mo-work-band mo-reveal">
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
        <figure className="mo-work-item mo-reveal">
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

      <figure className="mo-work-band mo-reveal">
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
