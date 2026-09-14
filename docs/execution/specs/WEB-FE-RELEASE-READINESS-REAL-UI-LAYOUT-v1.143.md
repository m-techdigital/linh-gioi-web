# WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143

Status: WEB_CLOSED.

Scope: complete only `/release/readiness` as a real browser UI/UX Layout slice. Real Browser UI/UX Layout First supersedes design-target work: the target is a guardrail, while the deliverable is the rendered page.

Implementation requirements:
- Keep `/release/readiness` on the Linh Giới release-readiness scenario: no public build, no fake tester funnel, NO_ACCEPTED_BACKEND_CONTRACT retained.
- Use the existing release-readiness target only as comparison; minimal Vietnamese correction is allowed, but no repeated design iteration.
- Compact hero, readiness board, readiness hub and owner gate flow in browser.
- Apply Base First: reusable compact service/proof layout CSS must live in `packages/ui/src/service-layout.css`, not as repeated route-local CSS in `apps/web/src/app/globals.css`.
- Verify desktop/mobile layout with Playwright card-density, font-size and overflow checks.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.

Evidence keyword: browser/e2e.
