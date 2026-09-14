# LGO-WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-REPORT-v1.158

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158.

Closure tags: Real Browser UI/UX Layout First; browser/e2e.

The `/guides/gate-entry-guide` page is now a real browser UI/UX layout slice rather than an English placeholder page. The first flow uses Vietnamese game-scenario content for Cổng Linh, Người Giữ Cổng and Đá Luyện, then presents three compact guide steps before the shared world-loop and route-continuity CTAs.

Base First decision: the route still uses the shared guide-detail shell. Gate Entry specific composition is attached through slug classes, while the actual hero density, guide-step grid, CTA rhythm and mobile button compression live in `packages/ui/src/service-layout.css`. No Gate Entry CSS was added to `apps/web/src/app/globals.css`. The only globals change is the existing app-shell mobile brand link wrap, because browser metrics found visible nav overflow on this page and the shell is currently owned there.

Browser/visual review:

- Desktop screenshot: `/tmp/guides-gate-entry-desktop-v1158.png`.
- Mobile screenshot: `/tmp/guides-gate-entry-mobile-v1158.png`.
- Desktop final metrics: h1 48px, hero bottom about 434px, guide detail top about 447px, first guide step about 729px, world-loop CTA about 887px, page height about 2961px, overflow 0.
- Mobile final metrics: h1 about 27.5px, hero bottom about 568px after compact shell, guide detail top about 578px, first guide step about 741px, world-loop CTA about 1138px, page height about 4350px, body/internal overflow 0.

Verification evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-gate-entry-real-ui-layout-v1158.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2/2 passed.
- `pnpm --filter @lgo-web/web typecheck` → passed.
- `pnpm --filter @lgo-web/ui typecheck` → passed.
- `python3 tools/validate_web_fe_guides_gate_entry_real_ui_layout_v1158.py` → passed.
- `pnpm --filter @lgo-web/web build` → passed.
- Clean-copy `python3 /tmp/lgo-web-current-state-v1158/tools/validate_web_current_state.py` → passed.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit. Fixtures are provisional and not canonical backend contracts.
