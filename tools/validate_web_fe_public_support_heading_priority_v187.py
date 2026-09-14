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
    require_order("apps/web/src/app/support/page.tsx", "<h1>Hỗ trợ cộng đồng</h1>", "<PlayerTrustReleaseCta />")
    require_order("apps/web/src/app/support/help/page.tsx", "<h1>FAQ Help: tìm đúng câu trả lời trước khi gửi feedback</h1>", "<FaqHelpfulnessCta />")
    require_order("apps/web/src/app/support/safety/page.tsx", "<h1>Safety support cho người chơi mới</h1>", "<ReleaseReadinessHubCta />")
    require_text("apps/web/src/app/support/page.tsx", ["No real ticket backend", "account lookup", "ops/admin mutation"])
    require_text("apps/web/src/app/support/help/page.tsx", ["không phải live search", "ticket system", "sensitive-data intake"])
    require_text("apps/web/src/app/support/safety/page.tsx", ["No live ticket", "no account lookup", "moderation backend"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-support-heading-priority-v187.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87.md", "LGO-WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-REPORT-v1.87.md", "HANDOFF-LGO-WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-support-heading-priority-v187.spec.ts", ["/support", "/support/help", "/support/safety", "starts support content with the page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87.md", "LGO-WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-REPORT-v1.87.md", "HANDOFF-LGO-WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87 WEB_CLOSED", "WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-SUPPORT-HEADING-PRIORITY-v1.87 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC SUPPORT HEADING PRIORITY v1.87 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC SUPPORT HEADING PRIORITY v1.87 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
