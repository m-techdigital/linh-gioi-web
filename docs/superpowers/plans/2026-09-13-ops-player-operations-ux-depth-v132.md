# Ops Player Operations UX Depth v1.32 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build fixture-only Ops player review depth on top of shared base primitives.
**Architecture:** Shared activity presentation lives in `packages/ui`; Ops owns only presentation fixtures and route composition.
**Tech Stack:** Next.js 16, React 19, TypeScript.
**Spec:** `docs/superpowers/specs/2026-09-13-ops-player-operations-ux-depth-v132-design.md`

## Global Constraints
- Base First mandatory.
- No real mutation/API/RBAC/audit contracts.
- Closure build once for Ops only.

### Task 1: Shared activity timeline
- [ ] Add failing validator requirements.
- [ ] Implement `ActivityTimeline` / `ActivityTimelineItem` + CSS + exports.
- [ ] Run UI typecheck/lint.

### Task 2: Ops fixtures and player list/detail
- [ ] Add `apps/ops/src/lib/ops-fixtures.ts`.
- [ ] Enrich `/player-operations` with detail navigation.
- [ ] Add `/player-operations/[id]` using shared key/value + timeline + disabled action controls.

### Task 3: Audit reuse
- [ ] Render audit fixture events through shared `ActivityTimeline`.
- [ ] Keep filters disabled and non-canonical.

### Task 4: Governance/runtime/package closure
- [ ] Run dedicated/master validators.
- [ ] Run affected lint/typecheck.
- [ ] Build Ops once, reuse output for smoke.
- [ ] Package full/delta/SHA256 and replay against v1.31.
