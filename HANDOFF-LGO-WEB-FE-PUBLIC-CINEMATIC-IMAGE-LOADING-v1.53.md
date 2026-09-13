# HANDOFF-LGO-WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53

Status: WEB_CLOSED.

## Handoff summary

WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53 updates the public LCP-sensitive `CinematicWorldScene` so the homepage cinematic world concept image is explicit `loading="eager"` across both full and compact route hero variants. The change keeps existing public content and game-art ownership, and does not add fetches, forms or write actions.

## Verification evidence

- RED e2e: `pnpm exec playwright test tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts --reporter=line --trace=off || true` failed because homepage full cinematic image lacked `loading="eager"`.
- Web typecheck: `pnpm --filter @lgo-web/web typecheck`.
- Web build: `pnpm --filter @lgo-web/web build`.
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts --reporter=line --trace=off`.
- Source validators: `python3 tools/validate_web_fe_public_cinematic_image_loading_v153.py` and `python3 tools/validate_web_current_state.py`.
- Visual review: public homepage and `/game` desktop/mobile screenshot review confirms the cinematic image is visible, full and compact scenes are eager, font sizes remain capped and horizontal overflow stays absent.
- keyboard note: route content remains reachable through the public shell and e2e validates visible semantic route content before image assertions.

## Next allowed step

Continue FE/browser work with `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.54`.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
