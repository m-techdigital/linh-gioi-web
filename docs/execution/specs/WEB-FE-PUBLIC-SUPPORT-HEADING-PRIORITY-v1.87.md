# WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87

Status: WEB_CLOSED

## SELECT

The selected v1.87 scope is a public FE support-route accessibility slice after v1.86. Browser heading inspection showed `/support`, `/support/help` and `/support/safety` each had CTA h2 sections before the page h1, so users reached cross-route suggestions before the support/help/safety page topic.

## SPEC_LOCK

Scope is public web UI only. The selected support routes must expose the page h1 as the first main heading, keep one h1 per page, preserve existing support/no-backend/safety boundaries, and keep typography and horizontal overflow caps. No ticket backend, account lookup, moderation backend, live search, DTO, form or mutation surface is added.

## IMPLEMENT

- Moved support CTA sections below the hero/intro section on `/support`, `/support/help` and `/support/safety`.
- Preserved the visible no-ticket/no-account-lookup/no-live-search/no-moderation-backend copy.
- Added `tests/e2e/fe-public-support-heading-priority-v187.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_support_heading_priority_v187.py` PASS.
- No independent backend, app API route, fake fetch adapter, live search, ticket form, moderation/account lookup flow or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-support-heading-priority-v187.spec.ts --project=chromium-desktop` failed because selected support routes started with CTA h2 headings.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-support-heading-priority-v187.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/support`, `/support/help` and `/support/safety`. Each route starts main content with exactly one h1, keeps horizontal overflow <= 0 and keeps visible typography within the public route cap.

## HANDOFF

Closed as FE-only v1.87 public support heading-priority slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.88`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
