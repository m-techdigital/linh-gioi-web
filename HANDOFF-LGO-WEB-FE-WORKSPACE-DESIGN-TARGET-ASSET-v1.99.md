# HANDOFF — WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99

Status: WEB_CLOSED

WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99 ensures Portal and Ops/Admin Design Target First links resolve to real PNG assets inside each workspace runtime.

What changed:

- Added Player Portal runtime mirror: `apps/portal/public/design-reference/design-atlas-portal-v195.png`.
- Added Ops/Admin runtime mirror: `apps/ops/public/design-reference/design-atlas-ops-v195.png`.
- Updated the design target registry with runtime mirror paths.
- Added browser/e2e coverage that verifies HTTP 200, `image/png`, loaded image dimensions and existing link hrefs.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.100.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
