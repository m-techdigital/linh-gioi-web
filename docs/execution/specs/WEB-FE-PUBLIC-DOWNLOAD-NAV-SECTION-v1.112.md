# WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112

Status: WEB_CLOSED

Design Target First: existing v1.95 targets are attached before implementation..

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.112. The public nav CTA `Trạng thái chơi` correctly marked `/download` as current, but lost current state on `/download/trust`, even though that route remains in the same download/service section.

## SPEC_LOCK

Use the existing v1.95 Public Service design target for `/download/trust` and the shared public navigation pattern already covered by prior navigation audits. Do not create a new design image because this slice aligns route state with an existing registered public service navigation layout.

## IMPLEMENT

Changed the public `Trạng thái chơi` CTA from exact current matching to section matching by using `RouteAwareLink currentWhen="section"`. The shared `RouteAwareLink` already supports section matching, so no new shared API or page-local duplicate was needed.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_public_download_nav_section_v1112.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-public-download-nav-section-v1112.spec.ts --project=chromium-desktop --project=chromium-mobile` failed 2/2 because `/download/trust` did not set `aria-current="page"` on `Trạng thái chơi`.
- GREEN browser/e2e: the same command passed 2/2 after the CTA used section current matching. The first GREEN run required stopping a reused stale Next dev server because Playwright config allows existing server reuse.

## VISUAL_REVIEW

The visible nav highlight now remains active for the Public Service download/trust section. This keeps the browser UI aligned to the v1.95 Public Service target without changing typography, spacing or content.

## HANDOFF

Future public nav CTAs that represent a route family should use section current matching so nested routes retain orientation.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.


Base UI/UX Layout: shared route-state behavior is reused without a duplicate local implementation.
