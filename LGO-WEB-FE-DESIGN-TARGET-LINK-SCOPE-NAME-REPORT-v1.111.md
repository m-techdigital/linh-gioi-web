# LGO Web FE Design Target Link Scope Name Report v1.111

Task: WEB-FE-DESIGN-TARGET-LINK-SCOPE-NAME-v1.111
Status: WEB_CLOSED

## Outcome

v1.111 improves Design Target First accessible names. Every public, Portal and Ops design-target link now announces the active surface scope along with `opens in a new tab`, including the Component/state companion link.

## Design targets used

- Component/state v1.95 shared target
- Public Core/Public Service v1.95 public targets
- Player Portal v1.95 runtime target
- Ops/Admin v1.95 runtime target

No new design image was created because the active targets already cover this shared Base UI/UX Layout interaction state. No stale design was replaced.

## Base UI/UX Layout

The fix updates shared `DesignTargetReference` in `packages/ui`. Public, Portal and Ops consume the same scoped accessible-name behavior without app-local duplicates.

## Verification

- RED browser/e2e: companion links lacked Public/Portal/Ops scope in their accessible names.
- Desktop/mobile browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-link-scope-name-v1111.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS, 6/6.
- Dedicated validator: `python3 tools/validate_web_fe_design_target_link_scope_name_v1111.py` PASS.
- UI/Web/Portal/Ops typecheck and Web/Portal/Ops production build: PASS.
- Clean current-state validator: `python3 tools/validate_web_current_state.py` in artifact-filtered temp copy PASS.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains required before real backend integration.
