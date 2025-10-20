export function equalizer() {
     if(!isMobile() || window.innerWidth > 768) {
          // --- config -------------------------------------------------------------
          const COLS = 80;
          const WAVE_SPREAD = 16;
          const SMOOTHNESS = 0.045;
          const MAX_HEIGHT_FACTOR = 0.95; // 80% row height cap

          // --- state per row ------------------------------------------------------
          const rows = document.querySelectorAll('.row-item');
          const rowStates = new Map(); // Map<HTMLElement, State>

          function createState(row) {
          const canvas = row.querySelector('canvas.equalizer-canvas');
          if (!canvas) return;
          const ctx = canvas.getContext('2d');

          const state = {
               row,
               canvas,
               ctx,
               dpr: window.devicePixelRatio || 1,
               width: 1,
               height: 1,
               colWidth: 1,
               active: false,
               targets: new Array(COLS).fill(0),
               currents: new Array(COLS).fill(0),
               _localX: -1,
               _localY: 0,
          };

          resizeState(state);
          attachRowListeners(state);
          rowStates.set(row, state);
          }

          function resizeState(state) {
          const rect = state.row.getBoundingClientRect();
          state.width = Math.max(1, Math.floor(rect.width));
          state.height = Math.max(1, Math.floor(rect.height));
          state.dpr = window.devicePixelRatio || 1;

          // HiDPI scale
          state.canvas.width  = state.width  * state.dpr;
          state.canvas.height = state.height * state.dpr;
          state.canvas.style.width  = state.width  + 'px';
          state.canvas.style.height = state.height + 'px';
          state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

          state.colWidth = state.width / COLS;

          // reset arrays after major size change
          state.targets.fill(0);
          state.currents.fill(0);
          }

          function attachRowListeners(state) {
          // immediate fade when quickly leaving a row (per-frame hit-test also handles it)
          state.row.addEventListener('mouseleave', () => { state.active = false; }, { passive:true });
          }

          // build states
          rows.forEach(createState);

          // --- shared pointer (global client coords) ------------------------------
          let pointerX = -9999, pointerY = 0;
          function onPointerMove(e){ pointerX = e.clientX; pointerY = e.clientY; }
          function forceGlobalLeave(){
          pointerX = -9999; pointerY = -9999;
          rowStates.forEach(s => s.active = false); // triggers smooth fade-out
          }
          function onWindowMouseOut(e){
          // If leaving the browser window (no related target), fade out
          if (!e.relatedTarget && !e.toElement) forceGlobalLeave();
          }
          function onWindowBlur(){ forceGlobalLeave(); }
          function onVisibilityChange(){ if (document.hidden) forceGlobalLeave(); }

          window.addEventListener('pointermove', onPointerMove, { passive:true });
          window.addEventListener('pointerleave', forceGlobalLeave, { passive:true }); // extra safety
          window.addEventListener('mouseout', onWindowMouseOut, { passive:true });
          window.addEventListener('blur', onWindowBlur, { passive:true });
          document.addEventListener('visibilitychange', onVisibilityChange, { passive:true });

          // --- Resize handling ----------------------------------------------------
          const ro = new ResizeObserver(entries => {
          for (const entry of entries) {
               const state = rowStates.get(entry.target);
               if (state) resizeState(state);
          }
          });
          rows.forEach(row => ro.observe(row));

          function onResize(){ rowStates.forEach(resizeState); }
          window.addEventListener('resize', onResize, { passive:true });

          // --- render loop (GSAP ticker if ScrollSmoother is active) --------------
          const smoother = (window.ScrollSmoother && window.ScrollSmoother.get && window.ScrollSmoother.get()) || null;
          const useGsapTicker = !!(window.gsap && smoother);
          let rafId = null;
          let running = true;

          function render(){
          // Pass 1: per-frame hit-test & local mouse (so scroll w/o mousemove still updates)
          rowStates.forEach(state => {
               const rect = state.canvas.getBoundingClientRect();
               const inside = pointerX >= rect.left && pointerX <= rect.right && pointerY >= rect.top && pointerY <= rect.bottom;

               state.active  = inside;
               state._localX = inside ? (pointerX - rect.left) : -1;
               state._localY = inside ? (pointerY - rect.top)  : 0;
          });

          // Pass 2: draw each row
          rowStates.forEach(state => {
               const { ctx, width, height, colWidth, targets, currents, dpr, active } = state;

               ctx.clearRect(0, 0, width, height);

               const localX = state._localX;
               const localY = state._localY;

               const fractionalIndex = (localX >= 0) ? (localX / colWidth) : -1;
               const allowedMax = Math.max(0, Math.min(height * MAX_HEIGHT_FACTOR, height - (localY || 0)));

               for (let i = 0; i < COLS; i++) {
               let target = 0;

               if (active && fractionalIndex >= 0) {
                    const distance = Math.abs(i - fractionalIndex);
                    if (distance <= WAVE_SPREAD) {
                    const t = distance / WAVE_SPREAD;
                    const eased = Math.pow((1 + Math.cos(t * Math.PI)) / 2, 1.5); // soft shoulders
                    target = eased * allowedMax;
                    }
               }

               targets[i] = target;
               currents[i] += (targets[i] - currents[i]) * SMOOTHNESS;

               const x = i * colWidth;
               const y = height - currents[i];

               // bar
               ctx.fillStyle = '#fff';
               ctx.fillRect(x, y, colWidth, currents[i]);

               // crisp 1px divider between bars (left edge only, skip first)
               if (i > 0) {
                    ctx.beginPath();
                    ctx.moveTo(x + 0.5, y);
                    ctx.lineTo(x + 0.5, height);
                    ctx.strokeStyle = '#1A1417';
                    ctx.lineWidth = 1 / dpr;
                    ctx.stroke();
               }
               }
          });

          if (!useGsapTicker && running) rafId = requestAnimationFrame(render);
          }

          function startLoop(){
          if (!running) running = true;
          if (useGsapTicker) {
               if (!startLoop._added) { gsap.ticker.add(render); startLoop._added = true; }
          } else if (rafId == null) {
               rafId = requestAnimationFrame(render);
          }
          }

          function stopLoop(){
          running = false;
          if (useGsapTicker && startLoop._added) { gsap.ticker.remove(render); startLoop._added = false; }
          if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
          }

          // kick off
          startLoop();

          // --- Destroy (callable outside this file) --------------------------------
          window.equalizerDestroy = function() {
          stopLoop();
          ro.disconnect();
          window.removeEventListener('resize', onResize);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerleave', forceGlobalLeave);
          window.removeEventListener('mouseout', onWindowMouseOut);
          window.removeEventListener('blur', onWindowBlur);
          document.removeEventListener('visibilitychange', onVisibilityChange);
          rowStates.clear();
          };
  }
}
