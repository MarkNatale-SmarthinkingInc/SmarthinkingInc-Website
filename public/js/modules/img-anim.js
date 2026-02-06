export function imgAnim() {
  let imgWrap = gsap.utils.toArray(".img-anim");

        gsap.set(document.querySelectorAll(".img-anim img"), { scale: 1.2})

  ScrollTrigger.batch(imgWrap, {
    start: "top 99%",
    onEnter: (batch) => {
      const imgs = batch.flatMap((fig) =>
        Array.from(fig.querySelectorAll(":scope img"))
      );
      gsap.to(imgs, {
        scale:1,
        duration:1.5,
                                ease: "power4",
        stagger: {
          each: 0.1,
          from: "start",
        },
      });
    },
  });
}
