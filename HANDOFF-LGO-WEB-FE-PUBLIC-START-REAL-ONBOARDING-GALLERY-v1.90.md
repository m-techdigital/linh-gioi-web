# HANDOFF-LGO-WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90

Status: WEB_CLOSED.

Task: WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90. Evidence uses browser/e2e desktop and mobile route checks.

Closed scope: FE-only `/start` real onboarding screenshot gallery using copied LinhGioiOnline PNG assets.

Changed behavior: `/start` now includes a section titled `Ảnh thật từ tutorial Đông Môn` with three real screenshot cards: initial spawn, gate focus and dialogue. The images are lazy-loaded and constrained to a responsive 16:9 card layout.

Verification required for this handoff:

- `python3 tools/validate_web_fe_public_start_real_onboarding_gallery_v190.py`
- `pnpm exec playwright test tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts --project=chromium-desktop`
- `pnpm exec playwright test tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts --project=chromium-mobile`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- `python3 tools/validate_web_current_state.py`

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.91.
