# BAI Design System

## Overview

This design system is built from the **Relume v3.6 Marketing Design System** Figma file used by **BAI** (BAI logo 2024/2025). BAI is a technology/marketing company with a clean, modern brand identity centered around a dark teal palette, bright cyan accents, and a refined sans-serif type system.

**Sources:**
- Figma File: `Marketing DS (Relume v3.6).fig` (attached to this project; 35 pages, 1,543 frames)
- Key pages used: `/Style-Guide` (typography, colors, variables, radius, shadows, logos, icons, UI elements)

---

## Products / Surfaces

1. **Marketing Website** — Primary surface. Full-width sections, hero headers, features, testimonials, CTAs, navbars, footers. Located in `ui_kits/marketing/`.

---

## File Index

```
README.md                  ← This file (start here)
SKILL.md                   ← Agent skill manifest (for Claude Code)
colors_and_type.css        ← All CSS custom properties / design tokens
assets/
  BAI-logo-2024.svg        ← Primary logo (for dark background)
  BAI-logo-2025.svg        ← Alternate logo (for light background)
preview/                   ← Design System tab cards (registered assets)
  colors-brand.html        ← Primitive color palette swatches
  colors-semantic.html     ← 5 color scheme definitions
  type-scale.html          ← H1–H6 heading type scale
  type-body.html           ← Body sizes, weights & monospace
  spacing-radius.html      ← Border radius tokens (XXL→XS)
  spacing-shadows.html     ← 7-level shadow elevation system
  components-buttons.html  ← Button variants & states
  components-nav.html      ← Navbar (light + dark)
  components-footer.html   ← Footer component
  components-cards.html    ← Feature card patterns
  brand-logos.html         ← Logo on all backgrounds
  brand-icons.html         ← Material Symbols usage guide
ui_kits/
  marketing/
    index.html             ← Interactive click-through prototype
    README.md              ← Kit component & screen notes
```

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Direct and confident** — copy gets to the point without filler. Short, declarative sentences.
- **Professional but not corporate** — warm and human without being casual. No exclamation marks overdose.
- **Action-oriented** — CTAs are imperative: "Get started", "Learn more", "Book a demo"
- **Second-person ("you/your")** — speaks directly to the user. Not "we help businesses" but "grow your business"
- **Sentence case** throughout — headings, labels, buttons. Never ALL CAPS for body copy.
- **No emoji** — the brand is emoji-free. Clean and professional.
- **Numbers are written as numerals** — "3 ways to..." not "three ways"

### Copy Patterns
- Hero headlines: 2–5 words + supporting line. E.g. "Build faster. Launch smarter."
- Section taglines: short, benefit-led. "Everything you need to ship."
- Feature labels: noun-first. "Analytics dashboard", "Team collaboration"
- Button labels: verb-led. "Get started", "See pricing", "Talk to sales"

---

## VISUAL FOUNDATIONS

### Color System
The palette is anchored in a **dark teal near-black** with a **vivid cyan accent**. Light backgrounds use an off-white cool gray.

**Primitive Colors:**
| Name | Hex | Usage |
|---|---|---|
| Neutral Darkest | `#001A24` | Primary text, dark backgrounds |
| Neutral Dark | `#00090D` | Near-black, deepest tone |
| Neutral Dark 2 | `#00212B` | Dark section BG variant |
| Neutral Medium | `#4C5255` | Secondary text |
| Neutral Light | `#D8DADA` | Borders, dividers |
| Neutral Lightest | `#F0F3F5` | Page background, cards |
| White | `#FFFFFF` | Foreground text on dark, card BG |
| Blue (Accent) | `#52D0FF` | Primary CTA, highlights, accent |
| Blue Dark | `#11A9E2` | Hover state for accent |
| Blue Lightest | `#E5F8FF` | Tinted accent background |
| Orange | `#FF703B` | Warning, alternate accent |
| Purple | `#6067F5` | Feature highlight |
| Green | `#87D0B1` | Success, positive states |
| Yellow | `#FFCD66` | Attention, warm highlight |
| Amber | `#FA901F` | Alert, energy |
| Pink | `#D3B3C7` | Soft accent |

**Color Schemes (5 defined in Figma):**
- **Scheme 1** (default): White BG, `#001A24` foreground, `#52D0FF` accent
- **Scheme 2**: White BG, White foreground (dark section variant)
- **Scheme 3**: White BG, White foreground
- **Scheme 4**: Blue (`#52D0FF`) BG
- **Scheme 5**: Neutral Lightest BG

### Typography

