# HANDOFF — LGO WEB FE HOMEPAGE TARGET FOLD DENSITY v1.119

Task: WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

The Public `/` homepage now has runtime browser/e2e guardrails that enforce Design Target First fold density against the registered `Public Homepage` target. Desktop must show the hero plus enough of the first content cards in the first fold; mobile keeps the existing non-extreme hero guardrail.

## Files changed

- `apps/web/src/components/PublicGameExperienceSections.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-homepage-target-fold-density-v1119.spec.ts`
- `tools/validate_web_fe_homepage_target_fold_density_v1119.py`
- `docs/execution/specs/WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119.md`
- `LGO-WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-REPORT-v1.119.md`
- `HANDOFF-LGO-WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- RED: desktop first-card visibility failed before final density tuning.
- Runtime: DOM inspection confirmed the first pillar card existed and the issue was layout density.
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-homepage-target-fold-density-v1119.spec.ts --project=chromium-desktop --project=chromium-mobile` passed 2/2.
- Source validation: `python3 tools/validate_web_fe_homepage_target_fold_density_v1119.py` PASS.
- Build/type validation: `pnpm --filter @lgo-web/web typecheck` PASS and `pnpm --filter @lgo-web/web build` PASS. Current-state validation: artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Homepage` / `homepage-detailed-design-target-v1118.png`. This task implements the existing target; it does not replace it. Any future homepage section changes must first check whether the current `Public Homepage` target still covers the changed area. If not, create or supersede the target before implementation.

## Base UI/UX Layout

Base UI/UX Layout remains required. No shared primitive was duplicated. The homepage-specific `lgo-home-pillar-section` marker exists only to align this page with its detailed homepage target.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.120.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No production deployment is claimed.
