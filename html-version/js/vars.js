gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
gsap.config({nullTargetWarn: false,});


// VARIABLES
const bodyTag = document.querySelector("body")
const wrapperTag = document.querySelector("#smooth-wrapper")
const contentTag = document.querySelector("#smooth-content")

// IS MOBILE CONDITION
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
} 

// DEFINE OUR CUSTOM EASE
let customVal = "M0,0 C0.25,0 0.288,-0.004 0.404,0.112 0.54,0.248 0.487,0.707 0.594,0.882 0.65,0.974 0.698,1 1,1 "
let customEase = CustomEase.create("custom",customVal)


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FONT LOADER///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let fontLoadA = new FontFaceObserver('Epica Pro');
let fontLoadB = new FontFaceObserver('Epica Sans Pro');



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISABLE SCROLL ON mobile //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
     e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
     if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
     }
}
// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
     window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () { supportsPassive = true; } 
     }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
     window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
     window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
     window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
     window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScroll() {
     window.removeEventListener('DOMMouseScroll', preventDefault, false);
     window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
     window.removeEventListener('touchmove', preventDefault, wheelOpt);
     window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


// GET CURRENT YEAR /////////////////////////////////////////////////
// const thisYear =  function() {
//     let year = document.querySelector(".year")
//      const currentYear = new Date().getFullYear();
//      year.textContent = currentYear; 
// }



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SMOOTH SCROLLING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let smoother
function smoothScroll() {
    if(!isMobile() && window.innerWidth > 768 ) {
     
        smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
            //smoothTouch: .1
            effects: true, // looks for data-speed and data-lag attributes on elements
            normalizeScroll: true // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
            //ease: "elastic"
            //ignoreMobileResize: true // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
        });
    
        const scrollTo = gsap.utils.toArray(".scroll-to")
        scrollTo.forEach(st => {
            const scrollTarget = st.dataset.scroll
            st.addEventListener("click", function() {
            smoother.scrollTo("#" + scrollTarget, true, "top 0%")
            })
        })
    
          smoother.effects(".parallax img", {
               speed: "auto"
          })
          // smoother.effects(".lag", {
          //      speed: "auto"
          // })

        return smoother   
    }
}