**Heading typeface: Post Grotesk** (commercial font — see note below)  
**Body typeface: Post Grotesk** (same family, lighter weights)  
**Monospace: Martian Mono** (used sparingly for code/labels)

⚠️ **Font substitution**: Post Grotesk is a commercial font not available on Google Fonts. This design system uses **Plus Jakarta Sans** as a substitute (closest available match in weight coverage and proportions). Request actual font files from your brand team.

**Type Scale (Desktop):**
| Token | Family | Size | Line Height | Weight |
|---|---|---|---|---|
| H1 | Post Grotesk | 72px / 4.5rem | 120% | Medium (500) |
| H2 | Post Grotesk | 58px / 3.625rem | 120% | Medium |
| H3 | Post Grotesk | 46px / 2.875rem | 120% | Medium |
| H4 | Post Grotesk | 37px / 2.3125rem | 128% | Medium |
| H5 | Post Grotesk | 30px / 1.875rem | 140% | Medium |
| H6 | Post Grotesk | 24px / 1.5rem | 140% | Medium |
| Body Large | Post Grotesk | 20px / 1.25rem | 150% | Book (400) |
| Body Medium | Post Grotesk | 18px / 1.125rem | 150% | Book |
| Body Regular | Post Grotesk | 16px / 1rem | 150% | Book |
| Body Small | Post Grotesk | 14px / 0.875rem | 150% | Book |
| Body Tiny | Post Grotesk | 12px / 0.75rem | 150% | Book |
| Tagline | Post Grotesk | 16px | 150% | Bold (700) |

**Mobile sizes:** H1→48px, H2→40px, H3→32px, H4→24px, H5→20px, H6→18px

### Spacing & Layout
- 12-column grid at 1440px wide
- 64px horizontal page padding
- Section vertical gaps: 64–128px
- Component internal gaps: 8, 16, 24, 32, 40, 64px

### Border Radius
| Token | Value | Applied to |
|---|---|---|
| XXL | 30px | Full-width / single-column elements |
| XL | 18px | 2-column elements |
| L | 12px | 3–4 column elements |
| M | 8px | Small cards |
| S | 6px | Buttons, tabs |
| XS | 4px | Tags, badges, arrow buttons |

### Shadows
| Token | Value |
|---|---|
| xxsmall | `0 1px 2px rgba(0,0,0,0.05)` |
| xsmall | `0 1px 3px rgba(0,0,0,0.10)` |
| small | `0 2px 4px rgba(0,0,0,0.10)` |
| medium | `0 4px 8px rgba(0,0,0,0.10)` |
| large | `0 8px 16px rgba(0,0,0,0.10)` |
| xlarge | `0 12px 24px rgba(0,0,0,0.15)` |
| xxlarge | `0 16px 40px rgba(0,0,0,0.15)` |

### Backgrounds
- Sections alternate: white, neutral-lightest, dark (`#001A24`)
- No heavy gradients — clean flat backgrounds
- Gradient accent used sparingly: `linear-gradient(white 50%, #001A24 50%)` for split hero sections
- Card backgrounds: white with subtle border `rgba(0,9,13,0.1)` and `xxsmall` shadow

### Animation
- Subtle and functional — no bouncy or playful animations
- Hover: opacity shift or color darken (buttons go from `#52D0FF` → `#11A9E2`)
- Press: slight scale down (`scale(0.98)`)
- Transition: `0.2s ease` standard

### Hover & Interaction States
- **Primary button**: `#52D0FF` → hover `#11A9E2` (darker blue), bg fill retained
- **Secondary button**: transparent with `#001A24` border → hover `rgba(0,9,13,0.05)` fill
- **Link**: underline on hover
- Slider arrows: white card with border, hover adds shadow

### Iconography
See ICONOGRAPHY section below.

---

## ICONOGRAPHY

BAI uses the **Material Symbols** icon library (not Material Icons legacy).

- **Style**: Outlined (rounded variant seen in Figma)
- **Sizes**: 24px standard; 48px for feature icons
- **Load via CDN**: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined`
- **Usage**: `<span class="material-symbols-outlined">icon_name</span>`
- **Brand social icons** in footer: X (Twitter), LinkedIn, Facebook, Instagram, YouTube, Dribbble — rendered as SVG instances from the Figma component library
- **No emoji** used as icons
- **No unicode char substitutes** — always use the icon font

All icon components in the Figma library come from a comprehensive Material Symbols set embedded in the `/Style-Guide/components/` folder.

---

## SKILL.md
See `SKILL.md` for agent skill configuration.
