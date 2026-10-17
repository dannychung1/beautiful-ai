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
  var items=[].slice.call(document.querySelectorAll('.sub-head,[data-nav-top]'));
  var pick=function(el){return el.dataset.navLabel?{textContent:el.dataset.navLabel}:(el.querySelector('h2')||el.querySelector('h3'))};
  if(items.length<2){items=[].slice.call(document.querySelectorAll('.sub-title:not(.st-nested),[data-nav-label]')).filter(function(el){return !el.closest('[hidden]')&&(el.dataset.navLabel||el.querySelector('h3'))});pick=function(el){return el.dataset.navLabel?{textContent:el.dataset.navLabel}:el.querySelector('h3')};}
  if(items.length<2){
    // no chapter menu (Brand gallery): intro joins the title banner, and the page below rises over it
    var nx0=hero.nextElementSibling,in0=nx0&&nx0.firstElementChild;
    if(in0&&/section-head|ch-intro|ch-lead/.test(in0.className)){var hw0=hero.querySelector('.wrap')||hero;in0.classList.add('ch-hero-intro');hw0.appendChild(in0)}
    if(nx0&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      hero.classList.add('csn-back');nx0.classList.add('csn-front','csn-front-plain');
      var t0=0,c0=0,m0=function(){hero.style.transform='';t0=hero.getBoundingClientRect().top+scrollY;c0=hero.offsetHeight*0.6};
      var p0=function(){var d=Math.max(0,scrollY-Math.max(0,t0-innerHeight*0.5));hero.style.transform='translate3d(0,'+Math.min(c0,d*0.3).toFixed(1)+'px,0)'};
      var k0=0;addEventListener('scroll',function(){if(!k0){k0=1;requestAnimationFrame(function(){k0=0;p0()})}},{passive:true});
      addEventListener('resize',function(){m0();p0()});addEventListener('load',function(){m0();p0()});m0();p0();
    }
    return;
  }
  var slug=function(t){return t.toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
  var wrap=document.createElement('div');wrap.className='wrap';
  var nav=document.createElement('nav');nav.className='ch-subnav';nav.setAttribute('aria-label','In this chapter');
  var name=document.createElement('p');name.className='csn-name sh-label';name.textContent='In this chapter';
  var list=document.createElement('ul');if(items.length>6)list.classList.add('csn-cols');
  var nested=items.some(function(el){return !!el.querySelector('h2')});
  var subs=nested?[].slice.call(document.querySelectorAll('.sub-title:not(.st-nested),[data-nav-label]')).filter(function(el){return !el.closest('[hidden]')&&(el.dataset.navLabel||el.querySelector('h3'))}):[];
  if(nested)list.classList.add('csn-nested');
  items.forEach(function(el,i){
    var t=pick(el).textContent.trim();if(!el.id)el.id='s-'+slug(t);
    var li=document.createElement('li'),a=document.createElement('a');a.href='#'+el.id;a.textContent=t;li.appendChild(a);list.appendChild(li);
    if(!nested)return;
    var next=items[i+1],ul=document.createElement('ul');ul.className='csn-subs';
    subs.forEach(function(st){if(st.hasAttribute('data-nav-top'))return;if(!(el.compareDocumentPosition(st)&Node.DOCUMENT_POSITION_FOLLOWING))return;if(next&&!(st.compareDocumentPosition(next)&Node.DOCUMENT_POSITION_FOLLOWING))return;var h=st.dataset.navLabel||st.querySelector('h3').textContent.trim();if(!st.id)st.id='s-'+slug(h);var sl=document.createElement('li'),sa=document.createElement('a');sa.href='#'+st.id;sa.textContent=h;sl.appendChild(sa);ul.appendChild(sl)});
    if(ul.children.length)li.appendChild(ul);
  });
  // 2 columns that read down, then across, in page order
  list.style.setProperty('--csn-rows',Math.ceil(list.children.length/2));list.classList.add('csn-down');
  nav.appendChild(name);nav.appendChild(list);wrap.appendChild(nav);
  hero.parentNode.insertBefore(wrap,hero.nextSibling);
  // the chapter intro sits above the chapter links
  var nx=wrap.nextElementSibling,intro=nx&&nx.firstElementChild;
  if(intro&&/section-head|ch-intro|ch-lead/.test(intro.className)){var iw=document.createElement('div');iw.className='wrap ch-intro-wrap';iw.appendChild(intro);if(intro.hasAttribute('data-intro-after')){iw.classList.add('ch-intro-after');hero.parentNode.insertBefore(iw,wrap.nextSibling)}else{var hw=hero.querySelector('.wrap')||hero;intro.classList.add('ch-hero-intro');hw.appendChild(intro);if(nx&&!nx.children.length)nx.classList.add('csn-empty')}}
  // the menu band and everything below it rise over the block above (intro, or the hero on Foundation)
  var back=[];for(var el=hero;el&&el!==wrap;el=el.nextElementSibling)back.push(el);
  if(back.length&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    back.forEach(function(b){b.classList.add('csn-back')});wrap.classList.add('csn-front');
    var top0=0,cap=0,measure=function(){back.forEach(function(b){b.style.transform=''});top0=hero.getBoundingClientRect().top+scrollY;cap=wrap.offsetHeight*0.8};
    var par=function(){var d=Math.max(0,scrollY-Math.max(0,top0-innerHeight*0.5)),t='translate3d(0,'+Math.min(cap,d*0.3).toFixed(1)+'px,0)';back.forEach(function(b){b.style.transform=t})};
    var tk=0;addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;par()})}},{passive:true});
    addEventListener('resize',function(){measure();par()});addEventListener('load',function(){measure();par()});measure();par();
  }
})();

