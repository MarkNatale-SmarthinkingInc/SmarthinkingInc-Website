export function collage() {
  const figures = gsap.utils.toArray(".bf-reveal");
  if (!figures.length) return;

  // Reveal: fade and rise as each figure enters, matching the vocabulary the
  // rest of the site uses (power4, ~1s, small stagger).
  gsap.set(figures, { opacity: 0, y: 40 });
  ScrollTrigger.batch(figures, {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4",
        stagger: { amount: 0.25, from: "start" },
      }),
  });

  if (isMobile()) return;

  // Parallax: the image drifts inside its frame as the frame crosses the
  // viewport. The figure clips, and the image is oversized so there is
  // something to travel — see .bf-parallax in service-subpage.css.
  gsap.utils.toArray(".bf-parallax").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}
