# WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120

Status: WEB_CLOSED

## Lifecycle

SELECT: Current WEB-NEXT-ACTION v1.120 selected the next visible FE UI/UX alignment issue after homepage fold density. Browser audit showed `/game` still used only the broad Public Core target and pushed the world board/route content below the first desktop fold.

SPEC_LOCK: `/game` must have a page-specific `Public Game World` design target before layout work. Runtime `/game` must expose that target and keep the world design board plus route-map content close to the first desktop fold while preserving mobile readability.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `game-world-detailed-design-target-v1120.png` with built-in image_gen and registered it as `Public Game World`. The target is mirrored under `docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png`.

IMPLEMENT: `/game` now uses `lgo-gamepage-stack`, runtime design target routing returns `Public Game World` for `/game`, and desktop-only CSS compacts the game hero, design board and first route-map spacing against the new target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_game_world_design_target_density_v1120.py` checks target files, registry, runtime target attachment, test markers, CSS markers, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-game-world-design-target-density-v1120.spec.ts` verifies `Public Game World` attachment, target href, h1 scale, horizontal overflow, desktop design-board visibility, desktop route placement and mobile hero bounds.

VISUAL_REVIEW: The generated `Public Game World` target shows hero, route strip and world atlas cards in one cohesive first-board composition. Runtime desktop now keeps the game world board and route section close enough to compare against that target.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It uses existing `Stack`, `PublicPlayerHero`, `CinematicWorldScene`, `StatusBadge` and shared design target reference infrastructure. The new `lgo-gamepage-stack` class is page-specific density tuning for `/game` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This slice is FE design-target/runtime layout evidence only and does not claim live world map, account position, quest state or production game server readiness.
