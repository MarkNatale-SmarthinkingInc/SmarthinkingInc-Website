/**
 * A band of the site's interactive strings, sitting between the circle and
 * DELIVERABLES.
 *
 * Deliberately WITHOUT the old Services page's `.service-grid` — the comp
 * shows strings as texture, not as a list of services hung off them. And
 * without `canvas-fix`: that class makes `strings.js` measure
 * `.service-listing`, which does not exist on this page and would throw.
 *
 * strings.js binds pointer plucking to every `.string-canvas` on the page, so
 * these stay interactive with no extra wiring.
 */
export default function StringsSection() {
  return (
    <section id="ba-strings" className="string-canvas" aria-hidden="true">
      <div className="canvas-wrap">
        <canvas className="string-lines grid18"></canvas>
      </div>
    </section>
  );
}
