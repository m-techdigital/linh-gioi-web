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
    require_order("apps/web/src/app/download/trust/page.tsx", "<h1>Download trust / checksum / provenance</h1>", "<ReleaseReadinessHubCta />")
    require_order("apps/web/src/app/roadmap/page.tsx", "<h1>Roadmap phát triển web</h1>", "<ReleaseReadinessHubCta />")
    require_order("apps/web/src/app/community/onboarding/page.tsx", "<h1>Community / roadmap onboarding</h1>", "<ReleaseReadinessHubCta />")
    require_text("apps/web/src/app/download/trust/page.tsx", ["No public game download artifact", "no production auth", "no real portal entitlement"])
    require_text("apps/web/src/app/roadmap/page.tsx", ["WEB-08 remains blocked", "no production auth is claimed here"])
    require_text("apps/web/src/app/community/onboarding/page.tsx", ["No live community/chat/forum/guild backend", "no fake waitlist"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-trust-heading-priority-v188.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88.md", "LGO-WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-REPORT-v1.88.md", "HANDOFF-LGO-WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-trust-heading-priority-v188.spec.ts", ["/download/trust", "/roadmap", "/community/onboarding", "starts trust content with the page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88.md", "LGO-WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-REPORT-v1.88.md", "HANDOFF-LGO-WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88 WEB_CLOSED", "WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-TRUST-HEADING-PRIORITY-v1.88 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC TRUST HEADING PRIORITY v1.88 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC TRUST HEADING PRIORITY v1.88 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
