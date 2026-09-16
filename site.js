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
