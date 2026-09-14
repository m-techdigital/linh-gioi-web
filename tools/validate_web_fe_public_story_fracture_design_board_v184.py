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
def check_story_fracture_board() -> None:
    require_file("apps/web/public/game-art/world/dong-mon-skyline.webp")
    require_text("apps/web/public/game-art/manifest.json", ["dong-mon-world-concept", "game-art/world/dong-mon-skyline.webp", "DRAFT_OWNER_REVIEW", "WORLD_CONCEPT"])
    require_text("apps/web/src/app/story/page.tsx", ["lgo-story-fracture-design-board", "/game-art/world/dong-mon-skyline.webp", "Ảnh ý tưởng Vết Nứt Đông Môn", "loading=\"eager\"", "Ảnh ý tưởng cốt truyện", "không phải trạng thái nhiệm vụ thật"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.84 public story fracture design board", ".lgo-story-fracture-design-board", ".lgo-story-fracture-design-board img", "grid-template-columns: 1fr", "overflow-wrap: anywhere", "WEB v1.84 shared public player hero typography cap", "clamp(36px, 3.5vw, 64px)", "clamp(34px, 9vw, 48px)"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84.md", "LGO-WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-REPORT-v1.84.md", "HANDOFF-LGO-WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts", ["/story", "Ảnh ý tưởng Vết Nứt Đông Môn trong cốt truyện Linh Giới", "/game-art/world/dong-mon-skyline.webp", "loading", "naturalWidth", "story fracture horizontal overflow"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84.md", "LGO-WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-REPORT-v1.84.md", "HANDOFF-LGO-WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84", "WEB_CLOSED", "Dong Mon fracture story concept art", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84 WEB_CLOSED", "WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-STORY-FRACTURE-DESIGN-BOARD-v1.84 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_story_fracture_board(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC STORY FRACTURE DESIGN BOARD v1.84 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC STORY FRACTURE DESIGN BOARD v1.84 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
