export function home() {


     // TESTIMONIAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     
     // ROTATE IMAGE ///////////////////////////////////////////////////////////
     let rotateImg = document.querySelector("#testimonials .rotate-img ");
     let rotateTl = gsap.timeline({
          repeat: -1,
          scrollTrigger: {
               trigger: "#testimonials",
               start: "top bottom",
               end: "bottom top",
               toggleActions: "play pause play pause"
          }
     });

     rotateTl.to(rotateImg, {
          rotateZ: 360,
          duration: 50,
          ease: "linear",
     });

     // TESTIMONIAL ////////////////////////////////////////////////////

     const slides = document.querySelectorAll(".t-item");
     const imgs   = document.querySelectorAll(".t-image img");
     const wrap   = document.querySelector(".t-content");
     const btnPrev = document.querySelector(".arrow-left");
     const btnNext = document.querySelector(".arrow-right");

     let current = 0;
     let animating = false;

     // --- init text slides
     slides.forEach((s,i)=>{
          if(i === 0){
               s.style.position = "relative";
               gsap.set(s, { x:0, rotateZ:0, autoAlpha:1 });
          } else {
               s.style.position = "absolute";
               gsap.set(s, { x:100, rotateZ:5, autoAlpha:0 });
          }
     });

     // --- init image slides
     imgs.forEach((img,i)=>{
          if(i === 0){
               img.style.position = "relative";
               gsap.set(img, { scale: 1 });
          } else {
               img.style.position = "absolute";
               gsap.set(img, { scale: 0 });
          }
     });

     gsap.set(wrap, { height: slides[0].offsetHeight });

     function updateButtons(effectiveIndex = current) {
          const atFirst = effectiveIndex === 0;
          const atLast  = effectiveIndex === slides.length - 1;

          btnPrev.disabled = atFirst;
          btnNext.disabled = atLast;
     }

     function showSlide(nextIndex, dir) {
          if(animating || nextIndex===current || nextIndex<0 || nextIndex>=slides.length) return;
          animating = true;

          updateButtons(nextIndex);


          const curSlide = slides[current];
          const nxtSlide = slides[nextIndex];
          const curImg   = imgs[current];
          const nxtImg   = imgs[nextIndex];

          // direction offsets for text
          const outX = dir==="right" ? -100 : 100;
          const inX  = dir==="right" ?  100 : -100;
          const outZ = dir==="right" ? -5 : 5;

          const tl = gsap.timeline({
               defaults: {duration:1.5, ease:"expo.inOut"},
               onComplete: ()=>{
                    // finalize: only active text slide
                    slides.forEach((s,i)=>{
                         if(i === nextIndex){
                              s.style.position = "relative";
                              gsap.set(s, { x:0, autoAlpha:1 });
                         } else {
                              s.style.position = "absolute";
                              gsap.set(s, { autoAlpha:0 });
                         }
                    });
                    // finalize: only active image
                    imgs.forEach((img,i)=>{
                         if(i === nextIndex){
                              img.style.position = "relative";
                              gsap.set(img, { scale: 1 });
                         } else {
                              img.style.position = "absolute";
                              gsap.set(img, { scale: 0 });
                         }
                    });
                    current = nextIndex;
                    animating = false;
                    updateButtons();
               }
          });

          // animate wrapper height (for text only)
          tl.to(wrap, { 
               height: nxtSlide.offsetHeight, 
               duration: 1.5, 
               ease: "power2.inOut" 
          }, 0);

          // text crossfade with directional slide
          tl.set(nxtSlide, {x:inX, autoAlpha:0, zIndex:2, position:"absolute"})
               .set(curSlide, {zIndex:1})
               .to(curSlide, {x:outX, rotateZ: outZ, autoAlpha:0}, 0)
               .to(nxtSlide, {x:0, rotateZ: 0, autoAlpha:1}, 0);

          // image overlap scale effect
          tl.set(nxtImg, {scale:0, autoAlpha:1, zIndex:3, position:"absolute"}, 0) // stage on top
               .set(curImg, {zIndex:2}, 0) // keep current just below
               .to(nxtImg, {scale:1, duration:1.5, ease:"expo.inOut"}, 0);



          // after animation, snap old images
          tl.call(() => {
               imgs.forEach((img,i)=>{
                    if(i === nextIndex){
                         img.style.position = "relative";
                         gsap.set(img, { scale: 1 });
                    } else {
                         img.style.position = "absolute";
                         gsap.set(img, { scale: 0 });
                    }
               });
          });
     }


     btnPrev.addEventListener("click",()=> showSlide(current-1,"left"));
     btnNext.addEventListener("click",()=> showSlide(current+1,"right"));

     updateButtons();


}