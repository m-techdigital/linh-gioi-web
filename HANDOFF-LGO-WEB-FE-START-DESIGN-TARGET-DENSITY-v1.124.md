# HANDOFF — LGO WEB FE START DESIGN TARGET DENSITY v1.124

Task: WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/start` now has the `Public Start` page-specific design target and browser/e2e guardrails for first-fold density. Desktop must attach the new target, show the tutorial gameplay board in the first fold and keep the real screenshot panel near the target board. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/start-detailed-design-target-v1124.png`
- `docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/start/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-start-design-target-density-v1124.spec.ts`
- `tools/validate_web_fe_start_design_target_density_v1124.py`
- `docs/execution/specs/WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md`
- `LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-REPORT-v1.124.md`
- `HANDOFF-LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- built-in image_gen generated the `Public Start` design target.
- RED: `/start` had no page-specific `Public Start` target and still routed to broad Public Core.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-start-design-target-density-v1124.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Source validation: `python3 tools/validate_web_fe_start_design_target_density_v1124.py` PASS.
- Build/type/current-state validation: `pnpm --filter @lgo-web/web typecheck` PASS; `pnpm --filter @lgo-web/web build` PASS; artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Start` / `start-detailed-design-target-v1124.png`. This target is active for `/start`. Do not use the broader Public Core target as the only `/start` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-startpage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.125.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public build/download, login, entitlement, tutorial state, combat progression or production backend integration is claimed.
