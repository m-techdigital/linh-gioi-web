# LGO Web FE Story Real UI Layout Report v1.214

Status: WEB_CLOSED

Task ID: WEB-FE-STORY-REAL-UI-LAYOUT-v1.214

Execution rule: Real Browser UI/UX Layout First and Base First.

`/story` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Story board remained the target guardrail; no batch design work was done.

What changed:
- The rendered page now keeps the core reading order as hero → opening chapter cards → shared disclosure for secondary proof.
- Detailed timeline, Đông Môn concept art and Âm Giới event proof are grouped behind the shared native disclosure so the first-flow stays readable on desktop and mobile.
- Story overview spacing, typography, hero visual height and chapter-card density were compacted in `packages/ui/src/service-layout.css` under the shared UI owner.
- Story fracture board and story hero page ownership were removed from `apps/web/src/app/globals.css`.

Final browser metrics:
- Desktop: overflow 0, h1 44.80px, max font 51.20px, hero bottom 468.17px, chapters top 465.78px, chapters bottom 842.81px, first card visible 217.72px, disclosure top 860.41px, scrollHeight 1400px, 3 chapter columns.
- Mobile: overflow 0, h1/max font 37.08px, hero bottom 683.45px, chapters top 692.41px, chapters bottom 1289.95px, first card visible 85.39px, disclosure top 1300.50px, scrollHeight 2043px, 2 chapter columns.

Evidence:
- browser/e2e evidence is required and recorded for this closure.
- RED: mobile hero 951.56px, chapters top 1145.75px and scrollHeight 7563px before layout compaction.
- GREEN: Playwright desktop/mobile 9/9 across v1.121, v1.136, v1.184, v1.164 and v1.214 story checks.
- Visual review: `/tmp/story-desktop-v1214.png`, `/tmp/story-mobile-v1214.png` checked against the design board and shared shell for margin, padding, font size, density, header/footer/menu and Base First reuse.
- AXIRO reference: used only as code organization inspiration for Base-first composition and CSS ownership, no copied code.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
