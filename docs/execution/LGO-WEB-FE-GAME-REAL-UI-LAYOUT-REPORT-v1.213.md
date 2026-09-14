# LGO Web FE Game Real UI Layout Report v1.213

Status: WEB_CLOSED

Task ID: WEB-FE-GAME-REAL-UI-LAYOUT-v1.213

Execution rule: Real Browser UI/UX Layout First and Base First.

`/game` was closed as a real browser UI/UX Layout slice. The existing Vietnamese world atlas board remained the target guardrail; no batch design work was done.

What changed:
- The rendered page now keeps the core reading order as hero → game world target board → route journey → world atlas stories.
- Secondary boundary, pillar, world layer and Âm Giới invasion evidence is grouped behind the shared native disclosure so the first-flow stays readable on desktop and mobile.
- Game overview spacing, typography, target board, route grid and atlas cards were compacted in `packages/ui/src/service-layout.css` under the shared UI owner.
- No route CSS was added to `apps/web/src/app/globals.css`.

Final browser metrics:
- Desktop: overflow 0, h1 38.40px, max font 51.20px, hero bottom 385.00px, board top 391.39px, board bottom 606.42px, route top 631.70px, route bottom 838.86px, atlas top 849.42px, atlas bottom 1126.59px, disclosure top 1133.95px, scrollHeight 1690px, 2 board columns, 5 route columns, 5 atlas columns.
- Mobile: overflow 0, h1 29.12px, max font 29.12px, hero bottom 683.70px, board top 689.47px, board bottom 980.13px, route top 1007.00px, route bottom 1588.20px, atlas top 1599.08px, atlas bottom 2673.42px, disclosure top 2679.19px, scrollHeight 3422px, 1 board column, 2 route columns, 1 atlas column.

Evidence:
- browser/e2e evidence is required and recorded for this closure.
- RED: missing `Game world atlas hub board` and first-flow density failures in existing `/game` tests.
- GREEN: Playwright desktop/mobile 8/8 across v1.120, v1.135, v1.83 and v1.213 game overview checks.
- Visual review: `/tmp/game-desktop-v1213.png`, `/tmp/game-mobile-v1213.png` checked against the design board and shared shell for margin, padding, font size, density, header/footer/menu and Base First reuse.
- AXIRO reference: used only as code organization inspiration for Base-first composition and CSS ownership, no copied code.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
