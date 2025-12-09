const buildBlurSrc = (src) => {
  try {
    const url = new URL(src);
    url.searchParams.set("w", "60");
    url.searchParams.set("blur", "40");
    return url.toString();
  } catch (error) {
    // Fallback for non-URL-friendly strings
    const hasQuery = src.includes("?");
    const widthUpdated = src.replace(/([?&])w=\d+/i, "$1w=60");
    const withWidth =
      widthUpdated === src ? `${src}${hasQuery ? "&" : "?"}w=60` : widthUpdated;
    const blurUpdated = withWidth.replace(/([?&])blur=\d+/i, "$1blur=40");
    return blurUpdated === withWidth ? `${withWidth}&blur=40` : blurUpdated;
  }
};

export function lazyLoad() {
  ScrollTrigger.config({ limitCallbacks: true });

  gsap.utils.toArray("img.lazy").forEach((node) => {
    const image = node;
    if (image.dataset.lazyProcessed === "true") return;

    const fullSrc = image.dataset.fullsrc ?? image.getAttribute("src");
    const fullSrcSet = image.dataset.fullsrcset ?? image.getAttribute("srcset");
    if (!fullSrc) return;

    image.dataset.fullsrc = fullSrc;
    if (fullSrcSet) {
      image.dataset.fullsrcset = fullSrcSet;
      image.removeAttribute("srcset");
    }

    const placeholderSrc = buildBlurSrc(fullSrc);
    image.src = placeholderSrc;
    image.dataset.lazyProcessed = "true";

    const loadHighRes = () => {
      if (image.dataset.loaded === "true") return;

      const loader = new Image();
      if (fullSrcSet) loader.srcset = fullSrcSet;
      loader.src = fullSrc;

      loader.onload = () => {
        if (fullSrcSet) image.srcset = fullSrcSet;
        image.src = fullSrc;
        image.dataset.loaded = "true";
        image.classList.add("is-loaded");
      };

      loader.onerror = () => {
        image.dataset.loaded = "error";
      };
    };

    if (image.complete) {
      loadHighRes();
    } else {
      image.addEventListener("load", loadHighRes, { once: true });
    }
  });
}
