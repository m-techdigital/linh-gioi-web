# WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.127 selected the next visible FE/UI alignment issue after `/download/trust`: `/release` still used the broad Public Service design target even though it is the public release narrative and proof-before-promise page.

SPEC_LOCK: `/release` must receive a page-specific `Public Release` design target before layout changes. Runtime `/release` must expose that target and keep the release hero, M0→M1 visual board and proof sequence readable near the first fold while preserving mobile readability and non-claims.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `release-detailed-design-target-v1127.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-RELEASE-DETAILED-DESIGN-TARGET-v1.127.png`.

IMPLEMENT: `/release` now uses `lgo-releasepage-stack`, runtime design target routing returns `Public Release`, the registry no longer leaves `/release` under only Public Service, and desktop CSS compacts the release narrative hero, M0→M1 visual board, proof heading and release readiness CTA against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_release_design_target_density_v1127.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-release-design-target-density-v1127.spec.ts` verifies `Public Release` attachment, target href, h1 scale, horizontal overflow, desktop board/heading/readiness placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a compact Public Release page with release narrative, M0→M1 stage-gate proof, no open beta claim, owner approval and proof-before-promise cards. Runtime now follows that direction instead of treating `/release` as only a broad Public Service page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `GameCard`, `SectionHeading`, `StatusBadge`, `ReleaseReadinessHubCta` and shared design target reference infrastructure. `lgo-releasepage-stack` is page-specific density tuning for `/release` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim public build, open beta, closed-test entitlement, production deployment or playable public build readiness.

Verification marker: fold density.
