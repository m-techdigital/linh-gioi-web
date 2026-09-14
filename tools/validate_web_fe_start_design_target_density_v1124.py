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
    targets = ["apps/web/public/design-reference/start-detailed-design-target-v1124.png", "docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity start target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("start detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-start-design-target-density-v1124.spec.ts", "docs/execution/specs/WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md", "LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-REPORT-v1.124.md", "HANDOFF-LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md"]: require_file(rel)
    require_text("tests/e2e/fe-start-design-target-density-v1124.spec.ts", ["start design target density", "Public Start", "start-detailed-design-target-v1124.png", "desktop start tutorial board enters first fold", "desktop start tutorial board visible in first fold", "desktop real screenshot panel starts near target board", "start page h1 follows target scale"])
    require_text("apps/web/src/app/start/page.tsx", ["lgo-startpage-stack", "lgo-start-design-board", "lgo-start-real-screenshot-panel", "ClassPathGrid", "WorldRouteJourney"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.124 start detailed design target density", ".lgo-startpage-stack", ".lgo-start-design-board", ".lgo-start-real-screenshot-panel"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_START_TARGET", "Start detailed design target", "start-detailed-design-target-v1124.png", "Public Start", "pathname === \"/start\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Start", "start-detailed-design-target-v1124.png", "WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    if "| Public Core | `apps/web/public/design-reference/design-atlas-public-core-v195.png` | `/start`" in registry: fail("docs/design/DESIGN-TARGET-REGISTRY.md: /start should not remain under broad Public Core applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md", "LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-REPORT-v1.124.md", "HANDOFF-LGO-WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124.md"]:
        require_text(rel, ["WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Start", "browser/e2e", "fold density", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.125"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.125", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE START DESIGN TARGET DENSITY v1.124 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE START DESIGN TARGET DENSITY v1.124 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
