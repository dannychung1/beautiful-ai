// Brand gallery: very subtle parallax on still images (not video). Image is scaled 1.08 inside its frame and drifts with scroll. Off under reduced motion.
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var items=[];
  function collect(){items=[];document.querySelectorAll('.bu-grid .bu-frame').forEach(function(f){if(f.querySelector('video'))return;var m=f.querySelector('image-slot,img');if(!m)return;var sm=(m.getAttribute('style')||'').match(/scale\(([\d.]+)\)/);m.style.setProperty('will-change','transform');items.push({f:f,m:m,s:sm?(+sm[1])*1.04:1.08})})}
  function tick(){var vh=innerHeight;items.forEach(function(o){var r=o.f.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var p=((r.top+r.height/2)-vh/2)/(vh/2+r.height/2);p=Math.max(-1,Math.min(1,p));var y=(-p*r.height*0.03).toFixed(1);o.m.style.setProperty('transform','translate3d(0,'+y+'px,0) scale('+o.s+')','important')})}
  var k=0;function on(){if(!k){k=1;requestAnimationFrame(function(){k=0;tick()})}}
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
  addEventListener('load',function(){collect();tick()});if(document.readyState!=='loading'){collect();tick()}
})();
