# Tasks: casa-alta-web-foundation

## Review Workload Forecast

Estimated changed lines: ~9,000 (8,235 first-commit + ~800 forward).
Split: staging → deploy+SEO → pages → images → pipeline
Delivery strategy: single-pr

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

Work units:
U1 foundation commit — `tsc --noEmit` — `pnpm build` — drop it
U2 deploy + SEO — `check:images` — `pnpm start` — delete the new files
U3 routes + nav — `next build` — request each route — revert `site.ts`
U4 URLs, logo, variants — `check:images` — `pnpm build` — revert the routing map
U5 pipeline portability — six stages — second checkout — N/A

## Phase 1 — Hygiene

- [ ] 1.1 Stage the tree deliberately; never `git add -A`.
- [ ] 1.2 Stage brand and hero additions; `images/` untouched (read-only).
- [ ] 1.3 `CLAUDE.md`: drop stale claims, add `src/`, fix counts.

## Phase 2 — Deploy

- [ ] 2.1 Decide the production origin; none exists in `src/`.
- [ ] 2.2 Create `netlify.toml`: build, publish, Node, `@netlify/plugin-nextjs`.
- [ ] 2.3 `public/images` is gitignored: a bypass build 404s silently.
- [ ] 2.4 Gate the deploy on `check:images`; test a clean checkout.

## Phase 3 — SEO

- [ ] 3.1 Set `metadataBase` in `layout.tsx`; create `src/app/sitemap.ts`.
- [ ] 3.2 Read images via the seam, never `@images/manifest.json` (read-only).
- [ ] 3.3 Create `src/app/robots.ts` referencing the sitemap.
- [ ] 3.4 Ship the social card pre-encoded; no unencoded variants.

## Phase 4 — Pages

- [ ] 4.1 Create `src/app/proyectos/[slug]/page.tsx` and `src/app/proyectos/page.tsx`.
- [ ] 4.2 Pass `href` in `ProjectsGrid.tsx`; `Header` keys its CTA on `/contacto`.
- [ ] 4.3 Move `site.ts` nav to routes; keep anchors resolving.
- [ ] 4.4 Create `src/app/{servicios,proceso,nosotros,contacto}/page.tsx`.
- [ ] 4.5 Add a `(site)` layout carrying the chrome; each page one `h1`.
- [ ] 4.6 Copy in `src/content/*.ts` via a seam accessor; `ImageObject` JSON-LD.

## Phase 5 — Image layer

- [ ] 5.1 Decide the clean-URL mechanism first; §10.4 recommends rewrites.
- [ ] 5.2 Then change `loader.ts`, `sync-images.mjs`, `check-image-urls.mjs` together.
- [ ] 5.3 Never rename a numeric prefix; both URL forms resolve.
- [ ] 5.4 `logo-casa-alta.png` is 354x160; get the SVG or script the derivation.
- [ ] 5.5 `variants.sh`: resize to target width; reguard `MIN_GAIN` by width.
- [ ] 5.6 Mirror in `hero.sh`; back up, regenerate, stage deliberately.
- [ ] 5.7 Refresh the trap list and `next.config.ts` comment.

## Phase 6 — Pipeline

- [ ] 6.1 Replace seven `/Users/hendrick/...` paths across six tools.
- [ ] 6.2 Move `/tmp/casa-alta-work` (12 paths, 7 files) repo-local.
- [ ] 6.3 Guard the `rm -rf` opening `convert.sh`.

## Phase 7 — Blocked and deferred

- [ ] 7.1 BLOCKED: `location`, `year`, `summary`, `story` for 12 projects.
- [ ] 7.2 BLOCKED: Facebook and TikTok hrefs; testimonials stay empty.
- [ ] 7.3 BLOCKED: the Instagram grid's 255 posts need a login.
- [ ] 7.4 Payload CMS deferred; `design.md` §8 tables it.

## Phase 8 — Verification

- [ ] 8.1 `tsc --noEmit`, `lint`, `next build`, `check:images`; sha256 stable.
