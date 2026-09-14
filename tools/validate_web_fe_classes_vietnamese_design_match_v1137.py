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
    targets = ["apps/web/public/design-reference/classes-detailed-design-target-v1122.png", "docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png"]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity classes target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("classes target public/docs copies differ")
def check_source() -> None:
    require_text("apps/web/src/app/classes/page.tsx", ["lgo-classespage-stack", "Chọn cách bạn nhìn và bảo vệ thế giới", "Triết lý Năm Lộ", "Cùng một thân cơ sở", "hiệu ứng kỹ năng", "Lộ"])
    forbid_text("apps/web/src/app/classes/page.tsx", ["Class philosophy", "body base", "class được", "skill/VFX", "progression", "class."])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_CLASSES_TARGET", "Thiết kế chi tiết Năm Lộ", "classes-detailed-design-target-v1122.png", "Public Classes", "pathname === \"/classes\""])
    forbid_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Classes detailed design target"])
    require_text("apps/web/src/components/PublicGameDepthSections.tsx", ["Bản sắc Năm Lộ", "Vai trò trong tổ đội", "Năm Lộ — năm cách đọc cùng một thế giới"])
    forbid_text("apps/web/src/components/PublicGameDepthSections.tsx", ["Class identity", "Fantasy trong tổ đội"])
    require_text("apps/web/src/components/PublicGameExperienceSections.tsx", ["Bản thiết kế đang phát triển · Võ", "Bảng trang bị nhiều lớp · Võ", "Lộ Võ", "định hướng mỹ thuật", "ảnh đại diện hoàn thiện cuối cùng"])
    forbid_text("apps/web/src/components/PublicGameExperienceSections.tsx", ["Development art preview", "Modular gear board", "production-final", "class Võ", "art direction"])
    require_text("packages/content/src/fixtures.ts", ["Bản thiết kế đang phát triển · Võ Lv1–30", "Bản thiết kế kỹ năng/hiệu ứng đang phát triển", "không phải key art Lộ hoàn thiện cuối cùng", "không phải ảnh chụp chiến đấu hoàn thiện", "Cấp độ, kỹ năng, trang bị"])
    forbid_text("packages/content/src/fixtures.ts", ["Development art preview", "Skill/VFX development preview", "not production-final", "not a final combat screenshot", "combatIdentity: \"Ranged", "visualSignal: \"Afterimage"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.137 classes Vietnamese design match", ".lgo-classespage-stack", ".lgo-class-path-grid", ".lgo-class-path"])
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts", "docs/execution/specs/WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137.md", "LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-REPORT-v1.137.md", "HANDOFF-LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137.md"]:
        require_file(rel)
    require_text("tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts", ["classes Vietnamese design match", "Thiết kế chi tiết Năm Lộ", "Class philosophy", "first class card remains visible in first fold", "Năm Lộ first-flow density"])
    for rel in ["docs/execution/specs/WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137.md", "LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-REPORT-v1.137.md", "HANDOFF-LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137.md"]:
        require_text(rel, ["WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137", "WEB_CLOSED", "Sequential Page Completion", "Just-in-time Design", "Design Target First", "Layout Match Before Closure", "Base UI/UX Layout", "Public Classes", "Vietnamese", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.138"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.138", "Select `/journey` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.140", "select `/download` as the next single active page"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE CLASSES VIETNAMESE DESIGN MATCH v1.137 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE CLASSES VIETNAMESE DESIGN MATCH v1.137 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
