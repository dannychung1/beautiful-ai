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
  var TRAITS = [['a wide nose'],['a strong, prominent nose'],['a slightly crooked nose'],['heavy brows'],['deep-set eyes'],['hooded eyelids'],['a round face'],['a long face'],['a soft jawline'],['a slight double chin'],['thin lips'],['an uneven smile'],['a small gap in their front teeth'],['ears that stick out'],['freckles'],['a few moles'],['glasses with thick frames'],['a receding hairline','old'],['grey at the temples','old'],['deep laugh lines','old']];
  var OY=['20s','30s'],OO=['30s','40s','50s'],ON=['Slim','Average'];
  /* Outfits: [text, level, ages, builds]. B business casual, S smart casual, R relaxed. 0 = any. */
  var OUTFITS = [
    ['a navy unstructured blazer over a white oxford shirt, with grey wool trousers','B',0,0],
    ['a charcoal knit blazer over a black crewneck, with dark tailored trousers','B',0,0],
    ['a camel wool coat over a fine black merino crewneck, with charcoal trousers','B',OO,0],
    ['a charcoal suit with an open-collar white shirt','B',OO,0],
    ['a light grey suit with a pale blue shirt, no tie','B',0,0],
    ['a navy suit with a fine grey knit polo','B',0,0],
    ['an olive linen blazer over a cream tee, with stone trousers','B',OY,0],
    ['a black double-breasted blazer over a white tee, with black trousers','B',OY,0],
    ['a tan cotton blazer over a chambray shirt, with navy chinos','B',0,0],
    ['a stone trench coat over a navy crewneck, with grey trousers','B',0,0],
    ['a houndstooth wool blazer over a black rollneck, with charcoal trousers','B',OO,0],
    ['a brown corduroy blazer over an ecru shirt, with dark trousers','B',OO,0],
    ['a longline navy blazer over a white shirt, with straight-leg trousers','B',0,0],
    ['a black rollneck under a grey wool blazer, with black trousers','B',0,0],
    ['a pale blue oxford shirt, sleeves rolled, with navy tailored trousers','B',0,0],
    ['a white poplin shirt tucked into wide-leg charcoal trousers','B',OY,ON],
    ['a striped shirt under a navy V-neck sweater, with grey trousers','B',0,0],
    ['a fine grey merino polo with navy tailored trousers','B',0,ON],
    ['a slate overshirt jacket over a white tee, with charcoal trousers','B',0,0],
    ['a chocolate brown suit with a cream knit tee','B',OY,0],
    ['a navy wool gilet over a white shirt, with grey trousers','B',OO,0],
    ['a dark green knit blazer over a white tee, with black trousers','B',0,0],
    ['a light blue linen suit with a white tee','B',OY,0],
    ['a charcoal wool overcoat over a pale grey shirt, with navy trousers','B',OO,0],
    ['a relaxed black suit with a grey tee','B',OY,0],
    ['a navy cardigan blazer over a light blue shirt, with stone chinos','B',OO,0],
    ['an ivory shirt under a camel crewneck, with brown trousers','B',OO,0],
    ['a cropped boxy navy blazer over a white tee, with straight trousers','B',OY,ON],
    ['a grey herringbone blazer over a black knit, with dark jeans','B',0,0],
    ['a bottle green cardigan over a white shirt, with charcoal trousers','B',OO,0],
    ['a burgundy knit polo under a navy blazer, with grey trousers','B',0,0],
    ['a black funnel-neck jacket over a grey knit, with black trousers','B',0,0],
    ['a dark denim shirt under a charcoal blazer, with black trousers','B',0,0],
    ['a camel suit with a black crewneck','B',OO,0],
    ['a navy overshirt over a white tee, with dark straight jeans','S',0,0],
    ['a camel crewneck over a white shirt collar, with dark jeans','S',0,0],
    ['an ivory cable-knit sweater over a pale blue shirt, with navy chinos','S',0,0],
    ['a chambray shirt with stone chinos and white leather sneakers','S',0,0],
    ['a black quarter-zip knit with charcoal trousers','S',0,0],
    ['a soft grey blazer over a striped tee, with dark jeans','S',OY,0],
    ['a taupe knit polo with navy chinos','S',0,ON],
    ['a denim jacket over a cream knit, with black trousers','S',OY,0],
    ['a navy cardigan over a white tee, with grey trousers','S',0,0],
    ['an olive field jacket over a navy knit, with dark jeans','S',0,0],
    ['a black leather jacket over a grey tee, with dark jeans','S',OY,0],
    ['a forest green overshirt over a cream tee, with black jeans','S',0,0],
    ['a light grey sweatshirt under a navy blazer, with dark jeans','S',OY,0],
    ['a striped Breton top under a navy blazer, with stone trousers','S',0,ON],
    ['a brown suede jacket over a cream knit, with dark jeans','S',OO,0],
    ['a charcoal zip cardigan over a white tee, with black trousers','S',0,0],
    ['a heather grey crewneck over a white shirt, with grey trousers','S',0,0],
    ['a navy shawl-collar cardigan over a grey tee, with dark chinos','S',OO,0],
    ['a camel shirt jacket over a black tee, with black trousers','S',0,0],
    ['a pale grey oxford shirt under a navy crewneck, with navy chinos','S',0,0],
    ['a white linen shirt with olive trousers','S',0,0],
    ['an oatmeal knit vest over a white shirt, with brown trousers','S',OY,0],
    ['a navy bomber jacket over a white tee, with grey trousers','S',OY,0],
    ['a black rollneck with camel trousers','S',0,0],
    ['a sage green shirt with dark jeans and brown leather boots','S',0,0],
    ['a longline grey cardigan over a black tee, with black trousers','S',0,0],
    ['a navy chore jacket over a grey knit, with dark jeans','S',0,0],
    ['a relaxed ecru shirt with charcoal trousers','S',0,0],
    ['a grey marl sweater with navy trousers','S',0,0],
    ['a dark brown cardigan over a cream shirt, with dark jeans','S',OO,0],
    ['a black overshirt over a white tee, with grey chinos','S',0,0],
    ['an olive cotton shirt with stone chinos','S',0,0],
    ['a tan knit polo under an open navy overshirt, with dark jeans','S',0,0],
    ['a soft grey crewneck sweater with dark jeans','R',0,0],
    ['a navy knit hoodie with dark jeans','R',OY,0],
    ['a white tee under an open chambray shirt, with stone chinos','R',0,0],
    ['an oatmeal cable-knit sweater with dark jeans','R',0,0],
    ['a navy long-sleeve henley with grey chinos','R',0,0],
    ['a black tee under an open olive overshirt, with dark jeans','R',0,0],
    ['a soft camel cardigan over a white tee, with light jeans','R',OO,0],
    ['a grey marl sweatshirt with dark jeans','R',OY,0],
    ['a loose sand linen shirt with cream trousers','R',0,0],
    ['a fine black knit with relaxed charcoal trousers','R',0,0],
    ['a striped long-sleeve tee with navy chinos','R',OY,0],
    ['a chunky ecru knit with dark jeans','R',0,0],
    ['a brown corduroy shirt with dark jeans','R',0,0],
    ['a slate blue knit with grey trousers','R',0,0],
    ['an oversized white shirt with black trousers','R',OY,0],
    ['a heather grey henley under a navy cardigan, with dark jeans','R',OO,0],
    ['a navy sweatshirt with stone chinos','R',0,0],
    ['a cream waffle-knit top with dark jeans','R',0,0],
    ['a soft olive knit with black jeans','R',0,0],
    ['a denim shirt, sleeves rolled, with charcoal trousers','R',0,0],
    ['a black crewneck sweatshirt with grey trousers','R',0,0],
    ['a relaxed camel sweater over a white collar, with dark jeans','R',OO,0],
    ['a longline oatmeal cardigan over a grey tee, with black trousers','R',0,0],
    ['a navy polo shirt with stone chinos','R',0,0],
    ['a brown knit with light grey trousers','R',0,0],
    ['a white tee under a soft grey blazer, with light jeans','R',OY,0],
    ['a charcoal rollneck with dark jeans','R',OO,0],
    ['a light blue linen shirt with navy drawstring trousers','R',0,0],
    ['a sage knit vest over a white tee, with dark jeans','R',OY,0],
    ['a cream cardigan over a striped tee, with dark chinos','R',0,0],
    ['a black knit polo with grey chinos','R',0,ON],
    ['a soft taupe sweater with dark jeans','R',0,0],
    ['a grey quarter-zip with navy trousers','R',0,0]
  ];
  var SET_LV={'Office':'BS','In transit':'BS','Café':'SR','Home office':'SR','Home':'RS'};
  function outfitsFor(sel,facet){var lv=SET_LV[sel.setting]||'BS',a=sel.age||'30s',b=sel.build||'Average';var l=OUTFITS.filter(function(o){return lv.indexOf(o[1])>-1&&(!o[2]||o[2].indexOf(a)>-1)&&(!o[3]||o[3].indexOf(b)>-1)});return l.length?l:OUTFITS}
  var PROPS = ['a ceramic mug of coffee','a glass of water','a closed notebook with a pen','a small potted plant','folded reading glasses','a phone lying face down','wireless earbuds in their case','a tablet with a stylus, its screen dark','a tote bag on the chair beside them','a reusable water bottle'];
  var BACKDROPS = ['a subtly textured wall in soft, even shadow','bookshelves falling into soft shadow','an empty desk in soft shade','a corridor or doorway in medium-dark shade','a wood-panelled wall in warm, dim shade','a plant-filled corner in shadow','a room that falls off into medium-dark shadow','sunlight on a far wall, cast through blinds or leaves from a window out of frame'];
  var ACTION_G = 'caught candidly mid-task and actively working on their presentation';
  var ACTION_L = 'Action: they are caught candidly mid-task and actively working, such as reading, typing, reviewing a draft, pointing at the screen or talking it through with a colleague. Pick whichever suits the moment. They are never posed, idle or looking up from the work to pose.';
  function pick(arr,n){var c=arr.slice(),o=[];while(o.length<n&&c.length)o.push(c.splice(Math.floor(Math.random()*c.length),1)[0]);return o}
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
    'Medium shot': 'Shot on 50mm at f/2.8, waist-up, with their head and eyes in the top third of the frame and little headroom above, building a presentation or presenting one. A laptop or screen can be in frame or only implied, and the desk and room stay visible around them.',
    'Two-shot': 'Shot on 50mm at f/2.8 at seated table height, a two-shot of the professional and 1 colleague side by side or across the corner of a table, both waist-up with their heads in the top third of the frame, in the moment together, with the light favoring the professional.',
    'Wide shot': 'Shot on 35mm at f/4 from across the table or the room, near enough to join them, with the space around them in view.'
  };
  var PSHOTS = {
    'Over the shoulder': 'Shot on 50mm at f/2.8 from just behind them and to one side, at seated eye level, looking past their shoulder. The back of their head and shoulder sit soft and out of focus in the near foreground, {H}, and the switched-on display faces the camera in the middle of the frame.',
    'Point of view': 'Shot on 35mm at f/2.8 from their own eyes, looking down at the open laptop exactly as they see it. The switched-on display fills most of the frame, with {H} at the bottom edge.',
    'Two-shot': 'Shot on 50mm at f/2.8 from just behind 2 colleagues seated side by side, looking between their shoulders at the open laptop they share. Both shoulders and the backs of their heads sit soft in the near foreground, {H}, and the switched-on display faces the camera in the middle of the frame.',
    'Lifestyle': 'Shot on 35mm at f/4 from the seat of a colleague across the table. The professional has turned the open laptop around to show the colleague, so the keyboard and the switched-on display face the camera, and they lean in beside it, {H}.'
  };
  var PCAMS = {
    'Over the shoulder': 'Camera: behind the professional, looking over their shoulder at the display, so we see what they see.',
    'Point of view': 'Camera: at the professional\u2019s own eyes, looking down at the display.',
    'Two-shot': 'Camera: behind 2 colleagues seated side by side, looking between their shoulders at the display they share.',
    'Lifestyle': 'Camera: across the table, where the colleague sits, facing the keyboard and display.'
  };
  var PSHOT_S = {'Over the shoulder':'shot from behind them over their shoulder, 50mm at seated eye level: back of their head and shoulder soft in the foreground, {H}, the display facing camera mid-frame','Point of view':'first-person view from their own eyes, 35mm looking down: the display filling the frame, {H} at the bottom edge','Two-shot':'two-shot from behind 2 colleagues side by side, 50mm at seated eye level: their shoulders soft in the foreground, {H}, the shared display facing camera mid-frame','Lifestyle':'shot from a colleague seat across the table, 35mm: they have turned the laptop around to show the colleague, keyboard and display facing camera, and lean in beside it, {H}'};
  var PCAM_ALL = 'The camera always faces the keyboard side of the laptop, so the keyboard and the lit display are both in view.';
  var COPY = {
    'None': '',
    'Above': 'Copy space: leave clean, low-detail space above the subject for a headline to be placed in post.',
    'Left': 'Copy space: place the subject to the right and leave clean, low-detail space on the left for a headline to be placed in post.',
    'Right': 'Copy space: place the subject to the left and leave clean, low-detail space on the right for a headline to be placed in post.',
    'Across': 'Copy space: keep a calm, low-detail band running across the frame behind the subject, so a headline can run across them in post.',
    'Yes': 'Copy space: leave clean, low-detail space beside or above the subject, wherever suits the composition, for a headline to be placed in post.'
  };
  var SETTINGS = {
    'Office': 'an office of your choice, such as an open floor, a meeting room or a quiet corner, picked to suit their role, what they are doing and the light',
    'Home': 'a home of your choice, such as a living room, kitchen table or loft, picked to suit their role, what they are doing and the light',
    'Café': 'a café of your choice, from a busy counter to a quiet corner table, picked to suit their role, what they are doing and the light',
    'Home office': 'a home office of your choice, from a spare room to a desk in a nook, picked to suit their role, what they are doing and the light',
    'In transit': 'a place in transit of your choice, such as a train, an airport lounge or a station concourse, picked to suit their role, what they are doing and the light'
  };
  var LIGHT = 'low, clear sun raking in from the side';
  var TIME = 'It is either early-morning light that feels full of possibility or late-afternoon light that feels relaxed and confident, whichever suits the moment. The sun itself is never in frame: no sun disc, sunburst, lens flare or sunrise or sunset sky. Only its light shows, falling across the scene.';
  var LOOK = 'Look: shot on medium-format film, with the rich, saturated color and amber warmth of Kodachrome 64 and the true, natural skin tones of Kodak Portra 400. Color stays true to life, and the grain is fine, soft and random like real film, never a regular pattern. The frame feels like warm sun on skin.';
  var LOOK_S = 'Kodachrome 64 color and warmth, Kodak Portra 400 skin tones, soft random film grain';
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
    'Floating single': 'a single thin 16:9 slide floating weightless close to camera. The camera sits straight on or slightly off-axis, turned no more than 30 degrees from any side, and never looks down from above',
    'Floating multiple': 'a hero 16:9 slide floating weightless close to camera, with 2 to 4 thin 16:9 slides behind it. Every slide is parallel to the hero, turned to exactly the same angle, and recedes to the same vanishing point, so all their edges line up as 1 set of rails. The rear slides step straight back in an even line behind 1 side of the hero, smaller only because they are farther away. They never tilt, skew or turn on their own. Each rear slide shows at least half of its face beside the hero, with at least 3 corners visible. The camera sits straight on or slightly off-axis, turned no more than 30 degrees from any side, and never looks down from above',
    'Strip': 'a single strip of thin 16:9 slides running in 1 continuous line like a ribbon, belt or film strip, receding into depth. The slides never overlap, and the gaps between them are even and wide enough to show how each slide relates to the next',
    'Twisting': 'a column of thin 16:9 slides spiralling around an unseen vertical pole like the steps of a spiral staircase or a deck of rigid cards fanned around a spindle. Each slide is a separate, perfectly flat, rigid card with 4 straight edges; only its position and angle change, each turned a few degrees more than the one below it. No slide curves, bends, twists or warps along its length, and the slides never read as a ribbon. The slides never overlap, and the gaps between them are even',
    'Front stack': 'a front-facing stack of 4 thin 16:9 slides, square to camera. Each back slide sits a little behind and above the one in front, at the same angle and size, so the top half of each back slide shows above the slide in front of it. The hero slide in front sits in the center of the frame, or fills 2/3 of the frame when the layout needs it',
    'Grid': 'a wall of thin 16:9 slides laid out in an even grid of straight rows and columns with narrow, equal gaps, all resting on 1 flat plane like tiles on a single sheet of glass. The whole wall tilts back as 1 rigid piece in soft perspective and runs past every edge of the frame, so every row and column follows the same 2 vanishing points. No slide tilts, turns or lifts on its own. The nearest slides are large and sharp, and the grid softens as it recedes. In motion, the wall drifts slowly and steadily on a diagonal'
  };
  var THIRDS_G={'Light':'pale Gallery Grey ground','Dark':'Base Blue ground','Sampled':'sampled color ground'};
  var THIRDS_V={
    'left':['Composition: rule of thirds. Center the hero slide on the left vertical third line, near the lower-left intersection. The slides fill the left 2/3 of the frame, and the right third stays as open {G} for a headline.','Rule of thirds: hero slide on the left third line, right third open.'],
    'right':['Composition: rule of thirds. Center the hero slide on the right vertical third line, near the upper-right intersection. The slides fill the right 2/3 of the frame, and the left third stays as open {G} for a headline.','Rule of thirds: hero slide on the right third line, left third open.'],
    'center':['Composition: rule of thirds, centered. Center the hero slide on the vertical center line of the frame, with the slides across the lower 2/3. The top third stays as open {G} for a headline.','Rule of thirds, centered: hero slide on the center line, top third open.']
  };
  function thirdsOf(sel){
    var g=THIRDS_G[sel.ground]||THIRDS_G['Light'];
    var forced={'Left':'right','Right':'left','Above':'center','Across':'center'}[sel.copy];
    var k=forced||keep('thirds',function(){return ['left','right','center'][Math.floor(Math.random()*3)]});
    var v=THIRDS_V[k];return [v[0].replace('{G}',g),v[1]];
  }
  var GROUNDS = {
    'Light': 'a big, open space in Gallery Grey #F0F3F5 fading to white. The pale ground fills about 80% of the frame, and the Agency Azul key light and the softer Ready Rose fill light, from opposite corners, make up the other 20%. The mood is airy, calm and bright',
    'Dark': 'a big, open space in Base Blue #002533. Base Blue fills about 80% of the frame, and the Agency Azul key light and the softer Ready Rose fill light, from opposite corners, make up the other 20%. The mood is deep, focused and cinematic, and the white slide faces stand out clearly against it',
    'Sampled': 'a big, open space in 1 color sampled from the slides: an analogous color 30 degrees around the color wheel from the main color of the hero slide, such as the color of its largest photograph, image or block of display text. Never use the main color itself. The sampled color fills about 80% of the frame, and the key and fill lights, in a lighter tone of the same hue from opposite corners, make up the other 20%. Use no Base Blue, Agency Azul or Ready Rose. The sampled color is either light, at about 80% lightness like a soft pink, or deep, at about 20% lightness like a dark crimson. Pick whichever end contrasts most with the slide, and never use a mid-tone. The color also stays clearly distinct from Base Blue #002533 and Gallery Grey #F0F3F5, so the edge of the image shows on our dark and light pages'
  };
  var SPOT_C = 'Lighting: use exactly 2 lights. The key light is 1 soft spotlight in a lighter tone of the sampled background color from a high corner, aimed at the face of the slides, or from the opposite corner rising from behind them as a rim light. A fill light in the opposing corner is a second, softer spotlight in a lighter tone of the sampled background color at about half the intensity. Both blend softly into the background with a small, subtle grain. Use no other lights, beams, rings or lens flares, and no haze or bloom.';
  var SPOT = 'Lighting: use exactly 2 lights. The key light is 1 soft spotlight in Agency Azul from a high corner, aimed at the face of the slides, or from the opposite corner rising from behind them as a rim light. A fill light in the opposing corner is a second, softer spotlight in Ready Rose at about half the intensity. Both blend softly into the background with a small, subtle grain. Use no other lights, beams, rings or lens flares, and no haze or bloom.';
  var FRAMING = 'Framing: crop in close. The slides span about 2/3 to 3/4 of the frame width, with a modest margin of background around them, and a grid may run off the edges.';
  var SLIDEBODY = 'Slides: every slide is perfectly flat and rigid, like a thin solid chip or a sheet of metal. Slides never bend, curl, fold, twist or warp, and every slide edge is a straight line. Each slide has a very subtle edge glow: a thin, crisp line of light that hugs its edges, sharp and precise, never hazy, dreamy or blooming. Their surface has a low satin finish that picks up soft, diffused ambient light, never sharp or mirror-like reflections.';
  var SPACE = 'Space: the space feels big and open, never boxed in. It can have a floor or a horizon, or no ground at all, with the slides floating in open depth.';
  var SPOT_S = '1 soft key spotlight from a high corner on the slide faces and 1 softer fill spotlight from the opposite corner at half intensity, blue key and magenta fill, subtle grain, big open space, slides perfectly flat and rigid like thin metal chips, never bent, low satin finish with soft diffused reflections, a crisp subtle edge glow, never dreamy';

  var STORY='Story: an editorial magazine photograph about the new professional way to present. They are confident, prepared and at ease while preparing, sharing or talking through their work, never scrambling or stressed.';
  var SKIN='Skin and detail: shot with a fast prime lens, with Kodak Portra 400 skin tones. The raking light draws crisp highlights on the forehead, cheekbones, nose and lips, rich midtones across the face and shadows on the face that keep their detail, while the room around them falls into medium to medium-dark shadow. The face is in sharp focus. Visible pores, fine facial hair, small lines, freckles and natural variation in skin tone hold up at 100%, and light glows through the edges of the ears and hair. Hair reads as soft, natural strands that group into locks, waves or coils with smooth, continuous highlights, never a crosshatch, mesh, grid or etched texture. The medium to medium-dark shadow belongs to the room, never the face. No retouching, skin smoothing, soft glow or HDR look.';
  var CAST='Cast: a real professional, never a model. Give them an ordinary, characterful face with real features, such as laugh lines, grey hairs, uneven skin, glasses or a strong nose, and keep the age and build given above. Never make them conventionally perfect, model-thin or younger than stated. When it fits, add a visible or assistive detail such as a wheelchair, cane, hearing aid or prosthetic, shown as a natural part of their work and never as the subject of the image. Heritage shows only through their real features, such as face, skin, hair and build, never through cultural or traditional jewelry, beadwork, patterns or dress. The setting and props stay the same for every heritage, with no cultural artwork, textiles, objects or decor used to signal it.';
  var ACCENT='Accent: 1 small, ambient hint of our brand color taking no more than 10% of the frame, in 1 deep or muted, neutral-leaning shade of our blue or rose: deep teal blue #004A66, deep navy #002533, deep wine magenta #570E2E, dark wine #410A23, a close wine or plum, or a dusty, greyed version of any of these. It sits quietly on clothing, an accessory or an object in the room, often in shadow, and never draws the eye away from the professional. Choose which shade and where it sits so it fits the mood, light and atmosphere of the scene. Never use a bright, saturated or neon blue or pink.';
  var DECK='Deck: the deck looks endless and nimble. Slides run past the edge of the frame or recede into depth, and every slide is thin, light and caught mid-motion, never a heavy or static pile.';
  var PRESENCE='Presence: the camera is in the room with them, at the table or in the meeting, as close as a colleague would sit. The viewer feels part of the moment. Never a distant or long-lens view from outside the room, through glass or from across the street.';
  var REACH='Distance: the nearest slides sit close to camera, large in the frame and within arm\u2019s reach, so crisp and present that you could almost touch them. The rest of the deck recedes behind them.';
  var TONE='Exposure: shadows fall to medium or medium-dark and never to black, so every shadow keeps its detail and tone. Highlights stay bright but never blow out, so skin, white shirts, paper and windows all keep their texture. No crushed blacks, no clipped whites, no silhouettes.';
  var TONE_S='shadows medium to medium-dark with full detail, highlights never blown out, no crushed blacks or clipped whites';
  var NEVER='Never include: writing, words, letters, numbers, logos or signage of any kind, anywhere in the frame.';
  function professional(o){
    return 'A candid documentary photograph of '+o.subject+', '+o.action+', '+o.setting+'.\n'+
      STORY+'\n'+
      CAST+' '+o.traits+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      'Camera: seated eye level, looking past a softly blurred foreground object such as a glass, a mug, a plant or a colleague\u2019s shoulder.\n'+
      PRESENCE+'\n'+
      ACTION_L+'\n'+
      'Gaze: '+o.gaze+'\n'+
      'Light: low, clear sun rakes in from the side and spotlights them in their element. '+TIME+' Their face is turned toward it and is the brightest, warmest skin in the frame. It draws long, crisp-edged shadows and picks out the texture of wood, fabric and skin. The sunlight falls on them and their table; the background stays in soft shadow unless the background line says otherwise. Around them the light falls off into medium to medium-dark shadow that keeps its detail and tone. The light source sits out of frame, beside or behind the camera, never a bright window behind them.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. It is classic and timeless, so the photo ages well, and never trendy, logoed, formal-event or costume.\n'+
      ACCENT+'\n'+
      'Devices: a laptop can sit in frame as part of the work. It stays secondary to the person, a standard silver, grey or black with a plain lid, and its screen is never readable, because the product is not the focus of this image.\n'+
      propLine(o)+'\n'+
      'Background: '+o.backdrop+'. No window or bright light source behind them. No alcohol.\n'+
      o.focus+'\n'+
      SKIN+'\n'+
      TONE+'\n'+
      LOOK+'\n'+
      'Finish: unposed, caught mid-moment, never posed for the camera.\n'+
      NEVER;
  }
  function product(o){
    return 'A documentary editorial photograph of our product in use: '+o.subject+' works on an open laptop '+o.setting+'. The lit laptop display is the hero.\n'+
      o.pcam+' '+PCAM_ALL+'\n'+
      'Frame: '+o.shot+'\n'+
      o.focus+'\n'+
      'The display is switched on and completely blank: a solid, flat, even white rectangle inside its thin black bezel, with no interface, windows, icons, text or images, ready for a screenshot to be placed in post.\n'+
      PRESENCE+'\n'+
      (o.copy?o.copy+'\n':'')+
      'Story: an editorial photograph about the new professional way to present, with the work coming together quickly and on brand.\n'+
      'Lit by '+o.light+'. '+TIME+' Long crisp shadows fall across the table, and the display adds a soft glow to their hands.\n'+
      TONE+'\n'+
      'Cast: a real professional, never a model, shown mostly through their hands, sleeves, hair and posture, with the age and build given above. Heritage shows only through their real features, never through cultural jewelry, dress, decor or props.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals.\n'+
      propLine(o)+'\n'+
      'Standard silver, grey or black laptop.\n'+
      LOOK+'\n'+
      'Candid, unposed.\n'+
      'Never include: writing, words, letters, numbers, logos or signage anywhere outside the screen.';
  }
  function presentation(o){
    return 'A clean editorial still life in '+o.ground+'.\nLayout: '+cap(o.layout)+'.\n'+
      'Story: the finished deck is the hero, polished, on brand and ready to present.\n'+
      DECK+'\n'+
      (o.copy?o.copy+'\n':'')+
      REACH+'\n'+
      SPACE+'\n'+FRAMING+'\n'+(o.thirds?o.thirds[0]+'\n':'')+SLIDEBODY+'\n'+
      (o.sampled?SPOT_C:SPOT)+'\n'+
      'Every slide face is plain white, lit only by the key and fill, ready for real slides to be placed in post.\n'+
      'Slide geometry: every face is a flat, rigid 16:9 rectangle of the same size with the same small rounded corners, all parallel and evenly spaced along 1 line that recedes to 1 vanishing point. Each face turns no more than 30 degrees from the camera, so even the farthest face reads as a slide and not a sliver. All 4 corners of every face stay in frame and visible, never overlapped by the next face. Use 7 faces at most.\n'+
      LOOK_P+'\n'+
      'No props, no hands. Crisp slide edges. Shot on 50mm at f/5.6.\n'+
      'Never include: writing, words, letters, numbers or logos anywhere in the frame.';
  }
  var AR = {Professional:'16:10', Product:'4:3', Presentation:'3:4'};
  function short(facet,o){
    if(facet==='Professional') return 'Candid editorial photo, '+o.subject+' '+o.action+' '+o.setting+', face turned into '+LIGHT_S+', light spotlighting them in their element, '+NOSUN_S+', seated eye level, camera in the room as close as a colleague, blurred foreground, classic, timeless workwear in quiet neutrals with 1 small ambient accent, deep or muted: teal #004A66, navy #002533, wine #570E2E, dark wine #410A23, plum or a dusty version, under 10% of the frame, never bright, editorial story about the new way professionals present, candid and unposed, '+(o.group?GROUPS[o.shotName][1]+', ':'')+o.focusS+', face in sharp focus, crisp skin highlights, open facial shadows with detail, visible pores and fine hair, room falling into medium to medium-dark shadow, no retouching or smoothing, '+TONE_S+', '+LOOK_S+', no writing or words anywhere --ar '+AR[facet]+' --style raw';
    if(facet==='Product') return 'Editorial product photo, our product in use, '+(PSHOT_S[o.shotName]||PSHOT_S['Over the shoulder']).replace('{H}',o.hands)+', '+o.subject+' at a laptop '+o.setting+', keyboard and display facing camera, display switched on showing a blank solid white screen, no interface, in a thin black bezel, lit by '+LIGHT_S+', '+NOSUN_S+', silver, grey or black laptop, '+TONE_S+', '+LOOK_S+' --ar '+AR[facet]+' --style raw';
    return 'Editorial still life in '+o.ground.split('. ')[0]+', '+o.layout.split('. ')[0]+', endless and nimble, nearest slides close to camera and almost touchable, slides running out of frame, blank white slide faces, '+(o.sampled?SPOT_S.replace('blue and magenta','sampled-color'):SPOT_S)+', '+LOOK_PS+', crisp edges --ar '+AR[facet]+' --style raw';
  }
  function brief(facet,o,shotName){
    var l=['Shoot brief · '+facet];
    if(facet==='Presentation'){l.push('Layout: '+cap(o.layout),'Deck: endless and nimble, slides run out of frame or into depth, never a static pile','Ground: '+o.ground,'Lens: 50mm at f/5.6','Distance: nearest slides close to camera, within arm\u2019s reach, almost touchable',(o.sampled?'Lighting: 1 soft key spotlight from a high corner on the slide faces, or a rim light from behind; 1 fill spotlight in the opposite corner at half intensity; both a lighter tone of the sampled color; subtle grain':'Lighting: 1 soft Azul key spotlight from a high corner on the slide faces, or a rim light from behind; 1 Rose fill spotlight in the opposite corner at half intensity; subtle grain'),'Space: big and open, floor or horizon optional','Look: '+LOOK_PS,'Slides: blank white faces, real slides placed in post',o.copy);return l.filter(Boolean).join('\n');}
    l.push('Story: the new professional way to present. Confident, prepared, at ease. Candid, never posed.','Talent: '+o.subject+'. '+o.traits+' Real people, never models: ordinary faces, age and build as stated, ability shown naturally. Heritage in real features only, never cultural jewelry, dress, decor or props.','Setting: '+o.setting,'Light: '+cap(LIGHT_S)+'. Early morning feels full of possibility; late afternoon feels relaxed and confident. Sun never in frame, no flare. Key on the face so the light spotlights them. Long crisp shadows, texture picked out, surroundings falling off into medium to medium-dark shadow.','Exposure: '+TONE_S,'Look: '+LOOK_S);
    if(facet==='Professional'){l.push('Action: candid, mid-task, actively working; never posed or idle','Props: '+propLine(o),'Shot: '+shotName+'. '+o.shot,'Focus: '+o.focusS,'Camera: seated eye level, soft foreground element','Presence: in the room, as close as a colleague would sit, never a distant long-lens view','Gaze: '+o.gaze,'Wardrobe: '+o.wardrobe+', quiet neutrals','Accent: 1 ambient hint, deep or muted: teal #004A66, navy #002533, wine #570E2E, dark wine #410A23, plum or a dusty version, no more than 10% of the frame, never stealing focus','Devices: laptop secondary, screen unreadable, standard silver, grey or black');}
    else{l.push('Camera: '+o.pcam.replace('Camera: ','')+' Keyboard and lit display always face camera.','Shot: '+shotName+'. '+o.shot,'Screen: switched on, completely blank solid white, no interface, icons or text, for a screenshot in post','Devices: silver, grey or black laptop, plain lid');}
    l.push(o.copy,'Skin: face in sharp focus, open facial shadows, no retouching or smoothing. Keep pores, fine hair, lines and crisp highlights; medium to medium-dark shadow stays in the room.','Hair: soft natural strands grouped into locks, waves or coils, smooth highlights, never crosshatched or mesh-like','Avoid: silhouettes, alcohol','Never include: writing, words, letters, numbers, logos or signage');
    return l.filter(Boolean).join('\n');
  }
  var GROUPS={
    'Medium shot':['Shot on 50mm at f/2.8, waist-up, a small working group: the professional and 2 colleagues around the same table or screen, all waist-up with their heads in the top third of the frame. The professional sits nearest the camera, and the light favors them.','50mm, waist-up, the professional and 2 colleagues working together, the professional nearest the camera'],
    'Two-shot':['Shot on 50mm at f/2.8 at seated table height, the professional and 2 or 3 colleagues gathered around the corner of a table, all waist-up with their heads in the top third of the frame, in the moment together, with the light favoring the professional.','50mm at table height, the professional and 2 or 3 colleagues gathered together, light favoring the professional'],
    'Wide shot':['Shot on 35mm at f/4 from across the table, near enough to join them: the professional and a small group of 3 or 4 colleagues working together around the table or a screen, with the light favoring the professional.','35mm from across the table, the professional and 3 or 4 colleagues working together, light favoring the professional']
  };
  var FOCUS_1='Focus: the professional is the only sharp subject in the frame. Keep the background simple, low in detail and low in contrast, with no faces, readable text or bright shapes that pull the eye away from them.';
  var FOCUS_G='Focus: the group is the sharp subject, with the professional the sharpest and brightest of them. Keep the background simple, low in detail and low in contrast, with no other faces, readable text or bright shapes that pull the eye away from the group.';
  var FOCUS_P='Focus: the professional\u2019s hands and the display are the sharpest plane in the frame. Keep the room behind them simple, low in detail and low in contrast.';
  var FOCUS_1S='sharp focus on the professional alone, simple low-detail low-contrast background';
  var FOCUS_GS='sharp focus on the group, the professional sharpest, simple low-detail low-contrast background';
  var FOCUS_PS='hands and display in sharpest focus, simple low-detail background';
  var SHOT_S={'Close-up':'85mm close-up, just below eye level, easy smile, bright space blurred behind','Medium shot':'50mm, waist-up, head and eyes in the top third, laptop in frame or implied','Two-shot':'50mm two-shot at table height, heads in the top third, the professional and 1 colleague together, light favoring the professional','Wide shot':'35mm from across the table or room, near enough to join them'};
  var COPY_S={'Yes':'Empty space beside or above them for a headline.','Above':'Empty space above them for a headline.','Left':'Subject right, empty space left for a headline.','Right':'Subject left, empty space right for a headline.','Across':'Calm band across the frame for a headline.'};
  var WARD_S={'Any':'Current tailored workwear, fabric of your choice','Business':'Tailored suit or blazer in wool, linen or crepe','Smart casual':'Soft blazer, overshirt or fine knit','Relaxed':'Neat knit, tee or open-collar shirt'};
  var SKIN_S=LOOK_S+', soft natural hair strands with smooth highlights, never crosshatched or mesh-like, face in sharp focus, crisp skin highlights, open facial shadows, visible pores and fine hair, no retouching or smoothing.';
  function cap(t){return t.charAt(0).toUpperCase()+t.slice(1)}
  var SET_S={'Office':'an office: open floor, meeting room or quiet corner','Home':'a home: living room, kitchen table or loft','Café':'a café, busy counter or quiet corner','Home office':'a home office','In transit':'a train, airport lounge or station'};
  var FILM_S='Editorial photo, '+LOOK_S+'. Face in sharp focus, visible pores, open shadows, no retouching; natural hair strands, never mesh-like.';
  function compact(facet,o,sel){
    var cp=COPY_S[sel.copy]?COPY_S[sel.copy]+' ':'';
    var set=R?o.setting:'in '+(SET_S[stOf(sel,facet)]||SET_S['Office']);
    var cast='Real, ordinary face. '+o.traits+' '+cap(o.wardrobe)+', quiet neutrals. '+propLine(o)+' Heritage in real features only, never cultural dress or props.';
    if(facet==='Presentation')return 'Editorial still life, '+LOOK_PS+'. '+cap(o.ground)+'. '+cap(o.layout)+'. Every slide is thin, flat and rigid like a metal chip, with small rounded corners, a low satin finish and a crisp, subtle edge glow, never bent or hazy. Crop in close, with the slides spanning about 2/3 to 3/4 of the frame width. '+(o.thirds?o.thirds[1]+' ':'')+'Blank white slide faces for real slides in post. '+cp+'No props, hands, writing, words or logos.';
    if(facet==='Product')return 'Editorial photo, '+LOOK_S+'. Hands and hair in natural detail, no retouching. Our product in use: '+(PSHOT_S[sel.pshot]||PSHOT_S['Over the shoulder']).replace('{H}',o.hands)+'. '+cap(o.subject)+' '+set+'. The display is on and completely blank: solid flat white inside its thin black bezel, no interface, icons or text, for a screenshot in post. '+cap(LIGHT_S)+', '+NOSUN_S+', the screen glowing softly on their hands. '+cp+cap(o.wardrobe)+', quiet neutrals. '+propLine(o)+' Silver, grey or black laptop. Heritage in real features only, never cultural dress or props. No writing, words or logos outside the screen.';
    var gaze=sel.shot==='Close-up'?'into the lens or just off camera':'on a colleague or the task, never the lens';
    return FILM_S+' '+cap(LIGHT_S)+' spotlights them, face brightest; the room falls into medium-dark shadow. Light from out of frame, no window behind, no sun or flare. The new way professionals present: '+o.subject+', '+o.action+', '+set+'. '+(o.group?GROUPS[o.shotName][1]:(SHOT_S[sel.shot]||SHOT_S['Medium shot']))+'. Background: '+o.backdrop+', '+o.focusS+'. '+cp+'Never posed or idle, gaze '+gaze+'. '+cast+' 1 small deep or muted teal, navy, wine or plum accent. Laptop screen unreadable. No writing, logos or alcohol.';
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
      t=t.replace(/completely blank: a solid, flat, even white rectangle inside its thin black bezel, with no interface, windows, icons, text or images, ready for a screenshot to be placed in post\./,'showing the attached screenshot exactly as it is, inside its thin black bezel, sharp, evenly lit and legible, never redrawn or restyled.')
       .replace('anywhere outside the screen.','anywhere outside the attached screenshot.')
       .replace('completely blank: solid flat white inside its thin black bezel, no interface, icons or text, for a screenshot in post.','showing the attached screenshot exactly as it is, inside its thin black bezel.')
       .replace('showing a blank solid white screen, no interface,','showing the attached screenshot, unaltered,')
       .replace('Screen: switched on, completely blank solid white, no interface, icons or text, for a screenshot in post','Screen: facing camera, showing the supplied screenshot unaltered');
    }
    return t;
  }
  function build(facet,sel,tool){return build0(facet,sel,tool)}
  var PLACES={'Office':['in a glass-walled meeting room','at a standing desk by a tall window','in a quiet library-style booth in the office','at a long shared table in an open studio','in a small huddle room with a round table','on a low sofa in the office lounge','at a hot desk on an open office floor','at a wide desk in a corner office','at the kitchen bar in the office','at a small ledge in an office phone booth','in a project room with pinned-up boards','at a high table in a break-out area'],
    'Home':['at a kitchen island at home','on a sofa corner by a floor lamp','at a dining table at home','on a window seat with cushions','at a breakfast bar with high stools','in an armchair beside a bookcase','at a table in a sunroom','at a balcony table, the door open behind them','at a low coffee table in the living room','at the kitchen table after breakfast','in a reading nook at home','at a long farmhouse table'],
    'Home office':['at a desk in a converted spare room','at a desk nook under the stairs','at a loft desk under a skylight','at a wide desk in a garden studio','at a standing desk by a bookshelf at home','at a desk tucked into a bedroom alcove','at a wide home desk with the window to the side','in a basement office with a warm lamp','in an attic office with a sloped ceiling','at a built-in desk in a hallway niche','in a shared home office with 2 desks','at a corner desk beside a record shelf'],
    'Café':['at a counter seat in a café','in a corner banquette in a café','at a communal table in a busy café','at a small marble table in a café','on a long bench in a bakery café','at a café terrace table under an awning','on a quiet mezzanine in a café','in a deep armchair in a hotel café','on a stool at a coffee bar','at a table in a bookshop café','at a long table in a co-working café','at a small table in a neighborhood café'],
    'In transit':['at a train table seat','in an airport lounge armchair','in a quiet gate area at the airport','on a stool in a station café','on a hotel lobby sofa','in a ferry lounge seat','in a quiet carriage on a high-speed train','in an airport work pod','in a train station waiting room','in a coach seat with a fold-down tray','in the business corner of a hotel lobby','in the back seat of a car']};
  var BGS={'Office':['a glass partition in soft shade','a blank whiteboard in soft shadow','an empty desk in soft shade','rows of desks falling into shadow','a concrete column in soft shade','a pinned board in deep shadow','shelves of binders and plants in shadow','a corridor of meeting rooms in medium-dark shade','a textured acoustic wall in soft, even shadow','sunlight on a far wall, cast through blinds from a window out of frame'],
    'Home':['bookshelves falling into soft shadow','a kitchen with open shelves, out of focus','a plant-filled corner in shadow','a hallway doorway in medium-dark shade','framed prints on a dim wall','a sofa and throw blanket softly out of focus','a wood-panelled wall in warm, dim shade','a linen curtain in soft shade','a textured plaster wall in soft, even shadow','sunlight on a far wall, cast through leaves from a window out of frame'],
    'Home office':['a plain pegboard in soft shadow','bookshelves and a record player in soft shadow','a sloped ceiling falling into shade','a corkboard in deep shadow','a plant-filled shelf in shadow','a closed door and coat hook in dim shade','a shelf of box files and a lamp, softly lit','a painted brick wall in soft, even shadow','an armchair in soft shadow','sunlight on a far wall, cast through blinds from a window out of frame'],
    'Café':['a coffee counter in soft shade','shelves of cups and jars in soft shade','empty tables in soft shade','a tiled wall in soft, even shadow','a dim bar in soft shade','a wall of plants in shadow','a quiet counter corner in shadow','stacked chairs and a doorway in medium-dark shade','a wood-panelled wall in warm, dim shade','a plain shelf in warm, dim shade'],
    'In transit':['empty seats ahead falling into shadow','empty seats across the aisle in shade','a departure lounge in medium-dark shade','luggage racks and a carriage door in dim shade','a row of lounge chairs softly out of focus','a hotel lobby in low, dim light','a concourse of columns in soft shade','a coat and bag on the seat opposite, out of focus','a textured lounge wall in soft, even shadow','sunlight sweeping across the seats from a window out of frame']};
  var SPROPS={'Office':['a paper cup of coffee','a closed notebook with a pen','a glass of water','a phone lying face down','a lanyard with a blank badge','a closed laptop sleeve','a small stack of blank sticky notes','a plain ceramic mug'],'Home':['a mug of tea','a small vase of flowers','reading glasses resting on a closed book','a glass of water','a bowl of fruit','a phone lying face down','a folded throw blanket','a small potted plant'],'Home office':['a desk lamp','a cup of pens','a small potted plant','a pair of headphones','a closed sketchbook','a mug of coffee','a phone lying face down','2 closed books, stacked'],'Café':['a flat white in a ceramic cup','a pastry on a small plate','a glass of sparkling water','an espresso on a saucer','a small pot of tea','a glass of iced coffee','a phone lying face down','a lidded paper cup'],'In transit':['a lidded paper cup of coffee','a boarding pass face down','a carry-on bag at their feet','a folded jacket on the seat beside them','a bottle of water','a passport with a blank cover','wireless earbuds in their case','a phone lying face down']};
  function stOf(sel,facet){return PLACES[sel.setting]?sel.setting:'Office'}
  function fit(k,l){var w=keep(k,function(){return pick(l,1)[0]});if(l.indexOf(w)<0){w=pick(l,1)[0];if(R)R[k]=w}return w}
  var PFEAT=['the AI prompt panel open beside a fresh slide','a smart slide layout adjusting as content is added','a locked brand theme applied across a deck','presenter view with the next slide ready','a grid of slide thumbnails being reordered','a chart slide updating as data is added','a team workspace of shared decks'];
  var RPLACES={'Marketing':{'Office':['in a studio room with campaign imagery pinned to the boards','at a table with the creative team, mood boards behind them','in a glass-walled room reviewing a campaign with designers'],'Home':['at a kitchen table, campaign proofs pinned to the fridge behind','on a sofa the evening before a campaign launch','at a dining table with a mood board propped against the wall'],'Home office':['at a desk under a wall of pinned campaign imagery','at a wide desk below a shelf of swatches','at a standing desk beside a mood board'],'Café':['at a café table with the creative lead','at a long café table after a creative review','at a café counter after a shoot'],'In transit':['at a train table seat on the way to a launch','in an airport lounge on the way to a campaign shoot','in a hotel lobby before a launch event']},'Sales':{'Office':['in a client meeting room with a long polished table','in a client reception, waiting to present','in a glass-walled room walking a client through the deck'],'Home':['at a kitchen table before an early client call','at a dining table prepping for a client pitch','on a sofa corner reviewing the pitch the night before'],'Home office':['at a desk set up for a client video call','at a standing desk rehearsing a pitch','at a wide desk the morning of a client pitch'],'Café':['at a café table across from a client','at a corner table before a client meeting','at a hotel café table, meeting a client'],'In transit':['in an airport lounge armchair, flying to a client','at a train table seat on the way to a client','in a hotel lobby before a client pitch']},'Business development':{'Office':['in a partner meeting room with a whiteboard of boxes and arrows','at a long table with a prospective partner','in a huddle room mapping a new market'],'Home':['at a kitchen table preparing a partnership pitch','at a dining table below a framed map','in an armchair reading a partner proposal'],'Home office':['at a desk with printed market maps pinned up','at a standing desk before a partner call','at a desk with a globe on the shelf behind'],'Café':['at a café table meeting a potential partner','at a co-working café table between meetings','at a café counter before a partner intro'],'In transit':['at a train table seat between partner visits','in an airport lounge before a partner meeting abroad','in a conference venue lounge between sessions']},'Consultants & analysts':{'Office':['in a project war room with charts pinned to the walls','at a project room table on a client site','in a meeting room presenting findings to leadership'],'Home':['at a dining table the night before a client readout','at a kitchen island before a client workshop','in an armchair reviewing an analysis'],'Home office':['at a desk with 2 monitors of data, screens unreadable','at a wide desk below a wall of pinned charts','at a desk with shelves of binders behind'],'Café':['at a quiet café table before a client readout','at a corner table working through an analysis','at a hotel café between client workshops'],'In transit':['at a train table seat on the way to a client site','in an airport lounge between client engagements','in a hotel business corner the night before a readout']}};
  var RBGS={'Marketing':{'Office':['a pinned board of campaign proofs in deep shadow','a plain studio wall in soft shade'],'Home':['printed proofs on a dim wall, out of focus','swatches on a shelf in shadow'],'Home office':['a pinned board in deep shadow','fabric swatches on a shelf in shadow'],'Café':['a quiet corner of the café in soft shade','a plain wood wall in warm, dim shade'],'In transit':['a stack of event boxes in shadow','a quiet lounge wall in soft shade']},'Sales':{'Office':['the far end of an empty table in soft shade','a reception wall in soft shade'],'Home':['a jacket and bag by the door, out of focus','a hallway in dim shade'],'Home office':['a headset on a shelf in shadow','a jacket on the back of a door in dim shade'],'Café':['an empty chair across the table in soft shade','a plain café wall in soft shade'],'In transit':['a carry-on beside the seat, out of focus','a quiet gate area in soft shade']},'Business development':{'Office':['a blank whiteboard in soft shadow','an empty meeting room in soft shade'],'Home':['a framed map on a dim wall, out of focus','a stack of reports on a shelf in shadow'],'Home office':['a pinned map in deep shadow','a bookshelf in soft shadow'],'Café':['an empty chair across the table in soft shade','a quiet co-working corner in shade'],'In transit':['a quiet lounge in soft shade','a bag on the seat opposite, out of focus']},'Consultants & analysts':{'Office':['a pinned wall in deep shadow, nothing readable','an empty far table in soft shade'],'Home':['binders on a shelf in shadow','a side table in soft shade'],'Home office':['a pinned board in deep shadow','stacks of binders in soft shadow'],'Café':['a plain café wall in soft shade','empty tables in soft shade'],'In transit':['a suit bag hung by the seat, out of focus','a quiet lounge wall in soft shade']}};
  function fitR(k,sp,gen){sp=sp||[];var all=sp.concat(gen),w=keep(k,function(){return sp.length&&Math.random()<0.6?pick(sp,1)[0]:pick(gen,1)[0]});if(all.indexOf(w)<0){w=sp.length&&Math.random()<0.6?pick(sp,1)[0]:pick(gen,1)[0];if(R)R[k]=w}return w}
  function rs(m,sel,facet){return (m[sel.role]||{})[stOf(sel,facet)]}
  var PROP_AT={'Close-up':'soft at the edge of the frame','Medium shot':'beside the laptop','Wide shot':'small in the scene','Two-shot':'on the table between them','Over the shoulder':'at the edge of the table','Point of view':'at the edge of the table, within reach','Lifestyle':'beside the laptop'};
  function propLine(o){return o.props?'1 prop only: '+o.props+(o.held||/beside|at their feet|on the seat/.test(o.props)?'':', '+(PROP_AT[o.shotName]||'nearby'))+'. Nothing else on the table but the laptop.':'No props: only the laptop on the table.'}
  var DRINKS={'Office':['a paper cup of coffee','a plain ceramic mug','a glass of water'],'Home':['a mug of tea','a glass of water','a mug of coffee'],'Home office':['a mug of coffee','a glass of water','a mug of tea'],'Café':['a flat white in a ceramic cup','an espresso on a saucer','a glass of iced coffee','a small pot of tea'],'In transit':['a lidded paper cup of coffee','a bottle of water']};
  var AMBIENT={'Office':['a lanyard with a blank badge','a closed laptop sleeve','a phone lying face down','a small potted plant'],'Home':['a small vase of flowers','a bowl of fruit','a folded throw blanket','a small potted plant'],'Home office':['a desk lamp','a cup of pens','a pair of headphones','a small potted plant'],'Café':['a pastry on a small plate','a phone lying face down'],'In transit':['a folded jacket on the seat beside them','a carry-on bag at their feet','wireless earbuds in their case','a passport with a blank cover']};
  /* Pro actions: [text, prop kind, only in setting]. The prop follows the action. */
  var PACTS=[['typing, building their next slide','drink'],['reading back through their deck, chin resting on 1 hand','drink'],['reaching for their drink while reviewing a slide','held'],['on a video call with earbuds in, talking through their slides','earbuds'],['explaining a slide to a colleague, 1 hand mid-gesture','drink'],['rehearsing out loud, 1 hand mid-gesture','none'],['glancing at their phone before going back to the deck','phone'],['putting on reading glasses to check a detail','glasses'],['leaning back in their chair, pleased with the finished deck','ambient'],['making a last edit before heading to the meeting','drink','In transit']];
  var HELD={held:1,phone:1,glasses:1};
  function propsFor(kind,st){
    if(kind==='none')return [''];
    if(kind==='held')return DRINKS[st].map(function(d){return d+' in 1 hand'});
    if(kind==='phone')return ['a phone in 1 hand'];
    if(kind==='glasses')return ['reading glasses in 1 hand'];
    if(kind==='earbuds')return ['the open earbud case beside the laptop'];
    if(kind==='ambient')return AMBIENT[st];
    return DRINKS[st].concat(['']);
  }
  var PHANDS=['their hands on the keyboard','1 hand on the trackpad, the other resting casually on the table','1 hand raised mid-gesture as they talk it through','both hands resting loosely on the table edge','1 hand pointing to a spot on the screen','1 hand on the keyboard, the other mid-gesture'];
  var LV=[],R=null;
  function keep(k,fn){if(!R)return fn();if(!(k in R))R[k]=fn();return R[k]}
  function build0(facet,sel,tool){
    LV=[];
    if(R&&R._role!==sel.role){delete R.place;delete R.backdrop;R._role=sel.role}
    var o={
      subject: facet==='Product'?subjectOf(sel):(sel.race||sel.age||sel.build)?subjectOf(sel):(ROLES[sel.role]||ROLES['Marketing']),
      action: (function(){if(!R||facet!=='Professional')return ACTION_G;var st=stOf(sel,facet),l=PACTS.filter(function(a){return !a[2]||a[2]===st});var a=keep('act',function(){return pick(l,1)[0]});if(l.indexOf(a)<0){a=pick(l,1)[0];R.act=a}return a[0]})(),
      traits: (function(){var t=keep('traits',function(){return pick(TRAITS,2)});if(sel.age==='20s'&&t.some(function(x){return x[1]==='old'})){t=pick(TRAITS.filter(function(x){return x[1]!=='old'}),2);if(R)R.traits=t}LV.push(t[0][0],t[1][0]);return 'They have '+t[0][0]+' and '+t[1][0]+'.'})(),
      props: (function(){var st=stOf(sel,facet),kind;if(facet==='Professional'&&R&&R.act)kind=R.act[1];else{kind=(R&&R.pkind)||(Math.random()<0.5?'drink':'ambient');if(R)R.pkind=kind}var l=propsFor(kind,st),w=keep('props',function(){return pick(l,1)[0]});if(l.indexOf(w)<0){w=pick(l,1)[0];if(R)R.props=w}if(w)LV.push(w);return w})(),
      hands: fit('hands',PHANDS),
      held: (facet==='Professional'&&R&&R.act&&HELD[R.act[1]])?1:0,
      backdrop: fitR('backdrop',rs(RBGS,sel,facet),BGS[stOf(sel,facet)]),
      setting: R?fitR('place',rs(RPLACES,sel,facet),PLACES[stOf(sel,facet)]):'in '+SETTINGS[stOf(sel,facet)],
      light: LIGHT,
      accent: ACCENTS[sel.accent]||ACCENTS['Agency Azul'],
      accentItem: sel.accentItem||ACCENT_ITEMS[0],
      gaze: sel.shot==='Close-up'?'either straight into the lens with a warm, open expression, or caught in the moment looking just off camera, whichever tells the story better.':'on a colleague or the task just out of frame, never at the lens.',
      copy: COPY[sel.copy]||'',
      wardrobe: (function(){var l=outfitsFor(sel,facet),w=keep('wardrobe',function(){return pick(l,1)[0]});if(l.indexOf(w)<0){w=pick(l,1)[0];if(R)R.wardrobe=w}return w[0]})(),
      shot: facet==='Product'?(PSHOTS[sel.pshot]||PSHOTS['Over the shoulder']):(SHOTS[sel.shot]||SHOTS['Medium shot']),
      pcam: PCAMS[sel.pshot]||PCAMS['Over the shoulder'],
      shotName: facet==='Product'?(sel.pshot||'Over the shoulder'):(sel.shot||'Medium shot'),
      feature: fit('feature',PFEAT),
      layout: LAYOUTS[sel.layout]||LAYOUTS['Floating multiple'],
      ground: sel.ground==='Sampled'&&sel.sampleHex?GROUNDS['Sampled'].replace(/1 color sampled from the slides:[^.]*\.( Never use the main color itself\.)?/,(sel.sampleHand?sel.sampleHex+', a color chosen to go with the slides.':sel.sampleHex+', an analogous color of '+sel.sampleBase+', the main color of the slides. Never use '+sel.sampleBase+' itself.')).replace(/The sampled color is either light.*?never use a mid-tone\./,'Keep '+sel.sampleHex+' exactly. Never shift it toward a mid-tone.'):(GROUNDS[sel.ground]||GROUNDS['Light']),
      thirds: thirdsOf(sel),
      sampled: sel.ground==='Sampled'
    };
    o.shot=o.shot.replace('{H}',o.hands);
    o.group=0;if(facet==='Professional'&&GROUPS[o.shotName]&&R){o.group=keep('grp',function(){return Math.random()<0.45?1:0})}
    if(o.group){o.shot=GROUPS[o.shotName][0];}
    o.focus=facet==='Product'?FOCUS_P:(o.group?FOCUS_G:FOCUS_1);o.focusS=facet==='Product'?FOCUS_PS:(o.group?FOCUS_GS:FOCUS_1S);
    ['subject','feature','backdrop','setting','accent','accentItem','copy','wardrobe','shot','pcam','layout','ground'].forEach(function(k){if(o[k])LV.push(o[k])});
    if(tool==='Short') return compact(facet,o,sel);
    if(tool==='Midjourney') return short(facet,o);
    if(tool==='Shoot brief') return brief(facet,o,o.shotName);
    return facet==='Professional'?professional(o):facet==='Product'?product(o):presentation(o);
  }

  /* Gallery. Tags drive the filters; sel drives the prompt. */
  var P='Professional', PR='Product', PZ='Presentation';
  var ITEMS = [
    {src:'photo-range-hero.webp',facet:P,shot:'Wide shot',setting:'Office',light:'Hard sun',role:'Consultants & analysts',cap:'Room for a headline',sel:{action:'leaning at a counter, reading a printed page'}},
    {src:'photo-pro-sunlit-desk.webp',facet:P,shot:'Medium shot',setting:'Home',light:'Hard sun',role:'Marketing',cap:'Mid-thought, in the sun',sel:{action:'building a presentation on a laptop'}},
    {src:'hero-content-stack.webp',facet:PZ,cap:'A deck, as a front stack',sel:{layout:'Front stack',ground:'Light'}},
    {slot:'gv-prod-ai',ratio:'4/3',facet:PR,cap:'Create with AI, on screen',sel:{feature:'Create with AI',setting:'Café',light:'Hard sun'}},
    {src:'deck-grid-wall.webp',facet:PZ,cap:'A deck, as a tilted grid',sel:{layout:'Grid',ground:'Dark'}},
    {src:'hero-content-fan.webp',facet:PZ,cap:'A deck, as a strip on dark',sel:{layout:'Strip',ground:'Dark'}},
    {slot:'gv-prod-smart',ratio:'4/3',facet:PR,cap:'A smart slide, adjusting',sel:{feature:'Smart Slides',setting:'Office',light:'Hard sun'}},
    {slot:'gv-slide-chart',ratio:'3/4',facet:PZ,cap:'A deck, floating on Gallery Grey',sel:{layout:'Floating multiple',ground:'Light'}},
    {slot:'gv-prod-present',ratio:'4/3',facet:PR,cap:'Presenting from the app',sel:{feature:'Presenting',setting:'Office',light:'Hard sun'}},
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
    Presentation: build(PZ,{layout:'Floating multiple',ground:'Light'},'GPT Image')
      .replace(LAYOUTS['Floating multiple'],'[LAYOUT]').replace(GROUNDS['Light'],'[GROUND]')
  };

  return {hold:function(){R={}},reroll:function(){R={}},lastVars:function(){return LV.slice()},PSHOTS:PSHOTS,BUILDS:BUILDS,AGES:AGES,RACES:RACES,ROLES:ROLES,SHOTS:SHOTS,SETTINGS:SETTINGS,ACTIONS:ACTIONS,ACCENTS:ACCENTS,COPY:COPY,WARDROBES:WARDROBES,ACCENT_ITEMS:ACCENT_ITEMS,FEATURES:FEATURES,LAYOUTS:LAYOUTS,GROUNDS:GROUNDS,ITEMS:ITEMS,BASE:BASE,build:build};
})();
