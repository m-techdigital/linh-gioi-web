# WEB-FE-DESIGN-TARGET-LINK-REL-v1.103

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.103. Design Target First links open comparison assets in a new tab and announce that behavior, but the shared link rel only included `noreferrer`.

## SPEC_LOCK

Use the existing v1.95 Component/state design target for shared link state behavior. Do not create a new design image because this slice improves the shared link contract and does not alter the visual target.

## IMPLEMENT

Base UI/UX Layout ownership stays in `packages/ui/src/primitives.tsx`; no app-local link component is added.

`DesignTargetReference` now uses `rel="noopener noreferrer"` for primary and companion design target links while preserving `_blank`, accessible names and visible labels.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_design_target_link_rel_v1103.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-design-target-link-rel-v1103.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 6/6 because Public, Portal and Ops links did not include `noopener`.
- GREEN browser/e2e: the same command passed 6/6 after the shared primitive update.

## VISUAL_REVIEW

No visual design target changed. The existing Design Target First band remains aligned with v1.95, and the change improves the browser interaction contract without layout or typography drift.

## HANDOFF

Future `_blank` design/reference links should use the shared `DesignTargetReference` path or explicitly include `noopener noreferrer` with an accessible new-tab name.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
