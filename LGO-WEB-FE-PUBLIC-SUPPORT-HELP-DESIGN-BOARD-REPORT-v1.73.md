# LGO-WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-REPORT-v1.73

Status: WEB_CLOSED

`WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73` adds a real LinhGioiOnline world-hub reference-art visual to `/support/help`. The route now has a route-map visual while preserving the explicit boundary that FAQ help does not provide live search, ticket backend, account lookup or sensitive-data intake.

Changed behavior:

- `/support/help` now renders the accessible image `Support help route map board`.
- The SVG lives in `apps/web/public/game-art/design-boards/support-help-route-map.svg`.
- The caption explains that the board grounds FAQ routing without claiming live search, ticket backend, account lookup or sensitive-data intake.
- Responsive CSS keeps the board readable on mobile and prevents horizontal overflow.

Evidence:

- RED browser/e2e reproduced the missing support help route-map board on mobile.
- GREEN browser/e2e PASS on mobile and desktop.
- Source validator PASS.
- Web typecheck PASS and production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
