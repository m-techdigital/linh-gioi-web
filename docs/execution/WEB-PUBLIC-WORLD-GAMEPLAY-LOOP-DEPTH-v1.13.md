# WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13

## Goal

Develop the actual public web product by making the Linh Giới Online world/gameplay loop understandable for a new player before they look for download, account, combat or community promises.

Runtime/browser/e2e is guardrail only. The product focus is player-facing content: Spirit Gate, Gate Keeper, Training Stone, beginner expectations, guide-to-world navigation and route-level copy clarity.

## Implemented source surfaces

- New route: `/game/loop`.
- New component: `PublicWorldGameplayLoopSections.tsx`.
- New typed content:
  - `gameplayLoopStages`
  - `beginnerExpectations`
  - `guideWorldNavigationLinks`
  - `gameplayScopeBoundaries`
- New guide: `world-gameplay-loop-guide`.
- New news item: `world-gameplay-loop-depth-started`.
- Updated Homepage, Start, Game, Guides, Guide detail, Community, Roadmap, Download, Download Trust, Status, Support, Navigation and Sitemap.

## Scope boundaries

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No public game download artifact.
- No fake download CTA.
- No placeholder checksum.
- No portal entitlement backend.
- No live community/chat/forum/guild backend.
- No live support ticket.
- No fake waitlist.
- No account-aware personalization.
- No backend recommendation engine.
- No production quest system or gameplay wiki.
- No combat damage, HP, loot, inventory/economy, skill economy, PvP, boss or live event reward claim.
- Runtime/browser/e2e is guardrail only and must not be marketed as game release readiness.

## Acceptance

- `/game/loop` exists and explains a four-step world/gameplay loop.
- Guide detail route for `world-gameplay-loop-guide` exists via typed content.
- Start/Game/Guides/Status/Download Trust/Support pages route users toward loop understanding before release claims.
- Source validators pass.
- Targeted runtime guardrails may be reused or run only after product content is implemented.
