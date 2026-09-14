#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-expanded-service-route-audit-v1113.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113.md",
        "LGO-WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-REPORT-v1.113.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-expanded-service-route-audit-v1113.spec.ts", [
        "expanded public service route audit",
        "axe-core/axe.min.js",
        "/accessibility",
        "/community/onboarding",
        "/download/trust",
        "/performance",
        "/release/readiness",
        "/release/tester-pack",
        "/support/help",
        "/support/safety",
        "Design target reference",
        "Public Service",
        "serious/critical axe violations",
        "horizontal overflow",
        "h1 font-size",
        "h2 font-size",
        "nav font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113.md",
        "LGO-WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-REPORT-v1.113.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Service",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Service", "Component/state"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113 WEB_CLOSED",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-EXPANDED-SERVICE-ROUTE-AUDIT-v1.113 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_tests_docs()
    if ERRORS:
        print("WEB FE PUBLIC EXPANDED SERVICE ROUTE AUDIT v1.113 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC EXPANDED SERVICE ROUTE AUDIT v1.113 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
