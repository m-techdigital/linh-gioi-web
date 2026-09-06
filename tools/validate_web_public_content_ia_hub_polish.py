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


def check_no_app_api_routes() -> None:
    apps = ROOT / "apps"
    if not apps.exists():
        return
    for path in apps.glob("*/src/app/api"):
        if path.exists():
            fail(f"forbidden app/api route present: {path.relative_to(ROOT)}")


def check_no_generated_artifacts() -> None:
    forbidden_parts = {"node_modules", ".next", ".turbo", "dist", "build", "coverage", ".git"}
    for path in ROOT.rglob("*"):
        if "__pycache__" in path.parts:
            continue
        if forbidden_parts.intersection(path.parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")


def main() -> int:
    for rel in [
        "apps/web/src/components/PublicContentHubSections.tsx",
        "apps/web/src/app/start/page.tsx",
        "docs/execution/WEB-PUBLIC-CONTENT-IA-HUB-POLISH-v1.12.md",
        "docs/execution/checklists/WEB-PUBLIC-CONTENT-IA-HUB-POLISH-CHECKLIST-v1.12.md",
        "tools/validate_web_public_content_ia_hub_polish.py",
    ]:
        require_file(rel)

    for marker in [
        "publicContentHubs",
        "playerEntryQuestions",
        "publicRouteGroups",
        "content-ia-hub-polish-started",
        "start-here-content-hub-guide",
    ]:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker in {"publicContentHubs", "playerEntryQuestions", "publicRouteGroups"} else "contentEntries")

    for marker in ["PublicContentHub", "PlayerEntryQuestion", "PublicRouteGroup", "ContentHubRoute"]:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    for marker in [
        "PublicContentHubBoard",
        "PlayerEntryQuestionBoard",
        "PublicRouteGroupBoard",
        "ContentIaStartCta",
    ]:
        require_text("apps/web/src/components/PublicContentHubSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/start/page.tsx": ["WEB v1.12 content IA hub", "PublicContentHubBoard", "PlayerEntryQuestionBoard", "PublicRouteGroupBoard"],
        "apps/web/src/app/page.tsx": ["WEB v1.12 content IA hub", "ContentIaStartCta", "PlayerEntryQuestionBoard", "href=\"/start\""],
        "apps/web/src/app/guides/page.tsx": ["WEB v1.12 content IA hub", "start-here-content-hub-guide", "ContentIaStartCta"],
        "apps/web/src/app/news/page.tsx": ["WEB v1.12 content IA hub", "ContentIaStartCta"],
        "apps/web/src/app/community/page.tsx": ["WEB v1.12 content IA hub", "ContentIaStartCta"],
        "apps/web/src/app/roadmap/page.tsx": ["WEB v1.12 content IA grouping", "PublicRouteGroupBoard"],
        "apps/web/src/app/download/page.tsx": ["ContentIaStartCta"],
        "apps/web/src/app/download/trust/page.tsx": ["ContentIaStartCta"],
        "apps/web/src/app/status/page.tsx": ["ContentIaStartCta"],
        "apps/web/src/app/support/page.tsx": ["ContentIaStartCta"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    sitemap = read("apps/web/src/app/sitemap.ts")
    for route in ["/start", "/guides/start-here-content-hub-guide"]:
        if route not in sitemap:
            fail(f"sitemap missing {route}")

    nav = read("apps/web/src/components/PublicNavigation.tsx")
    if "Bắt đầu" not in nav or "/start" not in nav:
        fail("public navigation missing Start hub")

    css = read("apps/web/src/app/globals.css")
    for marker in ["WEB v1.12 public content IA / hub discoverability polish", "lgo-content-hub-card", "lgo-entry-question-item", "lgo-route-group-card"]:
        if marker not in css:
            fail(f"globals.css missing {marker}")

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    counts = {
        "primaryRoute:": 4,
        "secondaryRoutes:": 4,
        "recommendedRoute:": 4,
        "readerOutcome:": 4,
        "blockedClaim:": 4,
        "avoidExpectation:": 4,
    }
    for marker, minimum in counts.items():
        if fixtures.count(marker) < minimum:
            fail(f"expected at least {minimum} {marker} entries")

    for doc in [
        "docs/execution/WEB-PUBLIC-CONTENT-IA-HUB-POLISH-v1.12.md",
        "docs/execution/checklists/WEB-PUBLIC-CONTENT-IA-HUB-POLISH-CHECKLIST-v1.12.md",
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
            "No live community/chat/forum/guild backend",
            "No live support ticket",
            "No fake waitlist",
            "No account-aware personalization",
            "No backend recommendation engine",
            "Runtime/browser/e2e is guardrail only",
        ]:
            require_text(doc, text)

    require_text("docs/execution/WEB-PROJECT-STATE.md", "LGO_WEB_PUBLIC_CONTENT_IA_HUB_POLISH_READY_v1.12")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "WEB-PUBLIC-CONTENT-IA-HUB-POLISH-v1.12")
    require_text("docs/execution/WEB-NON-CLAIMS.md", "No account-aware personalization")
    require_text("docs/execution/WEB-NON-CLAIMS.md", "No backend recommendation engine")

    check_no_forbidden_roots()
    check_no_app_api_routes()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC CONTENT IA HUB POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC CONTENT IA HUB POLISH VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
