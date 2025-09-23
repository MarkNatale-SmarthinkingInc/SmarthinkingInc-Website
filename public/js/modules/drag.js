export function drag() {
     gsap.registerPlugin(Draggable) 
     let dragSlider = document.querySelector(".slider-inner")
     let dragWrap = document.querySelector(".drag-slider")
     let images = dragSlider.querySelectorAll("figure")
     
     const tracker = InertiaPlugin.track(dragSlider, "x")[0];


     let pWidth
     let totalWidth

     let scrollWidth = function() {
          totalWidth = 0
          images.forEach(image => {
               pWidth = image.offsetWidth
               totalWidth += pWidth
          })
          return totalWidth
     }
     scrollWidth()

     Draggable.create(dragSlider, {
          type: "x",
          bounds: {
               minX: dragWrap.clientWidth - dragSlider.scrollWidth,
               maxX: 0
          },
          onDrag() {
               console.log(
                     InertiaPlugin.getVelocity(this.target, "x")
               )
          },
         
          inertia: true
     });
}