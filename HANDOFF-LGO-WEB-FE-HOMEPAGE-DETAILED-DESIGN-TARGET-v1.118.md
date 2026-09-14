# HANDOFF — WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118

Status: WEB_CLOSED

WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118 creates the detailed homepage design destination required before further homepage UI changes.

What changed:

Base UI/UX Layout and Design Target First behavior were updated without adding duplicate page-local layout owners.

- Added a high-fidelity `Public Homepage` raster design target using built-in image_gen.
- Mirrored it in `docs/design/reference`.
- Registered it in `docs/design/DESIGN-TARGET-REGISTRY.md`.
- Updated `/` to expose the homepage-specific Design Target First reference.
- Added browser/e2e coverage that verifies the target image, target attachment, hero comparability, CTA count, h1 size and horizontal overflow.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.119.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
