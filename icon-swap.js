(function(){
  var pool=['analytics','rocket_launch','security','check_circle','arrow_forward','arrow_back','keyboard_arrow_down','star','groups','bolt','trending_up','layers','slideshow','palette','format_size','image','bar_chart','group','share','lock','cloud','spellcheck','insights','pie_chart','show_chart','timeline','dashboard','view_quilt','grid_view','view_carousel','present_to_all','co_present','cast','tune','style','brush','format_paint','text_fields','title','format_quote','photo_library','collections','crop','auto_fix_high','magic_button','lightbulb','psychology','target','flag','workspace_premium','verified','thumb_up','favorite','handshake','forum','chat','mail','calendar_month','schedule','update','history','bookmark','folder','description','article','edit_note','draw','gesture','link','public','language','search','filter_alt','sort','download','upload','ios_share','send','person','badge','work','business_center','apartment','storefront','school','campaign','sell','paid','savings','monitoring','query_stats','leaderboard','stacked_bar_chart','donut_large','table_chart','schema','account_tree','hub','sync','autorenew','done_all','task_alt','rule','fact_check','checklist','shield','key','visibility','settings','extension','widgets','apps','category','shapes','interests','diamond','emoji_objects','explore','map','location_on','flight','speed','timer','hourglass_empty','celebration','military_tech','trophy'];
  var grid=document.querySelector('.icons-grid');if(!grid)return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cells=[].slice.call(grid.querySelectorAll('.icon-cell'));if(!cells.length)return;
  var ai=grid.querySelector('.icon-ai');var home=ai?ai.parentNode:null;
  var FADE=220;
  function used(){return cells.map(function(c){var g=c.querySelector('.material-symbols-outlined');return g&&!g.hidden?g.textContent.trim():''})}
  function pick(){var u=used(),n,i=0;do{n=pool[Math.floor(Math.random()*pool.length)];i++}while(u.indexOf(n)>-1&&i<50);return n}
  cells.forEach(function(c){if(!c.querySelector('.material-symbols-outlined')){var g=document.createElement('span');g.className='material-symbols-outlined';g.setAttribute('aria-hidden','true');g.hidden=true;c.appendChild(g)}});
  function fade(c,fn){c.classList.add('is-fading');setTimeout(function(){fn();c.classList.remove('is-fading')},FADE)}
  function swap(c){if(c.busy||c.contains(ai))return;c.busy=true;fade(c,function(){var g=c.querySelector('.material-symbols-outlined');g.hidden=false;g.textContent=pick();c.busy=false})}
  function moveAI(){if(!ai)return;var from=ai.parentNode,opts=cells.filter(function(c){return c!==from&&!c.busy});if(!opts.length)return;var to=opts[Math.floor(Math.random()*opts.length)];
    from.busy=to.busy=true;from.classList.add('is-fading');to.classList.add('is-fading');
    setTimeout(function(){var g=from.querySelector('.material-symbols-outlined');g.hidden=false;g.textContent=pick();to.querySelector('.material-symbols-outlined').hidden=true;to.insertBefore(ai,to.firstChild);from.classList.remove('is-fading');to.classList.remove('is-fading');from.busy=to.busy=false},FADE)}
  if(reduce)return;
  var loop=null,aiLoop=null,inView=false;
  function next(){loop=setTimeout(function(){var free=cells.filter(function(c){return !c.busy&&!c.contains(ai)});if(free.length){swap(free[Math.floor(Math.random()*free.length)]);if(Math.random()<0.35)swap(free[Math.floor(Math.random()*free.length)])}next()},350+Math.random()*1100)}
  function nextAI(){aiLoop=setTimeout(function(){moveAI();nextAI()},1800+Math.random()*2200)}
  function start(){if(!loop){next();nextAI()}}
  function stop(){clearTimeout(loop);clearTimeout(aiLoop);loop=aiLoop=null}
  if('IntersectionObserver' in window){new IntersectionObserver(function(e){inView=e[0].isIntersecting;inView&&!document.hidden?start():stop()}).observe(grid)}else start();
  document.addEventListener('visibilitychange',function(){document.hidden?stop():inView&&start()});
})();
