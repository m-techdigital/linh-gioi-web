# WEB-FE-GAME-LOOP-REAL-UI-LAYOUT-v1.212

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First and Base First.

Scope: close only `/game/loop` as a Real Browser UI/UX Layout page slice. The page keeps the existing Vietnamese gameplay loop design board as comparison guardrail and focuses implementation on the rendered browser layout.

Implementation:
- Keep hero, design board, gate board and gameplay stage board as the core first-flow.
- Move secondary proof boards into the shared native `lgo-service-disclosure-stack` details pattern.
- Compact the shared game-loop layout in `packages/ui/src/service-layout.css`, including desktop/mobile typography, spacing, card density and stage grid rhythm.
- Keep CSS in the shared UI owner; do not add route CSS to `apps/web/src/app/globals.css`.
- AXIRO was referenced only for code organization judgment: Base components first, page composition second, no copied code.

Evidence:
- RED baseline: old v1.154 e2e failed mobile hero compact at 541.47px > 535px; v1.212 e2e failed before implementation because `.lgo-gameloop-expanded-evidence` was missing.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-game-loop-real-ui-layout-v1212.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots reviewed: `/tmp/game-loop-desktop-v1212.png`, `/tmp/game-loop-mobile-v1212.png`.
- Source validator: `tools/validate_web_fe_game_loop_real_ui_layout_v1212.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
