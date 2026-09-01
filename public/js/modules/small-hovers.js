export function button() {
  // ARROW BUTTON WRAP
  //
  // Every selector below is scoped to the button being hovered. They used to be
  // page-wide strings (".button-wrap span:first-of-type"), so hovering any one
  // button drove the arrows and labels on EVERY button on the page — and the
  // gsap.set initialisation re-ran over all of them once per button.
  const arBtn = document.querySelectorAll(".button-wrap");
  arBtn.forEach((button) => {
    // Same selectors as before, just rooted at this wrap. Buttons without an
    // icon or a duplicated label (e.g. the plain service-card button) simply
    // yield empty lists, which GSAP treats as a no-op.
    const labelIn = button.querySelectorAll("span:first-of-type");
    const labelOut = button.querySelectorAll("span:nth-of-type(2)");
    const arrowIn = button.querySelectorAll("svg:first-of-type");
    const arrowOut = button.querySelectorAll("svg:nth-of-type(2)");

    gsap.set(labelIn, { opacity: 0, yPercent: 100 });
    gsap.set(arrowIn, { opacity: 0, xPercent: -100, scale: 0.5 });

    const DUR = 0.5;
    const EASE = "power3";

    button.addEventListener("mouseenter", function () {
      gsap.to(labelIn, { yPercent: 0, opacity: 1, duration: DUR, ease: EASE });
      gsap.to(labelOut, { yPercent: -100, opacity: 0, duration: DUR, ease: EASE });
      gsap.to(arrowIn, { xPercent: 0, opacity: 1, scale: 1, duration: DUR, ease: EASE });
      gsap.to(arrowOut, { xPercent: 100, opacity: 0, scale: 0.5, duration: DUR, ease: EASE });
    });

    button.addEventListener("mouseleave", function () {
      gsap.to(labelIn, { yPercent: 100, opacity: 0, duration: DUR, ease: EASE });
      gsap.to(labelOut, { yPercent: 0, opacity: 1, duration: DUR, ease: EASE });
      gsap.to(arrowIn, { xPercent: -100, opacity: 0, scale: 0.5, duration: DUR, ease: EASE });
      gsap.to(arrowOut, { xPercent: 0, opacity: 1, scale: 1, duration: DUR, ease: EASE });
    });
  });
}

export function serviceStack() {
  let items = gsap.utils.toArray(".service-list article");
  gsap.set(items, { xPercent: 50 });
  items.forEach((i) => {
    let no = i.querySelector("& > div:first-of-type");
    if (!isMobile()) {
      gsap.set(no, { xPercent: 300 });
    } else {
      gsap.set(no, { xPercent: 50 });
    }
    let serviceAnim = gsap.timeline({
      scrollTrigger: {
        trigger: i,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    });

    serviceAnim.to(i, {
      xPercent: 0,
      duration: 1,
      ease: "power2",
    });
    serviceAnim.to(
      no,
      {
        xPercent: 0,
        duration: 1,
        ease: "power2",
      },
      "<"
    );
  });
}
