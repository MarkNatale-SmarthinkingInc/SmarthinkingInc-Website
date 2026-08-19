// Static for now — becomes a repeatable Prismic group when the page is wired up.
const DELIVERABLES = [
  [
    "Paid Media",
    "Strategy Logic, And Charm Combine To Build An Audience Of Qualified Prospects",
  ],
  ["Email", "Captivating, Engaging, And Profitable Campaigns That Drive Response"],
  ["Social Media", "The Daily Dose Done Right"],
  [
    "Websites + Digital",
    "Fresh, Immersive Experiences That Transport The Viewer And Create Demand",
  ],
  [
    "Brand Content",
    "Working In Harmony, Ensuring A Cohesive Message And Experience",
  ],
  [
    "Analytics + Reporting",
    "Analysis That Provides Insight, Direction, And Improved Results",
  ],
];

/**
 * Note the lead-in sits ABOVE the table here. Brand Activation's comp puts its
 * equivalent paragraph below — same furniture, deliberately different order.
 */
export default function DeliverablesSection() {
  return (
    <section id="mo-deliverables" className="BgFade">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-100 upper Brown deliverables-title">
              Deliverables
            </h2>
          </div>
        </div>
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-4 st-sm-18 st-sm-os-0 center">
            <p className="f-18 Title mo-deliverables-lead">
              Marketing Orchestration creates a marketing system that focuses on
              the following initiatives:
            </p>
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
    </section>
  );
}
