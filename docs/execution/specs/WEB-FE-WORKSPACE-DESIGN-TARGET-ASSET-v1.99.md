# WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.99. v1.98 added workspace Design Target First links, but the Portal and Ops app runtimes did not yet serve the linked PNGs from their own origins.

## SPEC_LOCK

Keep the v1.95 atlas images as the design targets. Do not create new design images because the registry already covers Player Portal and Ops/Admin. Add runtime mirror copies so the links in Portal and Ops open successfully during browser review.

## IMPLEMENT

Mirrored the registered PNG targets:

- Player Portal runtime mirror: `apps/portal/public/design-reference/design-atlas-portal-v195.png`
- Ops/Admin runtime mirror: `apps/ops/public/design-reference/design-atlas-ops-v195.png`

The mirrors byte-match the canonical files under `apps/web/public/design-reference`.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_workspace_design_target_asset_v199.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-asset-v199.spec.ts --project=chromium-desktop` failed with 404 for both Portal and Ops design target links.
- GREEN desktop: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-asset-v199.spec.ts --project=chromium-desktop` passed 2/2.
- GREEN mobile: `pnpm exec playwright test tests/e2e/fe-workspace-design-target-asset-v199.spec.ts --project=chromium-mobile` passed 2/2.

## VISUAL_REVIEW

The design target links now resolve to the same 1672x941 high-fidelity atlas images from each workspace runtime, so reviewers can open the target directly from the app they are auditing.

## HANDOFF

Future Portal/Ops UI work can rely on the runtime design-target link, not only the docs registry. If a workspace design changes, replace the canonical target and its runtime mirror together.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
