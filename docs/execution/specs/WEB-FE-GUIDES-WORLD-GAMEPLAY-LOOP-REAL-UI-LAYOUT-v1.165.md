# WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165

Status: WEB_CLOSED.

Scope: only `/guides/world-gameplay-loop-guide` for `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.165`.

Requirements:

- Keep Real Browser UI/UX Layout First; design target is only the existing guide-detail comparison guardrail.
- Do not start another page until this page is closed with browser/e2e/screenshot/validator/build/docs/commit/push.
- Apply Base First before page-local CSS. Reuse compact guide-flow styles from `packages/ui/src/service-layout.css` and avoid `apps/web/src/app/globals.css` route CSS.
- Replace mixed English first-flow with Vietnamese game-scenario guidance: Cổng Linh, Người Gác Cổng, Đá Luyện Tập and kiểm trạng thái tải game.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-scope:

- No live map, combat, quest persistence, inventory, economy, public build artifact, entitlement, ticket backend, production auth or production deployment claim. NO_ACCEPTED_BACKEND_CONTRACT retained.
- No broad design batch and no other page implementation.

Evidence recorded in report and handoff.
