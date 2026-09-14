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
    require_order("apps/web/src/app/accessibility/page.tsx", "<h1>Accessibility và readability cho người chơi mới</h1>", "<PlayerTrustReleaseCta />")
    require_order("apps/web/src/app/community/page.tsx", "<h1>Cộng đồng Linh Giới</h1>", "<PlayerTrustReleaseCta />")
    require_order("apps/web/src/app/game/loop/page.tsx", "<h1>World gameplay loop</h1>", "<PlayerTrustReleaseCta />")
    require_order("apps/web/src/app/performance/page.tsx", "<h1>Performance, copy và asset budget cho public web</h1>", "<PlayerTrustReleaseCta />")
    require_text("apps/web/src/app/accessibility/page.tsx", ["No formal WCAG audit", "no legal compliance claim", "no personal settings backend"])
    require_text("apps/web/src/app/community/page.tsx", ["Chưa có chat, forum, guild", "ticket backend", "live community backend"])
    require_text("apps/web/src/app/game/loop/page.tsx", ["without claiming live combat", "inventory persistence", "account integration"])
    require_text("apps/web/src/app/performance/page.tsx", ["No Core Web Vitals measured PASS", "no Lighthouse certification", "no image CDN claim"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-route-heading-priority-v189.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md", "LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-REPORT-v1.89.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-route-heading-priority-v189.spec.ts", ["/accessibility", "/community", "/game/loop", "/performance", "starts content with the page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md", "LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-REPORT-v1.89.md", "HANDOFF-LGO-WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89 WEB_CLOSED", "WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-ROUTE-HEADING-PRIORITY-v1.89 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.90", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC ROUTE HEADING PRIORITY v1.89 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC ROUTE HEADING PRIORITY v1.89 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
