# WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75

Status: WEB_CLOSED

## SELECT

The selected v1.75 scope is a public FE community onboarding visual slice after v1.74. Browser audit showed `/community/onboarding` explains the reading path for community, roadmap, status and download trust, but it still lacked a real reference-art image near the onboarding hero. The game repo contains a small `core-gameplay-loop.svg` design-board asset, so this slice uses that art to ground onboarding in the actual gameplay loop before community expectations.

## SPEC_LOCK

Scope is public web UI only. `/community/onboarding` must render a real gameplay-loop reference board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live forum, chat, guild backend, ticket backend, fake waitlist, production auth and CMS. No backend, forum API, waitlist API, DTO, form or live community claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/core-gameplay-loop.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/community-onboarding-gameplay-loop.svg`.
- Rendered the board on `apps/web/src/app/community/onboarding/page.tsx` with alt `Community onboarding gameplay loop board`.
- Added responsive `.lgo-community-onboarding-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-community-onboarding-design-board-v175.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_community_onboarding_design_board_v175.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, forum/waitlist form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-community-onboarding-design-board-v175.spec.ts --project=chromium-desktop` failed because image `Community onboarding gameplay loop board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-community-onboarding-design-board-v175.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/community/onboarding`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.75 public community onboarding design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.76`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
