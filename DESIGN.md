# Design System — IMAN

## Product Context
- **What this is:** Community website for IMAN (Iranian-American Muslim Association of North America)
- **Who it's for:** Iranian-American Muslim diaspora in Los Angeles, plus broader community visitors
- **Space/industry:** Islamic community center, Iranian cultural institution
- **Project type:** Community website (Phase 1: aesthetic site, Phase 2: admin CMS, Phase 3: AI features)
- **Key content:** Prayer times (bilingual, daily), events, services (classes, marriage, memorial), donation, community info
- **Bilingual:** English + Farsi (Persian). The site must feel born bilingual, not translated.
- **Address:** 3376 Motor Ave, Los Angeles, CA 90034
- **Deploy target:** Vercel (Next.js)

## Aesthetic Direction
- **Direction:** Luxury/Refined with Persian Architectural Soul
- **Visual thesis:** "Isfahan meets Los Angeles" — cream stone, glazed turquoise tile, and deep lapis accents arranged with the quiet precision of Persian geometry, carrying the warmth of a diaspora cultural home
- **Decoration level:** Intentional — girih geometric borders, calligraphic accents at ceremonial moments. Pattern is structural, not wallpaper. One strong motif per page is enough.
- **Mood:** Quiet confidence. Cultured, sacred, diasporic, self-assured. Between a museum, a literary journal, and a sacred civic center. NOT a generic community org template.
- **Reference sites:** None — this design deliberately breaks from the generic WordPress template pattern used by every competitor (ICSA, ICOFA, SALAM, EPIC, ICNA)
- **Anti-patterns:** No generic "mosque green" as primary. No 3-column icon grids. No centered-everything symmetry. No stock mosque photography. No WordPress template feel.

## Typography

### English
- **Display/Hero:** Cormorant Garamond — high-contrast serifs with carved-inscription feel, editorial weight. Use for headlines, pull quotes, section titles.
- **Body/UI:** Source Sans 3 — clean humanist sans, excellent readability. Disappears when it should.
- **Loading:** Google Fonts CDN (`family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500` + `family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400`)

### Farsi (Persian)
- **All-purpose (body + headlines):** Vazirmatn — the premier Persian web font by Saber Rastikerdar. 9 weights (Thin-Black). Farsi-first design, not Arabic with Persian glyphs bolted on.
- **Ceremonial display:** Noto Nastaliq Urdu — USE SPARINGLY. Only for bismillah, dua headers, hero phrases, and section dividers. Nastaliq should feel like illumination, not interface chrome.
- **Loading:** Google Fonts CDN (`family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900` + `family=Noto+Nastaliq+Urdu:wght@400;500;600;700`)

### Rules
- Never fake bilingualism by mirroring English typography — Farsi has its own gravity
- All Farsi text uses `direction: rtl` and `font-family: var(--font-farsi)`
- Nastaliq text uses `line-height: 2.2+` (cascading baseline needs vertical space)
- Use `font-display: swap` and subset aggressively
- English headlines: generous letter-spacing (0.02em)

### Scale (rem, base 16px)
| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Display XL | 3.8rem | 400 | Hero headline (Cormorant) |
| Display | 2.8rem | 400 | Section headlines (Cormorant) |
| H3 | 1.4rem | 500 | Card titles (Cormorant) |
| H4 | 1.2rem | 500 | Sub-headers (Cormorant) |
| Body | 1rem | 400 | Paragraphs (Source Sans 3) |
| Body Small | 0.92rem | 400 | Cards, descriptions |
| Caption | 0.82rem | 500 | Labels, metadata |
| Overline | 0.82rem | 600 | Section labels (uppercase, 0.12em tracking) |
| Farsi Display | 2rem | 500 | Farsi section titles (Vazirmatn) |
| Farsi Body | 1rem | 400 | Farsi paragraphs (Vazirmatn, line-height 2.0) |
| Farsi Nastaliq | 1.4-2.8rem | 400-500 | Ceremonial only (Noto Nastaliq Urdu) |

