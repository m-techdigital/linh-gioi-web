# WEB Shared Form Control Foundation v1.29 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared accessible form-control module and migrate fixture-only Portal/Ops surfaces to consume it without opening backend behavior.

**Architecture:** `packages/ui/forms.tsx` and `forms.css` are the single reusable owner. Portal/Ops import styles once in root layouts and compose disabled controls through existing `ProvisionalFeatureShell`; no business form implementation is introduced.

**Tech Stack:** React 19.2, TypeScript 5.9, Next.js 16.3.4, pnpm 10.15.0, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-shared-form-control-foundation-v129-design.md`

## Global Constraints

- Base First and Evidence Reuse / Build Once are mandatory.
- No production auth/DB/RBAC/audit/API contract is claimed.
- Fixture controls are disabled and non-submitting.
- Public Web must not gain a fake backend form.

---

### Task 1: RED shared-form contract

**Files:** Create `tools/validate_web_shared_form_controls_v129.py`.

- [ ] Require shared form module, styles export, layout imports and disabled Portal/Ops consumers.
- [ ] Forbid raw app-local `<input>` / `<select>` in the migrated fixture pages.
- [ ] Run validator and confirm failure on missing v1.29 implementation.

### Task 2: Shared form module

**Files:** Create `packages/ui/src/forms.tsx`, `packages/ui/src/forms.css`; modify `packages/ui/src/index.ts`, `packages/ui/package.json`, `packages/ui/src/primitives.tsx`.

- [ ] Implement `FormField`, `TextInput`, `SelectInput`, `CheckboxField`, `FormActions`, `InlineFeedback`.
- [ ] Add accessible help/error wiring and neutral shared styling.
- [ ] Allow `ProvisionalFeatureShell` optional children.
- [ ] Export module and CSS.

### Task 3: Consumer migration

**Files:** Modify Portal layouts/login/register/recovery and Ops layouts/security-governance/audit.

- [ ] Import `@lgo-web/ui/forms.css` once in Portal and Ops root layouts.
- [ ] Add disabled fixture controls to Portal auth-related pages using shared components.
- [ ] Add disabled fixture governance/filter controls to Ops Security/Audit using shared components.
- [ ] Preserve all explicit backend/non-claim boundary copy.

### Task 4: Closure

**Files:** Update master validator, project state, next action, ledger, report and handoff.

- [ ] Run v1.29/Base First/Shared Base/Portal/Ops/current-state validators.
- [ ] Run targeted UI/Portal/Ops lint+typecheck.
- [ ] Build Portal once and Ops once; smoke route outputs; do not rebuild unchanged Public Web.
- [ ] Package full-source + delta, SHA256, replay on clean v1.28 baseline and compare trees byte-for-byte.
