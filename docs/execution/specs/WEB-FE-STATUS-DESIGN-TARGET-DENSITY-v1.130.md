# WEB-FE-STATUS-DESIGN-TARGET-DENSITY-v1.130

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.130 selected the next visible FE/UI alignment issue after `/release/tester-pack`: `/status` still used the broad Public Service design target even though it is the public maintenance/status transparency page.

SPEC_LOCK: `/status` must receive a page-specific `Public Status` design target before layout changes. Runtime `/status` must expose that target and keep the status hero, maintenance signal board, fixture entries and trust surfaces readable near the first fold while preserving mobile readability and non-claims.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `status-detailed-design-target-v1130.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-STATUS-DETAILED-DESIGN-TARGET-v1.130.png`.

IMPLEMENT: `/status` now uses `lgo-statuspage-stack`, runtime design target routing returns `Public Status`, the registry no longer leaves `/status` under only Public Service, and desktop CSS compacts the page header, status signal board, status explanation and status trust cards against the target.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_status_design_target_density_v1130.py` checks target files, registry, runtime target attachment, CSS markers, e2e guardrail, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-status-design-target-density-v1130.spec.ts` verifies `Public Status` attachment, target href, h1 scale, horizontal overflow, desktop board/explanation/trust placement and mobile header bounds.

VISUAL_REVIEW: The generated target shows a compact Public Status page with maintenance signal crystals, fixture-only entries, public/internal/blocked labels and no CMS/backend/production-monitoring boundaries. Runtime now follows that direction instead of treating `/status` as only a broad Public Service page.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PageHeader`, `GameCard`, `Grid`, `SectionHeading`, `StatusBadge`, `StatusExplanationDepth`, `StatusTrustBoard` and shared design target reference infrastructure. `lgo-statuspage-stack` is page-specific density tuning for `/status` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim CMS, backend, production monitoring, incident backend, live server health or production deployment.

Verification marker: fold density.
