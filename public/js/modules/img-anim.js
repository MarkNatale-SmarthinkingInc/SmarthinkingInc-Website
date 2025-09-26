export function imgAnim() {
  let imgWrap = gsap.utils.toArray(".img-anim");
  gsap.set(document.querySelectorAll(".img-anim img"), {
    yPercent: 50,
    scale: 1.1,
  });

  ScrollTrigger.batch(imgWrap, {
    start: "top 85%",
    onEnter: (batch) => {
      const imgs = batch.flatMap((fig) =>
        Array.from(fig.querySelectorAll(":scope img"))
      );
      gsap.to(imgs, {
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power3",
        stagger: {
          each: 0.1,
          from: "start",
        },
      });
    },
  });
}
