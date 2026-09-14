# HANDOFF — LGO WEB FE RELEASE DESIGN TARGET DENSITY v1.127

Task: WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/release` now has the `Public Release` page-specific design target and browser/e2e guardrails for release narrative first-fold density / fold density. Desktop must attach the new target, show the M0→M1 board near the first fold and keep release readiness near the target story sequence. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/release-detailed-design-target-v1127.png`
- `docs/design/reference/WEB-FE-RELEASE-DETAILED-DESIGN-TARGET-v1.127.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/release/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-release-design-target-density-v1127.spec.ts`
- `tools/validate_web_fe_release_design_target_density_v1127.py`
- `docs/execution/specs/WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127.md`
- `LGO-WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-REPORT-v1.127.md`
- `HANDOFF-LGO-WEB-FE-RELEASE-DESIGN-TARGET-DENSITY-v1.127.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`
- `tools/validate_web_current_state.py`

## Evidence to keep

- built-in image_gen generated the `Public Release` design target.
- RED: `/release` had no page-specific `Public Release` target and still routed to broad Public Service.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- Source validation PASS: `python3 tools/validate_web_fe_release_design_target_density_v1127.py`.
- Historical validation PASS: `python3 tools/validate_web_fe_download_trust_design_target_density_v1126.py`.
- Build/type/current-state validation PASS: `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Target: `Public Release` / `release-detailed-design-target-v1127.png`. This target is active for `/release`. Do not use the broader Public Service target as the only `/release` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-releasepage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.128.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public build, open beta, closed-test entitlement, production deployment or playable public build integration is claimed.
