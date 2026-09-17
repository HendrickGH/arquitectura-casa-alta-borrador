# Delta for Motion Layer

**Change:** `casa-alta-site-redesign` · **Capability:** `motion-layer` · **Delta:** ADDED
**Status:** **NOT implemented.** No `gsap` dependency exists, `"use client"` appears 0 times in `src/`, and the only motion today is a CSS hover scale (`ProjectCard.tsx:51`). This change introduces the repository's first client boundary and its first runtime dependency beyond React.
**Bindings:** inherits `site-pages` (focus never removed, zero overflow from 320px, no content invisible) and the vendored corpus's two constraints (`references/README.md`), whose first — no heavy library, animation system or client boundary for an effect simple CSS already serves — is adopted here as a requirement.

## ADDED Requirements

### Requirement: CSS owns everything @keyframes can serve

An effect that CSS transitions or `@keyframes` can serve MUST stay CSS: hover, focus, micro-states, and any reveal whose trigger is not scroll position. GSAP MUST be used only for choreography driven by scroll position — scrubbed, pinned or sequenced motion — and every GSAP tween MUST belong to a scroll-driven timeline or sequence. A standalone GSAP tween firing on load, click or hover is a violation.

#### Scenario: A hover effect is proposed in GSAP
- GIVEN a hover or focus effect implemented with `gsap.to`
- WHEN the motion layer is reviewed
- THEN it is rewritten in CSS and GSAP is not imported for it

#### Scenario: A scrubbed sequence is proposed
- GIVEN a sequence that advances with scroll position and cannot be expressed in CSS
- WHEN it is implemented
- THEN it is a GSAP timeline with a ScrollTrigger using `scrub` or `pin`

### Requirement: One client boundary, and no content behind it

The change MUST introduce exactly one client component: the `"use client"` directive MUST appear in exactly one module under `src/` (0 today). No text, image, link or heading MAY depend on client JavaScript to become visible; the server HTML MUST already contain every section's content, and no inline style written for a JavaScript reveal MAY hide content in the server output.

#### Scenario: The directive is counted
- GIVEN the change's `src/` tree
- WHEN modules carrying `"use client"` are counted
- THEN exactly one exists

#### Scenario: JavaScript never runs
- GIVEN the landing loaded with JavaScript disabled
- WHEN the document and its styles are read
- THEN every section is present and none is hidden by a reveal-oriented inline style

### Requirement: Motion honours prefers-reduced-motion

Every motion effect MUST provide a reduced-motion behaviour. CSS effects MUST be neutralised inside a `@media (prefers-reduced-motion: reduce)` block, and the GSAP setup MUST check the media query (e.g. `gsap.matchMedia()`) and skip or simplify the scroll choreography when reduced motion is requested. In that state every section MUST render complete and visible, and no content MAY be gated on an animation-completion callback.

#### Scenario: Reduced motion is requested
- GIVEN `prefers-reduced-motion: reduce` emulated in the browser
- WHEN the landing renders and is scrolled
- THEN no scrubbed or pinned animation runs and every section is fully readable

#### Scenario: A reveal would start hidden
- GIVEN a scroll-driven reveal whose first frame would be a hidden state
- WHEN the reduced-motion path runs
- THEN the element paints visible without requiring any animation to complete

### Requirement: ScrollTriggers are scoped, registered once, and reverted

ScrollTrigger MUST be registered exactly once before use, and every trigger MUST be created inside a scope that reverts on unmount (`useGSAP` with a scope ref, or `gsap.context()` reverted in the effect's cleanup), so no trigger survives against detached elements. `ScrollTrigger.refresh()` MUST run after layout-affecting events that move trigger positions (image or font load, layout change). `markers: true` MUST NOT ship, and GSAP MUST NOT execute during server rendering.

#### Scenario: The boundary unmounts
- GIVEN the client component unmounts after a route change
- WHEN the browser console is queried
- THEN no ScrollTrigger remains registered against its elements and no inline style it wrote survives

#### Scenario: A production build ships
- GIVEN `next build` output
- WHEN the page loads
- THEN no marker element or debug styling appears and the console shows no SSR error from GSAP

### Requirement: Motion stays on the compositor

Animated properties MUST be `transform` and `opacity` only; layout properties (width, height, top, left, margin, padding) MUST NOT be animated for movement, and `will-change` MUST appear only on elements that actually animate.

#### Scenario: A scroll choreography runs
- GIVEN the landing with its scroll choreography active
- WHEN the page is scrolled in a browser
- THEN the measured layout shift stays at zero — no layout property is being animated
