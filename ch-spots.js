(function(){
  var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function eio(t,p){var q=(t%p)/p,tri=q<0.5?q*2:2-q*2,s=tri*tri*tri*(tri*(tri*6-15)+10);return s*2-1}
  function spring(c,g,v,k,dt){var a=(g-c)*k-v*2*Math.sqrt(k);return [c+v*dt,v+a*dt]}
  function sm(z){return 0.5+0.5*z*(1.5-0.5*z*z)}
  document.querySelectorAll('.chapter-hero').forEach(function(el){
    if(el.closest('#introduction'))return;
    el.classList.add('ch-spots');
    ['cover-mark','cover-mark alt','cover-dither'].forEach(function(c){var d=document.createElement('div');d.className=c;d.setAttribute('aria-hidden','true');el.insertBefore(d,el.firstChild)});
    var cx=50,cy=50,vx=0,vy=0,gx=50,gy=50,gvx=0,gvy=0,th=Math.random()*6.283,last=0,on=true;
    var ph=[0,1,2,3].map(function(){return Math.random()*1e5});
    function f(t){
      var dt=Math.min(0.05,last?(t-last)/1000:0.016);last=t;
      if(!still)th+=dt*(2*Math.PI/38);
      var dx=still?0:(eio(t+ph[0],21500)*0.62+eio(t+ph[1],13700)*0.38)*20;
      var dy=still?0:(eio(t+ph[2],17900)*0.6+eio(t+ph[3],11300)*0.4)*16;
      var tx=Math.max(6,Math.min(94,50+dx)),ty=Math.max(6,Math.min(92,50+dy)),r;
      r=spring(cx,tx,vx,20,dt);cx=r[0];vx=r[1];r=spring(cy,ty,vy,20,dt);cy=r[0];vy=r[1];
      var b=0.78+0.22*(eio(t+ph[1],26300)*0.5+0.5),ox=Math.cos(th)*17*b,oy=Math.sin(th)*12.5*b*0.62;
      r=spring(gx,cx-ox,gvx,14,dt);gx=r[0];gvx=r[1];r=spring(gy,cy-oy,gvy,14,dt);gy=r[0];gvy=r[1];
      var zb=Math.sin(th),S=el.style;
      S.setProperty('--mx',(cx+ox).toFixed(2)+'%');S.setProperty('--my',(cy+oy).toFixed(2)+'%');
      S.setProperty('--rx',gx.toFixed(2)+'%');S.setProperty('--ry',gy.toFixed(2)+'%');
      S.setProperty('--msc',(0.9+0.2*sm(zb)).toFixed(3));S.setProperty('--rsc',(0.9+0.2*sm(-zb)).toFixed(3));
      S.setProperty('--mo',(0.74+0.26*sm(zb)).toFixed(3));S.setProperty('--ro',(0.74+0.26*sm(-zb)).toFixed(3));
      if(on&&!still)requestAnimationFrame(f);
    }
    if('IntersectionObserver' in window)new IntersectionObserver(function(e){var was=on;on=e[0].isIntersecting;if(on&&!was){last=0;requestAnimationFrame(f)}}).observe(el);
    requestAnimationFrame(f);
  });
})();
