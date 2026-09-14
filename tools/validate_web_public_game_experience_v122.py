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
    required_files = [
        "apps/web/src/components/PublicGameExperienceSections.tsx",
        "apps/web/src/app/classes/page.tsx",
        "apps/web/src/app/story/page.tsx",
        "docs/execution/WEB-PUBLIC-GAME-EXPERIENCE-BRAND-REALIGNMENT-v1.22.md",
        "HANDOFF-LGO-WEB-PUBLIC-GAME-EXPERIENCE-BRAND-REALIGNMENT-v1.22.md",
    ]
    for rel in required_files:
        if not (ROOT / rel).is_file():
            fail(f"missing file: {rel}")

    require_text("packages/content/src/fixtures.ts", "gameExperiencePillars", "classPaths", "worldRouteStops", "narrativeChapters", "sampleSessionBeats")
    require_text("apps/web/src/app/page.tsx", "Sống một đời khác trong Linh Giới", "ShadowInvasionFeature")
    homepage_world = read("apps/web/src/app/page.tsx")
    if "ClassPathGrid" not in homepage_world and "HomeDiscoveryShowcase" not in homepage_world:
        fail("apps/web/src/app/page.tsx must keep a player-facing class discovery entry")
    if not any(marker in homepage_world for marker in ["WorldRouteJourney", "WorldPanoramaBand", "HomeDiscoveryShowcase"]):
        fail("apps/web/src/app/page.tsx must keep a player-facing world-route presentation")
    require_text("apps/web/src/app/game/page.tsx", "Linh Thành", "WorldRouteJourney", "GamePillarGrid")
    require_text("apps/web/src/app/classes/page.tsx", "Năm Lộ", "ClassPathGrid")
    require_text("apps/web/src/app/story/page.tsx", "Vết Nứt Đông Môn", "NarrativeChapterGrid")
    require_text("apps/web/src/app/journey/page.tsx", "20 phút", "SessionLoopRail")
    require_text("apps/web/src/components/PublicNavigation.tsx", "/classes", "/story", "Lộ", "Cốt truyện")
    require_text("apps/web/src/app/layout.tsx", "MMORPG hành động cộng đồng 2D", "Linh Thành")
    require_text("apps/web/src/app/sitemap.ts", '"/classes"', '"/story"')
    require_text("apps/web/src/app/globals.css", "WEB v1.22 public game experience", "lgo-cinematic-hero", "lgo-class-path-grid", "lgo-world-route")

    homepage = read("apps/web/src/app/page.tsx")
    banned_home_markers = [
        "Public RC · WEB v1.20",
        "WEB v1.16 performance/copy budget",
        "WEB v1.15 accessibility/readability",
        "Runtime/browser E2E",
    ]
    for marker in banned_home_markers:
        if marker in homepage:
            fail(f"homepage still leads with internal web-program marker: {marker}")

    if ERRORS:
        print("WEB PUBLIC GAME EXPERIENCE v1.22 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC GAME EXPERIENCE v1.22 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
