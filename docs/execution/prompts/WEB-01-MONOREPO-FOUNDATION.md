# WEB-01 — MONOREPO FOUNDATION

You are working in the independent LinhGioiOnline-Web repo.

Read all WEB control tower docs before changes:

- `AGENTS.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`
- `docs/execution/WEB-MASTER-ROADMAP.md`
- `docs/execution/WEB-ARCHITECTURE.md`
- `docs/execution/WEB-OWNERSHIP-MAP.md`
- `docs/execution/WEB-HANDOFF-CONTRACT.md`

## Goal

Scaffold pnpm/Turborepo/Next.js monorepo.

Use target stack:

```text
Next.js 16.x
React 19.2
TypeScript strict
Node 24 LTS target
pnpm
Turborepo
```

## Required implementation

Create apps/packages:

- `apps/web` active first.
- `apps/portal` compile-only placeholder.
- `apps/ops` compile-only placeholder.
- `packages/ui`.
- `packages/design-tokens`.
- `packages/content`.
- `packages/contracts`.
- `packages/api-client`.
- `packages/config`.
- `packages/testing`.

Add:

- lint script.
- typecheck script.
- test script.
- build script.
- basic validation script.

## Strict forbidden scope

- Do not implement homepage feature content yet.
- Do not integrate backend.
- Do not create business backend.
- Do not create canonical DTOs by hand.
- Do not start Portal/Ops real workflows.

## Required outputs

Produce report, handoff, changed files, deletion list, full-source ZIP and SHA256.

## Required final decision

Use exactly one:

```text
WEB_01_MONOREPO_FOUNDATION_CLOSED
WEB_01_MONOREPO_FOUNDATION_FIX_REQUIRED
WEB_BLOCKED_EXTERNAL_CONTRACT
```
