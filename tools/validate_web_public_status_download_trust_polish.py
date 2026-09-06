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
        "apps/web/src/components/PublicTrustSections.tsx",
        "apps/web/src/app/download/trust/page.tsx",
        "docs/execution/WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-v1.10.md",
        "docs/execution/checklists/WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-CHECKLIST-v1.10.md",
        "tools/validate_web_public_status_download_trust_polish.py",
    ]:
        require_file(rel)

    content_markers = [
        "downloadTrustGates",
        "releaseEvidenceRequirements",
        "statusTrustSurfaces",
        "playerSupportExpectations",
        "status-download-trust-polish-started",
        "release-trust-and-checksum-guide",
    ]
    for marker in content_markers:
        require_text("packages/content/src/fixtures.ts", marker)
        require_text("packages/content/src/index.ts", marker if marker not in {"status-download-trust-polish-started", "release-trust-and-checksum-guide"} else "contentEntries")

    for marker in [
        "DownloadTrustGate",
        "ReleaseEvidenceRequirement",
        "StatusTrustSurface",
        "PlayerSupportExpectation",
    ]:
        require_text("packages/content/src/types.ts", marker)
        require_text("packages/content/src/index.ts", marker)

    for marker in [
        "DownloadTrustGateBoard",
        "ReleaseEvidenceChecklist",
        "StatusTrustBoard",
        "PlayerSupportExpectationBoard",
        "DownloadTrustCta",
    ]:
        require_text("apps/web/src/components/PublicTrustSections.tsx", marker)

    page_expectations = {
        "apps/web/src/app/download/page.tsx": ["WEB v1.10 trust polish", "DownloadTrustGateBoard", "ReleaseEvidenceChecklist", "DownloadTrustCta"],
        "apps/web/src/app/download/trust/page.tsx": ["WEB v1.10 download trust", "No fake download", "ReleaseEvidenceChecklist", "StatusTrustBoard"],
        "apps/web/src/app/status/page.tsx": ["WEB v1.10 status trust transparency", "StatusTrustBoard"],
        "apps/web/src/app/support/page.tsx": ["WEB v1.10 support expectation trust", "PlayerSupportExpectationBoard"],
        "apps/web/src/app/page.tsx": ["DownloadTrustCta"],
        "apps/web/src/app/guides/[slug]/page.tsx": ["GuideDetailDepth"],
    }
    for rel, markers in page_expectations.items():
        for marker in markers:
            require_text(rel, marker)

    sitemap = read("apps/web/src/app/sitemap.ts")
    for route in ["/download/trust", "/guides/release-trust-and-checksum-guide"]:
        if route not in sitemap:
            fail(f"sitemap missing {route}")

    css = read("apps/web/src/app/globals.css")
    for marker in ["WEB v1.10 public status / download trust polish", "lgo-trust-card", "lgo-release-evidence-item", "lgo-support-expectation-item"]:
        if marker not in css:
            fail(f"globals.css missing {marker}")

    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)\n\];\n\nexport const downloadBuilds", fixtures)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    if fixtures.count("mustNotClaim:") < 4:
        fail("expected download trust gates to include at least 4 mustNotClaim entries")
    if fixtures.count("requiredEvidence:") < 4:
        fail("expected release evidence requirements to include at least 4 requiredEvidence entries")
    if fixtures.count("forbiddenClaim:") < 4:
        fail("expected status trust surfaces to include at least 4 forbiddenClaim entries")
    if fixtures.count("notAvailable:") < 4:
        fail("expected support expectations to include at least 4 notAvailable entries")

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
        "Runtime/browser/e2e is guardrail only",
    ]:
        require_text("docs/execution/WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-v1.10.md", text)
        require_text("docs/execution/checklists/WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-CHECKLIST-v1.10.md", text)

    require_text("docs/execution/WEB-PROJECT-STATE.md", "LGO_WEB_PUBLIC_STATUS_DOWNLOAD_TRUST_POLISH_READY_v1.10")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-PUBLIC-COMMUNITY-ROADMAP-ONBOARDING-v1.11")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-v1.10")
    require_text("docs/execution/WEB-NON-CLAIMS.md", "No fake download CTA")

    check_no_forbidden_roots()
    check_no_app_api_routes()
    check_no_generated_artifacts()

    if ERRORS:
        print("WEB PUBLIC STATUS DOWNLOAD TRUST POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC STATUS DOWNLOAD TRUST POLISH VALIDATION PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
