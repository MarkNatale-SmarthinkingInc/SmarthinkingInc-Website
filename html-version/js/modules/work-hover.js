export function workHover() {
     if(!isMobile() || window.innerWidth > 768) {
          const workListing = document.querySelector("#work")
          const items = workListing.querySelectorAll("article")
          let tl

          items.forEach(i => {
               let img = i.querySelectorAll("figure")
               let imgInner = i.querySelectorAll("figure img")
               let icon = i.querySelector("i")
               
               
               // ANIMATE ITEMS IN /////////////////////////////
               tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: i,
                         start: "top 90%",
                    }
               })

               tl.to(img, {
                    x:0,
                    rotateZ: 0,
                    duration: .8,
                    ease: "power4",
                    stagger: {
                         amount: .1
                    }
               })

               // HOVER FUNCTION ///////////////////////////////
               i.addEventListener("mouseenter", function() {

                    gsap.to(icon, {
                         opacity: 1,
                         y: 0,
                         duration: .45,
                         ease: "power4"
                    })
                    gsap.to(img, {
                         scale: .95,
                         duration: .45,
                         ease: "power4"
                    })
                    gsap.to(imgInner, {
                         scale: 1.1,
                         duration: .45,
                         ease: "power4"
                    })
               })
               i.addEventListener("mouseleave", function() {
                    gsap.to(icon, {
                         opacity: 0,
                         y: 20,
                         duration: .45,
                         ease: "power4"
                    })
                    gsap.to(img, {
                         scale: 1,
                         duration: .45,
                         ease: "power4"
                    })
                    gsap.to(imgInner, {
                         scale: 1,
                         duration: .45,
                         ease: "power4"
                    })
               })

          })
     }
}