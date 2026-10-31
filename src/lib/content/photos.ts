import manifest from "@images/manifest.json";
import type {
  Manifest,
  ManifestPhoto,
  ManifestProject,
} from "@/types/manifest";
import type { Photo } from "@/types/content";

/**
 * Bridges the pipeline's manifest into the view models components consume.
 *
 * This is the only place that knows how a photo's on-disk identity maps to a
 * web path. Alt text comes from the manifest's `note`, which is a real Spanish
 * description written during the ranking pass -- not the filename, which the
 * repository's own AGENTS.md forbids as alt text.
 *
 * The src intentionally points at the full-size AVIF. next/image asks the
 * custom loader for a width, and the loader maps that back down to whichever
 * tiers actually exist for this photo (see src/lib/image/loader.ts).
 */

const data = manifest as Manifest;
const IMAGE_ROOT = "/images";

/** 1/5 and 2/5 sit below portfolio grade and never reach a page. */
const SCORE_FLOOR = 3;

/**
 * The narrowest file a full-bleed slot can be served at. The loader never
 * invents a width the pipeline did not encode, so a narrower source would be
 * upscaled by the browser across the whole viewport.
 */
const FULL_BLEED_WIDTH = 1600;

/** A photograph together with the manifest project it belongs to. */
export interface ProjectPhoto {
  dir: string;
  photo: Photo;
}

/** Web path for a photo's largest encoded AVIF. */
export function photoSrc(dir: string, base: string): string {
  return `${IMAGE_ROOT}/${dir}/${base}.avif`;
}

/** The manifest's projects, in the pipeline's ranking order. */
function orderedProjects(): ManifestProject[] {
  return [...data.projects].sort((a, b) => a.order.localeCompare(b.order));
}

/** A project's publishable photographs, best first. */
function rankedPhotos(project: ManifestProject): ManifestPhoto[] {
  return project.photos
    .filter((photo) => photo.score >= SCORE_FLOOR && !photo.excluded)
    .sort((a, b) => a.order.localeCompare(b.order));
}

function toPhoto(
  dir: string,
  photo: ManifestPhoto,
  projectTitle: string,
): Photo {
  return {
    src: photoSrc(dir, photo.base),
    alt: projectTitle ? `${photo.note} — ${projectTitle}` : photo.note,
    width: photo.full.width,
    height: photo.full.height,
  };
}

/** True when a photograph is wider than it is tall. */
function isLandscape(photo: ManifestPhoto): boolean {
  return photo.full.width > photo.full.height;
}

/**
 * The best photograph of a project that the page is not already showing.
 *
 * `used` is compared by src, which is what makes this an addition to the page
 * rather than a second showing of one file. Landscape is preferred when asked
 * for because the tile band crops rather than letterboxes, and a project with
 * no landscape falls through to its best portrait instead of to nothing -- that
 * fall-through is what used to hand a project's card and its tile the same
 * file. Returns null when every photograph of the project is already on the
 * page, so the caller drops the slot rather than repeating one.
 */
export function pickUnusedProjectPhoto(
  dir: string,
  projectTitle: string,
  used: ReadonlySet<string>,
  orientation: "any" | "landscape" = "any",
): Photo | null {
  const project = findManifestProject(dir);
  if (!project) return null;

  const available = rankedPhotos(project);
  const ordered =
    orientation === "landscape"
      ? [
          ...available.filter(isLandscape),
          ...available.filter((photo) => !isLandscape(photo)),
        ]
      : available;

  const free = ordered.find((photo) => !used.has(photoSrc(dir, photo.base)));

  return free ? toPhoto(dir, free, projectTitle) : null;
}

/** Manifest entry for a project directory, or undefined if it has none. */
export function findManifestProject(dir: string) {
  return data.projects.find((project) => project.dir === dir);
}

/**
 * Resolves a single manifest photograph by its directory and `base` slug.
 * Optionally overrides the alt text when an editorial description is provided.
 */
export function findPhotoByBase(
  dir: string,
  base: string,
  projectTitle = "",
  customAlt?: string,
): Photo | null {
  const project = findManifestProject(dir);
  const entry = project?.photos.find((photo) => photo.base === base);
  if (!project || !entry || entry.score < SCORE_FLOOR || entry.excluded) return null;
  const resolved = toPhoto(dir, entry, projectTitle);
  return customAlt ? { ...resolved, alt: customAlt } : resolved;
}


