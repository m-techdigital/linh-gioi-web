#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text

def check_support_help_board() -> None:
    require_file("apps/web/public/design-reference/support-help-detailed-design-target-v1132.png")
    require_text("apps/web/src/app/support/help/page.tsx", [
        "lgo-support-help-design-board",
        "lgo-service-proof-board",
        "/design-reference/support-help-detailed-design-target-v1132.png",
        "Thiết kế tiếng Việt cho FAQ nhanh và bản đồ câu hỏi hỗ trợ",
        "loading=\"eager\"",
        "Board tham chiếu",
        "không có tìm kiếm thật",
    ])
    require_text("packages/ui/src/service-layout.css", [
        "Shared support/help FAQ route-map layout",
        "lgo-support-help-route-grid",
        "lgo-support-help-route-board",
        "lgo-faq-discovery-board",
        "lgo-issue-category-board",
        "grid-template-columns: 1fr",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-support-help-design-board-v173.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73.md",
        "LGO-WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-REPORT-v1.73.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-support-help-design-board-v173.spec.ts", [
        "/support/help",
        "Support help route map board",
        "/game-art/design-boards/support-help-route-map.svg",
        "loading",
        "naturalWidth",
        "support help horizontal overflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73.md",
        "LGO-WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-REPORT-v1.73.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73",
            "WEB_CLOSED",
            "Support help route map board",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73 WEB_CLOSED",
        "WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_support_help_board()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC SUPPORT HELP DESIGN BOARD v1.73 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC SUPPORT HELP DESIGN BOARD v1.73 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
