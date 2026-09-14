# WEB-FE-DESIGN-TARGET-FOCUS-MOTION-v1.102

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.102. Browser review found that the public Design Target First link had visible focus motion, but the same workspace link in Portal/Ops only had an outline. This created an inconsistent shared UI affordance.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared link/focus behavior and the existing Portal/Ops page targets for workspace layout. Do not create a new design image because the target already covers navigation, buttons, shared states, typography and spacing.

## IMPLEMENT

Workspace Design Target First links now use the same focused/hovered lift as public links via `packages/ui/src/shell.css`, with a short transition for consistent Base UI/UX Layout interaction.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_focus_motion_v1102.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-focus-motion-v1102.spec.ts --project=chromium-desktop --project=chromium-mobile` failed for Portal/Ops because focused workspace design-target links had `transform: none`.
- GREEN browser/e2e: the same command passed 6/6 after the workspace shell CSS update.

## VISUAL_REVIEW

The visible focus treatment now matches the registered component/state interaction direction: outline, offset and a subtle upward motion. Public, Portal and Ops stay visually aligned without adding app-local duplicate styles.

## HANDOFF

Future workspace focus/hover polish should keep public and workspace Design Target First link affordances in parity and verify the behavior in browser/e2e.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
