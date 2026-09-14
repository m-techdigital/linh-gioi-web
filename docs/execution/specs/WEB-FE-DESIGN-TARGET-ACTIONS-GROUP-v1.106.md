# WEB-FE-DESIGN-TARGET-ACTIONS-GROUP-v1.106

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.106. Design Target First action links were visually grouped, but the action wrapper was a plain `div` without a named group for assistive navigation.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared action/link grouping and the active page/workspace targets for surface scope. Do not create a new design image because this slice improves semantics without changing visual layout.

## IMPLEMENT

`DesignTargetReference` action wrapper now uses `role="group"` and `aria-label={`Design targets — ${scope}`}`. Base UI/UX Layout ownership remains in `packages/ui/src/primitives.tsx`.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_actions_group_v1106.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-actions-group-v1106.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because Public, Portal and Ops had no named action group.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

No visual design target changed. The action links retain their existing responsive layout while the group is now named for keyboard and assistive workflows.

## HANDOFF

Future Design Target First action changes should preserve the named group wrapper so primary and companion design links remain discoverable as one action set.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
