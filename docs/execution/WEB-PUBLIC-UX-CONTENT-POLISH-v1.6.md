# WEB-PUBLIC-UX-CONTENT-POLISH-v1.6

## Purpose

WEB v1.6 shifts effort back to the main web product. Runtime/browser/e2e gates remain regression support, but the primary work is player-facing public website UX and content clarity.

## Product changes

- Homepage now has a clearer hero, status summary, world pillars, player journey and non-claim band.
- World page explains Spirit Gate, Gate Keeper and Training Stone in player-facing language.
- Download page now has a readiness checklist instead of a thin placeholder.
- Support page now groups download, account and troubleshooting guidance without creating a fake ticket backend.
- New Roadmap page explains current, next, blocked and future web milestones.
- New Community page reserves community guidance without claiming chat/forum/social backend.
- Local typed content now includes web v1.6 news, browser matrix guardrail notes and beginner training guide copy.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.

## Validation intent

The v1.6 validator checks that product-facing pages and typed fixtures exist, route navigation includes Roadmap and Community, and non-claims remain visible. Runtime/browser E2E should be run as a guardrail after content changes, not as the main product scope.
