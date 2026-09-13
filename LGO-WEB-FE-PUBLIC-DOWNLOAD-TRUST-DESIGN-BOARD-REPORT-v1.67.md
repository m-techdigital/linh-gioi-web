# LGO-WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-REPORT-v1.67

Status: WEB_CLOSED

`WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67` adds a real reference-art design board to `/download/trust`. The page already explained why public download is blocked, but the browser audit showed it had no real image/SVG. This slice uses a small LinhGioiOnline docs SVG to make the release gate visually concrete without claiming that a downloadable build exists.

Changed behavior:

- `/download/trust` now renders `ReleaseTrustDesignBoard` with the accessible image name `Release trust gate design board`.
- The SVG lives in `apps/web/public/game-art/design-boards/release-trust-gate.svg`.
- The board includes a compact caption explaining that the reference art comes from LinhGioiOnline docs and does not imply a public artifact.
- Responsive CSS keeps the board readable on mobile and prevents horizontal overflow.

Evidence:

- RED browser/e2e reproduced the missing design board image on mobile.
- GREEN browser/e2e PASS on mobile and desktop.
- Source validator PASS.
- Web typecheck PASS and production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
