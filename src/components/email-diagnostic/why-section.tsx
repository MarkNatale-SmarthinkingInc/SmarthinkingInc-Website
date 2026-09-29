export default function WhySection() {
  return (
    <section id="ed-why" className="BgFade ed-spaced">
      <div className="ed-split ed-split--image-right">
        <div className="ed-split-copy">
          <img
            className="ed-icon ed-icon--star"
            src="/img/email-diagnostic/icon-letter-star.svg"
            alt=""
            width={107}
            height={79}
          />
          <h2 className="Title upper ed-title">
            <span className="Dark">Why this</span>
            <br />
            <span className="Brown">Matters</span>
          </h2>
          <p className="Copy ed-copy ed-body">
            The canary in the marketing coal mine. That&rsquo;s how we see a
            property&rsquo;s email initiative. As the highest-ROI channel in the
            category, Smarthinking Inc. wants to help you develop an email
            strategy that realizes the potential. Nothing less. Our experience
            shows that when adopted, all other marketing channels level up,
            proving that a rising tide lifts all boats.
          </p>
        </div>
        <figure className="ed-split-image img-anim">
          <img
            src="/img/email-diagnostic/ed-desert-walkway.jpg"
            alt="A garden path lined with cactus and palms leading between pale stone walls"
            width={2000}
            height={1502}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
