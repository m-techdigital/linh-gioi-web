#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return ""
    return p.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
def forbid_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker in text: fail(f"{rel}: forbidden stale marker {marker}")
def png_size(rel: str) -> tuple[int, int]:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return (0, 0)
    data = p.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0, 0)
    return struct.unpack(">II", data[16:24])

def check_target_assets() -> None:
    targets = ["apps/web/public/design-reference/support-help-detailed-design-target-v1132.png", "docs/design/reference/WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png"]
    for rel in targets:
        w, h = png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected high-fidelity support-help target, got {w}x{h}")
        if (ROOT / rel).is_file() and (ROOT / rel).stat().st_size < 500_000: fail(f"{rel}: expected full raster support-help target")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("support-help target public/docs copies differ")

def check_source() -> None:
    require_text("apps/web/src/app/support/help/page.tsx", ["FAQ nhanh", "WEB v1.147 · bản đồ FAQ", "lgo-service-compact-proof-page", "lgo-service-proof-board", "Board tham chiếu", "lgo-service-proof-card-grid", "lgo-support-help-route-board", "Lối chơi"])
    forbid_text("apps/web/src/app/support/help/page.tsx", ["Design Target First", "WEB v1.132 · FAQ tiếng Việt", "FAQ nhanh: tìm đúng câu trả lời trước khi gửi phản hồi", "Gameplay"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Thiết kế chi tiết trung tâm trợ giúp", "Trung tâm trợ giúp", "support-help-detailed-design-target-v1132.png", "pathname === \"/support/help\""])
    require_text("apps/web/src/components/PublicFaqHelpfulnessSections.tsx", ["Nhóm câu hỏi", "Không cần tìm kiếm backend giả", "Nhóm vấn đề", "Không có tìm kiếm backend", "FAQ nhanh gom tải game"])
    require_text("packages/content/src/fixtures.ts", ["Trung tâm FAQ nhanh", "Không có backend tìm kiếm", "Tài khoản / ranh giới backend", "Thế giới / lối chơi", "dữ liệu thanh toán"])
    require_text("packages/ui/src/service-layout.css", ["Shared support/help FAQ route-map layout", "lgo-support-help-route-grid", "lgo-support-help-route-board", "lgo-faq-discovery-board", "lgo-issue-category-board"])
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.132 support help Vietnamese design target density", ".lgo-support-help-design-board", ".lgo-support-help-route-grid"])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-support-help-real-ui-layout-v1147.spec.ts")
    require_text("tests/e2e/fe-support-help-real-ui-layout-v1147.spec.ts", ["support help real UI layout v1.147", "FAQ nhanh", "Trung tâm trợ giúp", "routeTop", "discoveryTop", "issueTop", "Design Target First"])
    for rel in ["docs/execution/specs/WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147.md", "LGO-WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-REPORT-v1.147.md", "HANDOFF-LGO-WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147.md"]:
        require_file(rel)
        require_text(rel, ["WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147", "WEB_CLOSED", "/support/help", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "screenshot", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.184", "Select `/community` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.184", "Current FE scope: select `/news/release-readiness-hub-polish-started`", "Real Browser UI/UX Layout First is Priority #1", "Base UI/UX Layout", "CSS must be managed by owner/role"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target_assets(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE SUPPORT HELP REAL UI LAYOUT v1.147 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE SUPPORT HELP REAL UI LAYOUT v1.147 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
