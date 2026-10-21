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
 * move when images and layout settle.
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
 * Smooth continuous scroll parallax for the 150vh ClosingCTA stage.
 * Scrubbed linearly to the page scroll position across viewport boundaries.
 */
export function createParallaxStage({
  container,
  target,
  start = "top bottom",
  end = "bottom top",
}: {
  container: HTMLElement;
  target: HTMLElement;
  start?: string;
  end?: string;
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
          start,
          end,
          scrub: true,
        },
      },
    );
  });

  return () => media.revert();
}

