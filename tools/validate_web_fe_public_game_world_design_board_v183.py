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
def check_game_world_board() -> None:
    require_file("apps/web/public/game-art/design-boards/game-world-atlas-hub.svg")
    svg = read("apps/web/public/game-art/design-boards/game-world-atlas-hub.svg")
    if "<svg" not in svg or len(svg) > 12000: fail("game-world-atlas-hub.svg should be a small SVG reference-art asset")
    require_text("apps/web/src/app/game/page.tsx", ["lgo-game-world-design-board", "/game-art/design-boards/game-world-atlas-hub.svg", "Game world atlas hub board", "loading=\"eager\"", "Game reference art", "không phải live open-world backend"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.83 public game world atlas hub board", ".lgo-game-world-design-board", ".lgo-game-world-design-board img", "grid-template-columns: 1fr", "overflow-wrap: anywhere", "WEB v1.83 public game world hero typography cap", "clamp(36px, 3.5vw, 64px)", "clamp(34px, 9vw, 48px)", "WEB v1.83 public game world atlas typography cap", "clamp(42px, 4vw, 64px)", "clamp(34px, 12vw, 48px)"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-game-world-design-board-v183.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83.md", "LGO-WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-REPORT-v1.83.md", "HANDOFF-LGO-WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-game-world-design-board-v183.spec.ts", ["/game", "Game world atlas hub board", "/game-art/design-boards/game-world-atlas-hub.svg", "loading", "naturalWidth", "game world horizontal overflow"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83.md", "LGO-WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-REPORT-v1.83.md", "HANDOFF-LGO-WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83", "WEB_CLOSED", "Game world atlas hub board", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83 WEB_CLOSED", "WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.84", "browser/e2e"])
def main() -> int:
    check_game_world_board(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC GAME WORLD DESIGN BOARD v1.83 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC GAME WORLD DESIGN BOARD v1.83 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
