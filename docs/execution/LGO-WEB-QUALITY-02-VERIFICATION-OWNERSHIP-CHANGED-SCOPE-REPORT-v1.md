# LGO-WEB-QUALITY-02 — Verification Ownership & Changed-Scope Runner Report v1

Date: 2026-09-18
Task: T-74abca84ec1a
Base source: 25c8b794c6711aea6ce22eded410863b973fb3fd
Status: IMPLEMENTED — final commit is recorded in task/evidence closure

## Goal

Replace ad-hoc repeated verification choices with one compact ownership map and one runner.

The task deliberately does not create more domain-specific validators. It reuses existing canonical checks and chooses the minimum appropriate set from changed paths.

Developer entrypoint:

pnpm verify:scope

Modes:
- changed
- focused
- integration
- release
## Ownership model

The manifest contains nine coarse owners, not one entry per route:

- shared-ui
- portal
- ops
- contracts-auth
- content
- public-web
- tooling
- docs
- browser-tests

Each owner maps to existing canonical checks by mode.

Examples:
- shared UI → shared-base + UI/token typechecks + consuming app typechecks in integration mode.
- Portal → portal shell + shared-base + Portal typecheck/test.
- Ops → ops shell + shared-base + Ops typecheck/test.
- contracts/auth → game-contract-sync + contract/client/auth package checks.
- docs → only global diff hygiene.
- unknown path → broadens to current-state/root checks rather than silently skipping.
## Dedupe and cost policy

Checks have stable IDs and commands in tools/web_verification_ownership_v1.json.

The runner:
- unions owner checks by check ID;
- keeps first-seen deterministic order;
- executes each ID once;
- stops on first failing check;
- records duration per check;
- records changed-path/source provenance;
- does not shell-eval manifest commands.

Release mode adds canonical closure gates once:
- root lint;
- root typecheck;
- root test;
- root build;
- current state;
- browser E2E.

Owner-specific release checks remain static/domain guards; root closure checks are not duplicated per owner.
## Source selection

Supported selection:
- explicit repeated --path;
- --changed-from REF, combining REF...HEAD with current WIP;
- default current working-tree changes.

Recorded provenance includes:
- source kind;
- reference when present;
- current HEAD;
- path count;
- exact normalized paths;
- matched owners;
- unknown paths;
- whether the plan broadened.

--plan prints the selected DAG without execution.
--report writes plan + execution timing/result JSON.
## TDD evidence

RED:
- tools/test_web_changed_scope_verification.py failed with ModuleNotFoundError before runner implementation.

GREEN:
- 5/5 focused unit tests PASS.

Covered:
1. shared-UI focused ownership.
2. unknown path broadening.
3. overlapping owner/path check deduplication.
4. release closure checks exactly once.
5. source provenance preservation.
## Real runner evidence

### Unknown scope — focused plan

Input:
unowned/new-area/file.txt

Result:
- broadened = true;
- current-state selected;
- root-typecheck selected;
- path remains in unknown_paths.

No unknown path is silently treated as docs-only/cheap.

### Ops release plan

Input:
apps/ops/src/app/page.tsx

Selected:
- git-diff-check
- ops-shell
- shared-base
- root-lint
- root-typecheck
- root-test
- root-build
- current-state
- root-e2e

Every release closure ID appears once.
### Shared UI integration execution

Explicit path:
packages/ui/src/data.css

Matched owner:
shared-ui

Deduplicated checks:
1. git-diff-check
2. shared-base
3. ui-typecheck
4. design-tokens-typecheck
5. portal-typecheck
6. ops-typecheck
7. web-typecheck

All seven executed and PASSed.

Observed durations:
- git-diff-check: about 60 ms
- shared-base: about 163 ms
- UI typecheck: about 6.1 s
- design tokens typecheck: about 2.0 s
- Portal typecheck: about 7.7 s
- Ops typecheck: about 5.9 s
- Public Web typecheck: about 17.8 s

This gives concrete evidence why changed-scope selection is useful: consumer checks remain available without re-running the entire release chain after every small shared-style edit.
## Current-task self-selection proof

Using:

pnpm verify:scope --mode changed --changed-from origin/main --plan

on this task selected:
- package.json
- test runner source
- changed-scope runner source
- ownership manifest

All mapped to owner tooling.

Selected checks:
- git-diff-check
- active-suite-authority

No duplicate check IDs were emitted.
## Release/current-state note

The existing WEB CURRENT STATE gate intentionally rejects node_modules/.next/cache artifacts in a live worktree.

This runner does not weaken or hide that behavior.

For exact source closure when local runtime caches exist:
- use a clean git-archive source candidate, as already established by existing Web governance;
- or run release mode in a clean CI/source environment.

Unknown-path broadening can therefore surface an environment/source cleanliness blocker accurately rather than suppress it.
## Changed source

- package.json
  - adds one verify:scope entrypoint.
- tools/web_verification_ownership_v1.json
  - compact owner/check mapping.
- tools/web_changed_scope_verification.py
  - plan/execute/timing/provenance runner.
- tools/test_web_changed_scope_verification.py
  - five RED/GREEN tests.
- docs/execution/WEB-CODE-QUALITY-GATES.md
  - documents mode usage.
- this report.

No app route behavior, API contract, fixture data, Game source, or Public Web product behavior is changed.
## Acceptance result

Implementation satisfies:
- one ownership manifest;
- changed/focused/integration/release modes;
- canonical existing checks reused;
- duplicate execution avoided by check ID;
- timing evidence recorded;
- source provenance recorded;
- unknown paths broaden safely;
- no new active validator added;
- no AXIRO budget/command catalogue copied wholesale.

The runner is orchestration only. It does not convert a focused PASS into release readiness unless release-mode closure gates actually execute and pass.
