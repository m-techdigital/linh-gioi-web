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
    require_text("apps/web/src/app/performance/page.tsx", [
        "WEB v1.151 · hiệu năng public",
        "Hiệu năng và ngân sách nội dung",
        "Chưa có đo Core Web Vitals · chưa có chứng nhận Lighthouse · chưa có CDN ảnh riêng",
        "lgo-service-compact-proof-page",
        "lgo-performancepage-stack",
        "lgo-performance-design-board",
        "Bảng HUD ngân sách hiệu năng public Linh Giới",
        "lgo-performance-route-board",
        "performanceSteps",
        "Nhẹ ở lần đọc đầu",
        "Ít chữ nhưng đúng ranh giới",
        "Mobile không bị dày",
    ])
    forbid_text("apps/web/src/app/performance/page.tsx", [
        "Performance, copy và asset budget cho public web",
        "Performance copy budget HUD board",
        "Game reference art",
        "without claiming Lighthouse certification",
        "No Core Web Vitals measured PASS",
        "no Lighthouse certification",
        "no image CDN claim",
    ])
    require_text("packages/ui/src/service-layout.css", [
        "Shared performance page layout",
        ".lgo-performancepage-stack",
        ".lgo-performance-design-board",
        ".lgo-performance-route-board",
        ".lgo-performance-step-grid",
        "grid-template-columns: repeat(3, minmax(0, 1fr))",
        "grid-template-columns: 1fr",
    ])
    forbid_text("apps/web/src/app/globals.css", ["lgo-performance-design-board", "WEB v1.76 public performance copy-budget HUD board"])
def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-performance-real-ui-layout-v1151.spec.ts",
        "docs/execution/specs/WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151.md",
        "LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-REPORT-v1.151.md",
        "HANDOFF-LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151.md",
    ]: require_file(rel)
    require_text("tests/e2e/fe-performance-real-ui-layout-v1151.spec.ts", [
        "/performance",
        "Hiệu năng và ngân sách nội dung",
        "Bảng HUD ngân sách hiệu năng public Linh Giới",
        "heroBottom",
        "boardTop",
        "routeBottom",
        "stepColumns",
        "firstFlowText",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151.md",
        "LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-REPORT-v1.151.md",
        "HANDOFF-LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151.md",
    ]:
        require_text(rel, [
            "WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151",
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
        "Current phase: WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.165",
        "Select `/accessibility` as the next single active page",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.165",
        "Current FE scope: select `/guides/world-gameplay-loop-guide`",
        "Real Browser UI/UX Layout First is Priority #1",
        "Base First Stop Gate",
    ])
def main() -> int:
    check_source(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PERFORMANCE REAL UI LAYOUT v1.151 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PERFORMANCE REAL UI LAYOUT v1.151 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
