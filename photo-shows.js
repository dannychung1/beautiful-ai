/* Hero slideshows: crossfade every 5s, staggered per column. Hover or focus
   pauses a show so you can drag a photo onto the visible slot. */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-show]').forEach(function(show,col){
    var slides=show.querySelectorAll('.show-slide'),dots=show.querySelectorAll('.show-dots button'),i=0,t=0,paused=false;
    function go(n){slides[i].classList.remove('is-on');if(dots[i])dots[i].classList.remove('is-on');i=(n+slides.length)%slides.length;slides[i].classList.add('is-on');if(dots[i])dots[i].classList.add('is-on')}
    function tick(){if(!paused&&!document.hidden)go(i+1)}
    dots.forEach(function(d,n){d.addEventListener('click',function(){go(n)})});
    show.addEventListener('pointerenter',function(){paused=true});
    show.addEventListener('pointerleave',function(){paused=false});
    show.addEventListener('focusin',function(){paused=true});
    show.addEventListener('focusout',function(){paused=false});
    show.addEventListener('dragenter',function(){paused=true});
    if(!reduce)setTimeout(function(){t=setInterval(tick,5000)},col*1600);
  });
})();