/**
 * Detects if a photograph documents construction process / structural work ("obra gris").
 * CAS-037 requirement: finished project photos ("obra terminada") must appear first,
 * and construction process photos must appear at the end.
 */
function isObraGris(photo: ManifestPhoto): boolean {
  const text = `${photo.slug} ${photo.note}`.toLowerCase();
  if (
    text.includes("terminad") ||
    text.includes("acabado final") ||
    text.includes("casa terminada") ||
    text.includes("residencia modernizada") ||
    text.includes("de dia con")
  ) {
    return false;
  }
  return [
    "obra",
    "cimentacion",
    "colado",
    "armado",
    "trabajador",
    "albanil",
    "construccion",
    "cimbra",
    "vaciado",
    "andamio",
    "excavadora",
    "mezcladora",
    "manguera",
    "varilla",
    "grua",
    "izado",
    "revolvedora",
    "cuadrilla",
    "materiales-obra",
    "firme",
    "emboquillado",
    "limpieza-juntas",
    "colocacion",
    "frente-obra",
    "bomba-concreto",
    "pluma-bomba",
    "estabilizadores",
    "trazo-laser",
    "nivel-laser",
    "bastidor-metalico",
    "prefabricado",
    "prefabricada",
    "carretilla",
    "excavacion",
    "terraceria",
    "colocando",
    "soldadura",
    "demolicion",
    "maquinaria",
    "compactador",
    "compactacion",
  ].some((term) => text.includes(term));
}

/**
 * Photos for a project, finished first, obra gris at the end (CAS-037).
 *
 * Ordered by the manifest's own quality ranking within each group.
 * Photos scoring 1 or 2 are excluded: AGENTS.md is explicit that the bottom of
 * each folder is below portfolio grade, and a portfolio is judged by its worst
 * photo.
 */
export function getProjectPhotos(dir: string, projectTitle = ""): Photo[] {
  const project = findManifestProject(dir);
  if (!project) return [];

  let photos = rankedPhotos(project);

  // CAS-040: El Bicho exclusions
  if (dir === "02-el-bicho") {
    const excludedBases = new Set([
      "05-bano-espejo-redondo-lavabo", // CAS-040: eliminar foto del bano
      "08-escalera-blanca-cielo-nublado", // CAS-040: duplicada
      "13-fachada-alberca-palmeras", // CAS-040: duplicada
      "16-fachada-palapas-obra-piscina", // CAS-040: duplicada
      "20-balcon-madera-palapa-blanco", // duplicada
      "21-escalera-blanca-palma-adoquin", // CAS-040: duplicada
      "33-trabajadores-terraza-mar", // duplicada
      "36-colado-con-manguera-playa", // CAS-040: bomba concreto pertenece a Palmarito
      "77-bomba-concreto-colado-torre-costa", // CAS-040: bomba concreto pertenece a Palmarito
      "78-colado-losa-superior-estructura-concreto", // CAS-040: bomba concreto pertenece a Palmarito
    ]);
    photos = photos.filter((p) => !excludedBases.has(p.base));
  }

  // CAS-041: Casa Blake exclusions (pool photos moved to El Bicho)
  if (dir === "03-casa-blake-tlalixtac") {
    photos = photos.filter((p) => !p.base.includes("alberca"));
  }

  const finished = photos.filter((p) => !isObraGris(p));
  const obraGris = photos.filter((p) => isObraGris(p));

  const resolved = [...finished, ...obraGris].map((photo) =>
    toPhoto(dir, photo, projectTitle),
  );

  // CAS-040: Integrar en El Bicho las fotos de alberca provenientes de Casa Blake
  if (dir === "02-el-bicho") {
    const blake = findManifestProject("03-casa-blake-tlalixtac");
    if (blake) {
      const blakePool = rankedPhotos(blake).filter((p) =>
        p.base.includes("alberca"),
      );
      const poolFinished = blakePool
        .filter((p) => !isObraGris(p))
        .map((p) => toPhoto("03-casa-blake-tlalixtac", p, projectTitle));
      const poolObraGris = blakePool
        .filter((p) => isObraGris(p))
        .map((p) => toPhoto("03-casa-blake-tlalixtac", p, projectTitle));

      // Insert finished pool photos right after initial finished photos, and obra gris pool at the end
      const bichoFinished = finished.map((p) =>
        toPhoto(dir, p, projectTitle),
      );
      const bichoObraGris = obraGris.map((p) =>
        toPhoto(dir, p, projectTitle),
      );
      return [
        ...bichoFinished,
        ...poolFinished,
        ...bichoObraGris,
        ...poolObraGris,
      ];
    }
  }

  return resolved;
}

