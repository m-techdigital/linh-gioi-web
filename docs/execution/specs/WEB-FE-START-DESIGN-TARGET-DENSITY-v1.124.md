# WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.124 selected the next visible FE/UI alignment issue after `/journey`: `/start` still used only the broad Public Core target and lacked a page-specific design destination for the onboarding/tutorial layout.

SPEC_LOCK: `/start` must receive a page-specific `Public Start` design target before layout changes. Runtime `/start` must expose that target and keep the tutorial gameplay board plus onboarding screenshots close to the first fold while preserving mobile readability.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `start-detailed-design-target-v1124.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png`.

IMPLEMENT: `/start` now uses `lgo-startpage-stack`, runtime design target routing returns `Public Start`, the registry no longer leaves `/start` under only Public Core, and desktop CSS compacts the hero, tutorial steps, gameplay board and screenshot continuation against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_start_design_target_density_v1124.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-start-design-target-density-v1124.spec.ts` verifies `Public Start` attachment, target href, h1 scale, horizontal overflow, desktop tutorial-board visibility, desktop screenshot-panel placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a compact onboarding hero, step chips, tutorial board and visible screenshot cards in the first board. Runtime now follows that direction instead of treating `/start` as only a broad Public Core page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PublicPlayerHero`, `SectionHeading`, `ClassPathGrid`, `WorldRouteJourney`, `StatusBadge` and shared design target reference infrastructure. `lgo-startpage-stack` is page-specific density tuning for `/start` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim public build/download, login, entitlement, tutorial state, combat progression or production game server readiness.

Verification marker: fold density.
