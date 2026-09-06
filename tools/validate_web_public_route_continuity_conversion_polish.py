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
    require_file("apps/web/src/app/journey/page.tsx")
    require_file("apps/web/src/components/PublicRouteContinuitySections.tsx")
    require_file("docs/execution/WEB-PUBLIC-ROUTE-CONTINUITY-CONVERSION-POLISH-v1.17.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-ROUTE-CONTINUITY-CONVERSION-POLISH-CHECKLIST-v1.17.md")
    checks = {
        "packages/content/src/types.ts": [
            "RouteContinuityBridge", "ConversionSafeCta", "JourneyFrictionCheck", "PageCohesionCheckpoint"
        ],
        "packages/content/src/fixtures.ts": [
            "routeContinuityBridges", "conversionSafeCtas", "journeyFrictionChecks", "pageCohesionCheckpoints",
            "route-continuity-conversion-guide", "route-continuity-conversion-polish-started", "No fake funnel"
        ],
        "packages/content/src/index.ts": [
            "routeContinuityBridges", "conversionSafeCtas", "journeyFrictionChecks", "pageCohesionCheckpoints"
        ],
        "apps/web/src/components/PublicRouteContinuitySections.tsx": [
            "RouteContinuityBridgeBoard", "ConversionSafeCtaBoard", "JourneyFrictionBoard", "PageCohesionCheckpointBoard", "RouteContinuityCta"
        ],
        "apps/web/src/app/journey/page.tsx": [
            "Journey hub", "No fake funnel", "no public artifact", "no ticket/account backend"
        ],
        "apps/web/src/app/globals.css": [
            "WEB v1.17 route continuity", "lgo-route-continuity-cta", "lgo-journey-friction-item"
        ],
        "apps/web/src/components/PublicNavigation.tsx": ["/journey", "Journey"],
        "apps/web/src/app/sitemap.ts": ["/journey", "/guides/route-continuity-conversion-guide"],
        "apps/web/src/app/page.tsx": ["WEB v1.17 route continuity", "/journey", "RouteContinuityCta"],
        "apps/web/src/app/start/page.tsx": ["/journey", "RouteContinuityCta", "ConversionSafeCtaBoard"],
        "apps/web/src/app/download/page.tsx": ["RouteContinuityCta", "DownloadTrust"],
        "apps/web/src/app/download/trust/page.tsx": ["RouteContinuityCta", "DownloadTrust"],
        "apps/web/src/app/status/page.tsx": ["RouteContinuityCta", "Status"],
        "apps/web/src/app/support/safety/page.tsx": ["RouteContinuityCta", "Safety"],
        "apps/web/src/app/game/loop/page.tsx": ["RouteContinuityCta", "World gameplay loop"],
        "apps/web/src/app/performance/page.tsx": ["RouteContinuityCta", "Journey hub"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_ROUTE_CONTINUITY_CONVERSION_POLISH_READY_v1.17"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-PLAYER-TRUST-RELEASE-NARRATIVE-v1.18", "WEB-08-GAME-CONTRACT-SYNC-v1.0"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No fake conversion funnel", "No production account funnel", "No live entitlement CTA"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)
    forbidden_markers = [
        "create account now", "buy now", "claim reward", "open ticket now",
        "public build available", "production account enabled", "secure ticket inbox enabled"
    ]
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/journey/page.tsx", "apps/web/src/components/PublicRouteContinuitySections.tsx"]:
        text = read(rel).lower()
        for marker in forbidden_markers:
            if marker in text:
                fail(f"{rel} contains forbidden conversion claim marker: {marker}")
    if ERRORS:
        print("WEB PUBLIC ROUTE CONTINUITY CONVERSION POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC ROUTE CONTINUITY CONVERSION POLISH VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
