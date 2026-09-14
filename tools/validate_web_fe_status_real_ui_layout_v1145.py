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
def png_size(rel: str) -> tuple[int,int]:
    p=ROOT/rel
    if not p.is_file(): fail(f"missing file: {rel}"); return (0,0)
    data=p.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0,0)
    return struct.unpack(">II", data[16:24])

def check_target_assets() -> None:
    targets=["apps/web/public/design-reference/status-detailed-design-target-v1130.png","docs/design/reference/WEB-FE-STATUS-DETAILED-DESIGN-TARGET-v1.130.png"]
    for rel in targets:
        w,h=png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected large Vietnamese status target, got {w}x{h}")
        if (ROOT/rel).is_file() and (ROOT/rel).stat().st_size < 500_000: fail(f"{rel}: expected full raster target")
    if all((ROOT/rel).is_file() for rel in targets) and (ROOT/targets[0]).read_bytes() != (ROOT/targets[1]).read_bytes(): fail("status target public/docs copies differ")
    require_text("apps/web/public/game-art/design-boards/status-maintenance-signal-board.svg", ["Board tín hiệu trạng thái công khai", "Công khai", "Nội bộ", "Tạm khóa", "Không có form"] if False else ["Board tín hiệu trạng thái công khai", "Công khai", "Nội bộ", "Tạm khóa", "không CMS"])
    forbid_text("apps/web/public/game-art/design-boards/status-maintenance-signal-board.svg", ["Mobile HUD Wireframe", "Thumb-first", "Combat View", "Attack", "Cooldown"])

def check_source() -> None:
    require_text("apps/web/src/app/status/page.tsx", ["Trạng thái công khai", "lgo-service-compact-proof-page", "lgo-status-hero-card", "lgo-service-status-actions", "lgo-service-proof-board", "Board tín hiệu trạng thái công khai", "lgo-status-fixture-board", "StatusExplanationDepth", "StatusTrustBoard"])
    forbid_text("apps/web/src/app/status/page.tsx", ["Trạng thái / Maintenance", "Status maintenance signal board", "Game reference art", "Status fixture entries", "Status signal", "public status", "blocked surfaces", "live server health"])
    require_text("apps/web/src/components/PublicDetailSections.tsx", ["lgo-service-proof-card-grid", "lgo-service-proof-card", "Tách rõ công khai, nội bộ và tạm khóa"])
    require_text("apps/web/src/components/PublicTrustSections.tsx", ["lgo-service-proof-card-grid", "lgo-service-proof-card", "Các bề mặt công khai, nội bộ và tạm khóa"])
    require_text("packages/content/src/fixtures.ts", ["Website công khai", "Gói phát hành game", "Backend Portal/Ops", "Guardrail runtime/browser", "công khai", "nội bộ", "tạm khóa"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["Thiết kế chi tiết trạng thái", "Trạng thái công khai", "status-detailed-design-target-v1130.png"])
    require_text("packages/ui/src/service-layout.css", ["lgo-service-compact-proof-page", "lgo-service-proof-board", "lgo-service-proof-card-grid", "lgo-service-proof-card"])
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.130 status detailed design target density"])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-status-vietnamese-real-ui-layout-v1145.spec.ts")
    require_text("tests/e2e/fe-status-vietnamese-real-ui-layout-v1145.spec.ts", ["status Vietnamese real UI layout v1.145", "Trạng thái công khai", "Board tín hiệu trạng thái công khai", "heroBottom", "boardTop", "fixturesTop", "explainersTop", "trustTop"])
    for rel in ["docs/execution/specs/WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145.md", "LGO-WEB-FE-STATUS-REAL-UI-LAYOUT-REPORT-v1.145.md", "HANDOFF-LGO-WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145.md"]:
        require_file(rel)
        require_text(rel, ["WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145", "WEB_CLOSED", "/status", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "screenshot", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.184", "Select `/support/help` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.184", "Current FE scope: select `/news/release-readiness-hub-polish-started`", "Real Browser UI/UX Layout First is Priority #1", "Base UI/UX Layout", "CSS must be managed by owner/role"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target_assets(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE STATUS REAL UI LAYOUT v1.145 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE STATUS REAL UI LAYOUT v1.145 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
