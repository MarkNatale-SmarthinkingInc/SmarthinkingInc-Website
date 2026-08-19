// The rotating circle podium, ported from the old Services page.
//
// The behaviour is lifted verbatim from services() in services.js: three arc
// layers counter-rotate into alignment on scroll, the stage rises and pins,
// and the centre medallion spins forever while the section is on screen.
//
// It is a separate module rather than a call to services() because that
// function also pins the old page's service listing, and reads
// `.service-listing` unguarded — on a page without that element it throws
// before reaching the rotate loop. The subpages want the circle and a band of
// strings, but not the listing, so the circle half lives here.
//
// services.js is deliberately left untouched: the old page stays as-is until
// the redesign is signed off.

export function circleStage() {
  const stage = document.querySelector("#circle-stage");
  if (!stage) {
    return;
  }

  const circleRotate = stage.querySelector(".circle-rotate");

  if (!isMobile() || window.innerWidth > 768) {
    const stageInner = stage.querySelector(".stage-inner");
    const circle1 = stage.querySelector(".circle-1");
    const circle2 = stage.querySelector(".circle-2");
    const circle3 = stage.querySelector(".circle-3");

    gsap.set(circle1, { rotate: 135 });
    gsap.set(circle2, { rotate: -180 });
    gsap.set(circle3, { rotate: 180 });
    gsap.set(stageInner, { yPercent: 50 });

    // These three triggers are the old Services page's values verbatim, and
    // they must stay that way: together they give the outer ring its full
    // sweep — PHOTO on the right round to PRODUCT. Measured on /services-old
    // at a 1440x900 viewport, they resolve to:
    //
    //   rotation scrub   1800px  (2.0 viewport heights)
    //   stage-inner rise 1350px  (1.5)
    //   pin              1080px  (1.2)
    //
    // The pin is what buys that distance: it holds the circle still while the
    // page scrolls on beneath, so the sweep is watchable instead of racing past.
    // Do not "tidy" these into shorter ranges — that shortens the spin.
    //
    // The pin does require that no ancestor of #circle-stage sets
    // overflow:hidden. Clipping a pinned element's ancestor slices the circle
    // in half and makes the pin-spacer maths jump.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "top -100%",
        scrub: true,
      },
    });

    gsap.to(stageInner, {
      yPercent: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: stageInner,
        start: "top bottom",
        end: "top -50%",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: stage,
      start: "bottom bottom",
      end: "top -100%",
      pin: true,
    });

    tl.to(circle1, { rotate: 0, duration: 1, ease: "power2.inOut" });
    tl.to(circle2, { rotate: 0, duration: 1, ease: "power2.inOut" }, "<");
    tl.to(circle3, { rotate: 0, duration: 1, ease: "power2.inOut" }, "<");
  }

  // CIRCLE ROTATE LOOP
  gsap.set(circleRotate, { xPercent: -50, yPercent: -50 });
  gsap.to(circleRotate, {
    rotateZ: 360,
    repeat: -1,
    duration: 16,
    ease: "linear",
    scrollTrigger: {
      // The old page keyed this to #services; here the stage itself is the
      // trigger, so the module does not depend on the surrounding section id.
      trigger: stage,
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play pause play pause",
    },
  });
}
