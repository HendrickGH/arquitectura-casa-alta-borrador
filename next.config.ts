import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The optimized set already exists and was hand-tuned (AVIF q62, tiers chosen
    // from measurements recorded in CLAUDE.md). A custom loader serves those exact
    // files instead of letting Netlify Image CDN re-derive them, because Netlify's
    // content negotiation prefers WebP over AVIF and WebP measurably grows this
    // corpus (q82 lands at 100-102% of the original). See src/lib/image/loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/image/loader.ts",

    // These candidate widths must line up with the tiers the pipeline actually
    // encoded. Next's defaults start at 640, which makes the 480 tier
    // unreachable: a 375px phone would ask for 640 and the loader would round UP
    // to the 960 file, doubling what it downloads. Measured, not guessed -- with
    // the defaults, /images/02-el-bicho/01-... at 640w resolved to the -960 AVIF.
    //
    // KNOWN LIMITATION, deliberate and bounded. The pipeline sizes tiers by LONG
    // EDGE, so a photo's real pixel widths depend on its aspect ratio: 47 photos
    // are [480, 960, 1600], another 47 are [360, 720, 1200], and the corpus has 25
    // distinct full-srcset signatures in all. Next labels each srcset entry with
    // the width it REQUESTED rather than the width the loader returned, so the
    // label drifts in BOTH directions -- measured from the built HTML:
    //   10-obra-punta-zicatela/...-960.avif 480w  -> a 720px file (label understates)
    //   hero/...playa.avif                  2000w -> a 1600px file (label overstates)
    // The understating case only over-delivers. The overstating case is the
    // loader's widest-variant fallback, which happens because no larger file
    // exists -- the alternative is inventing a path that would 404.
    // Of the candidate sets measured across the corpus, this one had the lowest
    // mean delivered/requested ratio (0.927). The other candidates tried were
    // evaluated ad hoc and are not recorded in the repo; do not reconstruct them.
    // The real fix is to normalise variant widths in the pipeline rather than
    // tiering by long edge; that is a pipeline change, not a site change.
    deviceSizes: [480, 960, 1600, 2000],
    // Used when a caller omits `sizes`. Every Photo in this codebase passes one,
    // so these exist only to keep the scale valid and ordered below deviceSizes.
    imageSizes: [240, 384],
  },
};

export default nextConfig;
