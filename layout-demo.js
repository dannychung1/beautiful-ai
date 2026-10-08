(function(){
  var root=document.querySelector('[data-layout-demo]');if(!root)return;
  var MIN=360,MAX=2880,CAP={marketing:1200,showcase:2280};
  var st={w:1440,mode:'showcase'};
  var $=function(s){return root.querySelector(s)};
  var stage=$('.ldm-stage'),track=$('.ldm-track'),vp=$('.ldm-vp'),handle=$('.ldm-handle'),range=$('.ldm-range input'),out=$('.ldm-range output');
  function lerp(a,b,t){return Math.round(a+(b-a)*Math.max(0,Math.min(1,t)))}
  function spec(w){
    var cols,gut,mg;
    if(w<640){cols=4;gut=16;mg=16}
    else if(w<1024){cols=8;gut=lerp(16,24,(w-640)/384);mg=24}
    else{cols=12;gut=24;mg=Math.round(w/12)}
    var content=w-mg*2,cap=CAP[st.mode];
    if(cols===12&&content>cap){content=cap;mg=Math.round((w-cap)/2)}
    var t=(w-390)/(1440-390);
    return {cols:cols,gut:gut,mg:mg,content:content,h1:lerp(48,72,t),body:lerp(16,18,t),cards:cols===4?1:cols===8?2:3};
  }
  function render(){
    var w=st.w,s=spec(w),cs=getComputedStyle(stage),pad=parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight),avail=stage.clientWidth-pad,k=Math.min(1,avail/w),h=Math.max(560,Math.round(w*0.56));
    if(w<1024)h=Math.max(h,820);
    vp.style.width=w+'px';vp.style.height=h+'px';vp.style.transform='scale('+k+')';
    track.style.width=Math.round(w*k)+'px';track.style.height=Math.round(h*k)+'px';
    handle.style.left=Math.round(w*k)+'px';
    var col=vp.querySelector('.ldm-col');col.style.width=s.content+'px';col.style.gridTemplateColumns='repeat('+s.cols+',minmax(0,1fr))';col.style.columnGap=s.gut+'px';
    col.innerHTML=new Array(s.cols+1).join('<i></i>');
    var ml=vp.querySelector('.ldm-mg.l'),mr=vp.querySelector('.ldm-mg.r');ml.style.left='0';ml.style.width=s.mg+'px';mr.style.right='0';mr.style.width=s.mg+'px';
    var pg=vp.querySelector('.ldm-page');pg.style.width=s.content+'px';pg.style.paddingTop=Math.round(s.h1*0.5)+'px';
    var nav=pg.querySelector('.ldm-nav');nav.style.fontSize=s.body+'px';nav.style.marginBottom=Math.round(s.h1*1.4)+'px';nav.lastElementChild.style.padding=Math.round(s.body*.6)+'px '+s.body+'px';
    var eb=pg.querySelector('.ldm-eb');eb.style.fontSize=Math.max(11,Math.round(s.body*.7))+'px';eb.style.marginBottom='12px';
    var hd=pg.querySelector('.ldm-h');hd.style.fontSize=s.h1+'px';hd.style.maxWidth=s.cols===12?'10ch':'none';
    var p=pg.querySelector('.ldm-p');p.style.fontSize=s.body+'px';p.style.marginTop='32px';
    var cs=pg.querySelector('.ldm-cards');cs.style.gridTemplateColumns='repeat('+s.cards+',minmax(0,1fr))';cs.style.gap=s.gut+'px';cs.style.marginTop=Math.round(s.h1*1.2)+'px';
    cs.querySelectorAll('.ldm-card').forEach(function(c,i){c.style.padding=Math.round(s.gut)+'px';c.style.display=(s.cards===2&&i===2)?'none':'';c.querySelector('i').style.marginBottom=s.gut*.75+'px';c.querySelector('b').style.fontSize=Math.round(s.body*1.33)+'px';c.querySelector('span').style.fontSize=Math.round(s.body*.88)+'px'});
    range.value=w;out.textContent=w+' px';handle.setAttribute('aria-valuenow',w);
    var r={w:w+' px',cols:s.cols,gut:s.gut+' px',mg:s.mg+' px',content:s.content+' px',h1:s.h1+' / '+s.body+' px'};
    Object.keys(r).forEach(function(key){var el=root.querySelector('[data-r="'+key+'"]');if(el)el.textContent=r[key]});
    root.querySelectorAll('[data-w]').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.w===w)});
    root.querySelectorAll('[data-mode]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.mode===st.mode)});
  }
  function setW(w){st.w=Math.max(MIN,Math.min(MAX,Math.round(w)));render()}
  root.querySelectorAll('[data-w]').forEach(function(b){b.addEventListener('click',function(){setW(+b.dataset.w)})});
  root.querySelectorAll('[data-mode]').forEach(function(b){b.addEventListener('click',function(){st.mode=b.dataset.mode;render()})});
  range.min=MIN;range.max=MAX;range.addEventListener('input',function(){setW(+range.value)});
  handle.setAttribute('aria-valuemin',MIN);handle.setAttribute('aria-valuemax',MAX);
  handle.addEventListener('keydown',function(e){var d=e.shiftKey?100:10;if(e.key==='ArrowRight'){setW(st.w+d);e.preventDefault()}if(e.key==='ArrowLeft'){setW(st.w-d);e.preventDefault()}});
  handle.addEventListener('pointerdown',function(e){e.preventDefault();handle.setPointerCapture(e.pointerId);var x0=e.clientX,w0=st.w,k=track.offsetWidth/st.w;
    function mv(ev){setW(w0+(ev.clientX-x0)/Math.max(k,.05))}
    function up(){handle.removeEventListener('pointermove',mv);handle.removeEventListener('pointerup',up)}
    handle.addEventListener('pointermove',mv);handle.addEventListener('pointerup',up)});
  if('ResizeObserver' in window)new ResizeObserver(render).observe(stage);else addEventListener('resize',render);
  render();
})();
