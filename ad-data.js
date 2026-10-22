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
  var PROPS = ['a ceramic mug of coffee','a glass of water','a closed notebook with a pen','a small potted plant','folded reading glasses','a phone lying on the table, out of use','wireless earbuds in their case','a tablet with a stylus, its screen dark','a tote bag on the chair beside them','a reusable water bottle'];
  var BACKDROPS = ['a subtly textured wall in soft, even shadow','bookshelves falling into soft shadow','an empty desk in soft shade','a corridor or doorway in medium shade','a wood-panelled wall in warm, dim shade','a plant-filled corner in soft shadow','a room that falls off into medium shadow','sunlight on a far wall, cast through blinds or leaves from a window out of frame'];
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
    'Medium shot': 'Shot on 50mm at f/2.8, waist-up, with their head and eyes in the top third of the frame and little headroom above. A laptop or screen can be in frame or only implied, and the desk and room stay visible around them.',
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

  var STORY='Story: an editorial magazine photograph about the new professional way to present. They are confident, prepared and at ease while preparing, sharing or talking through their work, never stressed.';
  var SKIN='Skin and detail: shot with a fast prime lens, with Kodak Portra 400 skin tones. The raking light draws crisp highlights on the forehead, cheekbones, nose and lips and rich midtones across the face, and facial shadows keep their detail while the room falls into medium shadow. The face is in sharp focus. Pores, fine facial hair, small lines, freckles and natural variation in skin tone hold up at 100%, and light glows through the edges of the ears and hair. Hair falls in soft, natural strands that group into locks, waves or coils with smooth highlights, never a crosshatch, mesh or etched texture. No retouching, skin smoothing, soft glow or HDR look.';
  var CAST='Cast: a real professional, never a model, with an ordinary, characterful face and real features, such as laugh lines, grey hairs, uneven skin, glasses or a strong nose. Keep the age and build given above, never conventionally perfect, model-thin or younger. When it fits, add an assistive detail such as a wheelchair, cane, hearing aid or prosthetic, shown as a natural part of their work, never the subject. Heritage shows only through real features (face, skin, hair, build), never through cultural jewelry, patterns, dress, artwork, textiles or decor; the setting and props stay the same for every heritage.';
  var ACCENT='Accent: 1 small, ambient hint of our brand color, no more than 10% of the frame, in 1 deep, muted, neutral-leaning shade of our blue or rose: deep teal blue #004A66, deep navy #002533, deep wine magenta #570E2E, dark wine #410A23, a close wine or plum, or a dusty, greyed version of these. It sits quietly on clothing, an accessory or an object in the room, often in shadow, never drawing the eye from the professional. Pick the shade and place to suit the mood and light. Never a bright, saturated or neon blue or pink.';
  var DECK='Deck: the deck looks endless and nimble. Slides recede far into depth, and every slide is thin, light and caught mid-motion, never a heavy or static pile.';
  var PRESENCE='Presence: the camera is in the room with them, as close as a colleague would sit, so the viewer feels part of the moment. Never a distant or long-lens view from outside the room or through glass.';
  var REACH='Distance: the nearest slides sit close to camera, large in the frame and within arm\u2019s reach, so crisp and present that you could almost touch them. The rest of the deck recedes behind them.';
  var TONE='Exposure: a touch bright, light and open but never washed out. Shadows fall to medium, never darker, and keep their detail. Highlights stay bright but never blow out, so skin, white shirts, paper and windows keep their texture. No crushed blacks, clipped whites or silhouettes.';
  var TONE_S='exposed a touch bright, light and open, shadows no darker than medium with full detail, highlights never blown out, no crushed blacks or clipped whites';
  var NEVER='Never include: writing, words, letters, numbers, logos or signage anywhere in the frame. A phone may lie on the table, but never in a hand or being looked at; they work on a laptop.';
  function zoneOf(s,pt){return s==='Two-shot'?'between':pt?'side':s==='Close-up'?'side':s==='Two-shot'?'between':'around'}
  var FL_BG=' The background is minimal and uncluttered, with a shallow depth of field: the room behind the professional falls into soft, creamy bokeh, with no busy shelves, art, screens or clutter, so slides placed later read against a calm ground. The laptop and the professional stay sharp.';
  var FL_END=' Keep the room\u2019s perspective clean and readable, with true verticals in the walls, shelves and furniture, straight edges and a level horizon at their eye level, so the {K} added later can follow the same vanishing points. Never put slides, panels, frames, screens or UI in that space now.';
  var FL_WHERE={around:'with the professional at the center. Leave open, uncluttered air around them, above each shoulder, in the upper corners and beside the laptop, for {K} to be placed in post.',side:'with the professional at the same distance as this framing, but in the left or right third, turned into the frame, with the other 2 thirds open, uncluttered and softly lit for {K} to be placed in post. In the open side, show 1 clear plane of the room, such as a wall meeting the floor or a shelf line in soft shade.',between:'with both people in the lower half and open, uncluttered air above and between them for {K} to be placed in post.'};
  var FLS_WHERE={around:'professional centered, open uncluttered air above each shoulder, in the upper corners and beside the laptop',side:'professional at the same distance in the left or right third, turned into the frame, the other 2 thirds open and softly lit, 1 clear wall or floor plane on the open side',between:'both people in the lower half, open uncluttered air above and between them'};
  function flKind(o){return o.floatKind==='UI'?'floating product UI cards and panels':'thin floating slides'}
  function floatFor(o){var z=zoneOf(o.shotName,o.portrait),k=flKind(o);return (o.floatKind==='UI'?'Floating UI':'Floating slides')+': frame the image wide, at a 2:1 ratio (1100 \u00d7 550 pixels), '+FL_WHERE[z].split('{K}').join(k)+FL_BG+FL_END.split('{K}').join(k)}
  function floatS(o){return 'wide 2:1 frame, '+FLS_WHERE[zoneOf(o.shotName,o.portrait)]+' for '+flKind(o)+' in post, minimal uncluttered background in shallow depth of field with soft bokeh, readable room lines, true verticals and a level horizon, no panels, screens or UI'}
  var ARRS=[[function(){return true},'Plane: the laptop\u2019s plane. Every panel stands parallel to the laptop screen, as if it were another screen floating in the room, and shares the laptop\u2019s vanishing points. Spread the panels at different depths through the negative space the professional and the laptop leave: some in front, low and to the side of the laptop, and some farther back, behind the professional, beside and above their head and shoulders, so the professional sits among them.'],[function(){return true},'Plane: the back wall. Every panel sits flat on the plane of the back wall behind the professional, like large slides projected or mounted along it, and shares the wall\u2019s vanishing point and horizon. Run them in a line along the wall at a common height, behind and above the professional and their hardware, with the gaps between them falling where the professional\u2019s head and the hardware rise, so the panels frame the forms rather than hide them.']];
  function place(sel){var n=Math.max(1,Math.min(6,Math.round(+sel.panels||3))),ui=sel.float==='UI',z=zoneOf(sel.shot||'Medium shot',sel.style==='Portrait');
    var what=ui?'our product UI screenshots':'our slides',panel=ui?'UI panels':'slides';
    var where={around:'in the negative space around the professional and the laptop',side:'in the negative space on the open side of the frame',between:'in the negative space above and around the 2 people'}[z];
    var arr=fit('arr',ARRS.map(function(a){return a[1]}));
    return ['Edit the first image. Keep it at exactly its own size and ratio. Place the other '+(n===1?'image':n+' images')+', '+what+', as '+(n===1?'1 floating panel':n+' floating panels')+' '+where+'. Change nothing else in the photo.',
      'Composition: the panels exist to complete a balanced composition with the professional and their laptop or hardware. Read the shapes the professional and the laptop make, find the open, negative space they leave, and place the panels there, so the frame feels whole and balanced, never crowded on 1 side or empty on the other.',
      arr,
      'Background: keep the room behind the panels as it is in the photo, minimal and softly out of focus. If any part is busy, soften it further so every panel reads against a calm, blurred ground.',
      'Count: use each attached image exactly once, 1 per panel, in the order attached. Never repeat an image and never invent a panel. If fewer images are attached than '+n+', use only as many panels as there are images.',
      'Layering: the professional stays the hero. Panels may sit behind the professional, and the professional\u2019s head, shoulders and body overlap them naturally. A panel in front stays low and to the side, never covering the face, hands or the laptop screen; it may overlap only the edge of the laptop or table. Each panel is secondary: the nearest is at most a third of the frame width, and the rest step down in size with depth.',
      'Perspective: find the room\u2019s horizon and vanishing points from its lines, such as the back wall, window frames, shelves and the table edge. All panels share the 1 plane named above and its vanishing points. Every panel\u2019s sides stay parallel to the room\u2019s verticals, and every vanishing point sits on the room\u2019s own horizon. A farther panel is smaller and sits closer to the horizon. It must look photographed in the room, never pasted on.',
      'Material: each panel is paper-thin and rigid, with a low satin finish and a fine, crisp edge. No bezel, frame, device body, glow or screen light. Apply each image with only a perspective transform pinned to its 4 corners, at its own ratio. Never redraw, stretch, squeeze or crop it.',
      'Light: the panels are lit by the room, never from inside. The sun that lights the professional falls on them from the same direction and warmth, so the side facing it is a touch brighter and the far side falls into soft shade. A panel\u2019s white is never brighter than the brightest wall in the room. Match the scene\u2019s focus and grain; panels near the professional\u2019s focal plane are sharpest and the rest soften slightly.',
      'Shadows: every panel casts a real shadow from that same sun, at the same angle and length as the room\u2019s own shadows. Where a panel floats near the back wall, a shelf or the table, its soft-edged shadow lands on that surface in the room\u2019s shadow tone, never black. The farther a panel floats from a surface, the softer and fainter its shadow. Never add a drop shadow that ignores the light.',
      'Keep every word, number, chart and photo on the panels identical and legible.'].join('\n')}
  var PT_LIGHT='Light: low, clear sun comes in from the side and spotlights them, softened a little by a sheer curtain or a pale wall nearby. '+TIME+' Their face is turned toward it and is the brightest, warmest skin in the frame. Shadows keep a gentle edge instead of a crisp one, and the light still picks out the texture of fabric and skin. Around them the light falls off into soft medium shadow that keeps its detail and tone. The light source sits out of frame, beside or behind the camera, never a bright window behind them. {W}, never across the face. No sun patterns, window shapes or leaf shadows on the walls unless named here.';
  var PT_BG='Background: a quiet, minimal corner of {P}. It is mostly 1 plain, uncluttered surface of that place in its own natural color, such as a painted wall, glass, wood, concrete or tile, a step darker than the face, with at most 1 softly blurred detail of {P} at the edge, so the place still reads. The warmth comes from the light, never from painting the walls a warm color. No clutter, art, signage or bright light source behind them.';
  var PT_PLACE={'Office':'the office','Home':'their home','Home office':'their home office','Café':'the café','In transit':'a travel lounge'};
  var PT_TONE='Exposure: a touch bright, light and open but never washed out. Shadows fall to medium, never darker, and keep their detail. Highlights stay bright but never blow out, so skin, a white shirt and the wall keep their texture. No crushed blacks, clipped whites or silhouettes.';
  var PT_LOOK=LOOK;
  var PT_SKIN='Skin and detail: the face is in sharp focus, with soft, natural highlights on the forehead, cheekbones and nose, visible pores and fine hair, and no retouching or smoothing. Hair shows soft natural strands grouped into locks, waves or coils, never crosshatched or mesh-like.';

  var REAL_FACE=' Eyes show natural iris color and detail true to their heritage, with a soft catchlight. Brows show individual hairs, and fine under-eye folds stay visible. Pores vary across the face, with subtle pigment variation and, where their age suits it, faint age spots. Lips have natural texture, never heavy gloss. Fine lines follow real facial movement, and the neck keeps its texture.';
  var REAL_HAIR='Hair: individual flyaway strands, uneven natural density and a hairline that blends into the skin.';
  var REAL_BODY='Body: weight shifts to 1 side, and the shoulders angle with the body, not just the face. Arms stay relaxed and natural, with a little real movement.';
  var REAL_FAB='Fabric shows real folds, creases and texture where the body bends. Styling suits who they are.';
  SKIN=SKIN+REAL_FACE;PT_SKIN=PT_SKIN+REAL_FACE;
  var PT_POSE='Moment: caught mid-moment and candid, as if between 2 conversations. No hands on the chin, face, collar or hair, never a fashion or catalogue pose.';
  var PT_S='the same low warm early-morning or late-afternoon sun, softened through a sheer curtain, wrapping the face from 1 side, face brightest, soft-edged shadows with detail, {W}, shadows never past medium, '+LOOK_S+', sun never in frame';
  var PT_WALLS=['the wall behind them stays in plain, even shade','the background stays calm and evenly toned, with no light pattern','the wall behind them is a plain, soft mid-tone','a soft-edged diagonal shaft of the same sun falls across the wall behind them','the same sun falls through leaves outside the window and leaves soft, dappled shadows across the wall behind them','the same sun throws the soft, blurred shape of a window frame across the wall behind them','the same sun leaves faint, soft-edged stripes from half-open blinds across the wall behind them','the wall behind them takes an even, warm wash of the same sun that falls off gently into shade toward 1 corner','a soft pool of the same sun glows on the wall behind 1 shoulder and fades to warm shade on the other side','the same sun catches only the edge of a doorway or shelf behind them and leaves the rest of the wall in calm, warm shade'];
  var PT_SHOTS={'Close-up':'Shot on 85mm at f/2.8 from eye level, close on the face and shoulders, with the eyes in the upper third and slightly off center. The body turns a little from the camera and the face turns back toward it.','Medium shot':'Shot on 85mm at f/2.8 from eye level, seated and chest-up to waist-up, with the head in the upper third and slightly off center. The body turns a little from the camera and the face turns back toward it.','Two-shot':'Shot on 50mm at f/4 from eye level, the 2 partners side by side and close together, chest-up to waist-up, both faces sharp. Their bodies angle slightly toward each other and their faces turn back toward the lens.','Wide shot':'Shot on 50mm at f/4 from eye level, the whole seated figure small in a calm, minimal corner of the room, with plenty of quiet space around them. The body turns a little from the camera and the face turns back toward it.'};
  var PT_SHOT_S={'Close-up':'85mm, close on face and shoulders, eyes in the upper third','Medium shot':'85mm, chest-up, head in the upper third','Two-shot':'50mm at f/4, 2 partners side by side, chest-up, both faces sharp','Wide shot':'50mm, whole seated figure small in a calm minimal corner'};
  var PT_PAIR=['seated side by side, mid-laugh at something 1 of them just said','standing together, 1 mid-sentence, the other turning to listen','seated close, 1 leaning over to point something out, both glancing up at the lens','walking in together, caught mid-step and mid-conversation','seated across a corner, mid-discussion, 1 turning back toward the lens','1 seated and 1 just arriving beside them, mid-greeting'];
  var PT_POSES=['seated, caught mid-sentence as they turn from a colleague off camera toward the lens','seated, just looking up from their notes as someone calls their name','seated, mid-laugh at something said off camera, shoulders loose','seated, half turned in the chair as they set a cup back down','seated, leaning in mid-conversation with someone just out of frame','seated, pausing mid-thought after reading a message, a small smile starting','seated, just settling into the chair after a meeting, jacket still half off 1 shoulder','seated, mid-breath before answering a question from off camera','seated, glancing up from capping a pen','seated, turning back from the window as the conversation resumes'];
  var PT_RPOSES={'Marketing':['seated, mid-reaction to a campaign proof someone holds up off camera','seated, just setting a printed proof aside, glancing up mid-thought','seated, turning back mid-laugh after a quick creative debate'],'Sales':['seated, mid-nod as a client finishes speaking off camera','seated, just closing a leather folio and looking up','seated, caught in the easy exhale right after a call ends'],'Business development':['seated, mid-answer to a question from across the table','seated, just tucking a notebook into a bag and looking up','seated, leaning forward mid-conversation about the next opportunity'],'Consultants & analysts':['seated, just taking off reading glasses to answer a question','seated, mid-explanation, 1 hand open in a small natural gesture','seated, glancing up from a closed report as a colleague walks in']};
  var PT_BGS={'Office':['a plain office wall with the soft edge of a glass partition far behind them','a pale acoustic panel wall, a single meeting-room doorway softly out of focus at the edge','a plain painted wall beside a softly blurred column','a quiet corridor wall, the far end of the office falling into soft blur'],'Home':['a plain plaster wall at home, the soft edge of a linen curtain at 1 side','a pale wall beside a softly blurred bookcase edge','a plain wall at home, a single plant softly out of focus at the edge','a quiet hallway wall, a doorway softly blurred far behind'],'Home office':['a plain wall in their home office, the soft edge of a shelf at 1 side','a pale wall beside a softly blurred desk lamp','a plain wall under a sloped ceiling, softly lit','a quiet wall beside a softly blurred window frame out of the light'],'Café':['a plain café wall in warm plaster, the soft edge of a banquette at 1 side','a pale tiled wall, a single pendant lamp softly out of focus far behind','a plain wood-panelled wall in a quiet corner of the café','a quiet café wall, the counter softly blurred far behind'],'In transit':['a plain lounge wall, a softly blurred armchair edge at 1 side','a pale lounge wall, the far end softly out of focus','a quiet panelled wall, a departures board far behind and too blurred to read','a plain wall in a lounge corner, a softly blurred plant at the edge']};
  var PT_AT={'Office':'in a quiet corner of the office','Home':'in a quiet corner of their home','Home office':'in their home office','Café':'in a quiet corner of a café','In transit':'in a quiet travel lounge'};
  function portrait(o){
    return 'An editorial magazine portrait of '+o.ptsub+', '+(PT_AT[o.st]||PT_AT['Office'])+', '+o.ptpose+'.\n'+
      'Story: an editorial magazine portrait about the new professional way to present. They are confident and at ease, in a quiet pause with the work done and the next meeting ahead.\n'+
      CAST+' '+o.traits+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      (o.float?floatFor(o)+'\n':'')+
      'Moment: '+o.ptpose+'. Caught mid-moment and candid, never posed: no hands on the chin, face, collar or hair, no fashion or catalogue poses.\n'+PT_LIGHT.replace('{W}',cap(o.ptwall))+'\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. Classic and timeless, never trendy, logoed, formal-event or costume. '+REAL_FAB+'\n'+REAL_HAIR+'\n'+REAL_BODY+'\n'+
      ACCENT.replace('on clothing, an accessory or an object in the room','on clothing or an accessory')+'\n'+
      (o.props?'Prop: '+o.props.replace(/, out of use$/,'')+', held or resting naturally within reach. '+(/laptop|desktop|monitor|phone/.test(o.props)?'Any screen shows no readable text. No other devices or props.':'No laptop in frame, and no other props.')+'\n':'No laptop or phone in frame, and no props beyond what the moment names.\n')+
      PT_BG.split('{P}').join(PT_PLACE[o.st]||PT_PLACE['Office'])+' Here, '+o.ptbg+'.\n'+o.focus+'\n'+SKIN.replace('The raking light draws crisp highlights','The light draws clean highlights').replace('the room falls into medium shadow','the space around them falls into soft medium shadow')+'\n'+PT_TONE+'\n'+PT_LOOK+'\n'+NEVER;
  }
  function professional(o){
    if(o.portrait)return portrait(o);
    return 'A candid documentary photograph of '+o.subject+', '+o.action+', '+o.setting+'.\n'+
      STORY+'\n'+
      CAST+' '+o.traits+'\n'+
      'Frame: '+o.shot+'\n'+
      (o.copy?o.copy+'\n':'')+
      (o.float?floatFor(o)+'\n':'')+
      (o.float?'Camera: seated eye level, with a clear view across the table and nothing in the foreground.\n':'Camera: seated eye level, looking past a softly blurred foreground object such as a glass, a mug, a plant or a colleague\u2019s shoulder.\n')+
      PRESENCE+'\n'+
      (o.float?ACTION_L.replace(' or talking it through with a colleague',''):ACTION_L)+'\n'+
      'Gaze: '+o.gaze+'\n'+
      'Light: low, clear sun rakes in from the side and spotlights them in their element. '+TIME+' Their face turns toward it and is the brightest, warmest skin in the frame. It draws long, crisp shadows and picks out the texture of wood, fabric and skin. The sun falls on them and their table; the background stays in soft shadow unless the background line says otherwise. The light source sits out of frame, beside or behind the camera, never a bright window behind them. No sun patterns, window shapes or leaf shadows on the walls unless the background line names them.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. Classic and timeless, never trendy, logoed, formal-event or costume. '+REAL_FAB+'\n'+REAL_HAIR+'\n'+REAL_BODY+'\n'+
      ACCENT+'\n'+
      'Devices: a laptop can sit in frame as part of the work. It stays secondary to the person: standard silver, grey or black, plain lid, screen never readable.\n'+
      propLine(o)+'\n'+
      'Background: '+o.backdrop+'. No window or bright light source behind them. No alcohol.\n'+
      o.focus+'\n'+
      SKIN+'\n'+
      TONE+'\n'+
      LOOK+'\n'+
      'Finish: caught mid-moment, never posed.\n'+
      NEVER;
  }
  function product(o){
    return 'A documentary editorial photograph of our product in use: '+o.subject+' works on an open laptop '+o.setting+'. The lit laptop display is the hero.\n'+
      o.pcam+' '+PCAM_ALL+'\n'+
      'Frame: '+o.shot+'\n'+
      o.focus+'\n'+
      'The display is on and completely blank: a flat, even white rectangle inside its thin black bezel, with no interface, icons, text or images, ready for a screenshot in post.\n'+
      PRESENCE+'\n'+
      (o.copy?o.copy+'\n':'')+
      'Story: an editorial photograph about the new professional way to present, with the work coming together quickly and on brand.\n'+
      'Lit by '+o.light+'. '+TIME+' Long crisp shadows fall across the table, and the display adds a soft glow to their hands.\n'+
      TONE+'\n'+
      'Cast: a real professional, never a model, shown mostly through their hands, sleeves, hair and posture, with the age and build given above. Heritage shows only through their real features, never through cultural jewelry, dress, decor or props.\n'+
      'Wardrobe: '+o.wardrobe+', in quiet neutrals. '+REAL_FAB+'\n'+
      propLine(o)+'\n'+
      'Standard silver, grey or black laptop.\n'+
      LOOK+'\n'+
      ''+
      'Never include: writing, words, letters, numbers, logos or signage anywhere outside the screen.';
  }
  var GEOM_L=', all parallel and evenly spaced along 1 line that recedes to 1 vanishing point. Each face turns no more than 30 degrees from the camera, so even the farthest face reads as a slide and not a sliver. All 4 corners of every face stay in frame and visible, never overlapped by the next face. Use 7 faces at most.';
  var GEOM={'Floating single':'. The face turns no more than 30 degrees from the camera, and all 4 corners stay in frame and visible.','Floating multiple':GEOM_L,'Strip':GEOM_L,'Twisting':'. All 4 corners of every face stay in frame and visible, never overlapped by the next face. Use 7 faces at most.','Front stack':', all parallel and square to camera. Each back face is hidden only where the face in front covers it, and the hero face shows all 4 corners.','Grid':', all on 1 flat plane. Faces at the frame edge are cropped by the frame, never by each other.'};
  function presentation(o){
    return 'A clean editorial still life in '+o.ground+'.\nLayout: '+cap(o.layout)+'.\n'+
      'Story: the finished deck is the hero, polished, on brand and ready to present.\n'+
      DECK+'\n'+
      (o.copy?o.copy+'\n':'')+
      REACH+'\n'+
      SPACE+'\n'+FRAMING+'\n'+(o.thirds?o.thirds[0]+'\n':'')+SLIDEBODY+'\n'+
      (o.sampled?SPOT_C:SPOT)+'\n'+
      'Every slide face is plain white, lit only by the key and fill, ready for real slides to be placed in post.\n'+
      'Slide geometry: every face is a flat, rigid 16:9 rectangle of the same size with the same small rounded corners'+(GEOM[o.layoutKey]||GEOM['Floating multiple'])+'\n'+
      LOOK_P+'\n'+
      'No props, no hands. Crisp slide edges. Shot on 50mm at f/5.6.\n'+
      'Never include: writing, words, letters, numbers or logos anywhere in the frame.';
  }
  function brief(facet,o,shotName){
    var l=['Shoot brief · '+facet];
    if(facet==='Professional'&&o.portrait){l.push('Story: the professional behind the work. Calm, composed, confident.','Talent: '+o.ptsub+'. '+o.traits+' Real people, never models.','Shot: Portrait, '+(shotName||'Medium shot')+'. '+o.shot,o.float?((o.floatKind==='UI'?'Floating UI: ':'Floating slides: ')+floatS(o)):'','Story: 1 more frame from the same documentary, a quiet pause in their day','Moment: '+o.ptpose+', gaze to lens or just off camera','Light: our same low early-morning or late-afternoon sun, softened through a sheer or bounced off a pale wall, from 1 side, face brightest; soft-edged shadows with detail; '+o.ptwall+', never on the face. Sun never in frame.','Background: '+o.ptbg+'; minimal, in the place\u2019s own natural colors, a step darker than the face','Exposure: a step lower in contrast than hard sun, shadows a soft midtone, never past medium, nothing blown out','Look: '+LOOK_S+', saturation eased slightly','Wardrobe: '+o.wardrobe+', quiet neutrals, 1 small muted accent','Props: only what the moment names; no laptop or phone',o.copy,'Never include: writing, words, letters, numbers, logos or signage');return l.filter(Boolean).join('\n');}
    if(facet==='Presentation'){l.push('Layout: '+cap(o.layout),'Deck: endless and nimble, slides recede far into depth, never a static pile','Ground: '+o.ground,'Lens: 50mm at f/5.6','Distance: nearest slides close to camera, within arm\u2019s reach, almost touchable',(o.sampled?'Lighting: 1 soft key spotlight from a high corner on the slide faces, or a rim light from behind; 1 fill spotlight in the opposite corner at half intensity; both a lighter tone of the sampled color; subtle grain':'Lighting: 1 soft Azul key spotlight from a high corner on the slide faces, or a rim light from behind; 1 Rose fill spotlight in the opposite corner at half intensity; subtle grain'),'Space: big and open, floor or horizon optional','Look: '+LOOK_PS,'Slides: blank white faces, real slides placed in post',o.copy);return l.filter(Boolean).join('\n');}
    l.push('Story: the new professional way to present. Confident, prepared, at ease. Candid, never posed.','Talent: '+o.ptsub+'. '+o.traits+' Real people, never models: ordinary faces, age and build as stated, ability shown naturally. Heritage in real features only, never cultural jewelry, dress, decor or props.','Setting: '+o.setting,'Light: '+cap(LIGHT_S)+'. Early morning feels full of possibility; late afternoon feels relaxed and confident. Sun never in frame, no flare. Key on the face so the light spotlights them. Long crisp shadows, texture picked out, surroundings falling off into medium shadow.','Exposure: '+TONE_S,'Look: '+LOOK_S);
    if(facet==='Professional'){if(o.float)l.push((o.floatKind==='UI'?'Floating UI: ':'Floating slides: ')+floatS(o));l.push('Action: candid, mid-task, actively working on a laptop; never posed or idle; a phone may lie on the table but is never in a hand or being looked at','Props: '+propLine(o),'Shot: '+shotName+'. '+o.shot,'Focus: '+o.focusS,'Camera: seated eye level, soft foreground element','Presence: in the room, as close as a colleague would sit, never a distant long-lens view','Gaze: '+o.gaze,'Wardrobe: '+o.wardrobe+', quiet neutrals','Accent: 1 ambient hint, deep or muted: teal #004A66, navy #002533, wine #570E2E, dark wine #410A23, plum or a dusty version, no more than 10% of the frame, never stealing focus','Devices: laptop secondary, screen unreadable, standard silver, grey or black');}
    else{l.push('Camera: '+o.pcam.replace('Camera: ','')+' Keyboard and lit display always face camera.','Shot: '+shotName+'. '+o.shot,'Screen: switched on, completely blank solid white, no interface, icons or text, for a screenshot in post','Devices: silver, grey or black laptop, plain lid');}
    l.push(o.copy,'Skin: face in sharp focus, open facial shadows, no retouching or smoothing. Keep pores, fine hair, lines and crisp highlights; medium shadow stays in the room.','Hair: soft natural strands grouped into locks, waves or coils, smooth highlights, never crosshatched or mesh-like','Avoid: silhouettes, alcohol','Never include: writing, words, letters, numbers, logos or signage');
    return l.filter(Boolean).join('\n');
  }
  var GROUPS={
    'Medium shot':['Shot on 50mm at f/2.8, waist-up, a small working group: the professional and 2 colleagues around the same table or screen, all waist-up with their heads in the top third of the frame. The professional sits nearest the camera, and the light favors them.','50mm, waist-up, the professional and 2 colleagues working together, the professional nearest the camera'],
    'Two-shot':['Shot on 50mm at f/2.8 at seated table height, the professional and 2 or 3 colleagues gathered around the corner of a table, all waist-up with their heads in the top third of the frame, in the moment together, with the light favoring the professional.','50mm at table height, the professional and 2 or 3 colleagues gathered together, light favoring the professional'],
    'Wide shot':['Shot on 35mm at f/4 from across the table, near enough to join them: the professional and a small group of 3 or 4 colleagues working together around the table or a screen, with the light favoring the professional.','35mm from across the table, the professional and 3 or 4 colleagues working together, light favoring the professional']
  };
  var FOCUS_1='Focus: the professional is the only sharp subject in the frame. Keep the background simple, low in detail and low in contrast, with no faces, readable text or bright shapes that pull the eye away from them.';
  var FOCUS_2='Focus: the 2 people are the sharp subjects, with the professional the sharpest and brightest. Keep the background simple, low in detail and low in contrast, with no other faces, readable text or bright shapes that pull the eye away from them.';
  var FOCUS_2S='sharp focus on both people, the professional sharpest, simple low-detail low-contrast background';
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
  var FIG_MAX=5800;
  var FIG_SWAP=[[/^Cast: [^\n]*?(They have [^\n]*)?$/m,function(m,th){return 'Cast: a real professional, never a model, with an ordinary, characterful face and real features at the age and build given above. Heritage shows only through real features, never through cultural dress, jewelry, patterns or decor.'+(th?' '+th:'')}],[/^Skin and detail: [^\n]*$/m,'Skin and detail: the face is in sharp focus, with natural highlights, visible pores and fine hair, and no retouching or smoothing. Hair shows natural strands, never mesh-like.']];
  function firstN(l,n){var p=l.match(/[^.!?]+[.!?]+(\s|$)/g);return p&&p.length>n?p.slice(0,n).join('').trim():l}
  function fitFigma(t){if(t.length<=FIG_MAX)return t;FIG_SWAP.forEach(function(s){if(t.length>FIG_MAX)t=t.replace(s[0],s[1])});
    var keep=/^(Never|Floating|Copy space|Frame|Moment|Story)/;
    for(var n=4;n>=2&&t.length>FIG_MAX;n--){var ls=t.split('\n');ls=ls.map(function(l){return keep.test(l)?l:firstN(l,n)});t=ls.join('\n')}
    return t}
  function build(facet,sel,tool){if(tool==='Short')return fitFigma(build0(facet,sel,'GPT Image'));return build0(facet,sel,tool)}
  var PLACES={'Office':['in a glass-walled meeting room','at a standing desk by a tall window','in a quiet library-style booth in the office','at a long shared table in an open studio','in a small huddle room with a round table','on a low sofa in the office lounge','at a hot desk on an open office floor','at a wide desk in a corner office','at the kitchen bar in the office','at a small ledge in a quiet office focus room','in a project room with pinned-up boards','at a high table in a break-out area'],
    'Home':['at a kitchen island at home','on a sofa corner by a floor lamp','at a dining table at home','on a window seat with cushions','at a breakfast bar with high stools','in an armchair beside a bookcase','at a table in a sunroom','at a balcony table, the door open behind them','at a low coffee table in the living room','at the kitchen table after breakfast','in a reading nook at home','at a long farmhouse table'],
    'Home office':['at a desk in a converted spare room','at a desk nook under the stairs','at a loft desk under a skylight','at a wide desk in a garden studio','at a standing desk by a bookshelf at home','at a desk tucked into a bedroom alcove','at a wide home desk with the window to the side','in a basement office with a warm lamp','in an attic office with a sloped ceiling','at a built-in desk in a hallway niche','in a shared home office with 2 desks','at a corner desk beside a record shelf'],
    'Café':['at a counter seat in a café','in a corner banquette in a café','at a communal table in a busy café','at a small marble table in a café','on a long bench in a bakery café','at a café terrace table under an awning','on a quiet mezzanine in a café','in a deep armchair in a hotel café','on a stool at a coffee bar','at a table in a bookshop café','at a long table in a co-working café','at a small table in a neighborhood café'],
    'In transit':['at a train table seat','in an airport lounge armchair','in a quiet gate area at the airport','on a stool in a station café','on a hotel lobby sofa','in a ferry lounge seat','in a quiet carriage on a high-speed train','in an airport work pod','in a train station waiting room','in a coach seat with a fold-down tray','in the business corner of a hotel lobby','in the back seat of a car']};
  var BGS={'Office':['a glass partition in soft shade','a blank whiteboard in soft shadow','an empty desk in soft shade','rows of desks falling into soft shadow','a concrete column in soft shade','a pinned board in soft shadow','shelves of binders and plants in soft shadow','a corridor of meeting rooms in medium shade','a textured acoustic wall in soft, even shadow','sunlight on a far wall, cast through blinds from a window out of frame'],
    'Home':['bookshelves falling into soft shadow','a kitchen with open shelves, out of focus','a plant-filled corner in soft shadow','a hallway doorway in medium shade','framed prints on a dim wall','a sofa and throw blanket softly out of focus','a wood-panelled wall in warm, dim shade','a linen curtain in soft shade','a textured plaster wall in soft, even shadow','sunlight on a far wall, cast through leaves from a window out of frame'],
    'Home office':['a plain pegboard in soft shadow','bookshelves and a record player in soft shadow','a sloped ceiling falling into shade','a corkboard in soft shadow','a plant-filled shelf in soft shadow','a closed door and coat hook in dim shade','a shelf of box files and a lamp, softly lit','a painted brick wall in soft, even shadow','an armchair in soft shadow','sunlight on a far wall, cast through blinds from a window out of frame'],
    'Café':['a coffee counter in soft shade','shelves of cups and jars in soft shade','empty tables in soft shade','a tiled wall in soft, even shadow','a dim bar in soft shade','a wall of plants in soft shadow','a quiet counter corner in soft shadow','stacked chairs and a doorway in medium shade','a wood-panelled wall in warm, dim shade','a plain shelf in warm, dim shade'],
    'In transit':['empty seats ahead falling into soft shadow','empty seats across the aisle in shade','a departure lounge in medium shade','luggage racks and a carriage door in dim shade','a row of lounge chairs softly out of focus','a hotel lobby in low, dim light','a concourse of columns in soft shade','a coat and bag on the seat opposite, out of focus','a textured lounge wall in soft, even shadow','sunlight sweeping across the seats from a window out of frame']};
  var SPROPS={'Office':['a paper cup of coffee','a closed notebook with a pen','a glass of water','a lanyard with a blank badge','a closed laptop sleeve','a small stack of blank sticky notes','a plain ceramic mug'],'Home':['a mug of tea','a small vase of flowers','reading glasses resting on a closed book','a glass of water','a bowl of fruit','a folded throw blanket','a small potted plant'],'Home office':['a desk lamp','a cup of pens','a small potted plant','a pair of headphones','a closed sketchbook','a mug of coffee','2 closed books, stacked'],'Café':['a flat white in a ceramic cup','a pastry on a small plate','a glass of sparkling water','an espresso on a saucer','a small pot of tea','a glass of iced coffee','a lidded paper cup'],'In transit':['a lidded paper cup of coffee','a boarding pass face down','a carry-on bag at their feet','a folded jacket on the seat beside them','a bottle of water','a passport with a blank cover','wireless earbuds in their case','a phone lying on the table, out of use']};
  function stOf(sel,facet){return PLACES[sel.setting]?sel.setting:'Office'}
  function fit(k,l){var w=keep(k,function(){return pick(l,1)[0]});if(l.indexOf(w)<0){w=pick(l,1)[0];if(R)R[k]=w}return w}
  var PFEAT=['the AI prompt panel open beside a fresh slide','a smart slide layout adjusting as content is added','a locked brand theme applied across a deck','presenter view with the next slide ready','a grid of slide thumbnails being reordered','a chart slide updating as data is added','a team workspace of shared decks'];
  var RPLACES={'Marketing':{'Office':['in a studio room with campaign imagery pinned to the boards','at a table with the creative team, mood boards behind them','in a glass-walled room reviewing a campaign with designers'],'Home':['at a kitchen table, campaign proofs pinned to the fridge behind','on a sofa the evening before a campaign launch','at a dining table with a mood board propped against the wall'],'Home office':['at a desk under a wall of pinned campaign imagery','at a wide desk below a shelf of swatches','at a standing desk beside a mood board'],'Café':['at a café table with the creative lead','at a long café table after a creative review','at a café counter after a shoot'],'In transit':['at a train table seat on the way to a launch','in an airport lounge on the way to a campaign shoot','in a hotel lobby before a launch event']},'Sales':{'Office':['in a client meeting room with a long polished table','in a client reception, waiting to present','in a glass-walled room walking a client through the deck'],'Home':['at a kitchen table before an early client call','at a dining table prepping for a client pitch','on a sofa corner reviewing the pitch the night before'],'Home office':['at a desk set up for a client video call','at a standing desk rehearsing a pitch','at a wide desk the morning of a client pitch'],'Café':['at a café table across from a client','at a corner table before a client meeting','at a hotel café table, meeting a client'],'In transit':['in an airport lounge armchair, flying to a client','at a train table seat on the way to a client','in a hotel lobby before a client pitch']},'Business development':{'Office':['in a partner meeting room with a whiteboard of boxes and arrows','at a long table with a prospective partner','in a huddle room mapping a new market'],'Home':['at a kitchen table preparing a partnership pitch','at a dining table below a framed map','in an armchair reading a partner proposal'],'Home office':['at a desk with printed market maps pinned up','at a standing desk before a partner call','at a desk with a globe on the shelf behind'],'Café':['at a café table meeting a potential partner','at a co-working café table between meetings','at a café counter before a partner intro'],'In transit':['at a train table seat between partner visits','in an airport lounge before a partner meeting abroad','in a conference venue lounge between sessions']},'Consultants & analysts':{'Office':['in a project war room with charts pinned to the walls','at a project room table on a client site','in a meeting room presenting findings to leadership'],'Home':['at a dining table the night before a client readout','at a kitchen island before a client workshop','in an armchair reviewing an analysis'],'Home office':['at a desk with 2 monitors of data, screens unreadable','at a wide desk below a wall of pinned charts','at a desk with shelves of binders behind'],'Café':['at a quiet café table before a client readout','at a corner table working through an analysis','at a hotel café between client workshops'],'In transit':['at a train table seat on the way to a client site','in an airport lounge between client engagements','in a hotel business corner the night before a readout']}};
  var RBGS={'Marketing':{'Office':['a pinned board of campaign proofs in soft shadow','a plain studio wall in soft shade'],'Home':['printed proofs on a dim wall, out of focus','swatches on a shelf in soft shadow'],'Home office':['a pinned board in soft shadow','fabric swatches on a shelf in soft shadow'],'Café':['a quiet corner of the café in soft shade','a plain wood wall in warm, dim shade'],'In transit':['a stack of event boxes in soft shadow','a quiet lounge wall in soft shade']},'Sales':{'Office':['the far end of an empty table in soft shade','a reception wall in soft shade'],'Home':['a jacket and bag by the door, out of focus','a hallway in dim shade'],'Home office':['a headset on a shelf in soft shadow','a jacket on the back of a door in dim shade'],'Café':['an empty chair across the table in soft shade','a plain café wall in soft shade'],'In transit':['a carry-on beside the seat, out of focus','a quiet gate area in soft shade']},'Business development':{'Office':['a blank whiteboard in soft shadow','an empty meeting room in soft shade'],'Home':['a framed map on a dim wall, out of focus','a stack of reports on a shelf in soft shadow'],'Home office':['a pinned map in soft shadow','a bookshelf in soft shadow'],'Café':['an empty chair across the table in soft shade','a quiet co-working corner in shade'],'In transit':['a quiet lounge in soft shade','a bag on the seat opposite, out of focus']},'Consultants & analysts':{'Office':['a pinned wall in soft shadow, nothing readable','an empty far table in soft shade'],'Home':['binders on a shelf in soft shadow','a side table in soft shade'],'Home office':['a pinned board in soft shadow','stacks of binders in soft shadow'],'Café':['a plain café wall in soft shade','empty tables in soft shade'],'In transit':['a suit bag hung by the seat, out of focus','a quiet lounge wall in soft shade']}};
  function fitR(k,sp,gen){sp=sp||[];var all=sp.concat(gen),w=keep(k,function(){return sp.length&&Math.random()<0.6?pick(sp,1)[0]:pick(gen,1)[0]});if(all.indexOf(w)<0){w=sp.length&&Math.random()<0.6?pick(sp,1)[0]:pick(gen,1)[0];if(R)R[k]=w}return w}
  function rs(m,sel,facet){return (m[sel.role]||{})[stOf(sel,facet)]}
  var PROP_AT={'Close-up':'soft at the edge of the frame','Medium shot':'beside the laptop','Wide shot':'small in the scene','Two-shot':'on the table between them','Over the shoulder':'at the edge of the table','Point of view':'at the edge of the table, within reach','Lifestyle':'beside the laptop'};
  function propLine(o){return o.props?'1 prop only: '+o.props+(o.held||/beside|at their feet|on the seat/.test(o.props)?'':', '+(PROP_AT[o.shotName]||'nearby'))+'. Nothing else on the table but the laptop.':'No props: only the laptop on the table.'}
  var DRINKS={'Office':['a paper cup of coffee','a plain ceramic mug of coffee','a glass of water','a reusable water bottle','a mug of tea','a can of sparkling water','a lidded paper cup of tea','a tall glass of water with ice','a matte steel travel mug','a small bottle of sparkling water','a glass of iced coffee','a cup of green tea','a paper cup of hot chocolate','a plain glass bottle of juice','a short glass of water','a cup of black coffee on a saucer'],'Home':['a mug of tea','a glass of water','a mug of coffee','a glass of orange juice','a cup of coffee on a saucer','a tall glass of iced tea','a handmade stoneware mug of coffee','a glass of sparkling water with lemon','a cup of herbal tea','a small glass of fresh juice','a large mug of milky coffee','a glass of water with a sprig of mint','a bowl-shaped cup of café au lait','a glass of iced coffee','a cup of matcha','a glass carafe of water and 1 glass'],'Home office':['a mug of coffee','a glass of water','a mug of tea','a reusable water bottle','a small glass of sparkling water','a stoneware mug of tea','a tall glass of iced coffee','a matte steel travel mug','a cup of herbal tea','a glass of water with lemon','a cup of espresso','a large mug of milky coffee','a glass bottle of water','a cup of green tea','a glass of iced tea'],'Café':['a flat white in a ceramic cup','an espresso on a saucer','a glass of iced coffee','a small pot of tea','a cappuccino in a wide cup','a glass of water with a slice of lemon','a latte in a tall glass','a cortado in a small glass','a lidded paper cup of coffee','a glass of fresh orange juice','a cup of chai','a macchiato on a saucer','a pour-over coffee in a glass server','a matcha latte in a ceramic cup','a glass of sparkling water','a hot chocolate in a wide cup'],'In transit':['a lidded paper cup of coffee','a bottle of water','a lidded paper cup of tea','a small bottle of juice','a reusable water bottle','a matte steel travel mug','a can of sparkling water','a small paper cup of espresso','a plastic cup of water','a lidded cup of iced coffee','a small bottle of sparkling water','a paper cup of hot chocolate']};
  var AMBIENT={'Office':['a lanyard with a blank badge','a closed laptop sleeve','a small potted plant','a closed notebook with a pen','a phone lying on the table, out of use','a pair of folded reading glasses','a stack of 2 or 3 plain folders','a set of keys','a slim desk lamp','a small stack of blank sticky notes','a plain leather folio, closed','a single pen lying on a blank notepad','a cup of pens','a pair of headphones','a printed report face down','a small succulent in a concrete pot','a wireless mouse','a desk calendar with blank pages','a coat folded over the chair beside them','a backpack resting against the chair','a laptop, open, its screen turned away from camera','a laptop, closed','a desktop monitor, its screen turned away or dark','a phone in 1 hand, its screen turned away from camera','a phone lying face down on the table'],'Home':['a small vase of flowers','a bowl of fruit','a folded throw blanket','a small potted plant','a stack of 2 hardback books with plain spines','a phone lying on the table, out of use','a candle in a plain glass','a closed notebook with a pen','a cat asleep on a nearby cushion','a dog resting at their feet','a linen cushion beside them','a ceramic bowl of keys','a pair of folded reading glasses','a small stack of magazines, covers too soft to read','a trailing plant on a shelf','a wooden tray with a teapot','a pair of slippers at their feet','a woven basket beside the chair','a single apple on a plate','an open book face down','a laptop, open, its screen turned away from camera','a laptop, closed','a desktop monitor, its screen turned away or dark','a phone in 1 hand, its screen turned away from camera','a phone lying face down on the table'],'Home office':['a desk lamp','a cup of pens','a pair of headphones','a small potted plant','a closed notebook with a pen','a phone lying on the desk, out of use','a small stack of plain books','a wireless mouse beside the laptop','a pair of folded reading glasses','a closed sketchbook','a small stack of blank sticky notes','a desk plant in a ceramic pot','a pinboard behind them with blank cards','a small speaker','a wooden pencil tray','a cat asleep on the desk corner','a folded cardigan on the chair back','a letter tray with blank paper','a small analog clock, its face soft','a camera lens cap and a small camera','a laptop, open, its screen turned away from camera','a laptop, closed','a desktop monitor, its screen turned away or dark','a phone in 1 hand, its screen turned away from camera','a phone lying face down on the table'],'Café':['a pastry on a small plate','a phone lying on the table, out of use','a half-eaten croissant on a plate','a small dish of biscotti','a closed notebook with a pen','a folded newspaper, its print too soft to read','a small bud vase with 1 flower','a set of keys','a slice of cake on a plate','a small sugar bowl','a pair of sunglasses folded on the table','a tote bag on the chair beside them','a cinnamon bun on a small plate','a paper napkin under a spoon','a small jug of milk','a scarf folded on the seat beside them','a pair of folded reading glasses','a small plate of almonds','a cookie on a napkin','a jacket over the chair back','a laptop, open, its screen turned away from camera','a laptop, closed','a desktop monitor, its screen turned away or dark','a phone in 1 hand, its screen turned away from camera','a phone lying face down on the table'],'In transit':['a folded jacket on the seat beside them','a carry-on bag at their feet','wireless earbuds in their case','a passport with a blank cover','a phone lying on the table, out of use','a neck pillow on the seat beside them','a closed notebook with a pen','a pair of sunglasses folded on the table','a boarding pass face down','a backpack on the seat beside them','a rolling suitcase beside them','a pair of over-ear headphones around their neck','a small paper bag of snacks','a scarf folded over the armrest','a pair of folded reading glasses','a small zip pouch','a paperback face down on the table','a tote bag at their feet','a garment bag over the seat beside them','a set of keys beside a phone','a laptop, open, its screen turned away from camera','a laptop, closed','a desktop monitor, its screen turned away or dark','a phone in 1 hand, its screen turned away from camera','a phone lying face down on the table']};
  /* Pro actions: [text, prop kind, only in setting]. The prop follows the action. */
  var PACTS=[['typing, building their next slide','drink'],['reading back through their deck, mouthing a line to themselves','drink'],['reaching for their drink while reviewing a slide','held'],['on a video call with earbuds in, talking through their slides','earbuds'],['explaining a slide to a colleague, 1 hand mid-gesture','drink'],['rehearsing out loud, 1 hand mid-gesture','none'],['scrolling back through their slides on the laptop','drink'],['putting on reading glasses to check a detail','glasses'],['pushing back from the desk mid-stretch, the deck just finished','ambient'],['making a last edit before heading to the meeting','drink','In transit']];
  var RACTS={'Marketing':[['comparing 2 campaign visuals on their slide','drink'],['dropping a fresh product shot into their deck','drink'],['sketching a quick layout idea on a notepad beside the laptop','ambient'],['checking the launch timeline slide one last time','held']],'Sales':[['tightening the pricing slide before a client call','drink'],['rehearsing the opening of their pitch under their breath','none'],['checking a client\u2019s numbers in a spreadsheet beside the deck on the laptop','drink'],['walking a client through the deck, 1 hand open toward the screen','drink']],'Business development':[['building a partner proposal from an outline','drink'],['matching a partner\u2019s logo slide to the deck','drink'],['jotting a follow-up in a notebook after a call','ambient'],['scrolling through the deal summary slide, mid-sip','held']],'Consultants & analysts':[['turning a spreadsheet into a clean chart slide','drink'],['checking a figure in a printed report against the slide','glasses'],['tidying the executive summary before the readout','drink'],['talking a client through the findings, 1 hand mid-gesture','drink']]};
  var HELD={held:1,glasses:1};
  function propsFor(kind,st){
    if(kind==='none')return [''];
    if(kind==='held')return DRINKS[st].map(function(d){return d+' in 1 hand'});
    if(kind==='glasses')return ['reading glasses in 1 hand'];
    if(kind==='earbuds')return ['the open earbud case beside the laptop'];
    if(kind==='ambient')return AMBIENT[st];
    return DRINKS[st].concat(['']);
  }
  var PHANDS=['their hands on the keyboard','1 hand on the trackpad, the other resting casually on the table','1 hand raised mid-gesture as they talk it through','both hands resting loosely on the table edge','1 hand pointing to a spot on the screen','1 hand on the keyboard, the other mid-gesture'];
  var LV=[],LVK={},R=null;
  function keep(k,fn){if(!R)return fn();if(!(k in R))R[k]=fn();return R[k]}
  function build0(facet,sel,tool){
    LV=[];LVK={};
    if(R&&R._role!==sel.role){delete R.place;delete R.backdrop;R._role=sel.role}
    var o={
      subject: facet==='Product'?subjectOf(sel):(sel.race||sel.age||sel.build)?subjectOf(sel):(ROLES[sel.role]||ROLES['Marketing']),
      action: (function(){if(!R||facet!=='Professional')return ACTION_G;var st=stOf(sel,facet),l=PACTS.concat(RACTS[sel.role]||[]).filter(function(a){if(sel.prop==='No prop'&&(a[1]==='held'||a[1]==='glasses'||a[1]==='earbuds'))return false;return (!a[2]||a[2]===st)&&!(sel.float&&sel.float!=='No'&&sel.shot!=='Two-shot'&&/colleague/.test(a[0]))});var a=keep('act',function(){return pick(l,1)[0]});if(l.indexOf(a)<0){a=pick(l,1)[0];R.act=a}return a[0]})(),
      traits: (function(){var t=keep('traits',function(){return pick(TRAITS,2)});if(sel.age==='20s'&&t.some(function(x){return x[1]==='old'})){t=pick(TRAITS.filter(function(x){return x[1]!=='old'}),2);if(R)R.traits=t}LV.push(t[0][0],t[1][0]);return 'They have '+t[0][0]+' and '+t[1][0]+'.'})(),
      props: (function(){if(sel.prop==='No prop')return '';var st=stOf(sel,facet),kind;if(facet==='Professional'&&R&&R.act)kind=R.act[1];else{kind=(R&&R.pkind)||(Math.random()<0.5?'drink':'ambient');if(R)R.pkind=kind}var l=propsFor(kind,st),w=keep('props',function(){return pick(l,1)[0]});if(l.indexOf(w)<0){w=pick(l,1)[0];if(R)R.props=w}if(w)LV.push(w);return w})(),
      hands: fit('hands',PHANDS),
      ptpose: (function(){var v=fit('ptpose',sel.shot==='Two-shot'?PT_PAIR:PT_POSES.concat(PT_RPOSES[sel.role]||[]));if(sel.style==='Portrait')LV.push(v);return v})(),
      ptwall: (function(){var v=fit('ptwall',PT_WALLS);if(sel.style==='Portrait')LV.push(v);return v})(),
      ptbg: (function(){var v=fit('ptbg',PT_BGS[stOf(sel,facet)]);if(sel.style==='Portrait')LV.push(v);return v})(),
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
      st: stOf(sel,facet),
      layoutKey: LAYOUTS[sel.layout]?sel.layout:'Floating multiple',
      thirds: thirdsOf(sel),
      float: facet==='Professional'&&!!sel.float&&sel.float!=='No',
      floatKind: sel.float,
      portrait: facet==='Professional'&&sel.style==='Portrait',
      sampled: sel.ground==='Sampled'
    };
    if(o.portrait)o.shot=PT_SHOTS[o.shotName]||PT_SHOTS['Medium shot'];
    o.ptsub=o.subject+(o.portrait&&o.shotName==='Two-shot'?' and their business partner, a colleague of a different age, heritage and build':'');
    o.shot=o.shot.replace('{H}',o.hands);
    if(o.float&&!o.portrait&&zoneOf(o.shotName)==='around'){o.shot=o.shot.replace(' and little headroom above',', with open room above and around them').replace('A laptop or screen can be in frame or only implied','Their laptop is in frame');if(R){var gp=PLACES[stOf(sel,facet)];if(gp.indexOf(R.place)<0){R.place=pick(gp,1)[0]}o.setting=R.place}o.backdrop='the room receding behind them in soft shade, its walls, shelves and desks still readable';o.gaze='on the task in front of them, never at the lens.';}
    o.group=0;if(facet==='Professional'&&GROUPS[o.shotName]&&R&&!o.float&&!o.portrait){o.group=keep('grp',function(){return Math.random()<0.45?1:0})}
    if(o.group){o.shot=GROUPS[o.shotName][0];}
    o.focus=facet==='Product'?FOCUS_P:(o.group?FOCUS_G:o.shotName==='Two-shot'?FOCUS_2:FOCUS_1);o.focusS=facet==='Product'?FOCUS_PS:(o.group?FOCUS_GS:o.shotName==='Two-shot'?FOCUS_2S:FOCUS_1S);
    ['subject','feature','backdrop','setting','accent','accentItem','copy','wardrobe','shot','pcam','layout','ground'].forEach(function(k){if(o[k])LV.push(o[k])});
    (function(){var m={traits:R&&R.traits?R.traits.map(function(x){return x[0]}):[],props:[o.props],ptpose:[o.ptpose],ptwall:[o.ptwall],ptbg:[o.ptbg],backdrop:[o.backdrop],place:[o.setting],wardrobe:[o.wardrobe],feature:[o.feature],act:[o.action]};Object.keys(m).forEach(function(k){m[k].forEach(function(v){if(v)LVK[String(v).trim().replace(/[.;,]+$/,'')]=k})});if(facet==='Professional'&&R&&o.action&&o.action!==ACTION_G&&!o.portrait)LV.push(o.action);['shot','pcam','layout','ground','accent','subject'].forEach(function(k){if(o[k])LVK[String(o[k]).trim().replace(/[.;,]+$/,'')]=LVK[String(o[k]).trim().replace(/[.;,]+$/,'')]||('S:'+k)})})();
    var soft=facet!=='Presentation'&&(sel.light==='Soft'||(sel.light!=='Sun'&&keep('softL',function(){return Math.random()<1/3})));
    var SOFT='Light: soft, indirect daylight from a large window out of frame to 1 side, on an overcast day or bounced off a pale wall, with no direct sun. Their face turns toward it and is the brightest skin in the frame. Shadows are soft and open with gentle falloff, and the light still shows the texture of fabric and skin. No sun patches, window shapes or leaf shadows anywhere, and never a bright window behind them.';
    var outT=tool==='Shoot brief'?brief(facet,o,o.shotName):facet==='Professional'?professional(o):facet==='Product'?product(o):presentation(o);
    if(soft)outT=outT.replace(/Light: low, clear sun[^\n]*/,SOFT).replace(/Light: our same low[^\n]*?Sun never in frame\./,'Light: soft indirect daylight from 1 side, overcast or bounced, no direct sun; soft open shadows; plain background, no sun patches.').replace('Long crisp shadows fall across the table','Soft, open shadows fall across the table').replace(/Here, the same sun[^.]*\./,'');
    return outT;
  }


  /* Variant expansion: each list is grown about 10x by combining hand-written parts. Every part follows the same rules as the originals (nothing readable, no phones in hand, soft shade). */
  (function(){
    function cross(a,b,f,n){var o=[];a.forEach(function(x){b.forEach(function(y){o.push(f(x,y))})});return n?o.slice(0,n):o}
    function add(arr,more,n){more.forEach(function(v){if(arr.indexOf(v)<0)arr.push(v)});}
    function shuffleSeed(a){for(var i=a.length-1;i>0;i--){var j=(i*7919+13)%(i+1),t=a[i];a[i]=a[j];a[j]=t}return a}
    var SH=['in soft shade','in soft, even shadow','in warm, dim shade','falling into soft shadow','in medium shade','softly out of focus','in cool, quiet shade','in low, diffuse light','under a soft wash of window light','in gentle half-shadow'];
    var BGP={'Office':['a glass partition','a blank whiteboard','a row of empty desks','a concrete column','a pinned board, nothing readable','a shelf of binders and plants','a meeting-room door','a textured acoustic wall','a tall potted fig','a coat stand by the door','a long bench seat','a frosted glass wall'],
      'Home':['a bookcase','an open-shelved kitchen','a corner of trailing plants','a hallway doorway','a dim wall of framed prints, nothing readable','a sofa with a throw blanket','a wood-panelled wall','a linen curtain','a textured plaster wall','a sideboard with a lamp','a staircase','a fireplace mantel'],
      'Home office':['a plain pegboard','a shelf with a record player','a sloped ceiling','a corkboard, nothing readable','a plant-filled shelf','a closed door with a coat hook','a shelf of plain box files','a painted brick wall','an empty armchair','a rolled-up yoga mat in the corner','a tall floor lamp','a filing cabinet'],
      'Café':['a coffee counter','shelves of cups and jars','a row of empty tables','a tiled wall','a quiet bar','a wall of plants','a pastry case','stacked chairs by a doorway','a wood-panelled wall','an espresso machine','a chalkboard wall, wiped clean','a long banquette'],
      'In transit':['empty seats ahead','seats across the aisle','a departure lounge','luggage racks','a row of lounge chairs','a hotel lobby','a concourse of columns','a coat on the seat opposite','a lounge wall','a carriage window, the view blurred','a gate seating area','a quiet check-in desk']};
    Object.keys(BGP).forEach(function(k){add(BGS[k],shuffleSeed(cross(BGP[k],SH,function(a,b){return a+' '+b})))});
    var PLP={'Office':['in a glass-walled meeting room','at a standing desk','in a library-style booth','at a long shared table','in a small huddle room','on a low sofa in the lounge','at a hot desk','at a wide corner desk','at the office kitchen bar','at a ledge in a focus room','in a project room','at a high break-out table'],
      'Home':['at a kitchen island','on a sofa corner','at a dining table','on a window seat','at a breakfast bar','in an armchair','at a sunroom table','at a balcony table','at a low coffee table','at the kitchen table','in a reading nook','at a long farmhouse table'],
      'Home office':['at a desk in a spare room','at a nook under the stairs','at a loft desk','in a garden studio','at a standing desk','at a bedroom alcove desk','at a wide home desk','in a basement office','in an attic office','at a hallway niche desk','in a shared home office','at a corner desk'],
      'Café':['at a café counter seat','in a corner banquette','at a communal table','at a small marble table','on a bakery bench','at a terrace table','on a café mezzanine','in a hotel café armchair','on a coffee bar stool','in a bookshop café','in a co-working café','at a neighborhood café table'],
      'In transit':['at a train table seat','in an airport lounge armchair','at a quiet gate','in a station café','on a hotel lobby sofa','in a ferry lounge','in a quiet train carriage','in an airport work pod','in a station waiting room','at a coach seat tray','in a hotel business corner','in the back seat of a car']};
    var PLM=['by a tall window','in the quiet of early morning','late in the afternoon','with the room nearly empty','beside a big potted plant','near a low shelf','with the light coming from the side','just after a meeting','as the room fills up','on a bright, clear day'];
    Object.keys(PLP).forEach(function(k){add(PLACES[k],shuffleSeed(cross(PLP[k],PLM,function(a,b){return a+' '+b})))});
    var POS=['seated, turned a little from the camera','seated, leaning in slightly','seated back in the chair, at ease','standing, 1 shoulder against the wall','perched on the edge of a desk','seated sideways on the chair','standing with weight on 1 leg','seated with 1 ankle on the other knee','leaning on a table edge','standing by a window frame'];
    var HND=['mid-gesture as they explain something','reaching for a cup','setting down a pen','capping a pen','taking off their glasses to answer','closing a notebook','turning a page','pushing back from the table','sliding a phone into a pocket','picking up a bag to leave'];
    add(PT_POSES,shuffleSeed(cross(POS,HND,function(a,b){return a+', '+b})));
    var PRA=['seated side by side','standing shoulder to shoulder','seated close together','standing, 1 a half step behind the other','seated across a corner of the table','leaning together on a table edge','1 seated, 1 standing beside them','standing back to back, heads turned in','seated on a low bench together','standing in a doorway together'];
    var PRB=['both at ease','1 mid-laugh','sharing a quiet look','both looking to the lens','1 glancing at the other','1 leaning an elbow on the other\u2019s chair','arms loosely folded','1 hand resting on a shoulder','both turned a little in','smiling at something just out of frame'];
    add(PT_PAIR,shuffleSeed(cross(PRA,PRB,function(a,b){return a+', '+b})));
    var WL=['a soft-edged shaft of sun','dappled leaf shadows','the soft stripes of a blind','a pale square of window light','a long diagonal of low sun','soft lattice shadows from a window','a warm pool of light','a sheer curtain\u2019s soft shadow','a narrow sliver of sun','a gentle gradient of window light'];
    var WS=['falls across the wall behind them','rests on the wall beside them','moves across the wall behind them','lands low on the wall behind them','reaches the corner behind them','lies across the wall at shoulder height','sits high on the wall behind them','spills across the wall and floor behind them','grazes the wall behind them','frames them on the wall behind'];
    var PW=['the wall behind them stays in plain, even shade','the background stays in calm, even shade with no light pattern','the wall behind them is evenly lit and plain','the background falls off softly into shade, with no patches of sun','the space behind them stays quiet and evenly toned','the wall behind them is a plain, soft mid-tone','the background stays plain and slightly darker than they are','the room behind them is softly lit and even, with no shadows cast on the walls'],PWB=['','with no window light on it','free of any light pattern','so they stand out from it','in a muted tone','with only a gentle falloff toward the edges'];var plain=cross(PW,PWB,function(a,b){return b?a+', '+b:a});add(PT_WALLS,shuffleSeed(plain.concat(plain,shuffleSeed(cross(WL,WS,function(a,b){return 'the same sun makes '+a+' that '+b})).slice(0,4))));
    Object.keys(BGP).forEach(function(k){if(PT_BGS[k])add(PT_BGS[k],shuffleSeed(cross(BGP[k],['far behind them, out of focus','softly blurred at the edge of the frame','in soft shade behind them','just visible behind 1 shoulder','in creamy bokeh behind them','dim and quiet behind them','plain and soft behind them','in even shade, well behind them','barely visible, far back','in the soft distance'],function(a,b){return a+' '+b})))});
    var H1=['1 hand on the keyboard','both hands on the keyboard','1 hand on the trackpad','1 hand raised mid-gesture','1 hand pointing at the screen','1 hand reaching for a notebook','1 hand around a mug','1 hand flat on the table','1 hand holding a pen','1 hand adjusting the screen'];
    var H2=['the other resting on the table','the other in their lap','the other mid-gesture','the other on the trackpad','the other holding a pen','the other resting on the chair arm','the other at their temple','the other around a mug','the other on the table edge','the other loosely open'];
    add(PHANDS,shuffleSeed(cross(H1,H2,function(a,b){return a+', '+b}).filter(function(v){var p=v.split(', ');return p[1].replace('the other','1 hand')!==p[0]})));
    var TK=[['typing, building their next slide','drink'],['reading back through their deck','drink'],['reviewing a slide','held'],['on a video call with earbuds in','earbuds'],['explaining a slide to a colleague','drink'],['rehearsing out loud','none'],['scrolling through their slides','drink'],['checking a detail up close','glasses'],['looking over the finished deck','ambient'],['making a last edit','drink'],['dragging a chart into place','drink'],['picking a new layout for a slide','drink'],['trimming the words on a slide','ambient'],['reordering slides in the deck','drink'],['adding a photo to a slide','drink'],['writing speaker notes','ambient'],['sharing the deck with their team','drink'],['comparing 2 versions of a slide','held'],['timing a run-through','none'],['tidying a title slide','drink']];
    var TM=['with a small smile','deep in focus','mid-sip, eyes still on the slide','leaning in close','sitting back, relaxed','nodding to themselves','with a quick laugh','brow lightly furrowed','pleased with the result','in a quiet moment of flow'];
    add(PACTS,shuffleSeed(cross(TK,TM,function(a,b){return [a[0]+', '+b,a[1]]})));
    var DV={'Office':[['a paper cup of','coffee'],['a ceramic mug of','coffee'],['a glass of','water'],['a mug of','tea'],['a reusable bottle of','water'],['a can of','sparkling water'],['a tall glass of','iced tea'],['a paper cup of','tea'],['a glass of','orange juice'],['a small cup of','espresso']],
      'Home':[['a mug of','tea'],['a glass of','water'],['a mug of','coffee'],['a glass of','orange juice'],['a cup and saucer of','coffee'],['a tall glass of','iced tea'],['a small glass of','milk'],['a teapot and cup of','green tea'],['a bowl-shaped cup of','café au lait'],['a glass of','lemonade']],
      'Home office':[['a mug of','coffee'],['a glass of','water'],['a mug of','tea'],['a reusable bottle of','water'],['a small glass of','sparkling water'],['a thermos cup of','coffee'],['a mug of','hot chocolate'],['a tall glass of','iced coffee'],['a cup of','herbal tea'],['a glass of','juice']],
      'Café':[['a ceramic cup of','flat white'],['a saucer and cup of','espresso'],['a tall glass of','iced coffee'],['a small pot of','tea'],['a wide cup of','cappuccino'],['a glass of','water with lemon'],['a glass cup of','cortado'],['a mug of','chai'],['a glass of','sparkling water'],['a small cup of','macchiato']],
      'In transit':[['a lidded paper cup of','coffee'],['a bottle of','water'],['a lidded paper cup of','tea'],['a small bottle of','juice'],['a paper cup of','hot chocolate'],['a can of','sparkling water'],['a plastic cup of','water'],['a lidded cup of','iced coffee'],['a small bottle of','sparkling water'],['a paper cup of','green tea']]};
    var DQ=['','in a plain white vessel','in a matte grey vessel','half finished','steaming gently','with a napkin beside it','on a small coaster','within easy reach','pushed slightly aside','set near the laptop'];
    Object.keys(DV).forEach(function(k){add(DRINKS[k],cross(DV[k],DQ,function(a,b){var t=a[0]+' '+a[1];return b?t+', '+b:t}))});
    var AQ=['','set to 1 side','in soft focus','just at the edge of the frame','within reach','half in shadow','catching the light','slightly out of place','tidily placed','casually left there'];
    Object.keys(AMBIENT).forEach(function(k){var base=AMBIENT[k].slice();add(AMBIENT[k],cross(base,AQ,function(a,b){return b?a+', '+b:a}))});
    var FT=['the AI prompt panel','a smart slide layout','a locked brand theme','presenter view','a grid of slide thumbnails','a chart slide','a team workspace','a timeline slide','a photo slide','a comparison slide'];
    var FS=['open beside a fresh slide','adjusting as content is added','applied across a deck','with the next slide ready','being reordered','updating as data is added','shared with the team','mid-edit','just finished','opened from the template gallery'];
    add(PFEAT,cross(FT,FS,function(a,b){return a+' '+b}));
    var TF=['a wide nose','a strong nose','heavy brows','deep-set eyes','hooded eyelids','a round face','a long face','a soft jawline','full cheeks','a gap between the front teeth'];
    var TQ=['','and a few freckles','and faint laugh lines','and a small scar','and slightly uneven skin','and visible pores','and a few grey hairs','and a slight asymmetry','and soft under-eye lines','and a light dusting of stubble or down'];
    add(TRAITS.map(function(t){return t[0]}),[]);var tx=TRAITS.map(function(t){return t[0]});cross(TF,TQ,function(a,b){return b?a+' '+b:a}).forEach(function(v){if(tx.indexOf(v)<0)TRAITS.push([v])});
    var TOP={B:['a navy blazer over a white oxford shirt','a charcoal knit blazer over a crewneck','a camel wool blazer over a fine knit','a grey jacket over a silk shell','a black blazer over a striped shirt'],S:['a merino crewneck over a collared shirt','a suede overshirt over a tee','a cotton chore jacket over a knit','a fine-gauge cardigan over a shell','a linen shirt with rolled sleeves'],R:['a soft cashmere sweater','a washed cotton shirt','a chunky knit cardigan','a relaxed linen shirt','a heavyweight tee under an overshirt']};
    var BOT={B:['grey wool trousers','dark tailored trousers','navy pleated trousers','black cigarette trousers','a midi skirt in wool crepe'],S:['dark denim','chinos','tailored joggers in wool','cropped wide trousers','a pleated midi skirt'],R:['relaxed jeans','soft wide trousers','cotton drawstring trousers','corduroy trousers','a knit midi skirt']};
    var COL=[' in navy and stone',' in charcoal and cream',' in olive and ivory',' in camel and white',''];
    ['B','S','R'].forEach(function(l){cross(TOP[l],BOT[l],function(a,b){return a+', with '+b}).forEach(function(v,i){var t=v+COL[i%COL.length];if(!OUTFITS.some(function(o){return o[0]===t}))OUTFITS.push([t,l,0,0])})});
    if(typeof ACCENT_ITEMS!=='undefined')add(ACCENT_ITEMS,cross(['earrings','a silk scarf','a pocket square','a notebook','a mug','a watch strap','a pen','a lanyard','a sweater','a tote bag'],['','on the table','in the foreground','at the edge of the frame','in soft focus'],function(a,b){return b?a+' '+b:a}));
    Object.keys(RPLACES).forEach(function(r){Object.keys(RPLACES[r]).forEach(function(k){var b=RPLACES[r][k].slice();add(RPLACES[r][k],cross(b,PLM,function(a,m){return a+', '+m}))})});
    Object.keys(RBGS).forEach(function(r){Object.keys(RBGS[r]).forEach(function(k){var b=RBGS[r][k].slice();add(RBGS[r][k],cross(b,['','far back','at the edge of the frame','in creamy bokeh','barely visible'],function(a,m){return m?a+', '+m:a}))})});
    Object.keys(RACTS).forEach(function(r){var b=RACTS[r].slice();cross(b,TM,function(a,m){return [a[0]+', '+m,a[1]]}).forEach(function(v){RACTS[r].push(v)})});
    Object.keys(PT_RPOSES).forEach(function(r){var b=PT_RPOSES[r].slice();add(PT_RPOSES[r],cross(b,['','relaxed','with a small smile','mid-laugh','glancing up','mid-sentence','turning toward the lens','just looking up','shoulders loose','mid-exhale'],function(a,m){return m?a+', '+m:a}))});
  })();

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
    it.short=build(it.facet,s,'Short');
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

  return {place:place,hold:function(){R={}},reroll:function(){R={}},snap:function(){return Object.assign({},R)},restore:function(s){R=Object.assign({},s||{})},lastVars:function(){return LV.slice()},varKey:function(v){return LVK[v]},unset:function(k){if(R){delete R[k];if(k==='act')delete R.props}},PSHOTS:PSHOTS,BUILDS:BUILDS,AGES:AGES,RACES:RACES,ROLES:ROLES,SHOTS:SHOTS,SETTINGS:SETTINGS,ACTIONS:ACTIONS,ACCENTS:ACCENTS,COPY:COPY,WARDROBES:WARDROBES,ACCENT_ITEMS:ACCENT_ITEMS,FEATURES:FEATURES,LAYOUTS:LAYOUTS,GROUNDS:GROUNDS,ITEMS:ITEMS,BASE:BASE,build:build};
})();
