(function(){
var el=document.querySelector('[data-cs-orbit]');if(!el)return;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var layers=[].slice.call(el.querySelectorAll('.cs-layer'));
var visible=false,t0=performance.now(),raf=0;
// slow two-body orbit: each side circles its rest point in opposite phase, so the pair circles the shared center. No rotation.
var PERIOD=28000,R=0.022,RY=0.6;
// each dot sits on the center of its own spotlight (measured from the art: left 35.8%/52.9%, right 60.4%/51.7%)
var SPOT={l:[0.358,0.529],r:[0.604,0.517]},NW=1920,NH=1169,DOT=687/1920,DOTH=666/1920;
var dl=el.querySelector('.cs-dot-l'),dr=el.querySelector('.cs-dot-r');
function place(){var L=layers[0],w=L.offsetWidth,H=L.offsetHeight,s=Math.max(w/NW,H/NH),iw=NW*s,ih=NH*s,ox=(w-iw)/2,oy=(H-ih)/2;
[[dl,SPOT.l],[dr,SPOT.r]].forEach(function(p){var e=p[0];if(!e)return;var dw=DOT*iw,dh=DOTH*iw;e.style.width=dw+'px';e.style.left=(ox+p[1][0]*iw-dw/2)+'px';e.style.top=(oy+p[1][1]*ih-dh/2)+'px'})}
place();addEventListener('resize',place);
function frame(now){
  var w=el.offsetWidth,h=el.offsetHeight,r=el.getBoundingClientRect();
  var p=((r.top+r.height/2)-innerHeight/2)/innerHeight; // -1..1 around viewport center
  var th=reduce?0:((now-t0)/PERIOD)*Math.PI*2;
  layers.forEach(function(L,i){
    var d=parseFloat(L.dataset.depth)||0;
    L.style.transform='translate3d(0,'+(reduce?0:-p*d*h).toFixed(2)+'px,0)';
    var k=i?1:0.7,dx=Math.cos(th)*R*w*k,dy=Math.sin(th)*R*w*RY*k;
    L.children[0].style.transform='translate3d('+(-dx).toFixed(2)+'px,'+(-dy).toFixed(2)+'px,0)';
    L.children[1].style.transform='translate3d('+dx.toFixed(2)+'px,'+dy.toFixed(2)+'px,0)';
  });
  if(visible&&!reduce)raf=requestAnimationFrame(frame);
}
new IntersectionObserver(function(e){visible=e[0].isIntersecting;cancelAnimationFrame(raf);if(visible)raf=requestAnimationFrame(frame)}).observe(el);
if(reduce)frame(0);
})();
