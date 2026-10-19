# DESIGN.md — Visual Direction & Atomic Design Contract

**Status:** Canonical Source of Truth  
**Aesthetic Direction:** Cosentino Architectural Editorial  
**Scope:** `src/app/globals.css`, `src/components/{atoms,molecules,organisms,templates}`, `src/content/*`

Every agent or engineer creating, modifying, or reviewing UI in this repository **MUST** read and enforce this document before touching any component or stylesheet. Where an existing component on disk contradicts this specification, this specification wins.

---

## 1. Aesthetic Direction & Core Philosophy

Casa Alta is an architecture and civil engineering studio in Oaxaca. Its digital presence reads like a monograph and architectural material catalogue (**Cosentino** reference), never like a SaaS landing page or an agency template.

1. **Photography Leads on Quiet Ground**: High-craft studio photography is the primary carrier of meaning. Below the full-bleed heroes and pinned stages, photographs sit uncropped or in clean `4:3` / `3:4` frames with **zero dark gradient scrims and zero overlaid text**.
2. **Orthogonal `0px` Geometry (Zero Capsules)**: Architecture is tectonic and orthogonal. Every border-radius token (`--radius-xs` through `--radius-4xl`) is `0px`. Pill badges (`.number-pill`), oval arrow capsules (`.arrow-pill`), and `rounded-full` buttons or tabs are **forbidden**.
3. **Sole Circular Exception**: The floating WhatsApp trigger (`src/components/organisms/WhatsAppFloat.tsx`, `h-14 w-14 rounded-full`) is the **only** circular element allowed in the entire interface.
4. **Structural Honesty**: Dividers, numbers, and labels organize information; they never decorate. Blueprint tick-mark gradients (`.ruler-top`, `.ruler-y`) and scroll-distance gimmicks are banned.

---

## 2. Color & Surface System (`src/app/globals.css`)

The site is strictly light-mode (`color-scheme: light`) with deliberate dark architectural stages.

### 2.1 Token Palette

| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | `#ffffff` | Primary page background. Always leads after the hero. |
| `--color-bone-50` | `#f4f3f1` | Alternating section surface (`Section tone="bone"`). |
| `--color-bone-100` | `#eceae6` | Subtle image placeholder surface and hover tint on light controls. |
| `--color-bone-200` | `#e4e2de` | Structural `1px` hairlines (`Rule`), input borders, and tab baselines. |
| `--color-concha-nacar` | `#f7f1e9` | Signature editorial surface reserved **exclusively** for `ManifestoLine`, `ClosingCTA`, and `ProjectCaseStudyModal`. |
| `--color-ink` | `#151515` | Primary typography, dark architectural stages (`Hero`, `PageHero`, `FeaturedPortfolio`, `FullBleedCTA`, `Footer`), and primary button hover fill. |
| `--color-ink-muted` | `#5a5a57` | Secondary body copy, captions, and inactive tab/metadata labels. |
| `--color-brand-900` | `#0a2159` | Deep brand accent (selection text, deep hover). |
| `--color-brand-800` | `#0e2d78` | Primary brand blue sampled from the Casa Alta logo. Used for `.eyebrow`, active tab underlines, structural accents, and the primary CTA fill. |
| `--color-brand-700` | `#103583` | Interactive link hover accent. |
| `--color-brand-500` | `#2a55b0` | `:focus-visible` outline (`2px solid`, `outline-offset: 3px`). |
| `--color-brand-100` | `#dce4f5` | `::selection` background. |
| `--color-brand-50` | `#f1f5fc` | Subtle active tint for form selector chips. |

### 2.2 Surface Rules

1. **Strict Alternation**: Standard page sections alternate cleanly between `canvas` (`#ffffff`) and `bone` (`#f4f3f1`).
2. **Reserved Signature Warmth**: `--color-concha-nacar` (`#f7f1e9`) is never used on cards, pills, or tabs. It belongs only to full-width editorial moments (`ManifestoLine`, `ClosingCTA`, and the `ProjectCaseStudyModal` sheet).
3. **Unified Dark Stage Token**: Dark sections and hero scrims must use `--color-ink` (`bg-ink`, `from-ink/90`, etc.). Raw hex darks (such as `#060c1a`) are forbidden in components.
4. **Action-Color Exclusivity**: Solid `bg-brand-800 text-white` fill is reserved **exclusively** for `<Button variant="primary" />` and `<WhatsAppFloat />`. Never apply solid `bg-brand-800` or `bg-ink` fills to tabs, filter chips, step indicators, or badges.

