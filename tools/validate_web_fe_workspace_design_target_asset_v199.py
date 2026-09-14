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

TARGETS = [
    ("Player Portal", "apps/web/public/design-reference/design-atlas-portal-v195.png", "apps/portal/public/design-reference/design-atlas-portal-v195.png"),
    ("Ops/Admin", "apps/web/public/design-reference/design-atlas-ops-v195.png", "apps/ops/public/design-reference/design-atlas-ops-v195.png"),
]

def check_assets() -> None:
    for label, canonical, mirror in TARGETS:
        require_file(canonical)
        require_file(mirror)
        width, height = png_size(mirror)
        if width < 1600 or height < 900:
            fail(f"{mirror}: expected full design atlas dimensions, got {width}x{height}")
        if (ROOT / canonical).is_file() and (ROOT / mirror).is_file():
            if (ROOT / canonical).read_bytes() != (ROOT / mirror).read_bytes():
                fail(f"{label}: workspace runtime mirror differs from canonical web design target")

def check_tests_docs_registry() -> None:
    for rel in [
        "tests/e2e/fe-workspace-design-target-asset-v199.spec.ts",
        "docs/execution/specs/WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99.md",
        "LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-REPORT-v1.99.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-workspace-design-target-asset-v199.spec.ts", [
        "workspace design target assets",
        "Player Portal design target",
        "Ops/Admin design target",
        "content-type",
        "image/png",
        "naturalWidth",
    ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "Portal runtime mirror",
        "Ops runtime mirror",
        "apps/portal/public/design-reference/design-atlas-portal-v195.png",
        "apps/ops/public/design-reference/design-atlas-ops-v195.png",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99.md",
        "LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-REPORT-v1.99.md",
        "HANDOFF-LGO-WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99.md",
    ]:
        require_text(rel, [
            "WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99",
            "WEB_CLOSED",
            "Design Target First",
            "browser/e2e",
            "Player Portal",
            "Ops/Admin",
            "runtime mirror",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.100",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.100",
        "Design Target First",
        "browser/e2e",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-WORKSPACE-DESIGN-TARGET-ASSET-v1.99 | WEB-FE | WEB_CLOSED |",
    ])

def main() -> int:
    check_assets()
    check_tests_docs_registry()
    if ERRORS:
        print("WEB FE WORKSPACE DESIGN TARGET ASSET v1.99 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE WORKSPACE DESIGN TARGET ASSET v1.99 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
