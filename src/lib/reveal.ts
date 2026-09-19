import type { CSSProperties } from "react";

/**
 * The reveal vocabulary, shared by the server-rendered producers (the `Section`
 * atom and the landing's hand-rolled sections) and the client script that runs
 * the state machine.
 *
 * The initial state is "idle" -- fully visible. `RevealObserver` only downgrades
 * sections that are still below the fold, so the server HTML is never hidden
 * and nothing already on screen flashes. Every producer must emit the same
 * starting state, which is why the literals live here instead of in each
 * component.
 */

/** How a section joins the scroll reveal. */
export type RevealVariant = "fade" | "stagger" | "none";

/** The three states the reveal machine writes onto `[data-reveal]`. */
export const REVEAL_IDLE = "idle";
export const REVEAL_PENDING = "pending";
export const REVEAL_IN = "in";

/** The attributes a producer spreads onto its section element. */
export interface RevealAttrs {
  "data-reveal"?: string;
  "data-reveal-variant"?: string;
}

/**
 * `fade` (default) transitions the whole section as one block; `stagger` hands
 * the gesture to the section's marked children; `none` opts out of the state
 * machine entirely, so the section is never hidden.
 */
export function revealAttrs(variant: RevealVariant = "fade"): RevealAttrs {
  if (variant === "none") return {};
  const attrs: RevealAttrs = { "data-reveal": REVEAL_IDLE };
  if (variant === "stagger") attrs["data-reveal-variant"] = "stagger";
  return attrs;
}

/** Props to spread onto one staggerable child of a `stagger` section. */
export interface RevealStepAttrs {
  "data-reveal-step"?: string;
  style?: CSSProperties;
}

/**
 * Marks one child of a `stagger` section as a reveal step and hands it its
 * zero-based position. The stylesheet turns `--reveal-index` into the child's
 * `transition-delay`, so the server writes only an integer and the timing stays
 * a CSS concern. Returns `{}` when no index is given, so an unstaggered call
 * site can spread it unconditionally.
 */
export function revealStep(index: number | undefined): RevealStepAttrs {
  if (index === undefined) return {};
  return {
    "data-reveal-step": "",
    style: { "--reveal-index": index } as CSSProperties,
  };
}
