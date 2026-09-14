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
        "apps/web/src/components/PublicOnboardingSections.tsx",
        "apps/web/src/app/community/onboarding/page.tsx",
        "docs/execution/WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-v1.11.md",
        "docs/execution/checklists/WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-CHECKLIST-v1.11.md",
        "tools/validate_web_public_community_roadmap_onboarding.py",
    ]:
        require_file(rel)

    fixture_markers = [
        "communityOnboardingPaths",
        "communityFeedbackChannels",
        "roadmapDecisionGates",
        "stagedReleaseMessages",
        "community-roadmap-onboarding-started",
        "community-roadmap-onboarding-guide",
    ]
    for marker in fixture_markers:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker not in {"community-roadmap-onboarding-started", "community-roadmap-onboarding-guide"} else "contentEntries")

    for marker in [
        "CommunityOnboardingPath",
        "CommunityFeedbackChannel",
        "RoadmapDecisionGate",
        "StagedReleaseMessage",
    ]:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    for marker in [
        "CommunityOnboardingPathBoard",
        "CommunityFeedbackGuidance",
        "RoadmapDecisionGateBoard",
        "StagedReleaseMessagingBoard",
        "CommunityRoadmapOnboardingCta",
    ]:
        require_text("apps/web/src/components/PublicOnboardingSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/page.tsx": ["WEB v1.11 community roadmap onboarding", "CommunityOnboardingPathBoard", "CommunityRoadmapOnboardingCta"],
        "apps/web/src/app/community/page.tsx": ["WEB v1.149 · cộng đồng", "CommunityFeedbackGuidance", "community/onboarding"],
        "apps/web/src/app/community/onboarding/page.tsx": ["WEB v1.11 community onboarding", "RoadmapDecisionGateBoard", "StagedReleaseMessagingBoard"],
        "apps/web/src/app/roadmap/page.tsx": ["WEB v1.11 roadmap decision gates", "RoadmapDecisionGateBoard", "StagedReleaseMessagingBoard"],
        "apps/web/src/app/support/page.tsx": ["WEB v1.11 community feedback guidance", "CommunityFeedbackGuidance"],
        "apps/web/src/app/status/page.tsx": ["WEB v1.11 staged release messaging", "StagedReleaseMessagingBoard"],
        "apps/web/src/app/download/page.tsx": ["StagedReleaseMessagingBoard"],
        "apps/web/src/app/download/trust/page.tsx": ["WEB v1.11 staged release messaging", "RoadmapDecisionGateBoard"],
        "apps/web/src/app/guides/page.tsx": ["community-roadmap-onboarding-guide", "CommunityRoadmapOnboardingCta"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    sitemap = read("apps/web/src/app/sitemap.ts")
    for route in ["/community/onboarding", "/guides/community-roadmap-onboarding-guide"]:
        if route not in sitemap:
            fail(f"sitemap missing {route}")

    css = read("apps/web/src/app/globals.css")
    for marker in ["WEB v1.11 public community / roadmap onboarding polish", "lgo-onboarding-card", "lgo-feedback-channel", "lgo-roadmap-gate", "lgo-staged-release"]:
        if marker not in css:
            fail(f"globals.css missing {marker}")

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    counts = {
        "firstAction:": 4,
        "whatToShare:": 4,
        "releaseImpact:": 4,
        "ownerChecklist:": 4,
        "mustNotClaim:": 4,
        "blockedExpectation:": 4,
    }
    for marker, minimum in counts.items():
        if fixtures.count(marker) < minimum:
            fail(f"expected at least {minimum} {marker} entries")

    docs = [
        "docs/execution/WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-v1.11.md",
        "docs/execution/checklists/WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-CHECKLIST-v1.11.md",
    ]
    for doc in docs:
        for text in [
            "No production auth",
            "No DB persistence",
            "No CMS",
            "No independent backend",
            "No production deployment",
            "No public game download artifact",
            "No live community/chat/forum/guild backend",
            "No live support ticket",
            "No fake waitlist",
            "Runtime/browser/e2e is guardrail only",
        ]:
            require_text(doc, text)

    require_text("docs/execution/WEB-PROJECT-STATE.md", "LGO_WEB_PUBLIC_COMMUNITY_ROADMAP_ONBOARDING_READY_v1.11")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-PUBLIC-CONTENT-IA-HUB-POLISH-v1.12")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-v1.11")
    require_text("docs/execution/WEB-NON-CLAIMS.md", "No fake waitlist")

    check_no_forbidden_roots()
    check_no_app_api_routes()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC COMMUNITY ROADMAP ONBOARDING VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC COMMUNITY ROADMAP ONBOARDING VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
