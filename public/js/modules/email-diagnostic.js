// Build-in for the "20–60x ROI" hero on /services/email-diagnostic.
//
// The art is one inline SVG (src/components/email-diagnostic/hero-roi-art.tsx)
// whose parts each carry a class on an inner <g>, so the tweens below never
// touch the outer translate that places them on the artboard.
//
// Order: the rules draw out from the trend icon, the multiplier rises in
// letter by letter, R and O settle, the arrow climbs into place last, and the
// reflection fades in once everything has landed. Everything ends exactly on
// the comp. Motion only adds an entrance and never alters the resting design.
//
// Hidden states are set here, not in CSS, so a script failure leaves the hero
// fully visible (same rule as reveal.js).

export function emailDiagnosticHero() {
  const art = document.querySelector(".ed-hero-art");
  if (!art) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const q = (selector) => art.querySelectorAll(selector);
  const chars = q(".ed-hero-char");
  const letters = q(".ed-hero-r, .ed-hero-o");
  const arrow = q(".ed-hero-arrow");
  const ruleLeft = q(".ed-hero-rule-left");
  const ruleRight = q(".ed-hero-rule-right");
  const trend = q(".ed-hero-trend");
  const reflection = q(".ed-hero-reflection");

  gsap.set(chars, { opacity: 0, y: 40 });
  gsap.set(letters, { opacity: 0, y: 60 });
  gsap.set(arrow, { opacity: 0, y: 160 });
  gsap.set(ruleLeft, { scaleX: 0, transformOrigin: "100% 50%" });
  gsap.set(ruleRight, { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(trend, { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" });
  gsap.set(reflection, { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(trend, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" })
    .to(
      [ruleLeft, ruleRight],
      { scaleX: 1, duration: 1.2, ease: "power4.inOut" },
      "<0.1"
    )
    .to(
      chars,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
      },
      "<0.3"
    )
    .to(
      letters,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
      },
      "<0.2"
    )
    .to(
      arrow,
      { opacity: 1, y: 0, duration: 1.3, ease: "expo.out" },
      "<0.35"
    )
    .to(reflection, { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.6");
}
