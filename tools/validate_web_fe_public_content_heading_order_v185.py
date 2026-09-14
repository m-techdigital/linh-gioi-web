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
def check_routes() -> None:
    route_markers = {
        "apps/web/src/app/events/page.tsx": ["PageHeader", "title=\"Sự kiện\"", "PROVISIONAL_WEB_FIXTURE · No CMS · No backend", "Danh sách sự kiện tĩnh"],
        "apps/web/src/app/patch-notes/page.tsx": ["PageHeader", "title=\"Patch notes\"", "PROVISIONAL_WEB_FIXTURE · No CMS · No backend", "Ghi chú phát triển tĩnh"],
        "apps/web/src/app/news/page.tsx": ["PageHeader", "title=\"Tin tức\"", "Bản tin public tĩnh", "ContentIaStartCta"],
        "apps/web/src/app/status/page.tsx": ["PageHeader", "title=\"Trạng thái / Maintenance\"", "Status fixture entries", "Trạng thái public tĩnh"],
    }
    for rel, markers in route_markers.items(): require_text(rel, markers)
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-content-heading-order-v185.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85.md", "LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-REPORT-v1.85.md", "HANDOFF-LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-content-heading-order-v185.spec.ts", ["/events", "/patch-notes", "/news", "/status", "starts main content with one page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85.md", "LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-REPORT-v1.85.md", "HANDOFF-LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85 WEB_CLOSED", "WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC CONTENT HEADING ORDER v1.85 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC CONTENT HEADING ORDER v1.85 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
