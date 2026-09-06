# WEB-PUBLIC-CONTENT-IA-HUB-POLISH CHECKLIST v1.12

## Product checks

- [ ] `/start` exists as a player-facing Start hub.
- [ ] Homepage links to `/start` as the primary entry path.
- [ ] Start hub includes content hub cards, player entry questions and route groups.
- [ ] Guides include `start-here-content-hub-guide`.
- [ ] News includes `content-ia-hub-polish-started`.
- [ ] Navigation includes `Bắt đầu`.
- [ ] Sitemap includes `/start` and `/guides/start-here-content-hub-guide`.
- [ ] Download, Status, Support, Community and Roadmap pages point back to the Start hub where useful.

## Non-claims that must remain visible

- [ ] No production auth.
- [ ] No DB persistence.
- [ ] No CMS.
- [ ] No independent backend.
- [ ] No production deployment.
- [ ] No public game download artifact.
- [ ] No fake download CTA.
- [ ] No placeholder checksum.
- [ ] No portal entitlement backend.
- [ ] No live community/chat/forum/guild backend.
- [ ] No live support ticket.
- [ ] No fake waitlist.
- [ ] No account-aware personalization.
- [ ] No backend recommendation engine.
- [ ] Runtime/browser/e2e is guardrail only.

## Forbidden scope

- [ ] Do not add `apps/*/src/app/api` routes.
- [ ] Do not add backend packages/services.
- [ ] Do not touch game source roots: `client`, `server`, `protocol`, `gamedata`.
- [ ] Do not create fake download, fake waitlist, fake ticket or fake entitlement flows.
- [ ] Do not claim production auth, DB persistence, CMS, live community backend or deployment.
