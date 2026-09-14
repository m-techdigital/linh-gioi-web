#!/usr/bin/env python3
from pathlib import Path
import struct

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

def png_size(rel: str) -> tuple[int, int]:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing PNG: {rel}")
        return (0, 0)
    data = p.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])

def check_assets() -> None:
    canonical = ROOT / "apps/web/public/design-reference/design-atlas-components-v195.png"
    for rel in [
        "apps/web/public/design-reference/design-atlas-components-v195.png",
        "apps/portal/public/design-reference/design-atlas-components-v195.png",
        "apps/ops/public/design-reference/design-atlas-components-v195.png",
    ]:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected full component/state design target dimensions, got {width}x{height}")
        if canonical.is_file() and (ROOT / rel).is_file() and canonical.read_bytes() != (ROOT / rel).read_bytes():
            fail(f"{rel}: component/state runtime mirror differs from canonical target")

def check_source() -> None:
    require_text("packages/ui/src/primitives.tsx", [
        "DesignTargetReferenceLink",
        "companionTargets",
        "lgo-design-target-reference-actions",
        "lgo-design-target-reference-link-secondary",
    ])
    require_text("packages/ui/src/index.ts", ["DesignTargetReferenceLink", "DesignTargetReferenceProps"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "Component/state design target",
        "/design-reference/design-atlas-components-v195.png",
        "companionTargets",
    ])
    require_text("apps/portal/src/app/layout.tsx", ["Component/state design target", "companionTargets"])
    require_text("apps/ops/src/app/layout.tsx", ["Component/state design target", "companionTargets"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.100 component/state design target companion", "lgo-design-target-reference-actions"])
    require_text("packages/ui/src/shell.css", ["WEB v1.100 workspace component/state design target companion", "lgo-design-target-reference-actions"])

def check_tests_docs_registry() -> None:
    for rel in [
        "tests/e2e/fe-component-state-design-target-v1100.spec.ts",
        "docs/execution/specs/WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100.md",
        "LGO-WEB-FE-COMPONENT-STATE-DESIGN-TARGET-REPORT-v1.100.md",
        "HANDOFF-LGO-WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100.md",
    ]:
        require_file(rel)
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "Component/state",
        "Public runtime target",
        "Portal runtime mirror",
        "Ops runtime mirror",
        "apps/portal/public/design-reference/design-atlas-components-v195.png",
        "apps/ops/public/design-reference/design-atlas-components-v195.png",
    ])
    require_text("tests/e2e/fe-component-state-design-target-v1100.spec.ts", [
        "component/state design target attachment",
        "Component/state design target",
        "image/png",
        "naturalWidth",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100.md",
        "LGO-WEB-FE-COMPONENT-STATE-DESIGN-TARGET-REPORT-v1.100.md",
        "HANDOFF-LGO-WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100.md",
    ]:
        require_text(rel, [
            "WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Component/state",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.101",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.101", "Design Target First", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-COMPONENT-STATE-DESIGN-TARGET-v1.100 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_assets()
    check_source()
    check_tests_docs_registry()
    if ERRORS:
        print("WEB FE COMPONENT STATE DESIGN TARGET v1.100 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE COMPONENT STATE DESIGN TARGET v1.100 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
