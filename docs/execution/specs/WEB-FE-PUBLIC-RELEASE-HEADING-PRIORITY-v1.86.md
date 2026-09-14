# WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86

Status: WEB_CLOSED

## SELECT

The selected v1.86 scope is a public FE release-route accessibility slice after v1.85. Browser heading inspection showed `/release`, `/release/readiness` and `/release/tester-pack` each had CTA h2 sections before the page h1, so screen-reader and keyboard users reached cross-route suggestions before the release page topic.

## SPEC_LOCK

Scope is public web UI only. The selected release routes must expose the page h1 as the first main heading, keep one h1 per page, preserve existing release/non-claim copy, and keep typography and horizontal overflow caps. No backend, entitlement, tester intake, ticketing, CMS, release artifact, DTO, form or mutation surface is added.

## IMPLEMENT

- Moved `ContentIaStartCta`, `FaqHelpfulnessCta` and `RouteContinuityCta` after the hero/intro section on `/release` and `/release/readiness`.
- Reflowed `/release/tester-pack` JSX so the closed-tester h1 appears before CTA sections while preserving the same content, art and non-claims.
- Added `tests/e2e/fe-public-release-heading-priority-v186.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_release_heading_priority_v186.py` PASS.
- No independent backend, app API route, fake fetch adapter, tester intake form, entitlement flow or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-release-heading-priority-v186.spec.ts --project=chromium-desktop` failed because selected release routes started with CTA h2 headings.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-release-heading-priority-v186.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/release`, `/release/readiness` and `/release/tester-pack`. Each route starts main content with exactly one h1, keeps horizontal overflow <= 0 and keeps visible typography within the public route cap.

## HANDOFF

Closed as FE-only v1.86 public release heading-priority slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.87`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
