// Static for now — becomes a repeatable Prismic group when the page is wired up.
const DELIVERABLES = [
  [
    "Marketing Collateral",
    "A Broad Range Of Products That Ultimately Serve To Enhance The Sale",
  ],
  [
    "Websites + Digital Interactive",
    "Immersive Experiences That Transport The Viewer And Create Demand",
  ],
  [
    "Film + Photography",
    "High-Impact Images That Vividly Convey Your Story While Staying On-Brand",
  ],
  [
    "Photorealistic Renderings",
    "Exceeding Expectations, Where Imagination Merges With Reality",
  ],
  [
    "Branded Architecture",
    "With Architectural Collaboration, We Apply The Brand To The Physical World",
  ],
  [
    "Sales Gallery Design",
    "With Architectural Collaboration, The Right Experiences At The Right Moments",
  ],
];

export default function DeliverablesSection() {
  return (
    <section id="ba-deliverables" className="BgFade">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-16 st-xl-os-1 st-sm-18 st-sm-os-0 center">
            <h2 className="f-100 upper Brown deliverables-title">
              Deliverables
            </h2>
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
            <p className="f-18 Title">
              Brand Activation produces a collateral package that will tell your
              story to the world. Essential Brand Activations will regularly
              produce (but not be limited to):
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
