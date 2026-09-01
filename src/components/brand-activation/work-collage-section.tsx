const DIR = "/img/services-new/brand-activation";

/**
 * Work collage. Two full-bleed bands, then an interlocking four-tile block,
 * following the comp's order: magazine spread, site plan, signage + portrait,
 * interior + tablet.
 *
 * The four-tile block is NOT a grid. Its two columns pack to the same total
 * height but split it differently, and the signage overlaps the video
 * horizontally by 1.3vw — so each tile is placed absolutely from comp
 * measurements. See `.ba-work-grid` in service-subpage.css.
 *
 * Two of these are video. Per the site-wide rule they autoplay: muted (browsers
 * block autoplay with sound), looped, inline (iOS Safari otherwise takes them
 * fullscreen) and with no controls, so they read as motion in the page rather
 * than media to operate. `poster` covers the gap before the first frame paints.
 */
export default function WorkCollageSection() {
  return (
    <section id="ba-work">
      <figure className="ba-work-band ba-reveal">
        <video
          className="ba-work-video"
          src={`${DIR}/asset-1.mp4`}
          poster={`${DIR}/asset-1.jpg`}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Printed magazine spread turning to a cover feature"
        />
      </figure>

      <figure className="ba-work-band ba-reveal">
        <img
          src={`${DIR}/asset-2.jpg`}
          alt="Architectural site plan of the resort grounds"
          width={2400}
          height={1483}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="ba-work-grid">
        <figure className="ba-work-item ba-work-signage ba-reveal">
          <img
            src={`${DIR}/asset-3.jpg`}
            alt="Freestanding digital signage displays in a sales gallery"
            width={2400}
            height={1602}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <figure className="ba-work-item ba-work-portrait ba-reveal">
          <img
            src={`${DIR}/asset-4.jpg`}
            alt="Fashion portrait shot for the brand campaign"
            width={1600}
            height={2400}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <figure className="ba-work-item ba-work-interior ba-reveal">
          <img
            src={`${DIR}/asset-5.jpg`}
            alt="Photorealistic rendering of a residence interior"
            width={2400}
            height={1595}
            loading="lazy"
            decoding="async"
          />
        </figure>
        {/* The video is shown whole — never cropped — so its box takes the
            file's own aspect ratio and the other three tiles absorb the
            difference. */}
        <figure className="ba-work-item ba-work-film ba-reveal">
          <video
            className="ba-work-video"
            src={`${DIR}/asset-6.mp4`}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Tablet playing the brand film"
          />
        </figure>
      </div>
    </section>
  );
}
