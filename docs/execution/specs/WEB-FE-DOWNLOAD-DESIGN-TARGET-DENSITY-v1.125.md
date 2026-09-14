# WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.125 selected the next visible FE/UI alignment issue after public core page targets: `/download` still used only the broad Public Service target even though it is the main release-readiness and no-fake-download page.

SPEC_LOCK: `/download` must receive a page-specific `Public Download` design target before layout changes. Runtime `/download` must expose that target and keep the release readiness board visible in the first fold while preserving mobile readability and no-download non-claims.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `download-detailed-design-target-v1125.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png`.

IMPLEMENT: `/download` now uses `lgo-downloadpage-stack`, runtime design target routing returns `Public Download`, the registry no longer leaves `/download` under only Public Service, and desktop CSS compacts the sealed-download hero plus readiness checklist against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_download_design_target_density_v1125.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-download-design-target-density-v1125.spec.ts` verifies `Public Download` attachment, target href, h1 scale, horizontal overflow, desktop readiness-list visibility, desktop status-depth placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a sealed public gate, no fake download messaging and a visible readiness board in the first screen. Runtime now follows that direction instead of treating `/download` as only a broad Public Service page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PublicPlayerHero`, `SectionHeading`, `StatusBadge`, `DownloadStatusDepth` and shared design target reference infrastructure. `lgo-downloadpage-stack` is page-specific density tuning for `/download` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim public download artifact, checksum, owner approval, entitlement, production deployment or playable public build readiness.

Verification marker: fold density.
