# LGO-WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-REPORT-v1.84

Status: WEB_CLOSED

`WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84` adds a real LinhGioiOnline Dong Mon concept-art visual to `/story`. The route now has a visual anchor for the opening fracture narrative while preserving the explicit boundary that the page does not claim live portal events, quest state, player progress, account state or production world simulation.

Changed behavior:

- `/story` now renders the accessible image `Dong Mon fracture story concept art`.
- The image uses the existing audited web derivative `apps/web/public/game-art/world/dong-mon-skyline.webp`.
- The caption explains that the story setup is public narrative guidance, not live quest state.
- Responsive CSS keeps the board readable on mobile, prevents horizontal overflow and caps visible public hero typography.

Evidence:

- RED browser/e2e reproduced the missing Dong Mon fracture story concept art on desktop.
- GREEN browser/e2e PASS on desktop and mobile, including image loading, horizontal overflow, caption readability and font cap checks.
- Source validator PASS.
- Web typecheck PASS and production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
