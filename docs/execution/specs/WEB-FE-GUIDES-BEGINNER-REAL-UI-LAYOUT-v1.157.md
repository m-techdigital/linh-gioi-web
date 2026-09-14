# WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157

Status: WEB_CLOSED.

## Scope

Selected page: `/guides/beginner` only. This slice used Real Browser UI/UX Layout First with the existing beginner-guide direction as the comparison guardrail. No design batch was created and no other page was implemented.

## Requirements

- Make `/guides/beginner` a compact Vietnamese beginner path, not a long v1.8 raw information dump.
- Keep first-flow aligned with the Linh Giới scenario: Cổng Linh, Người Giữ Cổng, Đá Luyện, tải game trust and backend boundary.
- Prioritize rendered browser layout: compact hero, first-fold story cards, guide-step density, mobile two-column scanning, focus navigation and no overflow.
- Apply Base First before route-local styling. Reusable game-information depth layout belongs in `packages/ui/src/service-layout.css`.
- Do not claim production auth, database persistence, live wiki, support tickets, quest database, account progression or accepted backend contracts.

## Evidence

- browser/e2e: `tests/e2e/fe-guides-beginner-real-ui-layout-v1157.spec.ts` desktop/mobile.
- Visual review screenshots: `/tmp/guides-beginner-desktop-v1157.png`, `/tmp/guides-beginner-mobile-v1157.png`.
- Source validator: `tools/validate_web_fe_guides_beginner_real_ui_layout_v1157.py`.
- Build/type gates: Web/UI typecheck, Web production build and current-state validator.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
