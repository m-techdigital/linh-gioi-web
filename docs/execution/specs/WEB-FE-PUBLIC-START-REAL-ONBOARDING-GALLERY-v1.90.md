# WEB-FE-PUBLIC-START-REAL-ONBOARDING-GALLERY-v1.90

Status: WEB_CLOSED.

## SELECT

Selected from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.90` after user direction to use real LinhGioiOnline images where useful. `/start` is the highest-fit public route because it explains the tutorial flow and already has a gameplay-loop design board.

## SPEC_LOCK

Scope is FE-only, static and public. Add a small gallery of real Dong Mon onboarding screenshots copied from the sibling LinhGioiOnline repo. The route must keep public build, login, entitlement and backend non-claims explicit. Do not add backend routes, fake fetches, mutable forms, account data or canonical DTOs.

## IMPLEMENT

Copied three lightweight 1280x720 PNG screenshots into `apps/web/public/game-art/onboarding`, recorded SHA/provenance in `apps/web/public/game-art/manifest.json`, and added a responsive gallery section to `/start` with accessible image names and compact captions.

## SOURCE_VERIFY

Required source evidence:

- `tools/validate_web_fe_public_start_real_onboarding_gallery_v190.py`
- manifest entries with SHA256 for all three copied screenshots
- `/start` source references for the gallery and explicit non-claims

## RUNTIME_VERIFY

Required runtime evidence: Playwright desktop and mobile e2e checks for heading presence, image loading, 3-column desktop layout, 1-column mobile layout, horizontal overflow and font caps.

## VISUAL_REVIEW

Visual review is covered by browser/e2e layout metrics and screenshot image natural dimensions. The copied images are static visual references only.

## HANDOFF

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
