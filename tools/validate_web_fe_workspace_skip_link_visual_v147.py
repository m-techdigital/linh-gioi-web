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

def check_shared_skip_link() -> None:
    css = require_text("packages/ui/src/shell.css", [
        ".lgo-workspace-skip",
        "transform: translateY(calc(-100% - .75rem))",
        "top: 0",
        "max-width: min(calc(100vw - 2rem), 22rem)",
        "overflow-wrap: anywhere",
        "transform: translateY(.75rem)",
    ])
    block = re.search(r"\.lgo-workspace-skip \{[\s\S]*?\n\}", css)
    if not block:
        fail("packages/ui/src/shell.css: missing .lgo-workspace-skip block")
    elif "top: -5rem" in block.group(0):
        fail("packages/ui/src/shell.css: skip link still hides with negative top")
    require_text("packages/ui/src/primitives.tsx", [
        "lgo-workspace-skip",
        "#workspace-content",
        "Bỏ qua điều hướng tới nội dung chính",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-workspace-skip-link-visual-v147.spec.ts",
        "docs/execution/specs/WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47.md",
        "LGO-WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-REPORT-v1.47.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-workspace-skip-link-visual-v147.spec.ts", [
        "hidden skip link should stay anchored at top: 0",
        "hidden skip link should use transform",
        "focused skip link should be visible",
        "font-size",
        "horizontal overflow",
        "/account/security",
        "/content-liveops",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47.md",
        "LGO-WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-REPORT-v1.47.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47.md",
    ]:
        require_text(rel, [
            "WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47",
            "WEB_CLOSED",
            "skip link",
            "keyboard",
            "transform",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47 WEB_CLOSED",
        "WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.48",
        "browser/e2e",
    ])

def main() -> int:
    check_shared_skip_link()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE WORKSPACE SKIP LINK VISUAL v1.47 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE WORKSPACE SKIP LINK VISUAL v1.47 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
