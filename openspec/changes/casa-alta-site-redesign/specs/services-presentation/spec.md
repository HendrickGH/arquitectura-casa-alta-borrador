# Delta for Services Presentation

**Change:** `casa-alta-site-redesign` · **Capability:** `services-presentation` · **Delta:** ADDED
**Status:** **NOT implemented.** The catalogue is authored — 4 groups, 13 services and 63 items in `src/content/services.ts` (counted 2026-09-17; the proposal's "44 items" figure is stale) — and renders as a linear index (`src/components/organisms/ServicesIndex.tsx:17-25`), not the requested two-level grid.
**Bindings:** inherits `site-pages` (`h2` sections, zero overflow from 320px), `cms-migration` (the seam is the only reader; components receive props) and `editorial-content` (unconfirmed copy ships as authored); this delta changes presentation only and authors no content.

## ADDED Requirements

### Requirement: The catalogue renders as a two-level grid

The services section MUST present the authored catalogue on two levels: the four group titles — `Proyecto y diseño`, `Construcción`, `Espacio público y exterior`, `Instalaciones` — as level one, and the thirteen service titles as level two, each service inside its authored group and after that group's intro. All four groups and all thirteen services MUST render; none MAY be dropped, merged, reordered or moved between groups. The mapping MUST come from the seam (`getServiceGroups()`), never from a component-side literal.

#### Scenario: The section renders
- GIVEN the landing's services section
- WHEN group and service titles are read from the emitted HTML
- THEN 4 group titles and 13 service titles appear, each service inside its authored group

#### Scenario: An edit drops or moves a service
- GIVEN a rendering with 12 services, or a service under the wrong group
- WHEN it is compared against `src/content/services.ts`
- THEN it is a defect against this requirement

### Requirement: Every authored item stays in the rendered output

Each service's `items` entries MUST remain in the server-rendered output — none MAY be truncated, paraphrased or hidden behind an interaction or a JavaScript reveal. The rendered item count MUST equal the file's authored count (63 at the time of writing; read the file, not this number).

#### Scenario: An item list is compared to the file
- GIVEN any service entry
- WHEN its rendered items are compared against the file's `items` array
- THEN both sides match, entry for entry

### Requirement: Heading levels are preserved

Group titles MUST render as `h3` under the section's `h2`; service titles MUST render as `h4`. No service title MAY become a section heading or an `h2`.

#### Scenario: The section's headings are read
- GIVEN the rendered services section
- WHEN its heading elements are inspected
- THEN groups are `h3`, services are `h4`, and the section's own heading remains the `h2`

### Requirement: Group names ship as authored until the client confirms

The four group titles and thirteen service summaries are repo-authored, not client-confirmed (§14.8). They MUST ship as authored; a confirmation or rename MUST land in `src/content/services.ts` alone, with no component edit. No third party's brand name MAY appear in the catalogue's titles, items, copy or comments — the surface brand removed from this file during exploration is the specific case and MUST NOT reappear.

#### Scenario: The client confirms names
- GIVEN confirmed group names
- WHEN they are recorded
- THEN only the content file changes and the section follows

#### Scenario: The removed brand name is searched
- GIVEN the `src/` tree and a production build
- WHEN the removed brand name is searched for in content, code and comments
- THEN zero occurrences are found

### Requirement: The same presentation serves /servicios

When foundation's `/servicios` route ships, it MUST render this same presentation from the same seam data, with no new spec and no re-authored catalogue copy.

#### Scenario: The route ships
- GIVEN `/servicios` exists
- WHEN it renders the catalogue
- THEN the two-level structure and the authored copy appear unchanged

### Requirement: The grid holds the narrowest viewport

The two-level grid MUST NOT produce horizontal overflow at any width from 320px up — the `site-pages` binding, applied to this layout.

#### Scenario: The narrowest supported viewport
- GIVEN a 320px-wide viewport
- WHEN the services section renders
- THEN the document scroll width does not exceed the viewport width
