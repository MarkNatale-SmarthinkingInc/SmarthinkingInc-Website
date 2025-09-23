export function textAnim() {
    

    let fontLoadA = new FontFaceObserver('Epica Pro');
    let fontLoadB = new FontFaceObserver('Epica Sans Pro');

    Promise.all([fontLoadA.load(), fontLoadB.load()]).then(function () {
        
        let splitChars = new SplitText(".split.chars", {type: "lines, chars"})
        let spitLines = new SplitText(".split.lines", {type: "lines"})
        
        // CHARS ANIMATION //////////////////////////////////////////////////////////////
        gsap.set(splitChars.chars, {
            transformOrigin: "0% 100%",
            //rotateZ: (Math.random() < 0.5 ? -1 : 1) * 45,
            xPercent: -50,
            scaleX: .25,
            opacity: 0,
        })
        ScrollTrigger.batch(splitChars.chars, {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                duration: 1,
                scaleX:1,
                xPercent: 0,
                stagger: {
                    amount: .25
                },
                ease: "expo"
            })
        });


        // LINES ANIMATION //////////////////////////////////////////////////////////////
        gsap.set(spitLines.lines, {
            opacity: 0,
            scaleX: .9,
            transformOrigin: "0% 100%",
            x: "-10%"
        })
        ScrollTrigger.batch(spitLines.lines, {
            start: "top 90%",
            onEnter: batch => gsap.to(batch, {
                x: 0,
                scaleX:1,
                duration: 1,
                opacity: 1,
                stagger: 0.05,
                ease: "power4"
            }),
        });
    }); 
}