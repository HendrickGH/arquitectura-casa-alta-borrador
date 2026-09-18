import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SceneMode = "drift" | "breathe" | "lift";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";

let pluginRegistered = false;
let refreshScheduled = false;

/** Register ScrollTrigger once, no matter how many scenes mount. */
function registerPlugin() {
  if (pluginRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginRegistered = true;
}

/**
 * Refresh once after the landing's images and fonts settle: trigger positions
 * move when the hero's photograph and the masonry's boxes land.
 *
 * Resize is ScrollTrigger's own job (debounced 200ms) and is deliberately not
 * handled here.
 */
function refreshAfterLayout() {
  if (refreshScheduled) return;
  refreshScheduled = true;

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts) void document.fonts.ready.then(refresh).catch(() => {});
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });
}

/**
 * The masonry's single-cell photographs drift by column as the wall crosses the
 * viewport.
 *
 * The double cells are the anchors, and they carry no `data-drift-item`: a
 * double spans two columns at the three-column tier (and two rows below it), so
 * any translation pulls it out of the row it shares with its neighbours -- read
 * as a photograph sitting slightly off its grid position. Only single cells
 * move, which is why this only ever runs at the three-column tier: below it the
 * wall's left column is nothing but doubles, and one column cannot drift against
 * itself.
 *
 * The columns are sorted by their left edge before the offsets are handed out.
 * The grid's dense auto-placement does not walk the DOM column by column -- an
 * early double pins itself to the second column and the cursor back-fills behind
 * it -- so the order the columns are first seen in is not their order on screen,
 * and centring the travel over that order gave one column the whole offset while
 * the opposite one did not move at all. Transform only: no layout property moves.
 */
function buildDrift(scope: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-drift-item]", scope);
  if (items.length === 0) return;

  const columns = new Map<number, HTMLElement[]>();
  for (const item of items) {
    const key = Math.round(item.getBoundingClientRect().left);
    const bucket = columns.get(key);
    if (bucket) bucket.push(item);
    else columns.set(key, [item]);
  }

  const groups = [...columns.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, elements]) => elements);
  if (groups.length < 2) return;

  const TRAVEL = 24;
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  groups.forEach((elements, index) => {
    const shift = (index - (groups.length - 1) / 2) * TRAVEL;
    if (shift === 0) return;
    timeline.fromTo(elements, { y: -shift }, { y: shift, ease: "none" }, 0);
  });
}

/**
 * The photograph inside a full-bleed band drifts against the page as the band
 * crosses the viewport.
 *
 * THE BAND'S OWN TRAVEL IS THE EFFECT. A scrubbed translation on the image
 * makes it cover less ground per pixel of scroll than the type in front of it:
 * the frame slides, the photograph lags, and the block reads as a window rather
 * than a picture scrolling by. That is the `background-attachment: fixed` look
 * without the property -- which this site cannot use, because it would take the
 * photograph out of next/image and put a single unoptimised asset back on the
 * page, and because the property is unreliable on mobile Safari.
 *
 * WHY IT IS SCALED UP. `data-scene-image` is exactly the wrapper's size, so any
 * translation would expose an edge; the scale is the headroom that pays for it.
 * The bound is `|yPercent| <= 50 * (scale - 1)`: below that bound no edge shows
 * at either end of the scrub. The values here keep a margin rather than sit on
 * the limit, and the scale stays a constant-ish value so the crop does not
 * breathe as it moves.
 *
 * A pin is deliberately avoided: no spacer is inserted and the sticky chrome is
 * untouched. Only transform moves -- no layout property, no opacity.
 *
 * The travel is authored to be SEEN THROUGH THE SCRIM. The band's overlay sits
 * at 0.68-0.82 alpha so the centred copy holds contrast, and an earlier 2%
 * travel was invisible beneath it. The percentage below is what reads through
 * that much dark.
 */
function buildBreathe(scope: HTMLElement) {
  const image = scope.querySelector<HTMLElement>("[data-scene-image]");
  if (!image) return;

  gsap.fromTo(
    image,
    { yPercent: -20, scale: 1.45 },
    {
      yPercent: 20,
      scale: 1.42,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}

/**
 * The hero's photograph drifts against the page as the opening viewport scrolls
 * away. Same choreography as the closing band (`buildBreathe`); the only
 * difference is the range.
 *
 * The hero starts at the top of the document, so its own height is the whole
 * range: `top top` to `bottom top`. That makes the parallax begin with the very
 * first scroll instead of only once the block has fully entered, which is what
 * a viewport that is already on screen needs.
 */
function buildLift(scope: HTMLElement) {
  const image = scope.querySelector<HTMLElement>("[data-scene-image]");
  if (!image) return;

  gsap.fromTo(
    image,
    { yPercent: -16, scale: 1.4 },
    {
      yPercent: 16,
      scale: 1.36,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}

/**
 * Builds the scroll choreography for one wrapped section and returns its
 * cleanup.
 *
 * Everything is created inside `gsap.matchMedia()` under
 * `prefers-reduced-motion: no-preference`, so the reduced path ships no tween
 * at all and every section paints in its settled, visible state; nothing is
 * gated on an animation completing. `media.revert()` in the cleanup kills the
 * timeline and its ScrollTrigger together, so no trigger outlives the wrapper.
 *
 * The drift is registered under the motion query *and* the three-column tier.
 * Its columns are measured once, and the column count changes with the width, so
 * keying the scene to the tier lets `gsap.matchMedia` revert and rebuild it when
 * the wall reflows -- otherwise a resize leaves the tweens bound to the columns
 * of the previous layout. Below 1200px the drift has nothing to move: every
 * remaining cell is a double and the doubles anchor (see `buildDrift`).
 */
export function createScenes({
  scope,
  mode,
}: {
  scope: HTMLElement;
  mode: SceneMode;
}): () => void {
  registerPlugin();
  refreshAfterLayout();

  const media = gsap.matchMedia();
  media.add(MOTION_OK, () => {
    if (mode === "breathe") buildBreathe(scope);
    if (mode === "lift") buildLift(scope);
  });
  if (mode === "drift") {
    media.add(`${MOTION_OK} and (min-width: 1200px)`, () => buildDrift(scope));
  }

  return () => media.revert();
}
