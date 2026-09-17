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

def check_governance() -> None:
    require_file("docs/execution/WEB-DESIGN-FIRST-GOVERNANCE.md")
    require_text("docs/execution/WEB-DESIGN-FIRST-GOVERNANCE.md", [
        "Design Target First",
        "Priority #1",
        "Every page, section and reusable component",
        "must be attached to a design target before implementation",
        "create the design target first",
        "delete or supersede the old design target",
        "packages/design-tokens",
        "packages/ui",
        "Base UI/UX Layout",
        "No production auth",
        "NO_ACCEPTED_BACKEND_CONTRACT",
    ])
    require_text("AGENTS.md", [
        "Design Target Guardrail rule",
        "Real Browser UI/UX Layout First is Priority #1",
        "A design target is only a guardrail for comparison",
        "Do not regenerate, redesign, batch-design, or localize design assets beyond what is necessary",
        "Base UI/UX Layout rule",
        "CSS Ownership and File-Size rule",
    ])

def check_registry() -> None:
    require_file("docs/design/DESIGN-TARGET-REGISTRY.md")
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "# DESIGN-TARGET-REGISTRY",
        "Design Target First",
        "Public Core",
        "Public Service",
        "Player Portal",
        "Ops/Admin",
        "Component/state",
        "docs/design/reference/WEB-FE-DESIGN-ATLAS-PUBLIC-CORE-v1.95.png",
        "docs/design/reference/WEB-FE-DESIGN-ATLAS-PUBLIC-SERVICE-v1.95.png",
        "docs/design/reference/WEB-FE-DESIGN-ATLAS-PORTAL-v1.95.png",
        "docs/design/reference/WEB-FE-DESIGN-ATLAS-OPS-v1.95.png",
        "docs/design/reference/WEB-FE-DESIGN-ATLAS-COMPONENTS-v1.95.png",
        "If a page or section is not covered",
        "replace or delete obsolete design targets",
    ])

def check_docs_and_current_state() -> None:
    for rel in [
        "docs/execution/specs/WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96.md",
        "LGO-WEB-FE-DESIGN-FIRST-GOVERNANCE-REPORT-v1.96.md",
        "HANDOFF-LGO-WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96.md",
    ]:
        require_file(rel)
        require_text(rel, [
            "WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "design target",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96 WEB_CLOSED",
        "Design Target First",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "Design Target First",
        "design target",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-DESIGN-FIRST-GOVERNANCE-v1.96 | WEB-FE | WEB_CLOSED |",
    ])

def main() -> int:
    check_governance()
    check_registry()
    check_docs_and_current_state()
    if ERRORS:
        print("WEB FE DESIGN FIRST GOVERNANCE v1.96 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE DESIGN FIRST GOVERNANCE v1.96 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
