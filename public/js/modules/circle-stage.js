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

    // How far the stage starts pushed down, as a percent of its own height.
    // It is what lets the podium rise into place — and it is also the empty
    // band above the wheel, and the reason the spin used to begin while the
    // wheel was still below the fold. Both symptoms are this one number, so it
    // is cut to a fifth, and the spin start below is keyed to it.
    // Set it to 0 for no gap at all, at the cost of the rise.
    const RISE_PERCENT = 20;
    const riseOffset = () => stage.offsetHeight * (RISE_PERCENT / 100);

    gsap.set(circle1, { rotate: 135 });
    gsap.set(circle2, { rotate: -180 });
    gsap.set(circle3, { rotate: 180 });
    gsap.set(stageInner, { yPercent: RISE_PERCENT });

    // The whole sequence is scaled off this one number: how many viewport
    // heights of scrolling the sweep costs. The old Services page used 2.0
    // (1800px at 1440x900). The rotation itself is a fixed set of angles, so a
    // shorter distance does not truncate the sweep — the ring still travels
    // PHOTO round to PRODUCT in full, it just scrubs through in less page.
    // This is the dial: raise it for a slower, more drawn-out flourish, lower
    // it for a cheaper one.
    //
    // The pin is what buys the distance: it holds the circle still while the
    // page scrolls on beneath, so the sweep is watchable instead of racing past.
    // Both the rise and the pin below are derived from this, so they all stay
    // in proportion and there is only ever one number to change.
    //
    // The pin does require that no ancestor of #circle-stage sets
    // overflow:hidden. Clipping a pinned element's ancestor slices the circle
    // in half and makes the pin-spacer maths jump.
    const SPIN_VIEWPORTS = 1.5;
    const spinDistance = () => window.innerHeight * SPIN_VIEWPORTS;
    // The rise settles three quarters of the way through the spin — the ratio
    // the old page's 1350/1800 worked out to, kept so the choreography reads
    // the same at any distance.
    const RISE_FRACTION = 0.75;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        // Was "top bottom", which fired when the stage BOX crossed the viewport
        // bottom. The wheel sits riseOffset() lower than that box, so the spin
        // spent its first stretch turning off-screen. Offsetting the start by
        // exactly that much means the first frame of the spin coincides with
        // the wheel's top edge entering view.
        start: () => "top bottom-=" + riseOffset(),
        end: () => "+=" + spinDistance(),
        scrub: true,
      },
    });

    // Starts on the same frame as the spin — stageInner's top IS the wheel's
    // top edge, which is what the spin's offset start is keyed to.
    gsap.to(stageInner, {
      yPercent: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: stageInner,
        start: "top bottom",
        end: () => "+=" + spinDistance() * RISE_FRACTION,
        scrub: true,
      },
    });

    // The pin has to release exactly when the spin finishes, so its end is
    // derived from the spin rather than stated independently — otherwise
    // shifting the start would unpin the circle mid-sweep. Pin start is
    // "bottom bottom" (stage fully in view), which sits stageHeight past the
    // unshifted spin start, hence the subtraction.
    ScrollTrigger.create({
      trigger: stage,
      start: "bottom bottom",
      end: () => "+=" + (spinDistance() + riseOffset() - stage.offsetHeight),
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
