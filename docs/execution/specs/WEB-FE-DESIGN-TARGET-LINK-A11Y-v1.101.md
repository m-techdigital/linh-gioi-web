# WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.101. Public, Portal and Ops now expose Design Target First links, but those links open new tabs without telling assistive technology users that the target opens separately.

## SPEC_LOCK

Use the existing v1.95 design targets registered for Public Core, Public Service, Player Portal, Ops/Admin and Component/state. Do not create a new design image because this slice changes the shared design-target link affordance rather than the visual destination. Keep the behavior in shared Base UI/UX Layout so all surfaces announce the same interaction.

## IMPLEMENT

`DesignTargetReference` now adds an accessible name suffix, `opens in a new tab`, to both the primary design target link and companion Component/state target links while preserving the visible label and current `_blank` comparison workflow.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_link_a11y_v1101.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-link-a11y-v1101.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because public, Portal and Ops design target links did not expose `opens in a new tab` in their accessible names.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

The visible Design Target First band remains aligned with the registered v1.95 atlas references. The accessibility copy is carried in the link accessible name, so the public/workspace layout, typography and companion-link visual rhythm are unchanged while keyboard and screen-reader users receive the missing interaction cue.

## HANDOFF

Future Design Target First links that open comparison assets in a new tab must use the shared `DesignTargetReference` path or provide the same accessible-name behavior before implementation.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
