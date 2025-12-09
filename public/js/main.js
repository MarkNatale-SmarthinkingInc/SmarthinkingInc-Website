import { drag } from "/js/modules/drag.js";
import { equalizer } from "/js/modules/equalizer.js";
import { home } from "/js/modules/home.js";
// IMPORT MODULES /////////////////////////////////////////////////////////////////////////////////
// import { scmoothScroll } from "/js/modules/smooth-scroll.js";
// import { bgNoise } from "/js/modules/bg-noise.js";
// import { navigation } from "/js/modules/hamburger.js";
// import { ddlMenu } from "/js/modules/ddl-menu.js";
// import { textAnim } from "/js/modules/text-anim.js";
import { heroAnimations } from "/js/modules/hero-animations.js";
import { imgAnim } from "/js/modules/img-anim.js";
import { menu } from "/js/modules/menu.js";
import { piano } from "/js/modules/piano.js";
import { services } from "/js/modules/services.js";
import { strings } from "/js/modules/strings.js";
import { stripeHover } from "/js/modules/stripe-hover.js";
import { testimonials } from "/js/modules/testimonials.js";
import { video } from "/js/modules/video.js";
import { workHover } from "/js/modules/work-hover.js";
import { work } from "/js/modules/work.js";
import { scrollFix } from "/js/modules/scroll-fix.js";
import { button, serviceStack } from "/js/modules/small-hovers.js";
import { rotateSlider, manifesto } from "/js/modules/about.js";
import { textAnim } from "/js/modules/text-anim.js";
import { error } from "/js/modules/error.js";
import { lazyLoad } from "/js/modules/lazy-load.js";

// Helper function to determine page namespace from pathname
const getPageNamespace = (pathname) => {
  if (pathname === "/" || pathname === "") {
    return "home";
  }
  if (pathname === "/about") {
    return "about";
  }
  if (pathname === "/services") {
    return "services";
  }
  if (pathname.startsWith("/services/")) {
    return "service-detail";
  }
  if (pathname === "/work") {
    return "work";
  }
  if (pathname.startsWith("/work/")) {
    return "work-detail";
  }
  if (pathname === "/blog") {
    return "blog";
  }
  if (pathname.startsWith("/blog/")) {
    return "blog-detail";
  }
  if (pathname === "/contact") {
    return "contact";
  }
  if (pathname === "/terms-of-service" || pathname === "/privacy-policy") {
    return "legal";
  }
  return "error";
};

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

// CHANGE NAVIGATION PAGE TITLE //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom event listener for afterLeave
document.addEventListener("pageToPage:afterLeave", () => {
  ScrollTrigger.killAll();
  if (!isMobile()) {
    smoother.kill();
  }
  window.scrollTo(0, 0);
});

menu();
bodyTag.classList.remove("loading");
const homeScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    button();
    textAnim();
    home();
    strings();
    workHover();
    equalizer();
  });
};
const aboutScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    button();
    strings();
    piano();
    textAnim();
    rotateSlider();
    manifesto();
    testimonials();
  });
};
const serviceScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    button();
    textAnim();
    imgAnim();
    strings();
    services();
    testimonials();
  });
};
const serviceDetailScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    serviceStack();
    button();
    strings();
    equalizer();
    stripeHover();
  });
};
const workScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    work();
    strings();
  });
};
const workDetailScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    strings();
    textAnim();
    imgAnim();
    workHover();
    button();
    drag();
    equalizer();
    video();
  });
};
const blogScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    scrollFix();
    button();
    strings();
    piano();
  });
};
const blogDetailScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    scrollFix();
    button();
    strings();
    piano();
  });
};
const contactScripts = () => {
  setTimeout(() => {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    button();
    strings();
  });
};

let legalScripts = () => {
  setTimeout(function () {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    strings();
    scrollFix();
  });
};
let errorScripts = () => {
  setTimeout(function () {
    lazyLoad();
    smoothScroll();
    heroAnimations();
    error();
    piano();
  });
};

function afterEnter(pageNamespace) {
  console.log("after hook triggered for", pageNamespace);

  let thisPage = document.querySelector("#menu .page-name");
  const pathname = window.location.pathname;
  let pageId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const name = pageId.replaceAll("-", " ");
  thisPage.innerHTML = name;

  if (isMobile()) {
    ScrollTrigger.refresh();
  }

  if (pageNamespace === "home") {
    homeScripts();
  } else if (pageNamespace === "about") {
    aboutScripts();
  } else if (pageNamespace === "services") {
    serviceScripts();
  } else if (pageNamespace === "service-detail") {
    serviceDetailScripts();
  } else if (pageNamespace === "work") {
    workScripts();
  } else if (pageNamespace === "work-detail") {
    workDetailScripts();
  } else if (pageNamespace === "blog") {
    blogScripts();
  } else if (pageNamespace === "blog-detail") {
    blogDetailScripts();
  } else if (pageNamespace === "contact") {
    contactScripts();
  } else if (pageNamespace === "legal") {
    legalScripts();
  } else if (pageNamespace === "error") {
    errorScripts();
  }
}

// on event of type "pageToPage:afterEnter", it should retrigger the afterEnter function
document.addEventListener("pageToPage:afterEnter", (event) => {
  const pageNamespace = event.detail?.pageNamespace;
  if (pageNamespace) {
    afterEnter(pageNamespace);
  }
});

// first time page load
const pageNamespace = getPageNamespace(window.location.pathname);
afterEnter(pageNamespace);