## Color

### Approach
Restrained but culturally distinct. Every color derives from Persian architectural materials: tilework glazes, carved stone, illuminated manuscripts, and the natural landscape of Iranian gardens.

### Palette

```css
:root {
  /* Backgrounds */
  --bg:            #F4EDE4;  /* Kashan Plaster — warm lime plaster in afternoon light */
  --surface:       #FFF9EF;  /* Parchment — aged manuscript paper */
  --surface-2:     #E7DCC7;  /* Warm Stone — inset panel texture */

  /* Text */
  --text:          #1E2A30;  /* Lapis Ink — blue-charcoal, never pure black */
  --text-secondary:#5A6368;  /* Weathered Stone */
  --muted:         #8B9196;  /* Distant Mountain */

  /* Accents */
  --accent:        #1B6B7D;  /* Isfahan Turquoise — PRIMARY brand color */
  --accent-hover:  #155A6A;  /* Deep Turquoise */
  --lapis:         #1E4D8F;  /* Lapis Lazuli — depth and structure */
  --gold:          #C4963C;  /* Illumination Gold — ceremonial, sparing */
  --gold-light:    #D4AD5A;  /* Pale Gold — hover states */
  --persimmon:     #E85D3A;  /* Persimmon Ceramic — hot accent, Safavid tile, VERY sparing */
  --cypress:       #2D5F4E;  /* Garden Cypress — sophisticated near-black green */

  /* Borders & Lines */
  --line:          #D7C7AC;  /* Carved Stone — dividers and borders */
  --line-light:    #E8DFD0;  /* Light Divider */

  /* Semantic */
  --success:       #2D5F4E;  /* Garden Cypress */
  --warning:       #C4963C;  /* Illumination Gold */
  --error:         #8E3B2F;  /* Madder Clay — from madder root dye */
  --info:          #1E4D8F;  /* Lapis Lazuli */
}
```

### Dark Mode

```css
html.dark {
  --bg:            #141B20;
  --surface:       #1C252C;
  --surface-2:     #263038;
  --text:          #E8E2D8;
  --text-secondary:#9BA3A8;
  --muted:         #6B7278;
  --accent:        #2A9AAF;  /* Lighter turquoise for dark bg */
  --accent-hover:  #33B0C6;
  --lapis:         #4A7BC4;
  --gold:          #D4AD5A;
  --gold-light:    #E0C072;
  --persimmon:     #F07B5E;
  --cypress:       #4A8B72;
  --madder:        #C0584A;
  --line:          #2F3A42;
  --line-light:    #263038;
}
```

### Color Principles
- Background is warm, never pure white
- Isfahan Turquoise is the lead accent (NOT green)
- Lapis is for depth, structure, and secondary emphasis
- Gold is ceremonial and sparing — active states, highlights, Farsi accent text
- Green (cypress) appears rarely, only as a natural secondary note. It is NEVER the brand color.
- Persimmon is the single hottest element on any page — one CTA, one alert
- Text is blue-charcoal (#1E2A30), never pure black

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — spiritual/community space, not a dense dashboard
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px) 4xl(96px)
- **Section padding:** 96px vertical (4xl)
- **Card padding:** 32px (xl)
- **Content max-width:** 1200px

## Layout
- **Approach:** Grid-disciplined for content, editorial-asymmetric for hero/landing
- **Grid:** 12 columns, 24px gap
- **Max content width:** 1200px
- **Border radius:** sm(4px) md(8px) lg(12px) — no bubbly uniform radius
- **Hero:** Asymmetric 2-column (text left ~60%, prayer card right ~40%). Background has subtle girih geometric pattern.
- **Services:** 2-column editorial grid with staggered cards. NOT 3-column icon grid.
- **Events:** 3-column cards with color-coded date strips
- **CTA sections:** Dark lapis background with girih pattern overlay at low opacity

