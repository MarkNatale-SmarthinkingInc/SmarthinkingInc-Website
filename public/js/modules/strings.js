export function strings() {
  const gridLines = document.querySelectorAll(".string-canvas");

  gridLines.forEach((wrapper) => {
    // NON MOBILE DEVICES /////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    if (!isMobile()) {
      const canvas = wrapper.querySelector(".string-lines");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      // ---- State ------------------------------------------------------------
      let isActive = false;
      let rafId = null;
      let numStrings;
      let cssW = 0,
        cssH = 0;
      const MAX_DPR = 1.75; // cap retina workload
      let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      let spacing = 0; // cached spacing in CSS px
      const strings = [];
      const particles = [];
      const MAX_PARTICLES = 300;

      // Pointer throttle
      let pointerQueued = false;
      let pointerX = -1,
        pointerY = -1;
      let onPointerMove = null;

      // ScrollTrigger instance
      let st = null;

      // ---- Helpers ----------------------------------------------------------
      function computeSizes() {
        const rect = wrapper.getBoundingClientRect();
        cssW = Math.ceil(rect.width);

        if (canvas.classList.contains("gridFooter")) {
          cssH = Math.ceil(window.innerHeight / 2);
          numStrings = 80;
        } else if (canvas.classList.contains("grid80")) {
          cssH = Math.ceil(window.innerHeight);
          numStrings = 80;
        } else if (canvas.classList.contains("grid18")) {
          cssH = Math.ceil(window.innerHeight);
          numStrings = 17;
        } else {
          cssH = Math.ceil(window.innerHeight);
          numStrings = 80;
        }
        spacing = cssW / (numStrings + 1);
      }

      function setupHiDPICanvas() {
        dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.style.width = cssW + "px";
        canvas.style.height = cssH + "px";
        canvas.width = Math.max(1, Math.floor(cssW * dpr));
        canvas.height = Math.max(1, Math.floor(cssH * dpr));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      const frequencies = [
        0.015, 0.018, 0.02, 0.023, 0.025, 0.028, 0.03, 0.033, 0.035, 0.038,
        0.04, 0.045,
      ];

      function initStrings() {
        strings.length = 0;
        for (let i = 0; i < numStrings; i++) {
          strings.push({
            x: spacing * (i + 1),
            waveAmplitude: 0,
            waveFrequency: frequencies[i % frequencies.length],
            waveDecay: 0.95,
            phase: 0,
            cooldown: 0,
            hitY: cssH / 2,
          });
        }
      }

      // Adaptive quality: fewer segments on large canvases
      function getSegments() {
        // ~1 vertex per 10px, clamped
        return Math.max(80, Math.min(180, Math.round(cssH / 10)));
      }

      // ---- Drawing ----------------------------------------------------------
      function drawString(s, segments) {
        const xOffset = 0.5;
        const step = cssH / segments;

        ctx.beginPath();
        ctx.moveTo(s.x + xOffset, 0);

        // NOTE: keep Math.exp() but it’s once per step. If needed,
        // replace with cheaper 1/(1+k*dist) falloff.
        for (let y = 0; y <= cssH; y += step) {
          const dist = Math.abs(y - s.hitY);
          const falloff = Math.exp(-dist * 0.01);
          const amp = s.waveAmplitude * falloff;
          const dx = Math.sin(y * s.waveFrequency + s.phase) * amp;
          ctx.lineTo(s.x + dx + xOffset, y);
        }
        ctx.stroke();
      }

      function drawParticles() {
        // Set once
        ctx.fillStyle = "#1A1417";

        // Fast removal (swap with last, pop)
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.02;

          if (p.alpha <= 0) {
            const last = particles.pop();
            if (i < particles.length) particles[i] = last;
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      function burst(x, y) {
        const need = Math.min(5, MAX_PARTICLES - particles.length);
        for (let i = 0; i < need; i++) {
          let particleSize;
          if (canvas.classList.contains("canvas-fix")) {
            particleSize = Math.random() * 8 + 2;
          } else {
            particleSize = Math.random() * 3 + 2;
          }
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            alpha: 1,
            size: particleSize,
          });
        }
      }

      // ---- RAF loop ---------------------------------------------------------
      function animate() {
        if (!isActive) {
          rafId = null;
          return;
        }

        ctx.clearRect(0, 0, cssW, cssH);

        // Batch state once per frame
        ctx.strokeStyle = "#1A1417";
        ctx.lineWidth = 1;

        const segments = getSegments();

        for (let i = 0; i < strings.length; i++) {
          const s = strings[i];
          drawString(s, segments);
          s.waveAmplitude *= s.waveDecay;
          s.phase += 0.2;
          if (s.cooldown > 0) s.cooldown -= 16; // ms-ish per frame
        }

        drawParticles();
        rafId = requestAnimationFrame(animate);
      }

      function play() {
        if (isActive) return;
        isActive = true;
        // attach pointer only when active
        wrapper.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        if (rafId == null) rafId = requestAnimationFrame(animate);
      }

      function pause() {
        if (!isActive) return;
        isActive = false;
        if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        // detach to avoid CPU work offscreen
        canvas.removeEventListener("pointermove", onPointerMove);
        // optional: trim particles to zero when paused
        particles.length = 0;
      }

      // ---- Pointer (nearest-string hit test, rAF-throttled) -----------------
      function processPointer() {
        pointerQueued = false;

        // quick bounds
        if (pointerX < 0 || pointerY < 0 || pointerX > cssW || pointerY > cssH)
          return;

        // nearest index by spacing
        const idx = Math.round(pointerX / spacing) - 1; // strings are 0..N-1 at (i+1)*spacing
        if (idx < -1 || idx > strings.length) return;

        // check a tiny neighborhood instead of all N strings
        for (let j = -2; j <= 2; j++) {
          const i = idx + j;
          if (i < 0 || i >= strings.length) continue;
          const s = strings[i];
          if (Math.abs(pointerX - s.x) < 10 && s.cooldown <= 0) {
            s.hitY = pointerY;
            s.cooldown = 200; // ms-ish (decrements in animate)
            gsap.to(s, { waveAmplitude: 20, duration: 0.1, overwrite: true });
            burst(s.x, pointerY);
          }
        }
      }

      onPointerMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        pointerX = e.clientX - rect.left;
        pointerY = e.clientY - rect.top;
        if (!pointerQueued) {
          pointerQueued = true;
          requestAnimationFrame(processPointer);
        }
      };

      // ---- ScrollTrigger gate ----------------------------------------------
      function buildScrollTrigger() {
        if (canvas.classList.contains("canvas-fix")) {
          if (st) st.kill();
          st = ScrollTrigger.create({
            trigger: canvas,
            start: "top bottom",
            end: () =>
              "+=" +
              (document.querySelector(".service-listing").offsetHeight +
                window.innerHeight),
            onEnter: play,
            onEnterBack: play,
            onLeave: pause,
            onLeaveBack: pause,
          });
        } else {
          if (st) st.kill();
          st = ScrollTrigger.create({
            trigger: canvas,
            start: "top bottom",
            end: "bottom top",
            onEnter: play,
            onEnterBack: play,
            onLeave: pause,
            onLeaveBack: pause,
          });
        }
      }

      // ---- Resize / DPR (batched) ------------------------------------------
      let reflowQueued = false;
      function reflow() {
        if (reflowQueued) return;
        reflowQueued = true;
        requestAnimationFrame(() => {
          reflowQueued = false;

          const oldFreqs = strings.map((s) => s.waveFrequency);
          computeSizes();
          setupHiDPICanvas();

          const need = numStrings;
          if (strings.length !== need) {
            strings.length = 0;
            for (let i = 0; i < need; i++) {
              strings.push({
                x: spacing * (i + 1),
                waveAmplitude: 0,
                waveFrequency:
                  oldFreqs[i % oldFreqs.length] ??
                  frequencies[i % frequencies.length],
                waveDecay: 0.95,
                phase: 0,
                cooldown: 0,
                hitY: cssH / 2,
              });
            }
          } else {
            for (let i = 0; i < need; i++) {
              const s = strings[i];
              s.x = spacing * (i + 1);
              s.hitY = Math.min(s.hitY, cssH);
            }
          }

          ScrollTrigger.refresh();
        });
      }

      // ---- Init -------------------------------------------------------------
      computeSizes();
      setupHiDPICanvas();
      initStrings();
      buildScrollTrigger();

      // Start immediately if already in view
      if (ScrollTrigger.isInViewport(canvas)) play();

      // listeners
      const onResize = reflow;
      window.addEventListener("resize", onResize, { passive: true });

      const mql = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      );
      if (mql && mql.addEventListener) mql.addEventListener("change", reflow);

      // Expose destroy for SPA routers
      wrapper.__stringsDestroy__ = function destroy() {
        pause();
        if (st) {
          st.kill();
          st = null;
        }
        window.removeEventListener("resize", onResize);
        if (mql && mql.removeEventListener)
          mql.removeEventListener("change", reflow);
        strings.length = 0;
        particles.length = 0;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    } else if (isMobile()) {
      // MOBILE DEVICES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      const canvas = wrapper.querySelector(".string-lines");
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;

      const rect = wrapper.getBoundingClientRect();
      const cssW = Math.ceil(rect.width);
      const cssH = Math.ceil(rect.height);

      // Set canvas size in physical pixels
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      // Style size (logical pixels)
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const numStrings = 40;
      ctx.strokeStyle = "#D0CFCF";
      ctx.lineWidth = 1;

      for (let i = 0; i < numStrings; i++) {
        console.log("pain");
        const x = (i / (numStrings - 1)) * cssW;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cssH);
        ctx.stroke();
      }
    }
  });
}