---

## 3. Typography & Voice Hierarchy

The system uses **two** font families loaded in `src/app/layout.tsx`: **Marcellus** (`--font-display`) and **Montserrat** (`--font-sans`).

> **Ban on `font-mono`**: Monospace fonts (`font-mono`) are forbidden across all components. Numeric alignment in counters, dimensions, phone numbers, and tables must use `Montserrat` with `tabular-nums`.

### 3.1 The Four Typographic Registers

| Register | Class / Component | Font & Weight | Case & Tracking | Permitted Usage |
|---|---|---|---|---|
| **Editorial Voice** | `.voice` / `<Heading voice="serif">` | `Marcellus` 400 | Sentence case, `tracking-[0.005em]`, `text-wrap: balance` | **All** editorial headings (`h1` in `PageHero`, `h2` in `SectionHeading`, `h3` in cards/entries), `StatItem` figures, and `blockquote` pull quotes. **Never** use on body paragraphs or summaries. |
| **Section Eyebrow** | `.eyebrow` | `Marcellus` 400 | Sentence case, `1.0625rem` (`17px`), `text-brand-800` | Kicker line above `h1`/`h2`. Never override with `uppercase`, `font-sans`, or wide tracking. |
| **Monumental Display** | `.display` / `<Heading voice="display">` | `Montserrat` 600 | `uppercase`, `leading-[0.92]`, `tracking-[-0.01em]` | Reserved **strictly** for the landing `Hero` word stack, the `ProjectCaseStudyModal` lead title, and the `CASA ALTA` wordmark in `Footer`. |
| **Body & Functional Label** | `<Text>` & `.label` | `Montserrat` 400 / 500 / 600 | Body: sentence case (`leading-relaxed`). `.label`: `0.75rem`, `uppercase`, `tracking-[0.14em]` | `<Text>` (`lede`, `lg`, `base`, `sm`) carries all narrative and descriptive paragraphs (`lede` capped at `62ch`). `.label` carries navigation links, buttons, tabs, metadata lines, and table headers. |

---

## 4. Ornamentation, Dividers & Numbering

1. **Hairlines Only (`Rule`)**: Remove `.ruler-top` and `.ruler-y` from `src/app/globals.css`. Dividers are clean `1px` solid lines (`border-bone-200` or `border-ink/15` on light surfaces; `border-white/20` on dark surfaces) rendered via `<Rule />` or standard border utilities.
2. **No Section or Card Number Pills**: Remove `.number-pill` and `.number-pill-inverse`. Do not prefix section eyebrows, footer columns, or project cards with `(01)`, `(02)`, etc.
3. **When Numerals Are Permitted**: Plain tabular numerals (`01`, `02`, or `01 / 04` set in `.label tabular-nums`, **without** parentheses or pill borders) are used **only** when the items form a genuine sequence:
   - The 7 methodology steps in `ProcessList` (`01`–`07`).
   - Active slide/step counters (`01 / 04` in `FeaturedPortfolio`, `01 / 07` in `ProcessList`, `01 / 12` in photo carousels).
   - Technical part indices in `ServicesIndex` (`Partida 01`).

---

## 5. Interactive Controls: Buttons, Tabs, Chips & Icons

### 5.1 `<Button>` (`src/components/atoms/Button.tsx`)

All buttons and action links use `0px` corners (`rounded-none`), `.label` typography, and a minimum touch target height of `44px` (`sm`) or `48px` (`md`).