### Bilingual Layout
- Nav labels: English on top, Farsi below in smaller text
- Prayer times: 3-column row (English name | time | Farsi name)
- Section headers: English heading + Farsi subtitle below in gold
- Hero: English headline prominent, Farsi translation below, Nastaliq bismillah above
- Footer: Bilingual branding
- Language toggle: `En | فا` (not flags — flags represent nations, not languages)

## Motion
- **Approach:** Intentional — subtle entrance animations, meaningful state transitions
- **Easing:** enter(ease-out / cubic-bezier(0.16, 1, 0.3, 1)) exit(ease-in / cubic-bezier(0.7, 0, 0.84, 0)) move(ease-in-out)
- **Duration:** micro(50-100ms for hover) short(150ms for button states) medium(300ms for card transitions) long(500ms for page transitions)
- **Effects:**
  - Service cards: turquoise bottom border reveals on hover via scaleX transform
  - Cards lift 2px on hover with shadow increase
  - Geometric pattern has subtle opacity on scroll
  - Prayer time active row has gold left-border marker

## Key Components

### Prayer Times Card
- Top gradient border: turquoise -> lapis -> gold
- Header: "Prayer Times" + triple date (Gregorian / Shamsi / Hijri)
- Rows: 3-column grid (English name | time in tabular-nums | Farsi name RTL)
- Active prayer row: turquoise tinted background with 3px gold left marker
- Footer: "Next: Maghrib in 2h 56m" + "Monthly Calendar" link
- Shamsi date in gold, Hijri in muted

### Geometric Dividers
- Diamond shapes (rotated squares) in turquoise with center gold diamond
- Used between major sections
- Replaces plain horizontal rules

### Section Headers
- Overline label (uppercase, tracked, turquoise)
- Display heading (Cormorant Garamond)
- Farsi subtitle (Vazirmatn, gold, RTL)

### Donate Button
- Gold background (#C4963C), dark text
- Always visible in nav
- Hover: lighter gold (#D4AD5A)

## Photography Guidelines
- Warm, human, local. Community gatherings, books, tea, majlis, children, architectural details of the center.
- Never generic stock worship imagery or mosque skyline photos.
- If no good photography exists, use color fields and geometry. Empty is better than fake.

## Future Phases (not in Phase 1)
- **Phase 2:** Admin CMS for content management
- **Phase 3:** AI features, radial prayer clock (SVG 24-hour dial), time-of-day palette theming, liturgical season visual shifts

## Preview
The design system preview page is at `/tmp/iman-design-preview.html`. Open in a browser to see rendered fonts, colors, and realistic mockups.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Initial design system | Created by /design-consultation. Research: 7 competitor sites (ICSA, ICOFA, SALAM, EPIC, ICNA, ISNA, current iman.org), Persian design traditions, bilingual typography. Independent proposals from Codex (GPT-5.4) and Claude subagent — unanimous on turquoise/lapis/gold palette, Vazirmatn for Farsi, bilingual-first design. |
| 2026-03-27 | Rejected "mosque green" as primary | Every competitor uses generic green. Isfahan Turquoise (#1B6B7D) is culturally authentic to Persian sacred architecture and differentiates IMAN from the entire category. |
| 2026-03-27 | Cormorant Garamond over Canela | Canela (Codex recommendation) requires $200+ commercial license. Cormorant Garamond is free (Google Fonts) with the same carved-inscription editorial feel. |
| 2026-03-27 | Deferred radial prayer clock to Phase 3 | Claude subagent proposed a 24-hour SVG dial with prayer arcs. Beautiful but complex. Phase 1 nails the typographic prayer card; Phase 3 adds the clock as a delight feature. |
| 2026-03-27 | Deferred time-of-day theming to Phase 3 | Dynamic palette shifts by hour and liturgical season. Gorgeous concept but adds engineering complexity. Phase 1 locks the static aesthetic first. |
