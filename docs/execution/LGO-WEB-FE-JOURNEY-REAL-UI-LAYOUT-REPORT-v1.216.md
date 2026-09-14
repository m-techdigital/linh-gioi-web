# LGO Web FE Journey Real UI Layout Report v1.216

Status: WEB_CLOSED

Task ID: WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216

Execution rule: Real Browser UI/UX Layout First and Base First.

`/journey` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Journey board remained the target guardrail; no batch design work was done.

What changed:
- The rendered page now keeps the reading order as hero → 20-minute session loop → world route flow → route-flow design board.
- Journey hero spacing, orbit visual, session cards, route cards and design-board density were compacted in `packages/ui/src/service-layout.css` under the shared UI owner.
- Mobile session and route flow now use a dense two-column rhythm instead of the prior long one-column flow.
- Stale `/journey` density and Vietnamese-match page-local CSS blocks were removed from `apps/web/src/app/globals.css`.

Final browser metrics:
- Desktop: overflow 0, h1/max font 51.20px, hero bottom 383.02px, session top 452.27px, session bottom 626.27px, first beat visible 174px, route top 641.63px, route bottom 859.89px, design board top 872.86px, scrollHeight 1608px, 6 session columns, 5 route columns.
- Mobile: overflow 0, h1/max font 36px, hero bottom 616.78px, session top 678.45px, session bottom 1143.17px, first beat visible 150px, route top 1152.44px, route bottom 1625.17px, design board top 1632.05px, scrollHeight 2529px, 2 session columns, 2 route columns.

Evidence:
- browser/e2e evidence is required and recorded for this closure.
- RED: desktop page height 2262px and mobile page height 5140px before shared CSS compaction.
- GREEN: Playwright desktop/mobile 8/8 across v1.123, v1.138, v1.180 and v1.216 Journey checks.
- Visual review: `/tmp/journey-desktop-v1216.png`, `/tmp/journey-mobile-v1216.png` checked against the design board and shared shell for margin, padding, font size, density, header/footer/menu and Base First reuse.
- AXIRO reference: used only as code organization inspiration for Base-first composition and CSS ownership, no copied code.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
