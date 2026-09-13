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

def check_portal_support_page() -> None:
    rel = "apps/portal/src/app/support/page.tsx"
    text = require_text(rel, [
        "BlockedActionButton",
        "Mở case mới chưa khả dụng",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "No production auth",
        "Support fixture only",
    ])
    if "SpiritButton" in text:
        fail(f"{rel}: support blocked action should use shared BlockedActionButton, not SpiritButton")
    if re.search(r"<button[\s\S]*disabled", text) or " disabled" in text:
        fail(f"{rel}: support blocked action must not use native disabled because keyboard users need focus/readability")
    for forbidden in [r"<form\b", r"\bfetch\s*\(", r"\baxios\b", r"['\"]use server['\"]"]:
        if re.search(forbidden, text):
            fail(f"{rel}: forbidden backend/form marker {forbidden}")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-portal-support-blocked-action-v156.spec.ts",
        "docs/execution/specs/WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56.md",
        "LGO-WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-REPORT-v1.56.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-portal-support-blocked-action-v156.spec.ts", [
        "/support",
        "aria-disabled",
        "data-disabled",
        "keyboard focus outline",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "horizontal overflow",
        "font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56.md",
        "LGO-WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-REPORT-v1.56.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56.md",
    ]:
        require_text(rel, [
            "WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56",
            "WEB_CLOSED",
            "aria-disabled",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56 WEB_CLOSED",
        "WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_portal_support_page()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PORTAL SUPPORT BLOCKED ACTION v1.56 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PORTAL SUPPORT BLOCKED ACTION v1.56 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
