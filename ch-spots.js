(function(){
  var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function eio(t,p){var q=(t%p)/p,tri=q<0.5?q*2:2-q*2,s=tri*tri*tri*(tri*(tri*6-15)+10);return s*2-1}
  function spring(c,g,v,k,dt){var a=(g-c)*k-v*2*Math.sqrt(k);return [c+v*dt,v+a*dt]}
  function sm(z){return 0.5+0.5*z*(1.5-0.5*z*z)}
  function lerp(a,b,u){return a+(b-a)*u}
  function clampX(v){return Math.max(6,Math.min(94,v))}function clampY(v){return Math.max(6,Math.min(92,v))}
  function watch(el,f){var on=true;if('IntersectionObserver' in window)new IntersectionObserver(function(e){var was=on;on=e[0].isIntersecting;if(on&&!was)f.wake()}).observe(el);return function(){return on}}
  /* chapter heroes: the cover's two-spot dance, led by the cursor while it is over the band */
  /* 1 engine for the cover and every chapter banner */
  var targets=[];var cov=document.getElementById('top');if(cov&&cov.querySelector('.cover-mark'))targets.push(cov);
  document.querySelectorAll('.chapter-hero').forEach(function(el){if(!el.closest('#introduction'))targets.push(el)});
  targets.forEach(function(el){
    var isCover=el.id==='top',head=isCover?el.querySelector('.cover-head'):null,SZ={w:1,h:1,hl:0,ht:0};
    function measure(){SZ.w=el.offsetWidth||1;SZ.h=el.offsetHeight||1;if(head){var cr=el.getBoundingClientRect(),hr=head.getBoundingClientRect();SZ.hl=hr.left-cr.left;SZ.ht=hr.top-cr.top}}measure();addEventListener('resize',measure);if(document.fonts)document.fonts.ready.then(measure);
    if(!isCover){el.classList.add('ch-spots');['cover-mark','cover-mark alt','cover-dither'].forEach(function(c){var d=document.createElement('div');d.className=c;d.setAttribute('aria-hidden','true');el.insertBefore(d,el.firstChild)})}
    /* keep the bright spots clear of the title and intro: right of the text on desktop, above it on narrow screens */
    function zone(){return {x0:6,x1:94,y0:6,y1:92,bx:50,by:50}}
    var Z=zone();addEventListener('resize',function(){Z=zone();if(!pointer){bx=Z.bx;by=Z.by}});
    function zx(v){return Math.max(Z.x0,Math.min(Z.x1,v))}function zy(v){return Math.max(Z.y0,Math.min(Z.y1,v))}
    var cx=Z.bx,cy=Z.by,vx=0,vy=0,gx=Z.bx,gy=Z.by,gvx=0,gvy=0,bx=Z.bx,by=Z.by,pointer=false,engage=0,th=Math.random()*6.283,last=0;
    var ph=[0,1,2,3].map(function(){return Math.random()*1e5}),aimB=[-1,1],aimR=[1,-1];
    var elB={},elR={},hB={x:0,y:0,vx:0,vy:0},hR={x:0,y:0,vx:0,vy:0};
    /* hot core: drifts inside the glow toward the cursor; the glow itself never turns */
    function hot(o,sx,sy,ang,sc,p,dt,W,H,S){var tx=0,ty=0;if(pointer){var dx=(bx-sx)*W/100,dy=(by-sy)*H/100,d=Math.sqrt(dx*dx+dy*dy),cap=Math.min(W,H)*0.14,f=d>0?Math.min(d,cap)/d:0;tx=dx*f*engage;ty=dy*f*engage}var r=spring(o.x,tx,o.vx,10,dt);o.x=r[0];o.vx=r[1];r=spring(o.y,ty,o.vy,10,dt);o.y=r[0];o.vy=r[1];var a=-ang/57.2958,lx=(o.x*Math.cos(a)-o.y*Math.sin(a))/(2.25*sc),ly=(o.x*Math.sin(a)+o.y*Math.cos(a))/(2.7*sc);S.setProperty(p+'cx',(lx/(0.88*W)*100).toFixed(4)+'%');S.setProperty(p+'cy',(ly/(0.88*H)*100).toFixed(4)+'%')}
    function elas(o,x,y,dt,W,H){if(o.px==null){o.px=x;o.py=y;o.s=0;o.ax=0;o.ay=0;o.dx=0;o.dy=0;o.ux=1;o.uy=0}var vx=(x-o.px)*W/100/dt,vy=(y-o.py)*H/100/dt;o.px=x;o.py=y;var K=40,D=2*Math.sqrt(K);o.dx+=((vx-o.ax)*K-o.dx*D)*dt;o.dy+=((vy-o.ay)*K-o.dy*D)*dt;o.ax+=o.dx*dt;o.ay+=o.dy*dt;var sp=Math.sqrt(o.ax*o.ax+o.ay*o.ay);var q=Math.min(1,sp/420);o.s=0.45*q*q;if(sp>0.001){o.ux=o.ax/sp;o.uy=o.ay/sp}return o}
    function kf(t,s,P){var n=Math.floor(t/P),u=t/P-n,h=function(i){var x=Math.sin((i+s)*127.1+s*311.7)*43758.5453;return (x-Math.floor(x))*2-1},e=u<0.6?0:(function(v){return v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2})((u-0.6)/0.4);return h(n)+(h(n+1)-h(n))*e}
    function sa(o,deg,dt,S,p){var m=Math.min(1,Math.sqrt(o[0]*o[0]+o[1]*o[1])/0.95);m=m*m*(3-2*m);S.setProperty(p,(0.28+0.72*m).toFixed(3));return deg.toFixed(2)+'deg'}
    function aimDir(st,sx,sy,ox,oy,px,py,e,dt){var tx=ox+(px-ox)*e,ty=oy+(py-oy)*e,dx=tx-sx,dy=ty-sy,d=Math.sqrt(dx*dx+dy*dy+9);var k=Math.min(1,dt*1);st[0]+=(dx/d-st[0])*k;st[1]+=(dy/d-st[1])*k;return st}
    function f(t){
      var dt=Math.min(0.05,last?(t-last)/1000:0.016);last=t;
      engage+=((pointer?1:0)-engage)*Math.min(1,dt*2.2);
      if(!still)th+=dt*(2*Math.PI/38)*(1-engage);
      var ax=lerp(20,2.5,engage),ay=lerp(16,2,engage);
      var dx=still?0:kf(t,ph[0]%97,6400)*ax;
      var dy=still?0:kf(t,ph[2]%89,6400)*ay;
      var tx=zx(bx+dx),ty=zy(by+dy),r;
      r=spring(cx,tx,vx,9,dt);cx=r[0];vx=r[1];r=spring(cy,ty,vy,9,dt);cy=r[0];vy=r[1];
      var b=0.78+0.22*(eio(t+ph[1],26300)*0.5+0.5),k=lerp(1,0.85,engage),ox=Math.cos(th)*17*b*k,oy=Math.sin(th)*12.5*b*0.62*k;
      var mx=cx+ox,my=cy+oy;
      r=spring(gx,cx-ox,gvx,lerp(14,7,engage),dt);gx=r[0];gvx=r[1];r=spring(gy,cy-oy,gvy,lerp(14,7,engage),dt);gy=r[0];gvy=r[1];
      var zb=Math.sin(th),S=el.style;
      S.setProperty('--mx',mx.toFixed(2)+'%');S.setProperty('--my',my.toFixed(2)+'%');
      S.setProperty('--rx',gx.toFixed(2)+'%');S.setProperty('--ry',gy.toFixed(2)+'%');
      aimDir(aimB,0,0,-ox,-oy,0,0,0,dt);aimDir(aimR,0,0,ox,oy,0,0,0,dt);var AW=SZ.w,AH=SZ.h;S.setProperty('--mang','135deg');S.setProperty('--rang','-45deg');S.setProperty('--mnw','1');S.setProperty('--rnw','1');if(dt>0){elas(elB,mx,my,dt,AW,AH);elas(elR,gx,gy,dt,AW,AH);}S.setProperty('--mst','0');S.setProperty('--rst','0');hot(hB,mx,my,135,0.9+0.2*sm(zb),'--m',dt,AW,AH,S);hot(hR,gx,gy,-45,(0.9+0.2*sm(-zb))*1.05,'--r',dt,AW,AH,S);
      S.setProperty('--msc',(0.9+0.2*sm(zb)).toFixed(3));S.setProperty('--rsc',(0.9+0.2*sm(-zb)).toFixed(3));
      S.setProperty('--mo',(0.74+0.26*sm(zb)).toFixed(3));S.setProperty('--ro',(0.74+0.26*sm(-zb)).toFixed(3));
      if(head){head.style.setProperty('--hx',(SZ.w*mx/100-SZ.hl).toFixed(1)+'px');head.style.setProperty('--hy',(SZ.h*my/100-SZ.ht).toFixed(1)+'px')}
      if(vis()&&(!still||pointer||engage>0.002))requestAnimationFrame(f);else run=false;
    }
    var run=true;f.wake=function(){if(!run){run=true;last=0;requestAnimationFrame(f)}};
    var vis=watch(el,f);
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();pointer=true;bx=zx((e.clientX-r.left)/r.width*100);by=zy((e.clientY-r.top)/r.height*100);f.wake()});
    el.addEventListener('pointerleave',function(){pointer=false});
    requestAnimationFrame(f);
  });
  /* type specimen glow: 1 spot with the same wander, spring and engage ease */
  document.querySelectorAll('[data-type-glow]').forEach(function(el){
    var cx=50,cy=48,vx=0,vy=0,bx=50,by=48,pointer=false,engage=0,last=0,run=true;
    var ph=[0,1,2,3].map(function(){return Math.random()*1e5}),aimB=[-1,1],aimR=[1,-1];
    var elB={},elR={};
    function elas(o,x,y,dt,W,H){if(o.px==null){o.px=x;o.py=y;o.s=0;o.v=0;o.ux=1;o.uy=0}var vx=(x-o.px)*W/100/dt,vy=(y-o.py)*H/100/dt;o.px=x;o.py=y;var sp=Math.sqrt(vx*vx+vy*vy),tg=Math.min(0.45,sp*0.0011);if(sp>1){var k=Math.min(1,dt*1.2);o.ux+=(vx/sp-o.ux)*k;o.uy+=(vy/sp-o.uy)*k}var a=(tg-o.s)*60-o.v*2*Math.sqrt(60)*0.55;o.v+=a*dt;o.s+=o.v*dt;return o}
    function kf(t,s,P){var n=Math.floor(t/P),u=t/P-n,h=function(i){var x=Math.sin((i+s)*127.1+s*311.7)*43758.5453;return (x-Math.floor(x))*2-1},e=u<0.6?0:(function(v){return v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2})((u-0.6)/0.4);return h(n)+(h(n+1)-h(n))*e}
    function aimDir(st,sx,sy,ox,oy,px,py,e,dt){var tx=ox+(px-ox)*e,ty=oy+(py-oy)*e,dx=tx-sx,dy=ty-sy,d=Math.sqrt(dx*dx+dy*dy+9);var k=Math.min(1,dt*1);st[0]+=(dx/d-st[0])*k;st[1]+=(dy/d-st[1])*k;return st}
    function f(t){
      var dt=Math.min(0.05,last?(t-last)/1000:0.016);last=t;
      engage+=((pointer?1:0)-engage)*Math.min(1,dt*2.2);
      var ax=lerp(20,2.5,engage),ay=lerp(16,2,engage);
      var dx=still?0:kf(t,ph[0]%97,6400)*ax;
      var dy=still?0:kf(t,ph[2]%89,6400)*ay;
      var tx=pointer?bx+dx:lerp(50,bx,engage)+dx,ty=pointer?by+dy:lerp(48,by,engage)+dy,r;
      r=spring(cx,clampX(tx),vx,20,dt);cx=r[0];vx=r[1];r=spring(cy,clampY(ty),vy,20,dt);cy=r[0];vy=r[1];
      el.style.setProperty('--gx',cx.toFixed(2)+'%');el.style.setProperty('--gy',cy.toFixed(2)+'%');
      if(vis()&&(!still||pointer||engage>0.002||Math.abs(vx)+Math.abs(vy)>0.01))requestAnimationFrame(f);else run=false;
    }
    f.wake=function(){if(!run){run=true;last=0;requestAnimationFrame(f)}};
    var vis=watch(el,f);
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();pointer=true;bx=(e.clientX-r.left)/r.width*100;by=(e.clientY-r.top)/r.height*100;f.wake()});
    el.addEventListener('pointerleave',function(){pointer=false;f.wake()});
    requestAnimationFrame(f);
  });
})();
