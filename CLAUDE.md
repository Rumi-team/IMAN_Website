# IMAN Website

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

Key rules:
- Primary accent is Isfahan Turquoise (#1B6B7D), NOT green
- Farsi text always uses Vazirmatn font with `direction: rtl`
- Nastaliq (Noto Nastaliq Urdu) is for ceremonial moments ONLY
- Backgrounds are warm off-white (#F4EDE4), never pure white
- The site must feel born bilingual (English/Farsi), not translated

## Tech Stack
- Next.js 16 (App Router, Server Components by default)
- Tailwind CSS
- Deployed to Vercel
- pnpm as package manager

## Bilingual Content
- English is the default language
- Farsi text requires `dir="rtl"` and `font-family: var(--font-farsi)`
- Nav labels show both languages (English on top, Farsi smaller below)
- Prayer times show English name | time | Farsi name in a 3-column grid
