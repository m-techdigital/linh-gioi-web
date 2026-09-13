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
def check_accessibility_board() -> None:
    require_file("apps/web/public/game-art/design-boards/accessibility-readability-route-map.svg")
    svg = read("apps/web/public/game-art/design-boards/accessibility-readability-route-map.svg")
    if "<svg" not in svg or len(svg) > 12000: fail("accessibility-readability-route-map.svg should be a small SVG reference-art asset")
    require_text("apps/web/src/app/accessibility/page.tsx", ["lgo-accessibility-design-board", "/game-art/design-boards/accessibility-readability-route-map.svg", "Accessibility readability route map board", "loading=\"eager\"", "Game reference art", "formal WCAG audit"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.78 public accessibility readability route-map board", ".lgo-accessibility-design-board", ".lgo-accessibility-design-board img", "grid-template-columns: 1fr", "overflow-wrap: anywhere"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-accessibility-design-board-v178.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78.md", "LGO-WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-REPORT-v1.78.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-accessibility-design-board-v178.spec.ts", ["/accessibility", "Accessibility readability route map board", "/game-art/design-boards/accessibility-readability-route-map.svg", "loading", "naturalWidth", "accessibility horizontal overflow"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78.md", "LGO-WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-REPORT-v1.78.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78", "WEB_CLOSED", "Accessibility readability route map board", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78 WEB_CLOSED", "WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_accessibility_board(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC ACCESSIBILITY DESIGN BOARD v1.78 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC ACCESSIBILITY DESIGN BOARD v1.78 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
