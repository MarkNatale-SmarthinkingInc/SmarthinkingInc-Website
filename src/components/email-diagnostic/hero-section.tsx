import HeroRoiArt from "./hero-roi-art";

/**
 * Dark hero carrying the "20–60x ROI" lockup. The comp's wordmark at the top
 * is the site header (#menu), which floats over every page, so the section
 * holds the art only. The build-in lives in public/js/modules/email-diagnostic.js.
 */
export default function HeroSection() {
  return (
    <section id="ed-hero">
      <h1 className="ed-visually-hidden">
        The Email Diagnostic: 20 to 60 times ROI
      </h1>
      <HeroRoiArt />
    </section>
  );
}
