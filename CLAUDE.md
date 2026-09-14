# Beautiful.ai Brand Guide — project rules

## Copy voice (applies to every word in the guide)
- **Never hedge.** State it. No "should aim to be", "tries to", "we believe", "generally", "where possible". A guideline that hedges is not a guideline.
- Declarative, short sentences. Second person for instructions, "we" for beliefs (mission/vision/values).
- Sentence case everywhere. No emoji. Numerals, not words.
- Name what's broken without naming competitors ("the old way").
- No gendered examples — "their team", not "her team".
- Never let AI travel alone: every AI mention pairs with proof (professional templates, on brand, work-ready, 10x faster).
- Category is **Presentation Platform**. Never "Presentation Systems™", never an AI-category claim.
- "The beautiful way" is a frame, not a headline — it always sits above a work-ready claim.

## Marker system (visual hierarchy — use these, invent nothing else)
1. **Chapter** → `.chapter-hero` with `.ch-eyebrow` (ordinal) + `h2`. Full-bleed gradient band.
2. **Section** → `.sub-head` with `.sh-label` (chapter name) + `h2`.
3. **Sub-section** → `.sub-title` with `.st-eyebrow` (kicker) + `h3`/`h4`. Hairline rule above.
4. **Label** → `.eyebrow`, bare mono label inside a grid cell. Never carries a heading.

Callouts: `.callout` (Navel orange, attention), `.callout.do` (Azul), `.callout.dont` (Rebel Red).

## Layout
- Everything aligns to `--gutter` (distance from viewport edge to the 1320px content column). Fixed/corner elements use `var(--gutter)`, never hard-coded insets.
- Body copy caps at 70ch; specimen grids run full width.
- Type comes from the design-system tokens (`--text-h1-size` … `--text-body-*`, `--ls-tight`). No ad-hoc font sizes on headings.

## Process
- When a piece of the system is missing or ambiguous, **stop and ask** rather than inventing it.
- Files: `Beautiful.ai Brand Guidelines.html`, `styles.css`, `colors_and_type.css`.
