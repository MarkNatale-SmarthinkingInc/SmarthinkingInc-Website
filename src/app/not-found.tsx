export default function NotFound() {
  return (
    <main
      id="smooth-wrapper"
      data-barba="container"
      data-barba-namespace="error"
    >
      <div id="smooth-content" className="error" data-page="Whoops?!!">
        <div className="piano-wrap">
          <canvas id="piano"></canvas>
          <h1 className="outline center fadeUp row">
            <span className="letter">4</span>
            <span className="letter">0</span>
            <span className="letter">4</span>
          </h1>
          <div className="error-message fadeUp">
            <p className="f-18">
              We are sorry but the page you are looking for does not exist.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
