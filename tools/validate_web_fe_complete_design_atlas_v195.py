#!/usr/bin/env python3
from pathlib import Path
import struct

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

def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])

TARGETS = [
    ("public core", "apps/web/public/design-reference/design-atlas-public-core-v195.png", "docs/design/reference/WEB-FE-DESIGN-ATLAS-PUBLIC-CORE-v1.95.png"),
    ("public service", "apps/web/public/design-reference/design-atlas-public-service-v195.png", "docs/design/reference/WEB-FE-DESIGN-ATLAS-PUBLIC-SERVICE-v1.95.png"),
    ("portal", "apps/web/public/design-reference/design-atlas-portal-v195.png", "docs/design/reference/WEB-FE-DESIGN-ATLAS-PORTAL-v1.95.png"),
    ("ops", "apps/web/public/design-reference/design-atlas-ops-v195.png", "docs/design/reference/WEB-FE-DESIGN-ATLAS-OPS-v1.95.png"),
    ("components", "apps/web/public/design-reference/design-atlas-components-v195.png", "docs/design/reference/WEB-FE-DESIGN-ATLAS-COMPONENTS-v1.95.png"),
]

def check_targets() -> None:
    for label, public_rel, docs_rel in TARGETS:
        for rel in [public_rel, docs_rel]:
            require_file(rel)
            width, height = png_size(rel)
            if width < 1400 or height < 850:
                fail(f"{rel}: expected full design atlas dimensions, got {width}x{height}")
            size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
            if size < 500_000:
                fail(f"{rel}: expected high-fidelity raster board, got {size} bytes")
        if (ROOT / public_rel).is_file() and (ROOT / docs_rel).is_file():
            if (ROOT / public_rel).read_bytes() != (ROOT / docs_rel).read_bytes():
                fail(f"{label}: public/docs atlas copies differ")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-complete-design-atlas-v195.spec.ts",
        "docs/execution/specs/WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95.md",
        "LGO-WEB-FE-COMPLETE-DESIGN-ATLAS-REPORT-v1.95.md",
        "HANDOFF-LGO-WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-complete-design-atlas-v195.spec.ts", [
        "complete design atlas", "design-atlas-public-core-v195.png", "design-atlas-public-service-v195.png",
        "design-atlas-portal-v195.png", "design-atlas-ops-v195.png", "design-atlas-components-v195.png",
        "width", "height"
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95.md",
        "LGO-WEB-FE-COMPLETE-DESIGN-ATLAS-REPORT-v1.95.md",
        "HANDOFF-LGO-WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95.md",
    ]:
        require_text(rel, [
            "WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95", "WEB_CLOSED", "browser/e2e",
            "Public Core", "Public Service", "Player Portal", "Ops/Admin", "Component/state",
            "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration",
            "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95 WEB_CLOSED",
        "WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT"
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])

def main() -> int:
    check_targets()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE COMPLETE DESIGN ATLAS v1.95 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE COMPLETE DESIGN ATLAS v1.95 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
