# Delta for Landing Composition

**Change:** `casa-alta-site-redesign` · **Capability:** `landing-composition` · **Delta:** ADDED
**Status:** **NOT implemented.** The landing composes 12 sections today (`src/components/templates/LandingTemplate.tsx:48-94`); none of the sections this capability adds exists, and the hero is a 48svh photo strip with the type on white below it (`src/components/organisms/Hero.tsx:45`).
**Bindings:** inherits `site-pages` (one `h1`, `h2` sections, zero horizontal overflow from 320px, focus never removed), `seo-discovery` (authored `alt`) and `editorial-content` (empty stays empty); this delta redefines none of them and adds no route.

## ADDED Requirements

### Requirement: The hero shell fills the visual viewport

The hero MUST fill the visual viewport using `dvh`/`svh` units. `vh` MUST NOT be used for the hero's height — `100vh` measures the viewport without the collapsed mobile URL bar and overflows the visible area. A full-height hero MUST NOT introduce horizontal overflow at any width from 320px up.

#### Scenario: The hero renders on a phone
- GIVEN a 375px-wide viewport
- WHEN the hero renders
- THEN its height follows the visual viewport (`dvh`/`svh`) and the document does not scroll horizontally

### Requirement: Hero type sits inside the photograph's clean zone

The headline block MUST sit inside a clean, low-variance zone of the hero photograph — not over the whole image, not on a band below it. The photograph is therefore a selection criterion: it MUST contain a zone large enough to hold the headline block. Contrast MUST be measured in the rendered composition before merge, never asserted from metadata or mean luminance, which two earlier measured attempts disproved (`Hero.tsx:15-41`). A bounded scrim inside the clean zone MAY be added if measurement demands it; a full-block scrim MUST NOT be added.

#### Scenario: The hero is composed
- GIVEN the headline block placed inside the photograph's clean zone
- WHEN the rendered contrast is measured at each shipped breakpoint
- THEN the headline meets the 3:1 large-text floor

#### Scenario: A candidate photograph has no clean zone
- GIVEN a candidate whose pixel variance across the headline area breaks type
- WHEN it is reviewed
- THEN it is rejected as a photograph, not rescued with a full-block scrim

### Requirement: The landing publishes more of the archive

The recomposed landing MUST publish at least twelve distinct photographs from the manifest set — the pre-change landing publishes six — each drawn through the content seam from `manifest.projects`. Stock MAY carry texture only for a section with no real photograph of its own, and MUST NOT appear in the featured-three portfolio slot or the masonry (see `stock-imagery`).

#### Scenario: The landing is built
- GIVEN a production build
- WHEN the emitted document's image sources are deduplicated
- THEN at least twelve distinct manifest-backed photographs appear

#### Scenario: A photographic section renders
- GIVEN the tiles, the featured three, the masonry or a full-bleed moment
- WHEN its image sources are read
- THEN each resolves to a project directory under `images-optimizado/`, or to `images/editorial/` only where stock texture is allowed; no source is external

### Requirement: Section set, order and tone rhythm

The new sections MUST be additive to `LandingTemplate`: no existing section or its content may be removed. Relative to one another they MUST appear in this order: photographic category tiles after the hero, the manifesto line as a breath after the tiles, the featured-three portfolio, the masonry of the strongest images across projects, and a second full-bleed photographic moment. The `canvas`/`bone` tone alternation MUST continue across them.

#### Scenario: The landing renders
- GIVEN the recomposed landing
- WHEN section order is read from the emitted HTML
- THEN the five added sections appear in order and every pre-existing section is still present

#### Scenario: Tones are read
- GIVEN two adjacent text sections
- WHEN their tones are compared
- THEN they alternate rather than repeat

### Requirement: The featured three are the brief's ranking

The portfolio section MUST render `01-plaza-esmeralda-puerto-escondido`, `02-el-bicho` and `03-casa-blake-tlalixtac`, in that order, `01` leading (brief §0: the numeric order is the ranking). No project MAY appear twice on the landing: the remaining grid MUST keep only projects not already featured.

#### Scenario: The featured section renders
- GIVEN the landing
- WHEN the featured project titles are read in order
- THEN they are Plaza Esmeralda, El Bicho and Casa Blake, in that order

#### Scenario: The grid renders after the featured three
- GIVEN the remaining grid's project set
- WHEN it renders
- THEN none of the three featured projects appears

### Requirement: The masonry draws the strongest images across projects

The masonry MUST compose its images from more than one project, each drawn from a project's leading manifest photographs (score ≥ 3, ordered by the manifest's `order`), and MUST declare the `sizes` tier matching its shipped column count (see `responsive-image-tiers`). Stock MUST NOT appear in it.

#### Scenario: The masonry renders
- GIVEN the landing
- WHEN the masonry's image sources are collected
- THEN they span more than one project directory, all score ≥ 3, and none reads from `images/editorial/`

### Requirement: Added copy stays within approved sources

No line this change adds MAY be new, unapproved copy: every new string MUST already exist in the repository's authored content or be supplied by the client in writing. The closing heading MUST remain the authored line (`src/content/home.ts:89`) — §14.1 is unapproved — and the testimonials slot MUST stay absent while `testimonials.ts` is empty.

#### Scenario: The added copy is audited
- GIVEN the added sections' rendered text
- WHEN it is compared against `src/content/*`
- THEN every line traces to authored copy or written client input, and the closing heading is unchanged
