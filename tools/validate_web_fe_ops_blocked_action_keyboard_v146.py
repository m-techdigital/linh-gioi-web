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

def check_ops_routes() -> None:
    routes = [
        ("apps/ops/src/app/trust-safety/page.tsx", ["Chuyển phê duyệt — chưa khả dụng", "Áp dụng biện pháp — chưa khả dụng"]),
        ("apps/ops/src/app/content-liveops/page.tsx", ["Publish event — blocked", "Rollback — blocked"]),
        ("apps/ops/src/app/support/[id]/page.tsx", ["Assign case — blocked", "Escalate — blocked"]),
        ("apps/ops/src/app/player-operations/[id]/page.tsx", ["Revoke session — blocked", "Unstuck — blocked"]),
        ("apps/ops/src/app/game-operations/[id]/page.tsx", ["Apply operation — blocked"]),
    ]
    for rel, labels in routes:
        text = require_text(rel, [
            "BlockedActionButton",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "NO_REAL_OPS_MUTATION",
        ] + labels)
        if re.search(r"<SpiritButton[^>]*disabled", text):
            fail(f"{rel}: still uses native disabled SpiritButton for blocked action")
        for forbidden in [r"<form\b", r"\bfetch\s*\(", r"\baxios\b", r"['\"]use server['\"]"]:
            if re.search(forbidden, text):
                fail(f"{rel}: forbidden backend/form marker {forbidden}")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-ops-blocked-action-keyboard-v146.spec.ts",
        "docs/execution/specs/WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46.md",
        "LGO-WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-REPORT-v1.46.md",
        "HANDOFF-LGO-WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-ops-blocked-action-keyboard-v146.spec.ts", [
        "aria-disabled",
        "data-disabled",
        "keyboard focus",
        "horizontal overflow",
        "font-size",
        "/trust-safety",
        "/content-liveops",
        "/support/support-fixture-001",
        "/player-operations/fixture-001",
        "/game-operations/world-fixture-001",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46.md",
        "LGO-WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-REPORT-v1.46.md",
        "HANDOFF-LGO-WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46.md",
    ]:
        require_text(rel, [
            "WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46",
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
        "Current phase: WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46 WEB_CLOSED",
        "WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_ops_routes()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE OPS BLOCKED ACTION KEYBOARD v1.46 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE OPS BLOCKED ACTION KEYBOARD v1.46 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
