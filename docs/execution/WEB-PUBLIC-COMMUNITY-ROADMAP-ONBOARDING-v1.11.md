# WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING v1.11

Final decision target: `LGO_WEB_PUBLIC_COMMUNITY_ROADMAP_ONBOARDING_READY_v1.11`

## Purpose

This product slice continues building the actual public Linh Giới Online web experience. The focus is community onboarding, roadmap clarity, player entry paths, feedback expectations and staged release messaging. Runtime/browser/e2e is guardrail only, not the product focus.

## Added public value

- A new `/community/onboarding` page connects community, roadmap, status and download trust into one player-facing reading path.
- Homepage now surfaces community / roadmap onboarding after download trust so new players know where to go next.
- Community page now separates static guidance, feedback expectations and future live-community blockers.
- Roadmap page now includes decision gates: ready, planned and blocked.
- Status and download trust pages now include staged release messaging so public copy does not jump from content-ready to release-ready.
- Guides include `community-roadmap-onboarding-guide` with steps, expected results and blocked scope.
- News includes `community-roadmap-onboarding-started` with detail sections.

## Explicit non-claims

- No production auth.
- No DB persistence.
- No CMS.
- No independent backend.
- No production deployment.
- No public game download artifact.
- No live community/chat/forum/guild backend.
- No live support ticket.
- No fake waitlist.
- No ticket backend.
- No account lookup.
- No forum moderation dashboard.
- No portal entitlement backend.
- Runtime/browser/e2e is guardrail only.

## Scope boundaries

Allowed paths are public web pages, local typed content fixtures, public UI components, docs and validators. This task does not modify game source roots, create API routes, add backend services, integrate Auth/API/DB/RBAC/audit, or make production deployment claims.

## Validation expectation

Run the v1.11 validator and the current-state validator. Runtime/package gates may be run as targeted guardrails after product changes, but should not replace product review.

## Next recommended task

`WEB-PUBLIC-CONTENT-IA-HUB-POLISH-v1.12` should focus on content IA, route grouping, page-to-page discoverability and hub polish rather than adding more tooling.
