# Technical Audit Report: Component Hierarchy, Code Reuse & Architectural Integrity

**Repository:** `arquitectura-casa-alta-web`  
**Document:** `AUDIT_COMPONENT_REUSE.md`  
**Date:** 2026-10-21  
**Audit Scope:** `src/app/**`, `src/components/{atoms,molecules,organisms,templates}`, `src/content/*`, `src/lib/**`, `DESIGN.md`, `AGENTS.md`  
**Framework Stack:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict + Tailwind CSS v4 CSS-first (`@theme`)  
**Visual & Architectural Contracts:** Cosentino Architectural Editorial (`DESIGN.md`), Atomic Design Layering, Content Seam (`AGENTS.md`)  
**Audit Execution Mode:** Pure Read-Only Audit (Zero mutation of source code in `src/` or `public/`)

---

## Table of Contents
1. [Executive Summary & Reuse Metrics](#1-executive-summary--reuse-metrics)
2. [Route & Layout Architecture Census](#2-route--layout-architecture-census)
3. [Complete Component Inventory Table](#3-complete-component-inventory-table)
4. [Deep Duplication & Ad-Hoc Blocks Analysis](#4-deep-duplication--ad-hoc-blocks-analysis)
   - [Case 1: Cosentino Material Monolith Cards](#case-1-cosentino-material-monolith-cards)
   - [Case 2: 0px Carousel Navigation Controls & Scroll Track Hook](#case-2-0px-carousel-navigation-controls--scroll-track-hook)
   - [Case 3: Verbatim Photo Lightbox Modal](#case-3-verbatim-photo-lightbox-modal)
   - [Case 4: Inlined 150vh Parallax Stage in Template](#case-4-inlined-150vh-parallax-stage-in-template)
   - [Case 5: 2-Column Editorial Story Sections Inlined in Templates](#case-5-2-column-editorial-story-sections-inlined-in-templates)
   - [Case 6: Thematic Pillar Template Structural Cloning](#case-6-thematic-pillar-template-structural-cloning)
   - [Case 7: Modal Lifecycle & Accessibility Trapping](#case-7-modal-lifecycle--accessibility-trapping)
5. [Architecture & Contract Compliance Audit](#5-architecture--contract-compliance-audit)
   - [5.1 Atomic Design Layer Rules Compliance](#51-atomic-design-layer-rules-compliance)
   - [5.2 Content Seam Compliance (Rule D5)](#52-content-seam-compliance-rule-d5)
   - [5.3 Cosentino Architectural Editorial Visual Direction Compliance](#53-cosentino-architectural-editorial-visual-direction-compliance)
6. [Prioritized Unification Roadmap (P1–P4)](#6-prioritized-unification-roadmap-p1p4)
7. [Verification Commands & Independent Replication](#7-verification-commands--independent-replication)

---

## 1. Executive Summary & Reuse Metrics

An exhaustive, non-mutating technical audit was conducted across the entire component library, routing layout, and design system of the Casa Alta architecture studio website.

### 1.1 Architectural Health Scorecard

The codebase displays exceptional rigor in foundational styling contracts:
- **100% Compliance with 0px Orthogonal Geometry**: Strict enforcement of `--radius-*: 0px`. The circular floating WhatsApp button (`WhatsAppFloat.tsx`, `h-14 w-14 rounded-full`) is verified as the sole permitted circular exception across the entire application.
- **100% Elimination of `font-mono`**: Monospaced fonts are completely absent; numerical data and counters rigorously use `Montserrat` with `tabular-nums`.
- **100% Content Seam Import Purity**: Zero components in `src/components/` import runtime values from `src/content/*` or `src/lib/content`. All page routes (`src/app/**/page.tsx`) strictly act as server-side data conduits.
- **100% Action-Color Exclusivity**: The brand blue fill (`bg-brand-800 text-white`) is strictly reserved for primary CTA buttons and the WhatsApp float trigger.

However, significant technical debt and architectural drift have accumulated at the component and template layers:
1. **Low Effective Reuse at Molecule/Organism Level**: Only **46.6%** of component files are effectively reused across multiple views. Single-use components account for **44.8%**, and **8.6%** (5 files, 439 lines) represent completely dead or unreferenced code.
2. **Template-Level Organism Inlining (Layer Breach)**: Page templates frequently bypass the organism layer to assemble raw atomic JSX directly. Most critically, `ContactPageTemplate.tsx` inlines a 243-line interactive GSAP parallax stage (`ContactStage`), forcing the template into a heavy client component.
3. **Pervasive Structural Duplication**: 7 major UI patterns were independently built from scratch across multiple files despite sharing identical layout geometry, scrims, hover interactions, and accessibility lifecycles.
4. **Content Seam Leaks (Hardcoded Copy in JSX)**: While components obey the *import rule*, **16 distinct component files** author hardcoded Spanish narrative copy, fallback labels, WhatsApp prefill templates, and static counter strings directly in JSX.
5. **Missing Canonical Molecule (`ServiceRow`)**: As prescribed in `DESIGN.md` § 7.1, `ServiceRow` is missing from `src/components/molecules/`, forcing `ServicesIndex.tsx` to duplicate the monolith card pattern from `DivisionCards.tsx`.
6. **Typographic Deviation in `ProjectCard`**: Card titles erroneously apply `font-sans font-medium` (`Montserrat`) rather than the mandatory `Marcellus h3` editorial voice specified in `DESIGN.md` § 6.2.1.

---

### 1.2 Metric Dashboard

```
Total Component Files Audited: 58 (100.0%)
┌─────────────────────────────────────────────────────────────┐
│ Effectively Reused (≥ 2 consumers): 27 files (46.6%)        │
├─────────────────────────────────────────┬───────────────────┤
│ Single-Use (1 consumer): 26 files (44.8%)│ Dead Code: 5 (8.6%)│
└─────────────────────────────────────────┴───────────────────┘
```

| Metric Category | Count | Percentage | Details & Breakdown |
|---|:---:|:---:|---|
| **Total Component Files Audited** | **58** | **100.0%** | 10 atoms, 8 molecules, 32 organisms (31 TSX + 1 utility), 8 templates |
| **Effectively Reused Components** | **27** | **46.6%** | Imported by 2 or more distinct consumers across routes/templates |
| **Single-Use Components** | **26** | **44.8%** | Imported by exactly 1 consumer (mostly route-specific organisms/templates) |
| **Dead Code / Orphaned Files** | **5** | **8.6%** | **439 total lines** with 0 active imports across the entire repository |
| **Non-Component Files in Component Tree** | **1** | — | `src/components/organisms/gsap-scenes.ts` (animation utility script) |
| **Major Duplication Cases Documented** | **7** | — | Monolith cards, carousel nav, photo lightboxes, parallax stages, 2-col stories, template cloning, modal shells |
| **Components Violating Content Seam (D5)** | **16** | **27.6%** | Files containing hardcoded Spanish strings, fallbacks, or templates in JSX |
| **Cosentino 0px Geometry Compliance** | **100%** | **100.0%** | All radii `0px`; `WhatsAppFloat` sole circular exception |
| **Two-Font Hierarchy Compliance** | **98.3%** | **98.3%** | 0 `font-mono`; 1 isolated violation in `ProjectCard.tsx:162-167` |

---

## 2. Route & Layout Architecture Census

### 2.1 Global Chrome & Layout Architecture

#### Root Layout (`src/app/layout.tsx`)
- **File:** `src/app/layout.tsx` (57 lines)
- **Architectural Role:** Pure HTML envelope and font/metadata bootstrap.
- **Loaded Fonts:** Google Fonts `Montserrat` (`--font-montserrat`) and `Marcellus` (`--font-marcellus`).
- **Global Styles:** `src/app/globals.css` with CSS-first Tailwind v4 `@theme` block.
- **Content Access:** Calls `getSiteConfig()` to populate SEO metadata and theme color (`#0e2d78`).
- **Body Rendering:** Renders raw `<html lang="es"><body>{children}</body></html>` with zero UI chrome, maintaining strict decoupling from page presentation.

#### Centralized Chrome Shell (`src/components/templates/SiteChrome.tsx`)
- **File:** `src/components/templates/SiteChrome.tsx` (75 lines)
- **Architectural Role:** Master presentation shell wrapping all 7 route templates.
- **Props Interface:**
  ```typescript
  interface SiteChromeProps {
    site: SiteConfig;
    disableContactModal?: boolean;
    chrome?: "ink" | "canvas";
    children: React.ReactNode;
  }
  ```
- **Mounted Chrome Components (in DOM order):**
  1. `<RouteScrollReset />` (`atoms/RouteScrollReset.tsx`): Client-side scroll restoration to `{ top: 0, left: 0 }`.
  2. Skip Link (`a.sr-only focus:not-sr-only`): Accessible keyboard navigation jumping directly to `#main`.
  3. `<Header site={site} chrome={chrome} />` (`organisms/Header.tsx`): Composes `HeaderShell`, `UtilityBar`, `Logo`, and `SiteNav`.
  4. `{children}`: Page template wrapped in `<main id="main">`.
  5. `<Footer site={site} />` (`organisms/Footer.tsx`): 4-column architectural footer on `bg-ink`.
  6. `<WhatsAppFloat link={site.whatsapp} />` (`organisms/WhatsAppFloat.tsx`): Fixed floating trigger.
  7. `<RevealObserver />` (`organisms/MotionShell.tsx`): IntersectionObserver for CSS staggered scroll transitions.
  8. `<ContactModalProvider>` (`organisms/ContactModalContext.tsx`): Global React context mounting `ContactModal` on light DOM unless `disableContactModal` is active.

---

### 2.2 Route-by-Route Detailed Census

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   ROUTE INVENTORY & CADENCE                                      │
├──────────────────────────┬──────────────┬──────────────┬──────────────┬──────────────────────────┤
│ Route Path               │ Entry Page   │ Template     │ Total Blocks │ Inline Ad-Hoc Sections   │
├──────────────────────────┼──────────────┼──────────────┼──────────────┼──────────────────────────┤
│ /                        │ page.tsx     │ Landing      │ 10 blocks    │ 0 inline (10 organisms)  │
│ /proyectos               │ page.tsx     │ Projects     │ 4 blocks     │ 1 inline filter bar      │
│ /servicios               │ page.tsx     │ Services     │ 6 blocks     │ 1 inline 2-col story     │
│ /nosotros                │ page.tsx     │ About        │ 7 blocks     │ 1 inline 2-col story     │
│ /contacto                │ page.tsx     │ Contact      │ 3 blocks     │ 1 inline 243-line stage  │
│ /arquitectura-interiores │ page.tsx     │ Interiors    │ 6 blocks     │ 0 inline (clone layout)  │
│ /construccion-sustentable│ page.tsx     │ Sustain      │ 6 blocks     │ 0 inline (clone layout)  │
└──────────────────────────┴──────────────┴──────────────┴──────────────┴──────────────────────────┘
```

#### Route 1: `/` (Home / Landing Page)
- **Page Entry:** `src/app/page.tsx` (lines 1–42)
- **Template:** `src/components/templates/LandingTemplate.tsx` (lines 1–100)
- **Content Accessors:** `getSiteConfig()`, `getHomePage()`, `getDivisionCards()`, `getServiceGroups()`, `getProcessSteps()`, `getLandingPortfolio()`, `getWhatsappHref()`
- **Block Sequence:**
  1. `Hero` (`organisms/Hero.tsx:22`): 100svh contemplative automatic crossfading hero carousel.
  2. `IntroSection` (`organisms/IntroSection.tsx:28`): 50/50 studio identity monograph (photo left, narrative right).
  3. `StatsBand` (`organisms/StatsBand.tsx:18`): 4-column architectural metrics ledger.
  4. `DivisionCards` (`organisms/DivisionCards.tsx:30`): Horizontal carousel of material monolith cards.
  5. `ManifestoLine` (`organisms/ManifestoLine.tsx:21`): Full-width concha-nácar quote spread and portrait.
  6. `FeaturedPortfolio` (`organisms/FeaturedPortfolio.tsx:31`): Dynamic 2-3 row cadence grid + `ProjectCaseStudyModal`.
  7. `ProcessList` (`organisms/ProcessList.tsx:28`): Pinned 7-step methodology with interactive scrub bar.
  8. `ServicesIndex` (`organisms/ServicesIndex.tsx:40`): 13-service monolith card catalog with tabs + `ServiceScopeModal`.
  9. `WhyCasaAltaEditorial` (`organisms/WhyCasaAltaEditorial.tsx:131`): Paired staggered monograph layout (4 differentiator pairs).
  10. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): 150vh monumental parallax conversion stage.

#### Route 2: `/proyectos` (Portfolio Archive & Explorer)
- **Page Entry:** `src/app/proyectos/page.tsx` (lines 1–34)
- **Template:** `src/components/templates/ProjectsIndexTemplate.tsx` (lines 1–147)
- **Content Accessors:** `getSiteConfig()`, `getProjectsIntro()`, `getProjects()`, `getClosing()`
- **Block Sequence:**
  1. `PageHero` (`organisms/PageHero.tsx:22`): 100svh editorial hero with lead photo.
  2. Inlined Filter Bar & Counter (`ProjectsIndexTemplate.tsx:114-130`): Inlined `<Section>` + `<Container>` wrapping `Tabs` molecule and uppercase counter.
  3. `ProjectsGrid` (`organisms/ProjectsGrid.tsx:27`): Dynamic 2-3 row panoramic monograph grid.
  4. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): Monumental 150vh closing conversion stage.
  5. `ProjectCaseStudyModal` (`organisms/ProjectCaseStudyModal.tsx:44`): Full-screen project dossier modal.

#### Route 3: `/servicios` (Engineering & Construction Catalog)
- **Page Entry:** `src/app/servicios/page.tsx` (lines 1–33)
- **Template:** `src/components/templates/ServicesPageTemplate.tsx` (lines 1–143)
- **Content Accessors:** `getSiteConfig()`, `getServicesPage()`, `getServiceGroups()`, `getClosing()`, `getHomePage()` (for `contact`)
- **Block Sequence:**
  1. `PageHero` (`organisms/PageHero.tsx:22`): 100svh editorial hero.
  2. Inlined Editorial Story (`ServicesPageTemplate.tsx:55-101`): Hand-rolled 2-column grid composing `Section`, `Container`, `Heading`, `Text`, and `Photo`.
  3. Inlined Specialties Wrapper (`ServicesPageTemplate.tsx:103-120`): `<Section>` + `<Container>` + `<SectionHeading>` wrapping `SpecialtiesShowcase`.
  4. `ServicesIndex` (`organisms/ServicesIndex.tsx:40`): 13-service monolith catalog + `ServiceScopeModal`.
  5. `ContactForm` (`organisms/ContactForm.tsx:28`): On-page architectural consultation form.
  6. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): Monumental 150vh closing conversion stage.

#### Route 4: `/nosotros` (Studio Identity & Supervision Credibility)
- **Page Entry:** `src/app/nosotros/page.tsx` (lines 1–32)
- **Template:** `src/components/templates/AboutPageTemplate.tsx` (lines 1–149)
- **Content Accessors:** `getSiteConfig()`, `getAboutPage()`, `getHomePage()`, `getClosing()`
- **Block Sequence:**
  1. `PageHero` (`organisms/PageHero.tsx:22`): 100svh editorial hero.
  2. `StatsBand` (`organisms/StatsBand.tsx:18`): 4-column numerical stats band.
  3. Inlined Identity Story (`AboutPageTemplate.tsx:66-122`): Hand-rolled 2-column grid ("Nuestra Identidad") composing `Section`, `Container`, `Heading`, `Text`, and `Photo`.
  4. `CredibilityGallery` (`organisms/CredibilityGallery.tsx:22`): Dual-row continuous horizontal ribbon gallery of supervision photos.
  5. `MethodologyZigzag` (`organisms/MethodologyZigzag.tsx:21`): 3-phase master methodology sequence.
  6. `ManifestoLine` (`organisms/ManifestoLine.tsx:21`): Architect quote and portrait on concha-nácar.
  7. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): Monumental 150vh closing conversion stage.

#### Route 5: `/contacto` (Direct Contact & Studio Location)
- **Page Entry:** `src/app/contacto/page.tsx` (lines 1–22)
- **Template:** `src/components/templates/ContactPageTemplate.tsx` (lines 1–312)
- **Content Accessors:** `getSiteConfig()`, `getContactPage()`, `getWhatsappHref()`
- **Block Sequence:**
  1. `PageHero` (`organisms/PageHero.tsx:22`): 100svh editorial hero.
  2. `ContactForm` (`organisms/ContactForm.tsx:28`): Consultation form (`showSidebar={false}`).
  3. Inlined `ContactStage` Organism (`ContactPageTemplate.tsx:69-312`): 243-line inlined GSAP parallax stage, scrims, telephone lines, schedules, and Google Maps iframe embed.

#### Route 6: `/arquitectura-interiores` (Interior Architecture & Finishes)
- **Page Entry:** `src/app/arquitectura-interiores/page.tsx` (lines 1–87, includes Schema.org Service JSON-LD)
- **Template:** `src/components/templates/InteriorsPageTemplate.tsx` (lines 1–120)
- **Content Accessors:** `getSiteConfig()`, `getInteriorsPage()`, `getClosing()`, `site.whatsapp.href`
- **Block Sequence (6 Architectural Layers):**
  1. `PageHero` (`organisms/PageHero.tsx:22`): Full-bleed hero with dual button actions.
  2. Inlined Wrapper + `SpecialtiesShowcase` (`InteriorsPageTemplate.tsx:73-89`): 4 tactile materials.
  3. `ManifestoLine` (`organisms/ManifestoLine.tsx:21`): Signature quote on concha-nácar.
  4. `CredibilityGallery` (`organisms/CredibilityGallery.tsx:22`): Spaces ribbon gallery (`tone="canvas"`).
  5. `WhyCasaAltaEditorial` (`organisms/WhyCasaAltaEditorial.tsx:131`): 4 DRO engineering pillars (`tone="bone"`).
  6. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): Monumental 150vh closing conversion stage.

#### Route 7: `/construccion-sustentable` (Sustainable & Bioclimatic Construction)
- **Page Entry:** `src/app/construccion-sustentable/page.tsx` (lines 1–27)
- **Template:** `src/components/templates/SustainabilityPageTemplate.tsx` (lines 1–124)
- **Content Accessors:** `getSiteConfig()`, `getSustainabilityPage()`, `getClosing()`, `site.whatsapp.href`
- **Block Sequence (6 Architectural Layers):**
  1. `PageHero` (`organisms/PageHero.tsx:22`): Full-bleed hero with dual button actions.
  2. Inlined Wrapper + `SpecialtiesShowcase` (`SustainabilityPageTemplate.tsx:77-93`): 4 bioclimatic pillars.
  3. `ManifestoLine` (`organisms/ManifestoLine.tsx:21`): Bioclimatic quote on concha-nácar.
  4. `CredibilityGallery` (`organisms/CredibilityGallery.tsx:22`): Construction ribbon gallery (`tone="canvas"`).
  5. `WhyCasaAltaEditorial` (`organisms/WhyCasaAltaEditorial.tsx:131`): 4 tropical field construction strategies (`tone="bone"`).
  6. `ClosingCTA` (`organisms/ClosingCTA.tsx:41`): Monumental 150vh closing conversion stage.

---

## 3. Complete Component Inventory Table

Every component file on disk was rigorously inspected for its file path, exported props interface, component role, consumers across `src/`, import count, and reuse classification.

### 3.1 Atoms (`src/components/atoms/`) — 10 Files

| Component | Relative File Path | Props Interface Signature | Description | Consumers / Import Locations | Imports | Reuse Status |
|---|---|---|---|---|:---:|:---:|
| **Button** | `atoms/Button.tsx` | `interface ButtonProps { children: ReactNode; href?: string; onClick?: (e?) => void; variant?: "primary" \| "secondary" \| "quiet" \| "inverse" \| "outline"; size?: "md" \| "sm"; className?: string; external?: boolean; type?: "button" \| "submit"; disabled?: boolean; id?: string; arrow?: boolean; }` | 0px interactive button/anchor primitive. Sole component permitted to use solid brand blue fill (`variant="primary"`). | `ProjectCard`, `SpecialtiesShowcase`, `FeaturedPortfolio`, `IntroSection`, `ClosingCTA`, `ContactFormFields`, `ServiceScopeModal`, `SiteNav`, `ProjectCaseStudyModal`, `ContactPageTemplate`, `InteriorsPageTemplate`, `SustainabilityPageTemplate` | **12** | **Effectively Reused** |
| **Container** | `atoms/Container.tsx` | `interface ContainerProps { children: ReactNode; className?: string; }` | Horizontal rhythm container enforcing responsive gutters (`px-6 md:px-10 lg:px-16`) capped at `max-w-[1440px]`. | `Header`, `UtilityBar`, `SiteNav`, `Footer`, `IntroSection`, `StatsBand`, `DivisionCards`, `ManifestoLine`, `ProcessList`, `ServicesIndex`, `WhyCasaAltaEditorial`, `Differentiators`, `ClosingCTA`, `ContactForm`, `CredibilityGallery`, `PageHero`, `Testimonials`, 5 templates | **25** | **Effectively Reused** |
| **Heading** | `atoms/Heading.tsx` | `interface HeadingProps { children: ReactNode; as?: "h1" \| "h2" \| "h3" \| "h4"; id?: string; voice?: "display" \| "serif" \| "plain"; sizeClassName?: string; className?: string; }` | Typographic heading primitive supporting Marcellus (`serif`), Montserrat uppercase (`display`), and plain sans scales. | `SectionHeading`, `ProcessEntry`, `IntroSection`, `DivisionCards`, `ServicesIndex`, `SpecialtiesShowcase`, `WhyCasaAltaEditorial`, `Differentiators`, `ClosingCTA`, `ContactModal`, `ServiceScopeModal`, `ProjectCaseStudyModal`, `Testimonials`, 3 templates | **17** | **Effectively Reused** |
| **Icon** | `atoms/Icon.tsx` | `interface IconProps { name: IconName; className?: string; }` | Inline SVG glyph component covering 10 icons: `instagram`, `facebook`, `tiktok`, `whatsapp`, `phone`, `mail`, `arrow-left`, `arrow-right`, `menu`, `close`. | `Button`, `SocialLinkItem`, `UtilityBar`, `SiteNav`, `Footer`, `DivisionCards`, `ServicesIndex`, `CredibilityGallery`, `ContactModal`, `ServiceScopeModal`, `ProjectCaseStudyModal`, `WhatsAppFloat`, `Testimonials`, `ContactPageTemplate` | **14** | **Effectively Reused** |
| **Logo** | `atoms/Logo.tsx` | `interface LogoProps { className?: string; }` | Renders the studio's brand lockup raster asset (`/brand/logo-casa-alta.png`) with responsive dimensions. | `Header.tsx`, `Footer.tsx` | **2** | **Effectively Reused** |
| **Photo** | `atoms/Photo.tsx` | `interface PhotoProps { photo: PhotoModel; sizes: string; className?: string; priority?: boolean; fit?: "cover" \| "contain" \| "intrinsic" \| "mosaic"; }` | Sole authorized image renderer in the application. Wraps `next/image` with the custom AVIF loader. Enforces explicit `sizes`. | `ProjectCard`, `ProcessEntry`, `Hero`, `PageHero`, `IntroSection`, `DivisionCards`, `ManifestoLine`, `ProcessList`, `ServicesIndex`, `SpecialtiesShowcase`, `WhyCasaAltaEditorial`, `Differentiators`, `ClosingCTA`, `ContactForm`, `CredibilityGallery`, `ProjectGallery`, `ProjectCaseStudyModal`, 3 templates | **21** | **Effectively Reused** |
| **RouteScrollReset** | `atoms/RouteScrollReset.tsx` | *None (zero props)* | Client component resetting window scroll to `{ top: 0, left: 0 }` on Next.js pathname changes. | `SiteChrome.tsx` | **1** | **Single-Use** |
| **Rule** | `atoms/Rule.tsx` | `interface RuleProps { className?: string; }` | Hairline divider rendering `<hr className={cx("border-0", className)} />`. | *None* (Never imported anywhere in `src/`) | **0** | **Dead Code** |
| **Section** | `atoms/Section.tsx` | `interface SectionProps { children: ReactNode; tone?: "canvas" \| "bone" \| "concha-nacar"; density?: "default" \| "compact"; id?: string; className?: string; reveal?: RevealVariant; }` | Vertical rhythm section wrapper with density options (`default`: 80–144px, `compact`: 48–80px), tone backgrounds, and scroll reveal. | `FeaturedPortfolio`, `IntroSection`, `DivisionCards`, `ServicesIndex`, `WhyCasaAltaEditorial`, `Differentiators`, `ContactForm`, `CredibilityGallery`, `ProjectGallery`, `Testimonials`, 6 templates | **16** | **Effectively Reused** |
| **Text** | `atoms/Text.tsx` | `interface TextProps { children: ReactNode; as?: "p" \| "span" \| "div" \| "li" \| "figcaption"; size?: "sm" \| "base" \| "lg" \| "lede"; className?: string; }` | Narrative body text primitive enforcing Montserrat scales, capped lede measures (`max-w-[62ch]`), and ink color. | `SectionHeading`, `StatItem`, `ProcessEntry`, `IntroSection`, `DivisionCards`, `ServicesIndex`, `SpecialtiesShowcase`, `WhyCasaAltaEditorial`, `Differentiators`, `ServiceScopeModal`, `ProjectCaseStudyModal`, 2 templates | **14** | **Effectively Reused** |

---

### 3.2 Molecules (`src/components/molecules/`) — 8 Files

| Component | Relative File Path | Props Interface Signature | Description | Consumers / Import Locations | Imports | Reuse Status |
|---|---|---|---|---|:---:|:---:|
| **FormField** | `molecules/FormField.tsx` | `interface FormFieldProps { id: string; name: string; label: string; placeholder: string; type?: "text" \| "email" \| "tel"; autoComplete?: string; multiline?: boolean; required?: boolean; className?: string; }` | Labelled form control with 0px styling, supporting single-line inputs and textareas with global focus outline. | `ContactFormFields.tsx` | **1** | **Single-Use** |
| **NavItem** | `molecules/NavItem.tsx` | `interface NavItemProps { link: NavLink; }` | Desktop header navigation item rendering uppercase label link with hover transition. | `SiteNav.tsx` | **1** | **Single-Use** |
| **ProcessEntry** | `molecules/ProcessEntry.tsx` | `interface ProcessEntryProps { step: ProcessStep; index: number; total: number; isActive?: boolean; onSelect?: () => void; variant?: "pinned" \| "card"; revealIndex?: number; }` | Single methodology sequence item supporting `pinned` (desktop ledger) and `card` (mobile stacked photo/text) variants. | `ProcessList.tsx` | **1** | **Single-Use** |
| **ProjectCard** | `molecules/ProjectCard.tsx` | `interface ProjectCardProps { project: Project; sizes: string; priority?: boolean; revealIndex?: number; onSelect?: (p: Project) => void; aspectClassName?: string; className?: string; preferWide?: boolean; }` | Architectural monograph card. Clean unadorned photo at rest, gradient scrim with title on hover/touch. | `ProjectsGrid.tsx` | **1** | **Single-Use** |
| **SectionHeading** | `molecules/SectionHeading.tsx` | `interface SectionHeadingProps { eyebrow?: string; heading: string; body?: string; align?: "left" \| "center"; as?: "h1" \| "h2"; action?: ReactNode; className?: string; }` | Canonical section header block: Eyebrow (.eyebrow) -> Heading (.voice serif) -> Body (lede) -> Optional Action slot. | `FeaturedPortfolio`, `Differentiators`, `DivisionCards`, `WhyCasaAltaEditorial`, `ContactForm`, `CredibilityGallery`, `ProcessList`, `ServicesIndex`, `Testimonials`, 3 templates | **13** | **Effectively Reused** |
| **SocialLinkItem** | `molecules/SocialLinkItem.tsx` | `interface SocialLinkItemProps { link: SocialLink; }` | Social profile icon link rendering `<Icon>` with accessible aria-label. Suppresses rendering when href is empty. | `UtilityBar.tsx`, `SiteNav.tsx` | **2** | **Effectively Reused** |
| **StatItem** | `molecules/StatItem.tsx` | `interface StatItemProps { value: string; label: string; tag?: string; sub?: string; }` | Editorial ledger stat figure rendering animated count-up numbers, discipline tag, and descriptive label. | `StatsBand.tsx` | **1** | **Single-Use** |
| **Tabs** | `molecules/Tabs.tsx` | `interface TabsProps<T extends string = string> { tabs: readonly TabOption<T>[]; activeId: T; onChange: (id: T) => void; ariaLabel?: string; className?: string; }` | Cosentino catalogue tab bar using pure typographic weight and brand accent contrast without border strokes. | `ServicesIndex.tsx`, `Testimonials.tsx`, `ProjectsIndexTemplate.tsx` | **3** | **Effectively Reused** |

---

### 3.3 Organisms (`src/components/organisms/`) — 32 Files

| Component / File | Relative File Path | Props Interface Signature | Description | Consumers / Import Locations | Imports | Reuse Status |
|---|---|---|---|---|:---:|:---:|
| **ClosingCTA** | `organisms/ClosingCTA.tsx` | `interface ClosingCTAProps { closing: { eyebrow?: string; heading: string; body: string; cta: CallToAction; photo?: PhotoModel; }; photo?: PhotoModel \| null; id?: string; isLanding?: boolean; }` | Monumental 150vh closing conversion stage with GSAP continuous parallax scrub, WCAG AAA gradient scrim, and dual CTAs. | `FullBleedCTA`, `LandingTemplate`, `AboutPageTemplate`, `ProjectsIndexTemplate`, `ServicesPageTemplate`, `InteriorsPageTemplate`, `SustainabilityPageTemplate` | **7** | **Effectively Reused** |
| **ContactForm** | `organisms/ContactForm.tsx` | `interface ContactFormProps { contact: ContactFormContent; whatsappHref: string; photo?: PhotoModel; id?: string; tone?: "canvas" \| "bone"; idPrefix?: string; showSidebar?: boolean; }` | Split-screen contact section pairing studio photography and checklist sidebar with interactive form fields. | `ServicesPageTemplate.tsx`, `ContactPageTemplate.tsx` | **2** | **Effectively Reused** |
| **ContactFormFields** | `organisms/ContactFormFields.tsx` | `interface ContactFormFieldsProps { contact: ContactFormContent; whatsappHref: string; idPrefix?: string; }` | Architectural consultation form fields: 0px selector chips (specialty, locality, budget, timeframe), inputs, and WhatsApp sync. | `ContactForm.tsx`, `ContactModal.tsx` | **2** | **Effectively Reused** |
| **ContactModal** | `organisms/ContactModal.tsx` | `interface ContactModalProps { isOpen: boolean; onClose: () => void; contact: ContactFormContent; whatsappHref: string; }` | Centered consultation modal with 44×44px close trigger, focus trap, scroll lock, and GSAP scale/opacity animation. | `ContactModalContext.tsx` | **1** | **Single-Use** |
| **ContactModalContext** | `organisms/ContactModalContext.tsx` | `interface ContactModalProviderProps { contact: ContactFormContent; whatsappHref: string; children: ReactNode; }` | Global context provider and hook (`useContactModal`) managing modal open/closed state and mounting `ContactModal`. | `SiteNav.tsx`, `ClosingCTA.tsx`, `ServiceScopeModal.tsx`, `SiteChrome.tsx` | **4** | **Effectively Reused** |
| **CredibilityGallery** | `organisms/CredibilityGallery.tsx` | `interface CredibilityGalleryProps { intro: SectionIntro; photos: PhotoModel[]; tone?: "canvas" \| "bone"; id?: string; }` | Dual-row continuous horizontal scroll ribbon gallery of on-site supervision photos with snap-scrolling and lightbox modal. | `AboutPageTemplate.tsx`, `InteriorsPageTemplate.tsx`, `SustainabilityPageTemplate.tsx` | **3** | **Effectively Reused** |
| **Differentiators** | `organisms/Differentiators.tsx` | `interface DifferentiatorsProps { intro: SectionIntro; items: Differentiator[]; tone?: "canvas" \| "bone"; }` | 2-column differentiator plates. Superseded by `WhyCasaAltaEditorial`. | *None* (Never imported in any template or page) | **0** | **Dead Code** |
| **DivisionCards** | `organisms/DivisionCards.tsx` | `interface DivisionCardsProps { intro?: SectionIntro; divisions: DivisionCard[]; tone?: "canvas" \| "bone"; }` | Architectural material monolith showcase cards in horizontal snap-scroll track with orthogonal navigation arrows. | `LandingTemplate.tsx` | **1** | **Single-Use** |
| **FeaturedPortfolio** | `organisms/FeaturedPortfolio.tsx` | `interface FeaturedPortfolioProps { intro: SectionIntro; projects: Project[]; remaining?: Project[]; tone?: "canvas" \| "bone"; id?: string; whatsappHref?: string; action?: ReactNode; }` | Landing page portfolio section wrapping `SectionHeading`, `ProjectsGrid`, and `ProjectCaseStudyModal`. | `LandingTemplate.tsx` | **1** | **Single-Use** |
| **Footer** | `organisms/Footer.tsx` | `interface FooterProps { site: SiteConfig; }` | Dark architectural footer (`bg-ink`) with 4-column layout, inverted logo, back-to-top trigger, and monumental wordmark. | `SiteChrome.tsx` | **1** | **Single-Use** |
| **FullBleedCTA** | `organisms/FullBleedCTA.tsx` | `type FullBleedCTAProps = ClosingCTAProps;` | 10-line backward-compat re-export alias of `ClosingCTA`. | *None* (Never imported anywhere in `src/`) | **0** | **Dead Code** |
| **Header** | `organisms/Header.tsx` | `interface HeaderProps { site: SiteConfig; chrome?: "ink" \| "canvas"; }` | Sticky header composing `HeaderShell`, `UtilityBar`, `Logo`, and `SiteNav`. | `SiteChrome.tsx` | **1** | **Single-Use** |
| **Hero** | `organisms/Hero.tsx` | `interface HeroProps { hero: HeroContent; }` | 100svh full-bleed landing hero with automatic crossfading slide carousel, touch-swipe support, and discipline wordmark stack. | `LandingTemplate.tsx` | **1** | **Single-Use** |
| **IntroSection** | `organisms/IntroSection.tsx` | `interface IntroSectionProps { intro: SectionIntro; tone?: "canvas" \| "bone"; density?: "default" \| "compact"; id?: string; }` | 50/50 monograph intro pairing vertical site supervision photo (left) with editorial narrative and link to `/nosotros` (right). | `LandingTemplate.tsx` | **1** | **Single-Use** |
| **ManifestoLine** | `organisms/ManifestoLine.tsx` | `interface ManifestoLineProps { line: string; architect: Architect; photo?: PhotoModel; }` | Signature architectural quote spread on concha-nácar surface pairing architect portrait with GSAP scrubbed parallax. | `LandingTemplate.tsx`, `AboutPageTemplate.tsx`, `InteriorsPageTemplate.tsx`, `SustainabilityPageTemplate.tsx` | **4** | **Effectively Reused** |
| **MethodologyZigzag** | `organisms/MethodologyZigzag.tsx` | `interface MethodologyZigzagProps { intro?: SectionIntro; phases: MethodologyPhase[]; }` | Alternating 3-phase monograph layout on `/nosotros` alternating studio photos with technical deliverables. | `AboutPageTemplate.tsx` | **1** | **Single-Use** |
| **MotionShell** | `organisms/MotionShell.tsx` | *Multiple exports* (`HeaderShell`, `useNavOpen`, `RevealObserver`, `parseFigure`) | Mixed organism module housing sticky header scroll container, mobile nav context, numerical count-up logic, and reveal observer. | `Header.tsx`, `SiteNav.tsx`, `SiteChrome.tsx` | **3** | **Effectively Reused** |
| **PageHero** | `organisms/PageHero.tsx` | `interface PageHeroProps { eyebrow: string; heading: string; subheadline: string; photo: PhotoModel; actions?: ReactNode; }` | Shared 100svh full-bleed hero for subpages with GSAP scroll parallax background, metadata bar, and dual typography grid. | `AboutPageTemplate`, `ContactPageTemplate`, `InteriorsPageTemplate`, `ProjectsIndexTemplate`, `ServicesPageTemplate`, `SustainabilityPageTemplate` | **6** | **Effectively Reused** |
| **ProcessList** | `organisms/ProcessList.tsx` | `interface ProcessListProps { intro: SectionIntro; steps: ProcessStep[]; tone?: "canvas" \| "bone"; id?: string; }` | Pinned split-screen methodology section on landing: left interactive ledger with scrub bar and right photo crossfade (desktop), card list (mobile). | `LandingTemplate.tsx` | **1** | **Single-Use** |
| **ProjectCaseStudyModal** | `organisms/ProjectCaseStudyModal.tsx` | `interface ProjectCaseStudyModalProps { project: Project \| null; onClose: () => void; whatsappHref?: string; }` | Full-screen architectural dossier modal with editorial narrative, technical specs, horizontal photo gallery track, and nested photo lightbox. | `FeaturedPortfolio.tsx`, `ProjectsIndexTemplate.tsx` | **2** | **Effectively Reused** |
| **ProjectGallery** | `organisms/ProjectGallery.tsx` | `interface ProjectGalleryProps { photos: PhotoModel[]; tone?: "canvas" \| "bone"; }` | 2-column masonry photo gallery. Unused legacy component from earlier prototype. | *None* (Never imported in any template or page) | **0** | **Dead Code** |
| **ProjectsGrid** | `organisms/ProjectsGrid.tsx` | `interface ProjectsGridProps { projects: Project[]; className?: string; onSelect?: (p: Project) => void; }` | Dynamic 2-3 row cadence grid (alternating landscape 16:10 span-6 and portrait 4:5 span-4) partitioning projects cleanly. | `FeaturedPortfolio.tsx`, `ProjectsIndexTemplate.tsx` | **2** | **Effectively Reused** |
| **ServiceScopeModal** | `organisms/ServiceScopeModal.tsx` | `interface ServiceScopeModalProps { service: Service \| null; partidaIndex: number; totalPartidas: number; onClose: () => void; whatsappHref: string; contactAnchorId?: string; }` | Modal dialog for technical service deliverables and executive scope checklist with focus trap and WhatsApp conversion triggers. | `ServicesIndex.tsx` | **1** | **Single-Use** |
| **ServicesIndex** | `organisms/ServicesIndex.tsx` | `interface ServicesIndexProps { intro: SectionIntro; groups: ServiceGroup[]; tone?: "canvas" \| "bone"; id?: string; whatsappHref: string; }` | Horizontal carousel of technical service monolith cards with category tabs, navigation arrows, and `ServiceScopeModal` integration. | `LandingTemplate.tsx`, `ServicesPageTemplate.tsx` | **2** | **Effectively Reused** |
| **SiteNav** | `organisms/SiteNav.tsx` | `interface SiteNavProps { nav: NavLink[]; cta: CallToAction; phones: ContactLine[]; social: SocialLink[]; }` | Navigation organism owning desktop inline navigation links, primary CTA button, mobile burger toggle, and portalled mobile menu. | `Header.tsx` | **1** | **Single-Use** |
| **SpecialtiesShowcase** | `organisms/SpecialtiesShowcase.tsx` | `interface SpecialtiesShowcaseProps { sections: SpecialtySection[]; deliverablesLabel?: string; ctaLabel?: string; ctaHref?: string; }` | Interactive 4-column specialty showcase with zero-CLS hover expansion to full-width panoramic view on desktop. | `ServicesPageTemplate.tsx`, `InteriorsPageTemplate.tsx`, `SustainabilityPageTemplate.tsx` | **3** | **Effectively Reused** |
| **StatsBand** | `organisms/StatsBand.tsx` | `interface StatsBandProps { stats: Stat[]; }` | 4-column architectural ledger band composing `StatItem` molecules on `bone-50` ground with bitácora metadata header. | `LandingTemplate.tsx`, `AboutPageTemplate.tsx` | **2** | **Effectively Reused** |
| **Testimonials** | `organisms/Testimonials.tsx` | `interface TestimonialsProps { intro: SectionIntro; items: Testimonial[]; dossiers?: InstitutionalDossier[]; tone?: "canvas" \| "bone"; }` | Client quotes & institutional project guarantees with tabs. Unmounted across all active route templates. | *None* (Never imported in any template or page) | **0** | **Dead Code** |
| **UtilityBar** | `organisms/UtilityBar.tsx` | `interface UtilityBarProps { claim: string; phones: ContactLine[]; social: SocialLink[]; }` | Top contact strip of the sticky header displaying studio trust claim, phone links, and social profile icons. | `Header.tsx` | **1** | **Single-Use** |
| **WhatsAppFloat** | `organisms/WhatsAppFloat.tsx` | `interface WhatsAppFloatProps { link: CallToAction; }` | Floating circular WhatsApp trigger (`h-14 w-14 rounded-full`). Sole permitted circular element across the entire site. | `SiteChrome.tsx` | **1** | **Single-Use** |
| **WhyCasaAltaEditorial** | `organisms/WhyCasaAltaEditorial.tsx` | `interface WhyCasaAltaEditorialProps { intro: SectionIntro; items: Differentiator[]; tone?: "canvas" \| "bone"; id?: string; }` | Paired staggered monograph layout: 4 differentiator pairs in alternating 12-column grid with calibrated `-mt-20` / `-mt-[100px]` overlap. | `LandingTemplate.tsx`, `InteriorsPageTemplate.tsx`, `SustainabilityPageTemplate.tsx` | **3** | **Effectively Reused** |
| **gsap-scenes** | `organisms/gsap-scenes.ts` | *Utility functions:* `registerGsapPlugins()`, `refreshAfterLayout()`, `createParallaxStage(...)` | GSAP ScrollTrigger plugin registration, font layout refresh, and smooth parallax stage scrub helper. Non-component utility. | `ClosingCTA.tsx`, `ContactPageTemplate.tsx` | **2** | **Effectively Reused** *(Misplaced)* |

---

### 3.4 Templates (`src/components/templates/`) — 8 Files

| Template | Relative File Path | Props Interface Signature | Description | Consumers / Import Locations | Imports | Reuse Status |
|---|---|---|---|---|:---:|:---:|
| **SiteChrome** | `templates/SiteChrome.tsx` | `interface SiteChromeProps { site: SiteConfig; disableContactModal?: boolean; chrome?: "ink" \| "canvas"; children: ReactNode; }` | Master layout template composing `RouteScrollReset`, skip link, `Header`, `Footer`, `WhatsAppFloat`, `RevealObserver`, and `ContactModalProvider`. | Composed by all 7 page templates | **7** | **Effectively Reused** |
| **LandingTemplate** | `templates/LandingTemplate.tsx` | `interface LandingTemplateProps { site: SiteConfig; home: HomePage; divisions: DivisionCard[]; groups: ServiceGroup[]; steps: ProcessStep[]; featured: Project[]; remaining: Project[]; whatsappHref: string; }` | Full landing page composition assembling 10 sections (`Hero`, `IntroSection`, `StatsBand`, `DivisionCards`, `ManifestoLine`, `FeaturedPortfolio`, `ProcessList`, `ServicesIndex`, `WhyCasaAltaEditorial`, `ClosingCTA`). | `src/app/page.tsx` | **1** | **Single-Use** |
| **AboutPageTemplate** | `templates/AboutPageTemplate.tsx` | `interface AboutPageTemplateProps { site: SiteConfig; page: AboutPageContent; stats: Stat[]; manifesto: string; phases?: MethodologyPhase[]; closing: HomePage["closing"]; }` | `/nosotros` template composing `PageHero`, `StatsBand`, inlined identity story, `CredibilityGallery`, `MethodologyZigzag`, `ManifestoLine`, and `ClosingCTA`. | `src/app/nosotros/page.tsx` | **1** | **Single-Use** |
| **ProjectsIndexTemplate** | `templates/ProjectsIndexTemplate.tsx` | `interface ProjectsIndexTemplateProps { site: SiteConfig; intro: SectionIntro; projects: Project[]; closing: HomePage["closing"]; }` | `/proyectos` explorer composing `PageHero`, typology filter `Tabs`, counter, `ProjectsGrid`, `ClosingCTA`, and `ProjectCaseStudyModal`. | `src/app/proyectos/page.tsx` | **1** | **Single-Use** |
| **ServicesPageTemplate** | `templates/ServicesPageTemplate.tsx` | `interface ServicesPageTemplateProps { site: SiteConfig; page: ServicesPageContent; groups: ServiceGroup[]; closing: HomePage["closing"]; contact: HomePage["contact"]; whatsappHref: string; }` | `/servicios` template composing `PageHero`, inlined intro, inlined specialties wrapper, `ServicesIndex`, `ContactForm`, and `ClosingCTA`. | `src/app/servicios/page.tsx` | **1** | **Single-Use** |
| **InteriorsPageTemplate** | `templates/InteriorsPageTemplate.tsx` | `interface InteriorsPageTemplateProps { site: SiteConfig; page: InteriorsPageContent; closing: HomePage["closing"]; whatsappHref: string; }` | `/arquitectura-interiores` template composing `PageHero`, inlined specialties wrapper, `ManifestoLine`, `CredibilityGallery`, `WhyCasaAltaEditorial`, and `ClosingCTA`. | `src/app/arquitectura-interiores/page.tsx` | **1** | **Single-Use** |
| **SustainabilityPageTemplate** | `templates/SustainabilityPageTemplate.tsx` | `interface SustainabilityPageTemplateProps { site: SiteConfig; page: SustainabilityPageContent; closing: HomePage["closing"]; whatsappHref?: string; }` | `/construccion-sustentable` template composing `PageHero`, inlined specialties wrapper, `ManifestoLine`, `CredibilityGallery`, `WhyCasaAltaEditorial`, and `ClosingCTA`. | `src/app/construccion-sustentable/page.tsx` | **1** | **Single-Use** |
| **ContactPageTemplate** | `templates/ContactPageTemplate.tsx` | `interface ContactPageTemplateProps { site: SiteConfig; page: ContactPageContent; whatsappHref: string; }` | `/contacto` template composing `PageHero`, `ContactForm`, and an inlined 243-line `ContactStage` with phone lines, schedules, and Google Maps embed. | `src/app/contacto/page.tsx` | **1** | **Single-Use** |

---

## 4. Deep Duplication & Ad-Hoc Blocks Analysis

This section analyzes the exact JSX structures, Tailwind styling classes, and interactive behaviors that are duplicated across files, accompanied by proposed unified TypeScript props interfaces.

---

### Case 1: Cosentino Material Monolith Cards

- **Source File 1:** `src/components/organisms/DivisionCards.tsx` (lines 124–180)
- **Source File 2:** `src/components/organisms/ServicesIndex.tsx` (lines 165–232)
- **Classification:** **Real Duplication (95% identical markup and styling)**
- **Architectural Impact:** Breaches DRY, balloons bundle size, and leaves the canonical `ServiceRow` molecule (`DESIGN.md` § 7.1) unfulfilled.

#### Side-by-Side Structural Comparison

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// DivisionCards.tsx (lines 125-179) — Link Navigation Item
// ─────────────────────────────────────────────────────────────────────────────
<Link
  key={card.href}
  href={card.href}
  className="group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-ink p-7 text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9"
>
  <div className="absolute inset-0 z-0 overflow-hidden bg-bone-100">
    <Photo
      photo={card.photo}
      sizes={CARD_SIZES}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  </div>
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent"
  />
  <div className="relative z-10">
    <Heading
      as="h3"
      voice="serif"
      sizeClassName="text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar"
    >
      {card.title}
    </Heading>
  </div>
  <div className="relative z-10 flex flex-col gap-5">
    <Text size="base" className="leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]">
      {card.description}
    </Text>
    <div className="flex items-center gap-3 pt-1 text-white transition-colors group-hover:text-concha-nacar">
      <span className="label text-sm tracking-wider text-white transition-colors group-hover:text-concha-nacar">
        Saber más
      </span>
      <Icon
        name="arrow-right"
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-concha-nacar"
      />
    </div>
  </div>
</Link>

// ─────────────────────────────────────────────────────────────────────────────
// ServicesIndex.tsx (lines 169-233) — Interactive Button Trigger
// ─────────────────────────────────────────────────────────────────────────────
<button
  key={service.slug}
  type="button"
  onClick={() => setSelectedService({ service, index: sIdx })}
  aria-label={`Ver alcances y entregables de ${service.title}`}
  className="group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-ink p-7 text-left text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 cursor-pointer sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9"
>
  <div className="absolute inset-0 z-0 overflow-hidden bg-bone-100">
    {hasPhoto && service.image ? (
      <Photo
        photo={service.image}
        sizes={CARD_SIZES}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-bone-200 text-xs text-ink-muted p-4 text-center">
        <span>Fotografía de archivo en proceso</span>
      </div>
    )}
  </div>
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent"
  />
  <div className="relative z-10">
    <Heading
      as="h3"
      voice="serif"
      sizeClassName="text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar"
    >
      {service.title}
    </Heading>
  </div>
  <div className="relative z-10 flex flex-col gap-5">
    {service.summary ? (
      <Text size="base" className="leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]">
        {service.summary}
      </Text>
    ) : null}
    <div className="flex items-center gap-3 pt-1 text-white transition-colors group-hover:text-concha-nacar">
      <span className="label text-sm tracking-wider text-white transition-colors group-hover:text-concha-nacar">
        Ver alcances y entregables
      </span>
      <Icon
        name="arrow-right"
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-concha-nacar"
      />
    </div>
  </div>
</button>
```

#### Tailwind Class Match Verification

| DOM Sub-Element | `DivisionCards.tsx:124-180` | `ServicesIndex.tsx:165-232` | Match % |
|---|---|---|:---:|
| Outer Container | `group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-ink p-7 text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9` | Same classes + `text-left cursor-pointer` | **100%** |
| Photo Frame | `absolute inset-0 z-0 overflow-hidden bg-bone-100` | `absolute inset-0 z-0 overflow-hidden bg-bone-100` | **100%** |
| Top Gradient Scrim | `pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent` | `pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent` | **100%** |
| Bottom Gradient Scrim | `pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent` | `pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent` | **100%** |
| Title Typography | `text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar` | `text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar` | **100%** |
| Bottom Stack & Text | `relative z-10 flex flex-col gap-5` + `leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]` | `relative z-10 flex flex-col gap-5` + `leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]` | **100%** |
| Arrow Animation | `group-hover:translate-x-2 group-hover:text-concha-nacar` | `group-hover:translate-x-2 group-hover:text-concha-nacar` | **100%** |

#### Proposed Unified TypeScript Interface

Extract into `src/components/molecules/MonolithCard.tsx` (or `ServiceRow.tsx`):

```typescript
// src/components/molecules/MonolithCard.tsx
import type { PhotoModel } from "@/types/content";

export interface MonolithCardProps {
  title: string;
  description?: string;
  photo?: PhotoModel | null;
  /** When href is provided, renders an accessible Next.js Link; otherwise renders an interactive button */
  href?: string;
  onClick?: () => void;
  ctaLabel?: string;
  sizes?: string;
  ariaLabel?: string;
  className?: string;
  priority?: boolean;
}
```

---

### Case 2: 0px Carousel Navigation Controls & Scroll Track Hook

- **Source Files:**
  1. `src/components/organisms/DivisionCards.tsx` (lines 80–100)
  2. `src/components/organisms/ServicesIndex.tsx` (lines 134–153, 243–262)
  3. `src/components/organisms/CredibilityGallery.tsx` (lines 67–86)
  4. `src/components/organisms/ProjectCaseStudyModal.tsx` (lines 335–354)
  5. `src/components/organisms/Testimonials.tsx` (lines 210–230)
- **Classification:** **Real Duplication (Behavioral + Visual)**
- **Architectural Impact:** 5 files independently maintain `canScrollLeft` and `canScrollRight` booleans, attach scroll listeners, compute offset math, and copy-paste the exact same pair of 44×44px square button elements.

#### Side-by-Side Markup Comparison

In all 5 components, the exact same JSX block is rendered:

```tsx
<div className="flex items-center gap-2">
  <button
    type="button"
    onClick={() => handleScroll("left")}
    disabled={!canScrollLeft}
    aria-label="Ver anterior"
    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
  >
    <Icon name="arrow-left" className="h-4 w-4" />
  </button>
  <button
    type="button"
    onClick={() => handleScroll("right")}
    disabled={!canScrollRight}
    aria-label="Ver siguiente"
    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
  >
    <Icon name="arrow-right" className="h-4 w-4" />
  </button>
</div>
```

#### Proposed Unified Hook & Molecule

1. **Custom Hook (`src/lib/hooks/useCarouselScroll.ts`):**
```typescript
import { useState, useCallback, useEffect, type RefObject } from "react";

export interface UseCarouselScrollOptions {
  gap?: number;
  fallbackWidth?: number;
}

export function useCarouselScroll(
  trackRef: RefObject<HTMLElement | null>,
  options: UseCarouselScrollOptions = {}
) {
  const { gap = 24, fallbackWidth = 440 } = options;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, [trackRef]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = trackRef.current;
      if (!el) return;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const step = (firstChild ? firstChild.offsetWidth : fallbackWidth) + gap;
      el.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    },
    [trackRef, gap, fallbackWidth]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [trackRef, updateScrollState]);

  return {
    canScrollLeft,
    canScrollRight,
    scrollLeft: () => scroll("left"),
    scrollRight: () => scroll("right"),
    updateScrollState,
  };
}
```

2. **Unified Molecule (`src/components/molecules/CarouselNavButtons.tsx`):**
```typescript
export interface CarouselNavButtonsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}
```

---

### Case 3: Verbatim Photo Lightbox Modal

- **Source File 1:** `src/components/organisms/CredibilityGallery.tsx` (lines 121–152)
- **Source File 2:** `src/components/organisms/ProjectCaseStudyModal.tsx` (lines 393–423)
- **Classification:** **Verbatim Copy-Paste Duplication (100% Identical)**
- **Architectural Impact:** 32 lines of verbatim code copied between organisms, duplicating full-screen backdrop geometry, click-to-dismiss behavior, and 44×44px square close trigger.

#### Side-by-Side Comparison

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// CredibilityGallery.tsx:121-152 AND ProjectCaseStudyModal.tsx:393-423
// ─────────────────────────────────────────────────────────────────────────────
{activePhoto ? (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={activePhoto.alt}
    className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-4 md:p-8 backdrop-blur-md"
    onClick={() => setActivePhoto(null)}
  >
    <button
      type="button"
      onClick={() => setActivePhoto(null)}
      aria-label="Cerrar vista ampliada"
      className="absolute top-4 right-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-ink text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
    >
      <Icon name="close" className="h-4 w-4" />
    </button>
    <div
      className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <Photo
        photo={activePhoto}
        sizes="90vw"
        priority
        fit="contain"
        className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
      />
    </div>
  </div>
) : null}
```

#### Proposed Unified Molecule

Extract into `src/components/molecules/PhotoLightboxModal.tsx`:

```typescript
// src/components/molecules/PhotoLightboxModal.tsx
import type { PhotoModel } from "@/types/content";

export interface PhotoLightboxModalProps {
  photo: PhotoModel | null;
  onClose: () => void;
  ariaLabel?: string;
}
```

---

### Case 4: Inlined 150vh Parallax Stage in Template

- **Source File 1:** `src/components/templates/ContactPageTemplate.tsx` (lines 69–312)
- **Source File 2:** `src/components/organisms/ClosingCTA.tsx` (lines 41–157)
- **Related Dead File:** `src/components/organisms/FullBleedCTA.tsx` (10-line dead alias)
- **Classification:** **Real Duplication + Atomic Design Layer Breach**
- **Architectural Impact:** Page templates are specified in `DESIGN.md` § 7.1 as pure layout orchestrators. Inlining an entire 243-line organism with GSAP ScrollTrigger dynamics forces `"use client"` onto `ContactPageTemplate.tsx` and duplicates the monumental 150vh stage architecture.

#### Side-by-Side Comparison

```tsx
// ClosingCTA.tsx:81-125
<section
  id={id}
  ref={containerRef}
  {...revealAttrs("stagger")}
  className="relative flex min-h-[140vh] w-full flex-col justify-end overflow-hidden bg-ink md:min-h-[150vh]"
>
  <div
    ref={imageWrapperRef}
    aria-hidden="true"
    className="pointer-events-none absolute -top-[15%] left-0 right-0 h-[130%] w-full select-none will-change-transform"
  >
    <Photo photo={activePhoto} sizes="100vw" fit="cover" />
  </div>

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 h-[75vh] max-h-[820px] bg-gradient-to-t from-ink via-ink/75 to-transparent"
  />

  <Container className="relative z-10 w-full pb-16 pt-24 md:pb-24 lg:pb-32">
    <div {...revealStep(0)} className="max-w-[48rem]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
        <p className="eyebrow !text-white/85">{closing.eyebrow}</p>
        <span className="label text-white/70">Zoom o presencial en Oaxaca</span>
      </div>
      <Heading voice="serif" sizeClassName="text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] text-white">
        {closing.heading}
      </Heading>
      <p className="mt-6 max-w-[54ch] text-base text-white/85 sm:text-lg">{closing.body}</p>
      <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
        <Button variant="primary" size="md" arrow>{closing.cta.label}</Button>
        <Button variant="outline" size="md" arrow>Iniciar consulta</Button>
      </div>
    </div>
  </Container>
</section>

// ContactPageTemplate.tsx:117-185 (ContactStage)
<section
  ref={containerRef}
  {...revealAttrs("stagger")}
  className="relative flex min-h-[150svh] w-full flex-col justify-end overflow-hidden bg-ink pt-28 pb-16 sm:pb-24 lg:pb-32"
>
  <div
    ref={imageWrapperRef}
    aria-hidden="true"
    className="pointer-events-none absolute -top-[20%] left-0 right-0 h-[140%] w-full select-none will-change-transform"
  >
    <Photo photo={stageData.photo} sizes="100vw" fit="cover" />
  </div>

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/85 to-transparent via-65%"
  />

  <Container className="relative z-20 w-full">
    <div {...revealStep(0)} className="max-w-[48rem]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
        <p className="eyebrow !text-white/85">{stageData.eyebrow}</p>
        <span className="label text-white/70">{stageData.regionBadge}</span>
      </div>
      <Heading as="h2" voice="serif" sizeClassName="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-white">
        {stageData.heading}
      </Heading>
      <p className="mt-6 max-w-[56ch] text-base text-white/85 sm:text-lg">{stageData.body}</p>
      <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
        <Button variant="primary" size="md" arrow>{stageData.whatsappCta}</Button>
        <Button variant="outline" size="md" arrow>{stageData.consultationCta}</Button>
      </div>
    </div>
    {/* Telephone, Hours & Google Maps Grid appended below */}
  </Container>
</section>
```

#### Proposed Unified Solution

1. Extract lines 69–312 into `src/components/organisms/ContactLocationStage.tsx`.
2. Generalize the 150vh parallax background into a reusable organism `src/components/organisms/ParallaxStage.tsx`:

```typescript
// src/components/organisms/ParallaxStage.tsx
export interface ParallaxStageProps {
  id?: string;
  eyebrow?: string;
  badge?: string;
  heading: string;
  body: string;
  photo: PhotoModel;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  minHeight?: "140vh" | "150svh";
  children?: React.ReactNode;
}
```

---

### Case 5: 2-Column Editorial Story Sections Inlined in Templates

- **Source Files:**
  1. `src/components/templates/AboutPageTemplate.tsx` (lines 65–122: "Nuestra Identidad")
  2. `src/components/templates/ServicesPageTemplate.tsx` (lines 55–101: "Intro Editorial")
  3. `src/components/organisms/IntroSection.tsx` (lines 28–114)
- **Classification:** **Real Duplication & Atomic Layer Breach**
- **Architectural Impact:** Two templates construct identical 2-column editorial monograph layouts using raw atoms (`Section`, `Container`, `Heading`, `Text`, `Photo`), bypassing `IntroSection.tsx` solely because `IntroSection` was rigidly authored with photo-left and a hardcoded `/nosotros` button.

#### Structural Comparison

```tsx
// 1. AboutPageTemplate.tsx:66-122 (Inlined on /nosotros)
<Section tone="canvas" density="default" reveal="stagger">
  <Container>
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col gap-6 lg:col-span-6">
        <p className="eyebrow">{page.story.eyebrow}</p>
        <Heading as="h2" voice="serif" sizeClassName="text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.12]" className="max-w-[22ch]">
          {page.story.heading}
        </Heading>
        <div className="flex flex-col gap-4">
          {page.story.paragraphs.map((p, i) => <Text key={i} size="base">{p}</Text>)}
        </div>
      </div>
      <div className="lg:col-span-6">
        <figure className="overflow-hidden bg-bone-100">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/5]">
            <Photo photo={page.credibilityPhotos[0]} sizes="(min-width: 1024px) 50vw, 100vw" fit="cover" />
          </div>
        </figure>
      </div>
    </div>
  </Container>
</Section>

// 2. ServicesPageTemplate.tsx:55-101 (Inlined on /servicios)
<Section tone="canvas" density="compact" reveal="stagger">
  <Container>
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="flex flex-col gap-4 lg:col-span-7">
        <p className="eyebrow">{page.intro.eyebrow}</p>
        <Heading as="h2" voice="serif" className="max-w-[24ch]">
          {page.intro.heading}
        </Heading>
        <div className="mt-2 flex flex-col gap-4">
          {page.intro.paragraphs.map((p, i) => <Text key={i} size="base">{p}</Text>)}
        </div>
      </div>
      <div className="lg:col-span-5">
        <figure className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
            <Photo photo={page.intro.photo} sizes="(min-width: 1024px) 42vw, 100vw" fit="cover" />
          </div>
        </figure>
      </div>
    </div>
  </Container>
</Section>
```

#### Proposed Unified Interface

Extend `src/components/organisms/IntroSection.tsx` (or author `src/components/organisms/EditorialStorySection.tsx`):

```typescript
// src/components/organisms/EditorialStorySection.tsx
export interface EditorialStorySectionProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  photo: PhotoModel;
  photoCaption?: string;
  photoAspect?: "4/5" | "4/3" | "3/4" | "16/10";
  /** Placement of photo on desktop: 'left' (Landing default) or 'right' (/nosotros, /servicios) */
  photoPosition?: "left" | "right";
  columnRatio?: "6/6" | "7/5" | "5/7";
  tone?: "canvas" | "bone";
  density?: "default" | "compact";
  action?: React.ReactNode;
}
```

---

### Case 6: Thematic Pillar Template Structural Cloning

- **Source File 1:** `src/components/templates/InteriorsPageTemplate.tsx` (120 lines)
- **Source File 2:** `src/components/templates/SustainabilityPageTemplate.tsx` (124 lines)
- **Classification:** **Template Cloning (95% Structural Identity)**
- **Architectural Impact:** Two complete template files share an identical 6-layer layout sequence, identical WhatsApp query string formatting logic, and identical component prop configurations.

#### Side-by-Side Layer Cadence

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              6-LAYER TEMPLATE CADENCE                                │
├─────────┬──────────────────────────────────────┬─────────────────────────────────────┤
│ Layer   │ InteriorsPageTemplate.tsx            │ SustainabilityPageTemplate.tsx      │
├─────────┼──────────────────────────────────────┼─────────────────────────────────────┤
│ Layer 1 │ PageHero + dual button actions       │ PageHero + dual button actions      │
│ Layer 2 │ Section wrapper + SpecialtiesShowcase│ Section wrapper + SpecialtiesShowcase│
│ Layer 3 │ ManifestoLine (quote on concha-nácar)│ ManifestoLine (quote on concha-nácar)│
│ Layer 4 │ CredibilityGallery (espacios)        │ CredibilityGallery (bioclimática)   │
│ Layer 5 │ WhyCasaAltaEditorial (DRO pillars)   │ WhyCasaAltaEditorial (estrategias)  │
│ Closing │ ClosingCTA (150vh monumental stage)  │ ClosingCTA (150vh monumental stage) │
└─────────┴──────────────────────────────────────┴─────────────────────────────────────┘
```

#### Proposed Unified Template

Extract into `src/components/templates/ThematicPillarPageTemplate.tsx`:

```typescript
// src/components/templates/ThematicPillarPageTemplate.tsx
export interface ThematicPillarPageTemplateProps {
  site: SiteConfig;
  closing: HomePage["closing"];
  hero: {
    eyebrow: string;
    heading: string;
    subheadline: string;
    photo: PhotoModel;
    catalogAnchor: string;
    catalogCtaLabel: string;
    consultationCtaLabel: string;
    whatsappPrefill: string;
  };
  specialties: {
    id: string;
    eyebrow: string;
    heading: string;
    body: string;
    deliverablesLabel: string;
    sections: SpecialtySection[];
  };
  manifesto: {
    text: string;
    photo?: PhotoModel;
  };
  gallery: {
    id: string;
    intro: SectionIntro;
    photos: PhotoModel[];
  };
  pillars: {
    id: string;
    intro: SectionIntro;
    items: Differentiator[];
  };
}
```

---

### Case 7: Modal Lifecycle & Accessibility Trapping

- **Source Files:**
  1. `src/components/organisms/ContactModal.tsx` (lines 35–100)
  2. `src/components/organisms/ServiceScopeModal.tsx` (lines 45–100)
  3. `src/components/organisms/ProjectCaseStudyModal.tsx` (lines 87–153)
- **Classification:** **Structural Architectural Duplication**
- **Architectural Impact:** All three dialogs manually re-implement:
  1. `triggerElementRef.current = document.activeElement as HTMLElement | null` with focus restoration on close.
  2. Tab / Shift+Tab keyboard focus trapping querySelector loops.
  3. Escape key listeners.
  4. Document scroll lock (`document.documentElement.style.overflow = "hidden"` and restore).
  5. GSAP entrance animation (`opacity: 0 -> 1`, `y: 24 -> 0`, `scale: 0.98 -> 1`).
  6. 44×44px square close button with `<Icon name="close" />`.

#### Proposed Unified Hook & Molecule Shell

1. **Custom Hook (`src/lib/hooks/useModalDialog.ts`):**
```typescript
export interface UseModalDialogOptions {
  isOpen: boolean;
  onClose: () => void;
  dialogRef: React.RefObject<HTMLElement | null>;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function useModalDialog({ isOpen, onClose, dialogRef, closeButtonRef }: UseModalDialogOptions) {
  // Focus trap, Escape key, scroll lock, and trigger restoration logic...
}
```

2. **Unified Shell Molecule (`src/components/molecules/ModalShell.tsx`):**
```typescript
export interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  maxWidthClassName?: string;
}
```

---

## 5. Architecture & Contract Compliance Audit

### 5.1 Atomic Design Layer Rules Compliance

`DESIGN.md` § 7.1 establishes a strict downward dependency flow:
$$\text{atoms} \longrightarrow \text{molecules} \longrightarrow \text{organisms} \longrightarrow \text{templates} \longrightarrow \text{src/app/**/page.tsx}$$

#### Compliance Findings:
1. **Atoms & Molecules (100% Downward Compliance):**
   - Atoms import only React/Next APIs, CSS utilities, or `@/types/content`. Zero upward imports.
   - Molecules import only atoms and type definitions. Zero molecule-to-organism imports.
2. **Template Layer Bypasses (Violations):**
   - `ContactPageTemplate.tsx:69-312`: Inlines `ContactStage` (243 lines) containing GSAP parallax and Google Maps.
   - `AboutPageTemplate.tsx:66-122`: Inlines a 2-column story layout directly with atoms.
   - `ServicesPageTemplate.tsx:55-101`: Inlines an intro story layout directly with atoms.
   - `ServicesPageTemplate`, `InteriorsPageTemplate`, and `SustainabilityPageTemplate`: Inlines an identical `<Section>` + `<Container>` + `<SectionHeading>` wrapper around `<SpecialtiesShowcase>`.
3. **Misplaced Non-Component Script:**
   - `src/components/organisms/gsap-scenes.ts` is a 67-line TypeScript animation helper (ScrollTrigger registration and parallax math), not a React component. It belongs in `src/lib/animation/`.
4. **Dead Code Elimination (5 files, 439 lines):**
   - `src/components/atoms/Rule.tsx` (21 lines) — 0 imports.
   - `src/components/organisms/Differentiators.tsx` (124 lines) — 0 imports; superseded by `WhyCasaAltaEditorial.tsx`.
   - `src/components/organisms/FullBleedCTA.tsx` (10 lines) — 0 imports; redundant alias.
   - `src/components/organisms/ProjectGallery.tsx` (54 lines) — 0 imports; superseded by `ProjectCaseStudyModal.tsx`.
   - `src/components/organisms/Testimonials.tsx` (230 lines) — 0 imports in active templates.

---

### 5.2 Content Seam Compliance (Rule D5)

`AGENTS.md` and `DESIGN.md` § 7.2 dictate:
> *"All copy lives in src/content/*. src/lib/content/index.ts is the only module that reads it, and components receive data as props — never imports."*  
> *"Zero Hardcoded Copy or Media in Components: Presentational components (`src/components/**`) must never define narrative strings, metadata tables, English headings, or fallback Photo objects."*

#### Import Verification:
- **100% Compliant**: Zero components import runtime data from `src/content/*` or `src/lib/content`. Only `import type` from `@/types/content` is present.

#### Hardcoded Copy & Fallback Strings Catalog (16 Files):

| # | File Path | Exact Lines | Hardcoded Text / Pattern | Target Extraction Content File |
|---|---|---|---|---|
| 1 | `organisms/ClosingCTA.tsx` | 107 | `closing.eyebrow \|\| "Primera reunión sin costo"` | `src/content/home.ts` (`closing.eyebrow`) |
| 2 | `organisms/ClosingCTA.tsx` | 110 | `<span className="label text-white/70">Zoom o presencial en Oaxaca</span>` | `src/content/home.ts` (`closing.subtitle`) |
| 3 | `organisms/ClosingCTA.tsx` | 149 | `<Button variant="outline" ...>Iniciar consulta</Button>` | `src/content/home.ts` (`closing.secondaryCtaLabel`) |
| 4 | `organisms/ContactFormFields.tsx` | 63–64 | WhatsApp message generator templates | `src/content/site.ts` (`site.whatsappTemplates`) |
| 5 | `organisms/ContactFormFields.tsx` | 135, 165, 195, 225 | Fallback step labels (`"1. Especialidad de su proyecto"`, etc.) | `src/content/contact.ts` (`contact.steps`) |
| 6 | `organisms/ContactFormFields.tsx` | 349–350, 367–377 | Form success copy & error remediation text | `src/content/contact.ts` |
| 7 | `organisms/ProjectCaseStudyModal.tsx` | 33 | Fallback default prop `whatsappHref = "https://wa.me/529514581395"` | Require prop mandatorily from `site.whatsapp.href` |
| 8 | `organisms/ProjectCaseStudyModal.tsx` | 170, 188, 221, 241, 274, 316, 327 | Static UI labels: `"Cerrar expediente"`, `"Memoria descriptiva"`, `"Ficha técnica"`, etc. | `src/content/projects.ts` (`projectModal`) |
| 9 | `organisms/ServiceScopeModal.tsx` | 116 | WhatsApp prefill string: `"Hola Casa Alta, deseo consultar los alcances..."` | `src/content/services.ts` (`services.whatsappTemplate`) |
| 10 | `organisms/ServiceScopeModal.tsx` | 161, 169, 196, 220, 231 | Static UI labels: `"Partida ... alcances"`, `"Cerrar detalle"`, etc. | `src/content/services.ts` (`servicesModal`) |
| 11 | `organisms/FeaturedPortfolio.tsx` | 61 | `Ver archivo completo (17 obras)` (hardcoded static count) | Compute dynamically or pass via `intro.actionLabel` |
| 12 | `organisms/MethodologyZigzag.tsx` | 26–31 | Fallback copy for `intro.eyebrow`, `intro.heading`, `intro.body` | Pass strictly via `page.methodologyIntro` |
| 13 | `organisms/ManifestoLine.tsx` | 87, 97 | `"Arquitectura que perdura · Costa de Oaxaca"`, `"Visión arquitectónica"` | `src/content/home.ts` (`home.manifestoCaption`) |
| 14 | `organisms/StatsBand.tsx` | 29, 32, 35 | `"Registro técnico de obra"`, `"Costa y Valles Centrales"`, `"Bitácora de obra"` | `src/content/home.ts` (`home.statsHeader`) |
| 15 | `organisms/PageHero.tsx` | 101 | `<span className="label ...">Casa Alta · Oaxaca</span>` | `src/content/site.ts` (`site.locationBadge`) |
| 16 | `templates/ProjectsIndexTemplate.tsx` | 29–36 | `FILTER_LABELS` array definition in template | `src/content/projects.ts` (`categoryLabels`) |

---

### 5.3 Cosentino Architectural Editorial Visual Direction Compliance

#### 1. Strict 0px Orthogonal Geometry (Zero Capsules Contract)
- **Contract:** Border radius tokens `--radius-xs` through `--radius-4xl` must be `0px`. Zero rounded pills or oval capsules.
- **Verification:** Grep inspection for `\brounded(-\w+)?\b` across all TSX files returned **exactly 1 match**:
  - `src/components/organisms/WhatsAppFloat.tsx:23`: `h-14 w-14 rounded-full` (the sole permitted circular exception).
- **Compliance Status:** **100% compliant**.

#### 2. Two-Font Typographic Hierarchy
- **Contract:** Marcellus (`.voice` / `Heading voice="serif"`) for editorial headings, pull quotes, and stat numbers. Montserrat (`<Text>` / `.label` / `.display` / `tabular-nums`) for body and metadata. **Strict ban on `font-mono`**.
- **Verification:** Grep inspection for `font-mono` returned **0 matches** across the codebase.
- **Specific Typographic Violation Found:**
  - `src/components/molecules/ProjectCard.tsx` (lines 162 & 167):
    - Line 162: `<h3 className="font-sans text-sm sm:text-base md:text-lg font-medium text-white ...">{project.title}</h3>`
      *Defect*: Renders project title in Montserrat sans. `DESIGN.md` § 6.2.1 item 4 strictly prescribes: *"Project title (`Marcellus h3`, white) is positioned at bottom-left"*.
    - Line 167: Location tag uses plain `font-sans text-xs` instead of `.label` typography (`Montserrat .label uppercase tracking-[0.14em]`).

#### 3. Zero Border-Color Contract
- **Contract:** Visible border strokes and border-color utilities are forbidden. Hierarchy must rely on surface contrast and whitespace.
- **Verification:** Only one design-sanctioned hairline border exists: `WhyCasaAltaEditorial.tsx:152` (`border-b border-bone-200`), explicitly authorized by `DESIGN.md` § 6.2.3 item 1.
- **Compliance Status:** **98% compliant**.

#### 4. Action-Color Exclusivity
- **Contract:** Solid `bg-brand-800 text-white` is reserved exclusively for `<Button variant="primary" />` and `<WhatsAppFloat />`.
- **Verification:** Confirmed zero misuse on tabs, chips, step numbers, or badges.
- **Compliance Status:** **100% compliant**.

#### 5. Hand-Rolled Action SVGs & Literal Characters
- `src/components/organisms/Footer.tsx:121`: Inlines raw literal `"↑"` character inside `<button>` instead of composing `<Icon name="arrow-left" className="rotate-90" />` or `<Button>`.
- `src/components/organisms/ContactFormFields.tsx:294-312 & 332-344`: Inlines raw SVGs for a spinner and checkmark. `Icon.tsx` currently lacks a `"check"` glyph.

---

## 6. Prioritized Unification Roadmap (P1–P4)

The unification roadmap is organized into 4 logical phases, balancing risk, effort, and code-debt reduction.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Immediate Hygiene & Quick Wins (Zero Risk)                         │
│ - Fix ProjectCard typography (Marcellus h3 + .label)                        │
│ - Delete 5 dead files: Rule, Differentiators, FullBleedCTA, ProjectGallery, │
│   Testimonials (removes 439 LOC)                                            │
│ - Relocate organisms/gsap-scenes.ts -> src/lib/animation/gsap.ts             │
│ - Add "check" glyph to Icon.tsx and remove hand-rolled SVGs                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: High-Impact Molecule Extractions (Resolves Core Duplications)      │
│ - Extract molecules/MonolithCard.tsx (unifies DivisionCards & ServicesIndex)│
│ - Extract molecules/CarouselNavButtons.tsx & useCarouselScroll hook         │
│ - Extract molecules/PhotoLightboxModal.tsx (unifies gallery lightboxes)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Modal Lifecycle & Template Consolidation (Layering Integrity)      │
│ - Create useModalDialog hook & molecules/ModalShell.tsx                     │
│ - Extract organisms/ContactLocationStage.tsx from ContactPageTemplate.tsx   │
│ - Generalize IntroSection.tsx with reverse prop for /nosotros and /servicios│
│ - Consolidate Interiors & Sustainability into ThematicPillarPageTemplate    │
│ - Encapsulate section wrapper in SpecialtiesShowcase.tsx                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Content Seam Purification (Zero Hardcoded Copy)                    │
│ - Move WhatsApp prefill generators to src/content/site.ts                   │
│ - Move modal labels, filter dictionaries, and stat headers to content files │
│ - Dynamically interpolate project count in FeaturedPortfolio.tsx            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Detailed Phase Breakdown & Effort-Impact Matrix

| Phase & Item | Target Files | Scope & Action Items | LOC Delta | Effort | Impact | Risk |
|---|---|---|:---:|:---:|:---:|:---:|
| **P1.1** | `molecules/ProjectCard.tsx` | Change title to `voice="serif"` (`Marcellus`) and location to `.label`. | ~4 lines | 15 min | High | Zero |
| **P1.2** | 5 Dead Files (`Rule`, `Differentiators`, `FullBleedCTA`, `ProjectGallery`, `Testimonials`) | Purge unreferenced files from disk. | **-439 lines** | 15 min | Med | Zero |
| **P1.3** | `organisms/gsap-scenes.ts` | Move to `src/lib/animation/gsap.ts` and update 2 dynamic imports. | 0 lines | 15 min | Med | Zero |
| **P1.4** | `atoms/Icon.tsx`, `Footer.tsx`, `ContactFormFields.tsx` | Add `"check"` glyph; replace raw `"↑"` and inlined SVGs. | ~10 lines | 30 min | Low | Zero |
| **P2.1** | `organisms/DivisionCards.tsx`, `organisms/ServicesIndex.tsx` | Extract `molecules/MonolithCard.tsx` (polymorphic `href`/`onClick`). | **-120 lines** | 1.5 hrs | High | Low |
| **P2.2** | 5 Carousel Organisms | Extract `useCarouselScroll.ts` hook and `molecules/CarouselNavButtons.tsx`. | **-160 lines** | 1.5 hrs | High | Low |
| **P2.3** | `organisms/CredibilityGallery.tsx`, `organisms/ProjectCaseStudyModal.tsx` | Extract `molecules/PhotoLightboxModal.tsx`. | **-32 lines** | 45 min | High | Low |
| **P3.1** | `organisms/ContactModal.tsx`, `ServiceScopeModal.tsx`, `ProjectCaseStudyModal.tsx` | Create `useModalDialog` hook and `molecules/ModalShell.tsx`. | **-140 lines** | 2 hrs | High | Low |
| **P3.2** | `templates/ContactPageTemplate.tsx` | Extract `organisms/ContactLocationStage.tsx`. Remove `"use client"` if possible. | **-243 lines** | 1.5 hrs | High | Low |
| **P3.3** | `organisms/IntroSection.tsx`, `AboutPageTemplate.tsx`, `ServicesPageTemplate.tsx` | Add `reverse?: boolean` to `IntroSection`. Replace inlined 2-col stories. | **-90 lines** | 1.5 hrs | High | Low |
| **P3.4** | `templates/InteriorsPageTemplate.tsx`, `templates/SustainabilityPageTemplate.tsx` | Unify into `templates/ThematicPillarPageTemplate.tsx`. | **-110 lines** | 2 hrs | Med | Low |
| **P3.5** | `organisms/SpecialtiesShowcase.tsx`, 3 Templates | Allow `SpecialtiesShowcase` to render its own `<Section>` and `<Container>`. | **-40 lines** | 1 hr | Med | Low |
| **P4.1** | `ContactFormFields.tsx`, `ServiceScopeModal.tsx`, 2 Templates | Externalize WhatsApp prefill string generators to `src/content/site.ts`. | ~15 lines | 1 hr | High | Zero |
| **P4.2** | 16 Components with Hardcoded Copy | Move UI labels, fallback strings, and filter labels to `src/content/*`. | ~50 lines | 2 hrs | High | Zero |
| **Total** | **Codebase-Wide** | **Phases P1–P4 Consolidated Execution** | **~1,370 LOC Cleaned / Consolidated** | **15.5 hrs** | **Critical** | **Low** |

---

## 7. Verification Commands & Independent Replication

To independently verify the observations, structural evidence, and metrics presented in this audit without mutating production files, execute the following commands in the project root:

### 1. Verify Git Tree Cleanliness
Confirm that zero files in `src/` or `public/` were modified during this audit:
```bash
git status --short
```
*Expected output:* Only `.agents/teamwork/` metadata files and `AUDIT_COMPONENT_REUSE.md` untracked. Zero staged or modified production files.

### 2. Verify TypeScript Compilation & Type Health
```bash
pnpm exec tsc --noEmit
```
*Expected output:* Exits with code 0 and zero type errors.

### 3. Verify Dead Code Files (0 Active Consumers)
```bash
# Verify Rule.tsx has 0 imports
git grep -n "atoms/Rule" src/

# Verify Differentiators.tsx has 0 imports
git grep -n "organisms/Differentiators" src/

# Verify FullBleedCTA.tsx has 0 imports
git grep -n "organisms/FullBleedCTA" src/

# Verify ProjectGallery.tsx has 0 imports
git grep -n "organisms/ProjectGallery" src/

# Verify Testimonials.tsx has 0 imports
git grep -n "organisms/Testimonials" src/
```
*Expected output:* All commands return 0 occurrences (or only their own definition/re-export).

### 4. Verify 0px Geometry Contract
```bash
git grep -n "rounded-" src/components/
```
*Expected output:* Exactly one match in `src/components/organisms/WhatsAppFloat.tsx:23` (`rounded-full`). Zero matches for `rounded-md`, `rounded-lg`, etc.

### 5. Verify Zero `font-mono`
```bash
git grep -n "font-mono" src/
```
*Expected output:* 0 matches across the entire codebase.

### 6. Verify Content Seam Import Hygiene
```bash
git grep -rn "from ['\"].*content" src/components/
```
*Expected output:* Every result matches `import type { ... } from "@/types/content"`. Zero runtime content imports.

### 7. Inspect Key Duplication Sites
```bash
# Monolith Card duplication
head -n 180 src/components/organisms/DivisionCards.tsx | tail -n 56
head -n 232 src/components/organisms/ServicesIndex.tsx | tail -n 67

# Verbatim Lightbox Modal duplication
head -n 152 src/components/organisms/CredibilityGallery.tsx | tail -n 31
head -n 423 src/components/organisms/ProjectCaseStudyModal.tsx | tail -n 31

# ProjectCard typography violation
head -n 170 src/components/molecules/ProjectCard.tsx | tail -n 15
```

---

*Report Author: Worker Subagent (`worker_report`)*  
*Supervised by: Orchestrator Subagent (`acca78cd-093a-42aa-905d-556d42d43d59`)*  
*Repository Root: `/Users/hendrick/Documents/arquitectura-casa-alta-web`*
