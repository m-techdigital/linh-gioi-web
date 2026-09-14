# WEB-FE-DESIGN-TARGET-LINK-SCOPE-NAME-v1.111

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.111. Design Target First companion links announced the target type and new-tab behavior, but did not include the active surface scope in their accessible names.

## SPEC_LOCK

Use the existing v1.95 Component/state design target plus Public Core/Public Service, Player Portal and Ops/Admin targets for Base UI/UX Layout comparison. Do not create a new design image because this slice improves accessible naming for the already-registered shared component state.

## IMPLEMENT

Updated shared `DesignTargetReference` in `packages/ui` so primary and companion target links include the active surface scope in their accessible names: `<label> for <scope> — opens in a new tab`. This keeps visible labels unchanged and avoids app-local link naming.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_link_scope_name_v1111.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-link-scope-name-v1111.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because companion links announced only `Component/state design target — opens in a new tab`.
- GREEN browser/e2e: the same command passed 6/6 after shared scoped accessible names were added.

## VISUAL_REVIEW

Visible UI remains aligned to the v1.95 design targets: link labels, cue, spacing, focus motion and reduced-motion behavior are unchanged. Assistive technology now receives the surface scope directly on every target link.

## HANDOFF

Future companion design-target links should carry both their target type and active surface scope in the accessible name.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
