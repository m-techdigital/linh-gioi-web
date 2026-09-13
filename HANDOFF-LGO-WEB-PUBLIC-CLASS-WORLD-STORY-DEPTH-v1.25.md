# HANDOFF — WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25

Status: `WEB_HANDOFF_DONE`

Final decision: `LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25`

## Baseline

- `LGO-WEB-public-approved-art-ingest-visual-review-v1.24-full-source.zip`

## What changed

- Added typed class identity depth for all five Lộ.
- Added typed world mood/player promise/activity/narrative pressure for the opening route.
- Added typed chapter opening image/stakes/closing turn for the opening arc.
- Added `ClassIdentityDeck`, `WorldAtlasStories` and `StoryArcTimeline` reusable web sections.
- Added responsive editorial styling while preserving v1.24 audited-art boundaries.
- Added mandatory Base First governance and Build Once/evidence-reuse rules.
- Added shared `ExperienceHero` and `ProvisionalFeatureShell` primitives in `packages/ui`.
- Migrated the public hero wrapper plus Portal/Ops provisional route shells to shared base code.

## Base First audit

- Shared owners searched: UI, design tokens, content, auth, API client, config, contracts and testing.
- Shared owner changed: `packages/ui`.
- Duplicate app-local rendering removed from Public/Portal/Ops.
- No backend/auth/contract semantics were moved into UI base code.
- Full production build intentionally reserved for closure; unchanged historical PASS evidence was not rerun during inner-loop edits.

## Verification

- Full lint: PASS, 11/11 app/package owners.
- Sequential TypeScript: PASS, 11/11 app/package owners.
- Content tests: PASS, 13/13.
- v1.22/v1.23/v1.24/v1.25 validators: PASS.
- Base First + shared-base validators: PASS.
- Portal/Ops shell validators: PASS.
- WEB CURRENT STATE: PASS.
- Production build: PASS on clean tmpfs runtime with Next.js 16.3.4.
- Static generation: PASS, 63/63 pages.
- Runtime route smoke: PASS, 5/5 primary routes HTTP 200.
- Browser visual review: `UNVERIFIED_ENV`; system Chromium navigation is blocked by host policy with `ERR_BLOCKED_BY_ADMINISTRATOR`.

## Next allowed step

`WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26`

## Output artifacts

- `LGO-WEB-public-class-world-story-depth-v1.25-full-source.zip`
- `LGO-WEB-public-class-world-story-depth-v1.25-delta.zip`
- matching SHA256 sidecars
- delta baseline: v1.24 full source
- deletion count: 0
