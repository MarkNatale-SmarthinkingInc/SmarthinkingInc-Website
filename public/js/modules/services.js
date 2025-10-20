export function services() {
  let circleRotate = document.querySelector("#circle-stage .circle-rotate");

  // ANIMATE OUR PODIUM /////////////////////////////////////////////////////////////////////////
  if (!isMobile() || window.innerWidth > 768) {
    const stage = document.querySelector("#circle-stage");
    const stageInner = document.querySelector(".stage-inner");

    let circle1 = stage.querySelector(".circle-1");
    let circle2 = stage.querySelector(".circle-2 ");
    let circle3 = stage.querySelector(".circle-3");

    gsap.set(circle1, { rotate: 135 });
    gsap.set(circle2, { rotate: -180 });
    gsap.set(circle3, { rotate: 180 });
    gsap.set(".stage-inner", { yPercent: 50 });

    let tl = gsap.timeline({
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

    tl.to(circle1, {
      rotate: 0,
      duration: 1,
      ease: "power2.inOut",
    });
    tl.to(
      circle2,
      {
        rotate: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "<"
    );
    tl.to(
      circle3,
      {
        rotate: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "<"
    );

    // FIX CANVAS ON SCROLL /////////////////////////////////////////////////////////////////////////
    let canvasWrap = document.querySelector(".canvas-wrap");
    let height = document.querySelector(".service-listing").offsetHeight;

    ScrollTrigger.create({
      trigger: canvasWrap,
      start: "top top",
      end: () => "+=" + height,
      pin: true,
    });
  }

  // CIRCLE ROTATE LOOP
  gsap.set(circleRotate, {
    xPercent: -50,
    yPercent: -50,
  });
  gsap.to(circleRotate, {
    rotateZ: 360,
    repeat: -1,
    duration: 16,
    ease: "linear",
    scrollTrigger: {
      trigger: "#services",
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play pause play pause",
    },
  });
}
