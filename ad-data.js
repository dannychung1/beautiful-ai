/* Art direction v2 — prompt vocabulary and gallery data. Edit prompts here. */
window.AD = (function(){
  var ROLES = {
    'Marketing': 'a marketing lead in their 30s',
    'Sales': 'a sales director in their 40s',
    'Business development': 'a business development manager in their late 20s',
    'Consultants & analysts': 'a senior consultant in their 50s'
  };
  var ROLE_NOUN = {'Marketing':'marketing','Sales':'sales','Business development':'business development','Consultants & analysts':'consulting'};
  var SENIORITY = {'Early career':'associate','Manager':'manager','Director':'director','Executive':'executive'};
  var AGES = ['20s','30s','40s','50s'];
  var RACES = ['Black','East Asian','South Asian','Southeast Asian','Latin American','Middle Eastern','White','Indigenous','Mixed heritage'];
  function subjectOf(sel){
    var noun=ROLE_NOUN[sel.role]||'marketing',lvl=SENIORITY[sel.seniority]||'manager',age=sel.age||'30s',race=sel.race;
    var who=noun+' '+lvl;
    if(race&&race!=='Mixed heritage')who=race+' '+who;
    var s=(/^[AEIOU]/i.test(who)?'an ':'a ')+who;
    if(race==='Mixed heritage')s+=' of mixed heritage';
    return s+' in their '+age;
  }
  var SHOTS = {
    'Portrait': 'Shot on 85mm at f/2, seated and waist-up, from just below eye level through a soft foreground edge such as a chair back or railing. A genuine, easy smile. A bright, open space falls softly out of focus behind them.',
    'Working': 'Shot on 50mm at f/2.8, solo and waist-up, building a presentation or presenting one. A laptop or screen can be in frame or only implied, and the desk and room stay visible around them.',
    'Together': 'Shot on 50mm at f/2.8, two or more colleagues sharing the frame, with one hero subject. The light favors the hero, who faces it, while the others can be side-lit or partly in shade.',
    'Environmental': 'Shot on 35mm at f/4, the subject small in the frame and placed within a wide view of the space around them.'
  };
  var COPY = {
    'None': '',
    'Above': 'Copy space: leave clean, low-detail space above the subject for a headline to be placed in post.',
    'Left': 'Copy space: place the subject to the right and leave clean, low-detail space on the left for a headline to be placed in post.',
    'Right': 'Copy space: place the subject to the left and leave clean, low-detail space on the right for a headline to be placed in post.',
    'Across': 'Copy space: keep a calm, low-detail band running across the frame behind the subject, so a headline can run across them in post.'
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
    'Hard sun': 'clear raking sunlight with crisp-edged shadows',
    'Golden hour': 'warm low golden-hour sun at sunrise or sunset, streaming in through the windows',
    'Soft window': 'soft daylight from large bright windows, gently lifted shadows'
  };
  var ACTIONS = ['building a presentation on a laptop','presenting to a room just out of frame','explaining with open hands','listening to a colleague whose hand rests at the frame edge','leaning over a seated colleague\u2019s shoulder toward an off-frame screen','writing a note','laughing across the table','walking with a closed laptop under one arm, on the way to present'];
  var WARDROBES = {
    'Any': 'current, tailored workwear of your choosing, with a fabric and cut that suit this person and setting, such as fine-gauge knitwear, a relaxed wool blazer, crisp cotton poplin, washed silk or soft suede',
    'Business': 'a tailored suit, or a blazer and trousers, in wool, linen or crepe, over a crisp shirt, fine knit or silk top',
    'Smart casual': 'a softly structured blazer, overshirt or fine knit in cotton, merino or suede, with tailored trousers or dark denim',
    'Relaxed': 'a neat relaxed knit, clean tee or open-collar shirt in cotton, cashmere or linen, pressed and put-together'
  };
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

  var STORY='Story: an editorial magazine photograph about the new professional way to present. They are confident, prepared and at ease while preparing, sharing or talking through their work, never scrambling or stressed.';
  var SKIN='Skin and detail: shot on a full-frame camera with a fast prime lens, with color like Kodak Portra 400. Directional light draws crisp highlights on the forehead, cheekbones, nose and lips, rich midtones across the face and open shadows that keep their detail. Visible pores, fine facial hair and natural texture, with light glowing through the edges of the ears and hair. No retouching, skin smoothing or HDR look.';
  var CAST='Cast: choose a real body size and build for this person, anywhere from slim to plus-size, and when it fits, a visible or assistive detail such as a wheelchair, cane, hearing aid or prosthetic, shown as a natural part of their work and never as the subject of the image. Heritage shows only through their real features, such as face, skin, hair and build, never through cultural or traditional jewelry, beadwork, patterns or dress. The setting and props stay the same for every heritage, with no cultural artwork, textiles, objects or decor used to signal it.';
  var ACCENT='Accent: 1 small accent color taking no more than 10% of the frame, in a shade or tint of cerulean blue (#00B9FF) or fuchsia-magenta rose (#DB2475). Choose which one, how deep or soft it is and where it sits, on clothing, an accessory or an object in the room, so it fits the mood, light and atmosphere of the scene.';
  var NEVER='Never include: writing, words, letters, numbers, logos or signage of any kind, anywhere in the frame.';
  function professional(o){
    return 'A candid documentary photograph of '+o.subject+', '+o.action+', in '+o.setting+'.\n'+
      STORY+'\n'+
      CAST+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      'Camera: seated table height, looking past a softly blurred foreground object such as a glass, a mug, a plant or a colleague\u2019s shoulder.\n'+
      'Gaze: '+o.gaze+'\n'+
      'Light: '+o.light+' spotlights them in their element. Their face is turned toward it and is the brightest, warmest skin in the frame. Around them the light can fall off into shadow or wash softly across the room, and windows may glow brighter than the face.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. It reads as 2020s professional, never formal-event or costume.\n'+
      ACCENT+'\n'+
      'Devices: a laptop can sit in frame as part of the work. It stays secondary to the person, a standard silver, grey or black with a plain lid, and its screen is never readable, because the product is not the focus of this image.\n'+
      'Background: no alcohol.\n'+
      SKIN+'\n'+
      'Finish: rich warm contrast, true-to-life color, fine natural grain. Unposed, caught mid-moment, never posed for the camera.\n'+
      NEVER;
  }
  function product(o){
    return 'A documentary editorial photograph of '+o.subject+' working on a laptop in '+o.setting+'.\n'+
      'Photographed over the shoulder at seated table height through a softly blurred foreground element.\n'+
      'The laptop screen is angled toward camera and shows a plain bright white canvas, sharp and evenly lit, ready for a screenshot of '+o.feature+' to be placed in post.\n'+
      'Story: an editorial photograph about the new professional way to present, with the work coming together quickly and on brand.\n'+
      CAST+'\n'+
      'Hands and profile in frame, lit by '+o.light+'. Crisp highlights and open shadows on the skin, with visible pores and natural texture, never smoothed.\n'+
      'Standard silver, grey or black laptop with a plain lid. Wardrobe: '+o.wardrobe+', in quiet neutrals.\n'+
      'Warm, true-to-life color. Candid, unposed. Shot on 50mm at f/2.8.\n'+
      'Never include: writing, words, letters, numbers, logos or signage anywhere outside the blank screen.';
  }
  function presentation(o){
    return 'A clean editorial still life of '+o.layout+' on '+o.ground+'.\n'+
      'Story: the finished deck is the hero, polished, on brand and ready to present.\n'+
      (o.copy?o.copy+'\n':'')+
      'Soft overhead daylight, gentle contact shadows, generous empty space around the slides.\n'+
      'Every slide face is plain white and evenly lit, ready for real slides to be placed in post.\n'+
      'No props, no hands. Crisp edges, true-to-life color. Shot on 100mm at f/8.\n'+
      'Never include: writing, words, letters, numbers or logos anywhere in the frame.';
  }
  var AR = {Professional:'16:10', Product:'4:3', Presentation:'3:4'};
  function short(facet,o){
    if(facet==='Professional') return 'Candid editorial photo, '+o.subject+' '+o.action+' in '+o.setting+', face turned into warm '+o.light+', light spotlighting them in their element, blurred foreground, current tailored workwear in varied fabrics and quiet neutrals with 1 small accent in a shade of cerulean blue or fuchsia rose, under 10% of the frame, editorial story about the new way professionals present, candid and unposed, crisp skin highlights, open detailed shadows, visible pores, no retouching, Kodak Portra 400 color, rich warm contrast, no writing or words anywhere --ar '+AR[facet]+' --style raw';
    if(facet==='Product') return 'Candid over-the-shoulder photo, '+o.subject+' at a laptop in '+o.setting+', screen angled to camera showing a plain white canvas, lit by '+o.light+', silver, grey or black laptop, warm true color --ar '+AR[facet]+' --style raw';
    return 'Editorial still life, '+o.layout+' on '+o.ground+', blank white slide faces, soft overhead daylight, gentle contact shadows, crisp edges --ar '+AR[facet]+' --style raw';
  }
  function brief(facet,o,shotName){
    var l=['Shoot brief · '+facet];
    if(facet==='Presentation'){l.push('Layout: '+o.layout,'Ground: '+o.ground,'Lens: 100mm at f/8','Light: soft overhead daylight, gentle contact shadows','Slides: blank white faces, real slides placed in post',o.copy);return l.filter(Boolean).join('\n');}
    l.push('Story: the new professional way to present. Confident, prepared, at ease. Candid, never posed.','Talent: '+o.subject+'. Real range in body size and ability, shown naturally. Heritage in real features only, never cultural jewelry, dress, decor or props.','Setting: '+o.setting,'Light: '+o.light+'. Key on the face so the light spotlights them. Let it fall off or wash the surroundings.');
    if(facet==='Professional'){l.push('Action: '+o.action,'Shot: '+shotName+'. '+o.shot,'Camera: seated table height, soft foreground element','Gaze: '+o.gaze,'Wardrobe: '+o.wardrobe+', quiet neutrals','Accent: 1 shade or tint of Azul or Rose, no more than 10% of the frame, placed to suit the scene','Devices: laptop secondary, screen unreadable, standard silver, grey or black');}
    else{l.push('Shot: over the shoulder, 50mm at f/2.8','Screen: plain white, angled to camera, for '+o.feature+' in post','Devices: silver, grey or black laptop, plain lid');}
    l.push((o.copy&&facet!=='Product'?o.copy:''),'Skin: no retouching or smoothing. Keep pores, fine hair and crisp highlights.','Avoid: silhouettes, alcohol','Never include: writing, words, letters, numbers, logos or signage');
    return l.filter(Boolean).join('\n');
  }
  var SHOT_S={'Portrait':'85mm close-up, just below eye level, easy smile, bright space blurred behind','Working':'50mm, solo, waist-up, laptop in frame or implied','Together':'50mm, 2 or more colleagues, light favors 1 hero','Environmental':'35mm, subject small in a wide view'};
  var COPY_S={'Above':'Empty space above them for a headline.','Left':'Subject right, empty space left for a headline.','Right':'Subject left, empty space right for a headline.','Across':'Calm band across the frame for a headline.'};
  var WARD_S={'Any':'Current tailored workwear, fabric of your choice','Business':'Tailored suit or blazer in wool, linen or crepe','Smart casual':'Soft blazer, overshirt or fine knit','Relaxed':'Neat knit, tee or open-collar shirt'};
  var SKIN_S='Portra 400 color, crisp skin highlights, visible pores, open shadows, no retouching, fine grain.';
  function cap(t){return t.charAt(0).toUpperCase()+t.slice(1)}
  function compact(facet,o,sel){
    var cp=COPY_S[sel.copy]?COPY_S[sel.copy]+' ':'';
    if(facet==='Presentation')return 'Editorial still life: a finished deck, polished, on brand and ready to present. '+cap(o.layout)+' on '+o.ground+'. Blank white slide faces for real slides in post. '+cp+'Soft overhead daylight, gentle contact shadows. No props, hands, writing, words or logos.';
    var ward=(WARD_S[sel.wardrobe]||WARD_S['Any'])+', quiet neutrals';
    if(facet==='Product')return 'Editorial photo: work coming together fast and on brand. Over the shoulder of '+o.subject+' on a laptop in '+o.setting+'. Heritage in real features only, never cultural dress, decor or props. Screen angled to camera, plain bright white for a screenshot in post. '+cap(o.light)+' on hands and profile. No writing, words or logos outside the screen. '+ward+'. Silver, grey or black laptop. Real body size. '+SKIN_S;
    var gaze=sel.shot==='Portrait'?'into the lens or just off camera':'on a colleague or the task, never the lens';
    return 'Editorial photo: the new way professionals present. '+cap(o.subject)+', '+o.action+', in '+o.setting+', confident and at ease. '+cap(o.light)+' spotlights them, face brightest; the room can fall off or wash out. '+(SHOT_S[sel.shot]||SHOT_S['Working'])+'. '+cp+'Candid, gaze '+gaze+'. No writing, words or logos anywhere. '+ward+', 1 small cerulean or rose accent under 10% of frame. Real body size; an assistive detail when it fits. Heritage shows in real features only, never cultural jewelry, dress, decor or props. Laptop secondary, screen unreadable. No alcohol. '+SKIN_S;
  }
  function build(facet,sel,tool){
    var o={
      subject: (sel.race||sel.age||sel.seniority)?subjectOf(sel):(ROLES[sel.role]||ROLES['Marketing']),
      action: sel.action||ACTIONS[0],
      setting: SETTINGS[sel.setting]||SETTINGS['Office'],
      light: LIGHTS[sel.light]||LIGHTS['Hard sun'],
      accent: ACCENTS[sel.accent]||ACCENTS['Agency Azul'],
      accentItem: sel.accentItem||ACCENT_ITEMS[0],
      gaze: sel.shot==='Portrait'?'either straight into the lens with a warm, open expression, or caught in the moment looking just off camera, whichever tells the story better.':'on a colleague or the task just out of frame, never at the lens.',
      copy: facet==='Product'?'':(COPY[sel.copy]||''),
      wardrobe: WARDROBES[sel.wardrobe]||WARDROBES['Any'],
      shot: SHOTS[sel.shot]||SHOTS['Working'],
      feature: FEATURES[sel.feature]||FEATURES['Create with AI'],
      layout: LAYOUTS[sel.layout]||LAYOUTS['Fanned deck'],
      ground: GROUNDS[sel.ground]||GROUNDS['Gallery Grey']
    };
    if(tool==='Short') return compact(facet,o,sel);
    if(tool==='Midjourney') return short(facet,o);
    if(tool==='Shoot brief') return brief(facet,o,sel.shot||'Working');
    return facet==='Professional'?professional(o):facet==='Product'?product(o):presentation(o);
  }

  /* Gallery. Tags drive the filters; sel drives the prompt. */
  var P='Professional', PR='Product', PZ='Presentation';
  var ITEMS = [
    {src:'photo-range-hero.jpg',facet:P,shot:'Environmental',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Room for a headline',sel:{action:'leaning at a counter, reading a printed page'}},
    {src:'photo-pro-home-office.png',facet:P,shot:'Together',setting:'Home office',light:'Soft window',role:'Marketing',cap:'Working it through with a friend',sel:{action:'talking through a draft with a friend beside them'}},
    {src:'photo-pro-sunlit-desk.png',facet:P,shot:'Working',setting:'Loft',light:'Hard sun',role:'Marketing',cap:'Mid-thought, in the sun',sel:{action:'building a presentation on a laptop'}},
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

  return {SENIORITY:SENIORITY,AGES:AGES,RACES:RACES,ROLES:ROLES,SHOTS:SHOTS,SETTINGS:SETTINGS,LIGHTS:LIGHTS,ACTIONS:ACTIONS,ACCENTS:ACCENTS,COPY:COPY,WARDROBES:WARDROBES,ACCENT_ITEMS:ACCENT_ITEMS,FEATURES:FEATURES,LAYOUTS:LAYOUTS,GROUNDS:GROUNDS,ITEMS:ITEMS,BASE:BASE,build:build};
})();
