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
    require_file("apps/web/src/app/release/readiness/page.tsx")
    require_file("apps/web/src/components/PublicReleaseReadinessHubSections.tsx")
    require_file("docs/execution/WEB-PUBLIC-RELEASE-READINESS-HUB-POLISH-v1.19.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-RELEASE-READINESS-HUB-POLISH-CHECKLIST-v1.19.md")
    checks = {
        "packages/content/src/types.ts": ["ReleaseReadinessHubItem", "OwnerReleaseGate", "TesterExpectationCopy", "ReleaseSurfaceAlignment"],
        "packages/content/src/fixtures.ts": ["releaseReadinessHubItems", "ownerReleaseGates", "testerExpectationCopy", "releaseSurfaceAlignment", "release-readiness-hub-polish-started", "release-readiness-hub-guide", "No public build", "No fake download CTA"],
        "packages/content/src/index.ts": ["releaseReadinessHubItems", "ownerReleaseGates", "testerExpectationCopy", "releaseSurfaceAlignment"],
        "packages/content/src/content.test.ts": ["keeps WEB v1.19 release readiness hub bounded", "releaseReadinessHubItems", "ownerReleaseGates"],
        "apps/web/src/components/PublicReleaseReadinessHubSections.tsx": ["ReleaseReadinessHubBoard", "OwnerReleaseGateBoard", "TesterExpectationCopyBoard", "ReleaseSurfaceAlignmentBoard", "ReleaseReadinessHubCta"],
        "apps/web/src/app/release/readiness/page.tsx": ["Release readiness", "OwnerReleaseGateBoard", "TesterExpectationCopyBoard", "No public build"],
        "apps/web/src/app/globals.css": ["WEB v1.19 release readiness hub", "lgo-release-readiness-cta", "lgo-release-surface-item"],
        "apps/web/src/components/PublicNavigation.tsx": ["/release/readiness", "Readiness"],
        "apps/web/src/app/sitemap.ts": ["/release/readiness", "/guides/release-readiness-hub-guide"],
        "apps/web/src/app/page.tsx": ["WEB v1.19 release readiness", "ReleaseReadinessHubCta"],
        "apps/web/src/app/start/page.tsx": ["ReleaseReadinessHubCta", "OwnerReleaseGateBoard"],
        "apps/web/src/app/release/page.tsx": ["ReleaseReadinessHubCta", "ReleaseReadinessHubBoard"],
        "apps/web/src/app/download/page.tsx": ["ReleaseReadinessHubCta", "ReleaseSurfaceAlignmentBoard"],
        "apps/web/src/app/status/page.tsx": ["ReleaseReadinessHubCta", "ReleaseSurfaceAlignmentBoard"],
        "apps/web/src/app/support/safety/page.tsx": ["ReleaseReadinessHubCta", "TesterExpectationCopyBoard"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_RELEASE_READINESS_HUB_POLISH_READY_v1.19"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-CLOSED-TESTER-INFORMATION-PACK-v1.20", "WEB-08-GAME-CONTRACT-SYNC-v1.0"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No public build", "No open beta", "No closed-test entitlement automation", "No live tester intake"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)
    forbidden = ["join open beta", "download now", "claim tester slot", "entitlement enabled", "public build available", "submit ticket now"]
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/release/readiness/page.tsx", "apps/web/src/components/PublicReleaseReadinessHubSections.tsx"]:
        text = read(rel).lower()
        for marker in forbidden:
            if marker in text:
                fail(f"{rel} contains forbidden release readiness marker: {marker}")
    if ERRORS:
        print("WEB PUBLIC RELEASE READINESS HUB VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1
    print("WEB PUBLIC RELEASE READINESS HUB VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
