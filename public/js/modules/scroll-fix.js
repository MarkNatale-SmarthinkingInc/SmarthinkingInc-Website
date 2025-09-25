export function scrollFix() {
    let fixWrap = document.querySelector(".scroll-fix-wrap")
    
    let section = document.querySelectorAll(".scroll-fix").forEach(item => {
        ScrollTrigger.create({
            trigger: fixWrap,
            start:"top +=20",
            end: ()=> "+=" + (fixWrap.offsetHeight - item.offsetHeight),
            // markers: true,
            pin: item,
        })


    })

}