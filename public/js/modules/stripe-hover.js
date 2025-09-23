export function stripeHover() {

     const wrap = document.querySelector('.stripe-hover');
     if (!wrap) return;

     const rows = gsap.utils.toArray('.stripe-item');

     // --- globals ------------------------------------------------------------
     let prevY = null, dir = 1;      // 1 = down, -1 = up
     let lastX = null, lastY = null; // pointer snapshot (for scroll sync)
     let activeRow = null;           // current hovered row
     let lastIndex = null;           // index of activeRow
     let lastUpdateWasScroll = false;

     // Track pointer (global)
     function track(e){
     const y = (e.touches ? e.touches[0].clientY : e.clientY);
     const x = (e.touches ? e.touches[0].clientX : e.clientX);

     if (prevY !== null && y !== prevY) dir = y < prevY ? -1 : 1;
          prevY = y;
          lastX = x; lastY = y;
          lastUpdateWasScroll = false;  // pointer now owns direction
     }
     document.addEventListener('pointermove', track, { passive:true });
     document.addEventListener('mouseleave', () => { prevY = null; }, { passive:true });
     window.addEventListener('blur', () => { prevY = null; });

     rows.forEach((row, i) => {
          row._idx = i;

          const bg = row.querySelector('.stripe-bg');
          const label = row.querySelector('.stripe-label');
          gsap.set(bg, { scaleY: 0, transformOrigin: "50% 100%" });

          // label colors handled inside enter/leave so scroll-synth path matches hover

          function enter(e){
                    // If no baseline (fresh entry), infer approach from pointer vs wrapper.
                    if (prevY === null) {
                    const r = wrap.getBoundingClientRect();
                    const y = (e && (e.touches ? e.touches[0].clientY : e.clientY)) ?? lastY;
                    if (y != null) dir = (y - r.top) <= (r.bottom - y) ? 1 : -1;
                    }
                    // UP (-1): expand FROM bottom, DOWN (1): expand FROM top
                    gsap.set(bg, { transformOrigin: dir < 0 ? "50% 100%" : "50% 0%" });
                    row.classList.add('active');
                    gsap.killTweensOf(bg);
                    gsap.to(bg, { scaleY: 1, duration: 0.32, ease: "power3.out" });
                    if (label) gsap.to(label, { color: "#1A1417", duration: .20, ease:"power3.out" });

                    activeRow = row;
                    lastIndex = i;
                    if (lastY != null) prevY = lastY; // seed for next tiny move
                    lastUpdateWasScroll = false;
          }

          function leave(){
                    // UP (-1): collapse TO top, DOWN (1): collapse TO bottom
                    gsap.set(bg, { transformOrigin: dir < 0 ? "50% 0%" : "50% 100%" });
                    row.classList.remove('active');
                    gsap.killTweensOf(bg);
                    gsap.to(bg, { scaleY: 0, duration: 0.26, ease: "power3.inOut" });
                    if (label) gsap.to(label, { color: "#ffffff", duration: .20, ease:"power3.out" });

                    if (activeRow === row) activeRow = null;
          }

          // expose for direct calls
          row._stripeEnter = enter;
          row._stripeLeave = leave;

          // Only pointerenter; we centralize the leave so direction matches
          row.addEventListener('pointerenter', (e) => swapTo(row, e), { passive:true });
     });

     // collapse when leaving the whole block
     wrap.addEventListener('pointerleave', () => swapTo(null), { passive:true });

     // --- unified swap so prev collapses with the SAME dir as next expands ---
     function swapTo(nextRow, e){
          if (activeRow === nextRow) return;

          // Decide direction for this swap.
          let desiredDir = dir;

          // If last update was scroll (mouse parked), derive from row index delta.
          if (lastUpdateWasScroll && lastIndex != null && nextRow && typeof nextRow._idx === 'number') {
               desiredDir = (nextRow._idx > lastIndex) ? 1 : -1;
          }
          // If no baseline, infer from pointer vs wrapper (top/bottom).
          else if (prevY === null && lastY != null) {
               const r = wrap.getBoundingClientRect();
               desiredDir = (lastY - r.top) <= (r.bottom - lastY) ? 1 : -1;
          }

          // Apply to BOTH in order: leave(prev) then enter(next)
          dir = desiredDir;

          if (activeRow && activeRow._stripeLeave) activeRow._stripeLeave();
          if (nextRow && nextRow._stripeEnter)     nextRow._stripeEnter(e || { clientY: lastY });

          activeRow = nextRow || null;
          lastIndex = activeRow ? activeRow._idx : null;

          // Align mouse baseline so first move after scroll is correct
          if (lastY != null) prevY = lastY;
          lastUpdateWasScroll = false;
     }

     // --- scroll-driven hover sync (ScrollTrigger / ScrollSmoother friendly) --
     function syncHoverUnderPointer(){
          if (lastX == null || lastY == null) return;

          if (activeRow && !wrap.contains(activeRow)) { activeRow = null; lastIndex = null; }

          let el = document.elementFromPoint(lastX, lastY);
          let row = el && el.closest ? el.closest('.stripe-item') : null;
          if (row && !wrap.contains(row)) row = null;

          swapTo(row || null);
     }

     if (typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.create({
               start: 0,
               end: "max",
               onUpdate(self){
               const v = self.getVelocity();         // +down / -up
               if (v) dir = v > 0 ? 1 : -1;
               lastUpdateWasScroll = true;
               syncHoverUnderPointer();
               }
          });
     } else {
          // native fallback
          let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
          window.addEventListener('scroll', () => {
               const y  = window.pageYOffset || document.documentElement.scrollTop || 0;
               const dy = y - lastScrollY;
               if (dy) dir = dy > 0 ? 1 : -1;
               lastScrollY = y;
               lastUpdateWasScroll = true;
               syncHoverUnderPointer();
          }, { passive:true });
     }
}
