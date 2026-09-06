#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []


def fail(message: str) -> None:
    ERRORS.append(message)


def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing readable file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")


def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")


def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")


def check_no_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")


def check_no_generated_artifacts() -> None:
    forbidden_parts = {"node_modules", ".next", ".turbo", "dist", "build", "coverage", "__pycache__", ".git"}
    for path in ROOT.rglob("*"):
        if "__pycache__" in path.parts:
            continue
        if forbidden_parts.intersection(path.parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")


def main() -> int:
    for rel in [
        "apps/web/src/components/PublicGameInfoDepthSections.tsx",
        "apps/web/src/app/guides/beginner/page.tsx",
        "docs/execution/WEB-PUBLIC-GAME-INFO-DEPTH-v1.8.md",
        "docs/execution/checklists/WEB-PUBLIC-GAME-INFO-DEPTH-CHECKLIST-v1.8.md",
        "tools/validate_web_public_game_info_depth.py",
    ]:
        require_file(rel)

    content_markers = [
        "worldStoryChapters",
        "beginnerGuideSections",
        "downloadStatusNotes",
        "supportFaqs",
        "communityReadinessSteps",
        "public-game-info-depth-started",
    ]
    for marker in content_markers:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker != "public-game-info-depth-started" else "contentEntries")

    type_markers = ["WorldStoryChapter", "BeginnerGuideSection", "DownloadStatusNote", "SupportFaq", "CommunityReadinessStep"]
    for marker in type_markers:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    component_markers = [
        "WorldStoryDepth",
        "BeginnerGuideDepth",
        "DownloadStatusDepth",
        "SupportFaqDepth",
        "CommunityReadinessDepth",
        "GameInfoDepthCta",
    ]
    for marker in component_markers:
        require_text("apps/web/src/components/PublicGameInfoDepthSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/page.tsx": ["WEB v1.8 game info depth", "WorldStoryDepth", "BeginnerGuideDepth", "GameInfoDepthCta"],
        "apps/web/src/app/game/page.tsx": ["WEB v1.8 game info depth", "WorldStoryDepth", "BeginnerGuideDepth"],
        "apps/web/src/app/download/page.tsx": ["WEB v1.8 download status depth", "DownloadStatusDepth"],
        "apps/web/src/app/support/page.tsx": ["WEB v1.8 support FAQ depth", "SupportFaqDepth"],
        "apps/web/src/app/community/page.tsx": ["WEB v1.8 community readiness", "CommunityReadinessDepth"],
        "apps/web/src/app/guides/page.tsx": ["WEB v1.8 beginner guide", "WorldStoryDepth", "BeginnerGuideDepth"],
        "apps/web/src/app/guides/beginner/page.tsx": ["WEB v1.8 beginner guide", "SupportFaqDepth"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    for marker in ["lgo-story-chapters", "lgo-guide-steps", "lgo-faq-list", "lgo-depth-cta", "WEB v1.8 public game information depth"]:
        require_text("apps/web/src/app/globals.css", marker)

    for text in [
        "No production auth",
        "No DB persistence",
        "No CMS",
        "No independent backend",
        "No production deployment",
        "Runtime/browser/e2e is guardrail only",
    ]:
        require_text("docs/execution/WEB-PUBLIC-GAME-INFO-DEPTH-v1.8.md", text)
        require_text("docs/execution/checklists/WEB-PUBLIC-GAME-INFO-DEPTH-CHECKLIST-v1.8.md", text)

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    if "public-game-info-depth-started" not in slugs:
        fail("missing v1.8 game info content fixture")
    if fixtures.count("nonClaim:") < 4:
        fail("expected world story chapters to preserve non-claim copy")
    if fixtures.count("blockedScope:") < 4:
        fail("expected beginner guide sections to preserve blocked scope copy")

    sitemap = read("apps/web/src/app/sitemap.ts")
    if "/guides/beginner" not in sitemap:
        fail("sitemap missing /guides/beginner")

    check_no_forbidden_roots()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC GAME INFO DEPTH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC GAME INFO DEPTH VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
