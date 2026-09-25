# Beautiful.ai Brand Guidelines — deploy package

Current version: **v155** (2026-09-25)

```
01-foundation.html
02-logos.html
03-typography.html
04-color.html
05-art-direction.html
06-brand-in-use.html
Prompt builder.html
ad-data.js
ad-gallery.js
ad-v2.css
color-page.css
colors_and_type.css
copy-block.js
copy-hex.js
icon-swap.js
illustration.css
image-slot.js
index.html
og-card.html
photo-shows.js
photography.css
ship-check.js
site.js
story-builder.js
story-layers.js
styles.css
white-ground.css
wr-arrange.js
wr-spread.js
.nojekyll
assets/
fonts/
```

## How to deploy

Upload **the whole folder's contents** to the repo root every time — not one file at a
time. In the GitHub web UI: *Add file → Upload files*, then drag the entire folder in.
With git:

```
git add -A && git commit -m "Update brand guide" && git push
```

Uploading files individually is what broke the site before: `index.html` was current
while `styles.css` was several versions behind, so the page rendered with old CSS.

## Cache busting

Stylesheet and script links carry their own `?v=` numbers (for example `ad-v2.css?v=155`). If a CSS change doesn't appear after deploying,
the number wasn't bumped — ask me to bump it and rebuild.

## Rules

1. Upload everything, every time.
2. Keep `.nojekyll`. Without it GitHub Pages runs Jekyll and drops files and folders starting with `_`.
3. Keep `assets/` and `fonts/` lowercase — Pages is case sensitive, your machine is not.
4. Never hand-edit files in this folder. It is build output; the editable source lives one level up.
