export function rotateSlider() {

     // gsap.to(".labels span div div", {
     //      motionPath: {
     //           path: ".slider-path",
     //           align: ".slider-path",
     //           autoRotate: true
     //      },
     //      immediateRender: true,
     //      duration: 10,
     //      repeat: -1,
     //      ease: "linear",
     //      stagger: {
     //           from: "end",
     //           amount: .8,
     //      },
     // })
     gsap.set(".circle-text", {
          attr: { startOffset: "-100vw" },
          duration: 5, 
          ease: "none",
          stagger:5
     })
     // gsap.timeline({repeat:-1})
     // //.set(".text", {textContent:"This is just a text."})

     // .to(".circle-text", {
     //      duration: 5,
     //      attr: { startOffset: "0%" },
     //      duration: 0.5, 
     //      stagger:5
     // })



}