/**
 * A project's curated card gallery: the authored `bases` resolved to photographs,
 * best first. Bases that are unknown or below the portfolio floor are dropped.
 * Supports cross-project references formatted as "dir/base".
 * Falls back to the ranked top 3 when nothing is authored, so the card never
 * renders empty.
 */
export function getProjectGallery(
  dir: string,
  projectTitle: string,
  bases: readonly string[] = [],
): Photo[] {
  const project = findManifestProject(dir);
  if (!project && !bases.some((b) => b.includes("/"))) return [];

  const picked: Photo[] = [];
  const seen = new Set<string>();

  for (const base of bases) {
    if (seen.has(base)) continue;

    let targetDir = dir;
    let targetBase = base;
    if (base.includes("/")) {
      const parts = base.split("/");
      targetDir = parts[0];
      targetBase = parts[1];
    }

    const targetProject =
      targetDir === dir ? project : findManifestProject(targetDir);
    if (!targetProject) continue;

    const photo = targetProject.photos.find(
      (p) => p.base === targetBase && p.score >= SCORE_FLOOR && !p.excluded,
    );
    if (!photo) continue;

    seen.add(base);
    picked.push(toPhoto(targetDir, photo, projectTitle));
  }

  if (picked.length === 0 && project) {
    return rankedPhotos(project)
      .slice(0, 3)
      .map((photo) => toPhoto(dir, photo, projectTitle));
  }

  return picked;
}

/**
 * The strongest landscape photograph the landing is not already showing, for
 * the full-bleed band.
 *
 * Landscape and at least `FULL_BLEED_WIDTH` because the band is a `100vw` slot:
 * the loader serves nothing wider than the pipeline encoded, so a narrower
 * source would be stretched. `used` is compared by src, which is what makes the
 * band an addition to the page rather than another showing of a photograph that
 * is already on it. Ties keep the earlier project, so the choice follows the
 * manifest's ranking and not this function's iteration order.
 */
export function strongestUnusedLandscapePhoto(
  used: ReadonlySet<string>,
  resolveTitle: (dir: string) => string,
): ProjectPhoto | null {
  const candidates = orderedProjects().flatMap((project) =>
    rankedPhotos(project)
      .filter(
        (photo) =>
          photo.full.width > photo.full.height &&
          photo.full.width >= FULL_BLEED_WIDTH &&
          !used.has(photoSrc(project.dir, photo.base)),
      )
      .map((photo) => ({ dir: project.dir, photo })),
  );

  if (candidates.length === 0) return null;

  const best = candidates.reduce((leader, candidate) =>
    candidate.photo.score > leader.photo.score ? candidate : leader,
  );

  return {
    dir: best.dir,
    photo: toPhoto(best.dir, best.photo, resolveTitle(best.dir)),
  };
}

/**
 * The project's highest-ranked photo, which is its `01-` entry.
 *
 * `orientation` narrows the candidates before ranking is applied. A slot that
 * renders full width needs a landscape source: four of the six featured covers
 * are portrait, and a 1200x1600 photo stretched across a 1310px card is being
 * upscaled by the browser. Falls back to the rank-1 photo when the project has
 * nothing in the requested orientation, so this never returns null for a
 * project that has photos at all.
 */
export function getProjectCover(
  dir: string,
  projectTitle = "",
  orientation: "any" | "landscape" = "any",
): Photo | null {
  const project = findManifestProject(dir);
  if (!project?.photos.length) return null;

  const ranked = rankedPhotos(project);
  const candidates =
    orientation === "landscape"
      ? ranked.filter((photo) => photo.full.width > photo.full.height)
      : ranked;

  return toPhoto(dir, candidates[0] ?? ranked[0], projectTitle);
}

export function getProjectPhotoCount(dir: string): number {
  return findManifestProject(dir)?.photos.length ?? 0;
}

export const manifestMeta = {
  generated: data.generated,
  projects: data.stats.projects,
  photos: data.stats.photos,
};
