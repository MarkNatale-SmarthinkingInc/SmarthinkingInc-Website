export function drag() {
     if (document.querySelector(".drag-slider")) {
          gsap.registerPlugin(Draggable) 
          let dragSlider = document.querySelector(".slider-inner")
          let dragWrap = document.querySelector(".drag-slider")
          let images = dragSlider.querySelectorAll("figure")
          let dragProgress = document.querySelector(".drag-inner")
          let sliderWidth = dragWrap.clientWidth - dragSlider.scrollWidth
     
          let scaleVal
          Draggable.create(dragSlider, {
               type: "x",
               inertia: true,
               edgeResistance: 0.85,
               throwResistance: 2000,
               bounds: {
                    minX: sliderWidth,
                    maxX: 0
               },
               onDrag() {
                    // console.log(
                    //       InertiaPlugin.getVelocity(this.target, "x")
                    // )
                    scaleVal = parseFloat(((100 / sliderWidth)* ( dragSlider.getBoundingClientRect().left - dragSlider.offsetLeft)) / 100 ).toFixed(2)
                    gsap.set(dragProgress, {
                         scaleX: scaleVal
                    })
                    gsap.to(images, {
                         scale: .95,
                         duration: .5,
                         ease: "power4"
                    })
               },
               onThrowUpdate() {
                    scaleVal = parseFloat(((100 / sliderWidth)* ( dragSlider.getBoundingClientRect().left - dragSlider.offsetLeft)) / 100 ).toFixed(2)
                    gsap.set(dragProgress, {
                         scaleX: scaleVal
                    })
                    // console.log(scaleVal)
                    
               },
               onRelease() {
                    gsap.to(images, {
                         scale: 1,
                         duration: .5,
                         ease: "power4"
                    })
               }
          
          });
     }
     
}