# HANDOFF-LGO-WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91

Status: WEB_CLOSED.

Task: WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91. Evidence uses browser/e2e desktop and mobile route checks.

Closed scope: FE-only `/community` real plaza screenshot gallery using copied LinhGioiOnline PNG assets.

Changed behavior: `/community` now includes a section titled `Ảnh thật từ Linh Thành community plaza` with two real screenshot cards: NPC preview and target selector. The images are lazy-loaded and constrained to a responsive 4:3 card layout.

Verification required for this handoff:

- `python3 tools/validate_web_fe_public_community_real_plaza_gallery_v191.py`
- `pnpm exec playwright test tests/e2e/fe-public-community-real-plaza-gallery-v191.spec.ts --project=chromium-desktop`
- `pnpm exec playwright test tests/e2e/fe-public-community-real-plaza-gallery-v191.spec.ts --project=chromium-mobile`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- `python3 tools/validate_web_current_state.py`

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.92.
