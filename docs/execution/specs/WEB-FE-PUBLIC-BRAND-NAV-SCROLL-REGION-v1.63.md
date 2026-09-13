# WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63

Status: WEB_CLOSED

## SELECT

The selected v1.63 issue is the public header brand navigation link rail. On mobile the rail is horizontally scrollable, but before this task the scroll container was only a plain `div`, so keyboard users could tab through visible links without a named focusable scroll region for the hidden links.

## SPEC_LOCK

Scope is FE-only. The public header route-link rail must expose a named region, be keyboard focusable, keep visible focus styling, preserve capped nav typography and avoid horizontal page overflow. This task does not add backend calls, forms, DTOs, route handlers or fixture mutations.

## IMPLEMENT

- Updated `apps/web/src/components/PublicNavigation.tsx` so `.lgo-brand-links` renders `role="region"`, `aria-label="Public primary route links"` and `tabIndex={0}`.
- Added `.lgo-brand-links:focus-visible` styling in `apps/web/src/app/globals.css`.
- Kept the mobile public nav font cap at `.84rem` and the existing horizontal rail layout.
- Added `tabIndex={0}` to the shared legacy `SiteNavigation` `.lgo-nav` owner in `packages/ui/src/primitives.tsx` so older public navigation consumers follow the same keyboard-scroll pattern.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_brand_nav_scroll_region_v163.py` PASS.
- `pnpm --filter @lgo-web/ui typecheck` PASS.
- `pnpm --filter @lgo-web/web typecheck` PASS.
- No independent backend, app API route, fetch adapter or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-brand-nav-scroll-region-v163.spec.ts --project=chromium-mobile` failed because `getByRole("region", { name: "Public primary route links" })` did not exist.
- GREEN: same Playwright mobile e2e PASS after implementation for `/classes` and `/download`.
- Additional public navigation regression coverage: `pnpm exec playwright test tests/e2e/fe-public-navigation-interaction-v144.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS.
- Production build: `pnpm --filter @lgo-web/web build` PASS.

## VISUAL_REVIEW

Playwright browser review covered mobile `/classes` and `/download` with keyboard focus on the public route rail. Evidence asserted page overflow <= 0, `overflow-x: auto`, `scrollWidth > clientWidth`, hidden offscreen links for scroll, focus outline present and nav font-size <= 18px. This directly addresses the user's layout/font-size concern for the public header route rail.

## HANDOFF

Closed as FE-only v1.63. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.64`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
