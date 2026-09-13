# Player Portal Account / Character UX Depth v1.31 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a coherent fixture-only account and character journey in Player Portal on top of the existing shared shell/page/form/data foundation.

**Architecture:** Extend shared data-display primitives first with `KeyValueGrid` / `KeyValueItem`. Keep fixture models/data in `apps/portal/src/lib/portal-fixtures.ts`, then compose Portal routes from existing shared page/form/data primitives without introducing backend contracts.

**Tech Stack:** Next.js 16, React 19, TypeScript, workspace packages, project validators.

**Spec:** `docs/superpowers/specs/2026-09-13-portal-account-character-ux-depth-v131-design.md`

## Global Constraints
- Base First remains mandatory.
- No production auth or DB persistence.
- No API requests or canonical backend DTOs.
- Fixture data must be explicitly labelled `PROVISIONAL_WEB_FIXTURE` / `NOT_CANONICAL_BACKEND_CONTRACT`.
- Full production build is closure-only.

### Task 1: Shared detail-display base
**Files:** `packages/ui/src/data.tsx`, `packages/ui/src/data.css`, `packages/ui/src/index.ts`
- [ ] Add failing validator requirements for `KeyValueGrid` and `KeyValueItem`.
- [ ] Verify RED.
- [ ] Implement semantic shared key/value presentation.
- [ ] Verify targeted UI typecheck/lint.

### Task 2: Portal presentation fixtures
**Files:** `apps/portal/src/lib/portal-fixtures.ts`
- [ ] Define presentation-only fixture data for account, security, sessions and characters.
- [ ] Keep names/types portal-owned and visibly non-canonical.

### Task 3: Portal account journey
**Files:** `/`, `/account`, `/account/security`, `/account/sessions`
- [ ] Compose dashboard/account/security/session UX using shared primitives.
- [ ] Security controls remain disabled fixture-only.
- [ ] Sessions use shared table/pagination rather than app-local table markup.

### Task 4: Portal character journey
**Files:** `/characters`, `/characters/[id]`
- [ ] Enrich character overview using shared metrics/table/actions.
- [ ] Render character detail with shared key/value base and clear fixture labels.
- [ ] No canonical character DTO or API dependency.

### Task 5: Governance and closure
**Files:** v1.31 validator, project-state/next-action/ledger/report/handoff
- [ ] Run dedicated validator and master current-state validator.
- [ ] Run affected lint/typecheck.
- [ ] Run one Portal production build.
- [ ] Reuse the build for route smoke.
- [ ] Package full source + delta + SHA256 and replay against authoritative v1.30.
