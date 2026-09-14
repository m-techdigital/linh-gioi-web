# LGO-WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-REPORT-v1.159

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159.

Closure tags: Real Browser UI/UX Layout First; Base First; browser/e2e.

The `/guides/beginner-training-loop-guide` page is now a real browser UI/UX layout slice rather than an English placeholder page. The first flow uses Vietnamese scenario content for Cổng Linh, Gate Keeper and Training Stone, then presents four compact training steps before the shared world-loop and route-continuity CTAs.

Base First decision: the route still uses the shared guide-detail shell. The current page consumes the new compact guide-flow base in `packages/ui/src/service-layout.css`, and the page-specific training theme only changes visual treatment and the four-column desktop step grid. No current-page CSS was added to `apps/web/src/app/globals.css`.

Browser/visual review:

- Desktop screenshot: `/tmp/guides-beginner-training-loop-desktop-v1159.png`.
- Mobile screenshot: `/tmp/guides-beginner-training-loop-mobile-v1159.png`.
- Desktop final metrics: h1 48px, hero bottom about 434px, guide detail top about 446px, first guide step about 714px, world-loop CTA about 887px, page height about 2949px, overflow 0.
- Mobile final metrics: h1 about 27.5px, hero bottom about 568px, guide detail top about 578px, first guide step about 741px, world-loop CTA about 1275px, page height about 4422px, body/internal overflow 0.

Verification evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-beginner-training-loop-real-ui-layout-v1159.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2/2 passed.
- `pnpm --filter @lgo-web/web typecheck` → passed.
- `pnpm --filter @lgo-web/ui typecheck` → passed.
- `python3 tools/validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159.py` → passed.
- `pnpm --filter @lgo-web/web build` → passed.
- Clean-copy `python3 /tmp/lgo-web-current-state-v1159/tools/validate_web_current_state.py` → passed.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit. Fixtures are provisional and not canonical backend contracts.
