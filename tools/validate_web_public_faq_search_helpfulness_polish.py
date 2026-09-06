#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")

def main() -> int:
    require_file("apps/web/src/app/support/help/page.tsx")
    require_file("apps/web/src/components/PublicFaqHelpfulnessSections.tsx")
    require_file("docs/execution/WEB-PUBLIC-FAQ-SEARCH-AND-HELPFULNESS-POLISH-v1.21.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-FAQ-SEARCH-AND-HELPFULNESS-POLISH-CHECKLIST-v1.21.md")

    checks = {
        "packages/content/src/types.ts": ["FaqDiscoveryGroup", "FaqHelpfulnessPrompt", "IssueCategoryRoute", "NoSearchBackendNote"],
        "packages/content/src/fixtures.ts": ["faqDiscoveryGroups", "faqHelpfulnessPrompts", "issueCategoryRoutes", "noSearchBackendNotes", "faq-search-helpfulness-polish-started", "faq-search-helpfulness-guide", "No search backend"],
        "packages/content/src/index.ts": ["faqDiscoveryGroups", "faqHelpfulnessPrompts", "issueCategoryRoutes", "noSearchBackendNotes", "FaqDiscoveryGroup"],
        "packages/content/src/content.test.ts": ["keeps WEB v1.21 FAQ search/helpfulness guidance bounded", "faqDiscoveryGroups", "noSearchBackendNotes"],
        "apps/web/src/components/PublicFaqHelpfulnessSections.tsx": ["FaqDiscoveryGroupBoard", "FaqHelpfulnessPromptBoard", "IssueCategoryRouteBoard", "NoSearchBackendNoteBoard", "FaqHelpfulnessCta"],
        "apps/web/src/app/support/help/page.tsx": ["FAQ Help", "FaqDiscoveryGroupBoard", "IssueCategoryRouteBoard", "NoSearchBackendNoteBoard", "static help hub"],
        "apps/web/src/app/support/page.tsx": ["FaqHelpfulnessCta", "FaqDiscoveryGroupBoard", "NoSearchBackendNoteBoard"],
        "apps/web/src/app/support/safety/page.tsx": ["IssueCategoryRouteBoard", "NoSearchBackendNoteBoard"],
        "apps/web/src/app/release/tester-pack/page.tsx": ["FaqDiscoveryGroupBoard", "IssueCategoryRouteBoard"],
        "apps/web/src/app/status/page.tsx": ["NoSearchBackendNoteBoard", "FaqHelpfulnessCta"],
        "apps/web/src/app/sitemap.ts": ["/support/help", "/guides/faq-search-helpfulness-guide"],
        "apps/web/src/components/PublicNavigation.tsx": ["/support/help", "FAQ help"],
        "apps/web/src/app/globals.css": ["WEB v1.21 FAQ search/helpfulness polish", "lgo-faq-helpfulness-cta", "lgo-issue-category-item"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21", "/support/help"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-SUPPORT-SELF-SERVE-PATHS-v1.22", "live search backend"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No live search backend", "No AI support bot", "No ticket routing backend"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)

    forbidden = [
        "search backend enabled",
        "ai support bot enabled",
        "create ticket now",
        "submit password",
        "enter token",
        "upload payment",
        "guaranteed support",
        "live chat support"
    ]
    for rel in [
        "packages/content/src/fixtures.ts",
        "apps/web/src/app/support/help/page.tsx",
        "apps/web/src/components/PublicFaqHelpfulnessSections.tsx"
    ]:
        text = read(rel).lower()
        for marker in forbidden:
            if marker in text:
                fail(f"{rel} contains forbidden FAQ/helpfulness marker: {marker}")

    if ERRORS:
        print("WEB PUBLIC FAQ SEARCH HELPFULNESS VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1

    print("WEB PUBLIC FAQ SEARCH HELPFULNESS VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
