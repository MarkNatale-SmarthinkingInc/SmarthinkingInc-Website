const DIR = "/img/services-new/brand-foundation";

/**
 * Editorial collage of the Cove work. The comp staggers these rather than
 * gridding them neatly: a full-width render, the brand sketch overlapping it
 * from below, then two columns whose right side sits lower than the left.
 */
export default function WorkCollageSection() {
  return (
    <section id="bf-work">
      <figure className="bf-work-wide bf-reveal bf-parallax">
        <img
          src={`${DIR}/Service-Brand-Foundation-2.jpg`}
          alt="Concept sketch resolving into a finished render of the spa interior"
          width={2400}
          height={1552}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <figure className="bf-work-sketch bf-reveal">
        <img
          src={`${DIR}/Service-Brand-Foundation-9.jpg`}
          alt="Hand-written brand notes for The Cove covering promise, tone of voice, narrative and identity"
          width={2400}
          height={2056}
          loading="lazy"
          decoding="async"
        />
      </figure>

      {/* Two columns that pack independently, which is what gives the comp its
          masonry rhythm — a single 2x2 grid ties each row to its tallest tile
          and opens a hole under the short one. Column membership is fixed
          rather than flowed, because the comp art-directs which piece sits
          where. Widths and offsets come from the comp; see the CSS. */}
      <div className="bf-work-grid">
        <div className="bf-work-col">
          <figure className="bf-work-item bf-work-paddles bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-7.jpg`}
              alt="Reception area with a wall of vintage paddles"
              width={1662}
              height={2400}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="bf-work-item bf-work-magazine bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-5.jpg`}
              alt="Magazine advertisement spread, A Midsummer Night's Dream"
              width={2400}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <div className="bf-work-col">
          <figure className="bf-work-item bf-work-brochure bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-6.jpg`}
              alt="Printed treatment brochure spread"
              width={2400}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="bf-work-item bf-work-folded bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-8.jpg`}
              alt="Folded treatment menu"
              width={2400}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>

      <figure className="bf-work-band bf-reveal bf-parallax">
        <img
          src={`${DIR}/Service-Brand-Foundation-3.jpg`}
          alt="Guest receiving a hot stone massage"
          width={2400}
          height={1182}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
