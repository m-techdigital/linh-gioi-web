# LGO-WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-REPORT-v1.161

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161.

Closure tags: Real Browser UI/UX Layout First; Base First; browser/e2e.

The `/guides/support-and-community-guide` page is now a real browser UI/UX layout slice rather than an English placeholder page. The first flow uses Vietnamese safe-feedback content for FAQ, feedback, community updates and support boundaries, then presents four compact steps before the shared world-loop and route-continuity CTAs.

Base First decision: the route still uses the shared guide-detail shell and compact guide-flow base in `packages/ui/src/service-layout.css`. The current page only adds a support/community theme in the shared UI stylesheet. No current-page CSS was added to `apps/web/src/app/globals.css`.

Browser/visual review:

- Desktop screenshot: `/tmp/guides-support-community-desktop-v1161.png`.
- Mobile screenshot: `/tmp/guides-support-community-mobile-v1161.png`.
- Desktop final metrics: h1 48px, hero bottom about 479px, guide detail top about 492px, first guide step about 759px, world-loop CTA about 932px, page height about 2994px, overflow 0.
- Mobile final metrics: h1 about 27.5px, hero bottom about 594px, guide detail top about 604px, first guide step about 767px, world-loop CTA about 1287px, page height about 4435px, body/internal overflow 0.

Verification evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-support-community-real-ui-layout-v1161.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2/2 passed.
- `pnpm --filter @lgo-web/web typecheck` → passed.
- `pnpm --filter @lgo-web/ui typecheck` → passed.
- `python3 tools/validate_web_fe_guides_support_community_real_ui_layout_v1161.py` → passed.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit. Fixtures are provisional and not canonical backend contracts.
