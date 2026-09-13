#!/usr/bin/env python3
from pathlib import Path
import re

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

def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text

def check_public_brand_nav() -> None:
    text = require_text("apps/web/src/components/PublicNavigation.tsx", [
        "export function PublicNavigation",
        "className=\"lgo-brand-nav\"",
        "className=\"lgo-brand-links\"",
        "role=\"region\"",
        "aria-label=\"Public primary route links\"",
        "tabIndex={0}",
        "RouteAwareLink",
    ])
    match = re.search(r"export function PublicNavigation[\s\S]*?\n}\n", text)
    if not match:
        fail("apps/web/src/components/PublicNavigation.tsx: missing PublicNavigation implementation")
    else:
        block = match.group(0)
        for forbidden in ["fetch(", "axios", "<form", "use server"]:
            if forbidden in block:
                fail(f"apps/web/src/components/PublicNavigation.tsx: forbidden marker in PublicNavigation: {forbidden}")
    css = require_text("apps/web/src/app/globals.css", [
        ".lgo-brand-links{overflow-x:auto",
        ".lgo-brand-links:focus-visible",
        "outline-offset: 4px",
        ".lgo-brand-links a{font-size:.84rem}",
    ])
    if "font-size:clamp" in css[css.find(".lgo-brand-links a") : css.find(".lgo-brand-links a") + 220]:
        fail("apps/web/src/app/globals.css: public brand link font-size should stay capped, not viewport-scaled")
    require_text("packages/ui/src/primitives.tsx", [
        "export function SiteNavigation",
        "className=\"lgo-nav\" tabIndex={0}",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-brand-nav-scroll-region-v163.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63.md",
        "LGO-WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-REPORT-v1.63.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-brand-nav-scroll-region-v163.spec.ts", [
        "/classes",
        "/download",
        "Public primary route links",
        "tabIndex",
        "toBeFocused",
        "scrollWidth",
        "clientWidth",
        "overflow-x",
        "font-size",
        "pageOverflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63.md",
        "LGO-WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-REPORT-v1.63.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63",
            "WEB_CLOSED",
            "Public primary route links",
            "keyboard",
            "tabIndex={0}",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63 WEB_CLOSED",
        "WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_public_brand_nav()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC BRAND NAV SCROLL REGION v1.63 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC BRAND NAV SCROLL REGION v1.63 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
