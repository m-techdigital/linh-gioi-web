#!/usr/bin/env python3
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
    return text
def check_reference() -> None:
    for rel in ["apps/web/public/design-reference/homepage-visual-target-v193.svg", "docs/design/reference/WEB-FE-HOMEPAGE-VISUAL-TARGET-v1.93.svg"]:
        require_file(rel)
        text = read(rel)
        for marker in ["Linh Giới Online homepage visual target v1.93", "glass navigation", "split hero", "cinematic world artwork", "Target để so live UI"]:
            if marker not in text: fail(f"{rel}: missing {marker}")
        if 'width="1440"' not in text or 'height="900"' not in text:
            fail(f"{rel}: expected 1440x900 design reference")
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-home-visual-target-v193.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93.md", "LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-REPORT-v1.93.md", "HANDOFF-LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-home-visual-target-v193.spec.ts", ["homepage visual target", "homepage-visual-target-v193.svg", "hero rendered width", "hero starts in first viewport", "homepage h1 visible width", "homepage scene visible width", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93.md", "LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-REPORT-v1.93.md", "HANDOFF-LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93", "WEB_CLOSED", "browser/e2e", "UI/UX layout", "design reference", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93 WEB_CLOSED", "WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_reference(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC HOME VISUAL TARGET v1.93 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC HOME VISUAL TARGET v1.93 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
