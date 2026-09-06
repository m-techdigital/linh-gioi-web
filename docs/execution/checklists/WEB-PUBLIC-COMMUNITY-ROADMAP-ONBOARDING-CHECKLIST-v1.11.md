# WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING CHECKLIST v1.11

## Product checks

- [ ] `/community/onboarding` exists.
- [ ] Homepage links community / roadmap onboarding after download trust.
- [ ] Community page includes onboarding paths and feedback guidance.
- [ ] Roadmap page includes decision gates.
- [ ] Status / download trust pages include staged release messaging.
- [ ] Guide detail path includes `community-roadmap-onboarding-guide`.
- [ ] News detail path includes `community-roadmap-onboarding-started`.
- [ ] Sitemap includes `/community/onboarding` and `/guides/community-roadmap-onboarding-guide`.

## Non-claims that must remain visible

- [ ] No production auth.
- [ ] No DB persistence.
- [ ] No CMS.
- [ ] No independent backend.
- [ ] No production deployment.
- [ ] No public game download artifact.
- [ ] No live community/chat/forum/guild backend.
- [ ] No live support ticket.
- [ ] No fake waitlist.
- [ ] Runtime/browser/e2e is guardrail only.

## Forbidden scope

- [ ] Do not add `apps/*/src/app/api` routes.
- [ ] Do not add backend packages/services.
- [ ] Do not touch game source roots: `client`, `server`, `protocol`, `gamedata`.
- [ ] Do not create fake download, fake waitlist, fake ticket or fake entitlement flows.
- [ ] Do not claim production auth, DB persistence, CMS, live community backend or deployment.
