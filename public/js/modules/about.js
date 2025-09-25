
// SLIDER ******************************************************************************
export function rotateSlider() {
    let slider = document.querySelector(".circle-slider")
    let circle = document.querySelectorAll(".arc-path img")
    let images = document.querySelectorAll(".slider-img figure:not(:first-of-type)")
    gsap.set(circle, {rotateZ: -100}); // 97 out value
    gsap.set(images, {scale: 0}); // 97 out value
    
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: slider,
            start: "top +=100",
            end: () =>  "+=" + (slider.offsetHeight * 2),
            toggleActions: "play none reverse play",
            pin: true,
            scrub: true,
        }
    })

    tl.to(circle, {
        rotateZ: 93,
        duration: 6,
        ease: "linear"
    })
    tl.to(images, {
        scale:1,
        duration:1,
        stagger: {
            each: 1.25
        },
        ease: "linear"
    },"<")

}

// MANIFESTO ******************************************************************************
export function manifesto() {

    let mItem = document.querySelectorAll(".m-list-item")
    let mNo = document.querySelectorAll(".m-list-item .f-32")
    gsap.set(mItem, {xPercent: 33})
    gsap.set(mNo, {x: 150, scale: .2})

    mItem.forEach(item => {
        let thisNo = item.querySelector(".f-32")
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center",
                scrub: true
            },
        })
        

        tl.to(item, {
            xPercent: 0,
            duration: 1,
            ease: "power3",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top center",
                scrub: true
            },
        })
        tl.to(thisNo, {
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3"
        },"<")

    })

}