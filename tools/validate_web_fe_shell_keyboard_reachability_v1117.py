#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-shell-keyboard-reachability-v1117.spec.ts",
        "docs/execution/specs/WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117.md",
        "LGO-WEB-FE-SHELL-KEYBOARD-REACHABILITY-REPORT-v1.117.md",
        "HANDOFF-LGO-WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-shell-keyboard-reachability-v1117.spec.ts", [
        "shell keyboard reachability",
        "Public Core",
        "Player Portal",
        "Ops/Admin",
        "skip link first tab stop",
        "skip target focus",
        "nav keyboard focus",
        "design target link keyboard focus",
        "Design target reference",
        "horizontal overflow",
        "nav font-size",
        "focus outline",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117.md",
        "LGO-WEB-FE-SHELL-KEYBOARD-REACHABILITY-REPORT-v1.117.md",
        "HANDOFF-LGO-WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117.md",
    ]:
        require_text(rel, [
            "WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Core",
            "Player Portal",
            "Ops/Admin",
            "browser/e2e",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Core", "Player Portal", "Ops/Admin", "Component/state"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.118",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.118", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SHELL-KEYBOARD-REACHABILITY-v1.117 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_tests_docs()
    if ERRORS:
        print("WEB FE SHELL KEYBOARD REACHABILITY v1.117 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE SHELL KEYBOARD REACHABILITY v1.117 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
