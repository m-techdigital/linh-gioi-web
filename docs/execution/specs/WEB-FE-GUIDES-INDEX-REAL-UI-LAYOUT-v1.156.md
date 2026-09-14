# WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156

Status: WEB_CLOSED.

## Scope

Selected page: `/guides` only. This slice used Real Browser UI/UX Layout First with the existing public guide/index direction as the comparison guardrail. No design batch was created and no other page was implemented.

## Requirements

- Make `/guides` a usable Vietnamese guide index, not a long raw content list.
- Keep the first flow aligned with the Linh Giới player scenario: world loop first, release trust after the player understands the current game boundary.
- Prioritize rendered browser layout: compact hero, visual hierarchy, first-fold density, card grid scanning, mobile behavior, keyboard focus and overflow.
- Apply Base First before route-local styling. Reusable guide index layout belongs in `packages/ui/src/service-layout.css`.
- Do not claim production auth, database persistence, live wiki, support tickets, quest database, account progression or accepted backend contracts.

## Evidence

- browser/e2e: `tests/e2e/fe-guides-index-real-ui-layout-v1156.spec.ts` desktop/mobile.
- Visual review screenshots: `/tmp/guides-index-desktop-v1156.png`, `/tmp/guides-index-mobile-v1156.png`.
- Source validator: `tools/validate_web_fe_guides_index_real_ui_layout_v1156.py`.
- Build/type gates: Web/UI typecheck, Web production build and current-state validator.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
