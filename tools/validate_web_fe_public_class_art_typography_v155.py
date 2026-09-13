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

def check_css_caps() -> None:
    rel = "apps/web/src/app/globals.css"
    css = require_text(rel, [
        ".lgo-class-art-spotlight::before",
        "font-size: clamp(4.5rem, 9vw, 8rem);",
        "WEB v1.55 FE public class art typography scale",
        "font-size: clamp(1.95rem, 8.6vw, 2.65rem);",
    ])
    before_match = re.search(r"\.lgo-class-art-spotlight::before\s*\{(?P<body>.*?)\n\}", css, re.S)
    if not before_match:
        fail(f"{rel}: missing class art spotlight decorative pseudo block")
    else:
        body = before_match.group("body")
        if "clamp(10rem, 22vw, 20rem)" in body:
            fail(f"{rel}: old oversized decorative font clamp is still present")
        if "pointer-events: none;" not in body:
            fail(f"{rel}: decorative pseudo should remain non-interactive")
    if "@media (max-width: 640px)" not in css:
        fail(f"{rel}: missing mobile media block")
    if "font-size: clamp(2.1rem, 11vw, 3.35rem);" in css:
        fail(f"{rel}: old mobile class art heading clamp is still present")
    if "fetch(" in css or "axios" in css or "<form" in css:
        fail(f"{rel}: forbidden backend/form marker in typography-only slice")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-class-art-typography-v155.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55.md",
        "LGO-WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-REPORT-v1.55.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-class-art-typography-v155.spec.ts", [
        "lgo-class-art-spotlight",
        "::before",
        "decorative VÕ font-size cap",
        "class art heading font-size cap",
        "horizontal overflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55.md",
        "LGO-WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-REPORT-v1.55.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55",
            "WEB_CLOSED",
            "decorative VÕ",
            "font-size cap",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55 WEB_CLOSED",
        "WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.56",
        "browser/e2e",
    ])

def main() -> int:
    check_css_caps()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC CLASS ART TYPOGRAPHY v1.55 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC CLASS ART TYPOGRAPHY v1.55 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
