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

def check_ops_routes() -> None:
    routes = [
        "apps/ops/src/app/page.tsx",
        "apps/ops/src/app/control-center/page.tsx",
        "apps/ops/src/app/security-governance/page.tsx",
    ]
    for rel in routes:
        text = require_text(rel, [
            "Image",
            "loading=",
            "WORLD_CONCEPT",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
        if "priority" in text:
            fail(f"{rel}: use explicit loading=\"eager\" for selected visual, not priority")
        if not re.search(r"loading=\{panel\.claim === \"WORLD_CONCEPT\" \? \"eager\" : \"lazy\"\}", text):
            fail(f"{rel}: missing WORLD_CONCEPT eager loading expression")
        if "fetch(" in text or "axios" in text or "<form" in text:
            fail(f"{rel}: forbidden backend/form marker")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-ops-visual-lcp-image-v149.spec.ts",
        "docs/execution/specs/WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49.md",
        "LGO-WEB-FE-OPS-VISUAL-LCP-IMAGE-REPORT-v1.49.md",
        "HANDOFF-LGO-WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-ops-visual-lcp-image-v149.spec.ts", [
        "Ops home world concept",
        "Ops visual proof Đông Môn world concept",
        "Governance world context",
        "loading",
        "eager",
        "horizontal overflow",
        "font-size",
        "/control-center",
        "/security-governance",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49.md",
        "LGO-WEB-FE-OPS-VISUAL-LCP-IMAGE-REPORT-v1.49.md",
        "HANDOFF-LGO-WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49.md",
    ]:
        require_text(rel, [
            "WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49",
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
        "Current phase: WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49 WEB_CLOSED",
        "WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.50",
        "browser/e2e",
    ])

def main() -> int:
    check_ops_routes()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE OPS VISUAL LCP IMAGE v1.49 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE OPS VISUAL LCP IMAGE v1.49 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
