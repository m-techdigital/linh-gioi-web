# WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.126 selected the next visible FE/UI alignment issue after `/download`: `/download/trust` still used the broad Public Service design target even though it is the checksum, provenance and proof-before-download trust page.

SPEC_LOCK: `/download/trust` must receive a page-specific `Public Download Trust` design target before layout changes. Runtime `/download/trust` must expose that target and keep the trust gates readable near the first fold while preserving mobile readability and no-download non-claims.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `download-trust-detailed-design-target-v1126.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png`.

IMPLEMENT: `/download/trust` now uses `lgo-downloadtrustpage-stack`, runtime design target routing returns `Public Download Trust`, the registry no longer leaves `/download/trust` under only Public Service, and desktop CSS compacts the trust hero plus release/owner/checksum gate sequence against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_download_trust_design_target_density_v1126.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts` verifies `Public Download Trust` attachment, target href, h1 scale, horizontal overflow, desktop readiness/owner/trust-gate placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows a compact Download Trust page with no fake download, artifact/SHA256/provenance/known-limitations/support-expectation/owner-approval cards and a stronger fantasy trust-vault visual direction. Runtime now follows that direction instead of treating `/download/trust` as only a broad Public Service page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `GameCard`, `SectionHeading`, `StatusBadge`, `ReleaseReadinessHubCta`, `OwnerReleaseGateBoard`, `DownloadTrustGateBoard` and shared design target reference infrastructure. `lgo-downloadtrustpage-stack` is page-specific density tuning for `/download/trust` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim public download artifact, checksum, owner approval, entitlement, production deployment or playable public build readiness.

Verification marker: fold density.
