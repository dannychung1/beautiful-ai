// site.js — shared chrome for the multi-page guide: contents panel + eased in-page anchors
function toggleNav(){document.querySelector('.sidenav').classList.toggle('collapsed');}
(function(){
  var nav=document.querySelector('.sidenav');if(!nav)return;
  nav.classList.add('collapsed'); // every page load starts closed — navigating never pops the panel
  requestAnimationFrame(function(){nav.classList.add('nav-anim');});
  document.addEventListener('click',function(e){
    if(nav.contains(e.target)||e.target.closest('.nav-fab'))return;
    nav.classList.add('collapsed');
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')nav.classList.toggle('collapsed');});
  nav.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){nav.classList.add('collapsed');});});
  // sub-links track the section in view on the current page
  var subs=[].slice.call(nav.querySelectorAll('nav a.sub'));
  if(subs.length){
    function mark(){
      var y=window.scrollY+window.innerHeight*0.3,cur=null;
      subs.forEach(function(a){
        a.classList.remove('here');
        var s=document.querySelector(a.getAttribute('href'));
        if(s&&y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight)cur=a;
      });
      if(cur)cur.classList.add('here');
    }
    mark();var raf;
    window.addEventListener('scroll',function(){if(raf)return;raf=requestAnimationFrame(function(){raf=null;mark();});},{passive:true});
    window.addEventListener('resize',mark);
  }
})();
(function(){
  function easeTo(y){
    var start=window.scrollY,d=y-start,t0=null,dur=Math.min(900,Math.max(320,Math.abs(d)*0.28));
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||Math.abs(d)<2){window.scrollTo(0,y);return;}
    function step(t){
      if(t0===null)t0=t;
      var p=Math.min(1,(t-t0)/dur),e=p<0.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      window.scrollTo(0,start+d*e);
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;
    var id=a.getAttribute('href');if(id==='#'||id.length<2)return;
    var el=document.querySelector(id);if(!el)return;
    e.preventDefault();
    easeTo(Math.max(0,el.getBoundingClientRect().top+window.scrollY));
    history.replaceState(null,'',id);
  });
})();

// chapter sub-nav: lists the chapter's sections (or its sub-sections when it has no sections)
(function(){
  var hero=document.querySelector('.chapter-hero');if(!hero||hero.closest('#introduction'))return;
  var items=[].slice.call(document.querySelectorAll('.sub-head'));
  var pick=function(el){return el.querySelector('h2')};
  if(items.length<2){items=[].slice.call(document.querySelectorAll('.sub-title:not(.st-nested)')).filter(function(el){return el.querySelector('h3')});pick=function(el){return el.querySelector('h3')};}
  if(items.length<2)return;
  var slug=function(t){return t.toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
  var wrap=document.createElement('div');wrap.className='wrap';
  var nav=document.createElement('nav');nav.className='ch-subnav';nav.setAttribute('aria-label','In this chapter');
  var name=document.createElement('p');name.className='csn-name sh-label';name.textContent='In this chapter';
  var list=document.createElement('ul');if(items.length>6)list.classList.add('csn-cols');
  items.forEach(function(el){
    var t=pick(el).textContent.trim();if(!el.id)el.id='s-'+slug(t);
    var li=document.createElement('li'),a=document.createElement('a');a.href='#'+el.id;a.textContent=t;li.appendChild(a);list.appendChild(li);
  });
  nav.appendChild(name);nav.appendChild(list);wrap.appendChild(nav);
  hero.parentNode.insertBefore(wrap,hero.nextSibling);
})();

(function(){if(document.querySelector('.top-fab'))return;var b=document.createElement('button');b.className='top-fab';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='<span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>';document.body.appendChild(b);
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
b.addEventListener('click',function(){window.scrollTo({top:0,behavior:still?'auto':'smooth'});var f=document.querySelector('.nav-fab');if(f)f.focus({preventScroll:true})});
function u(){b.classList.toggle('is-visible',window.scrollY>window.innerHeight*1.2)}window.addEventListener('scroll',u,{passive:true});u();})();
