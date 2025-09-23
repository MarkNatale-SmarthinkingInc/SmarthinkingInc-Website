import { drag } from "/js/modules/drag.js";
import { equalizer } from "/js/modules/equalizer.js";
import { home } from "/js/modules/home.js";
import { lazyLoad } from "/js/modules/lazy-load.js";
// IMPORT MODULES /////////////////////////////////////////////////////////////////////////////////
// import { scmoothScroll } from "/js/modules/smooth-scroll.js";
// import { bgNoise } from "/js/modules/bg-noise.js";
// import { navigation } from "/js/modules/hamburger.js";
// import { ddlMenu } from "/js/modules/ddl-menu.js";
// import { textAnim } from "/js/modules/text-anim.js";
import { menu } from "/js/modules/menu.js";
import { piano } from "/js/modules/piano.js";
import { services } from "/js/modules/services.js";
import { strings } from "/js/modules/strings.js";
import { stripeHover } from "/js/modules/stripe-hover.js";
import { testimonials } from "/js/modules/testimonials.js";
import { video } from "/js/modules/video.js";
import { workHover } from "/js/modules/work-hover.js";
import { work } from "/js/modules/work.js";

// import { cursor } from "/js/modules/custom-cursor.js";
// import { buttons, circleButtons, marquise, accordion, directionSpin, inView, locationView, customSelect} from "/js/modules/small-animations.js";
// import { testimonials } from "/js/modules/testimonials.js";
// import { video } from "/js/modules/video.js";
// import { spinner } from "/js/modules/spinner.js";
// import { timeline } from "/js/modules/timeline.js";
// import { svgLineAnim } from "/js/modules/svg-line-anim.js";
// import { teamBio } from "/js/modules/team.js";
// import { locationSlider } from "/js/modules/location-slider.js";
// import { sharePin } from "/js/modules/blog.js";
// import { lazyLoad } from "/js/modules/lazy-load.js";

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};
document.documentElement.className = "js";

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Perform your layout testing or recalculations
  }, 200); // Adjust as needed
});

// HOME PAGE INTRO ANIMATION ===========================================================================
const intro = () => {
  if (
    document.querySelector(".home") &&
    document.querySelector("body").classList.contains("loading")
  ) {
    bodyTag.classList.remove("loading");
  } else if (
    document.querySelector(".home") &&
    !document.querySelector("body").classList.contains("loading")
  ) {
  }
};
intro();

// CHANGE NAVIGATION PAGE TITLE //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BARBA //////////////////////////////////////////////////////////////////////////////////////////////////

// Initialize Barba.js
barba.init({
  debug: true, // Enables detailed debugging logs
  transitions: [
    {
      name: "fade",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        });
      },

      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 1,
          ease: "power2",
        });
      },
    },
  ],
});

// Global Hook for beforeEnter
barba.hooks.beforeLeave((data) => {
  data.current.container.querySelectorAll(".string-canvas").forEach((w) => {
    w.__stringsDestroy__ && w.__stringsDestroy__();
  });
  if (window.pianoDestroy) window.pianoDestroy(); // stops and cleans up
  if (window.equalizerDestroy) window.equalizerDestroy();
  gsap.to(".page-name", {
    opacity: 0,
    yPercent: -50,
    duration: 0.35,
    ease: "power4.in",
  });
});

// Global Hook for afterLeave
barba.hooks.afterLeave((data) => {
  ScrollTrigger.killAll();
  window.scrollTo(0, 1);
});

// Global Hook for beforeEnter
barba.hooks.beforeEnter((data) => {
  // GET NEW PAGE NAME
  const thisPage = document.querySelector("#menu .page-name");
  const pageId = data.next.namespace;
  thisPage.innerHTML = pageId;

  gsap.set(".page-name", {
    opacity: 0,
    yPercent: 50,
    duration: 0.35,
    ease: "power4.in",
  });
});

// Global Hook for afterEnter
barba.hooks.afterEnter((data) => {
  // GET NEW PAGE NAME
  const thisPage = document.querySelector("#menu .page-name");
  const pageId = data.next.namespace;
  thisPage.innerHTML = pageId;

  gsap.to(".page-name", {
    opacity: 1,
    yPercent: 0,
    duration: 0.75,
    ease: "power4.inOut",
  });

  if (data.next.namespace === "home") {
    console.log("after hook triggered for", data.next.namespace);
    homeScripts();
  } else if (data.next.namespace === "about") {
    console.log("after hook triggered for", data.next.namespace);
    aboutScripts();
  } else if (data.next.namespace === "services") {
    console.log("after hook triggered for", data.next.namespace);
    serviceScripts();
  } else if (data.next.namespace === "service-detail") {
    console.log("after hook triggered for", data.next.namespace);
    serviceDetailScripts();
  } else if (data.next.namespace === "work") {
    console.log("after hook triggered for", data.next.namespace);
    workScripts();
  } else if (data.next.namespace === "work-detail") {
    console.log("after hook triggered for", data.next.namespace);
    workDetailScripts();
  } else if (data.next.namespace === "blog") {
    console.log("after hook triggered for", data.next.namespace);
    blogScripts();
  } else if (data.next.namespace === "blog-detail") {
    console.log("after hook triggered for", data.next.namespace);
    blogDetailScripts();
  } else if (data.next.namespace === "contact") {
    console.log("after hook triggered for", data.next.namespace);
    contactScripts();
  }
});
barba.use(barbaPrefetch);

menu();
const homeScripts = () => {
  setTimeout(() => {
    smoothScroll();
    home();
    strings();
    workHover();
    equalizer();
    lazyLoad();
  });
};
const aboutScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    piano();
    testimonials();
    lazyLoad();
  });
};
const serviceScripts = () => {
  setTimeout(() => {
    bodyTag.classList.remove("loading");
    smoothScroll();
    strings();
    services();
    testimonials();
    lazyLoad();
  });
};
const serviceDetailScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    workHover();
    equalizer();
    stripeHover();
    lazyLoad();
  });
};
const workScripts = () => {
  setTimeout(() => {
    smoothScroll();
    work();
    strings();
    lazyLoad();
  });
};
const workDetailScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    workHover();
    drag();
    equalizer();
    lazyLoad();
    video();
  });
};
const blogScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    piano();
    lazyLoad();
  });
};
const blogDetailScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    piano();
    lazyLoad();
  });
};
const contactScripts = () => {
  setTimeout(() => {
    smoothScroll();
    strings();
    lazyLoad();
  });
};
