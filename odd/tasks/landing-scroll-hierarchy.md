# Landing scroll hierarchy

## Objective

Give the landing's scroll reveal a hierarchy. Today every section repeats one
identical gesture; the page "appears" instead of composing. The reveal gains
per-section variants and staggered children, decided in one place.

Scope is the landing route (`/`) only. `/proyectos` keeps its current behaviour
until a later phase.

## Problem (evidenced)

The whole content reveal is a single CSS transition in `globals.css`
(`[data-reveal="pending"]`: `opacity: 0` + `translateY(28px)`, 720ms), driven by
`RevealObserver` (`src/components/organisms/MotionShell.tsx`). Every section
uses the same offset, duration, ease and trigger line (90% of the viewport), and
each section animates as one block. There is no stagger, no per-section
variation, and no ordering between a heading and its body.

GSAP today only drives the photographic parallax (`gsap-scenes.ts`: `lift`,
`breathe`, `drift`); the content reveal never passes through it.

## Scope

- `src/lib/reveal.ts` — new. The reveal vocabulary shared by producers and the
  client script.
- `src/components/atoms/Section.tsx` — a `reveal` prop.
- `src/components/organisms/MotionShell.tsx` — `RevealObserver` reads the shared
  state constants.
- `src/components/organisms/CategoryTiles.tsx`,
  `src/components/organisms/StatsBand.tsx`,
  `src/components/organisms/ManifestoLine.tsx`,
  `src/components/organisms/FullBleedCTA.tsx` — declare their gesture through
  the shared vocabulary instead of a hardcoded `data-reveal="idle"`.

Explicitly out of scope this phase: `ProjectsGrid`, `ClosingCTA`,
`ProjectsIndexTemplate`, and every `/proyectos` component. Also out of scope:
any change to `gsap-scenes.ts` and the three parallax modes.

## Constraints

- **No layout change.** `Section` always injects `py-20 md:py-28 lg:py-36`, and
  `cx` is a plain `join(" ")` with no Tailwind conflict resolution, so no
  consumer can override that padding through `className`. The four hand-rolled
  landing sections therefore keep their own wrapper: `CategoryTiles` (flush
  grid), `StatsBand` (`border-y`, padding on the inner grid), `ManifestoLine`
  (`bg-brand-900`, not a `Section` tone) and `FullBleedCTA` (full-bleed panel)
  are NOT swappable to `Section` without moving layout.
- **Server HTML stays visible.** `data-reveal="idle"` means fully visible; only
  the client downgrades sections still below the fold. Nothing may be hidden
  without JavaScript.
- **Reduced motion** gets no hidden state and no tween at all.
- Generated artifacts and comments in English.

## Tasks

- [x] T1 `src/lib/reveal.ts`: `RevealVariant` (`fade | stagger | none`), the
      state constants (`idle | pending | in`), and `revealAttrs(variant)`.
      `fade` emits `data-reveal="idle"`; `stagger` adds
      `data-reveal-variant="stagger"`; `none` emits nothing.
- [x] T2 `Section.tsx` exposes `reveal?: RevealVariant` (default `fade`) and
      spreads `revealAttrs(reveal)`.
- [x] T3 `RevealObserver` uses the shared constants instead of the string
      literals. No behaviour change.
- [x] T4 The four hand-rolled landing sections spread `revealAttrs()` in place of
      the hardcoded `data-reveal="idle"`. Output attribute is identical; the
      gesture now has one source.
- [x] T5 Checks.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass, 0 errors. 1 pre-existing warning in
  `.opencode/skills/web-build/scripts/cdp-measure.mjs:140`, a file this phase did
  not touch.
- `pnpm build` — pass, 18 static pages.
- Landing built HTML (`.next/server/app/index.html`): 11 `data-reveal="idle"`,
  0 `data-reveal-variant`. There are 12 `<section>` elements; the 12th is the
  Hero, which carries no reveal by design.
- `/proyectos` built HTML: 0 `data-reveal-variant`, so the other route is
  untouched.
- Native RDD review: lineage `review-7f45ca4837bc28e7`, target
  `sha256:3c9b30dd…c41`, state `approved`, authority `burned`. Two non-blocking
  advisory findings (below).

## Advisory findings (non-blocking)

The approved review raised two findings. Neither opened a correction, and
neither is a reason to re-run the review on this candidate.

- **R3-001 (WARNING)** — `src/lib/reveal.ts:33-38`. `revealAttrs` is the only
  runtime implementation of the `none` opt-out and the `stagger` shape, and this
  phase adds no unit test for it. There is no test runner configured in the repo
  today, so the boundary is currently proved by the phase-2 observer consuming
  it rather than by a test. Add a runner before this gets a second consumer.
- **R3-002 (SUGGESTION)** — `src/components/atoms/Section.tsx:11-16`. `stagger`
  is exposed on `Section` before `RevealObserver` reads `data-reveal-variant`, so
  a consumer opting in today silently gets the whole-section fade plus an unused
  attribute. Phase 2 closes this by making the observer consume the variant; if
  Phase 2 slips, the prop should be marked reserved.

## Progress

Phase 1 complete. One process hazard observed and worth recording: the repo's
auto-commit plugin (`.opencode/plugins/casa-alta.ts`, `session.idle`) committed
the whole phase as `46ff5da chore: auto-commit 8 files` before the native RDD
preflight could see it as the current-changes candidate. The review was still run
by selecting `HEAD~1` as the base ref with `--committed-only`, so the change was
reviewed, but the candidate was consumed before the preflight that should have
frozen it. Every future delegated phase will hit the same ordering.

## Next step

Phase 2: the stagger CSS and the child-delay assignment in `RevealObserver`, then
opt the landing's list sections into `stagger` (closing R3-002). Resolve the
auto-commit/RDD ordering before the next delegated write, or the same base-ref
detour repeats.
