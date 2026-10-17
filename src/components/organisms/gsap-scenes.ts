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
 * Thirdway scroll-driven expanding Hero + interactive 3-discipline carousel.
 *
 * 1. At `y = 0`, the uncropped photograph sits framed in the center of the
 *    `--color-concha-nacar` sheet with a central `(CA)` architectural seal.
 * 2. As the visitor scrolls down, GSAP ScrollTrigger pins the stage and scrubs
 *    the frame open (`clipPath` / `scale` / caption reveal) before releasing
 *    into the `Quiénes somos` spread.
 * 3. Visitors can also click any of the 3 discipline pills or titles to switch
 *    the active photograph on demand.
 */
export function createHeroCarousel({
  scope,
}: {
  scope: HTMLElement;
}): () => void {
  registerGsapPlugins();
  refreshAfterLayout();

  const ctx = gsap.context(() => {
    const stage = scope.querySelector<HTMLElement>("[data-hero-stage]");
    const frame = scope.querySelector<HTMLElement>("[data-hero-frame]");
    const seal = scope.querySelector<HTMLElement>("[data-hero-seal]");
    const scrubBar = scope.querySelector<HTMLElement>("[data-hero-scrub-bar]");
    const captionCard = scope.querySelector<HTMLElement>("[data-hero-caption]");

    if (stage && frame) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=88",
          end: "+=85%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        frame,
        { scale: 0.88 },
        { scale: 1, ease: "none", duration: 1 },
        0,
      );

      if (seal) {
        tl.to(
          seal,
          { scale: 0.72, opacity: 0, ease: "power1.out", duration: 0.5 },
          0,
        );
      }

      if (captionCard) {
        tl.fromTo(
          captionCard,
          { y: 24, opacity: 0.75 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
          0.1,
        );
      }

      if (scrubBar) {
        tl.fromTo(
          scrubBar,
          { scaleX: 0.15 },
          { scaleX: 1, ease: "none", duration: 1 },
          0,
        );
      }
    }
  }, scope);

  const images = gsap.utils.toArray<HTMLElement>("[data-hero-slide]", scope);
  const titles = gsap.utils.toArray<HTMLElement>("[data-hero-title]", scope);
  const pills = gsap.utils.toArray<HTMLElement>("[data-hero-pill]", scope);
  const counter = scope.querySelector<HTMLElement>("[data-hero-counter]");
  if (images.length < 2) {
    return () => ctx.revert();
  }

  const DIM = 0.38;
  const INTERVAL = 5000;
  let active = 0;

  const goTo = (next: number) => {
    if (next === active || next < 0 || next >= images.length) return;

    images.forEach((el, i) => {
      if (i === active || i === next) return;
      gsap.set(el, { opacity: 0, zIndex: 0 });
    });
    gsap.set(images[active], { zIndex: 0 });
    gsap.set(images[next], { zIndex: 1 });
    gsap.fromTo(
      images[next],
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
    );

    titles.forEach((title, i) =>
      gsap.to(title, {
        opacity: i === next ? 1 : DIM,
        x: i === next ? 6 : 0,
        duration: 0.5,
        ease: "power2.out",
      }),
    );

    pills.forEach((pill, i) => {
      pill.setAttribute("data-active", i === next ? "true" : "false");
    });

    if (counter) {
      counter.textContent = `(${String(next + 1).padStart(2, "0")}) / (${String(images.length).padStart(2, "0")})`;
    }

    active = next;
  };

  const advance = () => {
    if (document.hidden) return;
    goTo((active + 1) % images.length);
  };

  let timer = window.setInterval(advance, INTERVAL);

  const resetTimer = () => {
    window.clearInterval(timer);
    timer = window.setInterval(advance, INTERVAL);
  };

  const cleanups: Array<() => void> = [];

  titles.forEach((title, index) => {
    const onClick = () => {
      goTo(index);
      resetTimer();
    };
    title.addEventListener("click", onClick);
    cleanups.push(() => title.removeEventListener("click", onClick));
  });

  pills.forEach((pill, index) => {
    const onClick = () => {
      goTo(index);
      resetTimer();
    };
    pill.addEventListener("click", onClick);
    cleanups.push(() => pill.removeEventListener("click", onClick));
  });

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}
