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
    require_file("apps/web/src/app/accessibility/page.tsx")
    require_file("apps/web/src/components/PublicAccessibilityReadabilitySections.tsx")
    require_file("docs/execution/WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-CHECKLIST-v1.15.md")
    checks = {
        "packages/content/src/types.ts": [
            "AccessibilityReadabilityPrinciple", "RouteReadabilityCheck", "MobileScannabilityRule", "FocusOrderCheckpoint"
        ],
        "packages/content/src/fixtures.ts": [
            "accessibilityReadabilityPrinciples", "routeReadabilityChecks", "mobileScannabilityRules", "focusOrderCheckpoints",
            "accessibility-readability-guide", "accessibility-readability-polish-started", "No formal WCAG audit certification"
        ],
        "packages/content/src/index.ts": [
            "accessibilityReadabilityPrinciples", "routeReadabilityChecks", "mobileScannabilityRules", "focusOrderCheckpoints"
        ],
        "apps/web/src/components/PublicAccessibilityReadabilitySections.tsx": [
            "AccessibilityReadabilityPrincipleBoard", "RouteReadabilityBoard", "MobileScannabilityBoard", "FocusOrderBoard", "AccessibilityReadabilityCta"
        ],
        "apps/web/src/components/PublicSiteShell.tsx": [
            "lgo-skip-link", "#main-content", "id=\"main-content\""
        ],
        "apps/web/src/app/accessibility/page.tsx": [
            "Accessibility và readability cho người chơi mới", "No formal WCAG audit", "no legal compliance claim", "no personal settings backend"
        ],
        "apps/web/src/app/globals.css": [
            "WEB v1.15 accessibility / readability polish", "lgo-skip-link", "focus-visible", "lgo-accessibility-cta"
        ],
        "apps/web/src/app/sitemap.ts": ["/accessibility", "/guides/accessibility-readability-guide"],
        "apps/web/src/components/PublicNavigation.tsx": ["/accessibility", "Dễ đọc"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No formal WCAG audit certification", "No legal accessibility compliance claim", "No personal accessibility settings backend"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/accessibility/page.tsx", "docs/execution/WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15.md"]:
        text = read(rel).lower()
        for forbidden in ["wcag pass", "legally compliant", "certified accessible", "screen-reader certified", "guaranteed accessibility"]:
            if forbidden in text:
                fail(f"{rel} contains forbidden accessibility claim marker: {forbidden}")
    if ERRORS:
        print("WEB PUBLIC ACCESSIBILITY READABILITY POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC ACCESSIBILITY READABILITY POLISH VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
