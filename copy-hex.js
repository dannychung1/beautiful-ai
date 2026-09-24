/* Copy-hex pill for every colour. One pill per colour: hidden until the pointer
   enters the colour, then it tracks the cursor (clamped inside the colour) and
   hides the moment the pointer leaves. Keyboard focus centres it. */
(function(){
  var LABEL='Copy hex',DONE='Copied';
  function hexOf(el,src){
    if(el.dataset.hex)return el.dataset.hex;
    var m=((src||el).textContent||'').match(/#?([0-9A-Fa-f]{6})(?![0-9A-Fa-f])/);
    return m?('#'+m[1].toUpperCase()):null;
  }
  function fallback(text,done){
    var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:-1000px;opacity:0';document.body.appendChild(ta);
    ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done();
  }
  function attach(el,cls,src){
    var hex=hexOf(el,src);if(!hex||el.querySelector(':scope > .copy-hex'))return;
    el.dataset.hex=hex;
    var btn=document.createElement('button');
    btn.type='button';btn.className='copy-hex'+(cls?' '+cls:'');btn.textContent=LABEL;
    btn.setAttribute('aria-label','Copy '+hex);
    el.appendChild(btn);
    var px=0,py=0,raf=0,timer=0;
    function place(){
      raf=0;
      var w=el.clientWidth,h=el.clientHeight,hw=btn.offsetWidth/2+6,hh=btn.offsetHeight/2+6;
      var x=hw*2>w?w/2:Math.min(Math.max(px,hw),w-hw),y=hh*2>h?h/2:Math.min(Math.max(py,hh),h-hh);
      btn.style.setProperty('--cx',x+'px');btn.style.setProperty('--cy',y+'px');
    }
    function track(e){
      var r=el.getBoundingClientRect();px=e.clientX-r.left;py=e.clientY-r.top;
      if(!raf)raf=requestAnimationFrame(place);
    }
    function centre(){px=el.clientWidth/2;py=el.clientHeight/2;place()}
    el.addEventListener('pointerenter',function(e){
      if(e.pointerType==='touch'){centre()}else{track(e);cancelAnimationFrame(raf);place()}
      btn.classList.add('is-on');
    });
    el.addEventListener('pointermove',function(e){if(e.pointerType!=='touch')track(e)});
    el.addEventListener('pointerleave',function(){btn.classList.remove('is-on')});
    btn.addEventListener('focus',function(){if(!btn.classList.contains('is-on'))centre()});
    function copy(){
      var done=function(){
        btn.textContent=DONE;place();clearTimeout(timer);
        timer=setTimeout(function(){btn.textContent=LABEL;place()},1200);
      };
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(hex).then(done,function(){fallback(hex,done)});
      else fallback(hex,done);
    }
    btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();copy()});
    el.addEventListener('click',function(e){if(e.target!==btn&&btn.classList.contains('is-on'))copy()});
  }
  document.querySelectorAll('.swatch').forEach(function(el){attach(el)});
  document.querySelectorAll('.sys-dot').forEach(function(el){attach(el,'copy-hex-sm')});
  document.querySelectorAll('.ramp .step').forEach(function(el){
    var spans=el.querySelectorAll('span');attach(el,'copy-hex-sm',spans.length?spans[spans.length-1]:null);
  });
})();
