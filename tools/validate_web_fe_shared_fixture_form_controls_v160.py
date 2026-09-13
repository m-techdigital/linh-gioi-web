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

def check_shared_forms() -> None:
    text = require_text("packages/ui/src/forms.tsx", [
        "export function TextInput",
        "export function SelectInput",
        "export function CheckboxField",
        "aria-disabled={locked ? \"true\"",
        "data-disabled={locked ? \"true\"",
        "role=\"combobox\"",
        "role=\"checkbox\"",
        "aria-readonly=\"true\"",
        "lgo-form-control-readout",
        "lgo-checkbox-readout",
    ])
    for name in ["TextInput", "SelectInput", "CheckboxField"]:
        match = re.search(rf"export function {name}[\s\S]*?\n}}", text)
        if not match:
            fail(f"packages/ui/src/forms.tsx: missing {name} implementation")
            continue
        block = match.group(0)
        for forbidden in ["fetch(", "axios", "use server", "use client"]:
            if forbidden in block:
                fail(f"packages/ui/src/forms.tsx: forbidden marker in {name}: {forbidden}")
    css = require_text("packages/ui/src/forms.css", [
        ".lgo-form-control[aria-disabled=\"true\"]",
        ".lgo-checkbox-readout[aria-disabled=\"true\"]:focus-visible",
        ".lgo-form-control-readout",
        ".lgo-checkbox-field-disabled",
    ])
    if "pointer-events: none" in css:
        fail("packages/ui/src/forms.css: locked controls must remain focusable, pointer-events:none is forbidden")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-shared-fixture-form-controls-v160.spec.ts",
        "docs/execution/specs/WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60.md",
        "LGO-WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-REPORT-v1.60.md",
        "HANDOFF-LGO-WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-shared-fixture-form-controls-v160.spec.ts", [
        "/login",
        "/support/case-001",
        "aria-disabled",
        "data-disabled",
        "not.toHaveAttribute(\"disabled\"",
        "toBeFocused",
        "role='combobox'",
        "role='checkbox'",
        "pageOverflow",
        "fontSize",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60.md",
        "LGO-WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-REPORT-v1.60.md",
        "HANDOFF-LGO-WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60.md",
    ]:
        require_text(rel, [
            "WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60",
            "WEB_CLOSED",
            "fixture form controls",
            "keyboard",
            "aria-disabled",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60 WEB_CLOSED",
        "WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-SHARED-FIXTURE-FORM-CONTROLS-v1.60 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.61",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_forms()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE SHARED FIXTURE FORM CONTROLS v1.60 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE SHARED FIXTURE FORM CONTROLS v1.60 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
