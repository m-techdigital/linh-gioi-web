# AGENTS.md — Linh Giới Online Web Program

This repo is the independent Linh Giới Online Web Program.
It is developed separately from the game repo.
Game repo remains canonical for Unity, Java backend, protocol, gamedata and gameplay.
Web repo owns Official Web, Player Portal, Ops/Admin UI, web design system and web workflow.

Read these files before every task:

1. `AGENTS.md`
2. `docs/execution/WEB-PROJECT-STATE.md`
3. `docs/execution/WEB-NEXT-ACTION.md`
4. `docs/execution/WEB-TASK-LEDGER.md`
5. `docs/execution/WEB-MASTER-ROADMAP.md`

Only work on the current `WEB-NEXT-ACTION` task.
Update state, ledger, report and handoff after every task.
Never create an independent business backend for web.
Java/Spring Boot game backend is canonical for auth/account/character/game data.
Fixtures are provisional and never canonical contracts.

## Lifecycle

All Web Program tasks must move through this lifecycle without skipping evidence:

```text
SELECT
SPEC_LOCK
IMPLEMENT
SOURCE_VERIFY
RUNTIME_VERIFY
VISUAL_REVIEW
HANDOFF
CLOSED
```

## Status tokens

Allowed status tokens:

```text
WEB_TASK_CONTINUE
WEB_TASK_READY_FOR_VERIFY
WEB_VERIFY_PASSED
WEB_VISUAL_REVIEW_REQUIRED
WEB_HANDOFF_DONE
WEB_BLOCKED_EXTERNAL_CONTRACT
WEB_FIX_REQUIRED
WEB_CLOSED
```

## Repository boundary

The Web repo must not copy large Unity, Java server, GameData, build outputs, generated client artifacts or local runtime toolchains from the game repo. Web work may summarize and reference game source context only.

## Backend boundary

- No independent business backend.
- No duplicate account, character, inventory, combat, shop, economy, guild, chat or admin mutation model.
- Next.js route handlers are not canonical backend surfaces; they may only be thin presentation/BFF adapters when a task explicitly justifies the need.
- Real Portal and Ops integration wait for accepted game backend Auth/DB/API contracts.

## Contract boundary

Web contract records live under `packages/contracts` after contract sync begins. Until then, all contracts are unaccepted placeholders. Do not hand-write canonical DTOs per app. Do not treat fixture data as production truth.

## UI ownership boundary

- `packages/design-tokens` owns theme primitives and CSS variables.
- `packages/ui` owns reusable primitives.
- Apps compose pages and domain flows.
- Duplicate component owners are forbidden.


## Design Target First rule

Design Target First is Priority #1 for FE/UI work. Every page, section and reusable component must be attached to a design target before implementation. If the current task has no matching design target, create or replace the design target first, save it under the project design-reference paths, register it in `docs/design/DESIGN-TARGET-REGISTRY.md`, and only then implement the page/component. If a design target becomes misleading or no longer matches the desired UI/UX direction, delete or supersede obsolete design targets in the same task so future work cannot compare against the wrong destination.

## Base UI/UX Layout rule

Reusable UI/UX layout belongs in `packages/design-tokens` and `packages/ui` first. Before adding page-local layout, search for a shared owner and extend the shared Base UI/UX Layout when the pattern can be reused across public web, Portal or Ops. Page-local implementations are allowed only when the handoff records why the pattern is truly one-off.

## Sequential Page Completion rule

FE/UI work must be completed page by page. Start from the selected page, attach or create only the design target needed for that page or section, implement that page against the target, run source/runtime/browser/visual evidence, update docs/handoff, commit and push, and only then move to the next page. Do not create broad multi-page design batches or edit unrelated pages in the same slice. If shared Base UI/UX Layout changes are needed, limit them to reusable primitives required by the current page and record that reason in the handoff.

## Just-in-time Design rule

Design Target First means just-in-time design for the current page or component, not designing the whole site upfront. Each page must have a concrete target before code changes for that page. Public visible design copy must be Vietnamese unless an owner-approved route-specific exception is recorded. If a design is stale, English-heavy, or no longer matches the intended UI/UX direction, replace or supersede that target within the current page slice before implementation.


## Layout Match Before Closure rule

A FE/UI page slice cannot close until the implemented page has been rendered in a real browser and compared against its registered design target. The comparison must cover hero composition, visual hierarchy, spacing, typography scale, content order, first-fold density and mobile behavior. Copy-only, label-only, validator-only or density-only changes are not enough to mark a page WEB_CLOSED. If the implementation does not match the target, keep working on that same page; do not move to another page.

## Evidence rule

Source inspection alone is not runtime PASS. If runtime/browser/visual gates cannot run in the environment, classify them as not executed or environment limited in the task handoff. Never skip-as-PASS.

## Base First rule

Base First is mandatory for all three applications (`apps/web`, `apps/portal`, `apps/ops`). Search shared owners before creating app-local code. If a capability can be reused by two or more apps, extend `packages/*` first and let apps consume it. App-local duplicates of reusable UI, auth, API, config, contracts or testing helpers are forbidden unless the handoff records a concrete reason.

Build Once is the verification rule: use targeted validators/tests/typechecks during the inner loop, reuse unchanged PASS evidence, and run the full production build at closure or when build-relevant source/config/dependency changes invalidate that evidence.
