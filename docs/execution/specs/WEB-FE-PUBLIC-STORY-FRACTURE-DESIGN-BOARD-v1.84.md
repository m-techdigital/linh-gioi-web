# WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84

Status: WEB_CLOSED

## SELECT

The selected v1.84 scope is a public FE story visual slice after v1.83. Browser audit showed `/story` had a CSS cinematic scene, but no real LinhGioiOnline concept image near the opening narrative. The web art manifest already contains the audited `dong-mon-skyline.webp` world concept, so this slice uses that image as the Vết Nứt Đông Môn story anchor.

## SPEC_LOCK

Scope is public web UI only. `/story` must render real Dong Mon concept art with a meaningful accessible image name, eager route loading, zero horizontal overflow, capped typography and explicit non-claims around live portal events, quest state, player progress, account state and production world simulation. No backend, quest API, account API, world simulation API, DTO, form or live narrative state is added.

## IMPLEMENT

- Rendered `apps/web/public/game-art/world/dong-mon-skyline.webp` on `apps/web/src/app/story/page.tsx` with alt `Dong Mon fracture story concept art`.
- Added responsive `.lgo-story-fracture-design-board` CSS in `apps/web/src/app/globals.css`.
- Added a shared px-based public player hero typography cap so story and future public hero routes do not inherit oversized `rem` heading caps.
- Added `tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_story_fracture_design_board_v184.py` PASS.
- The image is the existing audited web derivative recorded in `apps/web/public/game-art/manifest.json`, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, quest-state form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts --project=chromium-desktop` failed because image `Dong Mon fracture story concept art` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/story`. The image loads with non-zero natural dimensions, uses eager loading for the opening story visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.84 public story fracture design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.85`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
