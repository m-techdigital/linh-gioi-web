# WEB v1.24 Approved Art Ingest & Visual Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ingest a deliberately small set of audited 2D art into the public web and use it to strengthen world/class presentation without making final-art or screenshot claims.

**Architecture:** Keep v1.23 routes and components. Add a typed web-art registry in `@lgo-web/content`, local optimized assets in `apps/web/public/game-art`, then compose them through `PublicGameExperienceSections.tsx` and the classes page. A dedicated source validator guards provenance labels and non-claims.

**Tech Stack:** Next.js 16, React 19, TypeScript, local static assets, Vitest, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-web-v124-approved-art-ingest-design.md`

## Global Constraints
- Scenario-first IA remains unchanged.
- No production-final artwork or gameplay screenshot claim.
- Only audited assets named in the spec may be copied into public web assets.
- No backend/auth/DB/deployment scope.

### Task 1: Art registry and guard tests
- [ ] Add failing content test for audited web-art statuses and non-claims.
- [ ] Add failing v1.24 validator for registry, files and public labels.
- [ ] Implement typed registry with upstream and web-use status.
- [ ] Verify content test and validator green.

### Task 2: Web-safe asset ingest
- [ ] Copy the three audited source images into `apps/web/public/game-art/**` as optimized WebP derivatives.
- [ ] Record source SHA256 and derivative SHA256 in `apps/web/public/game-art/manifest.json`.
- [ ] Verify all registry paths and hashes.

### Task 3: World art composition
- [ ] Add art-backed world layer to `CinematicWorldScene` with explicit concept label.
- [ ] Extend responsive CSS while keeping v1.23 overlays and reduced-motion rules.
- [ ] Verify v1.24 validator green.

### Task 4: Võ art spotlight
- [ ] Add `ClassArtSpotlight` to `/classes` using starter and skill art previews.
- [ ] Add explicit development-art copy and five-class parity/non-claim language.
- [ ] Verify source validator and TypeScript.

### Task 5: Governance and packaging
- [ ] Update project state, next action, ledger, report and handoff.
- [ ] Run v1.22/v1.23/v1.24/current-state validators.
- [ ] Run lint/typecheck/tests; attempt build/browser once.
- [ ] Remove caches/runtime links.
- [ ] Create full-source and delta ZIPs, SHA256, integrity check and delta-apply validation.
