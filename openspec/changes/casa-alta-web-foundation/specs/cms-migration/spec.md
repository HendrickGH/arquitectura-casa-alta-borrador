# Delta for CMS Migration

**Change:** `casa-alta-web-foundation` · **Capability:** `cms-migration` · **Delta:** ADDED
**Status:** **SUSPENDED.** Requirements 1 to 3 — the content seam — are implemented and verified. The Payload replacement is **suspended until further notice**: it is a possible future, not a committed decision. Do not build toward it, do not reserve scope for it, and do not read the seam's readiness as an argument to schedule it. The seam stays exactly as it is, and that is what keeps the option cheap if it is ever taken.

## ADDED Requirements

### Requirement: One module reads content

`src/lib/content/index.ts` MUST be the only module that imports from `src/content/*`. No file under `src/components/` MUST import `@/content/*`, and no file under `src/components/` MUST import `@/lib/content` either.

#### Scenario: A component needs content
- GIVEN a new section needs project or site data
- WHEN the component is written
- THEN it declares props and the calling route passes the values

#### Scenario: A component imports the seam
- GIVEN `src/components/organisms/Example.tsx` importing `@/content/site`
- WHEN the seam is audited
- THEN the import is a violation and MUST be removed

### Requirement: Components receive data as props

Components MUST receive every value they render through props and MUST NOT read content from any module-level store. The seam's accessors are the only documented read path: `getSiteConfig`, `getServiceGroups`, `getProcessSteps`, `getDifferentiators`, `getTestimonials`, `getProjects`, `getProject`, `getFeaturedProjects`, `getHomePage`.

#### Scenario: A page composes sections
- GIVEN `src/app/page.tsx`
- WHEN it renders the landing
- THEN it calls the accessors once and passes the results down

### Requirement: The seam's types are the migration contract

`src/types/content.ts` MUST define the shapes components consume, and those shapes MUST NOT change when the content source changes. `src/lib/content/photos.ts` MUST keep reading the image manifest rather than editorial content, because images stay pipeline-owned after the migration.

#### Scenario: The source is replaced
- GIVEN Payload becomes the content source
- WHEN the seam is rewritten
- THEN accessor return types are unchanged and no component file is edited

### Requirement: Payload replaces reads only

The Payload migration MUST change `src/lib/content/index.ts` alone. Accessors MAY become asynchronous; where they do, `src/app/page.tsx` MUST become async and `src/app/layout.tsx` MUST move from a module-scope `metadata` export to `generateMetadata`. All 31 components MUST remain untouched, and `src/content/*.ts` MAY become seed data or be removed.

**This requirement is SUSPENDED.** Payload CMS is not committed to be built, and no other requirement in this change depends on it. Nothing here is scheduled.

#### Scenario: Payload is introduced
- GIVEN Payload is configured and the seam is rewritten against it
- WHEN the landing is rendered
- THEN output is identical to the local-module version and no component changed

#### Scenario: The migration is rolled back
- GIVEN the accessors read from Payload
- WHEN the change is reverted
- THEN restoring the local-module reads restores the site, with components never having been modified
