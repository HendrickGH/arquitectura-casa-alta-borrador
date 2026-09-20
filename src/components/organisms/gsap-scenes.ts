import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
 * Builds the scroll choreography for the masonry wall and returns its cleanup.
 *
 * THE WALL IS THE ONLY SCENE LEFT. The hero's and the closing CTA's photo
 * parallax were removed after being measured against a reference: at rest the
 * hero painted its 1600x900 AVIF at 2016x1260 -- a 1.26x upscale behind a 1.4x
 * crop -- and then drifted at 0.32px per scroll px, while the reference site
 * uses no parallax at all and only one-shot reveals. The wall's drift is a
 * different device (per-column, horizontal-free, never scaled) and stays.
 *
 * Everything is created inside `gsap.matchMedia()`. `media.revert()` in the
 * cleanup kills the timeline and its ScrollTrigger together, so no trigger
 * outlives the wrapper, and nothing is gated on an animation completing.
 *
 * The drift is registered under the three-column tier. Its columns are measured
 * once, and the column count changes with the width, so keying the scene to the
 * tier lets `gsap.matchMedia` revert and rebuild it when the wall reflows --
 * otherwise a resize leaves the tweens bound to the columns of the previous
 * layout. Below 1200px the drift has nothing to move: every remaining cell is a
 * double and the doubles anchor (see `buildDrift`).
 */
export function createScenes({ scope }: { scope: HTMLElement }): () => void {
  registerPlugin();
  refreshAfterLayout();

  const media = gsap.matchMedia();
  media.add("(min-width: 1200px)", () => buildDrift(scope));

  return () => media.revert();
}
