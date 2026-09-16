# Delta for Site Pages

**Change:** `casa-alta-web-foundation` · **Capability:** `site-pages` · **Delta:** ADDED
**Status:** the landing and its document invariants are implemented and verified; the services, process, about and contact routes are forward scope.

## ADDED Requirements

### Requirement: One h1 per document

Every route MUST render exactly one `h1`. On the landing it is the hero's headline stack in `src/components/organisms/Hero.tsx`. No section heading MAY be an `h1`, and no route MAY render the hero twice.

#### Scenario: The landing renders
- GIVEN a visitor loads `/`
- WHEN the emitted document is inspected
- THEN exactly one `h1` element is present

#### Scenario: A new page is added
- GIVEN a services page is written
- WHEN its document is inspected
- THEN it carries its own single `h1` and the hero is not reused to supply it

### Requirement: Sections use h2

Section headings MUST be `h2`. `Heading` MUST keep `h2` as its default level, and deeper levels (`h3`, `h4`) MUST be used only for items inside a section, never for the section itself.

#### Scenario: A section opens
- GIVEN any top-level section on the landing
- WHEN its heading is inspected
- THEN it is an `h2`

#### Scenario: An item inside a section
- GIVEN a project card's title inside the projects section
- WHEN its heading is inspected
- THEN it is an `h3`, below the section's `h2`

### Requirement: No horizontal overflow from 320px up

The layout MUST NOT produce horizontal document overflow at any viewport width from 320px upward. Fluid type and containers MUST use relative units or clamps, and no element MAY have a fixed minimum width wider than the viewport.

#### Scenario: The narrowest supported viewport
- GIVEN a 320px-wide viewport
- WHEN the landing renders
- THEN the document scroll width does not exceed the viewport width

#### Scenario: The widest supported viewport
- GIVEN a 2560px-wide viewport
- WHEN the landing renders
- THEN content stays inside the capped measure and the body does not scroll horizontally

### Requirement: Every internal link resolves

Every internal link the site renders MUST resolve to a route or an existing in-page anchor. No link MAY point at a route that does not exist, and a link whose target is unknown MUST be omitted rather than rendered as a dead link.

#### Scenario: Navigation renders today
- GIVEN the site has one route
- WHEN the nav and footer render
- THEN every href is `/` or a `/#anchor` that exists on that page

#### Scenario: A social entry is empty
- GIVEN a social entry with `href: ""`
- WHEN its link item renders
- THEN it returns `null` instead of an anchor without a target

### Requirement: Focus is never removed

A visible focus indicator MUST be present for keyboard focus on every interactive element. Styles MUST NOT set `outline: none` or an equivalent without supplying a replacement indicator.

#### Scenario: Keyboard focus lands on a link
- GIVEN a keyboard user tabs to a link or button
- WHEN the element receives focus
- THEN it shows the brand-coloured focus ring defined for `:focus-visible`

#### Scenario: A component adds a focus style
- GIVEN a component sets `outline-none`
- WHEN the change is reviewed
- THEN it also supplies a visible replacement indicator, or the change is rejected

### Requirement: Static pages are forward scope

`/servicios`, `/proceso`, `/nosotros` and `/contacto` MUST exist as real routes, and navigation MUST move from `/#anchor` to those routes once they do. Anchors MUST keep working during the transition. The services, process, about and contact pages are **NOT implemented**; the nav links to `/#anchor` today.

#### Scenario: A static page ships
- GIVEN `/servicios` ships
- WHEN the nav renders on any route
- THEN the Services entry points at `/servicios` and it resolves

#### Scenario: An anchor is still referenced
- GIVEN an external link or bookmark uses `/#proyectos`
- WHEN the pages ship
- THEN that anchor still resolves on the landing
