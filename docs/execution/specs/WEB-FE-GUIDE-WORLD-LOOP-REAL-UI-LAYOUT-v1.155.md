# WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155

Status: WEB_CLOSED.

## Scope

Selected page: `/guides/world-gameplay-loop-guide` only. This slice used Real Browser UI/UX Layout First with the existing public guide/detail target as the comparison guardrail. No other page was implemented.

## Requirements

- Start the guide detail page with the actual guide H1 and guide steps before generic CTAs.
- Keep first-flow Vietnamese and aligned with the Linh Giới world-loop scenario.
- Prioritize rendered browser layout: hero order, guide-step density, typography scale, responsive behavior and overflow.
- Apply Base First before route-local styling. Reusable detail-page layout belongs in `packages/ui/src/service-layout.css`.
- Do not claim production auth, database persistence, live wiki, support tickets, quest database, account progression or accepted backend contracts.

## Evidence

- browser/e2e: `tests/e2e/fe-guide-world-loop-real-ui-layout-v1155.spec.ts` desktop/mobile.
- Visual review screenshots: `/tmp/guide-world-loop-desktop-v1155.png`, `/tmp/guide-world-loop-mobile-v1155.png`.
- Source validator: `tools/validate_web_fe_guide_world_loop_real_ui_layout_v1155.py`.
- Build/type gates: Web/content/UI typecheck, Web production build and current-state validator.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
