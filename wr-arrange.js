/* Arrange mode for the Work-ready stage — a temporary authoring tool.
   Press A (or load with ?arrange) to toggle. Drag tiles, nudge with arrows,
   resize with [ and ], then Copy CSS and paste it back to Claude to bake in. */
(function(){
  var stage=document.querySelector('.wr-stage');if(!stage)return;
  var KEY='wrArrangePositions';
  var items=[].slice.call(stage.querySelectorAll('.wr-tofu,.wr-word,.wr-ui,.wr-spot'));
  function keyOf(el){return [].slice.call(el.classList).filter(function(c){return /^wr-(t|w|u|s)\d+$/.test(c)})[0]||''}
  var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  function apply(el){var k=keyOf(el),s=saved[k];if(!s)return;
    el.style.left=s.left+'%';el.style.top=s.top+'%';if(s.width)el.style.width=s.width+'%';}
  items.forEach(apply);

  var on=false,panel,sel=null;
  function pct(el){var r=stage.getBoundingClientRect(),b=el.getBoundingClientRect();
    return {left:+(((b.left-r.left)/r.width)*100).toFixed(2),top:+(((b.top-r.top)/r.height)*100).toFixed(2),width:+((b.width/r.width)*100).toFixed(2)};}
  function store(el){var k=keyOf(el);saved[k]=pct(el);localStorage.setItem(KEY,JSON.stringify(saved));readout();}
  function css(){return items.map(function(el){var k=keyOf(el),s=saved[k]||pct(el);
      return '.'+k+'{left:'+s.left+'%;top:'+s.top+'%;width:'+s.width+'%}'}).join('\n');}
  function readout(){if(panel)panel.querySelector('pre').textContent=css();}

  function build(){
    panel=document.createElement('div');panel.className='wra-panel';
    panel.innerHTML='<div class="wra-hd">Arrange mode <span>A to exit</span></div>'+
      '<pre></pre><div class="wra-tip">Drag to move · arrows nudge (shift = 5×) · [ ] resize · click to select</div>'+
      '<div class="wra-row"><button data-a="copy">Copy CSS</button><button data-a="reset">Reset</button></div>';
    document.body.appendChild(panel);
    panel.addEventListener('click',function(e){var a=e.target.dataset.a;if(!a)return;
      if(a==='copy'){navigator.clipboard.writeText(css());e.target.textContent='Copied';setTimeout(function(){e.target.textContent='Copy CSS'},1200);}
      if(a==='reset'){localStorage.removeItem(KEY);location.reload();}});
    var st=document.createElement('style');
    st.textContent='.wra-panel{position:fixed;right:20px;bottom:20px;z-index:9999;width:280px;background:#fff;border:1px solid rgba(0,9,13,.12);border-radius:8px;box-shadow:0 16px 40px rgba(0,0,0,.15);padding:14px;font-family:var(--mono,monospace);font-size:11px;color:#001A24}'+
      '.wra-hd{display:flex;justify-content:space-between;text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px}.wra-hd span{color:#4C5255}'+
      '.wra-panel pre{margin:0 0 10px;max-height:190px;overflow:auto;font-size:10px;line-height:1.5;color:#4C5255;white-space:pre}'+
      '.wra-tip{color:#4C5255;line-height:1.5;margin-bottom:10px}'+
      '.wra-row{display:flex;gap:8px}.wra-panel button{flex:1;padding:7px 0;border:1px solid rgba(0,9,13,.15);border-radius:6px;background:#F0F3F5;font:inherit;cursor:pointer}'+
      '.wra-panel button:hover{background:#E5F8FF;border-color:rgba(0,148,204,.4)}'+
      '.wra-on .wr-tofu,.wra-on .wr-word,.wra-on .wr-ui{cursor:grab;outline:1px dashed rgba(0,148,204,.5);outline-offset:2px}'+
      '.wra-on .wra-sel{outline:2px solid #0094CC!important;outline-offset:2px}';
    document.head.appendChild(st);
  }

  function toggle(v){
    on=v===undefined?!on:v;
    document.body.classList.toggle('wra-on',on);
    if(on){if(!panel)build();panel.style.display='block';readout();
      items.forEach(function(el){el.style.transform='none'; var i=el.querySelector('img'); if(i)i.style.transform='translate3d(0,0,0) scale('+(parseFloat(i.dataset.zoom)||1.12)+')';});}
    else if(panel)panel.style.display='none';
  }

  var drag=null;
  stage.addEventListener('pointerdown',function(e){
    if(!on)return;
    var el=e.target.closest('.wr-tofu,.wr-word,.wr-ui,.wr-spot');if(!el)return;
    e.preventDefault();
    if(sel)sel.classList.remove('wra-sel');sel=el;sel.classList.add('wra-sel');
    var r=stage.getBoundingClientRect(),b=el.getBoundingClientRect();
    drag={el:el,ox:e.clientX-b.left,oy:e.clientY-b.top,r:r};
    el.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove',function(e){
    if(!drag)return;
    var l=((e.clientX-drag.ox-drag.r.left)/drag.r.width)*100,t=((e.clientY-drag.oy-drag.r.top)/drag.r.height)*100;
    drag.el.style.left=(Math.round(l*2)/2)+'%';drag.el.style.top=(Math.round(t*2)/2)+'%';
  });
  stage.addEventListener('pointerup',function(){if(!drag)return;store(drag.el);drag=null;});

  document.addEventListener('keydown',function(e){
    if(/^(INPUT|TEXTAREA)$/.test(e.target.tagName)||e.target.isContentEditable)return;
    if(e.key==='a'||e.key==='A'){if(e.metaKey||e.ctrlKey)return;toggle();return;}
    if(!on||!sel)return;
    var s=pct(sel),step=e.shiftKey?2.5:0.5,d=false;
    if(e.key==='ArrowLeft'){sel.style.left=(s.left-step)+'%';d=true}
    if(e.key==='ArrowRight'){sel.style.left=(s.left+step)+'%';d=true}
    if(e.key==='ArrowUp'){sel.style.top=(s.top-step)+'%';d=true}
    if(e.key==='ArrowDown'){sel.style.top=(s.top+step)+'%';d=true}
    if(e.key==='['){sel.style.width=(s.width-step)+'%';d=true}
    if(e.key===']'){sel.style.width=(s.width+step)+'%';d=true}
    if(d){e.preventDefault();store(sel);}
  });
  if(/[?&]arrange/.test(location.search))toggle(true);
})();
