# Delta for Stock Imagery

**Change:** `casa-alta-site-redesign` · **Capability:** `stock-imagery` · **Delta:** ADDED
**Status:** **NOT implemented.** No `images/editorial/` namespace exists. The only piece of the contract in place is the `hero/hero.json` sidecar precedent, merged into the loader's variant table by `tools/sync-images.mjs:103-112`.
**Bindings:** inherits `image-url-routing` (loader contract, `check:images`, repository safety around `images/`) and `seo-discovery` (authored `alt`, sitemap image entries); the second corpus constraint in `references/README.md` — intentional imagery rather than arbitrary stock assets — is adopted here as a requirement.

## ADDED Requirements

### Requirement: Stock lives in its own namespace, add-only

Stock sources MUST be ingested into a new `images/editorial/<slug>/` subtree, and MUST come only from the source the client authorised in the brief's §0 (Unsplash); no other external imagery MAY be ingested. Ingestion MUST NOT write, rename or delete any file already committed under `images/`. `images/editorial/` is the only `images/` subtree this change may write to.

#### Scenario: An image is ingested
- GIVEN a selected stock photograph
- WHEN it is added
- THEN its source sits under `images/editorial/<slug>/` and no pre-existing file under `images/` changed

#### Scenario: The staging is reviewed
- GIVEN the ingestion commit
- WHEN its staged paths are listed
- THEN only new paths under `images/editorial/` and `images-optimizado/editorial/`, plus tooling and content files, are staged

### Requirement: Stock is pipelined, never hotlinked

Every stock image MUST be downloaded and encoded by a `tools/hero.sh`-shaped script into `images-optimizado/editorial/`, producing the AVIF tiers and a JSON sidecar in `hero/hero.json`'s shape that `tools/sync-images.mjs` merges into the loader's variant table. The shipped site MUST NOT reference an external image URL; every rendered image MUST resolve to a `/images/...` file, and `npm run check:images` MUST pass.

#### Scenario: The emitted HTML is searched for external hosts
- GIVEN a production build
- WHEN every image source in the emitted HTML is collected
- THEN none references an external host

#### Scenario: The loader sees the sidecar
- GIVEN `pnpm images:sync` has run after ingestion
- WHEN the variant table is read
- THEN the editorial entries appear in the same shape as `hero/hero.json`'s

### Requirement: Every stock image carries a provenance record

Each ingested image MUST have a committed provenance record carrying its source page URL, the photographer's name, and the licence under which it is used. An image with a missing or incomplete record MUST NOT ship.

#### Scenario: The records are audited
- GIVEN the `images/editorial/` tree
- WHEN its files are compared against the provenance records
- THEN every file has a record and every record names page URL, photographer and licence

#### Scenario: A record is incomplete
- GIVEN an image whose record lacks the photographer
- WHEN the section using it is reviewed
- THEN the image does not ship

### Requirement: Stock never represents obra

Stock MUST NOT appear in the portfolio, the masonry, any project gallery, or any per-project sitemap entry, and MUST NOT be captioned or attributed as the studio's own work. It MAY carry texture only for sections that have no real photograph of their own. The separation MUST be structural — a separate directory and sidecar — not a site-side exclusion list: `src/lib/content/photos.ts` MUST keep reading only `manifest.projects`.

#### Scenario: The obra surfaces are read
- GIVEN the built landing's portfolio and masonry sections and any gallery page
- WHEN their image sources are collected
- THEN none resolves under `editorial/`

#### Scenario: The sitemap is read
- GIVEN foundation's image sitemap is emitted
- WHEN its `image:image` entries are read
- THEN none names an editorial file, because project entries derive from project galleries alone

### Requirement: Ingestion is staged deliberately and remains reversible

Staging MUST be deliberate (no `git add -A`), and the git guard's 50-file / 20 MB warning MUST be the tripwire for an oversized ingestion. A rollback MUST remove published outputs and references but MUST NOT delete any committed source under `images/editorial/` — regenerating outputs is idempotent.

#### Scenario: A rollback is executed
- GIVEN stock imagery was ingested and shipped
- WHEN the stock sections are reverted
- THEN published references and generated outputs are removed, and the committed sources remain
