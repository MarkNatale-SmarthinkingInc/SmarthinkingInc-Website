export function work() {

      if(!isMobile() || window.innerWidth > 768) {
          let workItem = document.querySelectorAll("#work article")

          workItem.forEach(wi => {
               let img1 = wi.querySelector(".scroll-img-1")
               let img2 = wi.querySelector(".scroll-img-2")
               let text = wi.querySelector(".scroll-text")

               let offset1 = wi.clientHeight - img1.offsetTop  - img1.offsetHeight - (Math.round(window.innerWidth / 100 * 2.77776));
               let offset2 = wi.clientHeight - img2.offsetTop  - img2.offsetHeight - (Math.round(window.innerWidth / 100 * 2.77776));
               let offset3 = wi.clientHeight - text.offsetTop  - text.offsetHeight - (Math.round(window.innerWidth / 100 * 2.77776));
               let tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: wi,
                         start: "top 50%",
                         end: "bottom 50%",
                         scrub: true,
                    }
               })

               tl.to(img1, {
                    y: offset1,
                    ease: "linear"
               })
               tl.to(img2, {
                    y: offset2,
                    ease: "linear"
               }, "<")
               tl.to(text, {
                    y: offset3,
                    ease: "linear"
               }, "<")

               console.log(offset1)


          })
     }
     
}