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

def check_ops_audit_visual() -> None:
    require_file("apps/ops/public/game-art/world/dong-mon-skyline.webp")
    page = require_text("apps/ops/src/app/audit/page.tsx", [
        "lgo-ops-audit-visual",
        "/game-art/world/dong-mon-skyline.webp",
        "Ops audit trail visual",
        "loading=\"eager\"",
        "RBAC/audit/API contract",
        "NO_REAL_OPS_MUTATION",
    ])
    for forbidden in ["fetch(", "axios", "app/api", "<form"]:
        if forbidden in page:
            fail(f"apps/ops/src/app/audit/page.tsx contains forbidden backend/form marker: {forbidden}")
    require_text("apps/ops/src/app/globals.css", [
        "WEB v1.69 Ops audit route real game-art visual",
        ".lgo-ops-audit-visual",
        ".lgo-ops-audit-visual img",
        "grid-template-columns: 1fr",
        "overflow-wrap: anywhere",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-ops-audit-visual-v169.spec.ts",
        "docs/execution/specs/WEB-FE-OPS-AUDIT-VISUAL-v1.69.md",
        "LGO-WEB-FE-OPS-AUDIT-VISUAL-REPORT-v1.69.md",
        "HANDOFF-LGO-WEB-FE-OPS-AUDIT-VISUAL-v1.69.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-ops-audit-visual-v169.spec.ts", [
        "/audit",
        "Ops audit trail visual",
        "/game-art/world/dong-mon-skyline.webp",
        "loading",
        "naturalWidth",
        "Ops audit horizontal overflow",
        "locked filter controls",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-OPS-AUDIT-VISUAL-v1.69.md",
        "LGO-WEB-FE-OPS-AUDIT-VISUAL-REPORT-v1.69.md",
        "HANDOFF-LGO-WEB-FE-OPS-AUDIT-VISUAL-v1.69.md",
    ]:
        require_text(rel, [
            "WEB-FE-OPS-AUDIT-VISUAL-v1.69",
            "WEB_CLOSED",
            "Ops audit trail visual",
            "browser/e2e",
            "NO_REAL_OPS_MUTATION",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-OPS-AUDIT-VISUAL-v1.69 WEB_CLOSED",
        "WEB-FE-OPS-AUDIT-VISUAL-v1.69",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-OPS-AUDIT-VISUAL-v1.69 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.70",
        "browser/e2e",
    ])

def main() -> int:
    check_ops_audit_visual()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE OPS AUDIT VISUAL v1.69 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE OPS AUDIT VISUAL v1.69 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
