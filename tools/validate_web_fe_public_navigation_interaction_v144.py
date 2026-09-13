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

def check_shared_route_link() -> None:
    link = require_text("packages/ui/src/route-aware-link.tsx", [
        '"use client"',
        "RouteAwareLink",
        "aria-current",
        "data-current",
        "popstate",
        "hashchange",
        "startsWith",
    ])
    if "next/navigation" in link:
        fail("route-aware link must not depend on Next.js routing")
    require_text("packages/ui/src/workspace-navigation.tsx", [
        "RouteAwareLink",
        "currentWhen=\"section\"",
    ])
    require_text("packages/ui/src/index.ts", [
        'export { RouteAwareLink } from "./route-aware-link"',
        'export type { RouteAwareLinkProps } from "./route-aware-link"',
    ])

def check_public_navigation() -> None:
    require_text("apps/web/src/components/PublicNavigation.tsx", [
        "RouteAwareLink",
        "currentWhen=\"section\"",
        "currentWhen=\"exact\"",
        "lgo-nav-play",
    ])
    css = require_text("apps/web/src/app/globals.css", [
        '.lgo-brand-links a[aria-current="page"]',
        '.lgo-nav-play[aria-current="page"]',
        "outline-offset",
    ])
    if re.search(r"\.lgo-brand-links a:focus-visible\s*\{[^}]*outline:\s*none", css, re.S):
        fail("public nav focus-visible must not remove outline")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-navigation-interaction-v144.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44.md",
        "LGO-WEB-FE-PUBLIC-NAVIGATION-INTERACTION-REPORT-v1.44.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-navigation-interaction-v144.spec.ts", [
        "aria-current",
        "data-current",
        "skip link",
        "font-size",
        "horizontal overflow",
        "/classes",
        "/download",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44.md",
        "LGO-WEB-FE-PUBLIC-NAVIGATION-INTERACTION-REPORT-v1.44.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44",
            "WEB_CLOSED",
            "aria-current",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44 WEB_CLOSED",
        "WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.45",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_route_link()
    check_public_navigation()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC NAVIGATION INTERACTION v1.44 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC NAVIGATION INTERACTION v1.44 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
