// Fade-up-and-in reveal for elements scrolled into view.
//
// Same shape as img-anim.js: set the hidden state in JS (never in CSS, so a
// script failure leaves the content readable rather than invisible), then let
// ScrollTrigger.batch play it back a group at a time. Elements already past
// the start line on load are caught by ScrollTrigger's initial refresh, so
// anything above the fold reveals immediately instead of sticking at zero.
//
// Usage: add `reveal` to any element. Siblings entering together stagger in
// document order.

// Tuning knobs, kept together so the feel can be adjusted in one place.
const RISE = 40; // px travelled on the way up
const DURATION = 1;
const STAGGER = 0.12; // between siblings in the same batch
const START = "top 88%"; // how far up the viewport before it fires

export function reveal() {
  const items = gsap.utils.toArray(".reveal");
  if (!items.length) {
    return;
  }

  gsap.set(items, { opacity: 0, y: RISE });

  ScrollTrigger.batch(items, {
    start: START,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: "power4",
        stagger: { each: STAGGER, from: "start" },
        overwrite: true,
      }),
  });
}
