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
    targets = ["apps/web/public/design-reference/game-world-detailed-design-target-v1120.png", "docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png"]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity game target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("game target public/docs copies differ")
def check_source() -> None:
    require_text("apps/web/src/app/game/page.tsx", ["lgo-gamepage-stack", "Thế giới Linh Giới", "lgo-game-world-design-board", "lgo-gamepage-expanded-evidence", "lgo-game-world-boundary", "Lộ trình công khai", "Bản đồ thế giới là lộ trình khám phá công khai", "chưa phải bản đồ mở hoặc máy chủ thế giới thật", "WorldRouteJourney", "WorldAtlasStories", "Cấu trúc thế giới", "Mạng vùng thay vì một thế giới mở phẳng", "Bầu trời / Sương", "Mặt phẳng chơi"])
    forbid_text("apps/web/src/app/game/page.tsx", ["World of Linh Giới", "Game reference art", "Game world atlas hub reference art", "Ảnh tham chiếu thế giới", "route map public", "live open-world backend", "without claiming", "live map streaming", "account position", "quest state", "production world server", "World structure", "Zone Network", "Sky / Fog", "Far Background", "Mid Background", "Near Background", "Gameplay Plane", "Foreground"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_GAME_WORLD_TARGET", "Thiết kế chi tiết thế giới", "game-world-detailed-design-target-v1120.png", "Public Game World"])
    forbid_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Game world detailed design target"])
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts", "docs/execution/specs/WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135.md", "LGO-WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-REPORT-v1.135.md", "HANDOFF-LGO-WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135.md"]: require_file(rel)
    require_text("tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts", ["game world Vietnamese first-flow", "Thiết kế chi tiết thế giới", "mở trong tab mới", "Thế giới Linh Giới", "Linh Thành", "Âm Giới", "game first-flow visible copy should be Vietnamese", "desktop target board should follow the hero", "desktop route strip should follow the target board", "first-flow should not show the old wireframe/reference board"])
    for rel in ["docs/execution/specs/WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135.md", "LGO-WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-REPORT-v1.135.md", "HANDOFF-LGO-WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135.md"]:
        require_text(rel, ["WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135", "WEB_CLOSED", "Sequential Page Completion", "Just-in-time Design", "Design Target First", "Base UI/UX Layout", "Public Game World", "Vietnamese", "browser/e2e", "built-in image_gen", "Layout Match Before Closure", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Game World", "game-world-detailed-design-target-v1120.png", "WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.136"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "complete one page at a time", "just-in-time"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE GAME WORLD VIETNAMESE FIRST FLOW v1.135 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE GAME WORLD VIETNAMESE FIRST FLOW v1.135 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
