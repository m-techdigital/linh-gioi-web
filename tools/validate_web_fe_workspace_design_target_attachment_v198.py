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

def check_shared_workspace_shell() -> None:
    require_text("packages/ui/src/primitives.tsx", [
        "designTarget?: DesignTargetReferenceProps",
        "lgo-workspace-design-target-wrap",
        "DesignTargetReference",
        "Base UI/UX Layout",
    ])
    require_text("packages/ui/src/shell.css", [
        "WEB v1.98 workspace design target attachment",
        ".lgo-workspace-design-target-wrap",
        ".lgo-workspace-shell .lgo-design-target-reference",
        ".lgo-workspace-shell .lgo-design-target-reference-link",
        "@media (max-width: 720px)",
    ])

def check_apps() -> None:
    require_text("apps/portal/src/app/layout.tsx", [
        "designTarget=",
        "Player Portal design target",
        "/design-reference/design-atlas-portal-v195.png",
        "Player Portal",
    ])
    require_text("apps/ops/src/app/layout.tsx", [
        "designTarget=",
        "Ops/Admin design target",
        "/design-reference/design-atlas-ops-v195.png",
        "Ops/Admin",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-workspace-design-target-attachment-v198.spec.ts",
        "docs/execution/specs/WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98.md",
        "LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-REPORT-v1.98.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-workspace-design-target-attachment-v198.spec.ts", [
        "workspace design target attachment",
        "Design target reference",
        "Player Portal design target",
        "Ops/Admin design target",
        "Base UI/UX Layout",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98.md",
        "LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-REPORT-v1.98.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98.md",
    ]:
        require_text(rel, [
            "WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "browser/e2e",
            "Player Portal",
            "Ops/Admin",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "Design Target First",
        "Base UI/UX Layout",
        "browser/e2e",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-WORKSPACE-DESIGN-TARGET-ATTACHMENT-v1.98 | WEB-FE | WEB_CLOSED |",
    ])

def main() -> int:
    check_shared_workspace_shell()
    check_apps()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE WORKSPACE DESIGN TARGET ATTACHMENT v1.98 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE WORKSPACE DESIGN TARGET ATTACHMENT v1.98 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
