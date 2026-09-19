# Landing photo parallax removal

## Objective

Remove the scrubbed parallax from the landing hero and the closing full-bleed
CTA, so both full-bleed photographs render at their own framing and native
resolution at rest.

## Problem (measured, 1440x900, production build)

- At scroll 0 the hero's `[data-scene-image]` computes to
  `matrix(1.4, 0, 0, 1.4, 0, -144)`: a 1.4x crop, and the 1600x900 hero AVIF is
  painted at **2016x1260** -- a **1.26x upscale**. Soft, and not the composer's
  frame.
- On scroll 0 -> 900 the photo drifts `yPercent -16 -> +16` (**0.32 px per px
  of scroll**) and unzooms 1.4 -> 1.36. The drift starts with the very first
  scroll, because the hero begins at `top top`.
- The closing CTA (`buildBreathe`) does the same at `scale 1.45`.
- Reference measured with Playwright (contapro.mx): **no parallax at all** --
  `transform: none` across scroll offsets, every block moves 1:1 with the page.
  It uses one-shot reveals only: `opacity` + 30-40px translate, 0.7-1s, no
  overshoot, max travel 40px. Our hero's CSS entrance (`hero-rise`: opacity +
  24px, 820ms, `cubic-bezier(0.22,1,0.36,1)`) already sits inside that grammar
  and is not part of the problem.

## Scope

- `src/components/organisms/gsap-scenes.ts` -- delete `buildLift` and
  `buildBreathe`, the `SceneMode` union and the `mode` parameter. Keep
  `buildDrift` (the masonry wall) intact.
- `src/components/organisms/MotionShell.tsx` -- `ScrollScene` keeps only the
  scope wrapper.
- `src/components/templates/LandingTemplate.tsx` -- drop the `lift` and
  `breathe` wrappers; the masonry keeps `drift`.
- `src/components/organisms/Hero.tsx`,
  `src/components/organisms/FullBleedCTA.tsx` -- drop `data-scene-image` and the
  now-stale comments.

Out of scope: the reveal hierarchy (separate feature), the masonry drift, the
`srcset` duplicate-2000w descriptor bug (recorded as a follow-up), and
`globals.css`.

## Constraints

- No layout change. The removed `ScrollScene` wrappers were plain block `div`s;
  the hero's negative top margin must still collapse through so it stays under
  the transparent chrome.
- The hero's CSS entrance stays untouched.
- Reduced motion and no-JS behaviour unchanged: nothing becomes hidden and
  nothing depends on the GSAP chunk.
- Comments and artifacts in English.

## Tasks

- [x] T1 `gsap-scenes.ts`: delete `buildLift`/`buildBreathe`, drop the mode
      plumbing, keep `buildDrift`.
- [x] T2 `MotionShell.tsx`: `ScrollScene` without the `mode` prop.
- [x] T3 `LandingTemplate.tsx`: remove the `lift` and `breathe` wrappers.
- [x] T4 `Hero.tsx` / `FullBleedCTA.tsx`: remove `data-scene-image` and the
      stale comments.
- [x] T5 Checks.

## Verification

- `pnpm typecheck` -- pass.
- `pnpm lint` -- pass, 0 errors (the same pre-existing warning in
  `.opencode/skills/web-build/scripts/cdp-measure.mjs:140`).
- `pnpm build` -- pass, 18 static pages.
- Playwright, production build, 1440x900:
  - `[data-scene-image]` no longer exists in the DOM (was 2: the hero and the
    closing CTA).
  - The hero image computes `transform: none` at every sampled offset.
  - Its top falls 1:1 with scroll: 0 / -150 / -300 / -600 / -900 at those
    scrollY values. No drift.
  - `heroTop` 0 and `heroH` 900 at rest -- identical to the pre-change
    measurement, so removing the wrapper did not move layout.
  - The photo is drawn 1600x900 from the 1600x900 AVIF inside a 1440x900 box:
    the 1.26x upscale is gone.
  - The masonry drift still runs: 8 `[data-drift-item]` cells carry
    `matrix(1, 0, 0, 1, 0, +-7.42..+-12)` as the wall crosses the viewport.

## Progress

Complete.

Native RDD review: lineage `review-9376a0038a1e5e8f`, medium, single lens
`review-reliability`, state `approved` with **zero findings**, authority burned.

This candidate kept its uncommitted state through the whole review because the
edit was done in the orchestrator thread. Delegating the write would have let the
repo's auto-commit plugin consume the candidate on the sub-agent's
`session.idle` before the preflight -- the ordering that forced a
`--committed-only` base-ref detour in the reveal-vocabulary phase.

## Next step

Optional follow-up: the hero `srcset` still emits the same 1600px file twice, as
`1600w` and `2000w`. It produces no upscale at 1440x900 (object-cover draws it
1:1 either way), but the descriptor misdescribes the asset and should be
reconciled with `deviceSizes` in `next.config.ts`.
