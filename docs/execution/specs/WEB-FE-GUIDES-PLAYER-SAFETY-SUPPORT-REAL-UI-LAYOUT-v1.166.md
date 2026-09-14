# WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166

Status: WEB_CLOSED.

Scope: only `/guides/player-safety-support-guide` for `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.166`.

Requirements:

- Keep Real Browser UI/UX Layout First; design target is only the existing guide-detail comparison guardrail.
- Do not start another page until this page is closed with browser/e2e/screenshot/validator/build/docs/commit/push.
- Apply Base First before page-local CSS. Reuse compact guide-flow styles from `packages/ui/src/service-layout.css` and avoid `apps/web/src/app/globals.css` route CSS.
- Replace mixed English first-flow with Vietnamese safety/support guidance: FAQ hỗ trợ, báo lỗi an toàn, cộng đồng đúng phạm vi and kiểm trạng thái.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-scope:

- No live support ticket, moderation dashboard, account lookup, secure upload, entitlement, production auth or production deployment claim. NO_ACCEPTED_BACKEND_CONTRACT retained.
- No broad design batch and no other page implementation.

Evidence recorded in report and handoff.
