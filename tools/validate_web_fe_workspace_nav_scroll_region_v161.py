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

def check_shared_nav() -> None:
    text = require_text("packages/ui/src/workspace-navigation.tsx", [
        "export function WorkspaceNavigation",
        "className=\"lgo-workspace-nav\"",
        "aria-label={ariaLabel}",
        "tabIndex={0}",
        "RouteAwareLink",
    ])
    match = re.search(r"export function WorkspaceNavigation[\s\S]*?\n}\n", text)
    if not match:
        fail("packages/ui/src/workspace-navigation.tsx: missing WorkspaceNavigation implementation")
    else:
        block = match.group(0)
        for forbidden in ["fetch(", "axios", "<form", "use server"]:
            if forbidden in block:
                fail(f"packages/ui/src/workspace-navigation.tsx: forbidden marker in WorkspaceNavigation: {forbidden}")
    require_text("packages/ui/src/shell.css", [
        ".lgo-workspace-nav {",
        "overflow-x: auto",
        ".lgo-workspace-nav:focus-visible",
        "outline-offset",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-workspace-nav-scroll-region-v161.spec.ts",
        "docs/execution/specs/WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61.md",
        "LGO-WEB-FE-WORKSPACE-NAV-SCROLL-REGION-REPORT-v1.61.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-workspace-nav-scroll-region-v161.spec.ts", [
        "/support",
        "Tổng quan người chơi",
        "Support triage",
        "Linh Giới navigation",
        "tabIndex",
        "toBeFocused",
        "scrollWidth",
        "clientWidth",
        "overflow-x",
        "font-size",
        "pageOverflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61.md",
        "LGO-WEB-FE-WORKSPACE-NAV-SCROLL-REGION-REPORT-v1.61.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61.md",
    ]:
        require_text(rel, [
            "WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61",
            "WEB_CLOSED",
            "workspace navigation",
            "keyboard",
            "tabIndex={0}",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61 WEB_CLOSED",
        "WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.62",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_nav()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE WORKSPACE NAV SCROLL REGION v1.61 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE WORKSPACE NAV SCROLL REGION v1.61 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
