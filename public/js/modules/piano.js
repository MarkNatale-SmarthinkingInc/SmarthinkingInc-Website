export function piano() {
  const canvas = document.getElementById("piano");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // --- Detect mobile (coarse pointer or small viewport fallback)
  const isMobile =
    (typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)")?.matches ||
        window.innerWidth <= 768)) || false;

  // ---- Config
  const N = 43,
    marginX = 2,
    radius = 5,
    maxHeightFactor = 0.99;
  let falloff = 200,
    xSmoothness = 0.05,
    ySmoothness = 0.05,
    xDelay = 0.0002,
    yDelay = 0.0002;

  // ---- State
  let W = 0,
    H = 0,
    dpr = 1,
    lines = [], // x of every vertical rule
    cells = []; // { x1, x2, cx } of every bar slot
  let heights, targets, yOffsets, active;
  let mousePageX = -9999,
    mousePageY = 0,
    running = false,
    rafId = null,
    observer = null;

  // ---- Optional gap ------------------------------------------------------
  // An element marked [data-piano-gap] carves a hole out of the string field so
  // no rule or bar is ever clipped by content sitting on top of the canvas. The
  // attribute value is extra overhang in vw on each side (0 if omitted).
  // With no such element the layout is identical to a plain N-column field.
  function getGap() {
    const el = canvas.parentElement?.querySelector("[data-piano-gap]");
    if (!el) return null;
    const gapRect = el.getBoundingClientRect();
    if (!gapRect.width) return null;
    const canvasRect = canvas.getBoundingClientRect();
    const pad =
      ((parseFloat(el.dataset.pianoGap) || 0) / 100) *
      document.documentElement.clientWidth;
    return {
      left: gapRect.left - canvasRect.left - pad,
      right: gapRect.right - canvasRect.left + pad,
      // "fit" (default) stretches each band so a rule lands exactly on the gap.
      // "trim" keeps the ideal column width and drops the leftover part-column.
      mode: el.dataset.pianoGapMode === "trim" ? "trim" : "fit",
    };
  }

  // ---- Layout ------------------------------------------------------------
  // Each band is divided into a whole number of columns, so a rule always lands
  // exactly on the band's edges and column widths stay within half a step of the
  // ideal. That is what keeps a bar from being half-covered at the gap.
  function buildLayout() {
    lines = [];
    cells = [];
    if (!(W > 0)) return;

    const ideal = W / N;
    const gap = getGap();
    const trim = gap?.mode === "trim";

    // The gap may sit against either edge, leaving a single band.
    let bands;
    if (gap) {
      bands = [];
      const gapL = Math.max(0, gap.left);
      const gapR = Math.min(W, gap.right);
      if (gapL > 0) bands.push([0, gapL]);
      if (gapR < W) bands.push([gapR, W]);
    } else {
      bands = [[0, W]];
    }

    for (const [start, end] of bands) {
      const span = end - start;
      let count, step, from;
      if (trim) {
        // Keep the ideal column width and drop the leftover part-column. Anchor
        // to the canvas edge so the trimmed side is the one facing the gap.
        count = Math.floor(span / ideal);
        if (count < 1) continue;
        step = ideal;
        from = start === 0 ? start : end - count * step;
      } else {
        // Stretch so a rule lands exactly on both of the band's edges.
        if (span < ideal * 0.5) continue;
        count = Math.max(1, Math.round(span / ideal));
        step = span / count;
        from = start;
      }

      // A rule sitting exactly on a gap's edge rounds onto a pixel the overlaying
      // content already covers, so it never shows. Pull that one rule 1px back
      // inside the band. The canvas's own outer edge is left as-is.
      const close = from + count * step;
      for (let i = 0; i <= count; i++) {
        const atClose = i === count;
        lines.push(atClose && close < W - 0.001 ? close - 1 : from + i * step);
      }
      for (let i = 0; i < count; i++) {
        const x1 = from + i * step;
        cells.push({ x1, x2: x1 + step, cx: x1 + step / 2 });
      }
    }
  }

  // ---- Resize ------------------------------------------------------------
  function resize() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    dpr = devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildLayout();

    const n = cells.length;
    heights = new Float32Array(n);
    targets = new Float32Array(n);
    yOffsets = new Float32Array(n).fill(0.5);
    active = new Array(n).fill(false);

    if (isMobile) {
      drawGrid(); // redraw static grid on resize
    }
  }

  // ---- Rounded rect helper -----------------------------------------------
  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // ---- Draw only the vertical lines (mobile) ------------------------------
  function drawGrid() {
    ctx.clearRect(0, 0, W, H);
    strokeLines();
  }

  // ---- Vertical rules ----------------------------------------------------
  function strokeLines() {
    ctx.strokeStyle = "#1A1417";
    ctx.lineWidth = 1;
    for (const line of lines) {
      const x = Math.round(line) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
  }

  // ---- Compute relative mouse position each frame -----------------------
  function getRelativeMouse() {
    const rect = canvas.getBoundingClientRect();
    const inside =
      mousePageX >= rect.left &&
      mousePageX <= rect.right &&
      mousePageY >= rect.top &&
      mousePageY <= rect.bottom;
    if (!inside) return { x: -9999, y: 0 };
    return { x: mousePageX - rect.left, y: mousePageY - rect.top };
  }

  // ---- Draw loop (desktop only) ------------------------------------------
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // grid
    strokeLines();

    // bars
    const { x: mouseX, y: mouseY } = getRelativeMouse();
    const maxRectH = H * maxHeightFactor;
    const yRatio = mouseY / H;
    ctx.fillStyle = "#1A1417";

    for (let i = 0; i < cells.length; i++) {
      // --- Height from X
      let targetH = 0;
      if (mouseX !== -9999) {
        const dist = Math.abs(cells[i].cx - mouseX);
        if (dist < falloff) {
          const t = dist / falloff,
            fall = (1 + Math.cos(Math.PI * t)) / 2;
          targetH = maxRectH * fall;
        }
      }
      targets[i] = targetH;
      const effX = xSmoothness + xDelay * i;
      heights[i] += (targets[i] - heights[i]) * effX;

      const rectH = heights[i];
      if (targets[i] > 0.5) {
        if (!active[i]) {
          yOffsets[i] = yRatio;
          active[i] = true;
        }
        const effY = ySmoothness + yDelay * i;
        yOffsets[i] += (yRatio - yOffsets[i]) * effY;
      } else {
        active[i] = false;
      }

      let rectY = (H - rectH) / 2 + (yOffsets[i] - 0.5) * (H - rectH);
      if (rectY < 0) rectY = 0;
      else if (rectY + rectH > H) rectY = H - rectH;

      const x1 = Math.round(cells[i].x1),
        x2 = Math.round(cells[i].x2);
      const rectX = x1 + marginX,
        rectW = x2 - x1 - marginX * 2;

      if (rectH > 0.5) {
        roundedRect(rectX, rectY, rectW, rectH, radius);
        ctx.fill();
      }
    }
  }

  // ---- rAF control (desktop only) ----------------------------------------
  function loop() {
    if (!running) return;
    draw();
    rafId = requestAnimationFrame(loop);
  }
  function start() {
    if (running) return;
    running = true;
    loop();
  }
  function stop() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ---- Global-leave helpers (desktop only) -------------------------------
  function forceGlobalLeave() {
    mousePageX = -9999;
    mousePageY = -9999;
    if (active) active.fill(false); // ensure smooth fade-out of columns
  }
  function onWindowMouseOut(e) {
    if (!e.relatedTarget && !e.toElement) forceGlobalLeave();
  }
  function onWindowBlur() {
    forceGlobalLeave();
  }
  function onVisibilityChange() {
    if (document.hidden) forceGlobalLeave();
  }

  // ---- Events ------------------------------------------------------------
  function onMouseMove(e) {
    mousePageX = e.clientX;
    mousePageY = e.clientY;
  }
  function onMouseLeave() {
    mousePageX = -9999;
  }

  // ---- Init --------------------------------------------------------------
  resize();

  // Always listen to resize so the grid redraws on mobile too
  window.addEventListener("resize", resize, { passive: true });

  if (isMobile) {
    // MOBILE MODE: draw static grid only, no animation or interaction
    drawGrid();
  } else {
    // DESKTOP MODE: full interactive behavior
    window.addEventListener("scroll", () => {}, { passive: true }); // keep your original no-op
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // handle leaving the browser window/tab
    window.addEventListener("mouseout", onWindowMouseOut, { passive: true });
    window.addEventListener("blur", onWindowBlur, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange, {
      passive: true,
    });

    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);
    start();
  }

  // ---- Destroy -----------------------------------------------------------
  window.pianoDestroy = function () {
    if (!isMobile) stop();
    window.removeEventListener("resize", resize);
    if (!isMobile) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseout", onWindowMouseOut);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }
  };
}
