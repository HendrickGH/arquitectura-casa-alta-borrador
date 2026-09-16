# Delta for Project Pages

**Change:** `casa-alta-web-foundation` · **Capability:** `project-pages` · **Delta:** ADDED
**Status:** **NOT implemented.** The route table serves `/` and `/_not-found` only. The components below are already built for this.

## ADDED Requirements

### Requirement: One detail route per publishable project

`/proyectos/<slug>` MUST exist for every project that has both an editorial entry and a manifest entry with a usable cover. A project missing either half MUST NOT have a route.

#### Scenario: A complete project is published
- GIVEN `02-el-bicho` has editorial data and a manifest cover
- WHEN its detail route is requested
- THEN the page renders that project's photographs and confirmed narrative fields

#### Scenario: An unknown slug is requested
- GIVEN `/proyectos/does-not-exist`
- WHEN the route is requested
- THEN the not-found route is served, not a partially rendered page

### Requirement: Galleries come from the manifest, filtered by score

A project gallery MUST read its photographs from `images-optimizado/manifest.json` through the existing manifest reader, MUST exclude photos scoring 1 or 2, and MUST order them by the manifest's own `order`.

#### Scenario: A project has below-grade photos
- GIVEN a project whose folder ends in photos scoring 1 and 2
- WHEN its gallery renders
- THEN those photos are absent and the remainder keep quality order

#### Scenario: A project is rendered
- GIVEN any project detail route
- WHEN its photos are counted
- THEN that count is less than or equal to the project's total, never more

### Requirement: Project slugs stay clean of numeric prefixes

A published project URL MUST use the editorial slug with the pipeline's numeric prefix stripped. No route MAY expose `NN-` in a public URL, and no file or directory MUST be renamed to achieve it.

#### Scenario: A project URL is published
- GIVEN `01-plaza-esmeralda-puerto-escondido` on disk
- WHEN its detail page URL is generated
- THEN the URL contains only the clean slug

### Requirement: Cards link only to routes that exist

`ProjectCard` MUST receive `href` only when the corresponding detail route exists. Until then it MUST render as a plain article with no link and no hover affordance.

#### Scenario: Detail routes do not exist yet
- GIVEN the current route table
- WHEN `ProjectsGrid` renders cards
- THEN no `href` is passed and each card renders as an article

#### Scenario: Detail routes ship
- GIVEN `/proyectos/<slug>` exists for every published project
- WHEN `ProjectsGrid` renders
- THEN each card receives its project's `href` and becomes a link

### Requirement: Navigation moves to routes after they exist

Once detail routes ship, navigation MUST point at routes rather than at the landing's anchor form. The anchor form MUST keep resolving.

#### Scenario: The nav is updated
- GIVEN the routes ship
- WHEN the nav renders from any page
- THEN each entry resolves without depending on the landing being the current route
