/* Before it ships: hovering a check lights its pin on the ideal shot, and back. */
(function(){
  document.querySelectorAll('[data-ship]').forEach(function(root){
    function set(n,on){root.querySelectorAll('[data-pin="'+n+'"]').forEach(function(el){el.classList.toggle('is-hot',on)})}
    root.querySelectorAll('[data-pin]').forEach(function(el){
      var n=el.dataset.pin;
      el.addEventListener('pointerenter',function(){set(n,true)});
      el.addEventListener('pointerleave',function(){set(n,false)});
      el.addEventListener('focus',function(){set(n,true)});
      el.addEventListener('blur',function(){set(n,false)});
    });
  });
})();
