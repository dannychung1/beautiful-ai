/* Copy-to-clipboard for prompt blocks. Same affordance as the colour swatches. */
(function(){
  function flash(btn,label){
    var prev=btn.dataset.label||btn.textContent;
    btn.dataset.label=prev;btn.textContent=label;btn.classList.add('is-copied');
    clearTimeout(btn._t);btn._t=setTimeout(function(){btn.textContent=prev;btn.classList.remove('is-copied')},1400);
  }
  function fallback(text,done){
    var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:-1000px;opacity:0';document.body.appendChild(ta);
    ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done();
  }
  function copy(text,btn){
    var done=function(){flash(btn,'Copied')};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,function(){fallback(text,done)})}
    else fallback(text,done);
  }
  document.querySelectorAll('.copy-block').forEach(function(block){
    var code=block.querySelector('pre');if(!code)return;
    var label=block.dataset.copyLabel||'Copy prompt';
    var btn=document.createElement('button');
    btn.type='button';btn.className='copy-btn';btn.textContent=label;
    btn.setAttribute('aria-label',label);
    btn.addEventListener('click',function(e){e.preventDefault();copy(code.textContent.replace(/\s+$/,''),btn)});
    block.appendChild(btn);
  });
})();
