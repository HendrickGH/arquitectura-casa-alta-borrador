#!/usr/bin/env node
/**
 * Mirrors the optimized AVIF set into public/ so Next.js can serve it, and
 * emits the variant table the custom image loader resolves against.
 *
 * Why a mirror instead of pointing at images-optimizado/ directly: only public/
 * is served, and images-optimizado/ lives at the repository root because the
 * pipeline owns it. Mirroring the AVIF set alone measures 56.1 MB across 599
 * files -- 207 primaries at 34.3 MB, 207 `-480` at 5.4 MB, 185 `-960` at 16.4 MB
 * -- against the 63.6 MB of untouched JPEG fallbacks, which are never mirrored
 * because the loader never asks for them.
 *
 * (This comment used to claim "~34 MB". That figure was the primaries alone, and
 * it came from CLAUDE.md's "63.6 MB -> 34.0 MB", which measured primaries too.
 * An earlier version of this same mistake said the deploy set was "~34 MB" when
 * it is 56.1 MB.)
 *
 * Idempotent: files are re-copied only when size or mtime differs from source.
 * Wired to predev and prebuild in package.json. Because public/images is
 * gitignored, the Netlify build MUST go through `pnpm build` (or `pnpm run
 * build`) so this prebuild step runs -- a netlify.toml that bypasses it deploys
 * a site whose images all 404, silently.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "images-optimizado");
const target = join(root, "public", "images");
const tablePath = join(root, "src", "lib", "image", "variants.generated.json");

/** Every .avif under a directory tree, as paths relative to it. */
function collectAvif(dir, base = dir, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collectAvif(full, base, found);
    else if (entry.name.endsWith(".avif")) found.push(relative(base, full));
  }
  return found;
}

const files = collectAvif(source).sort();

let copied = 0;
let skipped = 0;
for (const rel of files) {
  const from = join(source, rel);
  const to = join(target, rel);
  const src = statSync(from);

  let needsCopy = true;
  try {
    const dst = statSync(to);
    needsCopy = dst.size !== src.size || dst.mtimeMs < src.mtimeMs;
  } catch {
    // target missing
  }

  if (needsCopy) {
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
    copied++;
  } else {
    skipped++;
  }
}

/**
 * Variant table: "<projectDir>/<base>" -> ascending [width, filename] pairs.
 *
 * The manifest's srcset is the authority, not the `tiers` array. `tiers: [480, 960]`
 * labels the long edge while the srcset `w` descriptor is the actual width, so a
 * 1200x1600 portrait reports 360/720/1200 and its files are still named -480/-960.
 * The width cannot be derived from the filename, so both are kept here. 22 photos
 * have only a -480 variant and two project covers have no -960 at all; a loader
 * that recomputed tiers instead of reading this table would 404 on them.
 */
const manifest = JSON.parse(
  readFileSync(join(source, "manifest.json"), "utf8"),
);
const variants = {};

for (const project of manifest.projects) {
  for (const photo of project.photos) {
    const entries = photo.srcset.split(",").map((part) => {
      const [file, descriptor] = part.trim().split(/\s+/);
      return [Number(descriptor.replace("w", "")), file];
    });
    variants[`${project.dir}/${photo.base}`] = entries.sort(
      (a, b) => a[0] - b[0],
    );
  }
}

// The hero is not part of the pipeline's manifest, so tools/hero.sh emits its own
// sidecar in the same shape. Merged rather than special-cased at the loader.
try {
  Object.assign(
    variants,
    JSON.parse(readFileSync(join(source, "hero", "hero.json"), "utf8")),
  );
} catch {
  // No hero encoded yet; the landing simply has nothing to show.
}

mkdirSync(dirname(tablePath), { recursive: true });
writeFileSync(tablePath, JSON.stringify(variants, null, 2) + "\n");

console.log(
  `sync-images: ${copied} copied, ${skipped} unchanged -> public/images ` +
    `(${files.length} avif files, ${Object.keys(variants).length} photos indexed)`,
);
