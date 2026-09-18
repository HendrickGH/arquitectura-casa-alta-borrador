# Delta for Services Presentation

**Change:** `casa-alta-site-redesign` · **Capability:** `services-presentation` · **Delta:** ADDED
**Status:** **Implemented.** The catalogue renders as four editorial chapters — a chapter number, the group title and its intro, then one alternating photographic panel per service (`ServicesIndex` / `ServiceRow`), each with its ingested editorial image. This supersedes both the linear index and the planned two-level grid; both are recorded in `design.md` §D8.
**Bindings:** inherits `site-pages` (`h2` sections, zero overflow from 320px), `cms-migration` (the seam is the only reader; components receive props), `stock-imagery` (the panels' images are the section's only stock) and `editorial-content` (unconfirmed copy ships as authored); the presentation is the arrangement — the catalogue's identity (4 groups / 13 services / 63 items) is unchanged.

## ADDED Requirements

### Requirement: The catalogue renders as chapters with one panel per service

The services section MUST render the four authored group titles as chapter headers, and all thirteen authored service titles inside their own group and after that group's intro. None of the four groups and none of the thirteen services MAY be dropped, merged, reordered or moved between groups. Every service SHOULD render with its editorial image in an alternating panel; a service without an ingested image MUST still render as a text block, so the section never depends on stock to be complete. The mapping MUST come from the seam (`getServiceGroups()`), never from a component-side literal.

#### Scenario: The section renders
- GIVEN the landing's services section
- WHEN group and service titles are read from the emitted HTML
- THEN 4 group titles and 13 service titles appear, each service inside its authored group

#### Scenario: A service has no image
- GIVEN a service whose image dimensions were not ingested
- WHEN the section renders
- THEN the service still appears, as a text block, with no empty image slot

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

### Requirement: Titles and deliverables ship as authored; intros and summaries are revisable copy

The thirteen service titles and the sixty-three deliverable items MUST ship exactly as authored. The four group titles are repo-authored and ship as authored until the client confirms them (§14.8). The group intros and service summaries are repo-authored copy and MAY be revised client-directed; a revision MUST land in `src/content/services.ts` alone, with no component edit. No third party's brand name MAY appear in the catalogue's titles, items, copy or comments — the surface brand removed from this file during exploration is the specific case and MUST NOT reappear.

#### Scenario: The copy is revised
- GIVEN revised intros or summaries
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
- THEN the chapter structure and the authored copy appear unchanged

### Requirement: The catalogue holds the narrowest viewport

The chaptered catalogue and its panels MUST NOT produce horizontal overflow at any width from 320px up — the `site-pages` binding, applied to this layout.

#### Scenario: The narrowest supported viewport
- GIVEN a 320px-wide viewport
- WHEN the services section renders
- THEN the document scroll width does not exceed the viewport width
