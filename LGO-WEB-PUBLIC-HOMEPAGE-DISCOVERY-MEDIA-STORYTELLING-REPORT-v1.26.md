# LGO WEB — HOMEPAGE DISCOVERY & MEDIA STORYTELLING — REPORT v1.26

Task: `WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26`

Status: `LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26`

## Product changes
- Homepage replaces three repeated deep-route summaries with one three-door discovery showcase.
- Class spotlight references canonical `classPaths` data.
- World spotlight references canonical `worldRouteStops` data.
- Story spotlight references canonical `narrativeChapters` data.
- `/classes`, `/game`, `/story` remain the detailed owners.

## Base First audit
- `packages/ui`: added generic `MediaFrame`.
- `packages/content`: added typed `homeDiscoveryMoments` reference config.
- `apps/web`: added only route composition + web visual treatment.
- No canonical class/world/story copy is duplicated into homepage config.

## Verification
- dedicated v1.26 validator: PASS.
- Base First validator: PASS.
- Shared Base validator: PASS.
- WEB CURRENT STATE: PASS on clean source tree.
- text-source NUL scan: 0 files.
- `packages/ui` lint/typecheck: PASS.
- `packages/content` lint/typecheck: PASS.
- `apps/web` lint/typecheck: PASS.
- content tests: PASS, 14/14.
- production build: PASS on tmpfs using canonical Node 24.20.0 and Next.js 16.3.4.
- production build TypeScript: PASS.
- static generation: PASS, 63/63 pages.
- runtime route smoke: PASS, 5/5 primary routes return HTTP 200.
- Browser visual review: UNVERIFIED_ENV because the existing Chromium host policy returns `ERR_BLOCKED_BY_ADMINISTRATOR` for localhost. This blocker is reused from v1.25 because browser/runtime policy did not change.

## Build-once note
The closure production build was executed once after source gates were green. Its output was reused for route smoke; no duplicate production build was run.

## Final decision
`LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26`

Next: `WEB-SHARED-APP-SHELL-FOUNDATION-v1.27`.
