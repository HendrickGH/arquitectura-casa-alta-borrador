# Delta for Image URL Routing

**Change:** `casa-alta-web-foundation` · **Capability:** `image-url-routing` · **Delta:** ADDED
**Status:** image delivery is implemented and verified; clean public URL routing is forward scope.

## ADDED Requirements

### Requirement: Image delivery through the pre-encoded variant table

`next/image` MUST be configured with `loader: "custom"` and `loaderFile: "./src/lib/image/loader.ts"`. The loader MUST resolve `"<dir>/<base>"` against `src/lib/image/variants.generated.json`, MUST return an unknown `src` untouched, and MUST select the narrowest variant covering the request, falling back to the widest when none does.

#### Scenario: A known source resolves to an encoded file
- GIVEN a photo present in the variant table
- WHEN the loader is asked for a width
- THEN it returns an `.avif` path from that entry

#### Scenario: An unknown source is not rewritten
- GIVEN a `src` absent from the variant table
- WHEN the loader is called
- THEN it returns `src` unchanged rather than inventing a path

#### Scenario: A request wider than every variant
- GIVEN `hero/vista-aerea-palapas-alberca-playa`, whose widest variant is its 1600px full file
- WHEN the loader is asked for 2000
- THEN it returns that file, never a path that would 404

### Requirement: No on-demand re-encoding and no image CDN

The system MUST serve the bytes the pipeline encoded. It MUST NOT route images through Netlify Image CDN or any on-demand transformer, and MUST NOT re-encode a `.jpg` fallback.

#### Scenario: Built HTML references only pre-encoded files
- GIVEN `next build` has produced `.next`
- WHEN every `/images/...` reference in the emitted HTML is collected
- THEN each names a file already present under `public/images/`

### Requirement: The 480 tier stays reachable

`next.config.ts` MUST keep `deviceSizes` starting at 480 (`[480, 960, 1600, 2000]`). Next's default scale, which starts at 640, MUST NOT be used.

#### Scenario: A narrow phone asks for the smallest tier
- GIVEN a 375px-wide viewport
- WHEN `next/image` selects a candidate width
- THEN 480 is offered, so the loader returns the 480-tier file instead of the 960 one

### Requirement: Every emitted image URL resolves

`npm run check:images` MUST run after `next build` and MUST exit non-zero when any referenced image is missing, or when either cover with no `-960` variant is requested:
`/images/07-casa-tarrastro/01-fachada-piedra-pergola-jardin-960.avif`,
`/images/09-casa-santa-rosa/01-pergola-madera-terraza-piso-960.avif`.

#### Scenario: A clean build passes the gate
- GIVEN the built site references only files that exist
- WHEN `npm run check:images` runs
- THEN it reports the distinct URL count and exits 0

#### Scenario: A variant path is derived from the requested width
- GIVEN code builds a variant URL from the requested width instead of reading availability
- WHEN the build emits that URL
- THEN the gate exits non-zero and names it

### Requirement: Clean public image URLs are a routing change

Clean URLs MUST be produced by mapping the pipeline's `NN-<slug>` directory to `<slug>` in code. No file or directory under `images/` or `images-optimizado/` MUST be renamed for it, and no rename MAY change a numeric prefix. Both URL forms MAY resolve during a transition.

#### Scenario: A clean URL resolves without a rename
- GIVEN `01-casa-blake-tlalixtac` on disk
- WHEN the clean slug is requested
- THEN the same bytes are served and the on-disk name is unchanged

#### Scenario: A renumbering rename is staged
- GIVEN a staged rename changing a numeric prefix
- WHEN the commit runs
- THEN the repository guard denies it

### Requirement: The long-edge descriptor drift is fixed in the pipeline

The drift recorded in `next.config.ts` — `tools/variants.sh` tiers by LONG edge while the srcset descriptor names the actual width — MUST be resolved by normalising variant widths in `tools/variants.sh`. It MUST NOT be compensated for in `next.config.ts` or in the loader.

#### Scenario: The limitation is still present
- GIVEN a portrait photo whose `-960` file is 720px wide
- WHEN the build emits its srcset
- THEN descriptor and file width disagree, and no site-side code hides it

### Requirement: Repository safety during image regeneration

Regeneration of `images-optimizado/` MUST be staged deliberately. No change MAY write, rename or delete a file under `images/`, `git add -A` MUST NOT follow a pipeline run, and no commit MAY carry AI attribution.

#### Scenario: A pipeline run finishes
- GIVEN `tools/variants.sh` has rewritten `images-optimizado/`
- WHEN the result is staged
- THEN only intended paths are staged, `images/` is untouched, and no attribution trailer was added
