# HANDOFF — LGO WEB FE JOURNEY DESIGN TARGET DENSITY v1.123

Task: WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/journey` now has the `Public Journey` page-specific design target and browser/e2e guardrails for first-fold density. Desktop must attach the new target, show the route-flow board in the first fold and keep the session loop near the target board. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/journey-detailed-design-target-v1123.png`
- `docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/journey/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-journey-design-target-density-v1123.spec.ts`
- `tools/validate_web_fe_journey_design_target_density_v1123.py`
- `docs/execution/specs/WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md`
- `LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-REPORT-v1.123.md`
- `HANDOFF-LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- built-in image_gen generated the `Public Journey` design target.
- RED: `/journey` had no page-specific `Public Journey` target and still routed to broad Public Core.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-journey-design-target-density-v1123.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Source validation: `python3 tools/validate_web_fe_journey_design_target_density_v1123.py` PASS.
- Build/type/current-state validation: `pnpm --filter @lgo-web/web typecheck` PASS; `pnpm --filter @lgo-web/web build` PASS; artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Journey` / `journey-detailed-design-target-v1123.png`. This target is active for `/journey`. Do not use the broader Public Core target as the only `/journey` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-journeypage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.124.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No live guild, party, inventory, reward, progression or production backend integration is claimed.
