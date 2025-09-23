export function testimonials() {
     let btn = document.querySelectorAll(".t-control button")
     let wrapper = document.querySelector(".testimonial-wrap")
     let tl = gsap.timeline()

     const activeItem = document.querySelector("[data-t-item].active");
     if (activeItem) {
          gsap.set(wrapper, { height: activeItem.offsetHeight });
     }

     btn.forEach(b => {
          b.addEventListener("click", function() {
               if(b.classList.contains("active")) return
               
               document.querySelector("button.active").classList.remove("active")
               b.classList.add("active")

               let curItem = document.querySelector("[data-t-item].active")
               let thisID = b.dataset.slide
               let nextItem = document.querySelector(`[data-t-item="${thisID}"]`)
               let newHeight = nextItem.offsetHeight
               gsap.set(nextItem, {x: 30, opacity: 0})
               // console.log(newHeight)

               curItem.classList.remove("active")
               nextItem.classList.add("active")
               
               tl.to(wrapper, {
                    height: newHeight,
                    duration: .8,
                    ease: "power4.inOut",
               })
               tl.to(curItem, {
                    position: "absolute",
                    x: -30,
                    opacity: 0,
                    duration: .4,
                    ease: "power4.in",
                    onStart: ()=> {
                         gsap.set(nextItem, {position: "relative"})
                    }
               },"<")
               tl.to(nextItem, {
                    x: 0,
                    position:"relative",
                    opacity: 1,
                    duration: .4,
                    ease: "power4",
                    onComplete: ()=> {
                         gsap.set(curItem, {x: 30})
                    }
               }, "-=.5")

          })
     })

}    