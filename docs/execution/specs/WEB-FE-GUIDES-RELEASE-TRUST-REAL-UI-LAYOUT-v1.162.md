# WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162

Status: WEB_CLOSED.

Scope: only `/guides/release-trust-and-checksum-guide` for `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.162`.

Requirements:

- Keep Real Browser UI/UX Layout First; design target is only the existing guide-detail comparison guardrail.
- Do not start another page until this page is closed with browser/e2e/screenshot/validator/build/docs/commit/push.
- Apply Base First before page-local CSS. Reuse compact guide-flow styles from `packages/ui/src/service-layout.css` and avoid `apps/web/src/app/globals.css` route CSS.
- Replace stale placeholder first-flow with Vietnamese, game-scenario-correct release trust guidance: gói build, checksum, nguồn gốc file, giới hạn đã biết, phê duyệt chủ sở hữu.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-scope:

- No backend, launcher, entitlement, ticket system, CMS, production deployment or real download claim. NO_ACCEPTED_BACKEND_CONTRACT retained.
- No broad design batch and no other page implementation.

Evidence recorded in report and handoff.
