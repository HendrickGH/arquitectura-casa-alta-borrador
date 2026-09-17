# Delta for Portfolio Presentation

**Change:** `casa-alta-site-redesign` · **Capability:** `portfolio-presentation` · **Delta:** ADDED
**Status:** **NOT implemented.** The `/proyectos` index and `[slug]` routes do not exist — `casa-alta-web-foundation` Phase 4 owns them (0/32) — and no index or gallery presentation is specified or built. The landing's six-card grid is the only portfolio surface today.
**Bindings:** consumes foundation's `project-pages` (route existence, manifest-sourced score-filtered galleries, clean slugs, `href` only where a route exists) and `site-pages` (one `h1`, `h2` sections, zero overflow from 320px, focus never removed). This delta adds presentation only, redefines no data rule, and declares a dependency on foundation Phase 4 — until it ships, this capability is unbuildable.

## ADDED Requirements

### Requirement: The index renders every published project as a card grid

`/proyectos` MUST render one card per project the foundation seam publishes, in the order the seam returns them, in a grid whose column count matches the `sizes` tier it declares: one column below 768px, two from 768px, three from 1200px (see `responsive-image-tiers`). No project the seam returns MAY be omitted.

#### Scenario: The index renders
- GIVEN foundation's `/proyectos` route ships and the seam returns N published projects
- WHEN the index renders at 1440px
- THEN it shows N cards in three columns, each card declaring the 3-column tier

#### Scenario: The boundary is measured
- GIVEN the index at 1199px and at 1200px
- WHEN a card slot's fraction of the viewport is measured
- THEN it matches the declared tier — 50vw below the boundary, 33vw above it

### Requirement: A gallery renders the project's photographs in a two-column grid

A project gallery MUST render every photograph the foundation seam supplies for that project — already score-filtered and manifest-ordered there — in a grid of one column below 768px and two columns from 768px up, each photo declaring the 2-column tier. The gallery's first photograph MUST be treated as above the fold (priority, not lazy); every other photograph MUST be lazy.

#### Scenario: A gallery renders
- GIVEN `/proyectos/<slug>` for a project whose seam supplies M photographs
- WHEN the gallery renders at 1440px
- THEN M photographs appear, two columns wide, in the seam's order

#### Scenario: The first photograph loads
- GIVEN a gallery's emitted HTML
- WHEN the first photograph's markup is read
- THEN it is not lazy-loaded, and every later photograph is

### Requirement: The affordance fires on focus, not only on hover

Where a card links, its hover affordance MUST also appear on keyboard focus (`:focus-visible`), in addition to the site's focus ring; a hover-only affordance is a defect. Where no route exists and the card renders as a plain article, it MUST carry no affordance (foundation `project-pages` rule stays binding). The affordance MUST NOT move layout: any image scale stays inside the fixed aspect box, and captions MUST NOT shift.

#### Scenario: A keyboard user tabs to a card
- GIVEN `/proyectos` with linking cards
- WHEN a card link receives keyboard focus
- THEN it shows the equivalent of its hover change plus the focus ring, and nothing around it moves

#### Scenario: A pointer hovers a card
- GIVEN the same card
- WHEN it is hovered
- THEN the same visual change appears, with no measured layout shift

### Requirement: No fourth sizes value, no orphan tier

The index and gallery layouts MUST declare only the tiers defined in `responsive-image-tiers`. A layout whose shipped CSS does not match its tier MUST be reverted to the site-wide pair rather than shipped.

#### Scenario: The emitted sizes are collected
- GIVEN a production build
- WHEN every `sizes` attribute on `/proyectos` and on a gallery is read
- THEN each value is one of the three defined tiers

### Requirement: The presentation is server-rendered

Every card, photograph and caption MUST be present in the server HTML; nothing in the portfolio presentation MAY depend on client JavaScript to appear.

#### Scenario: JavaScript is unavailable
- GIVEN a build read with JavaScript disabled
- WHEN `/proyectos` and a gallery are read
- THEN every card and photograph is present
