const PILLS = [
  { file: "stats-pill-open-rate.svg", label: "Open rate", width: 226 },
  { file: "stats-pill-click-through.svg", label: "Click-through", width: 292 },
  { file: "stats-pill-link-clicks.svg", label: "Link clicks", width: 226 },
  { file: "stats-pill-platforms.svg", label: "Platforms", width: 226 },
];

/**
 * An illustration of a campaign dashboard, not live data. The tab pills look
 * clickable but are labels only. Andrew confirmed this is decorative for now;
 * if it ever becomes interactive, it needs real data and designs for the other
 * three views.
 *
 * All text inside these SVGs is outlined, so the figures can't be edited
 * without new exports. The graphic is described once for screen readers and
 * its parts are hidden from them.
 */
export default function StatsGraphic() {
  return (
    <figure
      className="ed-stats"
      role="img"
      aria-label="Sample campaign report: 32,395 emails sent, 31,618 delivered, 9,802 opened and 588 clicked, with click-through rate and platform charts"
    >
      <div className="ed-stats-bar" aria-hidden="true">
        <img
          className="ed-stats-label"
          src="/img/email-diagnostic/stats-label.svg"
          alt=""
          width={144}
          height={22}
        />
        <div className="ed-stats-pills">
          {PILLS.map((pill) => (
            <img
              key={pill.file}
              className={`ed-stats-pill${pill.width > 226 ? " ed-stats-pill--wide" : ""}`}
              src={`/img/email-diagnostic/${pill.file}`}
              alt=""
              width={pill.width}
              height={52}
            />
          ))}
        </div>
      </div>
      <img
        className="ed-stats-chart"
        src="/img/email-diagnostic/stats-graphic.svg"
        alt=""
        width={1187}
        height={802}
        loading="lazy"
        aria-hidden="true"
      />
    </figure>
  );
}
