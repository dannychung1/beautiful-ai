(function(){var w=document.querySelector('#color .cs-slides');if(!w)return;var t=w.querySelector('.cs-track'),cur=document.querySelector('#color .cs-l-cursor'),base=[].slice.call(t.children),N=base.length;base.forEach(function(c){t.appendChild(c.cloneNode(true))});base.forEach(function(c){t.appendChild(c.cloneNode(true))});var cards=[].slice.call(t.children),i=N,SLOT=1;
function P(){return w.offsetHeight*0.194}function TOP(){return w.offsetHeight*0.215}
function place(anim){t.style.transition=anim?'transform .9s cubic-bezier(.65,0,.35,1)':'none';t.style.transform='translateY('+(TOP()-SLOT*P()-i*P()+(SLOT*P()))+'px)';cards.forEach(function(c,k){c.classList.toggle('is-sel',k===i)})}
function size(){var p=P();cards.forEach(function(c,k){c.style.top=k*p+'px'});place(false)}size();addEventListener('resize',size);
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var vis=true;if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(w);
function click(){if(!cur)return;cur.classList.remove('is-click');void cur.offsetWidth;cur.classList.add('is-click')}
function step(){if(vis&&!document.hidden){cards[i].classList.remove('is-sel');i++;place(true);setTimeout(click,1000);if(i===2*N){setTimeout(function(){i=N;place(false)},1000)}}setTimeout(step,2600)}
setTimeout(function(){click();setTimeout(step,1600)},600)})();
