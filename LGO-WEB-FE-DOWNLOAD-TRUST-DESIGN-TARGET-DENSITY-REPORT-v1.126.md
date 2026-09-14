# LGO WEB FE DOWNLOAD TRUST DESIGN TARGET DENSITY REPORT v1.126

Task: WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/download/trust` now has its own `Public Download Trust` design target and runtime attachment. The page now follows the target hierarchy by showing a compact no-fake-download trust hero and the release readiness, owner gate and checksum/provenance trust board much earlier in the reading sequence.

## What changed

- Added `apps/web/public/design-reference/download-trust-detailed-design-target-v1126.png` and docs mirror `docs/design/reference/WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png`.
- Registered `Public Download Trust` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/download/trust` from the broad Public Service applies-to list.
- Routed `/download/trust` to the new target in `PublicDesignTargetReference`.
- Added `lgo-downloadtrustpage-stack`, `lgo-download-trust-hero-card` and `lgo-download-trust-first-gates` to `/download/trust`, and moved `DownloadTrustGateBoard` nearer the top to match the target.
- Added scoped desktop density CSS for the hero, release readiness CTA, owner release gate board and trust gate cards.
- Added browser/e2e coverage in `tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts`.
- Added validator `tools/validate_web_fe_download_trust_design_target_density_v1126.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Download Trust` target.
- RED browser/e2e: desktop `/download/trust` could not find `Public Download Trust` target because route still used the broad Public Service target.
- GREEN browser/e2e during implementation: desktop `/download/trust` passed after attachment, density tuning and trust-gate reorder.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_download_trust_design_target_density_v1126.py`.
- Historical v1.125 validator PASS after next-action handoff: `python3 tools/validate_web_fe_download_design_target_density_v1125.py`.
- Closure validation PASS: `python3 -m py_compile tools/validate_web_fe_download_trust_design_target_density_v1126.py tools/validate_web_current_state.py tools/validate_web_fe_download_design_target_density_v1125.py`; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/download/trust` changes must compare against `Public Download Trust`; if checksum/provenance/trust direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing public trust/release sections were reused; page-local CSS is scoped to `/download/trust` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public download artifact, checksum, owner approval, entitlement, production deployment or playable public build readiness is claimed.

Verification marker: fold density.
