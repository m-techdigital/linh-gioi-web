# LGO Web FE Classes Real UI Layout Report v1.215

Status: WEB_CLOSED

Task ID: WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215

Execution rule: Real Browser UI/UX Layout First and Base First.

`/classes` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Classes board remained the target guardrail; no batch design work was done.

What changed:
- The rendered page now keeps the core reading order as hero → Năm Lộ class grid → shared disclosure for secondary proof.
- Class identity deck, Võ art spotlight and Năm Lộ philosophy proof are grouped behind the shared native disclosure so the first-flow stays readable on desktop and mobile.
- Classes overview spacing, typography, hero visual height and class-card density were compacted in `packages/ui/src/service-layout.css` under the shared UI owner.
- Stale `/classes` density and Vietnamese-match page-local CSS blocks were removed from `apps/web/src/app/globals.css`.

Final browser metrics:
- Desktop: overflow 0, h1/max font 51.20px, hero bottom 402.09px, class grid top 459.69px, class grid bottom 738.45px, first card visible 260.31px, disclosure top 755.08px, scrollHeight 1295px, 5 class columns.
- Mobile: overflow 0, h1/max font 36px, hero bottom 574.36px, class grid top 613.34px, class grid bottom 1270.06px, first card visible 214px, disclosure top 1280.59px, scrollHeight 2007px, 2 class columns.

Evidence:
- browser/e2e evidence is required and recorded for this closure.
- RED: mobile page height 8455px and desktop page height 4317px before disclosure grouping and shared CSS compaction.
- GREEN: Playwright desktop/mobile 10/10 across v1.122, v1.137, v1.54, v1.55 and v1.215 classes checks.
- Visual review: `/tmp/classes-desktop-v1215.png`, `/tmp/classes-mobile-v1215.png` checked against the design board and shared shell for margin, padding, font size, density, header/footer/menu and Base First reuse.
- AXIRO reference: used only as code organization inspiration for Base-first composition and CSS ownership, no copied code.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
