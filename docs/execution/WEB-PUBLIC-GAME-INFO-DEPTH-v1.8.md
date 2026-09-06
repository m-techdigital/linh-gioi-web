# WEB-PUBLIC-GAME-INFO-DEPTH-v1.8

## Purpose

WEB v1.8 deepens the actual public web product for Linh Giới Online. The task expands player-facing game information, world story, beginner guide, download/status wording, support FAQ and community readiness.

Runtime/browser/e2e is guardrail only. It protects source changes but is not the product focus of this slice.

## Product additions

- World story chapters explain the current public fantasy anchors: Spirit Gate arrival, Gate Keeper guidance, Training Stone loop and return-to-lobby framing.
- Beginner guide sections give a simple four-step path for players: check download status, read world context, follow roadmap, and send feedback through the right static support guidance.
- Download status notes explain why no public download button exists before release artifact, checksum and owner approval.
- Support FAQ answers common player questions about download availability, dev login, production auth, DB persistence, combat, guild/chat/economy and backend contract boundaries.
- Community readiness content clarifies what can be communicated now and what requires future content ownership/API/RBAC/audit gates.
- `/guides/beginner` is added as a public guide depth route.

## Source ownership

- Web source remains independent from the game repository.
- Game backend canonical owner remains `LinhGioiOnline/server`.
- Content is file-backed typed local fixture data, not CMS or backend data.
- Portal and ops shells remain fixture-only until WEB-08+ accepted backend contracts.

## Runtime/browser/e2e position

Runtime/browser/e2e is guardrail only. The validator and targeted build/typecheck should catch regressions in changed public content. Full browser matrix can be rerun when time/runtime allows, but this task must not turn into another tooling-only loop.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.
- No public game download artifact.
- No production quest system or gameplay wiki.
- No combat damage, HP, loot or skill economy claim.

## Validation target

Required source gates:

- `python3 -m py_compile tools/*.py`
- `python3 tools/validate_web_public_game_info_depth.py`
- `python3 tools/validate_web_current_state.py`
- package hygiene check through validators

Recommended runtime guardrails when runtime kit is available:

- `pnpm install --offline --ignore-scripts`
- changed package targeted typecheck for `@lgo-web/content`, `@lgo-web/ui`, `@lgo-web/web`
- changed package tests for `@lgo-web/content`
- targeted `@lgo-web/web` build
- optional public/browser route checks for `/`, `/game`, `/guides`, `/guides/beginner`, `/download`, `/support`, `/community`

## Final decision options

- `LGO_WEB_PUBLIC_GAME_INFO_DEPTH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.8`
- `LGO_WEB_PUBLIC_GAME_INFO_DEPTH_SOURCE_READY_v1.8`
- `LGO_WEB_PUBLIC_GAME_INFO_DEPTH_FIX_REQUIRED_v1.8`
- `BLOCKED_EXTERNAL_CONTRACT`
