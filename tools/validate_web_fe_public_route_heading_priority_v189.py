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
def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a > b: fail(f"{rel}: expected {first} before {second}")
def check_routes() -> None:
    require_order("apps/web/src/app/accessibility/page.tsx", "<PublicAccessibilityHero/>", "<PublicAccessibilityPractice/>")
    require_order("apps/web/src/app/community/page.tsx", "<PublicCommunityHero/>", "<PublicCommunityPanels/>")
    require_order("apps/web/src/app/game/loop/page.tsx", "<PublicWorldLoopHero/>", "<PublicWorldLoopReading/>")
    require_order("apps/web/src/app/performance/page.tsx", "<PublicPerformanceHero/>", "<PublicPerformanceWorkshop/>")
    require_text("apps/web/src/components/PublicAccessibilityExperience.tsx", ['title="Dễ đọc và dễ thao tác"', "Chưa có audit WCAG chính thức", "Không tuyên bố chứng nhận pháp lý", "Không lưu thiết lập cá nhân"])
    require_text("apps/web/src/components/PublicCommunityExperience.tsx", ['title="Cộng đồng Linh Giới"', "Chưa có trò chuyện, diễn đàn hoặc bang hội", "không có kiểm duyệt trực tiếp", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("apps/web/src/components/PublicWorldLoopExperience.tsx", ['title="Vòng lặp gameplay thế giới"', "Đang đọc, không phải đang chơi", "không có mô phỏng combat", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("apps/web/src/components/PublicPerformanceExperience.tsx", ['title="Đọc nhẹ và rõ trên thiết bị của bạn"', "Chưa có số đo production", "Core Web Vitals", "Chưa chứng nhận", "Chưa có CDN riêng", "Không phải kết quả benchmark"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-route-heading-priority-v189.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md", "LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-REPORT-v1.89.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-route-heading-priority-v189.spec.ts", ["/accessibility", "/community", "/game/loop", "/performance", "starts content with the page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md", "LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-REPORT-v1.89.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89 WEB_CLOSED", "WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC ROUTE HEADING PRIORITY v1.89 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC ROUTE HEADING PRIORITY v1.89 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
