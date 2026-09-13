# WEB-FE-PORTAL-JOURNEY-LCP-IMAGE-v1.52

Status: WEB_CLOSED.

## Scope

SELECT/SPEC_LOCK chose a bounded FE-only Portal journey issue from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.52`: the Portal `/journey` visual row used a mixed priority/lazy path, and browser review showed above-fold art could be selected as LCP without explicit `loading="eager"` on every reviewed art image. The slice updates the existing fixture visual path only and keeps the page read-only.

## Implementation

- `apps/portal/src/app/journey/page.tsx` now sets `loading="eager"` on the journey art panel images because the full row is above the fold on desktop.
- The above-fold art row renders with `loading="eager"` so browser LCP selection stays explicit across desktop and mobile.
- - The e2e test covers keyboard-visible route content through the page heading, image loading, image decode state, art panel count, font-size caps and horizontal overflow on desktop/mobile.

## Evidence

- RED: `pnpm exec playwright test tests/e2e/fe-portal-journey-lcp-image-v152.spec.ts --reporter=line --trace=off || true` failed on desktop/mobile because the WORLD_CONCEPT image had no `loading` attribute from the old priority path, then the expanded RED reproduced lazy loading on development-art images after a browser LCP warning.
- GREEN: `pnpm --filter @lgo-web/portal typecheck` passed.
- GREEN: `pnpm exec playwright test tests/e2e/fe-portal-journey-lcp-image-v152.spec.ts --reporter=line --trace=off` passed 2/2 after the route change.
- Source validator: `python3 tools/validate_web_fe_portal_journey_lcp_image_v152.py` is required at closure.
- Runtime/visual closure also requires Portal production build, browser screenshot review and current-state validator.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
