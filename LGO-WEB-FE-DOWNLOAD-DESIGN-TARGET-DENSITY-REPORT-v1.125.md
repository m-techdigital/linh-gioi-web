# LGO WEB FE DOWNLOAD DESIGN TARGET DENSITY REPORT v1.125

Task: WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/download` now has its own `Public Download` design target and runtime attachment. The page now follows the target hierarchy by showing a compact sealed-download hero and a visible release readiness checklist in the first fold.

## What changed

- Added `apps/web/public/design-reference/download-detailed-design-target-v1125.png` and docs mirror `docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png`.
- Registered `Public Download` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/download` from the broad Public Service applies-to list.
- Routed `/download` to the new target in `PublicDesignTargetReference`.
- Added `lgo-downloadpage-stack` and `lgo-download-readiness-target-panel` to `/download`, and scoped desktop density CSS for the hero, sealed gate, readiness board and download status continuation.
- Added browser/e2e coverage in `tests/e2e/fe-download-design-target-density-v1125.spec.ts`.
- Added validator `tools/validate_web_fe_download_design_target_density_v1125.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Download` target.
- RED browser/e2e: desktop/mobile `/download` could not find `Public Download` target because route still used the broad Public Service target.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-download-design-target-density-v1125.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_download_design_target_density_v1125.py`.
- Closure validation PASS: py_compile for v1.125/v1.124/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/download` changes must compare against `Public Download`; if release-readiness direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing download sections were reused; page-local CSS is scoped to `/download` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public download artifact, checksum, owner approval, entitlement, production deployment or playable public build readiness is claimed.

Verification marker: fold density.
