# Reference corpus for this change

Third-party design and animation skills, vendored here so the change's plan is reproducible and
reviewable without re-fetching from the network. No file in this directory is authored by this
repository and none of it is published to the site.

## Provenance and how to re-fetch

Fetched 2026-09-16 with the skills CLI. Each command regenerates the corresponding file.

| File | Source | Installs on skills.sh | Re-fetch with |
|---|---|---|---|
| `web-interface-guidelines.md` | `vercel-labs/agent-skills@web-design-guidelines` | **640.4K** | `npx skills use vercel-labs/agent-skills --skill web-design-guidelines` |
| `skill-designing-beautiful-websites.md` | `tristanmanchester/agent-skills@designing-beautiful-websites` | 2.6K | `npx skills use tristanmanchester/agent-skills --skill designing-beautiful-websites` |
| `skill-web-motion-design.md` | `dylantarre/animation-principles@web-motion-design` | 1.2K | `npx skills use dylantarre/animation-principles --skill web-motion-design` |
| `skill-gsap-react.md` | `greensock/gsap-skills@gsap-react` | official GSAP | `npx skills use greensock/gsap-skills --skill gsap-react` |
| `skill-gsap-scrolltrigger.md` | `greensock/gsap-skills@gsap-scrolltrigger` | official GSAP | `npx skills use greensock/gsap-skills --skill gsap-scrolltrigger` |
| `skill-gsap-performance.md` | `greensock/gsap-skills@gsap-performance` | official GSAP | `npx skills use greensock/gsap-skills --skill gsap-performance` |
| `beautiful-websites/*.md` | supporting files of `designing-beautiful-websites` | — | fetched alongside the skill; resolved from its supporting-files directory |

`beautiful-websites/` holds the 11 reference documents that `designing-beautiful-websites`
loads on demand: `VISUAL-DESIGN.md`, `INFORMATION-ARCHITECTURE.md`, `INTERACTION-DESIGN.md`,
`CONTENT-COPY.md`, `RESPONSIVE.md`, `ACCESSIBILITY.md`, `DESIGN-AUDIT.md`, `PAGE-PATTERNS.md`,
`USABILITY.md`, `WORKFLOW.md`, `CHECKLISTS.md`.

The GSAP skills are published by GreenSock (MIT). GSAP itself is 100% free for commercial use
as of 3.13.0, April 30 2025, including the previously members-only plugins.

## Two constraints these references impose on this change

Both come from `designing-beautiful-websites`, and both cut against something the client asked
for. They are recorded here so they are not lost between phases.

1. **"Do not add a heavy library, animation system, or client boundary for an effect already
   served by simple CSS."** GSAP is therefore justified only where CSS cannot do the job:
   scrubbed, pinned, or sequenced scroll choreography. A fade-in that `@keyframes` can do must
   stay CSS. This is a rule about which effects earn the dependency, not a veto on GSAP.
2. **"Use intentional imagery and crop/focal choices rather than arbitrary stock assets."**
   The client authorised Unsplash for section imagery. That authorisation stands, but the
   reference's warning is the reason stock may never stand in for obra: portfolio, masonry and
   project pages come from the repo's own 206-photo set. Stock may only carry texture for
   sections that have no real photograph of their own.

Also relevant, and already consistent with this repo's own rules: *"do not invent client logos,
reviews, awards, statistics, or product capabilities to fill a layout"* — the reason
`testimonials.ts` stays empty, and the reason no unapproved closing line ships.