| Variant | Visual Treatment | Usage |
|---|---|---|
| `primary` | `bg-brand-800 text-white hover:bg-ink px-8 py-3.5 min-h-[48px]` (`0px` corners) | Primary conversion action (1 per view/section). |
| `inverse` | `bg-canvas text-ink hover:bg-bone-100 px-8 py-3.5 min-h-[48px]` (`0px` corners) | Primary action over dark chrome or full-bleed photography. |
| `secondary` | Inline link: `text-ink underline decoration-ink/40 underline-offset-8 hover:text-brand-800 hover:decoration-brand-800 py-2` | Secondary actions on light surfaces (`canvas`, `bone`, `concha-nacar`). |
| `outline` | Inline link on dark ground: `text-canvas underline decoration-canvas/50 underline-offset-8 hover:text-concha-nacar hover:decoration-concha-nacar py-2` | Secondary actions over dark stages (`FeaturedPortfolio`, `FullBleedCTA`). |
| `quiet` | Inline link: `text-brand-700 underline underline-offset-4 hover:text-brand-900 py-1.5` | Tertiary inline references. |

- **Arrow Prop (`arrow?: boolean`)**: When `arrow` is true, `<Button>` renders `<Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />`. The oval `.arrow-pill` double-SVG markup is removed everywhere.
- **No Hand-Rolled Action Markup**: Organisms and molecules must never inline custom `<svg>` arrows or append literal `"→"` characters to links. Always compose `<Button>`.

### 5.2 Tabs & Category Switchers (Cosentino Catalogue Bar)

Used identically in `ServicesIndex`, `ProjectsIndexTemplate`, `CosentinoInspirationExperience`, and `Testimonials`:

- **Container**: `flex flex-wrap items-center gap-6 border-b border-bone-200` (with `role="tablist"`).
- **Tab Item**: `0px` button (`role="tab"`, `aria-selected`), `min-h-[44px] pb-3 -mb-px label cursor-pointer transition-colors duration-200 border-b-2`.
- **Active State**: `border-brand-800 text-ink font-medium`.
- **Inactive State**: `border-transparent text-ink-muted hover:text-ink hover:border-ink/30`.
- **Counts**: Optional count suffix rendered inline as `.label tabular-nums text-ink-muted` (e.g. `Habitacional 06`), never inside a pill badge.

### 5.3 Form Selector Chips (`src/components/organisms/ContactFormFields.tsx`)

- `0px` rectangular controls: `min-h-[44px] px-4 py-2 border text-xs font-medium tracking-wide transition-colors cursor-pointer`.
- **Inactive**: `border-bone-200 bg-canvas text-ink-muted hover:border-ink hover:text-ink`.
- **Selected**: `border-brand-800 bg-brand-50 text-brand-900` (never solid `bg-brand-800`, preserving visual hierarchy for the submit `<Button variant="primary">`).

### 5.4 Icon Controls (Carousels, Modals, Navigation)

- Prev/next carousel controls (`ProjectCard`, `MasonryGallery`, `Testimonials`) and modal close buttons (`ProjectCaseStudyModal`, lightbox) must be `0px` square buttons with a `44×44px` minimum hit area (`h-11 w-11`).
- Over photographs: `bg-ink/70 text-white border border-white/25 hover:bg-ink`.
- On light surfaces: `bg-canvas text-ink border border-bone-200 hover:border-ink`.

---

## 6. Canonical Visual Order of Components

To guarantee visual consistency across the entire application, every section, card, hero, and modal must obey the following structural order.

### 6.1 Section & `SectionHeading` Order

1. **Vertical Rhythm (`src/components/atoms/Section.tsx`)**:
   - Standard padding: `py-20 md:py-28 lg:py-36` (`density="default"`).
   - Compact padding (when needed for filter bars or dense bands): `py-12 md:py-16 lg:py-20` via a formal `density="compact"` prop on `<Section>`.
   - **Ban on `!py-*` / `!pt-*` overrides**: Organisms must not pass `!important` padding overrides to `<Section>`.
