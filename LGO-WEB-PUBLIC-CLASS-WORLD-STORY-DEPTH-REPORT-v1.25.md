# LGO WEB — PUBLIC CLASS / WORLD / STORY DEPTH — REPORT v1.25

Task: `WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25`

Final decision: `LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25`

## Objective

Deepen the public game universe through typed five-Lộ identity, emotionally distinct world stops and a cinematic three-chapter opening arc while preserving the scenario-first website architecture.

## Product changes

- Five Lộ now carry `battleRhythm`, `worldLens`, `teamFantasy` and `signatureVerbs` in typed content.
- `/classes` adds `ClassIdentityDeck`, giving Võ / Kiếm / Pháp / Cơ / Linh equal editorial depth.
- Opening world stops now carry `mood`, `playerPromise`, `signatureActivity` and `narrativePressure`.
- `/game` adds `WorldAtlasStories`, turning the route into five different emotional/player promises.
- Opening chapters now carry `openingImage`, `stakes` and `closingTurn`.
- `/story` adds `StoryArcTimeline`, making escalation readable from Đông Môn to Âm Giới Xâm Lăng.
- v1.24 art stays optional/replaceable and retains its concept/development-art public labels.
- Base First hardening moves the reusable hero renderer into `packages/ui` and leaves `PublicPlayerHero` as a public-web composition wrapper.
- Portal and Ops provisional feature shells now reuse `ProvisionalFeatureShell` from `packages/ui` instead of repeating the same `GameCard` / `StatusBadge` structure across routes.
- Base First + Evidence Reuse / Build Once governance is now enforced by source validators.

## Base First audit

- Shared owners searched: `packages/ui`, `packages/design-tokens`, `packages/content`, `packages/auth`, `packages/api-client`, `packages/config`, `packages/contracts`, `packages/testing`.
- Shared owners changed: `packages/ui`.
- New shared primitives: `ExperienceHero`, `ProvisionalFeatureShell`.
- App-local owner retained: `PublicPlayerHero` remains a thin public-web wrapper because its naming/composition is public-site specific while rendering is shared.
- Duplicate code removed: direct hero badge/button rendering in the public wrapper and repeated provisional shell card markup across Portal/Ops routes.
- Build policy: targeted lint/typecheck/tests during implementation; one production build attempt at closure.

## Verification

- Canonical closure runtime: Node 24.20.0.
- Full lint: PASS, 11/11 app/package owners.
- Sequential TypeScript: PASS, 11/11 app/package owners; the first harness call timed out after 8 shared-package PASS results, and only the remaining Web/Portal/Ops slices were resumed rather than rerunning unchanged PASS evidence.
- Content tests: PASS, 13/13.
- v1.22 game-experience validator: PASS.
- v1.23 visual/CTA validator: PASS.
- v1.24 approved-art validator: PASS.
- v1.25 class/world/story validator: PASS.
- Base First governance validator: PASS.
- Shared-base validator: PASS.
- Portal shell validator: PASS.
- Ops shell validator: PASS.
- WEB CURRENT STATE: PASS.
- Next.js 16.3.4 production build on clean tmpfs runtime: PASS.
- Static generation: PASS, 63/63 pages.
- `next start` runtime route smoke: PASS for `/`, `/classes`, `/game`, `/story`, `/download` (5/5 HTTP 200).

## Visual environment limitation

Browser automation used the already-built artifact and did not trigger another build. System Chromium launch succeeded, but navigation to the local runtime was blocked by host policy:

```text
page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR
```

Therefore browser screenshot/visual review remains `UNVERIFIED_ENV`. No browser visual PASS is claimed.

## Non-claims

- No claim that all described regions/events are publicly playable.
- No production-final art or gameplay-screenshot claim.
- No public game build or production deployment claim.
- No production auth, DB, portal or ops integration claim.

## Next task

`WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26`
