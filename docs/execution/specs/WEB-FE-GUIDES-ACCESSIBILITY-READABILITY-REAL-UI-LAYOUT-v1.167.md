# WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167

Status: WEB_CLOSED.

Scope: only `/guides/accessibility-readability-guide` for `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.167`.

Requirements:

- Keep Real Browser UI/UX Layout First; design target is only the existing guide-detail comparison guardrail.
- Do not start another page until this page is closed with browser/e2e/screenshot/validator/build/docs/commit/push.
- Apply Base First before page-local CSS. Reuse compact guide-flow styles from `packages/ui/src/service-layout.css` and avoid `apps/web/src/app/globals.css` route CSS.
- Replace mixed English first-flow with Vietnamese readability guidance: quét tiêu đề, trang Bắt đầu, thẻ mobile and đọc ranh giới.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-scope:

- No formal accessibility certification, legal audit, personalization backend, production auth, public build, ticket live or production deployment claim. NO_ACCEPTED_BACKEND_CONTRACT retained.
- No broad design batch and no other page implementation.

Evidence recorded in report and handoff.
