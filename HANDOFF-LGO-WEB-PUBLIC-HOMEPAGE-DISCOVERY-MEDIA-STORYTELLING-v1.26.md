# HANDOFF — WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26

Status: RUNTIME_READY_VISUAL_ENV_LIMITED

Final decision: `LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26`

Baseline: `LGO-WEB-public-class-world-story-depth-v1.25-full-source.zip`

## Product outcome
- Homepage replaces three repeated deep-route summaries with one three-door discovery showcase.
- Discovery moments reference canonical class/world/story data instead of duplicating deep-route copy.
- `/classes`, `/game`, `/story` remain the detailed content owners.

## Base First audit
- `packages/ui`: generic `MediaFrame` is the reusable visual/content primitive.
- `packages/content`: typed `homeDiscoveryMoments` stores references only.
- `apps/web`: `HomeDiscoveryShowcase` is app-local homepage composition.
- No canonical class/world/story copy is duplicated into homepage configuration.

## Closure evidence
- v1.26 validator: PASS.
- Base First validator: PASS.
- Shared Base validator: PASS.
- WEB CURRENT STATE: PASS on clean source tree.
- text-source NUL scan: 0 files.
- affected lint/typecheck: PASS.
- content tests: PASS, 14/14.
- Next.js 16.3.4 production build on tmpfs: PASS.
- TypeScript inside production build: PASS.
- static generation: PASS, 63/63 pages.
- production route smoke from the same build: PASS, 5/5 (`/`, `/classes`, `/game`, `/story`, `/download`).
- Browser screenshot/visual review: UNVERIFIED_ENV; existing Chromium host policy blocks localhost with `ERR_BLOCKED_BY_ADMINISTRATOR`. No browser visual PASS is claimed.

## Next allowed step
`WEB-SHARED-APP-SHELL-FOUNDATION-v1.27`
