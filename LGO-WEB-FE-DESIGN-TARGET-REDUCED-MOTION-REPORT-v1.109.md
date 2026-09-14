# LGO Web FE Design Target Reduced Motion Report v1.109

Task: WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109
Status: WEB_CLOSED

## Outcome

v1.109 makes Design Target First focus motion respect `prefers-reduced-motion`. Public, Portal and Ops keep focus outlines but disable lift and transition for reduced-motion users.

## Design targets used

- Component/state v1.95 shared target
- Public Core/Public Service v1.95 public targets
- Player Portal v1.95 runtime target
- Ops/Admin v1.95 runtime target

No new design image was created because the active targets already cover the affected Base UI/UX Layout interaction state. No stale design was replaced.

## Base UI/UX Layout

The fix updates shared public and workspace Design Target First interaction styles rather than page-local or app-local overrides.

## Verification

- RED browser/e2e: reduced-motion focus still returned a transform and transition.
- Desktop/mobile browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-reduced-motion-v1109.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS, 6/6.
- Dedicated validator: `python3 tools/validate_web_fe_design_target_reduced_motion_v1109.py` PASS.
- Web/Portal/Ops production build: PASS.
- Clean current-state validator: `python3 tools/validate_web_current_state.py` in artifact-filtered temp copy PASS.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains required before real backend integration.
