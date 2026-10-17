(function(){
  var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function eio(t,p){var q=(t%p)/p,tri=q<0.5?q*2:2-q*2,s=tri*tri*tri*(tri*(tri*6-15)+10);return s*2-1}
  function spring(c,g,v,k,dt){var a=(g-c)*k-v*2*Math.sqrt(k);return [c+v*dt,v+a*dt]}
  function sm(z){return 0.5+0.5*z*(1.5-0.5*z*z)}
  function lerp(a,b,u){return a+(b-a)*u}
  function clampX(v){return Math.max(6,Math.min(94,v))}function clampY(v){return Math.max(6,Math.min(92,v))}
  function watch(el,f){var on=true;if('IntersectionObserver' in window)new IntersectionObserver(function(e){var was=on;on=e[0].isIntersecting;if(on&&!was)f.wake()}).observe(el);return function(){return on}}
  /* chapter heroes: the cover's two-spot dance, led by the cursor while it is over the band */
  document.querySelectorAll('.chapter-hero').forEach(function(el){
    if(el.closest('#introduction'))return;
    el.classList.add('ch-spots');
    ['cover-mark','cover-mark alt','cover-dither'].forEach(function(c){var d=document.createElement('div');d.className=c;d.setAttribute('aria-hidden','true');el.insertBefore(d,el.firstChild)});
    var hasText=!!el.querySelector('.ch-hero-intro');
    /* keep the bright spots clear of the title and intro: right of the text on desktop, above it on narrow screens */
    function zone(){var w=innerWidth>900;return hasText?(w?{x0:62,x1:94,y0:6,y1:92,bx:78,by:50}:{x0:6,x1:94,y0:4,y1:30,bx:60,by:16}):{x0:6,x1:94,y0:6,y1:92,bx:50,by:50}}
    var Z=zone();addEventListener('resize',function(){Z=zone();if(!pointer){bx=Z.bx;by=Z.by}});
    function zx(v){return Math.max(Z.x0,Math.min(Z.x1,v))}function zy(v){return Math.max(Z.y0,Math.min(Z.y1,v))}
    var cx=Z.bx,cy=Z.by,vx=0,vy=0,gx=Z.bx,gy=Z.by,gvx=0,gvy=0,bx=Z.bx,by=Z.by,pointer=false,engage=0,th=Math.random()*6.283,last=0;
    var ph=[0,1,2,3].map(function(){return Math.random()*1e5});
    function f(t){
      var dt=Math.min(0.05,last?(t-last)/1000:0.016);last=t;
      engage+=((pointer?1:0)-engage)*Math.min(1,dt*2.2);
      if(!still)th+=dt*(2*Math.PI/38);
      var ax=lerp(20,2.5,engage),ay=lerp(16,2,engage);
      var dx=still?0:(eio(t+ph[0],21500)*0.62+eio(t+ph[1],13700)*0.38)*ax;
      var dy=still?0:(eio(t+ph[2],17900)*0.6+eio(t+ph[3],11300)*0.4)*ay;
      var tx=zx(bx+dx),ty=zy(by+dy),r;
      r=spring(cx,tx,vx,20,dt);cx=r[0];vx=r[1];r=spring(cy,ty,vy,20,dt);cy=r[0];vy=r[1];
      var b=0.78+0.22*(eio(t+ph[1],26300)*0.5+0.5),k=lerp(1,0.42,engage),ox=Math.cos(th)*17*b*k,oy=Math.sin(th)*12.5*b*0.62*k;
      var mx=zx(cx+ox*(1-engage)),my=zy(cy+oy*(1-engage));
      r=spring(gx,zx(cx-ox),gvx,lerp(14,7,engage),dt);gx=r[0];gvx=r[1];r=spring(gy,zy(cy-oy),gvy,lerp(14,7,engage),dt);gy=r[0];gvy=r[1];
      var zb=Math.sin(th),S=el.style;
      S.setProperty('--mx',mx.toFixed(2)+'%');S.setProperty('--my',my.toFixed(2)+'%');
      S.setProperty('--rx',gx.toFixed(2)+'%');S.setProperty('--ry',gy.toFixed(2)+'%');
      S.setProperty('--msc',(0.9+0.2*sm(zb)).toFixed(3));S.setProperty('--rsc',(0.9+0.2*sm(-zb)).toFixed(3));
      S.setProperty('--mo',(0.74+0.26*sm(zb)).toFixed(3));S.setProperty('--ro',(0.74+0.26*sm(-zb)).toFixed(3));
      if(vis()&&(!still||pointer||engage>0.002))requestAnimationFrame(f);else run=false;
    }
    var run=true;f.wake=function(){if(!run){run=true;last=0;requestAnimationFrame(f)}};
    var vis=watch(el,f);
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();pointer=true;bx=zx((e.clientX-r.left)/r.width*100);by=zy((e.clientY-r.top)/r.height*100);f.wake()});
    el.addEventListener('pointerleave',function(){pointer=false;bx=Z.bx;by=Z.by});
    requestAnimationFrame(f);
  });
  /* type specimen glow: 1 spot with the same wander, spring and engage ease */
  document.querySelectorAll('[data-type-glow]').forEach(function(el){
    var cx=50,cy=48,vx=0,vy=0,bx=50,by=48,pointer=false,engage=0,last=0,run=true;
    var ph=[0,1,2,3].map(function(){return Math.random()*1e5});
    function f(t){
      var dt=Math.min(0.05,last?(t-last)/1000:0.016);last=t;
      engage+=((pointer?1:0)-engage)*Math.min(1,dt*2.2);
      var ax=lerp(20,2.5,engage),ay=lerp(16,2,engage);
      var dx=still?0:(eio(t+ph[0],21500)*0.62+eio(t+ph[1],13700)*0.38)*ax;
      var dy=still?0:(eio(t+ph[2],17900)*0.6+eio(t+ph[3],11300)*0.4)*ay;
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
