// Static for now — becomes a repeatable Prismic group when the page is wired up.
const DELIVERABLES = [
  ["Brand Values", "The Principles And Codes That Drive The Why"],
  ["Brand Positioning", "The Unique Space The Brand Will Occupy Within The Market"],
  ["Brand Personality", "The Human Traits Of The Brand"],
  ["Brand Tone of Voice", "How The Brand Communicates In Spoken And Written Initiatives"],
  ["Brand Narrative", "The Story The Brand Tells Every Day Through All Mediums"],
  ["Brand Visual Identity", "Logo, Icon, Color Palette, Typography, And Image Styles"],
  ["Brand Architecture", "The Related Sub-Brands, Products, And Services"],
  ["Brand Standards", "The Rules Of Engagement"],
];

export default function DeliverablesSection() {
  return (
    <section id="bf-deliverables" className="BgFade">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-100 upper Brown deliverables-title">Deliverables</h2>
          </div>
        </div>
      </div>

      <dl className="deliverables-list">
        {DELIVERABLES.map(([term, description]) => (
          <div key={term} className="deliverable-row">
            <div className="grid-margin">
              <div className="st-grid">
                <div className="st-xl-6 st-xl-os-1 st-sm-18 st-sm-os-0">
                  <dt className="f-18 Title deliverable-term">{term}</dt>
                </div>
                <div className="st-xl-10 st-sm-18 st-sm-os-0">
                  <dd className="f-18 Title deliverable-description">
                    {description}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </dl>

      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-4 st-sm-18 st-sm-os-0 center xl-top-2">
            <p className="f-20 Title">
              The Brand Foundation produces the Brand Strategy &mdash; the core
              elements needed to build a meaningful brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
