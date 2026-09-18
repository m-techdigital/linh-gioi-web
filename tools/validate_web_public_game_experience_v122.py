#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
from web_fixture_source import fixture_source
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def read(rel: str) -> str:
    if rel == "packages/content/src/fixtures.ts": return fixture_source(ROOT)
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
        "apps/web/src/components/PublicClassesLanding.tsx",
        "apps/web/src/app/story/page.tsx",
        "apps/web/src/components/PublicStoryLanding.tsx",
        "apps/web/src/components/PublicJourneyLanding.tsx",
        "docs/execution/WEB-PUBLIC-GAME-EXPERIENCE-BRAND-REALIGNMENT-v1.22.md",
        "HANDOFF-LGO-WEB-PUBLIC-GAME-EXPERIENCE-BRAND-REALIGNMENT-v1.22.md",
    ]
    for rel in required_files:
        if not (ROOT / rel).is_file():
            fail(f"missing file: {rel}")

    require_text("packages/content/src/fixtures.ts", "gameExperiencePillars", "classPaths", "worldRouteStops", "narrativeChapters", "sampleSessionBeats")
    require_text("apps/web/src/app/page.tsx", "PublicHomeLanding")
    require_text("apps/web/src/components/PublicHomeLanding.tsx", "Sống một đời khác trong Linh Giới", 'href: "/game"', 'href: "/classes"', 'href: "/story"', "MediaMosaic")
    require_text("apps/web/src/app/game/page.tsx", "PublicWorldLanding", "variant=\"immersive\"")
    require_text("apps/web/src/components/PublicWorldLanding.tsx", "Linh Thành", "Đông Môn", "Linh Lâm", "Cổ Di Tích", "Âm Giới", "worldRouteStops")
    require_text("apps/web/src/app/classes/page.tsx", "PublicClassesLanding", "variant=\"immersive\"")
    require_text("apps/web/src/components/PublicClassesLanding.tsx", "classPaths", "Chọn cách bạn bảo vệ Linh Giới", "lgo-class-choice-grid")
    require_text("apps/web/src/app/story/page.tsx", "PublicStoryLanding", "variant=\"immersive\"")
    require_text("apps/web/src/components/PublicStoryLanding.tsx", "Vết Nứt Đông Môn", "narrativeChapters", "lgo-story-chapter-grid")
    require_text("apps/web/src/app/journey/page.tsx", "PublicJourneyLanding", 'variant="immersive"')
    require_text("apps/web/src/components/PublicJourneyLanding.tsx", "sampleSessionBeats", "worldRouteStops", "20 phút không chỉ để đánh quái", "lgo-journey-beat-grid")
    require_text("apps/web/src/components/PublicNavigation.tsx", "/classes", "/game/loop", "Lộ phái", "Tính năng", "Tin tức")
    require_text("packages/content/src/public-metadata.ts", "MMORPG hành động cộng đồng 2D", "Linh Thành")
    require_text("packages/content/src/public-ia.ts", 'route("/classes"', 'route("/story"')
    require_text("apps/web/src/app/sitemap.ts", "publicRouteMatrix")
    require_text("apps/web/src/app/globals.css", "WEB v1.22 public game experience", "lgo-cinematic-hero", "lgo-class-path-grid", "lgo-world-route")

    homepage = read("apps/web/src/app/page.tsx") + read("apps/web/src/components/PublicHomeLanding.tsx")
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
