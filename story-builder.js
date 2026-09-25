(function(){
document.querySelectorAll('.story-builder').forEach(function(root){
var S=JSON.parse(root.getAttribute('data-stories')),tog=[].slice.call(root.querySelectorAll('.sb-tog')),hint=root.querySelector('.sb-hint'),story=root.querySelector('.sb-story'),count=root.querySelector('.sb-count');
var DEF=hint.textContent,combo=root.getAttribute('data-combo'),timer;
function label(c){var n=c.split('').filter(function(b){return b==='1'}).length;return n===3?'All 3 facets: the complete brand story.':n===2?'2 facets: a focused pairing.':'1 facet: a single, focused story.'}
function paint(){root.setAttribute('data-combo',combo);
 root.querySelectorAll('.sb-slot').forEach(function(sl){sl.hidden=sl.getAttribute('data-combo')!==combo});
 root.querySelectorAll('.sb-dots i').forEach(function(d,k){d.classList.toggle('on',combo[k]==='1')});
 story.textContent=S[combo];count.textContent=label(combo);
 tog.forEach(function(t,k){var on=combo[k]==='1';t.setAttribute('aria-pressed',on);var b=t.querySelector('.sb-tog-box');if(b)b.textContent=on?'check_box':'check_box_outline_blank'});}
tog.forEach(function(t,k){t.addEventListener('click',function(){
 var n=combo.slice(0,k)+(combo[k]==='1'?'0':'1')+combo.slice(k+1);
 if(n==='000'){hint.textContent='Keep at least 1 facet on.';clearTimeout(timer);timer=setTimeout(function(){hint.textContent=DEF},1600);return}
 combo=n;paint();});});
paint();
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
setInterval(function(){if(reduce||document.hidden)return;
 var sl=root.querySelector('.sb-slot:not([hidden])');if(!sl)return;
 var f=sl.querySelectorAll('.sb-frame');if(f.length<2)return;
 var i=[].findIndex.call(f,function(x){return x.classList.contains('is-on')});
 f[i].classList.remove('is-on');f[(i+1)%f.length].classList.add('is-on');},4500);
});
})();
