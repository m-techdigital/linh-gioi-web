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

def check_public_skip_link() -> None:
    css = require_text("apps/web/src/app/globals.css", [
        ".lgo-skip-link",
        "top: 0",
        "z-index: 200",
        "max-width: min(calc(100vw - 2rem), 22rem)",
        "overflow-wrap: anywhere",
        "transform: translateY(calc(-100% - .75rem))",
        "transform: translateY(.75rem)",
    ])
    block = re.search(r"\.lgo-skip-link \{[\s\S]*?\n\}", css)
    if not block:
        fail("apps/web/src/app/globals.css: missing .lgo-skip-link block")
    elif "translateY(-200%)" in block.group(0):
        fail("apps/web/src/app/globals.css: public skip link still hides with oversized translateY(-200%)")
    require_text("apps/web/src/components/PublicSiteShell.tsx", [
        "lgo-skip-link",
        "#main-content",
        "Bỏ qua menu tới nội dung chính",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-skip-link-visual-v150.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50.md",
        "LGO-WEB-FE-PUBLIC-SKIP-LINK-VISUAL-REPORT-v1.50.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-skip-link-visual-v150.spec.ts", [
        "hidden public skip link should stay anchored at top: 0",
        "focused public skip link should be visible",
        "focused public skip link should render above sticky header",
        "overflowWrap",
        "horizontal overflow",
        "font-size",
        "/classes",
        "/download",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50.md",
        "LGO-WEB-FE-PUBLIC-SKIP-LINK-VISUAL-REPORT-v1.50.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50",
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
        "Current phase: WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50 WEB_CLOSED",
        "WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_public_skip_link()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC SKIP LINK VISUAL v1.50 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC SKIP LINK VISUAL v1.50 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
