# WEB-FE-PUBLIC-DESIGN-TARGET-ATTACHMENT-v1.97

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is the FE accessibility/interaction audit v1.97. Following the new Design Target First rule, this slice makes public routes expose their registered design target at runtime so implementation work can compare pages against the v1.95 atlas before changing UI.

## SPEC_LOCK

Use existing registered design targets rather than creating new designs:

- Public Core uses `apps/web/public/design-reference/design-atlas-public-core-v195.png`.
- Public Service uses `apps/web/public/design-reference/design-atlas-public-service-v195.png`.

Add a reusable Base UI/UX Layout component in `packages/ui` and let the public app map routes to the correct target. No backend, CMS, account, ticket or mutation behavior is introduced.

## IMPLEMENT

Added shared `DesignTargetReference` to `packages/ui`. Added `apps/web/src/components/PublicDesignTargetReference.tsx` to map the current public route to Public Core or Public Service, then rendered it from `PublicSiteShell`. Added public CSS for the comparison band.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_public_design_target_attachment_v197.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-public-design-target-attachment-v197.spec.ts --project=chromium-desktop` failed because the region did not exist.
- GREEN desktop: `pnpm exec playwright test tests/e2e/fe-public-design-target-attachment-v197.spec.ts --project=chromium-desktop` passed 2/2.
- GREEN mobile: `pnpm exec playwright test tests/e2e/fe-public-design-target-attachment-v197.spec.ts --project=chromium-mobile` passed 2/2.

## VISUAL_REVIEW

The runtime band is intentionally compact and uses the Component/state atlas language: gold label, dark glass panel, cyan bordered action and mobile one-column behavior. It links directly to the active design target for comparison.

## HANDOFF

Future public page UI work can now cite the in-page Design Target First region as runtime evidence that the page is attached to its atlas. Next task continues accessibility/interaction audit as v1.98.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
