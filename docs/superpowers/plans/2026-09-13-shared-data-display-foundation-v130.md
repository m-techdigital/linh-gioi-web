# WEB Shared Data Display Foundation v1.30 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add shared data-display primitives and migrate Portal Characters plus Ops Player Operations to consume them using fixture-only data.

**Architecture:** `packages/ui/data.tsx` and `data.css` own structural presentation. Domain fixture rows stay app-local and explicitly non-canonical; no contracts package or backend layer is changed.

**Tech Stack:** React 19.2, TypeScript 5.9, Next.js 16.3.4, pnpm 10.15.0, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-shared-data-display-foundation-v130-design.md`

## Global Constraints
- Base First and Evidence Reuse / Build Once are mandatory.
- No canonical player/character/ops DTO is created.
- No API fetch/mutation or live pagination is introduced.
- Fixture status must remain explicit.

---

### Task 1: RED contract
- [ ] Create `tools/validate_web_shared_data_display_v130.py` requiring shared module/styles/consumers and forbidding app-local raw `<table>` duplication.
- [ ] Run and confirm RED on v1.29 baseline.

### Task 2: Shared data module
- [ ] Create `packages/ui/src/data.tsx` with `MetricGrid`, `MetricCard`, `DataToolbar`, `DataTable`, `PaginationBar`.
- [ ] Create `packages/ui/src/data.css`, export from package and index.
- [ ] Import shared data CSS once in Portal/Ops layouts.

### Task 3: Consumer migration
- [ ] Portal Characters renders explicit fixture metrics/table/pagination through shared primitives.
- [ ] Ops Player Operations renders explicit fixture metrics/table/pagination through shared primitives.
- [ ] Preserve all backend/auth/RBAC non-claims.

### Task 4: Closure
- [ ] Run v1.30/Base First/Shared Base/Portal/Ops/current-state validators.
- [ ] Run targeted UI/Portal/Ops lint+typecheck.
- [ ] Build Portal once and Ops once; smoke affected routes from same output; do not rebuild Public.
- [ ] Package/replay full-source + delta from v1.29 baseline and compare trees byte-for-byte.
