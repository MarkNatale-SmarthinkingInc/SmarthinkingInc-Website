// Static for now. This becomes a rich-text field once the page is approved
// and wired to Prismic.
export default function IntroSection() {
  return (
    <section id="ed-intro" className="BgFade">
      <div className="ed-intro-copy center">
        <p className="f-28 CopyBold ed-intro-lead">
          That&rsquo;s what a proper email initiative should return for
          remarkable properties.
          <br />
          Nothing else in your marketing budget comes close.
        </p>
        <p className="Copy ed-copy">
          Unfortunately, most brands waste the channel. Generic offers. Forced
          urgency. Inconsistent timing. Copy that could belong to any property,
          anywhere.
        </p>
        <p className="Copy ed-copy">
          Discerning guests notice. They expect the same care in their inbox
          that they get at check-in.
        </p>
        <p className="Copy ed-copy">
          That&rsquo;s the difference a real campaign makes. Consistent.
          Specific. Insightful. Built for past guests who miss you and new
          prospects looking for an experience.
        </p>
        <p className="Copy ed-copy">
          Get that right, and the ROI isn&rsquo;t a fluke. It&rsquo;s what
          happens when you speak to guests instead of at them.
        </p>
        <p className="Copy ed-copy">
          Say the right thing, to the right guest, at the right time.
        </p>
        <p className="f-28 CopyBold ed-intro-close">That&rsquo;s the return.</p>
      </div>
    </section>
  );
}
