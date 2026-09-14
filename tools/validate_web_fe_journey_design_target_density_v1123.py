#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return ""
    return p.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0, 0)
    return struct.unpack(">II", data[16:24])
def check_target() -> None:
    targets = ["apps/web/public/design-reference/journey-detailed-design-target-v1123.png", "docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity journey target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("journey detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-journey-design-target-density-v1123.spec.ts", "docs/execution/specs/WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md", "LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-REPORT-v1.123.md", "HANDOFF-LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md"]: require_file(rel)
    require_text("tests/e2e/fe-journey-design-target-density-v1123.spec.ts", ["journey design target density", "Public Journey", "journey-detailed-design-target-v1123.png", "desktop journey board enters first fold", "desktop journey board visible in first fold", "desktop session loop starts near target board", "journey page h1 follows target scale"])
    require_text("apps/web/src/app/journey/page.tsx", ["lgo-journeypage-stack", "SessionLoopRail", "WorldRouteJourney", "lgo-journey-design-board"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.123 journey detailed design target density", ".lgo-journeypage-stack", ".lgo-journey-design-board", ".lgo-session-loop"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_JOURNEY_TARGET", "Journey detailed design target", "journey-detailed-design-target-v1123.png", "Public Journey", "pathname === \"/journey\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Journey", "journey-detailed-design-target-v1123.png", "WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    if "| Public Core | `apps/web/public/design-reference/design-atlas-public-core-v195.png` | `/journey`" in registry: fail("docs/design/DESIGN-TARGET-REGISTRY.md: /journey should not remain under broad Public Core applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md", "LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-REPORT-v1.123.md", "HANDOFF-LGO-WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123.md"]:
        require_text(rel, ["WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Journey", "browser/e2e", "fold density", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123 WEB_CLOSED", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.124"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE JOURNEY DESIGN TARGET DENSITY v1.123 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE JOURNEY DESIGN TARGET DENSITY v1.123 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
