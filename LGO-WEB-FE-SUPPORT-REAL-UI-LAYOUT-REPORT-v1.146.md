# LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.146

Task: WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146.

Status: WEB_CLOSED.

`/support` was closed as a Real Browser UI/UX Layout First page slice. The existing support design target was already Vietnamese and scenario-correct, so no new target was generated. The page now uses shared Base First service layout classes from `packages/ui/src/service-layout.css` instead of retaining a page-specific v1.131 density block in `apps/web/src/app/globals.css`.

Browser review after the fix recorded desktop 1280×720 metrics: overflow 0, h1 34.816px, hero bottom 363.094px, board top 358.453px, board bottom 550.203px, support topic board top 584.75px, topic board bottom 852.219px, FAQ top 870.766px and safety CTA top 1281.359px. Mobile 390×844 recorded overflow 0, h1 46.8px, hero bottom 497.453px, board top 505.453px, board bottom 802.531px, support topic board top 833.719px, FAQ top 1330.063px and safety CTA top 2162.406px.

The main RED finding was not target quality; it was rendered mobile layout quality. Before the fix, mobile board bottom was 1949.375px and FAQ top was 2558.531px because the support target image rendered too tall. The shared support station layout now caps the support board image, compacts the hero note, uses shared proof cards and keeps first-flow FAQ discoverable.

Evidence completed:

- `python3 tools/validate_web_fe_support_real_ui_layout_v1146.py`
- `python3 tools/validate_web_fe_support_design_target_density_v1131.py`
- Playwright desktop/mobile support layout checks
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- clean-copy current-state validator

Non-claims remain: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.

Evidence keywords: browser/e2e, screenshot.
