// Static for now. This becomes a repeatable Prismic group once the page is approved.
const YIELDS = [
  "A potent and relevant list",
  "Properly built segmentations",
  "Established performance metrics",
  "Branded email campaigns complete with deployment schedules and methodologies",
];

export default function ResultSection() {
  return (
    <section id="ed-result" className="BgFade ed-spaced">
      <div className="ed-split ed-split--image-left">
        <figure className="ed-split-image img-anim">
          <img
            src="/img/email-diagnostic/ed-palm.jpg"
            alt="Palm fronds casting shadows across a stone-walled courtyard"
            width={2132}
            height={1604}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="ed-split-copy">
          <img
            className="ed-icon ed-icon--megaphone"
            src="/img/email-diagnostic/icon-letter-megaphone.svg"
            alt=""
            width={91}
            height={90}
          />
          <h2 className="Title upper ed-title ed-title--single">
            <span className="Dark">The</span>{" "}
            <span className="Brown">Result</span>
          </h2>
          <p className="Title upper Brown ed-subtitle">
            The Diagnostic yields:
          </p>
          <ul className="Copy upper ed-yields">
            {YIELDS.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li className="CopyBold ed-yields-last">Email that makes money</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
