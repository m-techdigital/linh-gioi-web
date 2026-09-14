# HANDOFF-LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146

Status: WEB_CLOSED.

Closed page: `/support`.

What changed:

- Kept the existing Vietnamese support target because it was usable and aligned with the Linh Giới support-station scenario.
- `/support` now uses the shared service/proof layout base instead of a route-specific v1.131 density block in app globals.
- The hero, board, support topic cards, FAQ labels and first-flow support copy are Vietnamese and aligned to the support target.
- The first-flow badge changed from stale `Design Target First` to `Board tham chiếu`.
- Support FAQ scope labels render in Vietnamese at the UI layer.

Base First decision:

Reusable support/service density belongs in `packages/ui/src/service-layout.css`. This slice extended the shared service layout with support station styles and removed stale route-specific support CSS from `apps/web/src/app/globals.css`.

Visual/browser evidence:

- Desktop 1280×720: overflow 0; h1 34.816px; hero bottom 363.094px; board top 358.453px; board bottom 550.203px; support topic board top 584.75px; topic board bottom 852.219px; FAQ top 870.766px; safety CTA top 1281.359px.
- Mobile 390×844: overflow 0; h1 46.8px; hero bottom 497.453px; board top 505.453px; board bottom 802.531px; support topic board top 833.719px; FAQ top 1330.063px; safety CTA top 2162.406px.

Next allowed task:

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.147. Select `/support/help` as the next single active page and complete it fully before moving onward.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.

Evidence keywords: Real Browser UI/UX Layout First, browser/e2e, screenshot.
