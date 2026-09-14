# WEB-FE-STORY-REAL-UI-LAYOUT-v1.214

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First and Base First.

Scope: close only `/story` as a Real Browser UI/UX Layout page slice. The page keeps the existing Vietnamese Public Story design target as comparison guardrail and focuses implementation on the rendered browser layout.

Implementation:
- Keep hero and opening chapter cards as the core first-flow.
- Move detailed timeline, Đông Môn concept proof and Âm Giới event proof into the shared native `lgo-service-disclosure-stack` details pattern.
- Compact the story overview layout in `packages/ui/src/service-layout.css`, including desktop/mobile typography, hero height, chapter card density and proof disclosure rhythm.
- Keep CSS in the shared UI owner; remove story fracture board and story hero ownership from `apps/web/src/app/globals.css`.
- AXIRO was referenced only for code organization judgment: Base components first, page composition second, CSS owner clarity and no copied code.

Evidence:
- RED baseline: browser metrics showed mobile hero 951.56px, chapters top 1145.75px, timeline height 2432.28px and mobile scrollHeight 7563px.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-story-design-target-density-v1121.spec.ts tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts tests/e2e/fe-public-story-chapter-typography-v164.spec.ts tests/e2e/fe-story-real-ui-layout-v1214.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots reviewed: `/tmp/story-desktop-v1214.png`, `/tmp/story-mobile-v1214.png`.
- Source validator: `tools/validate_web_fe_story_real_ui_layout_v1214.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
