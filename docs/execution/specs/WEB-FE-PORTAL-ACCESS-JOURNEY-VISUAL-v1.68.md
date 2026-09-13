# WEB-FE-PORTAL-ACCESS-JOURNEY-VISUAL-v1.68

Status: WEB_CLOSED

## SELECT

The selected v1.68 scope is a Portal FE real-image and interaction slice after v1.67. Browser audit showed Portal `/login`, `/register` and `/recovery` had no real image even though the Portal app already ships approved game-art assets. Since all three routes share `AccessJourney`, the fix belongs in that shared Portal composition rather than duplicated route-local markup.

## SPEC_LOCK

Scope is Portal UI only. `AccessJourney` must render real game-art, expose a meaningful accessible image name, preserve keyboard navigation among access links, keep mobile overflow at zero, keep typography capped, and keep the blocked Auth/DB/API contract copy explicit. No backend, DTO, API route, credential handling, form enablement, or production auth claim is added.

## IMPLEMENT

- Updated `apps/portal/src/components/AccessJourney.tsx` to render a real `/game-art/world/dong-mon-skyline.webp` visual with alt `Portal access gate art`.
- Added a caption that identifies the Đông Môn access gate and repeats that login remains blocked until Auth/DB/API contract acceptance.
- Added responsive `.lgo-access-journey` and `.lgo-access-journey-visual` CSS in `apps/portal/src/app/globals.css`.
- Added `tests/e2e/fe-portal-access-journey-visual-v168.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_portal_access_journey_visual_v168.py` PASS.
- The visual reuses an existing Portal public game-art asset; no Unity build output, generated client artifact or backend contract was copied.
- No independent backend, app API route, fake fetch adapter or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-portal-access-journey-visual-v168.spec.ts --project=chromium-mobile` failed because image `Portal access gate art` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-portal-access-journey-visual-v168.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Portal typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect the rendered Portal `/login` page. The real game-art image loads with non-zero natural dimensions, uses eager loading for the access visual, keeps horizontal overflow <= 0, keeps visible typography within the Portal cap, and verifies keyboard focus on the recovery link.

## HANDOFF

Closed as FE-only v1.68 Portal access journey visual slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.69`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
