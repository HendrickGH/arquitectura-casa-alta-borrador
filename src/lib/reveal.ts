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
 * the gesture to the section's children; `none` opts out of the state machine
 * entirely, so the section is never hidden. `stagger` is declared here but not
 * yet consumed -- the hierarchy lands in a later phase.
 */
export function revealAttrs(variant: RevealVariant = "fade"): RevealAttrs {
  if (variant === "none") return {};
  const attrs: RevealAttrs = { "data-reveal": REVEAL_IDLE };
  if (variant === "stagger") attrs["data-reveal-variant"] = "stagger";
  return attrs;
}
