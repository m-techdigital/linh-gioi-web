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
def check_start_board() -> None:
    require_file("apps/web/public/game-art/design-boards/start-tutorial-gameplay-loop.svg")
    svg = read("apps/web/public/game-art/design-boards/start-tutorial-gameplay-loop.svg")
    if "<svg" not in svg or len(svg) > 12000: fail("start-tutorial-gameplay-loop.svg should be a small SVG reference-art asset")
    require_text("apps/web/src/app/start/page.tsx", ["lgo-start-design-board", "/game-art/design-boards/start-tutorial-gameplay-loop.svg", "Start tutorial gameplay loop board", "loading=\"eager\"", "Game reference art", "không mở download hay account backend"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.79 public start tutorial gameplay-loop board", ".lgo-start-design-board", ".lgo-start-design-board img", "grid-template-columns: 1fr", "overflow-wrap: anywhere"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-start-design-board-v179.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79.md", "LGO-WEB-FE-PUBLIC-START-DESIGN-BOARD-REPORT-v1.79.md", "HANDOFF-LGO-WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-start-design-board-v179.spec.ts", ["/start", "Start tutorial gameplay loop board", "/game-art/design-boards/start-tutorial-gameplay-loop.svg", "loading", "naturalWidth", "start horizontal overflow"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79.md", "LGO-WEB-FE-PUBLIC-START-DESIGN-BOARD-REPORT-v1.79.md", "HANDOFF-LGO-WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79", "WEB_CLOSED", "Start tutorial gameplay loop board", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79 WEB_CLOSED", "WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.80", "browser/e2e"])
def main() -> int:
    check_start_board(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC START DESIGN BOARD v1.79 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC START DESIGN BOARD v1.79 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
