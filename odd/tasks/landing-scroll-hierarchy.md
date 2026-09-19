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

- [ ] T1 `src/lib/reveal.ts`: `RevealVariant` (`fade | stagger | none`), the
      state constants (`idle | pending | in`), and `revealAttrs(variant)`.
      `fade` emits `data-reveal="idle"`; `stagger` adds
      `data-reveal-variant="stagger"`; `none` emits nothing.
- [ ] T2 `Section.tsx` exposes `reveal?: RevealVariant` (default `fade`) and
      spreads `revealAttrs(reveal)`.
- [ ] T3 `RevealObserver` uses the shared constants instead of the string
      literals. No behaviour change.
- [ ] T4 The four hand-rolled landing sections spread `revealAttrs()` in place of
      the hardcoded `data-reveal="idle"`. Output attribute is identical; the
      gesture now has one source.
- [ ] T5 Checks.

## Verification

- `pnpm typecheck` — pass.
- `pnpm lint` — pass.
- `pnpm build` — pass, and the landing's section attributes unchanged in the
  built HTML (`data-reveal="idle"` still present on the same elements).
- `reveal="none"` emits no `data-reveal` (unit-level read of `revealAttrs`).

## Progress

Phase 1 in flight.

## Next step

Phase 2: the stagger CSS and the child-delay assignment in `RevealObserver`, then
opt the landing's list sections into `stagger`.
