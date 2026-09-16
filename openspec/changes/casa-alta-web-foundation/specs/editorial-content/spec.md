# Delta for Editorial Content

**Change:** `casa-alta-web-foundation` · **Capability:** `editorial-content` · **Delta:** ADDED
**Status:** the integrity policy is implemented and verified; client-confirmed data and site identity are forward scope pending client input.

## ADDED Requirements

### Requirement: No fabricated editorial data

A project MUST NOT render a location, year, client or story that was not confirmed by the client. Where a narrative field is unconfirmed it MUST stay an empty string rather than carry a guess, an inference from a photo note, or a placeholder.

#### Scenario: A project's year is unconfirmed
- GIVEN the 14 entries in `src/content/projects.ts`, none of which has a confirmed `year`
- WHEN a project page renders
- THEN no year is displayed, and no value was invented to fill the field

#### Scenario: Copy pressure to fill a field
- GIVEN a request to make a provisional project "look complete"
- WHEN the field is edited
- THEN it is filled only from client-confirmed input, not from plausible prose

### Requirement: Absent data renders as absent

A project MUST render only when both halves exist: an editorial entry and a manifest entry with a usable cover. A section whose data is empty MUST render as absent rather than as an empty shell.

#### Scenario: A project is half-configured
- GIVEN a project with editorial data but no manifest cover
- WHEN `getProjects()` runs
- THEN that project is omitted rather than rendered as an empty card

#### Scenario: A testimonial section has no items
- GIVEN `src/content/testimonials.ts` exports an empty array
- WHEN the landing renders
- THEN the testimonials section is absent from the output

### Requirement: Testimonials stay empty until real client words exist

`testimonials.ts` MUST remain an empty array until real client quotes exist. No placeholder, sample, or attributed-to-a-real-project quote MAY be added. When entries do arrive, each MUST be attributed to the project name supplied with the quote.

#### Scenario: The array is empty
- GIVEN no client has supplied a quote
- WHEN any change touches the landing
- THEN the array stays `[]` and the section stays absent

#### Scenario: A real quote arrives
- GIVEN a client supplies a quote and names the project
- WHEN the entry is recorded
- THEN the quote and that project name are stored verbatim, with no added claim

### Requirement: Site identity only from supplied values

Site identity fields MUST be populated only from values the client supplied. A social entry whose href is empty MUST be omitted from the rendered output rather than rendered as a dead link. A replacement logo MUST NOT be introduced as a raster that this repository cannot regenerate; when a vector is supplied it SHOULD be an SVG and its derivation SHOULD be scripted under `tools/`.

#### Scenario: A social handle is missing
- GIVEN Facebook and TikTok entries carry `href: ""`
- WHEN the utility bar and footer render
- THEN those entries produce no link element

#### Scenario: A social URL is supplied
- GIVEN the client supplies the Facebook URL
- WHEN it is recorded in `src/content/site.ts`
- THEN it renders with no component change needed

#### Scenario: The vector logo arrives
- GIVEN the client supplies an SVG lockup
- WHEN it replaces the raster in `public/brand/`
- THEN `Logo.tsx` renders it and the derivation is reproducible from the repository

### Requirement: Client-confirmed project data is forward scope

Filling `location`, `year`, `summary` and `story` for the 12 provisional projects and the 1 location-only project MUST happen only against client-confirmed input. **This requirement is NOT implemented:** 12 projects are provisional and no project has a confirmed year.

#### Scenario: A project is confirmed
- GIVEN the client confirms location, year, summary and story for one project
- WHEN the entry is updated
- THEN those four fields carry the confirmed values and nothing else changes
