# Delta for Deploy Config

**Change:** `casa-alta-web-foundation` · **Capability:** `deploy-config` · **Delta:** ADDED
**Status:** **NOT implemented.** No `netlify.toml` exists anywhere in the repository; build command, publish directory, Node version and the Next.js runtime plugin are all undeclared.

## ADDED Requirements

### Requirement: Deploy contract is declared in the repository

`netlify.toml` MUST exist at the repository root and MUST declare the build command, the publish directory, the Node version, and the `@netlify/plugin-nextjs` runtime plugin. **This requirement is NOT implemented.**

#### Scenario: The contract is present
- GIVEN a clean checkout of the repository
- WHEN `netlify.toml` is read
- THEN all four declarations are present and none is supplied by dashboard settings

#### Scenario: The file is absent
- GIVEN a build runs today
- WHEN Netlify is asked to build the repository
- THEN the build parameters are undeclared, which is the current state

### Requirement: A clean checkout deploys with no manual steps

A fresh clone MUST deploy through the declared configuration without a human editing settings, installing a global tool, or running a local command. The dependency install MUST be reproducible from the committed lockfile.

#### Scenario: A fresh clone deploys
- GIVEN a clone with no `node_modules` and no build output
- WHEN the declared build command runs
- THEN the site is produced and served with no further input

#### Scenario: The lockfile is used
- GIVEN the deploy installs dependencies
- WHEN the install completes
- THEN it resolved from the committed lockfile, not from resolving fresh ranges

### Requirement: The build generates the image mirror itself

The build MUST produce the served image set from the pipeline's output, so a deployed site can never serve a stale or partial mirror. `images/` and `images-optimizado/` MUST NOT be published as static directories of their own.

#### Scenario: The build runs
- GIVEN `images-optimizado/` is present
- WHEN the build executes
- THEN the AVIF mirror and the loader's variant table are regenerated before the site is built

#### Scenario: The pipeline output is missing
- GIVEN a checkout without `images-optimizado/`
- WHEN the build runs
- THEN it fails loudly rather than deploying a site with unresolved images

### Requirement: Deploy preserves the image delivery contract

The deploy configuration MUST NOT introduce an image CDN or an on-demand transformer. The custom loader MUST remain the only path that resolves an image request.

#### Scenario: A deploy-time image optimisation is proposed
- GIVEN a Netlify image transformation feature is enabled
- WHEN an image is requested
- THEN the request still resolves to the pre-encoded AVIF file, and the change is rejected otherwise
