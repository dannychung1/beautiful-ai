/* Art direction v2 — prompt vocabulary and gallery data. Edit prompts here. */
window.AD = (function(){
  var ROLES = {
    'Marketing': 'a marketing lead in their 30s',
    'Sales': 'a sales director in their 40s',
    'Business development': 'a business development manager in their late 20s',
    'Consultants & analysts': 'a senior consultant in their 50s'
  };
  var SHOTS = {
    'Portrait': 'Shot on 85mm at f/2, chest-up, background softly out of focus.',
    'Working': 'Shot on 50mm at f/2.8, waist-up, desk and room visible around them.',
    'Together': 'Shot on 50mm at f/2.8, two colleagues sharing the frame, one clearly primary. The primary subject faces the light; the other may be side-lit or partly in shade.',
    'Environmental': 'Shot on 35mm at f/4, subject small in the lower third, open wall above for a headline.'
  };
  var SETTINGS = {
    'Office': 'a warm office with plain plaster walls and wood',
    'Meeting room': 'a bright high-rise meeting room',
    'Loft': 'a light-filled loft with plants',
    'Café': 'a wood-panelled café corner by a large window, a small table lamp glowing',
    'Home office': 'a calm home office with linen curtains, books, and a wooden desk',
    'In transit': 'a quiet commuter train carriage with wide windows'
  };
  var LIGHTS = {
    'Hard sun': 'low raking late-afternoon sunlight, a crisp-edged sun patch on the wall',
    'Soft window': 'soft daylight from large bright windows, gently lifted shadows'
  };
  var ACTIONS = ['explaining with open hands','listening to a colleague whose hand rests at the frame edge','leaning over a seated colleague\u2019s shoulder toward an off-frame screen','writing a note','laughing across the table','walking with a closed laptop under one arm, on the way to present'];
  var ACCENTS = {'Agency Azul':'vivid cerulean blue','Ready Rose':'deep fuchsia-magenta'};
  var ACCENT_ITEMS = ['earrings','a silk scarf','a pocket square','a notebook on the table','a mug in the foreground'];
  var FEATURES = {
    'Create with AI': 'the AI prompt panel open beside a fresh slide',
    'Smart Slides': 'a smart slide layout adjusting as content is added',
    'Brand control': 'a locked brand theme applied across a deck',
    'Presenting': 'presenter view on the laptop while a slide shows on a wall screen'
  };
  var LAYOUTS = {
    'Fanned deck': 'five 16:9 slides fanned in soft perspective',
    'Stacked deck': 'a neat stack of 16:9 slides, the top slide angled toward camera',
    'Single slide': 'one 16:9 slide floating in gentle perspective'
  };
  var GROUNDS = {
    'Gallery Grey': 'a seamless Gallery Grey #F0F3F5 surface',
    'Brand gradient': 'a deep navy #002533 ground washed with soft magenta and cerulean light'
  };

  function professional(o){
    return 'A documentary editorial photograph of '+o.subject+', '+o.action+', in '+o.setting+'.\n'+
      'Photographed from seated table height through a softly blurred foreground element.\n'+
      'Gaze on a colleague or task just out of frame.\n'+
      'They are in the light: face turned toward '+o.light+', with the brightest, warmest skin tones in the image on their face, and a soft pool of the same light on the wall behind their head and shoulders.\n'+
      'Windows and lamps in the frame may glow brighter.\n'+
      'Tailored professional clothing in quiet neutrals, with one small accent of '+o.accent+' on '+o.accentItem+'.\n'+
      'Any laptop secondary to the person, screen unreadable, matte deep navy, plain lid.\n'+
      'Background signage soft and illegible.\n'+
      'Natural skin texture, rich warm contrast, true-to-life color. Candid, unposed.\n'+
      o.shot;
  }
  function product(o){
    return 'A documentary editorial photograph of '+o.subject+' working on a laptop in '+o.setting+'.\n'+
      'Photographed over the shoulder at seated table height through a softly blurred foreground element.\n'+
      'The laptop screen is angled toward camera and shows a plain bright white canvas, sharp and evenly lit, ready for a screenshot of '+o.feature+' to be placed in post.\n'+
      'Hands and profile in frame, lit by '+o.light+'.\n'+
      'Matte deep navy laptop with a plain lid. Tailored clothing in quiet neutrals.\n'+
      'Warm, true-to-life color. Candid, unposed. Shot on 50mm at f/2.8.';
  }
  function presentation(o){
    return 'A clean editorial still life of '+o.layout+' on '+o.ground+'.\n'+
      'Soft overhead daylight, gentle contact shadows, generous empty space around the slides.\n'+
      'Every slide face is plain white and evenly lit, ready for real slides to be placed in post.\n'+
      'No props, no hands, no text. Crisp edges, true-to-life color. Shot on 100mm at f/8.';
  }
  var AR = {Professional:'16:10', Product:'4:3', Presentation:'3:4'};
  function short(facet,o){
    if(facet==='Professional') return 'Candid editorial photo, '+o.subject+' '+o.action+' in '+o.setting+', face turned into warm '+o.light+', soft pool of light on the wall behind them, blurred foreground, tailored neutral clothing with one small '+o.accent+' accent, natural skin, rich warm contrast --ar '+AR[facet]+' --style raw';
    if(facet==='Product') return 'Candid over-the-shoulder photo, '+o.subject+' at a laptop in '+o.setting+', screen angled to camera showing a plain white canvas, lit by '+o.light+', matte navy laptop, warm true color --ar '+AR[facet]+' --style raw';
    return 'Editorial still life, '+o.layout+' on '+o.ground+', blank white slide faces, soft overhead daylight, gentle contact shadows, crisp edges --ar '+AR[facet]+' --style raw';
  }
  function brief(facet,o,shotName){
    var l=['Shoot brief · '+facet];
    if(facet==='Presentation'){l.push('Layout: '+o.layout,'Ground: '+o.ground,'Lens: 100mm at f/8','Light: soft overhead daylight, gentle contact shadows','Slides: blank white faces, real slides placed in post');return l.join('\n');}
    l.push('Talent: '+o.subject,'Setting: '+o.setting,'Light: '+o.light+'. Key on the face, soft pool of the same light on the wall behind.');
    if(facet==='Professional'){l.push('Action: '+o.action,'Shot: '+shotName+'. '+o.shot,'Camera: seated table height, soft foreground element, gaze off-lens','Wardrobe: tailored, quiet neutrals, one accent of '+o.accent+' on '+o.accentItem,'Devices: laptop secondary, screen unreadable, matte navy lid');}
    else{l.push('Shot: over the shoulder, 50mm at f/2.8','Screen: plain white, angled to camera, for '+o.feature+' in post','Devices: matte navy laptop, plain lid');}
    l.push('Avoid: looking at the lens, silhouettes, readable text, logos, alcohol');
    return l.join('\n');
  }
  function build(facet,sel,tool){
    var o={
      subject: ROLES[sel.role]||ROLES['Marketing'],
      action: sel.action||ACTIONS[0],
      setting: SETTINGS[sel.setting]||SETTINGS['Office'],
      light: LIGHTS[sel.light]||LIGHTS['Hard sun'],
      accent: ACCENTS[sel.accent]||ACCENTS['Agency Azul'],
      accentItem: sel.accentItem||ACCENT_ITEMS[0],
      shot: SHOTS[sel.shot]||SHOTS['Working'],
      feature: FEATURES[sel.feature]||FEATURES['Create with AI'],
      layout: LAYOUTS[sel.layout]||LAYOUTS['Fanned deck'],
      ground: GROUNDS[sel.ground]||GROUNDS['Gallery Grey']
    };
    if(tool==='Midjourney') return short(facet,o);
    if(tool==='Shoot brief') return brief(facet,o,sel.shot||'Working');
    return facet==='Professional'?professional(o):facet==='Product'?product(o):presentation(o);
  }

  /* Gallery. Tags drive the filters; sel drives the prompt. */
  var P='Professional', PR='Product', PZ='Presentation';
  var ITEMS = [
    {src:'photo-range-hero.jpg',facet:P,shot:'Environmental',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Room for a headline',sel:{action:'leaning at a counter, reading a printed page'}},
    {src:'photo-pro-home-office.png',facet:P,shot:'Together',setting:'Home office',light:'Soft window',role:'Marketing',cap:'Working it through with a friend',sel:{action:'talking through a draft with a friend beside them'}},
    {src:'photo-icp-desk.png',facet:P,shot:'Working',setting:'Office',light:'Soft window',role:'Marketing',cap:'Building the case',sel:{action:'writing a note'}},
    {src:'hero-laptop.png',facet:PR,cap:'The editor, in the work',sel:{feature:'Smart Slides',setting:'Office',light:'Soft window'}},
    {src:'photo-icp-exec.png',facet:P,shot:'Portrait',setting:'Meeting room',light:'Hard sun',role:'Consultants & analysts',cap:'Making the call',sel:{action:'listening to a colleague whose hand rests at the frame edge'}},
    {src:'photo-pro-train.png',facet:P,shot:'Working',setting:'In transit',light:'Soft window',role:'Sales',cap:'Prepping on the way in',sel:{action:'reviewing a deck on a laptop'}},
    {src:'hero-content-stack.png',facet:PZ,cap:'A deck, stacked',sel:{layout:'Stacked deck',ground:'Gallery Grey'}},
    {src:'photo-light-library.png',facet:P,shot:'Working',setting:'Loft',light:'Soft window',role:'Consultants & analysts',cap:'Toward the window',sel:{action:'writing a note'}},
    {src:'photo-icp-warmlight.png',facet:P,shot:'Portrait',setting:'Office',light:'Hard sun',role:'Sales',cap:'The ideal shot',sel:{action:'explaining with open hands'}},
    {slot:'gv-prod-ai',ratio:'4/3',facet:PR,cap:'Create with AI, on screen',sel:{feature:'Create with AI',setting:'Café',light:'Soft window'}},
    {src:'photo-brand-facing-light.png',facet:P,shot:'Environmental',setting:'Office',light:'Hard sun',role:'Sales',cap:'Walking into the light',sel:{action:'walking with a closed laptop under one arm, on the way to present'}},
    {src:'photo-range-cafe.png',facet:P,shot:'Working',setting:'Café',light:'Soft window',role:'Marketing',cap:'On the move',sel:{action:'writing a note'}},
    {src:'hero-content-fan.png',facet:PZ,cap:'A deck, fanned on the gradient',sel:{layout:'Fanned deck',ground:'Brand gradient'}},
    {src:'photo-icp-booth.png',facet:P,shot:'Working',setting:'Café',light:'Hard sun',role:'Business development',cap:'Opening the door',sel:{action:'laughing across the table'}},
    {src:'photo-range-editorial.png',facet:P,shot:'Portrait',setting:'Office',light:'Hard sun',role:'Marketing',cap:'The close portrait',sel:{action:'listening to a colleague whose hand rests at the frame edge'}},
    {src:'photo-pro-home-office-mid.png',facet:P,shot:'Portrait',setting:'Home office',light:'Soft window',role:'Marketing',cap:'At home, mid-thought',sel:{action:'explaining with open hands'}},
    {slot:'gv-prod-smart',ratio:'4/3',facet:PR,cap:'A smart slide, adjusting',sel:{feature:'Smart Slides',setting:'Meeting room',light:'Hard sun'}},
    {src:'photo-brand-skyline.png',facet:P,shot:'Environmental',setting:'Meeting room',light:'Hard sun',role:'Consultants & analysts',cap:'Out toward the skyline',sel:{action:'looking out over the city between meetings'}},
    {src:'photo-light-redglow.png',facet:P,shot:'Portrait',setting:'Office',light:'Hard sun',role:'Business development',cap:'A frame of color',sel:{action:'listening to a colleague whose hand rests at the frame edge'}},
    {src:'photo-range-doorway.png',facet:P,shot:'Environmental',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Full-length, in place',sel:{action:'pausing in a doorway before a meeting'}},
    {slot:'gv-slide-chart',ratio:'3/4',facet:PZ,cap:'A single slide on Gallery Grey',sel:{layout:'Single slide',ground:'Gallery Grey'}},
    {src:'photo-icp-freelance.png',facet:P,shot:'Working',setting:'Home office',light:'Soft window',role:'Consultants & analysts',cap:'Independent, and on brand',sel:{action:'writing a note'}},
    {src:'photo-light-screenglow.png',facet:P,shot:'Working',setting:'Office',light:'Soft window',role:'Marketing',cap:'Lit by the work',sel:{action:'reviewing a deck on a laptop'}},
    {src:'photo-range-overhead.png',facet:P,shot:'Environmental',setting:'Office',light:'Soft window',role:'Sales',cap:'Overhead, in motion',sel:{action:'checking a phone on the way to present'}},
    {slot:'gv-prod-present',ratio:'4/3',facet:PR,cap:'Presenting from the app',sel:{feature:'Presenting',setting:'Meeting room',light:'Soft window'}},
    {src:'photo-icp-solo.png',facet:P,shot:'Portrait',setting:'Office',light:'Hard sun',role:'Marketing',cap:'Focused, in the light',sel:{action:'writing a note'}},
    {src:'photo-brand-escalator.png',facet:P,shot:'Environmental',setting:'In transit',light:'Hard sun',role:'Sales',cap:'Held in a single spotlight',sel:{action:'walking with a closed laptop under one arm, on the way to present'}}
  ];
  ITEMS.forEach(function(it){
    var s=Object.assign({role:it.role,shot:it.shot,setting:it.setting,light:it.light,accent:'Agency Azul',accentItem:ACCENT_ITEMS[0]},it.sel||{});
    it.prompt=build(it.facet,s,'GPT Image');
    it.short=build(it.facet,s,'Midjourney');
  });

  var BASE = {
    Professional: build(P,{role:'Marketing',shot:'Working',setting:'Office',light:'Hard sun'},'GPT Image')
      .replace(ROLES['Marketing'],'[SUBJECT]').replace(ACTIONS[0],'[ACTION]').replace(SETTINGS['Office'],'[SETTING]')
      .replace(LIGHTS['Hard sun'],'[LIGHT MODE]').replace(ACCENTS['Agency Azul'],'[ACCENT]').replace(ACCENT_ITEMS[0],'[ACCENT ITEM]').replace(SHOTS['Working'],'[SHOT TYPE LINE]'),
    Product: build(PR,{role:'Marketing',setting:'Office',light:'Hard sun',feature:'Create with AI'},'GPT Image')
      .replace(ROLES['Marketing'],'[SUBJECT]').replace(SETTINGS['Office'],'[SETTING]').replace(LIGHTS['Hard sun'],'[LIGHT MODE]').replace(FEATURES['Create with AI'],'[FEATURE]'),
    Presentation: build(PZ,{layout:'Fanned deck',ground:'Gallery Grey'},'GPT Image')
      .replace(LAYOUTS['Fanned deck'],'[LAYOUT]').replace(GROUNDS['Gallery Grey'],'[GROUND]')
  };

  return {ROLES:ROLES,SHOTS:SHOTS,SETTINGS:SETTINGS,LIGHTS:LIGHTS,ACTIONS:ACTIONS,ACCENTS:ACCENTS,ACCENT_ITEMS:ACCENT_ITEMS,FEATURES:FEATURES,LAYOUTS:LAYOUTS,GROUNDS:GROUNDS,ITEMS:ITEMS,BASE:BASE,build:build};
})();
