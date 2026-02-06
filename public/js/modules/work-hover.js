export function workHover() {
  if (!isMobile() || window.innerWidth > 768) {
    const workListing = document.querySelector("#work");
    const items = workListing.querySelectorAll("article");
    let tl;

    items.forEach((i) => {
      const img = i.querySelectorAll("figure");
      const imgInner = i.querySelectorAll("figure img");
      const icon = i.querySelector("i");

      // ANIMATE ITEMS IN /////////////////////////////
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: i,
          start: "top 90%",
        },
      });

      tl.to(img, {
        x: 0,
        rotateZ: 0,
        duration: 0.8,
        ease: "power4",
        stagger: {
          amount: 0.1,
        },
      });

      gsap.set(icon, {
                             opacity: 0,
                              y: 20,
                         })

      // HOVER FUNCTION ///////////////////////////////
      i.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power4",
        });
        gsap.to(img, {
          scale: 0.95,
          duration: 0.45,
          ease: "power4",
        });
        gsap.to(imgInner, {
          scale: 1.1,
          duration: 0.45,
          ease: "power4",
        });
      });
      i.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          opacity: 0,
          y: 20,
          duration: 0.45,
          ease: "power4",
        });
        gsap.to(img, {
          scale: 1,
          duration: 0.45,
          ease: "power4",
        });
        gsap.to(imgInner, {
          scale: 1,
          duration: 0.45,
          ease: "power4",
        });
      });
    });
  }
}
