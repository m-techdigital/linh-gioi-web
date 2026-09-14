# WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93

Status: WEB_CLOSED.

## SELECT

Selected from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.93` after user feedback that UI work needs a professional visual destination instead of ad-hoc CSS edits. This slice creates a saved homepage design reference and verifies the live homepage hero against it.

## SPEC_LOCK

Scope is FE-only UI/UX layout reference and homepage first-viewport verification. Create a professional design reference image, store it in the repo, expose it as a public asset for browser/e2e, and verify the live homepage hero renders with real dimensions in the first viewport. Do not add backend routes, fake fetches, mutable forms, account data or production claims.

## IMPLEMENT

Added `homepage-visual-target-v193.svg` as a 1440x900 design reference under both public assets and docs design reference. Added Playwright coverage that checks the reference is served and that homepage hero, h1, primary CTA and cinematic scene have visible dimensions without overflow or oversized fonts.

## SOURCE_VERIFY

Required source evidence:

- `tools/validate_web_fe_public_home_visual_target_v193.py`
- `apps/web/public/design-reference/homepage-visual-target-v193.svg`
- `docs/design/reference/WEB-FE-HOMEPAGE-VISUAL-TARGET-v1.93.svg`
- `tests/e2e/fe-public-home-visual-target-v193.spec.ts`

## RUNTIME_VERIFY

Required runtime evidence: Playwright desktop and mobile browser/e2e checks that the saved design reference returns 200 and the live homepage hero/h1/CTA/scene render visible boxes in the first viewport.

## VISUAL_REVIEW

Visual review target is now explicit: compare live homepage screenshots against the saved design reference before continuing visual polish.

## HANDOFF

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
