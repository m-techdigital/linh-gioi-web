#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")

def forbid_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker in text:
            fail(f"{rel}: forbidden stale marker {marker}")

def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])

def check_target_and_board() -> None:
    targets = [
        "apps/web/public/design-reference/tester-pack-detailed-design-target-v1129.png",
        "docs/design/reference/WEB-FE-TESTER-PACK-DETAILED-DESIGN-TARGET-v1.129.png",
    ]
    for rel in targets:
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected large Vietnamese tester-pack target, got {width}x{height}")
        if (ROOT / rel).is_file() and (ROOT / rel).stat().st_size < 500_000:
            fail(f"{rel}: expected full raster target")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes():
        fail("tester pack design target copies differ")
    require_text("apps/web/public/game-art/design-boards/closed-tester-production-board.svg", [
        "Board gói tester cộng đồng",
        "Checklist chuẩn bị",
        "Feedback an toàn",
        "Chưa mở intake",
        "Không có form đăng ký",
    ])
    forbid_text("apps/web/public/game-art/design-boards/closed-tester-production-board.svg", [
        "Production Board", "Sandbox", "Backlog", "In progress", "Handoff", "Done",
    ])

def check_source() -> None:
    require_text("apps/web/src/app/release/tester-pack/page.tsx", [
        "Gói tester cộng đồng",
        "lgo-service-compact-proof-page",
        "lgo-service-status-actions",
        "lgo-service-proof-board",
        "Board gói tester cộng đồng",
        "Chưa mở intake",
        "Không hứa slot",
        "Feedback an toàn",
        "ClosedTesterChecklistBoard",
        "SafeFeedbackTemplateBoard",
        "KnownLimitationNotesBoard",
        "DeviceReportTemplateBoard",
    ])
    forbid_text("apps/web/src/app/release/tester-pack/page.tsx", [
        "Closed tester information: chuẩn bị đúng", "Release readiness</LinkButton>", "Download trust</LinkButton>", "Safety support</LinkButton>", "Game reference art",
    ])
    require_text("apps/web/src/components/PublicClosedTesterInformationPackSections.tsx", [
        "lgo-service-proof-card-grid",
        "lgo-service-proof-card",
        "lgo-service-proof-list",
        "lgo-service-proof-item",
        "Gói tester cộng đồng",
        "Giới hạn đã biết",
        "Mẫu báo cáo thiết bị",
        "Định dạng an toàn",
    ])
    forbid_text("apps/web/src/components/PublicClosedTesterInformationPackSections.tsx", ["Safe format", "Known limitations", "Device/report template"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "Thiết kế chi tiết gói tester",
        "Gói tester công khai",
        "tester-pack-detailed-design-target-v1129.png",
    ])
    require_text("packages/ui/src/service-layout.css", [
        "lgo-service-compact-proof-page",
        "lgo-service-proof-board",
        "lgo-service-proof-card-grid",
        "lgo-service-proof-list",
        "lgo-service-proof-item",
    ])
    forbid_text("apps/web/src/app/globals.css", ["WEB v1.129 tester pack detailed design target density"])
    require_text("packages/content/src/fixtures.ts", [
        "Không mở intake tester",
        "Mức ảnh hưởng",
        "Giới hạn đã biết",
        "Loại thiết bị",
        "Bối cảnh mạng",
        "An toàn ảnh/log",
    ])

def check_tests_docs() -> None:
    require_file("tests/e2e/fe-tester-pack-vietnamese-real-ui-layout-v1144.spec.ts")
    require_text("tests/e2e/fe-tester-pack-vietnamese-real-ui-layout-v1144.spec.ts", [
        "tester pack Vietnamese real UI layout v1.144",
        "Gói tester cộng đồng",
        "Board gói tester cộng đồng",
        "Thiết kế chi tiết gói tester",
        "heroBottom",
        "boardTop",
        "checklistTop",
        "safeTop",
        "Known limitations",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144.md",
        "LGO-WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-REPORT-v1.144.md",
        "HANDOFF-LGO-WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144.md",
    ]:
        require_file(rel)
        require_text(rel, [
            "WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144",
            "WEB_CLOSED",
            "/release/tester-pack",
            "Real Browser UI/UX Layout First",
            "Base First",
            "service-layout.css",
            "browser/e2e",
            "screenshot",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.171",
        "Select `/support/help` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.171",
        "Current FE scope: select `/guides/release-readiness-hub-guide`",
        "Real Browser UI/UX Layout First is Priority #1",
        "Base UI/UX Layout",
        "CSS must be managed by owner/role",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-TESTER-PACK-REAL-UI-LAYOUT-v1.144 | WEB-FE | WEB_CLOSED |",
    ])

def main() -> int:
    check_target_and_board(); check_source(); check_tests_docs()
    if ERRORS:
        print("WEB FE TESTER PACK REAL UI LAYOUT v1.144 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE TESTER PACK REAL UI LAYOUT v1.144 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
