# WEB-FE-DESIGN-TARGET-CUE-SPACING-v1.108

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.108. Design Target First links now show a visible `↗` cue, but the cue and label had no explicit flex gap, which made the visual affordance weaker.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared link spacing and the active page/workspace targets for surface scope. Do not create a new design image because this slice aligns an existing shared component state with the registered component atlas.

## IMPLEMENT

Added `gap: .4rem` to public and workspace Design Target First link styles, keeping the cue visually separated from the label. Base UI/UX Layout remains shared through public global styles and `packages/ui/src/shell.css` for workspace shells.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_cue_spacing_v1108.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-cue-spacing-v1108.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because `columnGap` was not set.
- GREEN browser/e2e: the same command passed 6/6 after public and workspace styles gained `gap: .4rem`.

## VISUAL_REVIEW

The `↗` cue remains compact, with spacing that matches the registered component/state direction and does not alter link count, target assets or responsive action grouping.

## HANDOFF

Future Design Target First link visual edits should keep the label/cue gap in both public and workspace styles so the shared cue remains legible across surfaces.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
