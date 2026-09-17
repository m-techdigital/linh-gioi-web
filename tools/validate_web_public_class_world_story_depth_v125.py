#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require_text(rel: str, *needles: str) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing required text: {needle}")

def main() -> int:
    require_text("packages/content/src/types.ts", "battleRhythm", "worldLens", "teamFantasy", "signatureVerbs")
    require_text("packages/content/src/types.ts", "playerPromise", "signatureActivity", "narrativePressure")
    require_text("packages/content/src/types.ts", "openingImage", "stakes", "closingTurn")
    require_text("apps/web/src/components/PublicPlayerHero.tsx", "PublicPlayerHero", "PublicHeroAction")
    require_text("apps/web/src/components/PublicGameDepthSections.tsx", "ClassIdentityDeck", "WorldAtlasStories", "StoryArcTimeline")
    for rel in (
        "apps/web/src/app/start/page.tsx",
        "apps/web/src/app/download/page.tsx",
    ):
        require_text(rel, "PublicPlayerHero")
        if "lgo-hero-kicker" in read(rel):
            fail(f"{rel} duplicates base hero kicker markup instead of PublicPlayerHero")
    # /game v1.266 supersedes the legacy PublicPlayerHero + WorldAtlasStories proof-card flow.
    require_text("apps/web/src/app/game/page.tsx", "PublicWorldLanding", 'variant="immersive"')
    require_text("apps/web/src/components/PublicWorldLanding.tsx", "worldRouteStops", "lgo-world-region-grid")
    # Guides v1.234 composes the same shared ExperienceHero through its new directory owner.
    require_text("apps/web/src/app/guides/page.tsx", "PublicGuidesDiscovery")
    require_text("apps/web/src/components/PublicGuidesDiscovery.tsx", "<ExperienceHero", 'title="Hướng dẫn cho Người Thức Tỉnh"')
    if "lgo-hero-kicker" in read("apps/web/src/components/PublicGuidesDiscovery.tsx"):
        fail("Guides duplicates the shared hero kicker markup")
    if any(symbol in read("apps/web/src/components/PublicGameExperienceSections.tsx") for symbol in ("ClassIdentityDeck", "WorldAtlasStories", "StoryArcTimeline")):
        fail("PublicGameExperienceSections.tsx still owns v1.25 depth components; split them into PublicGameDepthSections.tsx")
    # /journey v1.269 supersedes the legacy PublicPlayerHero + SessionLoopRail proof flow while retaining canonical session/world-route data.
    require_text("apps/web/src/app/journey/page.tsx", "PublicJourneyLanding", 'variant="immersive"')
    require_text("apps/web/src/components/PublicJourneyLanding.tsx", "sampleSessionBeats", "worldRouteStops", "lgo-journey-beat-grid", "lgo-journey-route-grid")
    # /classes v1.268 supersedes the legacy PublicPlayerHero + ClassIdentityDeck proof flow while retaining canonical classPaths depth data.
    require_text("apps/web/src/app/classes/page.tsx", "PublicClassesLanding", 'variant="immersive"')
    require_text("apps/web/src/components/PublicClassesLanding.tsx", "classPaths", "battleRhythm", "worldLens", "signatureVerbs", "lgo-class-selected-feature")
    # /story v1.267 supersedes the legacy PublicPlayerHero + StoryArcTimeline proof flow while retaining canonical narrativeChapters data.
    require_text("apps/web/src/app/story/page.tsx", "PublicStoryLanding", 'variant="immersive"')
    require_text("apps/web/src/components/PublicStoryLanding.tsx", "narrativeChapters", "closingTurn", "lgo-story-chapter-grid")
    require_text("apps/web/src/app/globals.css", "WEB v1.25 class world story depth", "lgo-class-identity-deck", "lgo-world-atlas-stories", "lgo-story-arc-timeline")
    require_text("docs/execution/WEB-PROJECT-STATE.md", "v1.25")
    require_text("HANDOFF-LGO-WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25.md", "WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25")

    if ERRORS:
        print("WEB PUBLIC CLASS WORLD STORY DEPTH v1.25 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC CLASS WORLD STORY DEPTH v1.25 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
