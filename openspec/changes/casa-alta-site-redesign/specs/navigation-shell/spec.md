# Delta for Navigation Shell

**Change:** `casa-alta-site-redesign` · **Capability:** `navigation-shell` · **Delta:** ADDED
**Status:** **NOT implemented.** The header is a static sticky bar (`src/components/organisms/Header.tsx:29`); no scroll state exists, and `"use client"` appears 0 times in `src/`.
**Bindings:** inherits `site-pages` (focus never removed, every internal link resolves, zero horizontal overflow from 320px) and `project-pages` (the nav moves to routes once detail routes exist); this delta adds the shell's states, its focus rule and nav curation only.

## ADDED Requirements

### Requirement: Transparent over the hero, filled past it

The floating navbar MUST render transparent, with no fill, while the hero occupies the viewport, and MUST switch to its filled state (background plus the existing bottom border) once the hero's bottom edge passes the navbar. The switch MUST be driven by scroll position or intersection with the hero — not by a timer, a click or a route event. The header MUST remain present at every scroll position.

#### Scenario: The page has not scrolled
- GIVEN the landing at 1440px, at scroll position 0
- WHEN the header is inspected
- THEN it renders transparent over the hero

#### Scenario: The hero is scrolled past
- GIVEN the same page
- WHEN the page is scrolled past the hero's bottom edge
- THEN the header carries its filled state, and keeps it until the hero re-enters the viewport

#### Scenario: The transparent state over the photograph
- GIVEN the header in its transparent state over the hero
- WHEN its foreground (logo, entries, CTA) is measured against the photograph behind it in the rendered composition
- THEN each remains distinguishable, measured rather than asserted

### Requirement: Focus is never obscured by the floating header

The floating header MUST NOT cover the element that currently holds keyboard focus. When keyboard focus or an in-page anchor places a target near the top of the viewport, it MUST rest clear of the header's height and be fully visible.

#### Scenario: Keyboard focus moves through the page
- GIVEN a keyboard user tabbing through the landing under the floating header
- WHEN focus lands on an element whose box overlaps the header's band
- THEN the element is scrolled clear of the header and is fully visible

#### Scenario: An in-page anchor is activated
- GIVEN a nav entry pointing at `/#proyectos`
- WHEN it is activated by keyboard
- THEN the target's heading lands below the header, uncovered

### Requirement: Entries stay flat, short and resolvable

The nav MUST remain a flat list of at most six top-level entries, each resolving to an existing route or a `/#anchor` that exists. The six current labels MUST keep fitting on one row at exactly 1024px — the measured constraint recorded at `Header.tsx:36-38` — so a curation that adds an entry or lengthens a label MUST first re-measure that width.

#### Scenario: A seventh entry is proposed
- GIVEN the nav at 1024px
- WHEN a new entry is added
- THEN the header row is re-measured and either fits without overflow or the entry is dropped

#### Scenario: The curated nav renders
- GIVEN any shipped route
- WHEN the nav renders
- THEN every href resolves and no dead entry appears (the `site-pages` link rule, unchanged)

### Requirement: The portfolio label resolves to Proyectos

The portfolio entry's label MUST render as `Proyectos` — the repository's resolution of the brief's internally inconsistent `portafolio`/`proyectos` (§4/§5) — until the client confirms a different label. A confirmed label change MUST be a content edit in `src/content/site.ts` with no component change.

#### Scenario: The label renders today
- GIVEN the current nav
- WHEN the portfolio entry is read
- THEN its label is `Proyectos`

#### Scenario: The client confirms a label
- GIVEN the client confirms a different label
- WHEN it is recorded in `site.ts`
- THEN it renders with no component edit

### Requirement: Curation is sequenced after the route move

Nav curation MUST be applied after `casa-alta-web-foundation`'s nav move (its task 4.3), because both changes edit `src/content/site.ts`. The two edits MUST NOT land concurrently, and this change MUST NOT re-specify the anchor-to-route move itself.

#### Scenario: The curation change is reviewed
- GIVEN the history of `src/content/site.ts`
- WHEN the curation edit is inspected
- THEN it follows foundation's nav move, or is the same single edit, and no anchor move is duplicated here

### Requirement: No content lives behind the state change

All entries, the logo and the CTA MUST be server-rendered. The scroll state MAY change only a class or attribute; with JavaScript unavailable the header MUST still render every entry and the CTA. The state change MUST use the single client boundary defined in `motion-layer` and MUST NOT add a second one.

#### Scenario: JavaScript never runs
- GIVEN the server HTML
- WHEN it is read with JavaScript disabled
- THEN every nav entry, the logo and the CTA are present as links
