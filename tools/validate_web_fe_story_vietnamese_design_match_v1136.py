#!/usr/bin/env python3
from pathlib import Path
import struct
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
def forbid_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker in text: fail(f"{rel}: forbidden stale marker {marker}")
def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0, 0)
    return struct.unpack(">II", data[16:24])
def check_target() -> None:
    targets = ["apps/web/public/design-reference/story-detailed-design-target-v1121.png", "docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png"]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity story target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("story target public/docs copies differ")
def check_source() -> None:
    require_text("apps/web/src/app/story/page.tsx", ["lgo-storypage-stack", "Cốt truyện Linh Giới", "Ảnh ý tưởng cốt truyện", "Vết Nứt Đông Môn là phần mở đầu cốt truyện", "không phải trạng thái nhiệm vụ thật", "tiến trình người chơi", "mô phỏng thế giới chính thức"])
    forbid_text("apps/web/src/app/story/page.tsx", ["Opening narrative", "Story reference art", "Dong Mon fracture", "narrative setup", "quest state live", "while keeping", "portal events", "player progress", "account state", "production world simulation"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_STORY_TARGET", "Thiết kế chi tiết cốt truyện", "story-detailed-design-target-v1121.png", "Public Story"])
    forbid_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Story detailed design target"])
    require_text("packages/content/src/fixtures.ts", ["Chương 01", "Chương 02", "Chương 03", "Cổng Âm Giới", "Boss Thế Giới"])
    forbid_text("packages/content/src/fixtures.ts", ["chapter: \"Chapter 01\"", "chapter: \"Chapter 02\"", "chapter: \"Chapter 03\"", "quest state live"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.136 story Vietnamese design-match layout", ".lgo-storypage-stack", ".lgo-story-hero", ".lgo-narrative-chapter"])
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts", "docs/execution/specs/WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136.md", "LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-REPORT-v1.136.md", "HANDOFF-LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136.md"]: require_file(rel)
    require_text("tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts", ["story Vietnamese design match", "Thiết kế chi tiết cốt truyện", "Cốt truyện Linh Giới", "không phải trạng thái nhiệm vụ thật", "desktop chapter cards should follow the hero", "first-flow visible copy should be Vietnamese"])
    for rel in ["docs/execution/specs/WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136.md", "LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-REPORT-v1.136.md", "HANDOFF-LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136.md"]:
        require_text(rel, ["WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136", "WEB_CLOSED", "Sequential Page Completion", "Just-in-time Design", "Design Target First", "Layout Match Before Closure", "Base UI/UX Layout", "Public Story", "Vietnamese", "browser/e2e", "built-in imagegen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.137"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.137", "Select `/classes` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.210", "select `/accessibility` as the next single active page"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE STORY VIETNAMESE DESIGN MATCH v1.136 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE STORY VIETNAMESE DESIGN MATCH v1.136 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
