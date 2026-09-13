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

def check_shared_interaction_source() -> None:
    nav = require_text("packages/ui/src/workspace-navigation.tsx", [
        '"use client"',
        "WorkspaceNavigation",
        "WorkspaceShellNavItem",
        "aria-current",
        "data-current",
        "popstate",
        "hashchange",
        "startsWith",
    ])
    if "next/navigation" in nav:
        fail("workspace navigation must not depend on Next.js routing")
    primitives = require_text("packages/ui/src/primitives.tsx", [
        'import { WorkspaceNavigation } from "./workspace-navigation"',
        'id="workspace-content"',
        'tabIndex={-1}',
        'href="#workspace-content"',
    ])
    if re.search(r"export function WorkspaceNavigation\s*\(", primitives):
        fail("WorkspaceNavigation should be owned by packages/ui/src/workspace-navigation.tsx")
    require_text("packages/ui/src/index.ts", [
        'export { WorkspaceNavigation } from "./workspace-navigation"',
        'export type { WorkspaceShellNavItem } from "./workspace-navigation"',
    ])
    require_text("packages/ui/src/shell.css", [
        ".lgo-workspace-skip:focus-visible",
        '.lgo-workspace-nav a[aria-current="page"]',
        '.lgo-workspace-nav a[data-current="page"]',
        "outline-offset",
    ])

def check_app_nav_scope() -> None:
    require_text("apps/portal/src/app/layout.tsx", [
        '{ href: "/account", label: "Tài khoản" }',
        '{ href: "/journey", label: "Hành trình" }',
    ])
    require_text("apps/ops/src/app/layout.tsx", [
        '{ href: "/security-governance", label: "Governance", badge: "fixture" }',
        "NO_REAL_OPS_MUTATION",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-accessibility-interaction-audit-v143.spec.ts",
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43.md",
        "LGO-WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-REPORT-v1.43.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-accessibility-interaction-audit-v143.spec.ts", [
        "aria-current",
        "skip link",
        "keyboard focus",
        "horizontal overflow",
        "font-size",
        "account/security",
        "security-governance",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43.md",
        "LGO-WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-REPORT-v1.43.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43.md",
    ]:
        require_text(rel, [
            "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43",
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
        "Current phase: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43 WEB_CLOSED",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.44",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_interaction_source()
    check_app_nav_scope()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE ACCESSIBILITY INTERACTION AUDIT v1.43 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE ACCESSIBILITY INTERACTION AUDIT v1.43 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
