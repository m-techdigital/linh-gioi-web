# LGO Web FE Design Target Link Rel Report v1.103

Task: WEB-FE-DESIGN-TARGET-LINK-REL-v1.103
Status: WEB_CLOSED

## Outcome

v1.103 makes Design Target First new-tab links explicit and consistent: primary and Component/state companion links now use `rel="noopener noreferrer"` across Public, Portal and Ops.

## Design targets used

- Component/state: `apps/web/public/design-reference/design-atlas-components-v195.png`
- Public Core/Public Service, Player Portal and Ops/Admin v1.95 targets remain the active visual comparison surfaces.

No new design image was created because the active targets already cover the affected Base UI/UX Layout link behavior. No stale design was replaced.

## Base UI/UX Layout

The fix lives in `packages/ui/src/primitives.tsx`, so every surface using `DesignTargetReference` inherits the same safe new-tab contract without app-local duplication.

## Verification

- RED browser/e2e: Public, Portal and Ops design target links had `rel="noreferrer"` and failed the explicit `noopener` check.
- Desktop/mobile browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-link-rel-v1103.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS, 6/6.
- Dedicated validator: `python3 tools/validate_web_fe_design_target_link_rel_v1103.py` PASS.
- UI/Web/Portal/Ops typecheck: PASS.
- Web production build: PASS.
- Portal production build: PASS.
- Ops production build: PASS.
- Clean current-state validator: `python3 tools/validate_web_current_state.py` in artifact-filtered temp copy PASS.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains required before real backend integration.
