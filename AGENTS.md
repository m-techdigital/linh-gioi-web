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

## Evidence rule

Source inspection alone is not runtime PASS. If runtime/browser/visual gates cannot run in the environment, classify them as not executed or environment limited in the task handoff. Never skip-as-PASS.
