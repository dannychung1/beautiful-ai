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
    var pool=AD.ITEMS.filter(function(it){return it.src&&it.src!=='photo-pro-home-office-mid.png'}).map(function(it){return it});
    var tiles=[].slice.call(mo.querySelectorAll('.am-tile:not(.am-fixed)'));
    var shown=[];
    function pick(){var free=pool.filter(function(p){return shown.indexOf(p)<0});return free[Math.floor(Math.random()*free.length)]}
    tiles.forEach(function(t,i){
      var it=pool[i%pool.length];shown[i]=it;
      var img=el('img','is-on');img.src='assets/'+it.src;img.alt=it.cap;t.appendChild(img);
    });
    var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!still){
      var turn=0;
      setInterval(function(){
        var i=turn%tiles.length;turn+=3;
        var t=tiles[i],it=pick();if(!it)return;
        var nx=el('img');nx.alt=it.cap;nx.onload=function(){
          requestAnimationFrame(function(){nx.classList.add('is-on');var old=t.querySelector('img.is-on:not(:last-child)');if(old){old.classList.remove('is-on');setTimeout(function(){old.remove()},1400)}});
        };
        nx.src='assets/'+it.src;t.appendChild(nx);shown[i]=it;
      },1600);
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
    var sel={facet:'Professional',pshot:'Over the shoulder',length:'Full',slides:'Blank',tool:'GPT Image',role:'Marketing',age:'30s',build:'Average',race:'South Asian',shot:'Medium shot',setting:'Office',accent:'Agency Azul',wardrobe:'Any',copy:'None',action:AD.ACTIONS[0],accentItem:AD.ACCENT_ITEMS[0],feature:'Create with AI',layout:'Floating',ground:'Light'};
    var FIELDS=[
      ['role','Role',Object.keys(AD.ROLES),'Professional Product','select'],
      ['age','Age',AD.AGES,'Professional Product','select'],
      ['race','Race or ethnicity',AD.RACES,'Professional Product','select'],
      ['build','Body type',Object.keys(AD.BUILDS),'Professional Product','select'],
      ['setting','Setting',Object.keys(AD.SETTINGS),'Professional','select'],
      ['layout','Slides arranged',Object.keys(AD.LAYOUTS),'Presentation','select'],
      ['ground','Background',Object.keys(AD.GROUNDS),'Presentation'],
      ['shot','Framing',Object.keys(AD.SHOTS),'Professional','frame'],
      ['pshot','Framing',Object.keys(AD.PSHOTS),'Product','frame'],
      ['copy','Space for copy?',['None','Yes'],'all']
    ];
    var FRAME={'Close-up':['Close-up','Face and shoulders','<circle cx="30" cy="22" r="11"/><path d="M8 46c2-10 11-14 22-14s20 4 22 14z"/>'],'Medium shot':['Medium','Waist up','<circle cx="30" cy="15" r="6"/><path d="M17 46V32c0-6 6-10 13-10s13 4 13 10v14z"/>'],'Over the shoulder':['Over the shoulder','Their view, from behind','<rect x="28" y="8" width="26" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 30h34l-4 4H28z"/><circle cx="12" cy="22" r="8"/><path d="M-2 46c0-10 6-16 14-16s14 6 14 16z"/>'],'Point of view':['Point of view','Through their eyes','<rect x="10" y="4" width="40" height="26" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 32h48l-6 8H12z"/><ellipse cx="18" cy="44" rx="7" ry="4"/><ellipse cx="42" cy="44" rx="7" ry="4"/>'],'Lifestyle':['Lifestyle','Screen turned to camera','<circle cx="14" cy="14" r="5"/><path d="M5 40V27c0-5 4-8 9-8s9 3 9 8v13z"/><rect x="28" y="14" width="26" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M26 34h30l-3 4H29z"/><rect x="2" y="41" width="56" height="1.5"/>'],'Wide shot':['Wide','Whole person, room','<circle cx="30" cy="13" r="3"/><path d="M26 18h8l1 12h-2l-1 10h-4l-1-10h-2z"/><rect x="4" y="40" width="52" height="1.5"/>']};
    var SHOW={ground:{Light:'Light, Gallery Grey',Dark:'Dark, Base Blue'},copy:{None:'No',Yes:'Yes'},slides:{Attached:'I will attach them',Blank:'Leave blank, add later'},length:{Full:'ChatGPT',Short:'Figma'},facet:{Professional:'A professional',Product:'Our product',Presentation:'Slides'},shot:{Portrait:'Close-up',Working:'At work',Together:'With a colleague',Environmental:'Wide'},light:{'Hard sun':'Bright sun','Soft window':'Window light'},role:{'Consultants & analysts':'Consulting'},layout:{'Fanned deck':'Fanned','Stacked deck':'Stacked','Single slide':'Single slide'}};
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
      var wrap=el('div','bd-dd'),btn=el('button','bd-dd-btn'),list=el('ul','bd-dd-list'),api={el:wrap},cur=null,act=-1;
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
        var s=makeDD(fd,function(v){sel[fd[0]]=v;render()});s.value=sel[fd[0]];
        row.appendChild(s.el);row._sel=s;
      }else{
        var chips=el('div','gv-chips'+(fd[4]==='frame'?' bd-frames':''));
        fd[2].forEach(function(v){
          var fr=fd[4]==='frame'&&FRAME[v];
          var b=el('button','gv-chip'+(fr?' bd-frame':'')+(sel[fd[0]]===v?' is-on':''),fr?'<svg viewBox="0 0 60 46" aria-hidden="true">'+fr[2]+'</svg><span class="bd-frame-t">'+esc(fr[0])+'</span><span class="bd-frame-s">'+esc(fr[1])+'</span>':esc(lab(fd[0],v)));b.dataset.v=v;b.type='button';b.setAttribute('aria-pressed',sel[fd[0]]===v);
          b.addEventListener('click',function(){sel[fd[0]]=v;chips.querySelectorAll('.gv-chip').forEach(function(c){var on=c===b;c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});render()});
          chips.appendChild(b);
        });
        row.appendChild(chips);row._chips=chips;
      }
      form.appendChild(row);return row;
    });
    function render(){
      rows.forEach(function(r){r.hidden=!(r._show==='all'||r._show.split(' ').indexOf(sel.facet)>-1)});
      var t=AD.build(sel.facet,sel,sel.length==='Short'?'Short':'GPT Image');
      out.textContent=t;setEdited(false);showCount(t);
      hint.hidden=!(sel.facet==='Presentation'||sel.facet==='Product');hint.textContent=sel.facet==='Product'?'This prompt leaves the laptop screen blank white. Place a real product screenshot on it in Figma or Photoshop: match the perspective, then add a soft screen glow.':'This prompt leaves every slide face blank white. Place real slides from our templates on them in Figma or Photoshop: match the perspective of each slide, then keep the contact shadows.';
      setHref(t);
    }
    var tag=tagE,reset=rs;
    out.setAttribute('contenteditable','plaintext-only');
    if(out.contentEditable!=='plaintext-only')out.setAttribute('contenteditable','true');
    out.setAttribute('spellcheck','false');out.setAttribute('role','textbox');out.setAttribute('aria-multiline','true');out.setAttribute('aria-label','Prompt, editable');
    function setEdited(on){if(tag)tag.hidden=!on}
    var hint=el('p','bd-hint');hint.hidden=true;var cb=out.parentNode;cb.parentNode.insertBefore(hint,cb);
    var userH='';out.addEventListener('focus',function(){userH=out.style.height;if(out.offsetHeight<400)out.style.height='400px'});out.addEventListener('blur',function(){if(out.style.height==='400px')out.style.height=userH});
    function showCount(t){cnt.textContent=(sel.length==='Short'?'Shorter prompt':'Full prompt')+' \u00b7 '+t.length.toLocaleString()+' characters'}
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
      sync();render();
      var pre=bd.querySelector('.bd-out pre');pre.classList.remove('is-new');void pre.offsetWidth;pre.classList.add('is-new');
    });
    render();
  }
})();
