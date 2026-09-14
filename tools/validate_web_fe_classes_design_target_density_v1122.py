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
        "apps/web/public/design-reference/classes-detailed-design-target-v1122.png",
        "docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png",
    ]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected high-fidelity classes target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000:
            fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets):
        if (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes():
            fail("classes detailed target public/docs copies differ")

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-classes-design-target-density-v1122.spec.ts",
        "docs/execution/specs/WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md",
        "LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-REPORT-v1.122.md",
        "HANDOFF-LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-classes-design-target-density-v1122.spec.ts", [
        "classes design target density",
        "Public Classes",
        "classes-detailed-design-target-v1122.png",
        "desktop first class card enters first fold",
        "desktop first class card visible in first fold",
        "desktop identity deck starts near target board",
        "classes page h1 follows target scale",
    ])
    require_text("apps/web/src/app/classes/page.tsx", ["lgo-classespage-stack", "ClassPathGrid", "ClassIdentityDeck", "ClassArtSpotlight"])
    require_text("packages/ui/src/service-layout.css", [
        "v1.215 shared classes overview layout for the public Năm Lộ route",
        ".lgo-classespage-stack",
        ".lgo-class-path-grid",
        ".lgo-class-identity-card",
    ])
    globals_css = read("apps/web/src/app/globals.css")
    if "WEB v1.122 classes detailed design target density" in globals_css or "WEB v1.137 classes Vietnamese design match" in globals_css:
        fail("apps/web/src/app/globals.css: stale classes page-local density owner remains")
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "PUBLIC_CLASSES_TARGET",
        "Thiết kế chi tiết Năm Lộ",
        "classes-detailed-design-target-v1122.png",
        "Public Classes",
        "pathname === \"/classes\"",
    ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", [
        "Public Classes",
        "classes-detailed-design-target-v1122.png",
        "WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png",
        "Design Target First",
    ])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    if "| Public Core | `apps/web/public/design-reference/design-atlas-public-core-v195.png` | `/classes`" in registry:
        fail("docs/design/DESIGN-TARGET-REGISTRY.md: /classes should not remain under broad Public Core applies-to list")
    for rel in [
        "docs/execution/specs/WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md",
        "LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-REPORT-v1.122.md",
        "HANDOFF-LGO-WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122.md",
    ]:
        require_text(rel, [
            "WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Classes",
            "browser/e2e",
            "fold density",
            "built-in image_gen",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122 WEB_CLOSED",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.123",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE CLASSES DESIGN TARGET DENSITY v1.122 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE CLASSES DESIGN TARGET DENSITY v1.122 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
