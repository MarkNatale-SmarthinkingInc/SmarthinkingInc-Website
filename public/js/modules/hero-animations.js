export function heroAnimations() {
  let fadeUp = document.querySelectorAll(".fadeUp");
  let menu = document.querySelector("#menu");
  let line = document.querySelectorAll(".v-line");
  let heroImg = document.querySelectorAll(".parallax");
  let heroSplit = new SplitText(".hero-split.chars", {
    type: "lines,words, chars",
  });
  let tl = gsap.timeline();

  gsap.set(menu, { opacity: 0, yPercent: 50 });
  gsap.set(fadeUp, { opacity: 0, y: 20 });
  gsap.set(line, { scaleY: 0, transformOrigin: "bottom center" });
  gsap.set(heroImg, { opacity: 0, scale: 1.1 });
  gsap.set(heroSplit.chars, {
    transformOrigin: "0% 100%",
    yPercent: 100,
    scaleX: 0.25,
    opacity: 0,
  });
  gsap.set("#smooth-wrapper", { opacity: 1 });
  if (
    document.querySelector(".home") ||
    document.querySelector(".services") ||
    document.querySelector(".about") ||
    document.querySelector(".work-detail")
  ) {
    if (!isMobile()) {
      smoother.paused(true);
    }
    tl.to(heroImg, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power4.inOut",
    });
    tl.to(
      heroSplit.chars,
      {
        duration: 1,
        yPercent: 0,
        scaleX: 1,
        opacity: 1,
        stagger: {
          amount: 0.3,
        },
        ease: "power4",
      },
      "-=1"
    );
    tl.to(
      line,
      {
        duration: 1,
        scaleY: 1,
        opacity: 1,
        ease: "power4.inOut",
      },
      "<"
    );
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: {
          from: "center",
          amount: 0.25,
        },
        ease: "power3",
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "-=.8"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
      },
      "-=1.1"
    );
  }

  if (document.querySelector(".service-detail")) {
    let fadeIn = document.querySelector(".fadeIn");
    let imgIn = document.querySelectorAll(".imgIn");
    gsap.set(fadeIn, { opacity: 0 });
    gsap.set(imgIn, { yPercent: 100 });
    if (!isMobile()) {
      smoother.paused(true);
    }

    tl.to(heroSplit.chars, {
      duration: 1,
      yPercent: 0,
      scaleX: 1,
      opacity: 1,
      stagger: {
        amount: 0.3,
      },
      ease: "power4",
    });
    tl.to(
      fadeIn,
      {
        duration: 1,
        opacity: 1,
        stagger: {
          amount: 0.3,
        },
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      imgIn,
      {
        duration: 1,
        yPercent: 0,
        stagger: {
          from: "center",
          amount: 0.25,
        },
        ease: "power3",
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "<"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
      },
      "-=1"
    );
  }
  if (document.querySelector(".work")) {
    let imgIn = document.querySelectorAll(".imgIn");
    gsap.set(imgIn, { yPercent: 100, opacity: 0 });
    if (!isMobile()) {
      smoother.paused(true);
    }

    tl.to(heroSplit.chars, {
      duration: 1,
      yPercent: 0,
      scaleX: 1,
      opacity: 1,
      stagger: {
        amount: 0.3,
      },
      ease: "power4",
    });
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "-=1"
    );
    tl.to(
      imgIn,
      {
        duration: 1,
        opacity: 1,
        yPercent: 0,
        stagger: {
          from: "left",
          amount: 0.4,
        },
        ease: "power3",
      },
      "<"
    );
  }
  if (document.querySelector(".blog")) {
    let fadeIn = document.querySelectorAll(".fadeIn");
    gsap.set(fadeIn, { opacity: 0 });
    if (!isMobile()) {
      smoother.paused(true);
    }
    tl.to(heroImg, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power4.inOut",
    });
    tl.to(
      heroSplit.chars,
      {
        duration: 1,
        yPercent: 0,
        scaleX: 1,
        opacity: 1,
        stagger: {
          amount: 0.3,
        },
        ease: "power4",
      },
      "-=1"
    );
    tl.to(
      fadeIn,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "-=.8"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
      },
      "-=1"
    );
  }
  if (document.querySelector(".blog-detail")) {
    let fadeIn = document.querySelectorAll(".fadeIn");
    gsap.set(fadeIn, { opacity: 0 });
    if (!isMobile()) {
      smoother.paused(true);
    }
    tl.to(heroSplit.chars, {
      duration: 1,
      yPercent: 0,
      scaleX: 1,
      opacity: 1,
      stagger: {
        amount: 0.3,
      },
      ease: "power4",
    });
    tl.to(
      fadeIn,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
        stagger: {
          amount: 0.35,
        },
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "-=.8"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
      },
      "-=1"
    );
  }
  if (document.querySelector(".contact")) {
    let fadeIn = document.querySelectorAll(".fadeIn");
    gsap.set(fadeIn, { opacity: 0 });
    if (!isMobile()) {
      smoother.paused(true);
    }
    tl.to(heroSplit.chars, {
      duration: 1,
      yPercent: 0,
      scaleX: 1,
      opacity: 1,
      stagger: {
        amount: 0.3,
      },
      ease: "power4",
    });
    tl.to(
      fadeIn,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
      },
      "-=.8"
    );
    tl.to(
      fadeUp,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power4",
        stagger: {
          amount: 0.2,
        },
        onComplete: () => {
          if (!isMobile()) {
            smoother.paused(false);
          }
        },
      },
      "-=.8"
    );
    tl.to(
      menu,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: "power2",
      },
      "-=1"
    );
  }
}
