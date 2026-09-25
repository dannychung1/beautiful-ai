/* Art direction v2 — prompt vocabulary and gallery data. Edit prompts here. */
window.AD = (function(){
  var ROLES = {
    'Marketing': 'a marketing lead in their 30s',
    'Sales': 'a sales director in their 40s',
    'Business development': 'a business development manager in their late 20s',
    'Consultants & analysts': 'a consultant in their 50s'
  };
  var ROLE_NOUN = {'Marketing':'marketing','Sales':'sales','Business development':'business development','Consultants & analysts':'consulting'};
  var BUILDS = {'Slim':'a slim build','Average':'an average build','Broad':'a broad, sturdy build','Plus-size':'a plus-size build'};
  var AGES = ['20s','30s','40s','50s'];
  var RACES = ['Black','East Asian','South Asian','Southeast Asian','Latin American','Middle Eastern','White','Indigenous','Mixed heritage'];
  function subjectOf(sel){
    var noun=ROLE_NOUN[sel.role]||'marketing',age=sel.age||'30s',race=sel.race;
    var who=noun+' professional';
    if(race&&race!=='Mixed heritage')who=race+' '+who;
    var s=(/^[AEIOU]/i.test(who)?'an ':'a ')+who;
    if(race==='Mixed heritage')s+=' of mixed heritage';
    return s+' in their '+age+' with '+(BUILDS[sel.build]||BUILDS['Average']);
  }
  var SHOTS = {
    'Close-up': 'Shot on 85mm at f/2, seated and waist-up, from just below eye level through a soft foreground edge such as a chair back or railing. A genuine, easy smile. A bright, open space falls softly out of focus behind them.',
    'Medium shot': 'Shot on 50mm at f/2.8, waist-up, building a presentation or presenting one. A laptop or screen can be in frame or only implied, and the desk and room stay visible around them.',
    'Wide shot': 'Shot on 35mm at f/4, the subject small in the frame and placed within a wide view of the space around them.'
  };
  var PSHOTS = {
    'Close-up': 'Shot on 85mm at f/2, close on the laptop screen and the hands at the keyboard, through a softly blurred foreground element, with the room falling softly out of focus behind.',
    'Medium shot': 'Shot on 50mm at f/2.8, over the shoulder at seated table height through a softly blurred foreground element, with the screen, the hands and part of the profile in frame.',
    'Wide shot': 'Shot on 35mm at f/4, the professional and the laptop placed within a wide view of the room, with the screen still angled clearly toward camera.'
  };
  var PSHOT_S = {'Close-up':'85mm close on screen and hands','Medium shot':'50mm over the shoulder, screen, hands and profile','Wide shot':'35mm wide view of the room, screen angled to camera'};
  var COPY = {
    'None': '',
    'Above': 'Copy space: leave clean, low-detail space above the subject for a headline to be placed in post.',
    'Left': 'Copy space: place the subject to the right and leave clean, low-detail space on the left for a headline to be placed in post.',
    'Right': 'Copy space: place the subject to the left and leave clean, low-detail space on the right for a headline to be placed in post.',
    'Across': 'Copy space: keep a calm, low-detail band running across the frame behind the subject, so a headline can run across them in post.'
  };
  var SETTINGS = {
    'Office': 'an office of your choice, such as an open floor, a meeting room or a quiet corner, picked to suit their role, what they are doing and the light',
    'Home': 'a home of your choice, such as a living room, kitchen table or sunlit loft, picked to suit their role, what they are doing and the light',
    'Café': 'a café of your choice, from a busy counter to a quiet window table, picked to suit their role, what they are doing and the light',
    'Home office': 'a home office of your choice, from a spare room to a desk in a nook, picked to suit their role, what they are doing and the light',
    'In transit': 'a place in transit of your choice, such as a train, an airport lounge or a station concourse, picked to suit their role, what they are doing and the light'
  };
  var LIGHT = 'low, clear sun raking in from the side';
  var TIME = 'It is either early-morning light that feels full of possibility or late-afternoon light that feels relaxed and confident, whichever suits the moment. The sun itself is never in frame: no sun disc, sunburst, lens flare or sunrise or sunset sky. Only its light shows, falling across the scene.';
  var LOOK = 'Look: shot on medium-format film, with the deep, saturated shadows and amber warmth of Kodachrome 64 and the true, natural skin tones of Kodak Portra 400. Color stays true to life, and the grain is fine and even. The frame feels like warm sun on skin.';
  var LOOK_S = 'Kodachrome 64 shadows and warmth, Kodak Portra 400 skin tones, fine grain';
  var LOOK_P = 'Look: clean and editorial, with color true to our brand, soft tonal blends and a fine, even grain across the frame.';
  var LOOK_PS = 'true brand color, soft blends, fine even grain';
  var LIGHT_S = 'low raking early-morning or late-afternoon light';
  var NOSUN_S = 'sun never in frame, no lens flare';
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
    'Floating': 'a deck of thin 16:9 slides floating weightless, spaced apart in soft perspective',
    'Flying': 'a stream of thin 16:9 slides flying in a long arc toward camera and receding into depth',
    'Twisting': 'a column of thin 16:9 slides twisting in a loose spiral around an unseen axis',
    'Exploded': 'an exploded view of a deck, thin 16:9 slides pulled apart in even layers along 1 axis'
  };
  var GROUNDS = {
    'Light': 'a big, open space in Gallery Grey #F0F3F5, which fills about 80% of the frame, with soft spotlights of cerulean blue #00B9FF and fuchsia-magenta #DB2475 making up the other 20%',
    'Dark': 'a big, open space in deep navy #001A24, which fills about 80% of the frame, with soft spotlights of cerulean blue #00B9FF and fuchsia-magenta #DB2475 making up the other 20%'
  };
  var SPOT = 'Spotlights: the blue and magenta light frames or spotlights 1 slide or 1 block of slides. It is softly blended into the background, trails or sweeps slightly as if in motion, and carries a small, subtle grain. It never forms hard beams, rings or lens flares.';
  var SPACE = 'Space: the space feels big and open, never boxed in. It can have a floor or a horizon, or no ground at all, with the slides floating in open depth.';
  var SPOT_S = 'soft blended blue and magenta spotlights framing the slides with a hint of motion, subtle grain, big open space';

  var STORY='Story: an editorial magazine photograph about the new professional way to present. They are confident, prepared and at ease while preparing, sharing or talking through their work, never scrambling or stressed.';
  var SKIN='Skin and detail: shot with a fast prime lens, with Kodak Portra 400 skin tones. The raking light draws crisp highlights on the forehead, cheekbones, nose and lips, rich midtones across the face and shadows on the face that keep their detail, while the room around them falls into deep shadow. The face is in sharp focus. Visible pores, fine facial hair, small lines, freckles and natural variation in skin tone hold up at 100%, and light glows through the edges of the ears and hair. The deep shadow belongs to the room, never the face. No retouching, skin smoothing, soft glow or HDR look.';
  var CAST='Cast: a real professional, never a model. Give them an ordinary, characterful face with real features, such as laugh lines, grey hairs, uneven skin, glasses or a strong nose, and keep the age and build given above. Never make them conventionally perfect, model-thin or younger than stated. When it fits, add a visible or assistive detail such as a wheelchair, cane, hearing aid or prosthetic, shown as a natural part of their work and never as the subject of the image. Heritage shows only through their real features, such as face, skin, hair and build, never through cultural or traditional jewelry, beadwork, patterns or dress. The setting and props stay the same for every heritage, with no cultural artwork, textiles, objects or decor used to signal it.';
  var ACCENT='Accent: 1 small accent color taking no more than 10% of the frame, in a shade or tint of cerulean blue (#00B9FF) or fuchsia-magenta rose (#DB2475). Choose which one, how deep or soft it is and where it sits, on clothing, an accessory or an object in the room, so it fits the mood, light and atmosphere of the scene.';
  var DECK='Deck: the deck looks endless and nimble. Slides run past the edge of the frame or recede into depth, and every slide is thin, light and caught mid-motion, never a heavy or static pile.';
  var NEVER='Never include: writing, words, letters, numbers, logos or signage of any kind, anywhere in the frame.';
  function professional(o){
    return 'A candid documentary photograph of '+o.subject+', '+o.action+', in '+o.setting+'.\n'+
      STORY+'\n'+
      CAST+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      'Camera: seated table height, looking past a softly blurred foreground object such as a glass, a mug, a plant or a colleague\u2019s shoulder.\n'+
      'Gaze: '+o.gaze+'\n'+
      'Light: low, clear sun rakes in from the side and spotlights them in their element. '+TIME+' Their face is turned toward it and is the brightest, warmest skin in the frame. It draws long, crisp-edged shadows and picks out the texture of walls, wood, fabric and skin. Around them the light falls off into deep, rich shadow, and windows may glow brighter than the face.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. It reads as 2020s professional, never formal-event or costume.\n'+
      ACCENT+'\n'+
      'Devices: a laptop can sit in frame as part of the work. It stays secondary to the person, a standard silver, grey or black with a plain lid, and its screen is never readable, because the product is not the focus of this image.\n'+
      'Background: no alcohol.\n'+
      SKIN+'\n'+
      LOOK+'\n'+
      'Finish: unposed, caught mid-moment, never posed for the camera.\n'+
      NEVER;
  }
  function product(o){
    return 'A documentary editorial photograph of '+o.subject+' working on a laptop in '+o.setting+'.\n'+
      CAST+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      'The laptop screen is angled toward camera and shows a plain bright white canvas, sharp and evenly lit, ready for a screenshot of '+o.feature+' to be placed in post.\n'+
      'Story: an editorial photograph about the new professional way to present, with the work coming together quickly and on brand.\n'+
      'Lit by '+o.light+'. '+TIME+' Long crisp shadows fall across the table. Crisp highlights on the skin and shadows that keep their detail, with visible pores and natural texture, never smoothed.\n'+
      'Standard silver, grey or black laptop with a plain lid.\n'+
      LOOK+'\n'+
      'Candid, unposed.\n'+
      'Never include: writing, words, letters, numbers, logos or signage anywhere outside the blank screen.';
  }
  function presentation(o){
    return 'A clean editorial still life of '+o.layout+' in '+o.ground+'.\n'+
      'Story: the finished deck is the hero, polished, on brand and ready to present.\n'+
      DECK+'\n'+
      (o.copy?o.copy+'\n':'')+
      SPACE+'\n'+
      SPOT+'\n'+
      'Every slide face is plain white and evenly lit, ready for real slides to be placed in post.\n'+
      LOOK_P+'\n'+
      'No props, no hands. Crisp slide edges. Shot on 100mm at f/8.\n'+
      'Never include: writing, words, letters, numbers or logos anywhere in the frame.';
  }
  var AR = {Professional:'16:10', Product:'4:3', Presentation:'3:4'};
  function short(facet,o){
    if(facet==='Professional') return 'Candid editorial photo, '+o.subject+' '+o.action+' in '+o.setting+', face turned into '+LIGHT_S+', light spotlighting them in their element, '+NOSUN_S+', blurred foreground, current tailored workwear in varied fabrics and quiet neutrals with 1 small accent in a shade of cerulean blue or fuchsia rose, under 10% of the frame, editorial story about the new way professionals present, candid and unposed, face in sharp focus, crisp skin highlights, open facial shadows with detail, visible pores and fine hair, room falling into deep shadow, no retouching or smoothing, '+LOOK_S+', no writing or words anywhere --ar '+AR[facet]+' --style raw';
    if(facet==='Product') return 'Candid editorial photo, '+(PSHOT_S[o.shotName]||PSHOT_S['Medium shot'])+', '+o.subject+' at a laptop in '+o.setting+', screen angled to camera showing a plain white canvas, lit by '+LIGHT_S+', '+NOSUN_S+', silver, grey or black laptop, '+LOOK_S+' --ar '+AR[facet]+' --style raw';
    return 'Editorial still life, '+o.layout+' in '+o.ground+', endless and nimble, slides running out of frame, blank white slide faces, '+SPOT_S+', '+LOOK_PS+', crisp edges --ar '+AR[facet]+' --style raw';
  }
  function brief(facet,o,shotName){
    var l=['Shoot brief · '+facet];
    if(facet==='Presentation'){l.push('Layout: '+o.layout,'Deck: endless and nimble, slides run out of frame or into depth, never a static pile','Ground: '+o.ground,'Lens: 100mm at f/8','Spotlights: soft, blended Azul and magenta light framing 1 slide or block, hinting at motion, subtle grain','Space: big and open, floor or horizon optional','Look: '+LOOK_PS,'Slides: blank white faces, real slides placed in post',o.copy);return l.filter(Boolean).join('\n');}
    l.push('Story: the new professional way to present. Confident, prepared, at ease. Candid, never posed.','Talent: '+o.subject+'. Real people, never models: ordinary faces, age and build as stated, ability shown naturally. Heritage in real features only, never cultural jewelry, dress, decor or props.','Setting: '+o.setting,'Light: '+cap(LIGHT_S)+'. Early morning feels full of possibility; late afternoon feels relaxed and confident. Sun never in frame, no flare. Key on the face so the light spotlights them. Long crisp shadows, texture picked out, surroundings falling off into deep shadow.','Look: '+LOOK_S);
    if(facet==='Professional'){l.push('Action: '+o.action,'Shot: '+shotName+'. '+o.shot,'Camera: seated table height, soft foreground element','Gaze: '+o.gaze,'Wardrobe: '+o.wardrobe+', quiet neutrals','Accent: 1 shade or tint of Azul or Rose, no more than 10% of the frame, placed to suit the scene','Devices: laptop secondary, screen unreadable, standard silver, grey or black');}
    else{l.push('Shot: '+shotName+'. '+o.shot,'Screen: plain white, angled to camera, for '+o.feature+' in post','Devices: silver, grey or black laptop, plain lid');}
    l.push(o.copy,'Skin: face in sharp focus, open facial shadows, no retouching or smoothing. Keep pores, fine hair, lines and crisp highlights; deep shadow stays in the room.','Avoid: silhouettes, alcohol','Never include: writing, words, letters, numbers, logos or signage');
    return l.filter(Boolean).join('\n');
  }
  var SHOT_S={'Close-up':'85mm close-up, just below eye level, easy smile, bright space blurred behind','Medium shot':'50mm, waist-up, laptop in frame or implied','Wide shot':'35mm, subject small in a wide view'};
  var COPY_S={'Above':'Empty space above them for a headline.','Left':'Subject right, empty space left for a headline.','Right':'Subject left, empty space right for a headline.','Across':'Calm band across the frame for a headline.'};
  var WARD_S={'Any':'Current tailored workwear, fabric of your choice','Business':'Tailored suit or blazer in wool, linen or crepe','Smart casual':'Soft blazer, overshirt or fine knit','Relaxed':'Neat knit, tee or open-collar shirt'};
  var SKIN_S=LOOK_S+', face in sharp focus, crisp skin highlights, open facial shadows, visible pores and fine hair, no retouching or smoothing.';
  function cap(t){return t.charAt(0).toUpperCase()+t.slice(1)}
  function compact(facet,o,sel){
    var cp=COPY_S[sel.copy]?COPY_S[sel.copy]+' ':'';
    if(facet==='Presentation')return 'Editorial still life: a finished deck, polished, on brand and ready to present. '+cap(o.layout)+' in '+o.ground+'. The deck looks endless and nimble, slides running out of frame or into depth, never a static pile. Blank white slide faces for real slides in post. '+cp+'Soft, blended blue and magenta spotlights frame 1 slide or block of slides and hint at motion. The space is big and open; a floor or horizon is optional. '+cap(LOOK_PS)+'. No props, hands, writing, words or logos.';
    var ward=(WARD_S[sel.wardrobe]||WARD_S['Any'])+', quiet neutrals';
    if(facet==='Product')return 'Editorial photo: work coming together fast and on brand. '+cap(PSHOT_S[sel.shot]||PSHOT_S['Medium shot'])+': '+o.subject+' on a laptop in '+o.setting+'. '+cp+'Heritage in real features only, never cultural dress, decor or props. Screen angled to camera, plain bright white for a screenshot in post. '+cap(LIGHT_S)+', '+NOSUN_S+'. No writing, words or logos outside the screen. Silver, grey or black laptop. Real, ordinary face, never model-like, age and build as stated. '+SKIN_S;
    var gaze=sel.shot==='Close-up'?'into the lens or just off camera':'on a colleague or the task, never the lens';
    return 'Editorial photo: the new way professionals present. '+cap(o.subject)+', '+o.action+', in '+o.setting+', confident and at ease. '+cap(LIGHT_S)+' spotlights them, face brightest, morning hopeful or late afternoon relaxed; the room falls off into deep shadow. '+cap(NOSUN_S)+'. '+(SHOT_S[sel.shot]||SHOT_S['Medium shot'])+'. '+cp+'Candid, gaze '+gaze+'. No writing, words or logos anywhere. '+ward+', 1 small cerulean or rose accent under 10% of frame. Real, ordinary face, never model-like, age and build as stated; an assistive detail when it fits. Heritage shows in real features only, never cultural jewelry, dress, decor or props. Laptop secondary, screen unreadable. No alcohol. '+SKIN_S;
  }
  function attach(t,facet){
    if(facet==='Presentation'){
      t=t.replace('Every slide face is plain white and evenly lit, ready for real slides to be placed in post.','Slide faces: use the attached slide images exactly as they are, 1 per slide face, in order. Never redraw, restyle, crop or add to them, and keep their text sharp and legible.')
       .replace('anywhere in the frame.','anywhere in the frame, except on the attached slides.')
       .replace('Blank white slide faces for real slides in post.','Use the attached slides as the slide faces, exactly as they are, text sharp.')
       .replace('No props, hands, writing, words or logos.','No props or hands. No writing or logos except on the attached slides.')
       .replace('blank white slide faces','the attached slide images as the slide faces, unaltered')
       .replace(/Slides: [^\n]*/,'Slides: use the supplied slides as the faces, unaltered and legible');
    } else if(facet==='Product'){
      t=t.replace(/shows a plain bright white canvas, sharp and evenly lit, ready for a screenshot of .*? to be placed in post\./,'shows the attached screenshot exactly as it is, sharp, evenly lit and legible, never redrawn or restyled.')
       .replace('outside the blank screen','outside the attached screenshot')
       .replace('plain bright white for a screenshot in post.','showing the attached screenshot exactly as it is.')
       .replace('showing a plain white canvas','showing the attached screenshot, unaltered')
       .replace(/Screen: plain white, angled to camera, for [^'\n]*? in post/,'Screen: angled to camera, showing the supplied screenshot unaltered');
    }
    return t;
  }
  function build(facet,sel,tool){return build0(facet,sel,tool)}
  function build0(facet,sel,tool){
    var o={
      subject: facet==='Product'?subjectOf(sel):(sel.race||sel.age||sel.build)?subjectOf(sel):(ROLES[sel.role]||ROLES['Marketing']),
      action: sel.action||ACTIONS[0],
      setting: SETTINGS[sel.setting]||SETTINGS['Office'],
      light: LIGHT,
      accent: ACCENTS[sel.accent]||ACCENTS['Agency Azul'],
      accentItem: sel.accentItem||ACCENT_ITEMS[0],
      gaze: sel.shot==='Close-up'?'either straight into the lens with a warm, open expression, or caught in the moment looking just off camera, whichever tells the story better.':'on a colleague or the task just out of frame, never at the lens.',
      copy: COPY[sel.copy]||'',
      wardrobe: WARDROBES[sel.wardrobe]||WARDROBES['Any'],
      shot: facet==='Product'?(PSHOTS[sel.shot]||PSHOTS['Medium shot']):(SHOTS[sel.shot]||SHOTS['Medium shot']),
      shotName: sel.shot||'Medium shot',
      feature: 'our product',
      layout: LAYOUTS[sel.layout]||LAYOUTS['Floating'],
      ground: GROUNDS[sel.ground]||GROUNDS['Light']
    };
    if(tool==='Short') return compact(facet,o,sel);
    if(tool==='Midjourney') return short(facet,o);
    if(tool==='Shoot brief') return brief(facet,o,sel.shot||'Medium shot');
    return facet==='Professional'?professional(o):facet==='Product'?product(o):presentation(o);
  }

  /* Gallery. Tags drive the filters; sel drives the prompt. */
  var P='Professional', PR='Product', PZ='Presentation';
  var ITEMS = [
    {src:'photo-range-hero.jpg',facet:P,shot:'Wide shot',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Room for a headline',sel:{action:'leaning at a counter, reading a printed page'}},
    {src:'photo-pro-sunlit-desk.png',facet:P,shot:'Medium shot',setting:'Home',light:'Hard sun',role:'Marketing',cap:'Mid-thought, in the sun',sel:{action:'building a presentation on a laptop'}},
    {src:'photo-icp-exec.png',facet:P,shot:'Close-up',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Making the call',sel:{action:'listening to a colleague whose hand rests at the frame edge'}},
    {src:'hero-content-stack.png',facet:PZ,cap:'A deck, in exploded view',sel:{layout:'Exploded',ground:'Light'}},
    {src:'photo-icp-warmlight.png',facet:P,shot:'Close-up',setting:'Office',light:'Hard sun',role:'Sales',cap:'The ideal shot',sel:{action:'explaining with open hands'}},
    {slot:'gv-prod-ai',ratio:'4/3',facet:PR,cap:'Create with AI, on screen',sel:{feature:'Create with AI',setting:'Café',light:'Hard sun'}},
    {src:'photo-brand-facing-light.png',facet:P,shot:'Wide shot',setting:'Office',light:'Hard sun',role:'Sales',cap:'Walking into the light',sel:{action:'walking with a closed laptop under one arm, on the way to present'}},
    {src:'hero-content-fan.png',facet:PZ,cap:'A deck, flying on dark',sel:{layout:'Flying',ground:'Dark'}},
    {src:'photo-icp-booth.png',facet:P,shot:'Medium shot',setting:'Café',light:'Hard sun',role:'Business development',cap:'Opening the door',sel:{action:'laughing across the table'}},
    {src:'photo-range-editorial.png',facet:P,shot:'Close-up',setting:'Office',light:'Hard sun',role:'Marketing',cap:'The close portrait',sel:{action:'listening to a colleague whose hand rests at the frame edge'}},
    {slot:'gv-prod-smart',ratio:'4/3',facet:PR,cap:'A smart slide, adjusting',sel:{feature:'Smart Slides',setting:'Office',light:'Hard sun'}},
    {src:'photo-brand-skyline.png',facet:P,shot:'Wide shot',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Out toward the skyline',sel:{action:'looking out over the city between meetings'}},
    {src:'photo-range-doorway.png',facet:P,shot:'Wide shot',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Full-length, in place',sel:{action:'pausing in a doorway before a meeting'}},
    {slot:'gv-slide-chart',ratio:'3/4',facet:PZ,cap:'A deck, floating on Gallery Grey',sel:{layout:'Floating',ground:'Light'}},
    {slot:'gv-prod-present',ratio:'4/3',facet:PR,cap:'Presenting from the app',sel:{feature:'Presenting',setting:'Office',light:'Hard sun'}},
    {src:'photo-icp-solo.png',facet:P,shot:'Close-up',setting:'Office',light:'Hard sun',role:'Marketing',cap:'Focused, in the light',sel:{action:'writing a note'}},
    {src:'photo-brand-escalator.png',facet:P,shot:'Wide shot',setting:'In transit',light:'Hard sun',role:'Sales',cap:'Held in a single spotlight',sel:{action:'walking with a closed laptop under one arm, on the way to present'}}
  ];
  ITEMS.forEach(function(it){
    var s=Object.assign({role:it.role,shot:it.shot,setting:it.setting,light:it.light,accent:'Agency Azul',accentItem:ACCENT_ITEMS[0]},it.sel||{});
    it.prompt=build(it.facet,s,'GPT Image');
    it.short=build(it.facet,s,'Midjourney');
  });

  var BASE = {
    Professional: build(P,{role:'Marketing',shot:'Medium shot',setting:'Office',light:'Hard sun'},'GPT Image')
      .replace(ROLES['Marketing'],'[SUBJECT]').replace(ACTIONS[0],'[ACTION]').replace(SETTINGS['Office'],'[SETTING]')
      .replace(ACCENTS['Agency Azul'],'[ACCENT]').replace(ACCENT_ITEMS[0],'[ACCENT ITEM]').replace(SHOTS['Medium shot'],'[SHOT TYPE LINE]'),
    Product: build(PR,{role:'Marketing',setting:'Office',light:'Hard sun',feature:'Create with AI'},'GPT Image')
      .replace(ROLES['Marketing'],'[SUBJECT]').replace(SETTINGS['Office'],'[SETTING]'),
    Presentation: build(PZ,{layout:'Floating',ground:'Light'},'GPT Image')
      .replace(LAYOUTS['Floating'],'[LAYOUT]').replace(GROUNDS['Light'],'[GROUND]')
  };

  return {BUILDS:BUILDS,AGES:AGES,RACES:RACES,ROLES:ROLES,SHOTS:SHOTS,SETTINGS:SETTINGS,ACTIONS:ACTIONS,ACCENTS:ACCENTS,COPY:COPY,WARDROBES:WARDROBES,ACCENT_ITEMS:ACCENT_ITEMS,FEATURES:FEATURES,LAYOUTS:LAYOUTS,GROUNDS:GROUNDS,ITEMS:ITEMS,BASE:BASE,build:build};
})();
