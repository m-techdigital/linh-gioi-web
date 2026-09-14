# WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85

Status: WEB_CLOSED

## SELECT

The selected v1.85 scope is a public FE accessibility and layout slice after v1.84. Browser heading inspection showed `/events`, `/patch-notes`, `/news` and `/status` did not start main content with a page-level h1. The bare content routes used `SectionHeading`, which renders h2, and `/status` rendered multiple CTA h2 sections before the status page heading.

## SPEC_LOCK

Scope is public web UI only. The selected routes must expose exactly one visible page h1 as the first main heading, keep the existing fixture/backend boundaries explicit, preserve horizontal overflow and typography caps, and avoid backend/CMS claims. No CMS, backend route, status monitoring integration, event calendar API, news API, patch-notes API, DTO, form or mutation surface is added.

## IMPLEMENT

- Added shared `PageHeader` usage to `/events`, `/patch-notes`, `/news` and `/status`.
- Kept fixture-only copy visible through page header eyebrow/description and route section text.
- Moved `/status` page h1 before trust/CTA sections so the heading outline starts with the page topic.
- Added `tests/e2e/fe-public-content-heading-order-v185.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_content_heading_order_v185.py` PASS.
- The slice reuses `packages/ui` `PageHeader`; no duplicate app-local heading primitive was created.
- No independent backend, app API route, fake fetch adapter, CMS integration or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-content-heading-order-v185.spec.ts --project=chromium-desktop` failed because the selected routes had no visible page h1 as the first main heading.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-content-heading-order-v185.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/events`, `/patch-notes`, `/news` and `/status`. Each route starts main content with exactly one h1, keeps horizontal overflow <= 0 and keeps visible typography within the public route cap.

## HANDOFF

Closed as FE-only v1.85 public content heading-order slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.86`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
