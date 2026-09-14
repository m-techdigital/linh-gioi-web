# WEB-FE-PUBLIC-COMMUNITY-REAL-PLAZA-GALLERY-v1.91

Status: WEB_CLOSED.

## SELECT

Selected from `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.91` after mobile browser audit found `/community` had no real image content in main route content. The user asked to use real LinhGioiOnline images where useful, and community benefits from plaza/NPC screenshots more than another text-only card.

## SPEC_LOCK

Scope is FE-only and static. Add real Linh Thanh plaza screenshots to `/community`, with explicit non-claims for chat, forum, guild, friend list, ticket backend and moderation backend. Do not add backend routes, fake fetches, mutable forms, account data, canonical DTOs or operational claims.

## IMPLEMENT

Copied two lightweight 640x480 PNG screenshots into `apps/web/public/game-art/community`, recorded SHA/provenance in `apps/web/public/game-art/manifest.json`, and added a responsive two-card gallery section to `/community` with accessible image names and compact captions.

## SOURCE_VERIFY

Required source evidence:

- `tools/validate_web_fe_public_community_real_plaza_gallery_v191.py`
- manifest entries with SHA256 for both copied screenshots
- `/community` source references for the gallery and explicit community/backend non-claims

## RUNTIME_VERIFY

Required runtime evidence: Playwright desktop and mobile e2e checks for heading presence, image loading, 2-column desktop layout, 1-column mobile layout, horizontal overflow and font caps.

## VISUAL_REVIEW

Visual review is covered by browser/e2e layout metrics and screenshot image natural dimensions. The copied images are static visual references only.

## HANDOFF

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
