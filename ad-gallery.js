/* Art direction v2 — gallery filters, hover-to-copy prompts, and the prompt builder. */
(function(){
  var AD=window.AD;if(!AD)return;
  function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function copy(text,btn,label){
    var done=function(){if(!btn)return;btn.textContent='Copied';btn.classList.add('is-copied');clearTimeout(btn._t);btn._t=setTimeout(function(){btn.textContent=label;btn.classList.remove('is-copied')},1200)};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,function(){fb(text);done()});else{fb(text);done()}
  }
  function fb(text){var ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;top:-1000px;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}ta.remove()}

  /* ── Mosaic: every image, crossfading ── */
  var mo=document.querySelector('[data-mosaic]');
  if(mo){
    var FOCUS={'photo-pro-green-slides.webp':[.5,.4],'photo-rule-light.jpg':[.40,.27],'photo-rule-camera-2.jpg':[.55,.28],'photo-best-light-cafe.webp':[.45,.25],'photo-range-hero.webp':[.50,.28],'photo-pro-sunlit-desk.webp':[.45,.32],'hero-content-stack.webp':[.40,.45],'photo-rule-wardrobe.webp':[.35,.22],'photo-rule-range.webp':[.60,.30],'photo-pro-product-pitch.webp':[.52,.45],'photo-rule-candid.webp':[.45,.32],'photo-rule-wardrobe-3.webp':[.40,.25],'prod-in-situ-2.webp':[.42,.55],'prod-in-situ-1.webp':[.50,.45],'photo-pro-train.webp':[.50,.30],'photo-rule-composition.webp':[.32,.22],'photo-rule-candid-2.webp':[.55,.25]};
    function place(img){var f=FOCUS[(img.dataset.src||'').split('?')[0]];if(!f||!img.naturalWidth)return;var t=img.parentNode;if(!t)return;var tw=t.clientWidth,th=t.clientHeight,nw=img.naturalWidth,nh=img.naturalHeight,sc=Math.max(tw/nw,th/nh),iw=nw*sc,ih=nh*sc;function k(fv,i,tv){return i>tv+0.5?Math.max(0,Math.min(1,(fv*i-tv/2)/(i-tv))):0.5}img.style.objectPosition=(k(f[0],iw,tw)*100)+'% '+(k(f[1],ih,th)*100)+'%'}
    var FLIP={'photo-rule-light.jpg':1,'photo-rule-range.webp':1,'photo-pro-train.webp':1};
    function focus(img,src){img.dataset.src=src;if(src==='photo-pro-product-pitch.webp')img.style.transform='scale(1.1)';if(FLIP[src.split('?')[0]])img.style.transform='scaleX(-1)';if(src.indexOf('prod-in-situ-3')===0){img.style.objectPosition='57% 40%';img.style.transform='scale(1.6)';img.style.transformOrigin='57% 40%';return}if(src==='hero-content-fan.webp'){img.style.objectPosition='72% 38%';return}if(img.complete&&img.naturalWidth)place(img);img.addEventListener('load',function(){place(img)})}
    window.addEventListener('resize',function(){mo.querySelectorAll('img').forEach(place);cards.forEach(place)});
    var cards=[].slice.call(document.querySelectorAll('.rule-card .pr-img > img'));
    cards.forEach(function(img){var s=(img.getAttribute('src')||'').replace(/^assets\//,'');if(!FOCUS[s.split('?')[0]])return;img.dataset.src=s;if(img.complete&&img.naturalWidth)place(img);img.addEventListener('load',function(){place(img)})});
    var LATEST=[{src:'prod-ui-collab-cursors.webp',cap:'2 teammates, 1 slide'},{src:'prod-ui-team-resources.webp',cap:'Team templates, ready to use'},{src:'prod-ui-collab-comments.webp',cap:'Comments, in context'},{src:'prod-ui-colors.webp',cap:'Theme colors, called out'},{src:'photo-pro-green-slides.webp?v=2',cap:'A research deck, around a pro'},{src:'product-floating-light.webp?v=2',cap:'Our product, floating in our light'},{src:'photo-group-cafe.webp',cap:'Talking it through'},{src:'photo-rule-light.jpg',cap:'Facing the light'},{src:'photo-rule-camera-2.jpg',cap:'At table height'},{src:'photo-best-light-cafe.webp',cap:'In their best light'},{src:'prod-in-situ-2.webp',cap:'A real slide on screen'},{src:'prod-in-situ-1.webp?v=2',cap:'A project plan, in progress'},{src:'photo-rule-wardrobe.webp',cap:'Walking a colleague through the numbers'},{src:'photo-rule-range.webp',cap:'Listening in on the review'},{src:'prod-in-situ-3.webp',cap:'A proposal, shared on the train'},{src:'photo-pro-product-pitch.webp',cap:'Our product, around a pro'},{src:'photo-rule-candid.webp',cap:'Mid-conversation'},{src:'photo-rule-wardrobe-3.webp',cap:'Classic, quiet workwear'},{src:'photo-rule-composition.webp',cap:'Closing the deal'},{src:'photo-rule-candid-2.webp',cap:'Working it through at home'},{src:'story-feature-at-work.webp',cap:'Our editor, at work'},{src:'real-product-image-menu.webp',cap:'1 feature in focus'},{src:'product-outline-light.webp',cap:'Our product in our light'}];
    var pool=LATEST.concat(AD.ITEMS.filter(function(it){return it.src&&it.src!=='photo-range-hero.webp'&&it.src!=='photo-pro-sunlit-desk.webp'&&it.src!=='photo-pro-home-office-mid.webp'&&it.src!=='photo-light-library.webp'}));
    var fixedSrc=[].map.call(mo.querySelectorAll('.am-fixed img'),function(im){return (im.getAttribute('src')||'').replace(/^assets\//,'').split('?')[0]});
    var seen={};pool=pool.filter(function(p){var k=p.src.split('?')[0];if(seen[k]||fixedSrc.indexOf(k)>-1)return false;seen[k]=1;return true});
    var tiles=[].slice.call(mo.querySelectorAll('.am-tile:not(.am-fixed)'));
    var shown=[],leaving=[];
    function key(p){return p.src.split('?')[0]}
    function busy(){return shown.filter(Boolean).map(key).concat(leaving)}
    function pick(){var b=busy();var free=pool.filter(function(p){return b.indexOf(key(p))<0});return free[Math.floor(Math.random()*free.length)]}
    function isG(s){return /^(prod-|hero-content|deck-|story-feature|real-product|product-|photo-pro-product-pitch)/.test(s)}
    var fixedT=[].slice.call(mo.querySelectorAll('.am-fixed')).map(function(t){var im=t.querySelector('img');return {t:t,g:im?isG((im.getAttribute('src')||'').replace(/^assets\//,'')):null}});
    function nbrs(i){var r=tiles[i].getBoundingClientRect(),out=[],tol=40;function touch(q){var hx=q.left<=r.right+tol&&q.right>=r.left-tol,vy=q.top<=r.bottom+tol&&q.bottom>=r.top-tol;var ox=Math.min(q.right,r.right)-Math.max(q.left,r.left),oy=Math.min(q.bottom,r.bottom)-Math.max(q.top,r.top);return hx&&vy&&(ox>8||oy>8)}
      tiles.forEach(function(t,j){if(j!==i&&shown[j]&&touch(t.getBoundingClientRect()))out.push(isG(key(shown[j])))});fixedT.forEach(function(x){if(x.g!==null&&touch(x.t.getBoundingClientRect()))out.push(x.g)});return out}
    function pickAt(i){var b=busy();var free=pool.filter(function(p){return b.indexOf(key(p))<0});if(!free.length)return null;var n=nbrs(i),ng=n.filter(Boolean).length,np=n.length-ng;
      var cost=function(p){return isG(key(p))?ng:np};var best=Math.min.apply(null,free.map(cost));var c=free.filter(function(p){return cost(p)===best});return c[Math.floor(Math.random()*c.length)]}
    var VID={'hero-content-stack.webp':'hero-content-stack.mp4'},VT=2;
    var vstill=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function vid(it,on){var v=el('video',on?'is-on':'');v.addEventListener('loadedmetadata',function(){v.playbackRate=0.5});v.addEventListener('play',function(){v.playbackRate=0.5});v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('aria-label',it.cap);v.poster='assets/'+it.src;v.preload='auto';if(!vstill){v.autoplay=true;v.setAttribute('autoplay','')}v.src='assets/'+VID[it.src];return v}
    tiles.forEach(function(t,i){
      if(i===VT&&tiles.length>VT){var vi=pool.filter(function(p){return VID[key(p)]})[0];if(vi){shown[i]=vi;t.appendChild(vid(vi,true));return}}
      var it=pickAt(i);if(!it)return;shown[i]=it;
      var img=el('img','is-on'+(it.src==='hero-content-fan.webp'?' am-fan':''));img.src='assets/'+it.src;img.alt=it.cap;focus(img,it.src);t.appendChild(img);
    });
    var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!still){
      var turn=0;
      setInterval(function(){
        var i=turn%tiles.length;turn+=3;
        var t=tiles[i],prev=shown[i];shown[i]=null;var it=pickAt(i);shown[i]=prev;if(!it)return;var out=shown[i]&&key(shown[i]);if(out){leaving.push(out);setTimeout(function(){var j=leaving.indexOf(out);if(j>-1)leaving.splice(j,1)},1500)}
        var swap=function(){requestAnimationFrame(function(){nx.classList.add('is-on');var old=t.querySelector(':scope > .is-on:not(:last-child)');if(old){old.classList.remove('is-on');setTimeout(function(){old.remove()},1400)}})};
        var nx;if(VID[key(it)]){nx=vid(it,false);nx.addEventListener('loadeddata',swap,{once:true});t.appendChild(nx);shown[i]=it;return}
        nx=el('img',it.src==='hero-content-fan.webp'?'am-fan':'');nx.alt=it.cap;nx.onload=swap;
        focus(nx,it.src);nx.src='assets/'+it.src;t.appendChild(nx);shown[i]=it;
      },3200);
    }
  }

  /* ── Principle and rule images: copy their prompt ── */
  document.querySelectorAll('[data-prompt-src]').forEach(function(fig){
    var it=AD.ITEMS.filter(function(x){return x.src===fig.getAttribute('data-prompt-src')})[0];if(!it)return;
    var img=fig.querySelector('img');if(img&&!img.alt)img.alt=it.cap;
    var b=el('button','gv-pill','Copy prompt');b.type='button';b.setAttribute('aria-label','Copy prompt for '+it.cap);
    b.addEventListener('click',function(e){e.preventDefault();copy(it.prompt,b,'Copy prompt')});
    fig.addEventListener('click',function(e){if(e.target!==b)copy(it.prompt,b,'Copy prompt')});
    fig.appendChild(b);
  });

  /* ── Gallery ── */
  var root=document.querySelector('[data-gv]');
  if(root){
    var GROUPS=[['facet','Facet'],['shot','Shot type'],['setting','Setting'],['role','Role']];
    var state={},copyAs='full';
    var bar=root.querySelector('.gv-filters'),grid=root.querySelector('.gv-grid'),count=root.querySelector('.gv-count'),empty=root.querySelector('.gv-empty');
    GROUPS.forEach(function(g){
      var vals=[];AD.ITEMS.forEach(function(it){if(it[g[0]]&&vals.indexOf(it[g[0]])<0)vals.push(it[g[0]])});
      var row=el('div','gv-group');row.appendChild(el('span','gv-glabel',g[1]));
      var chips=el('div','gv-chips');
      ['All'].concat(vals).forEach(function(v){
        var b=el('button','gv-chip'+(v==='All'?' is-on':''),esc(v));b.type='button';b.setAttribute('aria-pressed',v==='All');
        b.addEventListener('click',function(){
          state[g[0]]=v==='All'?null:v;
          chips.querySelectorAll('.gv-chip').forEach(function(c){var on=c===b;c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});
          apply();
        });
        chips.appendChild(b);
      });
      row.appendChild(chips);bar.appendChild(row);
    });
    var cards=AD.ITEMS.map(function(it){
      var f=el('figure','gv-card'+(it.slot?' is-slot':''));
      var tags=[it.facet,it.shot,it.setting].filter(Boolean).join(' · ');
      var media=it.slot
        ?'<div class="gv-media" style="aspect-ratio:'+it.ratio+'"><image-slot id="'+it.slot+'" shape="rect" fit="cover" placeholder="FPO · drop a '+esc(it.facet.toLowerCase())+' image: '+esc(it.cap.toLowerCase())+'"></image-slot></div>'
        :'<div class="gv-media"><img src="assets/'+it.src+'" alt="'+esc(it.cap)+'"></div>';
      f.innerHTML=media+'<div class="gv-over" aria-hidden="true"><div class="gv-meta"><span class="gv-cap">'+esc(it.cap)+'</span><span class="gv-tags">'+esc(tags)+'</span></div><p class="gv-prompt"></p></div><button type="button" class="gv-pill">Copy prompt</button>';
      var pill=f.querySelector('.gv-pill'),pr=f.querySelector('.gv-prompt');
      f._it=it;f._pr=pr;
      function go(e){e.preventDefault();e.stopPropagation();copy(copyAs==='short'?it.short:it.prompt,pill,'Copy prompt')}
      pill.addEventListener('click',go);
      if(!it.slot){f.addEventListener('click',go)}
      pill.setAttribute('aria-label','Copy prompt for '+it.cap);
      grid.appendChild(f);return f;
    });
    function paint(){cards.forEach(function(f){f._pr.textContent=copyAs==='short'?f._it.short:f._it.prompt})}
    function apply(){
      var n=0;
      cards.forEach(function(f){
        var ok=GROUPS.every(function(g){var v=state[g[0]];return !v||f._it[g[0]]===v});
        f.hidden=!ok;if(ok)n++;
      });
      count.textContent='Showing '+n+' of '+cards.length;
      empty.hidden=n>0;
    }
    root.querySelectorAll('[data-copyas]').forEach(function(b){
      b.addEventListener('click',function(){
        copyAs=b.getAttribute('data-copyas');
        root.querySelectorAll('[data-copyas]').forEach(function(c){var on=c===b;c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});
        paint();
      });
    });
    paint();apply();
  }

  /* ── Builder ── */
  var bd=document.querySelector('[data-builder]');
  if(bd){
    if(AD.hold)AD.hold();
    var sel={facet:'Professional',pshot:'Over the shoulder',length:'Full',slides:'Blank',tool:'GPT Image',role:'Marketing',age:'30s',build:'Average',race:'South Asian',shot:'Medium shot',setting:'Office',accent:'Agency Azul',wardrobe:'Any',copy:'None',action:AD.ACTIONS[0],accentItem:AD.ACCENT_ITEMS[0],feature:'Create with AI',layout:'Floating',ground:'Light'};
    var FIELDS=[
      ['role','Role',Object.keys(AD.ROLES),'Professional Product','select'],
      ['age','Age',AD.AGES,'Professional Product','select'],
      ['race','Race or ethnicity',AD.RACES,'Professional Product','select'],
      ['build','Body type',Object.keys(AD.BUILDS),'Professional Product','select'],
      ['setting','Setting',Object.keys(AD.SETTINGS),'Professional Product','select'],
      ['layout','Slides arranged',Object.keys(AD.LAYOUTS),'Presentation','select'],
      ['ground','Background',Object.keys(AD.GROUNDS),'Presentation'],
      ['shot','Framing',Object.keys(AD.SHOTS),'Professional','frame'],
      ['pshot','Framing',Object.keys(AD.PSHOTS),'Product','frame'],
      ['copy','Space for copy?',['None','Yes'],'all']
    ];
    var FRAME={'Close-up':['Close-up','Face and shoulders','<circle cx="30" cy="22" r="11"/><path d="M8 46c2-10 11-14 22-14s20 4 22 14z"/>'],'Medium shot':['Medium','Waist up','<circle cx="30" cy="15" r="6"/><path d="M17 46V32c0-6 6-10 13-10s13 4 13 10v14z"/>'],'Over the shoulder':['Over the shoulder','Their view, from behind','<rect x="28" y="8" width="26" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 30h34l-4 4H28z"/><circle cx="12" cy="22" r="8"/><path d="M-2 46c0-10 6-16 14-16s14 6 14 16z"/>'],'Point of view':['Point of view','Through their eyes','<rect x="10" y="4" width="40" height="26" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 32h48l-6 8H12z"/><ellipse cx="18" cy="44" rx="7" ry="4"/><ellipse cx="42" cy="44" rx="7" ry="4"/>'],'Lifestyle':['Lifestyle','Screen turned to camera','<circle cx="14" cy="14" r="5"/><path d="M5 40V27c0-5 4-8 9-8s9 3 9 8v13z"/><rect x="28" y="14" width="26" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M26 34h30l-3 4H29z"/><rect x="2" y="41" width="56" height="1.5"/>'],'Two-shot':['Two-shot','With a colleague','<circle cx="19" cy="16" r="6"/><path d="M7 46V33c0-6 5-9 12-9s12 3 12 9v13z"/><circle cx="42" cy="19" r="5"/><path d="M32 46V35c0-5 4-8 10-8s10 3 10 8v11z"/>'],'Wide shot':['Wide','Whole person, room','<circle cx="30" cy="13" r="3"/><path d="M26 18h8l1 12h-2l-1 10h-4l-1-10h-2z"/><rect x="4" y="40" width="52" height="1.5"/>']};
    var SHOW={ground:{Light:'Light, Gallery Grey',Dark:'Dark, Base Blue',Sampled:'Sampled from the slides'},copy:{None:'No',Yes:'Yes'},slides:{Attached:'I will attach them',Blank:'Leave blank, add later'},length:{Full:'ChatGPT',Short:'Figma'},facet:{Professional:'A professional',Product:'Our product',Presentation:'Slides'},shot:{Portrait:'Close-up',Working:'At work',Together:'With a colleague',Environmental:'Wide'},light:{'Hard sun':'Bright sun','Soft window':'Window light'},role:{'Consultants & analysts':'Consulting'},layout:{'Fanned deck':'Strip','Stacked deck':'Front stack','Single slide':'Floating single','Fanned':'Strip','Stacked':'Front stack','Floating':'Floating multiple','Flying':'Strip','Exploded':'Front stack'}};
    function lab(k,v){var t=(SHOW[k]&&SHOW[k][v])||v;return t.charAt(0).toUpperCase()+t.slice(1)}
    var form=bd.querySelector('.bd-form'),out=bd.querySelector('.bd-out pre'),note=bd.querySelector('.bd-note');
    var HERO=[['Professional','A pro'],['Product','Our product'],['Presentation','Our slides']];
    var tabs=el('div','bd-tabs');var tTop=el('div','bd-tabs-top');tTop.appendChild(el('span','bd-tabs-q','Who is the hero?'));tabs.appendChild(tTop);var rmx=bd.querySelector('.bd-remix');
    var tl=el('div','bd-tablist');tl.setAttribute('role','tablist');tl.setAttribute('aria-label','Who is the hero?');tabs.appendChild(tl);
    var tabBtns=HERO.map(function(h){
      var b=el('button','bd-tab',esc(h[1]));b.type='button';b.setAttribute('role','tab');b.dataset.v=h[0];
      b.addEventListener('click',function(){sel.facet=h[0];syncTabs();if(rnd)rnd.click();else render()});
      b.addEventListener('keydown',function(e){var i=HERO.findIndex(function(x){return x[0]===sel.facet}),n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!n)return;e.preventDefault();var j=(i+n+HERO.length)%HERO.length;sel.facet=HERO[j][0];syncTabs();render();tabBtns[j].focus()});
      tl.appendChild(b);return b;
    });
    function syncTabs(){tabBtns.forEach(function(b){var on=b.dataset.v===sel.facet;b.classList.toggle('is-on',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1})}
    var formEl=bd.querySelector('.bd-form');formEl.insertBefore(tabs,formEl.firstChild);if(rmx){var rmxRow=el('div','bd-remix-row');rmxRow.appendChild(rmx);formEl.insertBefore(rmxRow,tabs.nextSibling)}formEl.setAttribute('role','tabpanel');syncTabs();
    var outEl=bd.querySelector('.bd-out');
    var meta=el('div','bd-meta'),metaL=el('span','bd-meta-l','Click the prompt to edit it.'),tagE=el('span','bd-edited'),rs=el('button','bd-reset','Reset edits'),cnt=el('span','bd-count');
    tagE.hidden=true;rs.type='button';tagE.appendChild(rs);metaL.appendChild(tagE);meta.appendChild(metaL);meta.appendChild(cnt);
    var bar=el('div','bd-bar'),seg=el('div','bd-dest');seg.setAttribute('role','radiogroup');seg.setAttribute('aria-label','Where is this prompt going?');
    var LEN=[['Full','ChatGPT'],['Short','Figma']];
    var lenBtns=LEN.map(function(l){var b=el('button','bd-dest-b',esc(l[1]));b.type='button';b.dataset.v=l[0];b.setAttribute('role','radio');b.addEventListener('click',function(){sel.length=l[0];syncLen();render()});seg.appendChild(b);return b});
    var cpy=el('button','bd-btn','Copy');cpy.type='button';
    var go=el('a','bd-btn bd-go');go.target='_blank';go.rel='noopener';
    var acts=el('div','bd-bar-acts');acts.appendChild(cpy);acts.appendChild(go);bar.appendChild(seg);bar.appendChild(acts);
    var tip=el('p','bd-tip','<strong>Pro tip:</strong> In Figma, draw the frame at your final ratio first.');outEl.appendChild(meta);outEl.appendChild(bar);outEl.appendChild(tip);
    var GO_GPT='Open in ChatGPT <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span>';
    function isGpt(){return sel.length!=='Short'}
    function promptText(){return out.innerText.replace(/\s+$/,'')}
    function setHref(t){if(isGpt())go.href='https://chatgpt.com/?q='+encodeURIComponent('Create an image: '+t);else go.removeAttribute('href')}
    function syncLen(){lenBtns.forEach(function(b){var on=b.dataset.v===sel.length;b.classList.toggle('is-on',on);b.setAttribute('aria-checked',on)});cpy.hidden=!isGpt();tip.hidden=isGpt();clearTimeout(go._t);go.innerHTML=isGpt()?GO_GPT:'Copy for Figma';go.setAttribute('role',isGpt()?'link':'button');go.classList.remove('is-done')}
    function clip(t){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).catch(function(){fb(t)})}else fb(t)}
    function fb(t){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:-1000px;opacity:0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(x){}ta.remove()}
    function flash(btn,label,restore){clearTimeout(btn._t);btn.textContent=label;btn.classList.add('is-done');btn._t=setTimeout(function(){btn.innerHTML=restore;btn.classList.remove('is-done')},1200)}
    cpy.addEventListener('click',function(){clip(promptText());flash(cpy,'Copied','Copy')});
    go.addEventListener('click',function(e){var t=promptText();clip(t);if(isGpt()){setHref(t);flash(go,'Opening ChatGPT\u2026',GO_GPT)}else{e.preventDefault();flash(go,'Copied','Copy for Figma')}});
    syncLen();
    var ddOpen=null;
    document.addEventListener('mousedown',function(e){if(ddOpen&&!ddOpen.el.contains(e.target))ddOpen.close()});
    function makeDD(fd,onPick){
      var wrap=el('div','bd-dd'),_w=wrap.setAttribute('data-tip','Pick the same option again to shuffle the details'),btn=el('button','bd-dd-btn'),list=el('ul','bd-dd-list'),api={el:wrap},cur=null,act=-1;
      btn.type='button';btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label',fd[1]);
      list.setAttribute('role','listbox');list.hidden=true;list.tabIndex=-1;
      var items=fd[2].map(function(v,i){var li=el('li','bd-dd-opt',esc(lab(fd[0],v)));li.setAttribute('role','option');li.dataset.v=v;
        li.addEventListener('mousedown',function(e){e.preventDefault()});
        li.addEventListener('click',function(){pick(i)});
        li.addEventListener('mousemove',function(){hi(i)});list.appendChild(li);return li});
      function hi(i){act=i;items.forEach(function(li,j){li.classList.toggle('is-act',j===i)});if(items[i]){var t=items[i].offsetTop,b=t+items[i].offsetHeight;if(t<list.scrollTop)list.scrollTop=t;else if(b>list.scrollTop+list.clientHeight)list.scrollTop=b-list.clientHeight}}
      function open(){if(ddOpen&&ddOpen!==api)ddOpen.close();list.hidden=false;btn.setAttribute('aria-expanded','true');wrap.classList.add('is-open');ddOpen=api;hi(Math.max(0,fd[2].indexOf(cur)))}
      function close(){list.hidden=true;btn.setAttribute('aria-expanded','false');wrap.classList.remove('is-open');if(ddOpen===api)ddOpen=null}
      function pick(i){api.value=fd[2][i];close();btn.focus();onPick(fd[2][i])}
      api.close=close;
      btn.addEventListener('click',function(){list.hidden?open():close()});
      btn.addEventListener('keydown',function(e){var k=e.key;
        if(list.hidden){if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();open()}return}
        if(k==='ArrowDown'){e.preventDefault();hi(Math.min(items.length-1,act+1))}
        else if(k==='ArrowUp'){e.preventDefault();hi(Math.max(0,act-1))}
        else if(k==='Enter'||k===' '){e.preventDefault();pick(act<0?0:act)}
        else if(k==='Escape'||k==='Tab'){close()}});
      Object.defineProperty(api,'value',{get:function(){return cur},set:function(v){cur=v;btn.innerHTML='<span>'+esc(lab(fd[0],v))+'</span><span class="material-symbols-outlined" aria-hidden="true">expand_more</span>';items.forEach(function(li){var on=li.dataset.v===v;li.classList.toggle('is-on',on);li.setAttribute('aria-selected',on)})}});
      wrap.appendChild(btn);wrap.appendChild(list);return api;
    }
    var rows=FIELDS.map(function(fd){
      var row=el('div','gv-group bd-row');row.appendChild(el('span','gv-glabel',fd[1]));row._show=fd[3];row._fd=fd;
      if(fd[4]==='select'){
        var s=makeDD(fd,function(v){if(v===sel[fd[0]]&&AD.reroll)AD.reroll();sel[fd[0]]=v;render()});s.value=sel[fd[0]];
        row.appendChild(s.el);row._sel=s;
      }else{
        var chips=el('div','gv-chips'+(fd[4]==='frame'?' bd-frames':''));
        fd[2].forEach(function(v){
          var fr=fd[4]==='frame'&&FRAME[v];
          var b=el('button','gv-chip'+(fr?' bd-frame':'')+(sel[fd[0]]===v?' is-on':''),fr?'<svg viewBox="0 0 60 46" aria-hidden="true">'+fr[2]+'</svg><span class="bd-frame-t">'+esc(fr[0])+'</span><span class="bd-frame-s">'+esc(fr[1])+'</span>':esc(lab(fd[0],v)));b.dataset.v=v;b.type='button';b.setAttribute('aria-pressed',sel[fd[0]]===v);
          b.addEventListener('click',function(){if(fd[0]==='ground'&&v==='Sampled'&&sel.ground==='Sampled'){if(window.__bdResetSample)window.__bdResetSample();return}if(fd[4]==='frame'&&v===sel[fd[0]])return;if(v===sel[fd[0]]&&AD.reroll)AD.reroll();sel[fd[0]]=v;chips.querySelectorAll('.gv-chip').forEach(function(c){var on=c===b;c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});render()});
          chips.appendChild(b);
        });
        row.appendChild(chips);row._chips=chips;
      }
      form.appendChild(row);return row;
    });
    var sRow=el('div','gv-group bd-row bd-samp');sRow.appendChild(el('span','gv-glabel','Slide color'));
    var sBox=el('div','bd-samp-box'),sIn=document.createElement('input');sIn.type='file';sIn.accept='image/*';sIn.hidden=true;
    var sAdd=el('button','gv-chip bd-samp-add','<span class="material-symbols-outlined" aria-hidden="true">add_photo_alternate</span><span>Add a slide</span>');sAdd.type='button';
    var sFig=el('div','bd-samp-fig'),sCv=document.createElement('canvas');sCv.className='bd-samp-cv';sCv.setAttribute('aria-label','Your slide. Click any spot to sample its color.');sFig.hidden=true;sFig.appendChild(sCv);
    var sOut=el('div','bd-samp-out'),sSw=el('span','bd-samp-sw'),sTx=el('span','bd-samp-tx');sOut.appendChild(sSw);sOut.appendChild(sTx);sOut.hidden=true;
    var sHelp=el('p','bd-samp-help','We pick a background color that goes with your slide.');
    var sTop=el('div','bd-samp-top');sTop.appendChild(sAdd);sTop.appendChild(sHelp);sBox.appendChild(sTop);sBox.appendChild(sIn);sBox.appendChild(sFig);sBox.appendChild(sOut);sRow.appendChild(sBox);
    var gRow=rows.filter(function(r){return r._fd[0]==='ground'})[0];form.insertBefore(sRow,gRow.nextSibling);
    function lin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)}
    function lum(r,g,b){return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)}
    var L_BB=lum(0,37,51),L_GG=lum(240,243,245);
    function okC(L){return (L+0.05)/(L_BB+0.05)>=3&&(L_GG+0.05)/(L+0.05)>=3}
    function toHsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,h=0,s=0,d=mx-mn;if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return[h,s,l]}
    function toRgb(h,s,l){var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,p=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return p.map(function(v){return Math.round((v+m)*255)})}
    function hex(p){return '#'+p.map(function(v){return ('0'+v.toString(16)).slice(-2)}).join('').toUpperCase()}
    function fitC(p){if(okC(lum(p[0],p[1],p[2])))return p;var q=toHsl(p[0],p[1],p[2]),best=null,bd=9;for(var i=0;i<=200;i++){var l=i/200,c=toRgb(q[0],q[1],l);if(okC(lum(c[0],c[1],c[2]))&&Math.abs(l-q[2])<bd){bd=Math.abs(l-q[2]);best=c}}return best||p}
    function cr(a,b){return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)}
    var sEdge=null,sMode='HSL',sCur=null;
    function edgeColor(){var x=sCv.getContext('2d'),w=sCv.width,h=sCv.height,s=[0,0,0],n=0;[x.getImageData(0,0,w,3),x.getImageData(0,h-3,w,3),x.getImageData(0,0,3,h),x.getImageData(w-3,0,3,h)].forEach(function(im){for(var k=0;k<im.data.length;k+=4){s[0]+=im.data[k];s[1]+=im.data[k+1];s[2]+=im.data[k+2];n++}});return s.map(function(v){return Math.round(v/n)})}
    function pickAnalog(p){var q=toHsl(p[0],p[1],p[2]),sat=Math.max(q[1],0.35),Le=sEdge?lum(sEdge[0],sEdge[1],sEdge[2]):lum(p[0],p[1],p[2]),best=null,MIN=1.2;
      [30,-30].forEach(function(d){var hh=(q[0]+d+360)%360;[[0.8,-1],[0.2,1]].forEach(function(t){var c=null;for(var s=0;s<=10;s++){var l=t[0]+t[1]*s*0.01,x=toRgb(hh,sat,l),L=lum(x[0],x[1],x[2]);c=x;if(cr(L,L_BB)>=MIN&&cr(L,L_GG)>=MIN)break}var L2=lum(c[0],c[1],c[2]),ok=cr(L2,L_BB)>=MIN&&cr(L2,L_GG)>=MIN,sc=(ok?100:0)+cr(L2,Le);if(!best||sc>best.sc)best={c:c,sc:sc}})});
      return best.c}
    function setSample(p,how){sel.sampleBase=hex(p);sBaseRGB=p;sBaseHow=how;sHow=how;applyColor(pickAnalog(p),true)}
    var sHow='',sBaseRGB=null,sBaseHow='';
    function applyColor(c,fromPick){sel.sampleHand=!fromPick;sCur=c;var hx=hex(c),L=lum(c[0],c[1],c[2]);sel.sampleHex=hx;sSw.style.background=hx;
      var e=sEdge?cr(L,lum(sEdge[0],sEdge[1],sEdge[2])):null,bb=cr(L,L_BB),gg=cr(L,L_GG);
      sTx.innerHTML='<strong>'+hx+'</strong> Your background color. Click the swatch to change it.';sNat.value=hx.toLowerCase();sOut.hidden=false;render()}
    var sEd=el('div','bd-pick'),sCk=el('div','bd-cks');sEd.hidden=true;
    var sModes=el('div','gv-chips bd-pick-modes');['HSL','RGB'].forEach(function(m){var b=el('button','gv-chip'+(m===sMode?' is-on':''),m);b.type='button';b.setAttribute('aria-pressed',m===sMode);b.addEventListener('click',function(){sMode=m;[].forEach.call(sModes.children,function(x){var on=x===b;x.classList.toggle('is-on',on);x.setAttribute('aria-pressed',on)});syncEd()});sModes.appendChild(b)});
    var sHex=document.createElement('input');sHex.type='text';sHex.className='bd-pick-hex';sHex.setAttribute('aria-label','Hex');sHex.maxLength=7;
    var sCh=[0,1,2].map(function(k){var w=el('label','bd-pick-ch'),n=el('span','bd-pick-n',''),r=document.createElement('input'),v=document.createElement('input');r.type='range';v.type='number';r.className='bd-pick-r';v.className='bd-pick-v';w.appendChild(n);w.appendChild(r);w.appendChild(v);
      function go(src){var val=+src.value;r.value=val;v.value=val;fromEd()}r.addEventListener('input',function(){go(r)});v.addEventListener('change',function(){go(v)});return {w:w,n:n,r:r,v:v}});
    var sTop=el('div','bd-pick-top');sTop.appendChild(sModes);sTop.appendChild(sHex);sEd.appendChild(sTop);sCh.forEach(function(c){sEd.appendChild(c.w)});
    function syncEd(){if(!sCur)return;sHex.value=hex(sCur);var q=toHsl(sCur[0],sCur[1],sCur[2]),vals=sMode==='HSL'?[Math.round(q[0]),Math.round(q[1]*100),Math.round(q[2]*100)]:sCur,lab=sMode==='HSL'?['H','S','L']:['R','G','B'],mx=sMode==='HSL'?[359,100,100]:[255,255,255];
      sCh.forEach(function(c,k){c.n.textContent=lab[k];c.r.min=c.v.min=0;c.r.max=c.v.max=mx[k];c.r.value=c.v.value=vals[k];c.r.setAttribute('aria-label',lab[k]);c.v.setAttribute('aria-label',lab[k])})}
    function fromEd(){var v=sCh.map(function(c){return Math.max(0,Math.min(+c.r.max,+c.v.value||0))}),c=sMode==='HSL'?toRgb(v[0]%360,v[1]/100,v[2]/100):v.map(Math.round);applyEdit(c)}
    function applyEdit(c){sCur=c;var keep=sMode;applyColor(c,false);sMode=keep}
    var sNat=document.createElement('input');sNat.type='color';sNat.className='bd-samp-nat';sNat.setAttribute('aria-label','Change the background color');sOut.insertBefore(sNat,sSw);sSw.hidden=true;sNat.addEventListener('input',function(){var n=parseInt(sNat.value.slice(1),16);applyColor([n>>16&255,n>>8&255,n&255],false)});
    sHex.addEventListener('change',function(){var m=/^#?([0-9a-f]{6})$/i.exec(sHex.value.trim());if(!m){syncEd();return}var n=parseInt(m[1],16);applyEdit([n>>16&255,n>>8&255,n&255])});
    function dominant(){var x=sCv.getContext('2d'),w=sCv.width,h=sCv.height,d=x.getImageData(0,0,w,h).data,B={},top=null;
      for(var pass=0;pass<2&&!top;pass++){B={};for(var i=0;i<d.length;i+=4){var r=d[i],gg=d[i+1],b=d[i+2],q=toHsl(r,gg,b);if(!pass&&(q[1]<0.18||q[2]>0.93||q[2]<0.07))continue;var k=(r>>4)+'.'+(gg>>4)+'.'+(b>>4),o=B[k]||(B[k]={n:0,r:0,g:0,b:0});o.n++;o.r+=r;o.g+=gg;o.b+=b;if(!top||o.n>top.n)top=o}if(top&&!pass&&top.n<w*h*0.01)top=null}
      return top?[Math.round(top.r/top.n),Math.round(top.g/top.n),Math.round(top.b/top.n)]:[128,128,128]}
    function loadSlide(file){if(!file||!/^image\//.test(file.type))return;var img=new Image(),u=URL.createObjectURL(file);img.onload=function(){var w=Math.min(480,img.naturalWidth),h=Math.round(w*img.naturalHeight/img.naturalWidth);sCv.width=w;sCv.height=h;var cx=sCv.getContext('2d');cx.clearRect(0,0,w,h);cx.drawImage(img,0,0,w,h);URL.revokeObjectURL(u);sFig.hidden=false;sAdd.querySelector('span:last-child').textContent='Change slide';sEdge=edgeColor();setSample(dominant(),'main color of your slide')};img.src=u}
    sAdd.addEventListener('click',function(){sIn.click()});
    sIn.addEventListener('change',function(){loadSlide(sIn.files[0]);sIn.value=''});
    sBox.addEventListener('dragover',function(e){e.preventDefault();sBox.classList.add('is-drag')});
    sBox.addEventListener('dragleave',function(){sBox.classList.remove('is-drag')});
    sBox.addEventListener('drop',function(e){e.preventDefault();sBox.classList.remove('is-drag');loadSlide(e.dataTransfer.files[0])});
    document.addEventListener('paste',function(e){if(sRow.hidden)return;var it=[].slice.call((e.clipboardData||{}).items||[]).filter(function(i){return i.type.indexOf('image')===0})[0];if(it){e.preventDefault();loadSlide(it.getAsFile())}});
    var sX=el('button','bd-samp-x','<span class="material-symbols-outlined" aria-hidden="true">close</span>');sX.type='button';sX.setAttribute('aria-label','Remove this slide');sFig.appendChild(sX);
    sX.addEventListener('click',function(){sFig.hidden=true;sOut.hidden=true;sEdge=null;sBaseRGB=null;sCur=null;delete sel.sampleHex;delete sel.sampleBase;sel.sampleHand=false;sAdd.querySelector('span:last-child').textContent='Add a slide';render();sAdd.focus()});
    window.__bdResetSample=function(){if(sBaseRGB){sEdge=edgeColor();setSample(sBaseRGB,sBaseHow)}};
    sCv.addEventListener('click',function(e){var r=sCv.getBoundingClientRect(),px=Math.floor((e.clientX-r.left)*sCv.width/r.width),py=Math.floor((e.clientY-r.top)*sCv.height/r.height),x=sCv.getContext('2d'),d=x.getImageData(Math.max(0,px-2),Math.max(0,py-2),5,5).data,s=[0,0,0],n=0;for(var i=0;i<d.length;i+=4){s[0]+=d[i];s[1]+=d[i+1];s[2]+=d[i+2];n++}setSample(s.map(function(v){return Math.round(v/n)}),'color you picked')});
    function render(){
      rows.forEach(function(r){r.hidden=!(r._show==='all'||r._show.split(' ').indexOf(sel.facet)>-1)});
      if(typeof sRow!=='undefined')sRow.hidden=!(sel.facet==='Presentation'&&sel.ground==='Sampled');
      var t=AD.build(sel.facet,sel,sel.length==='Short'?'Short':'GPT Image');
      var one=false;if(one){var PL='Slides: use the attached images, our real slides, as the slide faces, 1 per face, in the order attached, with the first on the front face. Use only as many faces as there are slides. Apply each slide with only a perspective transform, pinned to its face\u2019s 4 corners and kept exactly 16:9. Never redraw, stretch, squeeze or crop a slide, and keep every word, number, chart and photo identical.';var t0=t;t=t.replace(/Every slide face is plain white and evenly lit, ready for real slides to be placed in post\.?/,PL);if(t===t0)t=t+'\n'+PL;t=t.replace(/,? ?blank white slide faces?/gi,' slide faces').replace(/Never include: writing, words, letters, numbers or logos anywhere in the frame\.?/,'Never add writing, words, letters, numbers or logos anywhere outside the attached slides.')}
      paintVars(t);setEdited(false);showCount(t);
      hint.hidden=true;var s1=bd.querySelector('.bd-step1');if(s1){s1.hidden=!(sel.facet==='Presentation'||sel.facet==='Product');if(one){s1.querySelector('.eyebrow').textContent='1 step: make the scene with your slides';s1.querySelector('.bd-step-tx').textContent='Attach your slides first, each as its own image and in order. Then run this prompt, which builds the scene and places them.';}else{s1.querySelector('.eyebrow').textContent='Step 1: make the scene';}if(!one)s1.querySelector('.bd-step-tx').textContent=sel.facet==='Product'?'Run this prompt to make the scene with blank screens. Keep the image for step 2.':'Run this prompt to make the scene with blank slide faces. Keep the image for step 2.'}var rl=bd.querySelector('.bd-real');if(rl){rl.hidden=one||!(sel.facet==='Presentation'||sel.facet==='Product');[].forEach.call(rl.querySelectorAll('.rp-row[data-for]'),function(r){r.hidden=r.getAttribute('data-for')!==sel.facet})}
      setHref(t);
    }
    var prevVars=null;
    function escH(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
    function paintVars(t){
      var vs=(AD.lastVars?AD.lastVars():[]).map(function(v){return String(v).trim().replace(/[.;,]+$/,'')}).filter(function(v){return v.length>2&&t.indexOf(v)>-1});
      vs=vs.filter(function(v,i){return vs.indexOf(v)===i}).sort(function(a,b){return b.length-a.length});
      if(!vs.length){out.textContent=t;prevVars=[];return}
      var re=new RegExp(vs.map(function(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}).join('|'),'g'),h='',i=0,m;
      while((m=re.exec(t))){h+=escH(t.slice(i,m.index))+'<span class="bd-var'+(prevVars&&prevVars.indexOf(m[0])<0?' is-new':'')+'">'+escH(m[0])+'</span>';i=m.index+m[0].length}
      out.innerHTML=h+escH(t.slice(i));prevVars=vs;
    }
    var tag=tagE,reset=rs;
    out.setAttribute('contenteditable','plaintext-only');
    if(out.contentEditable!=='plaintext-only')out.setAttribute('contenteditable','true');
    out.setAttribute('spellcheck','false');out.setAttribute('role','textbox');out.setAttribute('aria-multiline','true');out.setAttribute('aria-label','Prompt, editable');
    function setEdited(on){if(tag)tag.hidden=!on}
    var hint=el('p','bd-hint');hint.hidden=true;var cb=out.parentNode;cb.parentNode.insertBefore(hint,cb);
    var userH='';out.addEventListener('focus',function(){userH=out.style.height;if(out.offsetHeight<400)out.style.height='400px'});out.addEventListener('blur',function(){if(out.style.height==='400px')out.style.height=userH});
    function showCount(t){var over=sel.length==='Short'&&t.length>1400;cnt.classList.toggle('is-over',over);cnt.textContent=(sel.length==='Short'?'Shorter prompt':'Full prompt')+' \u00b7 '+t.length.toLocaleString()+(sel.length==='Short'?' / 1,400':'')+' characters'+(over?' \u00b7 Figma will cut off the end':'')}
    out.addEventListener('input',function(){setEdited(true);showCount(out.innerText.trim());setHref(out.innerText.trim())});
    if(reset)reset.addEventListener('click',render);
    function sync(){
      rows.forEach(function(r){var k=r._fd[0];
        if(r._sel)r._sel.value=sel[k];
        if(r._chips)r._chips.querySelectorAll('.gv-chip').forEach(function(c){var on=c.dataset.v===sel[k];c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});
      });
    }
    var rnd=bd.querySelector('.bd-remix');
    if(rnd)rnd.addEventListener('click',function(){var at=tabBtns.filter(function(b){return b.dataset.v===sel.facet})[0];if(at){tabBtns.forEach(function(b){b.classList.remove('is-burst')});void at.offsetWidth;at.classList.add('is-burst');clearTimeout(rnd._b);rnd._b=setTimeout(function(){at.classList.remove('is-burst')},1100)}
      FIELDS.forEach(function(fd){if(fd[0]==='facet'||fd[0]==='length')return;if(!(fd[3]==='all'||fd[3].split(' ').indexOf(sel.facet)>-1))return;var o=fd[2];var v;do{v=o[Math.floor(Math.random()*o.length)]}while(o.length>1&&v===sel[fd[0]]&&Math.random()<0.7);sel[fd[0]]=v});
      if(AD.reroll)AD.reroll();sync();render();
      var pre=bd.querySelector('.bd-out pre');pre.classList.remove('is-new');void pre.offsetWidth;pre.classList.add('is-new');
    });
    render();
  }
})();
