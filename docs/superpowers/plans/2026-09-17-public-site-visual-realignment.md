# LGO Public Site Visual Realignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realign all major public routes to their existing visual targets, one page at a time, beginning with `/game`.

**Architecture:** Reuse the immersive public shell and shared UI primitives. Page-specific compositions remain under `apps/web/src/components`; reusable entry-page visual blocks/styles live in `packages/ui`. Source artwork crops include provenance and remain decorative.

**Tech Stack:** Next.js 16, React, TypeScript, CSS, Playwright, Vitest, existing LGO content fixtures.

**Spec:** `docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md`

## Global Constraints
- Branch/worktree stay `main` and `/Users/minhdc/Projects/LinhGioiOnline-Web`.
- Real Browser UI/UX Layout First; tests/docs do not substitute for page appearance.
- No fake backend/login/download/trailer/server/player-count claims.
- No whole-board screenshot embedded as UI.
- One page closes before the next page changes.

---

### Task 1: `/game` — World landing
**Files:** create `apps/web/src/components/PublicWorldLanding.tsx`; create `packages/ui/src/public-entry-layout.css`; modify `apps/web/src/app/game/page.tsx`; add source-derived world artwork/provenance; add Playwright/component tests.
- [ ] Write RED browser tests for immersive hero, five-stop journey rail, five visual region cards, responsive behavior and no proof-board in first flow.
- [ ] Extract only decorative artwork regions from the existing game-world target and record provenance.
- [ ] Implement the shared entry layout owner and thin `/game` composition.
- [ ] Run focused browser/component tests and review screenshots at 1440/390.
- [ ] Run selected sibling regressions, typecheck/lint/build/current-state.
- [ ] Commit/push/package only after visual review.

### Task 2: `/story`
- [ ] Repeat the same RED → source-art → shared owner → browser review flow against `story-detailed-design-target-v1121.png`.

### Task 3: `/classes`
- [ ] Rebuild around the five-Lộ visual wheel/deck and class artwork target; keep class data source-backed.

### Task 4: `/journey`
- [ ] Rebuild around the 20-minute journey timeline/route target rather than generic proof cards.

### Task 5: `/start`
- [ ] Rebuild the tutorial/start journey from the target with real links and truthful availability.

### Task 6+: Service, support and secondary route families
- [ ] Process sequentially according to the scope order in the design spec; never mark a whole family complete from regression tests alone.
