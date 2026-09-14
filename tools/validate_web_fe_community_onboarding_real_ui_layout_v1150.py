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
    require_text("apps/web/src/app/community/onboarding/page.tsx", [
        "WEB v1.150 · hòa nhập cộng đồng",
        "Hòa nhập cộng đồng Linh Giới",
        "Chưa có diễn đàn · chưa có bang hội · chưa có danh sách chờ",
        "lgo-service-compact-proof-page",
        "lgo-community-onboardingpage-stack",
        "lgo-community-onboarding-design-board",
        "Bảng vòng chơi hòa nhập cộng đồng Linh Giới",
        "lgo-community-onboarding-route-board",
        "onboardingSteps",
        "Kiểm tra trạng thái",
        "Đọc mốc mở dần",
        "Quay lại cộng đồng",
    ])
    forbid_text("apps/web/src/app/community/onboarding/page.tsx", [
        "Community / roadmap onboarding",
        "No live forum",
        "ticket backend",
        "fake waitlist",
        "Community onboarding gameplay loop board",
        "Game reference art",
        "forum live",
        "guild chat",
    ])
    require_text("packages/ui/src/service-layout.css", [
        "Shared community onboarding page layout",
        ".lgo-community-onboardingpage-stack",
        ".lgo-community-onboarding-design-board",
        ".lgo-community-onboarding-route-board",
        ".lgo-community-onboarding-step-grid",
        "grid-template-columns: repeat(3, minmax(0, 1fr))",
        "grid-template-columns: 1fr",
    ])
    forbid_text("apps/web/src/app/globals.css", ["lgo-community-onboarding-design-board", "WEB v1.75 public community onboarding gameplay-loop board"])
def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-community-onboarding-real-ui-layout-v1150.spec.ts",
        "docs/execution/specs/WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150.md",
        "LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-REPORT-v1.150.md",
        "HANDOFF-LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150.md",
    ]: require_file(rel)
    require_text("tests/e2e/fe-community-onboarding-real-ui-layout-v1150.spec.ts", [
        "/community/onboarding",
        "Hòa nhập cộng đồng Linh Giới",
        "Bảng vòng chơi hòa nhập cộng đồng Linh Giới",
        "heroBottom",
        "boardTop",
        "routeBottom",
        "stepColumns",
        "firstFlowText",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150.md",
        "LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-REPORT-v1.150.md",
        "HANDOFF-LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150.md",
    ]:
        require_text(rel, [
            "WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150",
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
        "Current phase: WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.211",
        "Select `/roadmap` as the next single active page",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.150 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.211",
        "Current FE scope: select `/roadmap`",
        "Real Browser UI/UX Layout First is Priority #1",
        "Base First Stop Gate",
    ])
def main() -> int:
    check_source(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE COMMUNITY ONBOARDING REAL UI LAYOUT v1.150 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE COMMUNITY ONBOARDING REAL UI LAYOUT v1.150 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
