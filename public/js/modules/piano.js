export function piano() {
  const canvas = document.getElementById("piano");
  const wrapper = document.querySelector(".piano-wrap");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // ---- Config
  const N = 43,
        marginX = 2,
        radius = 5,
        maxHeightFactor = .99;
  let falloff = 200,
      xSmoothness = 0.05,
      ySmoothness = 0.05,
      xDelay = 0.0002,
      yDelay = 0.0002;

  // ---- State
  let W=0, H=0, dpr=1, xs=[], spacing=0;
  let heights, targets, yOffsets, active;
  let mousePageX=-9999, mousePageY=0, running=false, rafId=null, observer=null;

  // ---- Resize ------------------------------------------------------------
  function resize(){
    W = canvas.clientWidth; H = canvas.clientHeight; dpr = devicePixelRatio || 1;
    canvas.width = Math.round(W*dpr);
    canvas.height = Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);

    spacing = W / N;
    xs = Array.from({length:N},(_,i)=>(i+0.5)*spacing);

    heights = new Float32Array(N);
    targets = new Float32Array(N);
    yOffsets = new Float32Array(N).fill(0.5);
    active = new Array(N).fill(false);
  }

  // ---- Rounded rect helper -----------------------------------------------
  function roundedRect(x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y, x+w,y+r);
    ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h, x+w-r,y+h);
    ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h, x,y+h-r);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y, x+r,y);
    ctx.closePath();
  }

  // ---- Compute relative mouse position each frame -----------------------
  function getRelativeMouse(){
    const rect = canvas.getBoundingClientRect();
    const inside = (
      mousePageX >= rect.left &&
      mousePageX <= rect.right &&
      mousePageY >= rect.top &&
      mousePageY <= rect.bottom
    );
    if (!inside) return { x: -9999, y: 0 };
    return { x: mousePageX - rect.left, y: mousePageY - rect.top };
  }

  // ---- Draw loop ---------------------------------------------------------
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle="#1A1417"; ctx.lineWidth=1;
    for (let i=0;i<=N;i++){
      const x=Math.round(i*spacing)+0.5;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
    }

    const {x:mouseX, y:mouseY} = getRelativeMouse();
    const maxRectH=H*maxHeightFactor;
    const yRatio=mouseY/H;
    ctx.fillStyle="#1A1417";

    for (let i=0;i<N;i++){
      // --- Height from X
      let targetH=0;
      if(mouseX!==-9999){
        const dist=Math.abs(xs[i]-mouseX);
        if(dist<falloff){
          const t=dist/falloff, fall=(1+Math.cos(Math.PI*t))/2;
          targetH=maxRectH*fall;
        }
      }
      targets[i]=targetH;
      const effX=xSmoothness+xDelay*i;
      heights[i]+=(targets[i]-heights[i])*effX;

      const rectH=heights[i];
      if(targets[i]>0.5){
        if(!active[i]){ yOffsets[i]=yRatio; active[i]=true; }
        const effY=ySmoothness+yDelay*i;
        yOffsets[i]+=(yRatio-yOffsets[i])*effY;
      } else {
        active[i]=false;
      }

      let rectY=(H-rectH)/2+(yOffsets[i]-0.5)*(H-rectH);
      if(rectY<0) rectY=0;
      else if(rectY+rectH>H) rectY=H-rectH;

      const x1=Math.round(i*spacing), x2=Math.round((i+1)*spacing);
      const rectX=x1+marginX, rectW=(x2-x1)-marginX*2;

      if(rectH>0.5){ roundedRect(rectX,rectY,rectW,rectH,radius); ctx.fill(); }
    }
  }

  // ---- rAF control -------------------------------------------------------
  function loop(){ if(!running) return; draw(); rafId=requestAnimationFrame(loop); }
  function start(){ if (running) return; running=true; loop(); }
  function stop(){ running=false; if (rafId){ cancelAnimationFrame(rafId); rafId=null; } }

  // ---- Global-leave helpers (de-animate when leaving browser) ------------
  function forceGlobalLeave(){
    mousePageX = -9999; mousePageY = -9999;
    if (active) active.fill(false); // ensure smooth fade-out of columns
  }
  function onWindowMouseOut(e){
    // leaving the browser window (no related target)
    if (!e.relatedTarget && !e.toElement) forceGlobalLeave();
  }
  function onWindowBlur(){ forceGlobalLeave(); }
  function onVisibilityChange(){ if (document.hidden) forceGlobalLeave(); }

  // ---- Events ------------------------------------------------------------
  function onMouseMove(e){ mousePageX = e.clientX; mousePageY = e.clientY; }
  function onMouseLeave(){ mousePageX=-9999; }

  // ---- Init --------------------------------------------------------------
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", ()=>{}); // keep your original no-op
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseleave", onMouseLeave);

  // NEW: handle leaving the browser window/tab
  window.addEventListener("mouseout", onWindowMouseOut, { passive:true });
  window.addEventListener("blur", onWindowBlur, { passive:true });
  document.addEventListener("visibilitychange", onVisibilityChange, { passive:true });

  observer = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting) start(); else stop();
  });
  observer.observe(canvas);

  start();

  // ---- Destroy -----------------------------------------------------------
  window.pianoDestroy = function() {
    stop();
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseleave", onMouseLeave);
    window.removeEventListener("mouseout", onWindowMouseOut);
    window.removeEventListener("blur", onWindowBlur);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if(observer){ observer.disconnect(); observer=null; }
  };
}
