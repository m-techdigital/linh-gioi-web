# WEB-FE-DESIGN-TARGET-REGION-SCOPE-v1.104

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.104. Design Target First regions were exposed as a generic region named `Design target reference`, which did not distinguish Public Core, Player Portal or Ops/Admin for assistive technology users.

## SPEC_LOCK

Use the existing v1.95 Public Core, Player Portal, Ops/Admin and Component/state design targets. Do not create a new design image because this slice improves semantic naming for the shared Base UI/UX Layout component without changing visual layout.

## IMPLEMENT

`DesignTargetReference` now includes its `scope` in the region accessible name: `Design target reference — ${scope}`. Existing tests and users can still find the region by the stable `Design target reference` prefix.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_region_scope_v1104.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-region-scope-v1104.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because the region name omitted Public/Portal/Ops scope.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

No visual design target changed. The region keeps the same visible Design Target First band, links, focus motion and spacing while the semantic label now matches the registered scope.

## HANDOFF

Future Design Target First regions should preserve the scoped accessible name pattern so page/workspace comparison targets remain distinguishable in browser/e2e and assistive navigation.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
