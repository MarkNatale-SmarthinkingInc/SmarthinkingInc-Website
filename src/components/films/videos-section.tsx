const PRISMIC_FILES = "https://smartthinking-cms.cdn.prismic.io/smartthinking-cms";
const PRISMIC_IMAGES = "https://images.prismic.io/smartthinking-cms";

// Hosted in the Prismic media library to keep ~250 MB of video out of git.
// Prismic serves video as uploaded, so these are already web encodes
// (1080p H.264, ~5 Mbps); the masters are far over its 100 MB file limit.
const FILMS = [
  {
    title: "Aviation",
    video: `${PRISMIC_FILES}/FIgJHSEnctN0q2Li_aviation.mp4`,
    poster: `${PRISMIC_IMAGES}/Z8mCTuR1EO4aCbHL_aviation-poster.jpg?auto=format,compress`,
  },
  {
    title: "Concerts",
    video: `${PRISMIC_FILES}/hyCZa9uRWYliBiaA_concerts.mp4`,
    poster: `${PRISMIC_IMAGES}/ZZBs8cm7CPbe_orI_concerts-poster.jpg?auto=format,compress`,
  },
  {
    title: "Snowmobile",
    video: `${PRISMIC_FILES}/NXp01Xbyj5UQG3vp_snowmobile.mp4`,
    poster: `${PRISMIC_IMAGES}/PiV55wVudf0lgg59_snowmobile-poster.jpg?auto=format,compress`,
  },
];

/**
 * The one place on the site where video is meant to be watched rather than
 * decorative, so these break the autoplay rule: native controls, sound on,
 * nothing loads beyond metadata until the visitor presses play.
 */
export default function VideosSection() {
  return (
    <section id="films-videos">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-14 st-xl-os-2 st-sm-18 st-sm-os-0">
            {FILMS.map(({ title, video, poster }) => (
              <figure key={title} className="films-video">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={poster}
                  aria-label={`${title} film`}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
