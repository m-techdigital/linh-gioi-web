# LGO WEB FE RELEASE DESIGN TARGET DENSITY REPORT v1.127

Task: WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/release` now has its own `Public Release` design target and runtime attachment. The page now follows the target hierarchy by showing a compact release narrative hero, a visible M0→M1 gate board and the release readiness CTA nearer the proof-before-promise sequence.

## What changed

- Added `apps/web/public/design-reference/release-detailed-design-target-v1127.png` and docs mirror `docs/design/reference/WEB-FE-RELEASE-DETAILED-DESIGN-TARGET-v1.127.png`.
- Registered `Public Release` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/release` from the broad Public Service applies-to list.
- Routed `/release` to the new target in `PublicDesignTargetReference`.
- Added `lgo-releasepage-stack` to `/release`, moved `ReleaseReadinessHubCta` closer to the top narrative sequence, and fixed the lingering indentation around `ClosedTesterInformationPackCta`.
- Added scoped desktop density CSS for the hero, release narrative visual board, proof heading and release readiness CTA.
- Added browser/e2e coverage in `tests/e2e/fe-release-design-target-density-v1127.spec.ts`.
- Added validator `tools/validate_web_fe_release_design_target_density_v1127.py`.

## Evidence

- built-in image_gen produced the 1672x940 `Public Release` target.
- RED browser/e2e: desktop `/release` could not find `Public Release` target because route still used the broad Public Service target.
- GREEN browser/e2e during implementation: desktop `/release` passed after attachment and density tuning.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_release_design_target_density_v1127.py`.
- Historical v1.126 validator PASS after next-action handoff: `python3 tools/validate_web_fe_download_trust_design_target_density_v1126.py`.
- Closure validation PASS: `python3 -m py_compile tools/validate_web_fe_release_design_target_density_v1127.py tools/validate_web_current_state.py tools/validate_web_fe_download_trust_design_target_density_v1126.py`; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/release` changes must compare against `Public Release`; if release-narrative direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing public release sections were reused; page-local CSS is scoped to `/release` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public build, open beta, closed-test entitlement, production deployment or playable public build readiness is claimed.

Verification marker: fold density.
