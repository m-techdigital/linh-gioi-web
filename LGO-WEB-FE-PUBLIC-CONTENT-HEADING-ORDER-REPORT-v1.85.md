# LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-REPORT-v1.85

Status: WEB_CLOSED

`WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85` fixes public content heading semantics for `/events`, `/patch-notes`, `/news` and `/status`. These routes now start main content with a single visible h1 before CTA, fixture card or trust-board sections.

Changed behavior:

- `/events` now has the page h1 `Sự kiện`.
- `/patch-notes` now has the page h1 `Patch notes`.
- `/news` now has the page h1 `Tin tức` before content IA CTA cards.
- `/status` now has the page h1 `Trạng thái / Maintenance` before trust/release CTA sections.
- The fixture/no-backend copy remains visible on each route.

Evidence:

- RED browser/e2e reproduced missing or misordered page h1 headings on desktop.
- GREEN browser/e2e PASS on desktop and mobile, including h1 count, first-heading order, horizontal overflow and font cap checks.
- Source validator PASS.
- Web typecheck PASS and production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
