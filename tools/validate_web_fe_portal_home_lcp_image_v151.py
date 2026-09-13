#!/usr/bin/env python3
from pathlib import Path
import re

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

def check_portal_home_route() -> None:
    rel = "apps/portal/src/app/page.tsx"
    text = require_text(rel, [
        "portalHomeVisualPanels",
        "Image",
        "loading=\"eager\"",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    if "priority" in text:
        fail(f"{rel}: use explicit loading=\"eager\" for selected visual, not priority")
    fixtures = require_text("apps/portal/src/lib/portal-fixtures.ts", ["portalHomeVisualPanels", "WORLD_CONCEPT", "portal-home-world"])
    if "portal-home-world" not in fixtures:
        fail("apps/portal/src/lib/portal-fixtures.ts: missing Portal home WORLD_CONCEPT panel")
    if "fetch(" in text or "axios" in text or "<form" in text:
        fail(f"{rel}: forbidden backend/form marker")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-portal-home-lcp-image-v151.spec.ts",
        "docs/execution/specs/WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51.md",
        "LGO-WEB-FE-PORTAL-HOME-LCP-IMAGE-REPORT-v1.51.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-portal-home-lcp-image-v151.spec.ts", [
        "Portal home Đông Môn world concept",
        "loading",
        "eager",
        "horizontal overflow",
        "font-size",
        "Tổng quan người chơi",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51.md",
        "LGO-WEB-FE-PORTAL-HOME-LCP-IMAGE-REPORT-v1.51.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51.md",
    ]:
        require_text(rel, [
            "WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51",
            "WEB_CLOSED",
            "LCP",
            "loading=\"eager\"",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51 WEB_CLOSED",
        "WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PORTAL-HOME-LCP-IMAGE-v1.51 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_portal_home_route()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PORTAL HOME LCP IMAGE v1.51 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PORTAL HOME LCP IMAGE v1.51 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
