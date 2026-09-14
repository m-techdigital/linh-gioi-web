# WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88

Status: WEB_CLOSED

## SELECT

The selected v1.88 scope is a public FE trust/onboarding heading-priority slice after v1.87. Browser heading inspection showed `/download/trust`, `/roadmap` and `/community/onboarding` each had release/readiness CTA h2 sections before the page h1.

## SPEC_LOCK

Scope is public web UI only. The selected trust/onboarding routes must expose the page h1 as the first main heading, keep one h1 per page, preserve existing no-download/no-backend/no-forum/no-waitlist boundaries, and keep typography and horizontal overflow caps. No download artifact, entitlement, community backend, waitlist, CMS, DTO, form or mutation surface is added.

## IMPLEMENT

- Moved trust/onboarding CTA sections below the hero/intro section on `/download/trust`, `/roadmap` and `/community/onboarding`.
- Preserved the visible no-download/no-backend/no-community-backend/no-waitlist copy.
- Added `tests/e2e/fe-public-trust-heading-priority-v188.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_trust_heading_priority_v188.py` PASS.
- No independent backend, app API route, fake fetch adapter, download artifact, waitlist, community backend or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-trust-heading-priority-v188.spec.ts --project=chromium-desktop` failed because selected trust/onboarding routes started with CTA h2 headings.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-trust-heading-priority-v188.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/download/trust`, `/roadmap` and `/community/onboarding`. Each route starts main content with exactly one h1, keeps horizontal overflow <= 0 and keeps visible typography within the public route cap.

## HANDOFF

Closed as FE-only v1.88 public trust heading-priority slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.89`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
