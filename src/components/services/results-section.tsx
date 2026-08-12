// Static for now — becomes a repeatable Prismic group when the page is wired up.
const STATS = [
  { value: "20–60", unit: "x", label: "ROI", caption: ["Email", "Marketing"] },
  { value: "10", unit: "x", label: "Revenue", caption: ["After", "Rebrand"] },
  { value: "114", unit: "%", label: "Social", caption: ["Demand", "Index"] },
];

export default function ResultsSection() {
  return (
    <section id="results">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <p className="f-20 Title">
              While some see brand as an exercise in aesthetics, Smarthinking
              Inc. insists that the effort transcends simple elegance and
              ultimately drive ROI in all efforts. That&rsquo;s why our results
              show:
            </p>
          </div>
        </div>

        <div className="st-grid sm-wrap xl-top-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              /* Three 6-column blocks fill all 18 with no leading offset, so
                 the row stays symmetric about the page centre — an offset at
                 the start with nothing at the end would push it right. */
              className="st-xl-6 st-sm-18 st-sm-os-0 sm-top-2"
            >
              <div className="stat-circle center">
                <p className="stat-value f-60 Red">
                  {stat.value}
                  <sup>{stat.unit}</sup>
                </p>
                <p className="stat-label f-40 Brown upper">{stat.label}</p>
                <p className="stat-caption f-32 Title">
                  {stat.caption[0]}
                  <br />
                  {stat.caption[1]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="quote center xl-top-4">
          <p className="f-60 Title">
            &ldquo;Talk is cheap. Let&rsquo;s go play!&rdquo;
          </p>
          <cite className="f-28 upper quote-attribution">Johnny Unitas</cite>
        </blockquote>
      </div>
    </section>
  );
}
