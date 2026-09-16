(function(){
  var stage=document.querySelector('.wr-stage');
  if(!stage||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var items=[].slice.call(stage.querySelectorAll('.wr-tofu,.wr-word,.wr-ui,.wr-spot')).map(function(el){
    return {el:el,img:el.querySelector('img'),lag:parseFloat(el.dataset.lag)||0.03,rx:0,ry:0,tx:0,ty:0,ix:0,iy:0,gx:50,gy:50};
  });
  var px=0.5,py=0.5;
  function measure(){
    var r=stage.getBoundingClientRect();
    items.forEach(function(it){
      var b=it.el.getBoundingClientRect();
      it.cx=(b.left+b.width/2-r.left)/r.width;
      it.cy=(b.top+b.height/2-r.top)/r.height;
    });
  }
  window.addEventListener('pointermove',function(e){
    var r=stage.getBoundingClientRect();
    px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;
  },{passive:true});
  document.addEventListener('pointerleave',function(){px=0.5;py=0.5;});
  function tick(){
    if(document.body.classList.contains('wra-on')){requestAnimationFrame(tick);return;}
    items.forEach(function(it){
      var dx=px-(it.cx||0.5),dy=py-(it.cy||0.5);
      var isWord=it.el.classList.contains('wr-word');
      var amp=isWord?3:((it.el.classList.contains('wr-ui')||it.el.classList.contains('wr-spot'))?14:11);
      var trx=-dy*amp,tryy=dx*amp,ttx=-dx*(isWord?8:22),tty=-dy*(isWord?5:15);
      it.rx+=(trx-it.rx)*it.lag;it.ry+=(tryy-it.ry)*it.lag;
      it.tx+=(ttx-it.tx)*it.lag;it.ty+=(tty-it.ty)*it.lag;
      it.el.style.transform='translate3d('+it.tx.toFixed(2)+'px,'+it.ty.toFixed(2)+'px,0) rotateX('+it.rx.toFixed(2)+'deg) rotateY('+it.ry.toFixed(2)+'deg)';
      if(isWord){
        var gpx=50-dx*26,gpy=50-dy*16;
        it.gx+=(gpx-it.gx)*(it.lag*0.55);it.gy+=(gpy-it.gy)*(it.lag*0.55);
        it.el.style.backgroundPosition=it.gx.toFixed(2)+'% '+it.gy.toFixed(2)+'%';
      }
      if(it.img){
        var gx=dx*20,gy=dy*14;
        it.ix+=(gx-it.ix)*(it.lag*0.55);it.iy+=(gy-it.iy)*(it.lag*0.55);
        it.img.style.transform='translate3d('+it.ix.toFixed(2)+'px,'+it.iy.toFixed(2)+'px,0) scale('+(parseFloat(it.img.dataset.zoom)||1.12)+')';
      }
    });
    requestAnimationFrame(tick);
  }
  measure();window.addEventListener('resize',measure);requestAnimationFrame(tick);
})();