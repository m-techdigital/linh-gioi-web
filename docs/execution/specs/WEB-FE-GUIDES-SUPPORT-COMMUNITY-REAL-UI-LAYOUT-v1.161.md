# WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161.

Scope: close only `/guides/support-and-community-guide` as the current page from `WEB-NEXT-ACTION`. The page must use Real Browser UI/UX Layout First, with design target only as a comparison guardrail and Base First before any local CSS/component work.

Implementation requirements:

- Render `/guides/support-and-community-guide` with Vietnamese safe-feedback/support/community scenario copy instead of placeholder English, limited to the current page because the placeholder blocked meaningful browser comparison.
- Keep the generic guide detail route and reuse the shared detail/guide-flow layout.
- Put current-page visual treatment in `packages/ui/src/service-layout.css` and keep current-page CSS out of `apps/web/src/app/globals.css`.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth, no DB persistence, no real Portal/Ops integration, no live ticket inbox, no chat/forum/guild backend, no moderation backend, no secure upload/account lookup.
