export function error() {
      if(!isMobile()) {
            const letters = [...document.querySelectorAll('.letter')];

            // ===== Tunables =====
            const RADIUS=220, REPULSE_STRENGTH=1600, SPEED_MIN=0.02, SPEED_MAX=1.2;
            const ROTZ_GAIN=65, TILT_GAIN=28, SPRING_POS=0.001, SPRING_ROT=0.001, DAMPING=0.86;
            const EPS_POS=0.02, EPS_VEL=0.005, EPS_ROT=0.02, EPS_VR=0.01;

            // ===== State =====
            let mx=innerWidth/2, my=innerHeight/2;
            let lx=mx, ly=my;
            let speed=0, lastT=performance.now(), running=false;

            const actors=letters.map(el=>{
                  const setX=gsap.quickSetter(el,"x","px"),
                        setY=gsap.quickSetter(el,"y","px"),
                        setRZ=gsap.quickSetter(el,"rotation","deg"),
                        setRX=gsap.quickSetter(el,"rotationX","deg"),
                        setRY=gsap.quickSetter(el,"rotationY","deg");
                  return {el,x:0,y:0,rz:0,rx:0,ry:0,vx:0,vy:0,vrz:0,vrx:0,vry:0,setX,setY,setRZ,setRX,setRY,
                  center:()=>{const b=el.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2};}
                  };
            });

            gsap.set(letters,{x:0,y:0,rotation:0,rotationX:0,rotationY:0,force3D:true,transformPerspective:900,transformOrigin:"50% 60%"});

            // Wake/pause
            const wake=()=>{if(!running)startTicker();};
            function startTicker(){running=true;lastT=performance.now();gsap.ticker.add(loop);}
            function stopTicker(){running=false;gsap.ticker.remove(loop);}

            // Pointer events
            window.addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;wake();},{passive:true});
            window.addEventListener("pointerenter",wake);
            window.addEventListener("pointerleave",wake);

            // Physics loop
            function loop(){
                  const t=performance.now(),dt=Math.max(16,t-lastT);lastT=t;
                  const inst=Math.hypot(mx-lx,my-ly)/dt;
                  speed=speed*0.84+inst*0.16;
                  const spdNorm=gsap.utils.clamp(0,1,(speed-SPEED_MIN)/(SPEED_MAX-SPEED_MIN));
                  const vmx=mx-lx,vmy=my-ly; lx=mx;ly=my;

                  let anyActive=false;
                  actors.forEach(a=>{
                  const {x:cx,y:cy}=a.center();
                  const dx=cx-mx,dy=cy-my,d=Math.hypot(dx,dy);

                  // spring
                  a.vx+=(-a.x)*SPRING_POS*dt; a.vy+=(-a.y)*SPRING_POS*dt;
                  a.vrz+=(-a.rz)*SPRING_ROT*dt*0.6; a.vrx+=(-a.rx)*SPRING_ROT*dt; a.vry+=(-a.ry)*SPRING_ROT*dt;

                  if(d<RADIUS){
                  const prox=1-d/RADIUS, p2=prox*prox, ndx=dx/(d||1), ndy=dy/(d||1);
                  const force=REPULSE_STRENGTH*p2*(0.35+0.65*spdNorm);
                  a.vx+=ndx*force*(dt/1000); a.vy+=ndy*force*(dt/1000);
                  const cross=vmx*dy-vmy*dx, signZ=Math.sign(cross)||0;
                  a.vrz+=(ROTZ_GAIN*p2*(0.35+0.65*spdNorm)*signZ)*0.05;
                  const tilt=TILT_GAIN*p2*(0.35+0.65*spdNorm);
                  a.vrx+= ndy*tilt*0.06; a.vry+=-ndx*tilt*0.06;
                  }

                  // damping
                  a.vx*=DAMPING; a.vy*=DAMPING; a.vrz*=DAMPING; a.vrx*=DAMPING; a.vry*=DAMPING;

                  // integrate
                  const step=dt/16;
                  a.x+=a.vx*step; a.y+=a.vy*step; a.rz+=a.vrz*step; a.rx+=a.vrx*step; a.ry+=a.vry*step;

                  const idle=Math.abs(a.vx)<EPS_VEL&&Math.abs(a.vy)<EPS_VEL&&
                              Math.abs(a.vrz)<EPS_VR&&Math.abs(a.vrx)<EPS_VR&&Math.abs(a.vry)<EPS_VR&&
                              Math.abs(a.x)<EPS_POS&&Math.abs(a.y)<EPS_POS&&
                              Math.abs(a.rz)<EPS_ROT&&Math.abs(a.rx)<EPS_ROT&&Math.abs(a.ry)<EPS_ROT;

                  if(idle){
                  if(a.x||a.y||a.rz||a.rx||a.ry){
                        a.x=a.y=a.rz=a.rx=a.ry=a.vx=a.vy=a.vrz=a.vrx=a.vry=0;
                        a.setX(0);a.setY(0);a.setRZ(0);a.setRX(0);a.setRY(0);
                  }
                  }else{
                  anyActive=true;
                  const r2=v=>Math.round(v*100)/100;
                  a.setX(r2(a.x));a.setY(r2(a.y));a.setRZ(r2(a.rz));a.setRX(r2(a.rx));a.setRY(r2(a.ry));
                  }
                  });
                  if(!anyActive)stopTicker();
            }

            startTicker();
    }
}