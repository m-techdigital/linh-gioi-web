# WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.122 selected the next visible FE/UI alignment issue after `/story`: `/classes` still used only the broad Public Core target and its first class cards were not locked to a page-specific first-fold design target.

SPEC_LOCK: `/classes` must receive a page-specific `Public Classes` design target before layout changes. Runtime `/classes` must expose that target and keep the five-path cards visible in the first fold while preserving mobile readability.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `classes-detailed-design-target-v1122.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png`.

IMPLEMENT: `/classes` now uses `lgo-classespage-stack`, runtime design target routing returns `Public Classes`, the registry no longer leaves `/classes` under only Public Core, and desktop CSS compacts the hero, heading and first class-card grid against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_classes_design_target_density_v1122.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-classes-design-target-density-v1122.spec.ts` verifies `Public Classes` attachment, target href, h1 scale, horizontal overflow, desktop first-class-card visibility, desktop identity-deck placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a compact classes hero, five-path orbit and visible Võ/Kiếm/Pháp/Cơ/Linh card row in the first board. Runtime now follows that direction instead of treating `/classes` as only a broad Public Core page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PublicPlayerHero`, `ClassPathGrid`, `ClassIdentityDeck`, `ClassArtSpotlight` and shared design target reference infrastructure. `lgo-classespage-stack` is page-specific density tuning for `/classes` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim playable class balance, account character creation, inventory, combat data or production game server readiness.

Verification marker: fold density.