// global nav: the current chapter lists its sections, and each section lists its sub-sections
(function(){
  return; // chapter sub-sections live only in the on-page "In this chapter" list
  var cur=document.querySelector('.sidenav nav a.active');if(!cur)return;
  var slug=function(t){return t.toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
  var idOf=function(el,h){if(!el.id)el.id='s-'+slug(h.textContent.trim());return el.id};
  var h3s=[].slice.call(document.querySelectorAll('.sub-title:not(.st-nested),[data-nav-label]')).filter(function(el){return !el.closest('[hidden]')&&(el.dataset.navLabel||el.querySelector('h3'))});
  var mk=function(cls,href,txt){var a=document.createElement('a');a.className=cls;a.href=href;a.textContent=txt;return a};
  var subs=[],n=cur.nextElementSibling;while(n&&n.classList.contains('sub')){subs.push(n);n=n.nextElementSibling}
  var heads=[].slice.call(document.querySelectorAll('.sub-head,[data-nav-top]')).filter(function(el){return el.querySelector('h2')||el.hasAttribute('data-nav-top')});
  if(!subs.length){
    var src=heads.length>=2?heads:h3s,after=cur;if(src.length<2)return;
    src.forEach(function(el){var h=el.dataset.navLabel?{textContent:el.dataset.navLabel}:(heads.length>=2?(el.querySelector('h2')||el.querySelector('h3')):el.querySelector('h3'));var a=mk('sub','#'+idOf(el,h),h.textContent.trim());after.parentNode.insertBefore(a,after.nextSibling);after=a;subs.push(a)});
    if(heads.length<2)return;
  }
  var tgt=subs.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))});
  subs.forEach(function(a,i){if(!tgt[i])return;var next=tgt[i+1],after=a;
    h3s.forEach(function(st){if(st===tgt[i]||st.hasAttribute('data-nav-top'))return;if(!(tgt[i].compareDocumentPosition(st)&Node.DOCUMENT_POSITION_FOLLOWING)&&!tgt[i].contains(st))return;if(next&&!(st.compareDocumentPosition(next)&Node.DOCUMENT_POSITION_FOLLOWING))return;var lb=st.dataset.navLabel||st.querySelector('h3').textContent.trim();if(!st.id)st.id='s-'+slug(lb);var b=mk('sub sub2','#'+st.id,lb);after.parentNode.insertBefore(b,after.nextSibling);after=b});
  });
})();

(function(){if(document.querySelector('.top-fab'))return;var b=document.createElement('button');b.className='top-fab';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='<span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>';document.body.appendChild(b);
var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
b.addEventListener('click',function(){window.scrollTo({top:0,behavior:still?'auto':'smooth'});var f=document.querySelector('.nav-fab');if(f)f.focus({preventScroll:true})});
function u(){b.classList.toggle('is-visible',window.scrollY>window.innerHeight*1.2)}window.addEventListener('scroll',u,{passive:true});u();})();
