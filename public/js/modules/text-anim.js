export function textAnim() {
  let fontLoadA = new FontFaceObserver("Epica Pro");
  let fontLoadB = new FontFaceObserver("Epica Sans Pro");

  Promise.all([fontLoadA.load(), fontLoadB.load()]).then(function () {
    let splitChars = new SplitText(".split.chars", { type: "lines, chars" });
    let spitLines = new SplitText(".split.lines", { type: "lines" });
    let splitWords = new SplitText(".split.words", { type: "lines, words" });

    // CHARS ANIMATION //////////////////////////////////////////////////////////////
    gsap.set(splitChars.chars, {
      transformOrigin: "0% 100%",
      yPercent: 100,
      scaleX: 0.25,
      opacity: 0,
    });
    ScrollTrigger.batch(splitChars.chars, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          yPercent: 0,
          scaleX: 1,
          opacity: 1,
          duration: 1,
          stagger: {
            amount: 0.3,
          },
          ease: "power4",
        }),
    });

    // LINES ANIMATION //////////////////////////////////////////////////////////////
    gsap.set(spitLines.lines, {
      opacity: 0,
      yPercent: 100,
      rotateZ: -2,
      transformOrigin: "0% 100%",
    });
    ScrollTrigger.batch(spitLines.lines, {
      start: "top 90%",
      onEnter: (batch) =>
        gsap.to(batch, {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1,
          stagger: {
            amount: 0.3,
          },
          ease: "power4",
        }),
    });

    // SPLIT WORDS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    gsap.set(splitWords.words, {
      transformOrigin: "center bottom",
      yPercent: 110,
      scaleX: 0.9,
      opacity: 0,
    });
    ScrollTrigger.batch(splitWords.words, {
      start: "top 95%",
      onEnter: (batch) =>
        gsap.to(batch, {
          yPercent: 0,
          scaleX: 1,
          opacity: 1,
          duration: 1,
          stagger: {
            amount: 0.3,
            from: "random",
          },
          ease: "power4",
        }),
    });
  });
}
