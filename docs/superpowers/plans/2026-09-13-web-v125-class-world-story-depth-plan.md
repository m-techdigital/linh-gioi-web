# WEB v1.25 Class / World / Story Depth Implementation Plan

> **For agentic workers:** implement task-by-task with test-first verification.

**Goal:** Deepen the five class identities, opening world route and opening story arc using reusable player-facing editorial sections.

**Architecture:** Extend the existing typed content model instead of hardcoding copy per route. Shared presentation components consume enriched `ClassPath`, `WorldRouteStop` and `NarrativeChapter` records. Existing v1.22-v1.24 sections remain compatible.

**Tech Stack:** Next.js 16, React 19, TypeScript, pnpm/Turborepo, Vitest, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-web-v125-class-world-story-depth-design.md`

## Global Constraints
- Preserve scenario-first public identity.
- Preserve five-Lộ parity.
- Preserve v1.24 audited-art claim boundaries.
- No production auth/DB/backend/deployment claim.
- No gameplay screenshot or production-final art claim.

### Task 1 — Typed narrative depth
- [ ] Extend class/world/chapter types with player-facing depth fields.
- [ ] Add failing content tests for complete five-class/five-world/three-chapter depth.
- [ ] Populate all records and make tests green.

### Task 2 — Class identity deck
- [ ] Add validator RED requirement for `ClassIdentityDeck`.
- [ ] Implement reusable deck and place on `/classes`.
- [ ] Add responsive/visual styles.

### Task 3 — World atlas stories
- [ ] Add validator RED requirement for `WorldAtlasStories`.
- [ ] Implement reusable world editorial cards and place on `/game`.
- [ ] Add visual rhythm and mobile layout.

### Task 4 — Story arc timeline
- [ ] Add validator RED requirement for `StoryArcTimeline`.
- [ ] Implement chapter escalation presentation and place on `/story`.
- [ ] Preserve existing narrative chapter grid for continuity where useful.

### Task 5 — Governance and closure
- [ ] Update project state / task ledger / next action.
- [ ] Add v1.25 report, handoff, changed-files and deletions manifests.
- [ ] Run continuity/current-state/lint/typecheck/tests/build classification.
- [ ] Package full-source + delta + SHA256 and replay delta on clean v1.24.
