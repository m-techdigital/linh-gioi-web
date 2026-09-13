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

def check_shared_data_table() -> None:
    rel = "packages/ui/src/data.tsx"
    text = require_text(rel, [
        "export function DataTable",
        "role=\"region\"",
        "tabIndex={0}",
        "aria-label={`Scrollable data table: ${caption}`}",
        "lgo-data-table-wrap",
    ])
    match = re.search(r"export function DataTable[\s\S]*?\n}\n\n", text)
    if not match:
        fail(f"{rel}: missing DataTable implementation")
    else:
        block = match.group(0)
        for forbidden in ["fetch(", "axios", "<form"]:
            if forbidden in block:
                fail(f"{rel}: forbidden backend/form marker in DataTable")
    require_text("packages/ui/src/data.css", [
        ".lgo-data-table-wrap:focus-visible",
        "outline-offset",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-shared-data-table-scroll-region-v159.spec.ts",
        "docs/execution/specs/WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59.md",
        "LGO-WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-REPORT-v1.59.md",
        "HANDOFF-LGO-WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-shared-data-table-scroll-region-v159.spec.ts", [
        "/support",
        "Fixture support triage rows",
        "getByRole(\"region\"",
        "tabIndex",
        "keyboard focus outline",
        "page horizontal overflow",
        "font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59.md",
        "LGO-WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-REPORT-v1.59.md",
        "HANDOFF-LGO-WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59.md",
    ]:
        require_text(rel, [
            "WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59",
            "WEB_CLOSED",
            "DataTable",
            "keyboard",
            "role=\"region\"",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59 WEB_CLOSED",
        "WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_data_table()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE SHARED DATA TABLE SCROLL REGION v1.59 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE SHARED DATA TABLE SCROLL REGION v1.59 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
