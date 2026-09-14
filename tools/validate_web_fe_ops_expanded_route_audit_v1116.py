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
        "tests/e2e/fe-ops-expanded-route-audit-v1116.spec.ts",
        "docs/execution/specs/WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116.md",
        "LGO-WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-REPORT-v1.116.md",
        "HANDOFF-LGO-WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-ops-expanded-route-audit-v1116.spec.ts", [
        "expanded Ops/Admin route audit",
        "axe-core/axe.min.js",
        "opsRoutes",
        "/content-liveops",
        "/control-center",
        "/game-operations/world-fixture-001",
        "/player-operations/fixture-001",
        "/security-governance",
        "/support/support-fixture-001",
        "/trust-safety",
        "Design target reference",
        "Ops/Admin",
        "serious/critical axe violations",
        "horizontal overflow",
        "h1 font-size",
        "h2 font-size",
        "nav font-size",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116.md",
        "LGO-WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-REPORT-v1.116.md",
        "HANDOFF-LGO-WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116.md",
    ]:
        require_text(rel, [
            "WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Ops/Admin",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Ops/Admin", "Component/state"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.117",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.117", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-OPS-EXPANDED-ROUTE-AUDIT-v1.116 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_tests_docs()
    if ERRORS:
        print("WEB FE OPS EXPANDED ROUTE AUDIT v1.116 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE OPS EXPANDED ROUTE AUDIT v1.116 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
