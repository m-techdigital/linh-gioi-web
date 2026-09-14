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
    targets = ["apps/web/public/design-reference/support-safety-detailed-design-target-v1133.png", "docs/design/reference/WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png"]
    for rel in targets:
        w, h = png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected high-fidelity support-safety target, got {w}x{h}")
        if (ROOT / rel).is_file() and (ROOT / rel).stat().st_size < 500_000: fail(f"{rel}: expected full raster support-safety target")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("support-safety target public/docs copies differ")

def check_source() -> None:
    require_text("apps/web/src/app/support/safety/page.tsx", ["Báo lỗi an toàn", "WEB v1.148 · báo lỗi an toàn", "lgo-service-compact-proof-page", "lgo-service-proof-board", "Board tham chiếu", "lgo-service-proof-card", "lgo-support-safety-checklist-grid", "Không gửi dữ liệu nhạy cảm"])
    forbid_text("apps/web/src/app/support/safety/page.tsx", ["Design Target First", "WEB v1.133 · báo lỗi an toàn tiếng Việt", "Báo lỗi an toàn cho người chơi mới"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_SUPPORT_SAFETY_TARGET", "Thiết kế chi tiết hỗ trợ an toàn", "Hỗ trợ an toàn", "support-safety-detailed-design-target-v1133.png", "pathname === \"/support/safety\""])
    require_text("packages/ui/src/service-layout.css", ["Shared support/safety safe-reporting layout", "lgo-supportsafetypage-stack", "lgo-support-safety-checklist", "lgo-safety-support-design-board", "lgo-player-safety-board", "lgo-support-issue-path-board"])
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.133 support safety Vietnamese design target density", "WEB v1.72 public safety support HUD reference board", ".lgo-supportsafetypage-stack", ".lgo-support-safety-checklist", ".lgo-safety-support-design-board"])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-support-safety-real-ui-layout-v1148.spec.ts")
    require_text("tests/e2e/fe-support-safety-real-ui-layout-v1148.spec.ts", ["support safety real UI layout v1.148", "Báo lỗi an toàn", "Hỗ trợ an toàn", "Board tham chiếu", "checklistBottom", "principlesTop", "issueTop", "Design Target First"])
    for rel in ["docs/execution/specs/WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148.md", "LGO-WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-REPORT-v1.148.md", "HANDOFF-LGO-WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148.md"]:
        require_file(rel)
        require_text(rel, ["WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148", "WEB_CLOSED", "/support/safety", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "screenshot", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.191", "Select `/community/onboarding` as the next single active page"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.191", "Current FE scope: select `/news/accessibility-readability-polish-started`", "Real Browser UI/UX Layout First is Priority #1", "Base UI/UX Layout", "CSS must be managed by owner/role"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target_assets(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE SUPPORT SAFETY REAL UI LAYOUT v1.148 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE SUPPORT SAFETY REAL UI LAYOUT v1.148 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
