#!/usr/bin/env python3
from pathlib import Path
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
def check_source() -> None:
    require_text("apps/web/src/app/accessibility/page.tsx", [
        "WEB v1.152 · dễ đọc public",
        "Dễ đọc và dễ thao tác",
        "Chưa có audit WCAG chính thức · chưa có claim pháp lý · chưa có thiết lập cá nhân",
        "lgo-service-compact-proof-page",
        "lgo-accessibilitypage-stack",
        "lgo-accessibility-design-board",
        "Bảng lộ trình đọc dễ thao tác Linh Giới",
        "lgo-accessibility-route-board",
        "readabilitySteps",
        "Đọc tiêu đề trước",
        "Theo thứ tự focus",
        "Giữ mobile dễ quét",
    ])
    forbid_text("apps/web/src/app/accessibility/page.tsx", [
        "Accessibility và readability cho người chơi mới",
        "Accessibility readability route map board",
        "Game reference art",
        "No formal WCAG audit",
        "no legal compliance claim",
        "no personal settings backend",
    ])
    require_text("packages/ui/src/service-layout.css", [
        "Shared accessibility page layout",
        ".lgo-accessibilitypage-stack",
        ".lgo-accessibility-design-board",
        ".lgo-accessibility-route-board",
        ".lgo-accessibility-step-grid",
        "grid-template-columns: repeat(3, minmax(0, 1fr))",
        "grid-template-columns: 1fr",
    ])
    forbid_text("apps/web/src/app/globals.css", ["lgo-accessibility-design-board", "WEB v1.78 public accessibility readability route-map board"])
def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-accessibility-real-ui-layout-v1152.spec.ts",
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152.md",
        "LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-REPORT-v1.152.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152.md",
    ]: require_file(rel)
    require_text("tests/e2e/fe-accessibility-real-ui-layout-v1152.spec.ts", [
        "/accessibility",
        "Dễ đọc và dễ thao tác",
        "Bảng lộ trình đọc dễ thao tác Linh Giới",
        "heroBottom",
        "boardTop",
        "routeBottom",
        "stepColumns",
        "firstFlowText",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152.md",
        "LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-REPORT-v1.152.md",
        "HANDOFF-LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152.md",
    ]:
        require_text(rel, [
            "WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.155",
        "Select `/roadmap` as the next single active page",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.155",
        "Current FE scope: select `/guides/world-gameplay-loop-guide`",
        "Real Browser UI/UX Layout First is Priority #1",
        "Base First Stop Gate",
    ])
def main() -> int:
    check_source(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE ACCESSIBILITY REAL UI LAYOUT v1.152 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE ACCESSIBILITY REAL UI LAYOUT v1.152 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
