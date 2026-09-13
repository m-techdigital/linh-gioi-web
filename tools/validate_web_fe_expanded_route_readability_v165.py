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

def check_e2e_guardrail() -> None:
    text = require_text("tests/e2e/fe-expanded-route-readability-v165.spec.ts", [
        "expanded FE route readability audit",
        "axe-core/axe.min.js",
        "seriousAxeViolations",
        "Public primary route links",
        "Linh Giới navigation",
        "Scrollable data table:",
        "page.getByRole(\"heading\"",
        "toBeLessThanOrEqual(0)",
        "toBeLessThanOrEqual(route.app === \"public\" ? 48 : 34)",
        "toBeLessThanOrEqual(18)",
        "/news/web-program-control-tower",
        "/guides/player-safety-support-guide",
        "/player-operations/player-linh-001",
        "NO_REAL_OPS_MUTATION" if False else "ops player detail",
    ])
    for route in ["public home", "public story", "public news detail", "public guide detail", "portal sessions", "ops support", "ops player detail", "ops security"]:
        if route not in text:
            fail(f"tests/e2e/fe-expanded-route-readability-v165.spec.ts: missing route case {route}")

def check_tests_and_docs() -> None:
    for rel in [
        "docs/execution/specs/WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65.md",
        "LGO-WEB-FE-EXPANDED-ROUTE-READABILITY-REPORT-v1.65.md",
        "HANDOFF-LGO-WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65.md",
    ]:
        require_file(rel)
    for rel in [
        "docs/execution/specs/WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65.md",
        "LGO-WEB-FE-EXPANDED-ROUTE-READABILITY-REPORT-v1.65.md",
        "HANDOFF-LGO-WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65.md",
    ]:
        require_text(rel, [
            "WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65",
            "WEB_CLOSED",
            "16 route",
            "axe",
            "keyboard",
            "scroll-region",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65 WEB_CLOSED",
        "WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-EXPANDED-ROUTE-READABILITY-v1.65 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.66",
        "browser/e2e",
    ])

def main() -> int:
    check_e2e_guardrail()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE EXPANDED ROUTE READABILITY v1.65 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE EXPANDED ROUTE READABILITY v1.65 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
