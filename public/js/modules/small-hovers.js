export function button() {

    // ARROW BUTTON WRAP
    let arBtn = document.querySelectorAll(".button-wrap");
    arBtn.forEach(button => {
        gsap.set(".button-wrap span:first-of-type ", { opacity: 0, yPercent: 100 });
        gsap.set(".button-wrap svg:first-of-type ", {
            opacity: 0,
            xPercent: -100,
            scale: 0.5
        });

        button.addEventListener("mouseenter", function () {
            gsap.to(".button-wrap span:first-of-type", {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap span:nth-of-type(2)", {
                yPercent: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap svg:first-of-type", {
                xPercent: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap svg:nth-of-type(2)", {
                xPercent: 100,
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                ease: "power3"
            });
        });

        button.addEventListener("mouseleave", function () {
            gsap.to(".button-wrap span:first-of-type", {
                yPercent: 100,
                opacity: 0,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap span:nth-of-type(2)", {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap svg:first-of-type", {
                xPercent: -100,
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                ease: "power3"
            });
            gsap.to(".button-wrap svg:nth-of-type(2)", {
                xPercent: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power3"
            });
        });

    })
    

}