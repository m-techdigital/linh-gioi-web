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

def check_shared_pagination_reason() -> None:
    text = require_text("packages/ui/src/data.tsx", [
        "export function PaginationBar",
        "paginationUnavailableReason",
        "useId",
        "paginationReasonId",
        "hasDisabledBoundary",
        "aria-describedby={previousDisabled ? paginationReasonId : undefined}",
        "aria-describedby={nextDisabled ? paginationReasonId : undefined}",
        "Pagination unavailable",
        "lgo-pagination-reason",
        "không khả dụng trong fixture hiện tại",
    ])
    match = re.search(r"export function PaginationBar[\s\S]*?\n}\n", text)
    if not match:
        fail("packages/ui/src/data.tsx: missing PaginationBar implementation")
        return
    block = match.group(0)
    if "disabled={previousDisabled}" in block or "disabled={nextDisabled}" in block:
        fail("packages/ui/src/data.tsx: PaginationBar must not use native disabled for fixture boundaries")
    if block.count("aria-describedby") < 2:
        fail("packages/ui/src/data.tsx: PaginationBar should describe both disabled boundary controls")
    for forbidden in ["fetch(", "axios", "<form"]:
        if forbidden in block:
            fail(f"packages/ui/src/data.tsx: forbidden backend/form marker in PaginationBar: {forbidden}")
    require_text("packages/ui/src/data.css", [
        ".lgo-pagination-reason",
        "overflow-wrap: anywhere",
        "font-size: .82rem",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts",
        "docs/execution/specs/WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66.md",
        "LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-REPORT-v1.66.md",
        "HANDOFF-LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts", [
        "/support",
        "Support triage",
        "aria-describedby",
        "Pagination unavailable",
        "không khả dụng trong fixture hiện tại",
        "keyboard focusable",
        "horizontal overflow",
        "fontSize",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66.md",
        "LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-REPORT-v1.66.md",
        "HANDOFF-LGO-WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66.md",
    ]:
        require_text(rel, [
            "WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66",
            "WEB_CLOSED",
            "PaginationBar",
            "aria-describedby",
            "Pagination unavailable",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66 WEB_CLOSED",
        "WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.67",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_pagination_reason()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE SHARED PAGINATION BOUNDARY REASON v1.66 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE SHARED PAGINATION BOUNDARY REASON v1.66 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
