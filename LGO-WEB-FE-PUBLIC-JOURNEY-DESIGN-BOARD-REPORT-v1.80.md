# LGO-WEB-FE-PUBLIC-JOURNEY-DESIGN-BOARD-REPORT-v1.80

Status: WEB_CLOSED

`WEB-FE-PUBLIC-JOURNEY-DESIGN-BOARD-v1.80` adds a real LinhGioiOnline route-flow reference-art visual to `/journey`. The route now has a visual anchor for the session loop while preserving the explicit boundary that the page does not claim live guild, party, inventory or account persistence backend.

Changed behavior:

- `/journey` now renders the accessible image `Journey session route flow board`.
- The SVG lives in `apps/web/public/game-art/design-boards/journey-session-route-flow.svg`.
- The caption explains that journey is a readable session route, not live guild/account/backend availability.
- Responsive CSS keeps the board readable on mobile and prevents horizontal overflow.

Evidence:

- RED browser/e2e reproduced the missing journey route-flow board on desktop.
- GREEN browser/e2e PASS on desktop and mobile.
- Source validator PASS.
- Web typecheck PASS and production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
