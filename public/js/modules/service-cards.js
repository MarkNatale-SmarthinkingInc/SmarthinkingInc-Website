export function serviceCards() {
  let cards = gsap.utils.toArray(".service-card");
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: 40 });

  ScrollTrigger.batch(cards, {
    start: "top 85%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4",
        stagger: {
          amount: 0.3,
          from: "start",
        },
      }),
  });
}
