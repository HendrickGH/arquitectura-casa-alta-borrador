#!/usr/bin/env node
/**
 * Verifies that every image URL the built site emits actually resolves to a file.
 *
 * This exists because of a specific, measured failure mode. manifest.json's
 * `tiers: [480, 960]` is the LONG EDGE while the srcset `w` descriptor is the
 * ACTUAL width, so a 1200x1600 portrait advertises 360w/720w/1200w while its
 * files are named -480/-960. Add to that: 22 photos have no -960 variant and
 * two project covers have no -960 at all. Any code that derives a variant path
 * from the requested width instead of reading availability will 404, and it
 * will do so silently -- the page still renders, just with broken images.
 *
 * Run after `next build`. Exits non-zero if anything is missing.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const nextDir = join(root, ".next");

if (!existsSync(nextDir)) {
  console.error(
    "check-image-urls: no .next directory. Run `npm run build` first.",
  );
  process.exit(1);
}

/** Every HTML file the build produced, wherever Next put it. */
function collectHtml(dir, found = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "cache") continue;
      collectHtml(full, found);
    } else if (entry.name.endsWith(".html")) {
      found.push(full);
    }
  }
  return found;
}

const htmlFiles = collectHtml(nextDir);
if (!htmlFiles.length) {
  console.error("check-image-urls: the build produced no HTML to inspect.");
  process.exit(1);
}

// Collect every /images/... reference from src, srcset and CSS url() alike.
const referenced = new Set();
const referencePattern = /\/images\/[A-Za-z0-9._\-/]+\.(?:avif|jpg|png|webp)/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(referencePattern)) referenced.add(match[0]);
}

const missing = [];
for (const url of referenced) {
  const onDisk = join(publicDir, url.replace(/^\//, ""));
  if (!existsSync(onDisk)) missing.push(url);
}

/** Sanity: the two covers known to lack a -960 must never be asked for one. */
const knownTraps = [
  "/images/07-casa-tarrastro/01-fachada-piedra-pergola-jardin-960.avif",
  "/images/09-casa-santa-rosa/01-pergola-madera-terraza-piso-960.avif",
];
const trapsHit = knownTraps.filter((url) => referenced.has(url));

const totalBytes = [...referenced]
  .map((url) => {
    const onDisk = join(publicDir, url.replace(/^\//, ""));
    return existsSync(onDisk) ? statSync(onDisk).size : 0;
  })
  .reduce((sum, size) => sum + size, 0);

console.log(
  `check-image-urls: ${referenced.size} distinct image URLs across ` +
    `${htmlFiles.length} built HTML file(s), ${(totalBytes / 1048576).toFixed(1)} MB total`,
);

if (trapsHit.length) {
  console.log("\n  TRAP HIT — an unavailable tier was requested:");
  for (const url of trapsHit) console.log(`    ${url}`);
}

if (missing.length) {
  console.error(`\n  ${missing.length} referenced image(s) do not exist:`);
  for (const url of missing.slice(0, 25)) console.error(`    ${url}`);
  if (missing.length > 25)
    console.error(`    ...and ${missing.length - 25} more`);
  process.exit(1);
}

if (trapsHit.length) process.exit(1);

console.log("  every referenced image resolves.");
