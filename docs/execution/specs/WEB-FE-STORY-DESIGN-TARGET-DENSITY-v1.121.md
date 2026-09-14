# WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121

Status: WEB_CLOSED

## Lifecycle

SELECT: WEB-NEXT-ACTION v1.121 selected the next visible FE/UI alignment issue after `/game`: `/story` still used only the broad Public Core target and pushed opening chapter cards below the first desktop fold.

SPEC_LOCK: `/story` must receive a page-specific `Public Story` design target before layout changes. Runtime `/story` must expose that target and keep chapter cards plus the story arc close to the first fold while preserving mobile readability.

DESIGN_TARGET_ATTACH_OR_CREATE: Design Target First completed. Created `story-detailed-design-target-v1121.png` with built-in image_gen and mirrored it under `docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png`.

IMPLEMENT: `/story` now uses `lgo-storypage-stack`, runtime design target routing returns `Public Story`, desktop CSS compacts the story hero and chapter section, and section order follows the target: hero, chapters, story arc, then reference art.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_story_design_target_density_v1121.py` checks target files, registry, runtime target attachment, section ordering, CSS markers, docs, state and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-story-design-target-density-v1121.spec.ts` verifies `Public Story` attachment, target href, h1 scale, horizontal overflow, desktop chapter-card visibility, desktop story-arc placement and mobile hero bounds.

VISUAL_REVIEW: The generated target shows the story hero with opening chapter cards entering the first board. Runtime now follows that direction instead of placing the reference board before the chapter cards.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate primitives. It reuses `Stack`, `PublicPlayerHero`, `NarrativeChapterGrid`, `StoryArcTimeline`, `CinematicWorldScene`, `StatusBadge` and shared design target reference infrastructure. `lgo-storypage-stack` is page-specific density tuning for `/story` because the target is page-specific.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout evidence only and does not claim quest state, player progress, portal event simulation or production game server readiness.


Verification marker: fold density.
