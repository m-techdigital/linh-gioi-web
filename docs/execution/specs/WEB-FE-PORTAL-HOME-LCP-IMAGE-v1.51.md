# WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51

Status: WEB_CLOSED.

## Scope

SELECT/SPEC_LOCK chose a bounded FE-only Portal home browser issue from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.51`: the Portal home WORLD_CONCEPT visual was visible in the route composition but still rendered with `loading="lazy"`. The slice updates the existing fixture visual path only, keeping the Portal home page read-only and contract-blocked.

## Implementation

- `apps/portal/src/app/page.tsx` now sets `loading={panel.claim === "WORLD_CONCEPT" ? "eager" : "lazy"}` on Portal home visual images.
- The reviewed WORLD_CONCEPT visual renders with `loading="eager"` because it is the prominent route image and LCP candidate for the page.
- Secondary visual panels remain lazy so the change is limited to the selected visual.
- The test covers keyboard-visible route content through the page heading, image loading, image decode state, font-size caps and horizontal overflow on desktop/mobile.

## Evidence

- RED: `pnpm exec playwright test tests/e2e/fe-portal-home-lcp-image-v151.spec.ts --reporter=line --trace=off || true` failed on desktop/mobile because the Portal home image had `loading="lazy"`.
- GREEN: `pnpm --filter @lgo-web/portal typecheck` passed.
- GREEN: `pnpm exec playwright test tests/e2e/fe-portal-home-lcp-image-v151.spec.ts --reporter=line --trace=off` passed 2/2 after the route change.
- Source validator: `python3 tools/validate_web_fe_portal_home_lcp_image_v151.py` is required at closure.
- Runtime/visual closure also requires Portal production build, browser screenshot review and current-state validator.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
