# Delta for SEO Discovery

**Change:** `casa-alta-web-foundation` · **Capability:** `seo-discovery` · **Delta:** ADDED
**Status:** **NOT implemented.** No `sitemap.ts`, no `robots.ts`, no structured data and no social card exists in `src/`. The data needed already sits in `images-optimizado/manifest.json`.

## ADDED Requirements

### Requirement: An image sitemap is emitted

The build MUST emit `sitemap.xml` containing one entry per public route, and every photograph entry MUST carry `image:image` metadata. Image data MUST come from `manifest.json`, and the two pipeline traps MUST be respected: no entry MAY reference a variant file the pipeline never encoded.

#### Scenario: The sitemap is generated
- GIVEN the build completes
- WHEN `sitemap.xml` is read
- THEN each published project route appears with its photographs as `image:image` entries

#### Scenario: A trap variant is referenced
- GIVEN an entry names `09-casa-santa-rosa/01-pergola-madera-terraza-piso-960.avif`
- WHEN the sitemap is validated against `public/images/`
- THEN the missing file is reported and the build gate fails

### Requirement: Structured data describes the images

Published pages MUST carry `ImageObject` JSON-LD describing the photographs shown, derived from the manifest's own fields. JSON-LD MUST validate and MUST NOT assert a fact that is not in the repository.

#### Scenario: JSON-LD is emitted
- GIVEN a project page renders
- WHEN its JSON-LD is parsed
- THEN each `ImageObject` carries a URL, width and height taken from the manifest

#### Scenario: A fact is unconfirmed
- GIVEN a project has no confirmed location or year
- WHEN its JSON-LD is generated
- THEN those properties are omitted rather than guessed

### Requirement: Crawler directives are published

`robots.txt` MUST be served, MUST allow crawling of the public pages and images, and MUST reference the sitemap.

#### Scenario: A crawler requests the directives
- GIVEN `/robots.txt` is requested
- WHEN it is served
- THEN it allows the public routes, points at the sitemap location, and excludes nothing that must rank

### Requirement: Social cards are declared

Every public page MUST declare social card metadata, including an Open Graph image and a Twitter card type.

#### Scenario: A project URL is shared
- GIVEN a project page URL is pasted into a social platform
- WHEN the platform unfurls it
- THEN a title, description and image are available, the image being a pre-encoded file

### Requirement: Alt text is authored description

Every photograph's `alt` MUST be authored description, never the filename and never the numeric prefix. Today it is composed from the manifest's Spanish `note` joined to the project title, and that arrangement MUST be preserved.

#### Scenario: A photo renders
- GIVEN any photograph in any rendered page
- WHEN its `alt` is read
- THEN it describes the image and contains no filename or `NN-` prefix

#### Scenario: A project title is unavailable
- GIVEN a photo rendered without a project title
- WHEN its `alt` is read
- THEN the manifest's note is used alone rather than a fallback to the filename
