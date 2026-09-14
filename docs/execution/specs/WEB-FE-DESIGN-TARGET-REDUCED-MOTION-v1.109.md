# WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.109. Design Target First links lift on hover/focus, but the lift and transition did not respect `prefers-reduced-motion`.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared interaction states. Do not create a new design image because this slice improves the reduced-motion behavior of an existing shared component state.

## IMPLEMENT

Added `prefers-reduced-motion: reduce` rules for public and workspace Design Target First links. Reduced-motion users keep the outline focus state, while transform lift and transition are disabled. Base UI/UX Layout remains shared through public global styles and `packages/ui/src/shell.css`.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_reduced_motion_v1109.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-reduced-motion-v1109.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because reduced-motion focus still produced transform/transition.
- GREEN browser/e2e: the same command passed 6/6 after public and workspace reduced-motion styles were added.

## VISUAL_REVIEW

Default motion remains unchanged for users without reduced-motion preference. Reduced-motion users keep a clear outline and no lift animation, aligning interaction behavior with accessibility expectations.

## HANDOFF

Future Design Target First motion effects should include reduced-motion behavior in both public and workspace styles and should be covered by browser/e2e.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
