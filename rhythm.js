// Image/video block rhythm: full-width blocks use the guide's landscape ratio (3840x2336), narrower blocks are square.
// Heights snap to the 8px vertical grid. Vertical 9:16 motion and product UI screenshots keep their own shape.
(function(){
  var FULL=3840/2336,GRID=8;
  var SKIP='#archetype,.pr-card,.pr-img,.ad-mosaic,[data-mosaic],.cover,.chapter-hero,header,nav,footer,.sidenav,.wr-stage,.bd,.copy-hex,.mini-slide,.ldm-vp,.sys-dot,.pair,.minsize,[data-rhythm="off"]';
  var isUI=function(s){return /prod-ui/i.test(s||'')};
  function frameOf(m){
    var el=m.parentElement;
    while(el&&el!==document.body){
      var cs=getComputedStyle(el);
      if(el.matches('.bu-frame,.ac-frame,.logo-stage,.preview,.dm-clip,.logo-motion,figure>div,.img-frame,.photo-frame'))return el;
      if(cs.overflow==='hidden'||cs.aspectRatio!=='auto')return el;
      el=el.parentElement}
    return m.parentElement}
  function colWidth(el){var w=el.closest('.wrap');if(!w)return 0;var cs=getComputedStyle(w);return w.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight)}
  function cands(){var out=[],seen=new Set();
    document.querySelectorAll('.wrap img,.wrap video,.wrap image-slot').forEach(function(m){
      if(m.closest(SKIP))return;if(m.parentElement&&m.parentElement.closest('image-slot'))return;
      var f=frameOf(m);if(!f||seen.has(f))return;seen.add(f);
      if(getComputedStyle(f).position==='absolute'||f.getBoundingClientRect().width<120)return;
      var src=m.getAttribute('src')||'',tall=(m.tagName==='VIDEO'&&m.videoWidth&&m.videoWidth/m.videoHeight<1)||/aspect-ratio:\s*9\s*\/\s*16/.test(f.getAttribute('style')||'');
      out.push({f:f,m:m,src:src,ui:isUI(src)&&!m.hasAttribute('data-crop-ok'),tall:tall})});
    document.querySelectorAll('.wrap .logo-stage,.wrap .dont .preview').forEach(function(f){if(f.closest(SKIP)||seen.has(f)||f.getBoundingClientRect().width<120)return;seen.add(f);out.push({f:f,m:null,src:'',ui:false,tall:false})});
    return out}
  function fill(c,h){var f=c.f,m=c.m;f.style.setProperty('aspect-ratio','auto','important');f.style.setProperty('height',h+'px','important');f.style.setProperty('overflow','hidden','important');
    if(!m||m.hasAttribute('data-keep-size')||f.matches('.logo-stage,.preview')||/\.svg/i.test(c.src))return;
    ['width','height'].forEach(function(p){m.style.setProperty(p,'100%','important')});
    if(m.tagName!=='IMAGE-SLOT'){m.style.setProperty('object-fit','cover','important');m.style.setProperty('aspect-ratio','auto','important');m.style.setProperty('max-width','none','important');m.style.setProperty('max-height','none','important')}}
  function run(){
    document.querySelectorAll('[data-rhythm]').forEach(function(e){e.removeAttribute('data-rhythm');e.style.removeProperty('height');e.style.removeProperty('aspect-ratio')});
    var cs=cands(),rows=new Map();
    cs.forEach(function(c){var b=c.f.getBoundingClientRect(),g=c.f.closest('.bu-grid,.bu-heroes,.donts,.logo-variants,.aud-cols,.deck-motion,.wm-grid')||c.f.parentElement,k=(g?Array.prototype.indexOf.call(document.querySelectorAll('*'),g):0)+':'+Math.round((b.top+scrollY)/6);if(!rows.has(k))rows.set(k,[]);rows.get(k).push(c)});
    rows.forEach(function(row){
      if(row.some(function(c){return c.tall}))return;
      var cw=colWidth(row[0].f),ws=row.map(function(c){return c.f.getBoundingClientRect().width}),h;
      var ui=row.filter(function(c){return c.ui});
      var mw0=Math.min.apply(null,ws),third0=cw&&row.length>1&&mw0>=cw*0.28&&mw0<=cw*0.36;
      if(third0){h=Math.round(mw0*3/4/GRID)*GRID}
      else if(ui.length){h=Math.round(ui[0].f.getBoundingClientRect().height/GRID)*GRID}
      else if(row.length===1&&cw&&ws[0]>=cw*0.9){h=Math.round(ws[0]/FULL/GRID)*GRID}
      else{var mw=Math.min.apply(null,ws),third=cw&&mw>=cw*0.28&&mw<=cw*0.36;h=Math.round((third?mw*3/4:mw)/GRID)*GRID}
      row.forEach(function(c){c.f.setAttribute('data-rhythm',row.length===1&&h<ws[0]*0.9?'full':'row');fill(c,h)})})}
  var t;function later(){clearTimeout(t);t=setTimeout(run,80)}
  addEventListener('load',run);addEventListener('resize',later);document.addEventListener('loadedmetadata',later,true);
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
})();
