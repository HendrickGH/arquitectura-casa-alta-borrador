import type { ImageLoaderProps } from "next/image";
import table from "./variants.generated.json";

/**
 * Resolves `next/image` requests to the AVIF files the pipeline already produced.
 *
 * Why a custom loader rather than the default optimizer: on Netlify the default
 * path routes through Netlify Image CDN, whose content negotiation prefers WebP
 * over AVIF. WebP measurably grows this corpus (q82 lands at 100-102% of the
 * original), so the default would undo the pipeline's main win. Here the URL
 * resolves to a static file that is already encoded, already capped at 2000px,
 * and already split into tiers that were chosen from real measurements.
 *
 * `variants.generated.json` is written by tools/sync-images.mjs. It maps
 * "<projectDir>/<base>" to ascending [width, filename] pairs taken from the
 * manifest's own srcset, because the filename's -480/-960 suffix is the long
 * edge while the real width depends on aspect ratio, and not every photo has
 * every tier.
 */
const variants = table as unknown as Record<string, [number, string][]>;

const PREFIX = "/images/";

export default function casaAltaLoader({
  src,
  width,
}: ImageLoaderProps): string {
  const path = src.startsWith(PREFIX) ? src.slice(PREFIX.length) : src;
  const slash = path.lastIndexOf("/");
  const dir = slash === -1 ? "" : path.slice(0, slash);
  const base = path.slice(slash + 1).replace(/\.avif$/, "");
  const entries = variants[dir ? `${dir}/${base}` : base];

  // Unknown src: hand it back untouched rather than inventing a path.
  if (!entries?.length) return src;

  // Narrowest variant that still covers the requested width; widest if none does.
  const [entry] = entries.filter(([available]) => available >= width);
  const [, file] = entry ?? entries[entries.length - 1];

  return `${PREFIX}${dir ? `${dir}/` : ""}${file}`;
}
