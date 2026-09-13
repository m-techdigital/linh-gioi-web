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


def check_route_sources() -> None:
    portal_page = require_text("apps/portal/src/app/account/security/page.tsx", [
        "VisualProofGrid",
        "VisualProofCard",
        "DataList",
        "DataListItem",
        "portalSecurityContinuityPanels",
        "portalSecurityContinuityActions",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "next/image",
        "Security route continuity",
    ])
    ops_page = require_text("apps/ops/src/app/security-governance/page.tsx", [
        "VisualProofGrid",
        "VisualProofCard",
        "DataList",
        "DataListItem",
        "opsSecurityContinuityPanels",
        "opsSecurityContinuityActions",
        "NO_ACCEPTED_BACKEND_CONTRACT",
        "NO_REAL_OPS_MUTATION",
        "next/image",
        "Governance route continuity",
        "/control-center",
        "/audit",
    ])
    require_text("apps/portal/src/lib/portal-fixtures.ts", [
        "portalSecurityContinuityPanels",
        "portalSecurityContinuityActions",
        "/game-art/world/dong-mon-skyline.webp",
        "/game-art/classes/vo-lv1-skill-atlas.webp",
        "/account/sessions",
        "/journey",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    require_text("apps/ops/src/lib/ops-fixtures.ts", [
        "opsSecurityContinuityPanels",
        "opsSecurityContinuityActions",
        "/game-art/world/dong-mon-skyline.webp",
        "/game-art/classes/vo-lv1-skill-atlas.webp",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    for name, text in [("portal security", portal_page), ("ops security-governance", ops_page)]:
        for forbidden in [r"<form\b", r"FormField", r"TextInput", r"SelectInput", r"CheckboxField", r"FormActions", r"SpiritButton", r"\bfetch\s*\(", r"\baxios\b", r"[\"']use server[\"']"]:
            if re.search(forbidden, text):
                fail(f"{name}: forbidden route-depth operational/form marker {forbidden}")


def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-route-depth-continuity-v142.spec.ts",
        "docs/execution/specs/WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42.md",
        "LGO-WEB-FE-ROUTE-DEPTH-CONTINUITY-REPORT-v1.42.md",
        "HANDOFF-LGO-WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-route-depth-continuity-v142.spec.ts", [
        "font-size/layout/image/overflow",
        "navigation continuity",
        "account/security",
        "security-governance",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42.md",
        "LGO-WEB-FE-ROUTE-DEPTH-CONTINUITY-REPORT-v1.42.md",
        "HANDOFF-LGO-WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42.md",
    ]:
        require_text(rel, [
            "WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42",
            "WEB_CLOSED",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42 WEB_CLOSED",
        "WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-ROUTE-DEPTH-CONTINUITY-v1.42 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43",
        "browser/e2e",
    ])


def main() -> int:
    check_route_sources()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE ROUTE DEPTH CONTINUITY v1.42 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE ROUTE DEPTH CONTINUITY v1.42 VALIDATION PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
