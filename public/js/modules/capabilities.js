export function capabilities() {
  const groups = gsap.utils.toArray(".capability-group");
  if (!groups.length) return;

  const DURATION = 0.5;
  const EASE = "power3.inOut";

  const open = (item) => {
    const panel = item.querySelector(".capability-panel");
    const toggle = item.querySelector(".capability-toggle");
    item.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    gsap.to(panel, {
      height: "auto",
      opacity: 1,
      duration: DURATION,
      ease: EASE,
      overwrite: true,
    });
  };

  const close = (item) => {
    const panel = item.querySelector(".capability-panel");
    const toggle = item.querySelector(".capability-toggle");
    item.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: DURATION,
      ease: EASE,
      overwrite: true,
    });
  };

  groups.forEach((group) => {
    const items = gsap.utils.toArray(".capability", group);

    // Closed by default, and set here rather than in CSS so the panel height
    // is a real number GSAP can animate from on the first click.
    items.forEach((item) => {
      gsap.set(item.querySelector(".capability-panel"), {
        height: 0,
        opacity: 0,
      });
    });

    items.forEach((item) => {
      const toggle = item.querySelector(".capability-toggle");

      toggle.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // One open panel per column. The outgoing panel collapses on the same
        // timeline as the incoming one expands — sequencing them would make
        // every switch cost two full animations.
        items.forEach((other) => {
          if (other !== item && other.classList.contains("is-open")) {
            close(other);
          }
        });

        if (isOpen) {
          close(item);
        } else {
          open(item);
        }
      });
    });
  });
}
