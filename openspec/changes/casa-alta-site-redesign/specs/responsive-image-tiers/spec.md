# Delta for Responsive Image Tiers

**Change:** `casa-alta-site-redesign` · **Capability:** `responsive-image-tiers` · **Delta:** ADDED
**Status:** **Partially implemented.** Two tiers are in use and correct for the layouts they label: `100vw` (`Hero.tsx:46`, `ProjectsGrid.tsx:59`) and `(min-width: 768px) 50vw, 100vw` (`ProjectsGrid.tsx:68`). The 3-column tier and the ship-with-its-CSS rule are forward scope.
**Bindings:** inherits `image-url-routing` (custom loader, `deviceSizes [480, 960, 1600, 2000]`, `check:images`, and the `tools/variants.sh` drift fix, which stays pipeline-owned) and `site-pages` (zero horizontal overflow from 320px). This delta defines `sizes` values only; it redefines no delivery rule and compensates for nothing site-side.

## ADDED Requirements

### Requirement: A tier ships only alongside the CSS that makes it true

A `sizes` value MUST be written when the layout it labels exists, and MUST match that layout's real slot at every breakpoint. A tier MUST NOT precede its layout: declaring a 3-column tier with no 3-column CSS is a defect. A layout whose shipped CSS disagrees with its declared tier MUST be reverted to the site-wide pair rather than ship a label the loader mis-serves — a wrong tier is worse than no tier.

#### Scenario: A tier is proposed before its layout
- GIVEN a change adding the 3-column tier with no 3-column CSS
- WHEN the rendered slot at 1440px is measured
- THEN it is not one third of the viewport and the tier is rejected

#### Scenario: A shipped layout measures wrong
- GIVEN any layout declaring a tier
- WHEN its slot is measured at 375, 768, 1199 and 1200px
- THEN the measured fraction matches the declared value at each width, or the layout reverts to the site-wide pair

### Requirement: The three shipped tiers carry these exact values

- **2-column** — `(min-width: 768px) 50vw, 100vw`; already in use and unchanged.
- **3-column** — `(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw`; the proposal's draft shape adjusted to the repository's existing 768px two-column boundary so the step it stacks on stays truthful.
- **Full-bleed** — `100vw`; already in use and unchanged.

A layout MUST declare the tier matching its rendered column count at each breakpoint: one column below 768px, two from 768px, three from 1200px. This change MUST NOT introduce a fourth value.

#### Scenario: The emitted sizes are collected
- GIVEN a production build
- WHEN every `sizes` attribute in the emitted HTML is collected
- THEN each value is one of the three above

#### Scenario: A wide slot is served
- GIVEN a three-column layout at 1440px
- WHEN a card's width is measured and the served file is read
- THEN the file covers the slot and corresponds to the 33vw label

### Requirement: Full-bleed width is w-full inside a full-bleed container

A full-bleed section MUST span its container with `w-full` inside a full-bleed container. CSS `width: 100vw` — including Tailwind's `w-screen` — MUST NOT be used anywhere in this change: it includes the scrollbar and would break the zero-overflow requirement that passes today. `sizes="100vw"` is a different value — a srcset hint, not a width rule — and stays correct.

#### Scenario: The markup and CSS are searched
- GIVEN the change's markup and stylesheets
- WHEN they are searched for `100vw` as a width declaration or for `w-screen`
- THEN neither appears, and the full-bleed sections span the container

### Requirement: The new layouts pass the image gate

Every image the new layouts render MUST resolve through the custom loader: `npm run check:images` MUST exit 0 on the built site, and a narrow viewport MUST still be offered the 480 tier (the `image-url-routing` contract, unchanged by this delta).

#### Scenario: The gate runs
- GIVEN a production build including the new layouts
- WHEN `npm run check:images` runs
- THEN it exits 0 and names no missing URL

#### Scenario: A phone asks for a grid image
- GIVEN a 375px-wide viewport on the 3-column layout
- WHEN the browser selects a candidate for a card
- THEN the 480-tier file is the one served
