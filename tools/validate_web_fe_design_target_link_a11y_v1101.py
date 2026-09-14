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

def check_source() -> None:
    require_text("packages/ui/src/primitives.tsx", [
        "function designTargetNewTabLabel",
        "opens in a new tab",
        "aria-label={designTargetNewTabLabel(label, scope)}",
        "aria-label={designTargetNewTabLabel(target.label, scope)}",
        "target=\"_blank\"",
        "rel=\"noopener noreferrer\"",
        "DesignTargetReference",
    ])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "Public Core design target",
        "Public Service design target",
        "Component/state design target",
        "companionTargets",
    ])
    require_text("apps/portal/src/app/layout.tsx", ["Player Portal design target", "Component/state design target"])
    require_text("apps/ops/src/app/layout.tsx", ["Ops/Admin design target", "Component/state design target"])

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-design-target-link-a11y-v1101.spec.ts",
        "docs/execution/specs/WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101.md",
        "LGO-WEB-FE-DESIGN-TARGET-LINK-A11Y-REPORT-v1.101.md",
        "HANDOFF-LGO-WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-design-target-link-a11y-v1101.spec.ts", [
        "design target link new-tab accessibility",
        "opens in a new tab",
        "target",
        "_blank",
        "noreferrer",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101.md",
        "LGO-WEB-FE-DESIGN-TARGET-LINK-A11Y-REPORT-v1.101.md",
        "HANDOFF-LGO-WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101.md",
    ]:
        require_text(rel, [
            "WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "opens in a new tab",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "Public Core",
        "Public Service",
        "Player Portal",
        "Ops/Admin",
        "Component/state",
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.102",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["Design Target First", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_source()
    check_tests_docs()
    if ERRORS:
        print("WEB FE DESIGN TARGET LINK A11Y v1.101 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE DESIGN TARGET LINK A11Y v1.101 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
