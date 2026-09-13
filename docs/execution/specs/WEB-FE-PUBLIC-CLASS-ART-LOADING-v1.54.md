# WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54

Status: WEB_CLOSED.

## Scope

SELECT/SPEC_LOCK chose a bounded FE-only public `/classes` issue from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.54`: the ClassArtSpotlight starter art board relied on Next Image default lazy behavior instead of explicit source intent. Both class art boards are large visual boards that browser review can report as LCP-sensitive and should be explicit `loading="eager"` while keeping the page static and read-only.

## Implementation

- `apps/web/src/components/PublicGameExperienceSections.tsx` now sets `loading="eager"` on both ClassArtSpotlight images.
- The existing skill/VFX board already used eager loading; the starter modular gear board now matches it explicitly.
- The keyboard-aware e2e test scrolls to the class art section, waits for lazy images to decode, then checks loading intent, image dimensions, font-size caps and horizontal overflow.

## Evidence

- RED: `python3 tools/validate_web_fe_public_class_art_loading_v154.py || true` failed because ClassArtSpotlight did not explicitly lazy-load both art board images.
- Runtime guard: initial e2e showed lazy images need decode wait after scroll; test was adjusted to wait for browser image completion after the section enters viewport.
- GREEN: `pnpm --filter @lgo-web/web typecheck` passed.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-class-art-loading-v154.spec.ts --reporter=line --trace=off` passed 2/2 after the component change.
- Source validator: `python3 tools/validate_web_fe_public_class_art_loading_v154.py` is required at closure.
- Runtime/visual closure also requires Web production build, browser screenshot review and current-state validator.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
