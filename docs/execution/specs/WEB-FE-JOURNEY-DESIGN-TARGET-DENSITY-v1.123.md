# WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.123 selected the next visible FE/UI alignment issue after `/classes`: `/journey` still used only the broad Public Core target and lacked a page-specific design destination for the player session-loop layout.

SPEC_LOCK: `/journey` must receive a page-specific `Public Journey` design target before layout changes. Runtime `/journey` must expose that target and keep the route-flow board plus session-loop cards close to the first fold while preserving mobile readability.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `journey-detailed-design-target-v1123.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png`.

IMPLEMENT: `/journey` now uses `lgo-journeypage-stack`, runtime design target routing returns `Public Journey`, the registry no longer leaves `/journey` under only Public Core, and desktop CSS compacts the hero, route-flow board and session-loop continuation against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_journey_design_target_density_v1123.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-journey-design-target-density-v1123.spec.ts` verifies `Public Journey` attachment, target href, h1 scale, horizontal overflow, desktop route-flow board visibility, desktop session-loop placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a compact journey hero, session cycle, route-flow board and visible first session cards in the first board. Runtime now follows that direction instead of treating `/journey` as only a broad Public Core page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PublicPlayerHero`, `SessionLoopRail`, `WorldRouteJourney`, `StatusBadge` and shared design target reference infrastructure. `lgo-journeypage-stack` is page-specific density tuning for `/journey` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim live guild, party, inventory, reward, progression or production game server readiness.

Verification marker: fold density.
