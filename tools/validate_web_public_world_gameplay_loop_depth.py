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
    forbidden_parts = {"node_modules", ".next", ".turbo", "dist", "build", "coverage", ".git"}
    for path in ROOT.rglob("*"):
        if "__pycache__" in path.parts:
            continue
        if forbidden_parts.intersection(path.parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")


def main() -> int:
    for rel in [
        "apps/web/src/app/game/loop/page.tsx",
        "apps/web/src/components/PublicWorldGameplayLoopSections.tsx",
        "docs/execution/WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13.md",
        "docs/execution/checklists/WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-CHECKLIST-v1.13.md",
        "tools/validate_web_public_world_gameplay_loop_depth.py",
    ]:
        require_file(rel)

    for marker in [
        "gameplayLoopStages",
        "beginnerExpectations",
        "guideWorldNavigationLinks",
        "gameplayScopeBoundaries",
        "world-gameplay-loop-depth-started",
        "world-gameplay-loop-guide",
    ]:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker in {"gameplayLoopStages", "beginnerExpectations", "guideWorldNavigationLinks", "gameplayScopeBoundaries"} else "contentEntries")

    for marker in ["GameplayLoopStage", "BeginnerExpectation", "GuideWorldNavigationLink", "GameplayScopeBoundary"]:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    for marker in [
        "GameplayLoopStageBoard",
        "BeginnerExpectationBoard",
        "GuideWorldNavigationBoard",
        "GameplayScopeBoundaryBoard",
        "WorldGameplayLoopCta",
    ]:
        require_text("apps/web/src/components/PublicWorldGameplayLoopSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/game/loop/page.tsx": ["WEB v1.13 world/gameplay loop depth", "GameplayLoopStageBoard", "BeginnerExpectationBoard", "GameplayScopeBoundaryBoard"],
        "apps/web/src/app/page.tsx": ["WEB v1.13 world gameplay loop depth", "WorldGameplayLoopCta", "BeginnerExpectationBoard"],
        "apps/web/src/app/start/page.tsx": ["WEB v1.13 world loop depth", "WorldGameplayLoopCta", "BeginnerExpectationBoard"],
        "apps/web/src/app/game/page.tsx": ["WEB v1.13 world gameplay loop depth", "GameplayLoopStageBoard", "GameplayScopeBoundaryBoard"],
        "apps/web/src/app/guides/page.tsx": ["WEB v1.13 world gameplay loop depth", "world-gameplay-loop-guide", "GuideWorldNavigationBoard"],
        "apps/web/src/app/guides/[slug]/page.tsx": ["WorldGameplayLoopCta"],
        "apps/web/src/app/download/trust/page.tsx": ["WorldGameplayLoopCta"],
        "apps/web/src/app/status/page.tsx": ["WorldGameplayLoopCta"],
        "apps/web/src/app/support/page.tsx": ["WorldGameplayLoopCta"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    sitemap = read("apps/web/src/app/sitemap.ts")
    for route in ["/game/loop", "/guides/world-gameplay-loop-guide"]:
        if route not in sitemap:
            fail(f"sitemap missing {route}")
    nav = read("apps/web/src/components/PublicNavigation.tsx")
    if "/game/loop" not in nav or "World loop" not in nav:
        fail("navigation missing World loop route")

    css = read("apps/web/src/app/globals.css")
    for marker in ["WEB v1.13 public world / gameplay loop depth", "lgo-gameplay-loop-card", "lgo-guide-world-nav-item", "lgo-world-loop-cta"]:
        if marker not in css:
            fail(f"globals.css missing {marker}")

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    for marker, minimum in {
        "playerAction:": 4,
        "expectedFeeling:": 4,
        "currentBoundary:": 4,
        "promiseNow:": 4,
        "notYet:": 4,
        "safeExpectation:": 4,
        "forbiddenClaim:": 4,
    }.items():
        if fixtures.count(marker) < minimum:
            fail(f"expected at least {minimum} {marker} entries")

    for doc in [
        "docs/execution/WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13.md",
        "docs/execution/checklists/WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-CHECKLIST-v1.13.md",
    ]:
        for text in [
            "No production auth",
            "No DB persistence",
            "No CMS",
            "No independent backend",
            "No production deployment",
            "No public game download artifact",
            "No fake download CTA",
            "No placeholder checksum",
            "No portal entitlement backend",
            "No live support ticket",
            "No live community/chat/forum/guild backend",
            "No account-aware personalization",
            "No backend recommendation engine",
            "No combat damage, HP, loot",
            "Runtime/browser/e2e is guardrail only",
        ]:
            require_text(doc, text)

    require_text("docs/execution/WEB-PROJECT-STATE.md", "LGO_WEB_PUBLIC_WORLD_GAMEPLAY_LOOP_DEPTH_READY_v1.13")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-PUBLIC-PLAYER-SAFETY-SUPPORT-FAQ-POLISH-v1.14")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13")
    require_text("docs/execution/WEB-NON-CLAIMS.md", "No combat damage, HP, loot or skill economy claim")

    check_no_forbidden_roots()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC WORLD GAMEPLAY LOOP DEPTH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC WORLD GAMEPLAY LOOP DEPTH VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
