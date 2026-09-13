# WEB v1.25 — Class / World / Story Depth — Design

## Goal
Make Linh Giới Online read like a mature game universe rather than a collection of feature summaries. Deepen the five Lộ, opening world route and three opening story chapters with reusable player-facing editorial sections.

## Creative source
Scenario, world fantasy, class fantasy and player journey remain authoritative for public storytelling. Runtime/game source is used only to prevent unsupported claims.

## Design principles

1. **Five Lộ, five lenses.** Each class needs more than a combat label: battle rhythm, world lens, team fantasy and signature visual language.
2. **Places have emotional jobs.** Each world stop needs a mood, player promise and activity fantasy, not only a map description.
3. **Story has escalation.** Each chapter needs an opening image, stakes, player role and closing turn so the narrative feels cinematic instead of encyclopedic.
4. **Editorial, not wiki.** Reusable cards/rails should feel like a game marketing site, not a database or technical roadmap.
5. **Asset-independent.** Existing approved/development art may decorate sections, but layout must still work when future key art replaces it.
6. **No false availability.** Richer narrative must not imply that every described future system or region is already public/playable.

## Player-facing sections

### Classes
Add a `ClassIdentityDeck` below the existing class grid. Every Lộ exposes:
- battle rhythm;
- world lens;
- team fantasy;
- signature verbs;
- visual language.

Võ keeps the existing development-art spotlight as an art-direction example, not as proof that other classes are less important.

### World
Add a `WorldAtlasStories` section that turns Linh Thành, Đông Môn, Linh Lâm, Cổ Di Tích and Âm Giới into five distinct emotional beats with:
- mood;
- player promise;
- signature activity;
- narrative pressure.

### Story
Upgrade the three opening chapters through `StoryArcTimeline`:
- opening image;
- central stakes;
- player role;
- closing turn / escalation.

## Routes touched
- `/classes`
- `/game`
- `/story`
- shared game-experience sections
- typed content fixtures/types/tests
- styles
- governance/validator/report/handoff

## Non-goals
- no backend/API/auth/DB work;
- no new canonical game contract;
- no claim that all regions/events are currently playable;
- no production-final art requirement;
- no CMS or live content service;
- no new download/public-build promise.

## Verification
- v1.22/v1.23/v1.24 continuity validators;
- new v1.25 content/presentation validator;
- current-state validator;
- workspace lint;
- web TypeScript;
- content tests;
- production build/browser only if environment allows; otherwise explicit `UNVERIFIED_ENV`.
