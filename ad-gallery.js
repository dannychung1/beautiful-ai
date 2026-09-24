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
    var GROUPS=[['facet','Facet'],['shot','Shot type'],['setting','Setting'],['light','Light mode'],['role','Role']];
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
      var tags=[it.facet,it.shot,it.setting,it.light].filter(Boolean).join(' · ');
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
    var sel={facet:'Professional',length:'Full',tool:'GPT Image',role:'Marketing',seniority:'Manager',age:'30s',race:'South Asian',shot:'Working',setting:'Office',light:'Hard sun',accent:'Agency Azul',wardrobe:'Any',copy:'None',action:AD.ACTIONS[0],accentItem:AD.ACCENT_ITEMS[0],feature:'Create with AI',layout:'Fanned deck',ground:'Gallery Grey'};
    var FIELDS=[
      ['facet','Photo of',['Professional','Product','Presentation'],'all'],
      ['length','Prompt length',['Full','Short'],'all'],
      ['role','Role',Object.keys(AD.ROLES),'Professional Product'],
      ['seniority','Seniority',Object.keys(AD.SENIORITY),'Professional Product'],
      ['age','Age',AD.AGES,'Professional Product'],
      ['race','Race or ethnicity',AD.RACES,'Professional Product'],
      ['shot','Framing',Object.keys(AD.SHOTS),'Professional'],
      ['setting','Setting',Object.keys(AD.SETTINGS),'Professional Product'],
      ['light','Light',Object.keys(AD.LIGHTS),'Professional Product'],
      ['action','Action',AD.ACTIONS,'Professional','select'],
      ['wardrobe','Dress code',Object.keys(AD.WARDROBES),'Professional Product'],
      ['feature','On screen',Object.keys(AD.FEATURES),'Product'],
      ['copy','Space for a headline',Object.keys(AD.COPY),'Professional Presentation'],
      ['layout','Slides arranged',Object.keys(AD.LAYOUTS),'Presentation'],
      ['ground','Background',Object.keys(AD.GROUNDS),'Presentation']
    ];
    var SHOW={length:{Full:'ChatGPT',Short:'Figma'},facet:{Professional:'A professional',Product:'Our product',Presentation:'Slides'},shot:{Portrait:'Close-up',Working:'At work',Together:'With a colleague',Environmental:'Wide'},light:{'Hard sun':'Bright sun','Soft window':'Window light'},role:{'Consultants & analysts':'Consulting'},layout:{'Fanned deck':'Fanned','Stacked deck':'Stacked','Single slide':'Single slide'}};
    function lab(k,v){var t=(SHOW[k]&&SHOW[k][v])||v;return t.charAt(0).toUpperCase()+t.slice(1)}
    var form=bd.querySelector('.bd-form'),out=bd.querySelector('.bd-out pre'),note=bd.querySelector('.bd-note'),open=bd.querySelector('.bd-open');
    var rows=FIELDS.map(function(fd){
      var row=el('div','gv-group bd-row');row.appendChild(el('span','gv-glabel',fd[1]));row._show=fd[3];row._fd=fd;
      if(fd[4]==='select'){
        var s=el('select','bd-select');s.setAttribute('aria-label',fd[1]);
        fd[2].forEach(function(v){var o=el('option',null,esc(lab(fd[0],v)));o.value=v;s.appendChild(o)});
        s.value=sel[fd[0]];s.addEventListener('change',function(){sel[fd[0]]=s.value;render()});
        row.appendChild(s);row._sel=s;
      }else{
        var chips=el('div','gv-chips');
        fd[2].forEach(function(v){
          var b=el('button','gv-chip'+(sel[fd[0]]===v?' is-on':''),esc(lab(fd[0],v)));b.dataset.v=v;b.type='button';b.setAttribute('aria-pressed',sel[fd[0]]===v);
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
      open.href='https://chatgpt.com/?q='+encodeURIComponent('Create an image: '+t);
    }
    var tag=bd.querySelector('.bd-edited'),reset=bd.querySelector('.bd-reset');
    out.setAttribute('contenteditable','plaintext-only');
    if(out.contentEditable!=='plaintext-only')out.setAttribute('contenteditable','true');
    out.setAttribute('spellcheck','false');out.setAttribute('role','textbox');out.setAttribute('aria-multiline','true');out.setAttribute('aria-label','Prompt, editable');
    function setEdited(on){if(tag)tag.hidden=!on}
    var cnt=el('span','bd-count');var foot=bd.querySelector('.bd-foot');if(foot)foot.appendChild(cnt);
    function showCount(t){cnt.textContent=t.length.toLocaleString()+' characters'+(sel.length==='Short'&&t.length>1400?' · trim for Figma':'')}
    out.addEventListener('input',function(){setEdited(true);showCount(out.innerText.trim());open.href='https://chatgpt.com/?q='+encodeURIComponent('Create an image: '+out.innerText.trim())});
    if(reset)reset.addEventListener('click',render);
    function sync(){
      rows.forEach(function(r){var k=r._fd[0];
        if(r._sel)r._sel.value=sel[k];
        if(r._chips)r._chips.querySelectorAll('.gv-chip').forEach(function(c){var on=c.dataset.v===sel[k];c.classList.toggle('is-on',on);c.setAttribute('aria-pressed',on)});
      });
    }
    var rnd=bd.querySelector('.bd-remix');
    if(rnd)rnd.addEventListener('click',function(){
      FIELDS.forEach(function(fd){if(fd[0]==='facet'||fd[0]==='length')return;var o=fd[2];var v;do{v=o[Math.floor(Math.random()*o.length)]}while(o.length>1&&v===sel[fd[0]]&&Math.random()<0.7);sel[fd[0]]=v});
      sync();render();
      var pre=bd.querySelector('.bd-out pre');pre.classList.remove('is-new');void pre.offsetWidth;pre.classList.add('is-new');
    });
    render();
  }
})();