2. **Mandatory `<SectionHeading>` (`src/components/molecules/SectionHeading.tsx`)**:
   - Every section header uses `<SectionHeading>` with this exact vertical order:
     1. **Eyebrow**: `<p className="eyebrow">{eyebrow}</p>` (omitted when empty).
     2. **Heading**: `<Heading as={as} voice="serif" className="max-w-[26ch]">{heading}</Heading>`.
     3. **Body Lede**: `<Text size="lede" className="mt-1">{body}</Text>` (omitted when empty).
   - **Optional Header Action Slot**: `<SectionHeading>` accepts an optional `action?: React.ReactNode` prop. When provided, `<SectionHeading>` renders a two-column header row (`flex flex-col justify-between gap-6 border-b border-bone-200 pb-8 lg:flex-row lg:items-end`) with the heading stack on the left and `action` anchored at bottom-right. Organisms must never build ad-hoc header wrappers outside `<SectionHeading>`.

### 6.2 Card Patterns: Clean-Ground & Material Monoliths

#### 6.2.1 Architectural Monograph Dynamic Cadence (`ProjectCard` & `ProjectsGrid`)

Applies to `ProjectsGrid` and `ProjectCard` on landing (`FeaturedPortfolio`) and `/proyectos`:

```
┌──────────────────────────────────────────┐
│  ROW 1 (2 ITEMS): PANORAMIC 16:10 SPAN 6 │
│  [PHOTOGRAPH]              [PHOTOGRAPH]  │
├──────────────────────────────────────────┤
│  ROW 2 (3 ITEMS): TALL 4:5 SPAN 4        │
│  [PHOTO]       [PHOTO (hover)]   [PHOTO] │
│                TITLE   LOCATION          │
└──────────────────────────────────────────┘
```

1. **Panoramic Viewport Width & Tectonic Micro-Gap**: The grid breaks out of standard reading containers into an expansive `max-w-[1920px]` panoramic canvas with razor-thin architectural joints (`gap-1.5 sm:gap-2`).
2. **Dynamic 2-3 Row Cadence**: Projects alternate rhythmically between rows of 2 (cinematic `aspect-[16/10]`, spanning 6/12 columns, preferring `project.wideCover`) and rows of 3 (editorial portrait `aspect-[4/5]`, spanning 4/12 columns, `project.cover`). Every row is mathematically partitioned to fill 100% of the 12-column grid without orphan cards.
3. **Idle State**: 100% clean architectural photography (`0px` orthogonal corners, `bg-bone-100`). Zero overlaid text, zero scrims, zero summaries, and zero external card bodies.
4. **Desktop Hover**: Subtle dark gradient scrim (`from-ink/90 via-ink/35 to-transparent`) fades in. Project title (`Marcellus h3`, white) is positioned at bottom-left; project location (`Montserrat .label`, white/90) is positioned at bottom-right. Clicking anywhere opens the full-screen dossier modal (`onSelect`).
5. **Mobile Touch**: Collapses to single column (`col-span-12`). First tap activates the hover state and reveals a centered `<Button variant="inverse" size="sm" arrow>Conoce más</Button>`. Tapping "Conoce más" opens the dossier modal. Tapping outside deactivates.
6. **Clean-Ground Pattern (Informational Cards)**: For non-project cards (`Differentiators`, `CosentinoInspirationExperience` space cards, `ServiceRow variant="card"`), metadata and text sit on clean ground below the photograph.

#### 6.2.2 Cosentino Material Monolith Pattern (`DivisionCards`)

Applies directly to `src/components/organisms/DivisionCards.tsx` on the landing page, inspired by Cosentino's flagship brand and material catalogue cards (Dekton, Silestone, Éclos):

```
┌──────────────────────────────────────────┐
│  DIVISION TITLE (Marcellus serif)        │
│  (subtle top scrim for contrast)         │
│                                          │
│   FULL-BLEED ARCHITECTURAL PHOTOGRAPHY   │
│   (0px corners, hover scale-105)         │
│                                          │
│  (deep bottom scrim for WCAG AAA)        │
│  DESCRIPTIVE SUMMARY (Text size="sm")    │
│  SABER MÁS → (inline action + arrow)     │
└──────────────────────────────────────────┘
```

