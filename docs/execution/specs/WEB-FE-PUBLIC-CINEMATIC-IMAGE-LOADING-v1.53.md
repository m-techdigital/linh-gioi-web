# WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53

Status: WEB_CLOSED.

## Scope

SELECT/SPEC_LOCK chose a bounded FE-only public web issue from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.53`: `CinematicWorldScene` used Next Image `priority` for the full homepage scene, so the browser did not expose an explicit `loading="eager"` attribute for the reviewed LCP-sensitive world concept image. Browser review also showed compact hero usage on `/game` can be selected as LCP, so every cinematic scene instance should expose explicit eager loading.

## Implementation

- `apps/web/src/components/PublicGameExperienceSections.tsx` now sets `loading="eager"` on the world concept image.
- Homepage and compact route cinematic scenes render with `loading="eager"` for the LCP-sensitive visual.
- The e2e test covers keyboard-visible route headings, explicit eager loading, image decode state, font-size caps and horizontal overflow on desktop/mobile.

## Evidence

- RED: `pnpm exec playwright test tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts --reporter=line --trace=off || true` failed on desktop/mobile because homepage image loading was `null` under the old priority path.
- GREEN: `pnpm --filter @lgo-web/web typecheck` passed.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts --reporter=line --trace=off` passed 4/4 after the component change.
- Source validator: `python3 tools/validate_web_fe_public_cinematic_image_loading_v153.py` is required at closure.
- Runtime/visual closure also requires Web production build, browser screenshot review and current-state validator.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
