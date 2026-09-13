# LGO-WEB-FE-PORTAL-HOME-LCP-IMAGE-REPORT-v1.51

Status: WEB_CLOSED.

WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51 closes a focused Portal home LCP visual loading issue. The existing Portal home image using the `WORLD_CONCEPT` claim now renders with `loading="eager"`; other visual panels remain lazy. This is FE-only design/runtime polish using existing Portal fixture image data and does not introduce backend behavior.

## Verification report

- RED reproduced: Playwright desktop/mobile saw `Portal home Đông Môn world concept` with `loading="lazy"` before the fix.
- Source behavior: Portal home now applies `loading={panel.claim === "WORLD_CONCEPT" ? "eager" : "lazy"}` inside the existing `portalHomeVisualPanels` composition.
- Runtime behavior: Playwright checks heading visibility, image visibility, eager loading, image natural size, desktop/mobile top position, font-size caps and horizontal overflow.
- Keyboard/accessibility coverage: the route remains keyboard reachable through the existing workspace shell and the e2e test anchors on visible semantic heading content before image assertions.
- Closure commands are recorded in the v1.51 handoff.

## Non-claims

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains active.
