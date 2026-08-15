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

      <div className="grid-margin">
        <div className="bf-work-grid">
          <figure className="bf-work-item bf-work-tall bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-7.jpg`}
              alt="Reception area with a wall of vintage paddles"
              width={1662}
              height={2400}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="bf-work-item bf-work-offset bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-6.jpg`}
              alt="Printed treatment brochure spread"
              width={2400}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="bf-work-item bf-reveal">
            <img
              src={`${DIR}/Service-Brand-Foundation-5.jpg`}
              alt="Magazine advertisement spread, A Midsummer Night's Dream"
              width={2400}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="bf-work-item bf-work-offset bf-reveal">
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
