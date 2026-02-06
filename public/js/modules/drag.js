export function drag() {
  const wrap = document.querySelector(".drag-slider");
  if (!wrap) return;

  gsap.registerPlugin(Draggable);

  const dragSlider = wrap.querySelector(".slider-inner");
  const images = Array.from(dragSlider.querySelectorAll("figure"));
  const dragProgress = wrap.querySelector(".drag-inner");

  // Buttons (optional)
  const prevBtn = wrap.querySelector(".drag-btn--prev");
  const nextBtn = wrap.querySelector(".drag-btn--next");

  // Bounds + anchor (your desired left inset)
  let maxX = gsap.getProperty(dragSlider, "x") || 0; // current "rest" position (often 0)
  let sliderWidth = wrap.clientWidth - dragSlider.scrollWidth; // negative
  let minX = maxX + sliderWidth;

  // Keep this offset forever (includes margins/gutters/padding)
  let anchorLeft = images[0]?.getBoundingClientRect().left ?? 0;

  // Track current slide index (optimization)
  let currentIndex = 0;

  const updateBounds = () => {
    maxX = gsap.getProperty(dragSlider, "x") || 0;
    sliderWidth = wrap.clientWidth - dragSlider.scrollWidth;
    minX = maxX + sliderWidth;
  };

  const updateProgress = () => {
    // progress 0..1 across [maxX..minX]
    const x = gsap.getProperty(dragSlider, "x");
    const denom = (minX - maxX) || 1;
    const progress = (x - maxX) / denom;
    gsap.set(dragProgress, { scaleX: progress });
  };

  // Find closest slide to the anchor (run only on drag end / throw complete / init / resize)
  const setCurrentIndexFromPosition = () => {
    if (!images.length) return;

    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < images.length; i++) {
      const d = Math.abs(images[i].getBoundingClientRect().left - anchorLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    currentIndex = best;
  };

  // Move so that slide i lands exactly at anchorLeft
  const goToIndex = (i) => {
    if (!images.length) return;

    currentIndex = gsap.utils.clamp(0, images.length - 1, i);

    // Single layout read for target (fast)
    const targetLeft = images[currentIndex].getBoundingClientRect().left;
    const currentX = gsap.getProperty(dragSlider, "x");

    const delta = anchorLeft - targetLeft;
    const nextX = gsap.utils.clamp(minX, maxX, currentX + delta);

    gsap.to(dragSlider, {
      x: nextX,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        draggable.update(); // keep Draggable in sync
        updateProgress();
      },
      onComplete: () => {
        // Ensure index remains correct (e.g. if clamped)
        setCurrentIndexFromPosition();
      }
    });
  };

  // --- Create Draggable
  updateBounds();

  const draggable = Draggable.create(dragSlider, {
    type: "x",
    inertia: true,
    edgeResistance: 0.85,
    throwResistance: 2000,
    bounds: { minX, maxX },

    onDrag() {
      updateProgress();
      gsap.to(images, { scale: 0.95, duration: 0.5, ease: "power4" });
    },
    onThrowUpdate() {
      updateProgress();
    },
    onRelease() {
      gsap.to(images, { scale: 1, duration: 0.5, ease: "power4" });
    },

    // Optimized: only scan for closest slide when interaction ENDS
    onDragEnd() {
      setCurrentIndexFromPosition();
    },
    onThrowComplete() {
      setCurrentIndexFromPosition();
    }
  })[0];

  // Buttons: move by 1
  prevBtn?.addEventListener("click", () => goToIndex(currentIndex - 1));
  nextBtn?.addEventListener("click", () => goToIndex(currentIndex + 1));

  // Init progress + index
  updateProgress();
  setCurrentIndexFromPosition();

  // Resize: layout changes => recalc anchor + bounds
  window.addEventListener("resize", () => {
    if (!images.length) return;

    // recapture inset from current layout
    anchorLeft = images[0].getBoundingClientRect().left;

    updateBounds();
    draggable.applyBounds({ minX, maxX });

    // clamp current x
    const x = gsap.getProperty(dragSlider, "x");
    gsap.set(dragSlider, { x: gsap.utils.clamp(minX, maxX, x) });

    draggable.update();
    updateProgress();
    setCurrentIndexFromPosition();
  });
}
