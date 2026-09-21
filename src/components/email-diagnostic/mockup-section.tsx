/**
 * Two phones showing a campaign email. The comp's play button marks this as
 * an autoplaying video, which hasn't been delivered yet, so a still stands in.
 * When the video arrives, swap the <img> for
 * <video autoPlay muted loop playsInline> with the same class, and the framing
 * CSS carries over as long as the video is exported at the placeholder's
 * composition.
 */
export default function MockupSection() {
  return (
    <section id="ed-mockup" className="BgWhite">
      <figure className="ed-mockup-media">
        <img
          src="/img/email-diagnostic/ed-phones-placeholder.jpg"
          alt="A Smarthinking email campaign displayed on two phones"
          width={2400}
          height={1363}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
