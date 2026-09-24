(function(){
  var pool=['analytics','rocket_launch','security','check_circle','arrow_forward','arrow_back','keyboard_arrow_down','star','groups','bolt','trending_up','layers','slideshow','palette','format_size','image','bar_chart','group','share','lock','cloud','spellcheck','insights','pie_chart','show_chart','timeline','dashboard','view_quilt','grid_view','view_carousel','present_to_all','co_present','cast','tune','style','brush','format_paint','text_fields','title','format_quote','photo_library','collections','crop','auto_fix_high','magic_button','lightbulb','psychology','target','flag','workspace_premium','verified','thumb_up','favorite','handshake','forum','chat','mail','calendar_month','schedule','update','history','bookmark','folder','description','article','edit_note','draw','gesture','link','public','language','search','filter_alt','sort','download','upload','ios_share','send','person','badge','work','business_center','apartment','storefront','school','campaign','sell','paid','savings','monitoring','query_stats','leaderboard','stacked_bar_chart','donut_large','table_chart','schema','account_tree','hub','sync','autorenew','done_all','task_alt','rule','fact_check','checklist','shield','key','visibility','settings','extension','widgets','apps','category','shapes','interests','diamond','emoji_objects','explore','map','location_on','flight','speed','timer','hourglass_empty','celebration','military_tech','trophy'];
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pick(cur){var n;do{n=pool[Math.floor(Math.random()*pool.length)]}while(n===cur);return n}
  var FADE=180,cells=[];
  document.querySelectorAll('.icons-grid .icon-cell').forEach(function(cell){
    var ai=cell.querySelector('.icon-ai'),g=cell.querySelector('.material-symbols-outlined');
    if(!g){g=document.createElement('span');g.className='material-symbols-outlined';g.setAttribute('aria-hidden','true');g.hidden=true;cell.appendChild(g)}
    var orig=ai?'':g.textContent.trim(),t=null,f=null;
    function fadeTo(fn){cell.classList.add('is-fading');clearTimeout(f);f=setTimeout(function(){fn();cell.classList.remove('is-fading')},reduce?0:FADE)}
    function swap(){fadeTo(function(){if(ai){ai.style.display='none';g.hidden=false}g.textContent=pick(g.textContent.trim())})}
    function restore(){fadeTo(function(){if(ai){ai.style.display='';g.hidden=true;g.textContent=''}else g.textContent=orig})}
    var api={cell:cell,hover:false,busy:false,swap:swap,restore:restore};
    cells.push(api);
    cell.addEventListener('pointerenter',function(){api.hover=true;swap();if(!reduce)t=setInterval(swap,900)});
    cell.addEventListener('pointerleave',function(){api.hover=false;api.busy=false;clearInterval(t);t=null;restore()});
  });
  if(reduce||!cells.length)return;
  var grid=document.querySelector('.icons-grid'),inView=false,loop=null;
  function tick(){
    var free=cells.filter(function(c){return !c.hover&&!c.busy});
    if(!free.length)return;
    var c=free[Math.floor(Math.random()*free.length)];
    c.busy=true;c.swap();
    setTimeout(function(){if(!c.hover){c.restore()}c.busy=false},1400+Math.random()*2800);
  }
  function next(){loop=setTimeout(function(){tick();if(Math.random()<0.3)tick();next()},400+Math.random()*1600)}
  function start(){if(!loop)next()}
  function stop(){clearTimeout(loop);loop=null}
  if('IntersectionObserver' in window){new IntersectionObserver(function(e){inView=e[0].isIntersecting;inView&&!document.hidden?start():stop()}).observe(grid)}else start();
  document.addEventListener('visibilitychange',function(){document.hidden?stop():inView&&start()});
})();
