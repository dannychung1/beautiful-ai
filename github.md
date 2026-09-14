repo: dannychung1/beautiful-ai
branch: main
pages: root of main

## Last sync
date: 2026-09-12T16:34:39Z

### Updated in this project
- Diagnosed the broken live render: `_ds/` stripped by Jekyll, no `fonts/` folder, no `.nojekyll`.
- Rebuilt `deploy/` as the deployable package — flat CSS paths, cache-busted `?v=7`, fonts included.
- Removed React/Babel and the tweaks panel from the deployed copy.

## Screen map
| Project file | Repo file |
| --- | --- |
| Beautiful.ai Brand Guidelines.html (source) | index.html |
| deploy/index.html (build output) | index.html |
| styles.css | styles.css |
| photography.css | photography.css |
| illustration.css | illustration.css |
| _ds/…/colors_and_type.css | colors_and_type.css (flattened on deploy) |
| assets/ | assets/ |
| fonts/ | fonts/ (MISSING in repo — must be uploaded) |
