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
        "apps/web/src/components/PublicDetailSections.tsx",
        "apps/web/src/app/news/[slug]/page.tsx",
        "apps/web/src/app/guides/[slug]/page.tsx",
        "docs/execution/WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9.md",
        "docs/execution/checklists/WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-CHECKLIST-v1.9.md",
        "tools/validate_web_public_news_guide_detail_pages.py",
    ]:
        require_file(rel)

    content_markers = [
        "contentDetailSections",
        "guideDetailSteps",
        "downloadExplainers",
        "statusExplainers",
        "news-guide-detail-pages-started",
        "download-readiness-guide",
        "support-and-community-guide",
    ]
    for marker in content_markers:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker not in {"news-guide-detail-pages-started", "download-readiness-guide", "support-and-community-guide"} else "contentEntries")

    for marker in ["ContentDetailSection", "GuideDetailStep", "DownloadExplainer", "StatusExplainer"]:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    for marker in [
        "ArticleDetailDepth",
        "GuideDetailDepth",
        "DownloadExplanationDepth",
        "StatusExplanationDepth",
        "DetailPageNextSteps",
    ]:
        require_text("apps/web/src/components/PublicDetailSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/news/page.tsx": ["WEB v1.9 news detail UX", "contentDetailSections"],
        "apps/web/src/app/news/[slug]/page.tsx": ["WEB v1.9 article detail", "ArticleDetailDepth", "DetailPageNextSteps"],
        "apps/web/src/app/guides/page.tsx": ["WEB v1.9 guide detail UX", "href={`/guides/${entry.slug}`}"],
        "apps/web/src/app/guides/[slug]/page.tsx": ["WEB v1.9 guide detail", "GuideDetailDepth", "generateStaticParams"],
        "apps/web/src/app/download/page.tsx": ["DownloadExplanationDepth", "WEB v1.9 download explanation"],
        "apps/web/src/app/status/page.tsx": ["StatusExplanationDepth", "WEB v1.9 status transparency"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    for marker in ["lgo-article-depth", "lgo-guide-detail-step", "lgo-detail-next-steps", "WEB v1.9 public news / guide detail pages"]:
        require_text("apps/web/src/app/globals.css", marker)

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    if fixtures.count("playerImpact:") < 3:
        fail("expected at least 3 article detail sections with playerImpact")
    if fixtures.count("expectedResult:") < 4:
        fail("expected at least 4 guide detail steps with expectedResult")
    if fixtures.count("blockedScope:") < 8:
        fail("expected guide/detail pages to preserve blocked scope copy")

    sitemap = read("apps/web/src/app/sitemap.ts")
    for route in ["/guides/gate-entry-guide", "/guides/beginner-training-loop-guide", "/guides/download-readiness-guide", "/guides/support-and-community-guide"]:
        if route not in sitemap:
            fail(f"sitemap missing {route}")

    for text in [
        "No production auth",
        "No DB persistence",
        "No CMS",
        "No independent backend",
        "No production deployment",
        "Runtime/browser/e2e is guardrail only",
    ]:
        require_text("docs/execution/WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9.md", text)
        require_text("docs/execution/checklists/WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-CHECKLIST-v1.9.md", text)

    check_no_forbidden_roots()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC NEWS GUIDE DETAIL PAGES VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC NEWS GUIDE DETAIL PAGES VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
