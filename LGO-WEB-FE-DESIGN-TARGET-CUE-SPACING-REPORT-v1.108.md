# LGO Web FE Design Target Cue Spacing Report v1.108

Task: WEB-FE-DESIGN-TARGET-CUE-SPACING-v1.108
Status: WEB_CLOSED

## Outcome

v1.108 spaces the visible `↗` cue using `gap: .4rem` from Design Target First link labels on Public, Portal and Ops, making the new-tab affordance clearer in the live UI.

## Design targets used

- Component/state v1.95 shared target
- Public Core/Public Service v1.95 public targets
- Player Portal v1.95 runtime target
- Ops/Admin v1.95 runtime target

No new design image was created because the active targets already cover the affected Base UI/UX Layout link spacing. No stale design was replaced.

## Base UI/UX Layout

The fix updates the shared public and workspace Design Target First link styles rather than adding page-local or app-local spacing overrides.

## Verification

- RED browser/e2e: Public, Portal and Ops design-target links had no computed cue gap.
- Desktop/mobile browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-cue-spacing-v1108.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS, 6/6.
- Dedicated validator: `python3 tools/validate_web_fe_design_target_cue_spacing_v1108.py` PASS.
- Web/Portal/Ops production build: PASS.
- Clean current-state validator: `python3 tools/validate_web_current_state.py` in artifact-filtered temp copy PASS.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains required before real backend integration.
