# WEB-FE-DESIGN-TARGET-REGION-DESCRIPTION-v1.105

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.105. Design Target First regions had a visible note explaining the comparison target, but the region did not expose that note through `aria-describedby`.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared semantic state behavior, plus the active Public/Portal/Ops page targets. Do not create a new design image because this slice improves semantic linkage without changing visual layout.

## IMPLEMENT

`DesignTargetReference` now generates a stable note id with `useId()`, assigns that id to the visible note paragraph, and connects the region with `aria-describedby` when a note exists. Base UI/UX Layout ownership remains in `packages/ui/src/primitives.tsx`.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_region_description_v1105.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-region-description-v1105.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because Public, Portal and Ops regions had no `aria-describedby`.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

No visual design target changed. The visible note remains in the Design Target First band and is now programmatically associated with the scoped region.

## HANDOFF

Future changes to Design Target First explanatory text should preserve the `aria-describedby` connection so the visible comparison guidance and assistive description stay synchronized.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
