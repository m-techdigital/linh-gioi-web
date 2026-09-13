# WEB Shared Page Pattern Foundation v1.28 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move reusable page header, boundary, data-list and page-state patterns into `packages/ui` and migrate Portal/Ops to consume them without changing backend boundaries.

**Architecture:** `packages/ui` becomes the single owner for neutral page-level patterns. `WorkspacePage` composes the lower-level primitives; compatibility wrappers (`WorkspaceBoundaryNotice`, `ProvisionalFeatureShell`) delegate to the new base so existing routes migrate without duplication.

**Tech Stack:** React 19.2, TypeScript 5.9, Next.js 16.3.4, pnpm 10.15.0, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-shared-page-pattern-foundation-v128-design.md`

## Global Constraints

- Base First is mandatory across `apps/web`, `apps/portal`, `apps/ops`.
- No independent backend or canonical DTOs are introduced.
- Portal/Ops remain provisional fixture shells until accepted backend contracts exist.
- Evidence Reuse / Build Once is mandatory.
- Public Web keeps its game/story personality and does not adopt workspace-shell presentation.

---

### Task 1: Add RED source contract for v1.28

**Files:**
- Create: `tools/validate_web_shared_page_patterns_v128.py`

**Interfaces:**
- Consumes: current v1.27 `packages/ui` and Portal/Ops route sources.
- Produces: a failing source contract requiring the new shared page-pattern API and consumer migration.

- [ ] **Step 1:** Create validator requiring `PageHeader`, `BoundaryBanner`, `DataList`, `DataListItem`, `PageStateGroup`, `WorkspacePage` exports and Portal/Ops usage.
- [ ] **Step 2:** Run `python3 tools/validate_web_shared_page_patterns_v128.py`.
- [ ] **Step 3:** Confirm failure is caused by missing v1.28 primitives/usage rather than validator syntax.

### Task 2: Implement shared page-pattern primitives

**Files:**
- Modify: `packages/ui/src/primitives.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `packages/ui/src/shell.css`

**Interfaces:**
- Produces: `PageHeader`, `BoundaryBanner`, `DataList`, `DataListItem`, `PageStateGroup`, `WorkspacePage`.
- Compatibility: `WorkspaceBoundaryNotice` delegates to `BoundaryBanner`; `ProvisionalFeatureShell` delegates to `WorkspacePage`.

- [ ] **Step 1:** Implement the minimal shared primitives required by the RED validator.
- [ ] **Step 2:** Add shared responsive CSS for page headers, data lists, state groups and page wrappers.
- [ ] **Step 3:** Export all new primitives from `packages/ui/src/index.ts`.
- [ ] **Step 4:** Run UI TypeScript and lint; fix only shared-layer issues.

### Task 3: Migrate Portal and Ops page compositions

**Files:**
- Modify: `apps/portal/src/app/page.tsx`
- Modify: `apps/ops/src/app/page.tsx`
- Existing feature pages consume the rebased `ProvisionalFeatureShell` without app-local rewrites.

**Interfaces:**
- Consumes: v1.28 page-pattern primitives.
- Produces: no duplicated home page header/list markup in Portal/Ops.

- [ ] **Step 1:** Replace Portal home `SpiritPanel + SectionHeading + Grid + GameCard` structure with `WorkspacePage + DataList`.
- [ ] **Step 2:** Replace Ops home workspace grid with `WorkspacePage + DataList` while retaining ops-only placeholder blocks.
- [ ] **Step 3:** Run v1.28 validator and confirm GREEN.
- [ ] **Step 4:** Run Portal/Ops TypeScript and lint.

### Task 4: Governance and closure verification

**Files:**
- Modify: `tools/validate_web_current_state.py`
- Modify: `docs/execution/WEB-PROJECT-STATE.md`
- Modify: `docs/execution/WEB-NEXT-ACTION.md`
- Modify: `docs/execution/WEB-TASK-LEDGER.md`
- Create: `LGO-WEB-PUBLIC-SHARED-PAGE-PATTERN-FOUNDATION-REPORT-v1.28.md`
- Create: `HANDOFF-LGO-WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28.md`

**Interfaces:**
- Produces: accepted v1.28 governance state and next Base First task.

- [ ] **Step 1:** Add v1.28 validator to master current-state validation.
- [ ] **Step 2:** Run v1.28, Base First, Shared Base, Portal, Ops and master validators.
- [ ] **Step 3:** Run targeted lint/typecheck for `packages/ui`, Portal and Ops.
- [ ] **Step 4:** Build Portal once and Ops once; smoke routes from those outputs. Do not rebuild Public Web.
- [ ] **Step 5:** Package full-source and delta from clean v1.27 baseline, compute SHA256, replay delta, and compare trees byte-for-byte.
