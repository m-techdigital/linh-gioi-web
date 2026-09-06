# WEB-PUBLIC-VISUAL-RESPONSIVE-POLISH-v1.7

## Decision

`LGO_WEB_PUBLIC_VISUAL_RESPONSIVE_POLISH_READY_v1.7`

## Purpose

This task returns focus to the actual web product after runtime/browser guardrails were established. The goal is to improve the public website's visual hierarchy, responsive readability, player-facing copy and page composition without expanding backend/tooling scope.

Runtime/browser E2E is support infrastructure only. It protects the public UX from regressions, but the main work is product/web polish.

## Product changes

- Homepage hero now uses `WEB v1.7 visual responsive polish` messaging.
- Homepage includes a lightweight CSS-only Spirit Gate stage preview.
- Homepage adds visual polish cards explaining hero hierarchy, world preview and guardrail wording.
- Homepage adds responsive intent cards for desktop, tablet and mobile.
- Homepage adds page UX focus cards for `/`, `/game`, `/download` and `/support`.
- Homepage adds a Product-first notice to keep future work centered on web quality.
- Game page now uses a stage preview and responsive intent block.
- Download page now states clearly that no fake download button should appear before an accepted release artifact.
- Support page now has clearer support grouping and community tone principles.
- Roadmap page now emphasizes product-first work and WEB-08 backend contract blocking.
- Community page now presents community principles without claiming live community systems.

## Source-owned content additions

- `visualPolishItems`
- `responsiveBreakpoints`
- `publicPageFocus`
- `communityPrinciples`
- `visual-responsive-polish-started` fixture entry

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
- No public game download artifact.
- No Core Web Vitals measured PASS.

## Guardrail usage

Use Python validators, lint/typecheck/build and targeted browser checks as supporting verification. Do not let runtime/browser tooling become the main content of the next web development task unless a real product-flow regression blocks work.

## Next recommended product task

`WEB-PUBLIC-GAME-INFO-DEPTH-v1.8`

Focus: deepen player-facing game information pages: world story, beginner guide, download readiness copy, status/support FAQ and roadmap wording. Keep backend integration blocked until accepted backend Auth/API/DB/RBAC/audit contract exists.
