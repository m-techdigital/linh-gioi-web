#!/usr/bin/env python3
from pathlib import Path

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

def check_axe_matrix_test() -> None:
    rel = "tests/e2e/fe-accessibility-axe-matrix-v158.spec.ts"
    text = require_text(rel, [
        "axe-core/axe.min.js",
        "wcag2a",
        "wcag2aa",
        "serious",
        "critical",
        "routeMatrix",
        "horizontal overflow",
        "font-size",
        "public",
        "portal",
        "ops",
        "/classes",
        "/login",
        "/trust-safety",
    ])
    if "fetch(" in text or "axios" in text or "<form" in text:
        fail(f"{rel}: forbidden backend/form marker")

def check_metric_overflow_css() -> None:
    require_text("packages/ui/src/data.css", [
        "WEB v1.58 accessibility axe matrix",
        ".lgo-metric-card { min-width: 0; }",
        "overflow-wrap: anywhere;",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-accessibility-axe-matrix-v158.spec.ts",
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58.md",
        "LGO-WEB-FE-ACCESSIBILITY-AXE-MATRIX-REPORT-v1.58.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58.md",
    ]:
        require_file(rel)
    for rel in [
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58.md",
        "LGO-WEB-FE-ACCESSIBILITY-AXE-MATRIX-REPORT-v1.58.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58.md",
    ]:
        require_text(rel, [
            "WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58",
            "WEB_CLOSED",
            "axe",
            "browser/e2e",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58 WEB_CLOSED",
        "WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.59",
        "browser/e2e",
    ])

def main() -> int:
    check_axe_matrix_test()
    check_metric_overflow_css()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE ACCESSIBILITY AXE MATRIX v1.58 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE ACCESSIBILITY AXE MATRIX v1.58 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
