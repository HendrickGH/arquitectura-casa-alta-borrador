import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;
let refreshScheduled = false;

/** Register ScrollTrigger once, no matter how many scenes mount. */
export function registerGsapPlugins() {
  if (pluginRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginRegistered = true;
}

/**
 * Refresh once after the landing's images and fonts settle: trigger positions
 * move when the hero's photograph and the masonry's boxes land.
 */
export function refreshAfterLayout() {
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

  const TRAVEL = 28;
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

export function createScenes({ scope }: { scope: HTMLElement }): () => void {
  registerGsapPlugins();
  refreshAfterLayout();

  const media = gsap.matchMedia();
  media.add("(min-width: 1200px)", () => buildDrift(scope));

  return () => media.revert();
}

/**
 * Smooth continuous scroll parallax for the 150vh ClosingCTA stage.
 * Scrubbed linearly to the page scroll position across viewport boundaries.
 */
export function createParallaxStage({
  container,
  target,
}: {
  container: HTMLElement;
  target: HTMLElement;
}): () => void {
  registerGsapPlugins();
  refreshAfterLayout();

  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      target,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  return () => media.revert();
}

