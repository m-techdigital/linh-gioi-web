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
    targets = ["apps/web/public/design-reference/community-detailed-design-target-v1149.png", "docs/design/reference/WEB-FE-COMMUNITY-DETAILED-DESIGN-TARGET-v1.149.png"]
    for rel in targets:
        w, h = png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected high-fidelity community target, got {w}x{h}")
        if (ROOT / rel).is_file() and (ROOT / rel).stat().st_size < 500_000: fail(f"{rel}: expected full raster community target")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("community target public/docs copies differ")

def check_source() -> None:
    require_text("apps/web/src/app/community/page.tsx", ["Cộng đồng Linh Giới", "WEB v1.149 · cộng đồng", "lgo-service-compact-proof-page", "lgo-community-design-board", "community-detailed-design-target-v1149.png", "Board tham chiếu", "Quảng trường Linh Thành", "Hòa nhập cộng đồng", "Quy tắc ứng xử", "Phản hồi an toàn", "communityPlazaScreenshots"])
    forbid_text("apps/web/src/app/community/page.tsx", ["No CMS", "no backend", "Real feedback", "ticket flow", "accepted API", "RBAC", "audit contract", "static guidance", "chat", "forum", "guild", "friend list", "ticket backend", "moderation backend"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_COMMUNITY_TARGET", "Thiết kế chi tiết cộng đồng", "Cộng đồng Linh Giới", "community-detailed-design-target-v1149.png", "pathname === \"/community\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Community", "community-detailed-design-target-v1149.png", "WEB-FE-COMMUNITY-DETAILED-DESIGN-TARGET-v1.149.png", "/community"])
    require_text("packages/ui/src/service-layout.css", ["Shared community page layout", "lgo-communitypage-stack", "lgo-community-design-board", "lgo-community-focus-grid", "lgo-community-real-plaza-panel"])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-community-real-ui-layout-v1149.spec.ts")
    require_text("tests/e2e/fe-community-real-ui-layout-v1149.spec.ts", ["community real UI layout v1.149", "Cộng đồng Linh Giới", "Quảng trường Linh Thành", "focusBottom", "plazaTop", "onboardingTop", "No CMS"])
    for rel in ["docs/execution/specs/WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149.md", "LGO-WEB-FE-COMMUNITY-REAL-UI-LAYOUT-REPORT-v1.149.md", "HANDOFF-LGO-WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149.md"]:
        require_file(rel)
        require_text(rel, ["WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149", "WEB_CLOSED", "/community", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "screenshot", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.180"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.180", "Real Browser UI/UX Layout First is Priority #1", "Base UI/UX Layout", "CSS must be managed by owner/role"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target_assets(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE COMMUNITY REAL UI LAYOUT v1.149 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE COMMUNITY REAL UI LAYOUT v1.149 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
