# WEB-FE-GAME-REAL-UI-LAYOUT-v1.213

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First and Base First.

Scope: close only `/game` as a Real Browser UI/UX Layout page slice. The page keeps the existing Vietnamese world atlas design board as comparison guardrail and focuses implementation on the rendered browser layout.

Implementation:
- Keep hero, game world design board, route journey and world atlas stories as the core first-flow.
- Move secondary world proof into the shared native `lgo-service-disclosure-stack` details pattern.
- Compact the game overview layout in `packages/ui/src/service-layout.css`, including desktop/mobile typography, spacing, target board density, route grid and atlas rhythm.
- Keep CSS in the shared UI owner; do not add route CSS to `apps/web/src/app/globals.css`.
- AXIRO was referenced only for code organization judgment: Base components first, page composition second, CSS owner clarity and no copied code.

Evidence:
- RED baseline: existing `/game` e2e exposed the missing `Game world atlas hub board` image and first-flow density failures on desktop/mobile.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-game-world-design-target-density-v1120.spec.ts tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts tests/e2e/fe-public-game-world-design-board-v183.spec.ts tests/e2e/fe-game-real-ui-layout-v1213.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots reviewed: `/tmp/game-desktop-v1213.png`, `/tmp/game-mobile-v1213.png`.
- Source validator: `tools/validate_web_fe_game_real_ui_layout_v1213.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
