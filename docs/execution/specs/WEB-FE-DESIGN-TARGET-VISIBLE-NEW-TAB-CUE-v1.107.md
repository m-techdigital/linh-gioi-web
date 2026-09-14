# WEB-FE-DESIGN-TARGET-VISIBLE-NEW-TAB-CUE-v1.107

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.107. Design Target First links open in a new tab and announce that in their accessible name, but the visible UI did not show a matching new-tab cue.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared link state behavior. Do not create a new design image because this slice adds a small visible affordance to the registered shared component pattern.

## IMPLEMENT

`DesignTargetReference` now renders a visible `↗` cue inside primary and companion design-target links. The cue is `aria-hidden` because the accessible link name already announces `opens in a new tab`. Base UI/UX Layout ownership remains in `packages/ui/src/primitives.tsx`.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_visible_new_tab_cue_v1107.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-visible-new-tab-cue-v1107.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because Public, Portal and Ops links had no visible cue.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

The visible cue adds a compact external-link signal without changing the Design Target First band structure, target assets, focus motion or responsive action grouping.

## HANDOFF

Future Design Target First new-tab links should preserve both signals: visible `↗` cue for sighted users and accessible `opens in a new tab` label for assistive technology.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
