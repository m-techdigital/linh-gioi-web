# WEB v1.27 Shared App Shell Foundation Implementation Plan

> **For agentic workers:** implement task-by-task with Base First and Build Once.

**Goal:** Consolidate Portal/Ops shell structure and CSS into shared UI owners.

**Architecture:** Add generic workspace shell primitives and shared stylesheet to `packages/ui`; migrate Portal/Ops root layouts and home surfaces to consume them without changing backend claims.

**Tech Stack:** Next.js 16, React 19, TypeScript, workspace package `@lgo-web/ui`.

**Spec:** `docs/superpowers/specs/2026-09-13-web-v127-shared-app-shell-design.md`

## Tasks
- [ ] Add failing v1.27 validator for shared shell ownership and duplication guard.
- [ ] Add `WorkspaceAppShell`, `WorkspaceNavigation`, `WorkspaceBoundaryNotice` to `packages/ui`.
- [ ] Export `@lgo-web/ui/shell.css` and move common Portal/Ops shell CSS there.
- [ ] Migrate Portal root layout/home to shared shell.
- [ ] Migrate Ops root layout/home to shared shell.
- [ ] Run targeted lint/typecheck and continuity validators.
- [ ] Run one closure build only after source gates are green.
