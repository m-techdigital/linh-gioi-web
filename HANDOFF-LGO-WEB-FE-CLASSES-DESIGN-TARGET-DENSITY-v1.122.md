# HANDOFF — LGO WEB FE CLASSES DESIGN TARGET DENSITY v1.122

Task: WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/classes` now has the `Public Classes` page-specific design target and browser/e2e guardrails for first-fold density. Desktop must attach the new target, show the first class card row in the first fold and keep the identity deck near the target board. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/classes-detailed-design-target-v1122.png`
- `docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/classes/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-classes-design-target-density-v1122.spec.ts`
- `tools/validate_web_fe_classes_design_target_density_v1122.py`
- `docs/execution/specs/WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md`
- `LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-REPORT-v1.122.md`
- `HANDOFF-LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- built-in image_gen generated the `Public Classes` design target.
- RED: `/classes` had no page-specific `Public Classes` target and still routed to broad Public Core.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-classes-design-target-density-v1122.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Source validation: `python3 tools/validate_web_fe_classes_design_target_density_v1122.py` PASS.
- Build/type/current-state validation: `pnpm --filter @lgo-web/web typecheck` PASS; `pnpm --filter @lgo-web/web build` PASS; artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Classes` / `classes-detailed-design-target-v1122.png`. This target is active for `/classes`. Do not use the broader Public Core target as the only `/classes` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-classespage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.123.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No playable class balance, account character creation, inventory, combat data or production backend integration is claimed.
