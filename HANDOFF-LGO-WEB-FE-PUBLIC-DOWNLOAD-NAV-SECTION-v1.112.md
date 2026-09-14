# HANDOFF — WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112

Status: WEB_CLOSED

Design Target First: existing v1.95 targets are attached before implementation.

WEB-FE-PUBLIC-DOWNLOAD-NAV-SECTION-v1.112 keeps the public download CTA current across the download route family.

What changed:

Base UI/UX Layout remains shared through `RouteAwareLink`; this slice only changes public nav composition.

- `Trạng thái chơi` now uses shared `RouteAwareLink` section matching.
- `/download/trust` now marks the CTA with `aria-current="page"` and `data-current="page"` through the shared link behavior.
- Public Service design target coverage remains v1.95; no new design image was required.
- browser/e2e verifies the behavior on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.113.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
