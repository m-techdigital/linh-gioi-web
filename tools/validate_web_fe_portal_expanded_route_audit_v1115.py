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
        "tests/e2e/fe-portal-expanded-route-audit-v1115.spec.ts",
        "docs/execution/specs/WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115.md",
        "LGO-WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-REPORT-v1.115.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-portal-expanded-route-audit-v1115.spec.ts", [
        "expanded Player Portal route audit",
        "axe-core/axe.min.js",
        "portalRoutes",
        "/account/security",
        "/account/sessions",
        "/characters/fixture-a",
        "/recovery",
        "Design target reference",
        "Player Portal",
        "serious/critical axe violations",
        "horizontal overflow",
        "h1 font-size",
        "h2 font-size",
        "nav font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115.md",
        "LGO-WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-REPORT-v1.115.md",
        "HANDOFF-LGO-WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115.md",
    ]:
        require_text(rel, [
            "WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Player Portal",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Player Portal", "Component/state"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.116",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.116", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PORTAL-EXPANDED-ROUTE-AUDIT-v1.115 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_tests_docs()
    if ERRORS:
        print("WEB FE PORTAL EXPANDED ROUTE AUDIT v1.115 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PORTAL EXPANDED ROUTE AUDIT v1.115 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
