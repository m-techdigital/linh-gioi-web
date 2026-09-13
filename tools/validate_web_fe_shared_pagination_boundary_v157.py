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

def check_shared_pagination() -> None:
    rel = "packages/ui/src/data.tsx"
    text = require_text(rel, [
        "export function PaginationBar",
        "paginationUnavailableReason",
        "aria-disabled",
        "data-disabled",
        "aria-label",
        "không khả dụng",
    ])
    match = re.search(r"export function PaginationBar[\s\S]*?\n}\n", text)
    if not match:
        fail(f"{rel}: missing PaginationBar implementation")
        return
    block = match.group(0)
    if "disabled={previousDisabled}" in block or "disabled={nextDisabled}" in block:
        fail(f"{rel}: PaginationBar must not use native disabled for boundary controls")
    if block.count("aria-disabled") < 2 or block.count("data-disabled") < 2:
        fail(f"{rel}: PaginationBar should expose aria/data disabled state on both controls")
    for forbidden in ["fetch(", "axios", "<form"]:
        if forbidden in block:
            fail(f"{rel}: forbidden backend/form marker in PaginationBar")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-shared-pagination-boundary-v157.spec.ts",
        "docs/execution/specs/WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57.md",
        "LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REPORT-v1.57.md",
        "HANDOFF-LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-shared-pagination-boundary-v157.spec.ts", [
        "/support",
        "Pagination",
        "aria-disabled",
        "data-disabled",
        "native disabled",
        "keyboard focus outline",
        "horizontal overflow",
        "font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57.md",
        "LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REPORT-v1.57.md",
        "HANDOFF-LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57.md",
    ]:
        require_text(rel, [
            "WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57",
            "WEB_CLOSED",
            "PaginationBar",
            "aria-disabled",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57 WEB_CLOSED",
        "WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_pagination()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE SHARED PAGINATION BOUNDARY v1.57 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE SHARED PAGINATION BOUNDARY v1.57 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
