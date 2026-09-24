(function(){
  var mq=matchMedia('(max-width: 900px)');
  document.querySelectorAll('.story-c').forEach(function(root){
    var order=['brand','product','content'],nest=root.querySelector('.nest');
    function mark(k){if(k&&root.getAttribute('data-active')!==k){root.setAttribute('data-active',k);if(nest)nest.setAttribute('data-active',k)}}
    var stage=root.querySelector('.sc-stage');
    function range(){var st=parseFloat(getComputedStyle(stage).top)||0;return {top:root.getBoundingClientRect().top+window.scrollY-st,len:Math.max(1,root.offsetHeight-stage.offsetHeight)}}
    function spy(){
      if(mq.matches){var mid=window.innerHeight*0.45,best='brand';root.querySelectorAll('.sc-sheet').forEach(function(s){if(s.getBoundingClientRect().top<=mid)best=s.getAttribute('data-layer')});mark(best);return}
      var r=range(),p=(window.scrollY-r.top)/r.len;mark(order[Math.max(0,Math.min(2,Math.floor(p*3)))]);
    }
    function go(k){var i=order.indexOf(k),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,y;
      if(mq.matches){var s=root.querySelector('.sc-sheet[data-layer="'+k+'"]');y=s.getBoundingClientRect().top+window.scrollY-56}
      else{var r=range();y=r.top+r.len*(i+0.5)/3}
      mark(k);window.scrollTo({top:y,behavior:reduce?'auto':'smooth'})}
    window.addEventListener('scroll',spy,{passive:true});window.addEventListener('resize',spy);spy();
    root.querySelectorAll('.v3').forEach(function(c){var k=c.getAttribute('data-layer');
      c.addEventListener('click',function(){go(k)});
      c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){go(k);e.preventDefault()}});});
    root.querySelectorAll('.sc-crumb [data-layer]').forEach(function(el){
      var k=el.getAttribute('data-layer');if(el.classList.contains('vk-item')){el.tabIndex=0;el.setAttribute('role','button')}
      el.addEventListener('click',function(){go(k)});
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){go(k);e.preventDefault()}});
    });
  });
})();
