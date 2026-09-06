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
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")


def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")


def require_text(rel: str, text: str) -> None:
    if text not in read(rel):
        fail(f"{rel} missing required text: {text}")


def check_no_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")


def check_no_generated_artifacts() -> None:
    forbidden = {"node_modules", ".next", ".turbo", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        parts = set(path.parts)
        if "__pycache__" in parts:
            continue
        if forbidden.intersection(parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")


def main() -> int:
    for rel in [
        "apps/web/src/app/page.tsx",
        "apps/web/src/app/game/page.tsx",
        "apps/web/src/app/roadmap/page.tsx",
        "apps/web/src/app/community/page.tsx",
        "apps/web/src/app/download/page.tsx",
        "apps/web/src/app/support/page.tsx",
        "apps/web/src/components/PublicNavigation.tsx",
        "apps/web/src/app/sitemap.ts",
        "packages/content/src/types.ts",
        "packages/content/src/fixtures.ts",
        "packages/content/src/index.ts",
        "docs/execution/WEB-PUBLIC-UX-CONTENT-POLISH-v1.6.md",
        "docs/execution/checklists/WEB-PUBLIC-UX-CONTENT-POLISH-CHECKLIST-v1.6.md",
    ]:
        require_file(rel)

    for text in ["/roadmap", "/community", "/download", "/support"]:
        require_text("apps/web/src/components/PublicNavigation.tsx", text)
        require_text("apps/web/src/app/sitemap.ts", text)

    for text in ["publicHeroStats", "worldPillars", "playerJourneySteps", "downloadReadiness", "supportTopics", "publicRoadmapItems"]:
        require_text("packages/content/src/fixtures.ts", text)
        require_text("packages/content/src/index.ts", text)

    for text in ["WEB v1.6 content polish", "Người chơi nên đi qua web theo luồng nào", "Không claim production auth"]:
        require_text("apps/web/src/app/page.tsx", text)

    for text in ["Spirit Gate", "Gate Keeper", "Training Stone"]:
        require_text("apps/web/src/app/game/page.tsx", text)

    for text in ["Download readiness checklist", "No public production download is available"]:
        require_text("apps/web/src/app/download/page.tsx", text)

    for text in ["Roadmap phát triển web", "WEB-08", "no production auth"]:
        require_text("apps/web/src/app/roadmap/page.tsx", text)

    for text in ["Cộng đồng Linh Giới", "Chưa có chat, forum, guild"]:
        require_text("apps/web/src/app/community/page.tsx", text)

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    if "public-ux-content-polish-started" not in slugs:
        fail("missing v1.6 public UX content fixture")

    for rel in [
        "docs/execution/WEB-PUBLIC-UX-CONTENT-POLISH-v1.6.md",
        "docs/execution/checklists/WEB-PUBLIC-UX-CONTENT-POLISH-CHECKLIST-v1.6.md",
    ]:
        for text in ["No production auth", "No DB persistence", "No CMS", "No independent backend", "No production deployment"]:
            require_text(rel, text)

    check_no_forbidden_roots()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC UX CONTENT POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC UX CONTENT POLISH VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
