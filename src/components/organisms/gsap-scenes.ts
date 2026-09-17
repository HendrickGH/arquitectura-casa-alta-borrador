import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SceneMode = "drift" | "breathe";

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
 * move when the hero's photograph and the masonry's intrinsic boxes land.
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
 * The masonry's photographs drift by column as the wall crosses the viewport.
 *
 * CSS multi-column builds its columns with no elements to select, so the items
 * are grouped by the column the browser placed them in and each group gets its
 * own scrub distance, centred so the extremes move apart. Transform only: no
 * layout property moves and every item keeps its intrinsic ratio.
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

  const groups = [...columns.values()];
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
 * The second full-bleed photograph settles as its band crosses the viewport.
 *
 * A scrubbed scale with no pin, so no spacer is inserted and the sticky chrome
 * is untouched; the transform stays on transform/opacity only.
 */
function buildBreathe(scope: HTMLElement) {
  const image = scope.querySelector<HTMLElement>("[data-scene-image]");
  if (!image) return;

  gsap.fromTo(
    image,
    { scale: 1.06, yPercent: -2 },
    {
      scale: 1,
      yPercent: 0,
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
 * Builds the scroll choreography for one wrapped section and returns its
 * cleanup.
 *
 * Everything is created inside `gsap.matchMedia()` under
 * `prefers-reduced-motion: no-preference`, so the reduced path ships no tween
 * at all and every section paints in its settled, visible state; nothing is
 * gated on an animation completing. `media.revert()` in the cleanup kills the
 * timeline and its ScrollTrigger together, so no trigger outlives the wrapper.
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
    if (mode === "drift") buildDrift(scope);
    else buildBreathe(scope);
  });

  return () => media.revert();
}
