# HANDOFF — LGO WEB FE DOWNLOAD DESIGN TARGET DENSITY v1.125

Task: WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/download` now has the `Public Download` page-specific design target and browser/e2e guardrails for first-fold readiness density / fold density. Desktop must attach the new target, show readiness cards in the first fold and keep status depth near the target board. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/download-detailed-design-target-v1125.png`
- `docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/download/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-download-design-target-density-v1125.spec.ts`
- `tools/validate_web_fe_download_design_target_density_v1125.py`
- `docs/execution/specs/WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md`
- `LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-REPORT-v1.125.md`
- `HANDOFF-LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- built-in image_gen generated the `Public Download` design target.
- RED: `/download` had no page-specific `Public Download` target and still routed to broad Public Service.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-download-design-target-density-v1125.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Source validation: `python3 tools/validate_web_fe_download_design_target_density_v1125.py` PASS.
- Build/type/current-state validation: `pnpm --filter @lgo-web/web typecheck` PASS; `pnpm --filter @lgo-web/web build` PASS; artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Download` / `download-detailed-design-target-v1125.png`. This target is active for `/download`. Do not use the broader Public Service target as the only `/download` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-downloadpage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.126.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public download artifact, checksum, owner approval, entitlement, production deployment or playable public build integration is claimed.
