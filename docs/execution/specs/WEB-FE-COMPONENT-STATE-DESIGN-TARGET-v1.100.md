# WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.100. Public, Portal and Ops have page-level design target links, but shared components and states also need a direct design target because Base UI/UX Layout must stay synchronized across surfaces.

## SPEC_LOCK

Use the existing Component/state atlas from v1.95. Do not create a new design image. Add a companion Component/state design target link to every visible Design Target First region, and mirror the component atlas into Portal/Ops runtimes so links resolve from each app.

## IMPLEMENT

Added `companionTargets` support to shared `DesignTargetReference`, added companion styling for public and workspace shells, linked Component/state from public, Portal and Ops, and mirrored the component atlas into Portal/Ops public assets.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_component_state_design_target_v1100.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-component-state-design-target-v1100.spec.ts --project=chromium-desktop` failed because no surface exposed `Component/state design target`.
- GREEN desktop: `pnpm exec playwright test tests/e2e/fe-component-state-design-target-v1100.spec.ts --project=chromium-desktop` passed 3/3.
- GREEN mobile: `pnpm exec playwright test tests/e2e/fe-component-state-design-target-v1100.spec.ts --project=chromium-mobile` passed 3/3.

## VISUAL_REVIEW

The companion link uses the existing Design Target First band, with a secondary gold/cyan treatment that matches the v1.95 component/state atlas language and stays responsive on mobile.

## HANDOFF

Future shared UI work should open the Component/state design target from any surface before modifying shared navigation, buttons, cards, forms, tables, alerts, states, typography or spacing.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