1. **Expansive Horizontal Snap Track**: Rather than being constrained to a fixed 4-column container, cards live in a smooth horizontal snap track (`overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none`) with `0px` architectural navigation arrows (`h-11 w-11`) in the `<SectionHeading action={...}>` slot.
2. **Monolith Dimensions**: `w-[85vw] sm:w-[50vw] md:w-[420px] lg:w-[480px]`, `h-[580px] sm:h-[620px] lg:h-[680px]`, `0px` orthogonal corners, `border border-white/10 hover:border-white/25`.
3. **Dual Scrim Gradients**: Top `h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent` protecting the title; bottom `h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent` ensuring absolute legibility for the narrative body and action.
4. **Typography**: Top title set purely in `Marcellus` (`voice="serif" text-2xl md:text-3xl lg:text-[2rem]`) without secondary kickers or pills; body set in `Montserrat` (`Text size="base" text-white/90 max-w-[42ch]`); action set in `.label text-sm tracking-wider text-white group-hover:text-concha-nacar` with animated directional arrow.

### 6.3 Heroes & Full-Bleed Stages (`Hero`, `PageHero`, `FeaturedPortfolio`, `FullBleedCTA`)

1. **`100svh` Full-Bleed Architecture**: `Hero` and `PageHero` run `100svh` edge-to-edge behind the transparent header (`-mt-[var(--chrome-h)]`) with unified `bg-ink` scrim gradients for legibility.
2. **Contemplative Landing `Hero` (`src/components/organisms/Hero.tsx`)**:
   - The landing `Hero` is purely contemplative and automatic (`INTERVAL_MS = 5500` crossfade).
   - **No manual controls**: Do not render `role="button"` on the `<h1>` lines, and do not render manual slide-indicator buttons. The `<h1>` lines (`voice="display"`) reflect the active discipline via opacity synchronized with the background crossfade.
   - The bottom-left eyebrow uses `.eyebrow !text-white/85` (sentence-case `Marcellus`), and the right column displays the `subheadline` in `Montserrat` (`text-white/85`).
3. **`PageHero` (`src/components/organisms/PageHero.tsx`)**:
   - Top metadata bar (`border-b border-white/20 pb-4`) carries the `.label` eyebrow on the left (no capsule badge, no `font-mono` right label).
   - Bottom grid carries `<Heading as="h1" voice="serif">` on the left (`lg:col-span-8`) and the `Montserrat` subheadline on the right (`lg:col-span-4`).

### 6.4 Dark Architectural `Footer` (`src/components/organisms/Footer.tsx`)

- Surface: `bg-ink text-concha-nacar` with `0px` borders (`border-concha-nacar/15`).
- No `.ruler-y` vertical scale, no `(01) / (02) / (03)` prefixes on column headers, and **no** `"HA RECORRIDO X METROS"` scroll-distance meter.
- Left columns (`lg:col-span-7`): `Navegación`, `Sedes`, and `Contacto directo` (with `0px` square-bordered social links).
- Right column (`lg:col-span-5`): Clean institutional specification panel (`0px` border) featuring the studio photograph, coverage statement across Oaxaca's 8 regions, the inverted `<Logo />`, and a `0px` `Volver arriba` `<button>` (`min-h-[44px]`).
- Bottom row: Monumental `CASA ALTA` `.display` wordmark and legal copyright line.

### 6.5 Project Dossier Gallery Pattern (`ProjectCaseStudyModal`)

The complete photographic record in `src/components/organisms/ProjectCaseStudyModal.tsx` renders as an expansive horizontal scroll mosaic:

1. **Multi-Row Horizontal Snap Track**: `grid grid-flow-col gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none`.
   - Projects with ≥ 8 photographs organize into **3 rows** (`grid-rows-[repeat(3,300px)] sm:grid-rows-[repeat(3,380px)] lg:grid-rows-[repeat(3,460px)]`).
   - Projects with fewer images organize into **2 rows** (`grid-rows-[repeat(2,340px)] sm:grid-rows-[repeat(2,440px)] lg:grid-rows-[repeat(2,540px)]`).
   - All excess images scroll horizontally with touch/swipe, trackpad, and `0px` square header navigation buttons (`44×44px`).
