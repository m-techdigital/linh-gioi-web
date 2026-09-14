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
    targets = ["apps/web/public/design-reference/homepage-detailed-design-target-v1118.png", "docs/design/reference/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.png"]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity homepage target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("homepage target public/docs copies differ")
def check_source() -> None:
    require_text("AGENTS.md", ["Sequential Page Completion rule", "Just-in-time Design rule", "commit and push", "Do not create broad multi-page design batches"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["complete one page at a time", "DESIGN_TARGET_ATTACH_OR_CREATE just-in-time", "COMMIT_PUSH", "Do not move to another page before CLOSED"])
    require_text("apps/web/src/app/page.tsx", ["MMORPG hành động cộng đồng 2D", "Bản sắc trò chơi", "Đồ họa 2D sắc nét", "Trung tâm cộng đồng", "Chiến đấu hành động", "Sự kiện thế giới"])
    forbid_text("apps/web/src/app/page.tsx", ["2D Side-Scrolling Social Action MMORPG", "Social hub", "Action combat", "World events", "Game identity"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_HOMEPAGE_TARGET", "Thiết kế chi tiết trang chủ", "homepage-detailed-design-target-v1118.png", "Public Homepage", "Thiết kế component/trạng thái"])
    require_text("packages/ui/src/primitives.tsx", ["Theo design đích", "mở trong tab mới", "Các design đích", "DesignTargetReference"])
    forbid_text("packages/ui/src/primitives.tsx", ["Design Target First", "opens in a new tab", "Design targets —"])
    require_text("apps/web/src/components/PublicSiteShell.tsx", ["MMORPG hành động cộng đồng 2D"])
    require_text("apps/web/src/app/layout.tsx", ["MMORPG hành động cộng đồng 2D", "chiến đấu hành động"])
def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-homepage-vietnamese-first-flow-v1134.spec.ts",
        "docs/execution/specs/WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134.md",
        "LGO-WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-REPORT-v1.134.md",
        "HANDOFF-LGO-WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134.md",
    ]: require_file(rel)
    require_text("tests/e2e/fe-homepage-vietnamese-first-flow-v1134.spec.ts", ["homepage Vietnamese first-flow", "Thiết kế chi tiết trang chủ", "mở trong tab mới", "MMORPG hành động cộng đồng 2D", "homepage first-flow visible copy should be Vietnamese", "homepage h1 follows target scale"])
    for rel in ["docs/execution/specs/WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134.md", "LGO-WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-REPORT-v1.134.md", "HANDOFF-LGO-WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134.md"]:
        require_text(rel, ["WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134", "WEB_CLOSED", "Sequential Page Completion", "Just-in-time Design", "Design Target First", "Base UI/UX Layout", "Public Homepage", "Vietnamese", "browser/e2e", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Homepage", "homepage-detailed-design-target-v1118.png", "WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.png"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134 WEB_CLOSED", "sequential page completion is now mandatory", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "complete one page at a time", "just-in-time"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE HOMEPAGE VIETNAMESE FIRST FLOW v1.134 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE HOMEPAGE VIETNAMESE FIRST FLOW v1.134 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
