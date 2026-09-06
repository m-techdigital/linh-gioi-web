# WEB-PUBLIC-CONTENT-IA-HUB-POLISH v1.12

Final decision target: `LGO_WEB_PUBLIC_CONTENT_IA_HUB_POLISH_READY_v1.12`

## Purpose

This product slice continues building the actual public Linh Giới Online website. The focus is content IA, hub discoverability, route grouping, player entry clarity and page-to-page navigation. Runtime/browser/e2e is guardrail only, not the product focus.

## Added public value

- A new `/start` page becomes the public Start hub for new players and reviewers.
- The Start hub maps common player questions to routes: world, download trust, roadmap, status, support and community onboarding.
- Public content hubs group routes by player intent instead of leaving players to scan a long menu.
- Route groups distinguish new-player entry, release trust, content depth and community/roadmap paths.
- Homepage, Guides, News, Community, Roadmap, Download, Status and Support now point back to the Start hub where helpful.
- A new guide `start-here-content-hub-guide` explains how to read the website without confusing public content with production services.
- A new news item `content-ia-hub-polish-started` documents the product-facing IA improvement.

## Explicit non-claims

- No production auth.
- No DB persistence.
- No CMS.
- No independent backend.
- No production deployment.
- No public game download artifact.
- No fake download CTA.
- No placeholder checksum.
- No portal entitlement backend.
- No live community/chat/forum/guild backend.
- No live support ticket.
- No fake waitlist.
- No account-aware personalization.
- No backend recommendation engine.
- Runtime/browser/e2e is guardrail only.

## Scope boundaries

Allowed paths are public web pages, local typed content fixtures, public UI components, docs and validators. This task does not modify game source roots, create API routes, add backend services, integrate Auth/API/DB/RBAC/audit, add CMS, create ticket/waitlist/download flows, or make production deployment claims.

## Validation expectation

Run the v1.12 validator and current-state validator. Targeted runtime package/build checks may run after product changes, but they must not replace product review.

## Next recommended task

`WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13` should keep building web content around world/gameplay loop explanation, beginner expectations and route-level copy clarity.
