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
    targets = ["apps/web/public/design-reference/support-detailed-design-target-v1131.png", "docs/design/reference/WEB-FE-SUPPORT-DETAILED-DESIGN-TARGET-v1.131.png"]
    for rel in targets:
        w, h = png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected high-fidelity support target, got {w}x{h}")
        if (ROOT / rel).is_file() and (ROOT / rel).stat().st_size < 500_000: fail(f"{rel}: expected full raster support target")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("support target public/docs copies differ")

def check_source() -> None:
    require_text("apps/web/src/app/support/page.tsx", ["Hỗ trợ cộng đồng", "lgo-service-compact-proof-page", "lgo-detail-hero-card lgo-support-hero", "Board tham chiếu", "lgo-service-proof-board", "lgo-service-proof-card-grid", "lgo-support-topic-board", "Hướng dẫn tạm thời", "SupportFaqDepth", "PlayerSafetySupportCta"])
    forbid_text("apps/web/src/app/support/page.tsx", ["Design Target First", "WEB v1.131 · thiết kế hỗ trợ tiếng Việt", "HƯỚNG DẪN TẠM THỜI"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Thiết kế chi tiết hỗ trợ", "Hỗ trợ cộng đồng", "support-detailed-design-target-v1131.png", "pathname === \"/support\""])
    require_text("apps/web/src/components/PublicGameInfoDepthSections.tsx", ["supportScopeLabel", "FAQ nhanh", "chiến đấu", "hướng dẫn tĩnh", "chưa claim hỗ trợ live"])
    require_text("packages/content/src/fixtures.ts", ["Trang Tải game", "gói public hoặc closed-test", "xác thực production", "tra cứu tài khoản thật"])
    require_text("packages/ui/src/service-layout.css", ["Shared support station layout", "lgo-support-hero-note", "lgo-support-topic-board", "lgo-faq-panel", "lgo-service-proof-board img", "width: 100%"])
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.131 support detailed design target density", ".lgo-support-design-board", ".lgo-support-topic-grid"])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-support-real-ui-layout-v1146.spec.ts")
    require_text("tests/e2e/fe-support-real-ui-layout-v1146.spec.ts", ["support real UI layout v1.146", "Hỗ trợ cộng đồng", "Board tham chiếu", "topicsTop", "faqTop", "safetyTop", "Design Target First"])
    for rel in ["docs/execution/specs/WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146.md", "LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.146.md", "HANDOFF-LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146.md"]:
        require_file(rel)
        require_text(rel, ["WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146", "WEB_CLOSED", "/support", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "screenshot", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.168", "Select `/support/help` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.168", "Current FE scope: select `/guides/performance-copy-budget-guide`", "Real Browser UI/UX Layout First is Priority #1", "Base UI/UX Layout", "CSS must be managed by owner/role"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target_assets(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE SUPPORT REAL UI LAYOUT v1.146 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE SUPPORT REAL UI LAYOUT v1.146 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
