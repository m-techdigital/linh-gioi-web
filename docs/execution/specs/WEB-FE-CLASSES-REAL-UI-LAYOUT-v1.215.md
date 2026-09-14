# WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First and Base First.

Scope: close only `/classes` as a Real Browser UI/UX Layout page slice. The page keeps the existing Vietnamese Public Classes design target as comparison guardrail and focuses implementation on the rendered browser layout.

Implementation:
- Keep hero and Năm Lộ class grid as the core first-flow.
- Move class identity deck, Võ art board and Năm Lộ philosophy proof into the shared native `lgo-service-disclosure-stack` details pattern.
- Compact the classes overview layout in `packages/ui/src/service-layout.css`, including desktop/mobile typography, hero height, class card density, two-column mobile rhythm and proof disclosure spacing.
- Keep CSS in the shared UI owner; remove stale classes density and Vietnamese-match page-local ownership from `apps/web/src/app/globals.css`.
- AXIRO was referenced only for code organization judgment: Base components first, page composition second, CSS owner clarity and no copied code.

Evidence:
- RED baseline: browser metrics showed mobile scrollHeight 8455px and desktop scrollHeight 4317px because identity, art and philosophy proof all rendered expanded in the main flow.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-classes-design-target-density-v1122.spec.ts tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts tests/e2e/fe-public-class-art-loading-v154.spec.ts tests/e2e/fe-public-class-art-typography-v155.spec.ts tests/e2e/fe-classes-real-ui-layout-v1215.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots reviewed: `/tmp/classes-desktop-v1215.png`, `/tmp/classes-mobile-v1215.png`.
- Source validator: `tools/validate_web_fe_classes_real_ui_layout_v1215.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