2. **Zero Captions & Zero Number Badges**: Photographs speak for themselves without text overlays, dimension specs, or numbering pills.
3. **Interactive Lightbox Inspection**: Clicking any tile opens the uncropped high-resolution photo in a full-screen backdrop modal (`bg-ink/95`) with keyboard focus trap, Escape closure, and `0px` square close trigger.

---

## 7. Atomic Design Layering & Content Seam Hygiene

### 7.1 Strict Four-Layer Hierarchy

Dependencies flow strictly downward: `atoms` → `molecules` → `organisms` → `templates` → `src/app/**/page.tsx`.

- **`atoms/`**: HTML primitives, design tokens, and `next/image` wrapper (`Button`, `Container`, `Heading`, `Icon`, `Logo`, `Photo`, `RouteScrollReset`, `Rule`, `Section`, `Text`).
- **`molecules/`**: Single repeatable UI units composed **only** of atoms (`ContactItem`, `FormField`, `NavItem`, `ProcessEntry`, `ProjectCard`, `SectionHeading`, `ServiceRow`, `SocialLinkItem`, `StatItem`, `Tabs`). **A molecule must never import an organism.**
- **`organisms/`**: Complete page sections owning layout and client interactivity (`ClosingCTA`, `ContactForm`, `ContactFormFields`, `CosentinoInspirationExperience`, `Differentiators`, `DivisionCards`, `FeaturedPortfolio`, `Footer`, `FullBleedCTA`, `Header`, `Hero`, `IntroSection`, `ManifestoLine`, `MasonryGallery`, `MotionShell`, `PageHero`, `ProcessList`, `ProjectCaseStudyModal`, `ProjectsGrid`, `ServicesIndex`, `SiteNav`, `StatsBand`, `Testimonials`, `UtilityBar`, `WhatsAppFloat`).
- **`templates/`**: Pure page-level section placement and `canvas` ↔ `bone` tone alternation (`LandingTemplate`, `AboutPageTemplate`, `ProjectsIndexTemplate`, `ServicesPageTemplate`, `InteriorsPageTemplate`, `SustainabilityPageTemplate`, `ContactPageTemplate`, `SiteChrome`).
- **No Orphaned Duplicates**: Organisms (`ProcessList`, `ServicesIndex`) must compose their corresponding molecules (`ProcessEntry`, `ServiceRow`) rather than duplicating their markup inline, and unused components must be consolidated or removed.

### 7.2 Content Seam Enforcement (`D5`)

1. **Zero Hardcoded Copy or Media in Components**: Presentational components (`src/components/**`) must never define narrative strings, metadata tables, English headings, or fallback `Photo` objects (such as `STAT_METRICS_INFO`, `DIFF_METADATA`, `INSTITUTIONAL_DOSSIERS`, `FOOTER_STUDIO_PHOTO`, `DEFAULT_CLOSING_PHOTO`, `DEFAULT_CONTACT_PHOTO`, `CONTACT_HERO_PHOTO`, `OFFICE_STUDIO_PHOTO`, or `SPECIALTY_OPTIONS`).
2. **Single Reader**: All copy and photo references live in `src/content/*` (in Spanish) and are resolved exclusively through `src/lib/content/index.ts` and `src/lib/content/photos.ts`.

### 7.3 Accessibility & Motion Contract

1. **Semantic Controls & Focus**: Every interactive element must be a native `<button>` or `<a>`/`<Link>` with an accessible label, `min-h-[44px]` touch target, and visible `:focus-visible` outline (`outline-none` without a replacement focus indicator is forbidden).
2. **Unified Modal Behavior**: Both `ProjectCaseStudyModal` and image lightboxes must trap keyboard focus (`Tab` / `Shift+Tab`), close on `Escape`, lock document scroll while open, and restore focus to the trigger element on close.
3. **Reduced Motion**: `prefers-reduced-motion: reduce` must be respected consistently in both `src/app/globals.css` and every GSAP `ScrollTrigger` / `RevealObserver` effect. Remove any stale comments claiming reduced motion is ignored.
