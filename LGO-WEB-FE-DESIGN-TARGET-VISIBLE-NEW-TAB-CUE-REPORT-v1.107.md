# LGO Web FE Design Target Visible New-Tab Cue Report v1.107

Task: WEB-FE-DESIGN-TARGET-VISIBLE-NEW-TAB-CUE-v1.107
Status: WEB_CLOSED

## Outcome

v1.107 gives every Design Target First new-tab link a visible `↗` cue while preserving the existing accessible name that announces `opens in a new tab`.

## Design targets used

- Component/state v1.95 shared target
- Public Core/Public Service v1.95 public targets
- Player Portal v1.95 runtime target
- Ops/Admin v1.95 runtime target

No new design image was created because the active targets already cover the affected Base UI/UX Layout link affordance. No stale design was replaced.

## Base UI/UX Layout

The fix lives in `packages/ui/src/primitives.tsx`, so public, Portal and Ops inherit the same visual link affordance without app-local duplication.

## Verification

- RED browser/e2e: Public, Portal and Ops design-target links had no `.lgo-design-target-reference-link-cue` visible cue.
- Desktop/mobile browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-visible-new-tab-cue-v1107.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS, 6/6.
- Dedicated validator: `python3 tools/validate_web_fe_design_target_visible_new_tab_cue_v1107.py` PASS.
- UI/Web/Portal/Ops typecheck: PASS.
- Web production build: PASS.
- Portal production build: PASS.
- Ops production build: PASS.
- Clean current-state validator: `python3 tools/validate_web_current_state.py` in artifact-filtered temp copy PASS.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains required before real backend integration.
