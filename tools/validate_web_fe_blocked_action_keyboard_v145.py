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

def check_shared_component() -> None:
    primitives = require_text("packages/ui/src/primitives.tsx", [
        "BlockedActionButton",
        "aria-disabled",
        "data-disabled",
        "aria-describedby",
        "lgo-blocked-action-help",
    ])
    match = re.search(r"export function BlockedActionButton[\s\S]*?\n}\n", primitives)
    if match and re.search(r"\sdisabled(?:=|\s|>)", match.group(0)):
        fail("BlockedActionButton must not use native disabled because keyboard users need focus/readability")
    require_text("packages/ui/src/index.ts", ["BlockedActionButton"])
    require_text("packages/ui/src/shell.css", [
        '.lgo-button[aria-disabled="true"]',
        ".lgo-blocked-action-help",
        "cursor: not-allowed",
    ])

def check_portal_routes() -> None:
    for rel, label in [
        ("apps/portal/src/app/login/page.tsx", "Đăng nhập chưa khả dụng"),
        ("apps/portal/src/app/register/page.tsx", "Đăng ký chưa khả dụng"),
        ("apps/portal/src/app/recovery/page.tsx", "Khôi phục chưa khả dụng"),
    ]:
        text = require_text(rel, [
            "BlockedActionButton",
            label,
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "No production auth",
        ])
        if "<SpiritButton type=\"button\" disabled" in text:
            fail(f"{rel}: still uses native disabled SpiritButton for blocked action")
        for forbidden in [r"<form\b", r"\bfetch\s*\(", r"\baxios\b", r"['\"]use server['\"]"]:
            if re.search(forbidden, text):
                fail(f"{rel}: forbidden backend/form marker {forbidden}")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-blocked-action-keyboard-v145.spec.ts",
        "docs/execution/specs/WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45.md",
        "LGO-WEB-FE-BLOCKED-ACTION-KEYBOARD-REPORT-v1.45.md",
        "HANDOFF-LGO-WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-blocked-action-keyboard-v145.spec.ts", [
        "aria-disabled",
        "data-disabled",
        "keyboard focus",
        "horizontal overflow",
        "font-size",
        "/login",
        "/register",
        "/recovery",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45.md",
        "LGO-WEB-FE-BLOCKED-ACTION-KEYBOARD-REPORT-v1.45.md",
        "HANDOFF-LGO-WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45.md",
    ]:
        require_text(rel, [
            "WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45",
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
        "Current phase: WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45 WEB_CLOSED",
        "WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_component()
    check_portal_routes()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE BLOCKED ACTION KEYBOARD v1.45 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE BLOCKED ACTION KEYBOARD v1.45 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
