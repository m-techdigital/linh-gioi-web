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
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])

def check_target() -> None:
    targets = [
        "apps/web/public/design-reference/homepage-detailed-design-target-v1118.png",
        "docs/design/reference/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.png",
    ]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected high-fidelity homepage target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000:
            fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets):
        if (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes():
            fail("homepage detailed target public/docs copies differ")

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-homepage-detailed-design-target-v1118.spec.ts",
        "docs/execution/specs/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.md",
        "LGO-WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-REPORT-v1.118.md",
        "HANDOFF-LGO-WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-homepage-detailed-design-target-v1118.spec.ts", [
        "homepage detailed design target",
        "homepage-detailed-design-target-v1118.png",
        "Public Homepage",
        "hero starts in first viewport",
        "homepage h1 font-size",
        "homepage primary CTA count",
        "high-fidelity 16:9 board",
    ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "Public Homepage",
        "homepage-detailed-design-target-v1118.png",
        "Design Target First",
    ])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "PUBLIC_HOMEPAGE_TARGET",
        "Homepage detailed design target",
        "homepage-detailed-design-target-v1118.png",
        "Public Homepage",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.md",
        "LGO-WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-REPORT-v1.118.md",
        "HANDOFF-LGO-WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.md",
    ]:
        require_text(rel, [
            "WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Homepage",
            "browser/e2e",
            "built-in image_gen",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118 WEB_CLOSED",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.119",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.119", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target()
    check_tests_docs()
    if ERRORS:
        print("WEB FE HOMEPAGE DETAILED DESIGN TARGET v1.118 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE HOMEPAGE DETAILED DESIGN TARGET v1.118 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
