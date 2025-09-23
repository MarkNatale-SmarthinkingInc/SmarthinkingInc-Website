export function menu() {
     
     // console.log("menu")
     let overlay = document.querySelector("#page-overlay"),
          menu = document.querySelector("#menu"),
          nav = document.querySelector("#nav"),
          menuLinks = document.querySelectorAll("#nav .nav-links a"),
          social = document.querySelector("#nav .nav-social"),
          hamburgerWrap = document.querySelector(".hamburger-wrap"),
          hamburger = document.querySelector("#hamburger"),
          hambIcon = document.querySelector("#hamburger img"),
          openNav = gsap.timeline({paused: true}),
          closeNav = gsap.timeline({paused: true})

          gsap.set(".nav-links", {perspective: "200px"} )
          gsap.set(menuLinks, {rotateX: 35, opacity: 0})

     // OPEN NAV ///////////////////////////////////////////////////////////////
     openNav.to(hambIcon, {
          rotate: 45,
          duration: .75,
          ease: "power4.inOut",
          onStart: () => {
               if(!isMobile()) {
                  smoother.paused(true)  
               }
          }
     })
     openNav.to(overlay, {
          opacity: .75,
          duration: .75,
          ease: "power4.inOut"
     }, "<")
     openNav.to(hamburger, {
          backgroundColor: "#807B66",
          duration: .75,
          ease: "power4.inOut"
     }, "<")
     openNav.to(social, {
          y: "0%",
          opacity: 1,
          duration: .5,
          ease: "power4"
     }, "-=.4")
     openNav.to(menuLinks, {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: .4,
          stagger: {
               amount: .1,
               from: "end"
          },
          ease: "power4"
     }, "<")

     // Close NAV ///////////////////////////////////////////////////////////
     closeNav.to(hambIcon, {
          rotate: 0,
          duration: .75,
          ease: "power4.inOut"
     })
     closeNav.to(overlay, {
          opacity: 0,
          duration: .75,
          ease: "power4.inOut"
     }, "<")
     closeNav.to(hamburger, {
          backgroundColor: "#99947E",
          duration: .75,
          ease: "power4.inOut",
     }, "<")
     closeNav.to(social, {
          opacity: 0,
          duration: .2,
          ease: "power4.in"
     }, "<")
     closeNav.to(menuLinks, {
          opacity: 0,
          duration: .2,
          ease: "power4.in",
          onComplete: () => {
                if(!isMobile()) {
                  smoother.paused(false)  
               }
          }
     }, "<")
     

     // OPEN CLOSE NAV //////////////////////////////////////////////////////////////////////////////
     hamburgerWrap.addEventListener("click", function() {
          if(!this.classList.contains("opened") && !openNav.isActive() && !closeNav.isActive()) {
               this.classList.add("opened")
               menu.classList.add("active")
               nav.classList.add("active")
               openNav.restart()
          } else if (this.classList.contains("opened") && !openNav.isActive() && !closeNav.isActive()) {
               this.classList.remove("opened")
               menu.classList.remove("active")
               nav.classList.remove("active")
               closeNav.restart()
          }
     })

     // KILL NAV WHEN LINKS ARE CLICKED ///////////////////////////////////////////////////////////
     menuLinks.forEach(ml => {
          ml.addEventListener("click", function(){
               hamburgerWrap.classList.remove("opened")
               menu.classList.remove("active")
               nav.classList.remove("active")
               closeNav.restart()
          })
     })

}