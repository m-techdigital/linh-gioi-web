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
    targets = ["apps/web/public/design-reference/tester-pack-detailed-design-target-v1129.png", "docs/design/reference/WEB-FE-TESTER-PACK-DETAILED-DESIGN-TARGET-v1.129.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity tester pack target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("tester pack detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-tester-pack-design-target-density-v1129.spec.ts", "docs/execution/specs/WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129.md", "LGO-WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-REPORT-v1.129.md", "HANDOFF-LGO-WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129.md"]: require_file(rel)
    require_text("tests/e2e/fe-tester-pack-design-target-density-v1129.spec.ts", ["tester pack design target density", "Gói tester công khai", "tester-pack-detailed-design-target-v1129.png", "desktop tester pack board enters first fold", "desktop tester checklist follows target sequence", "desktop safe feedback stays near tester guidance flow", "tester pack h1 follows target scale"])
    require_text("apps/web/src/app/release/tester-pack/page.tsx", ["lgo-testerpackpage-stack", "lgo-closed-tester-hero-card", "lgo-closed-tester-design-board", "ClosedTesterChecklistBoard", "SafeFeedbackTemplateBoard"])
    page = read("apps/web/src/app/release/tester-pack/page.tsx")
    if page.find("<SafeFeedbackTemplateBoard />") > page.find("<ContentIaStartCta />"):
        fail("apps/web/src/app/release/tester-pack/page.tsx: SafeFeedbackTemplateBoard should stay in the early tester guidance flow")
    require_text("packages/ui/src/service-layout.css", ["lgo-service-compact-proof-page", "lgo-service-proof-board", "lgo-service-proof-card-grid", "lgo-service-proof-list", "lgo-service-proof-item"])
    require_text("apps/web/src/app/release/tester-pack/page.tsx", ["lgo-service-compact-proof-page", "lgo-service-proof-board", "lgo-service-status-actions"])
    if "WEB v1.129 tester pack detailed design target density" in read("apps/web/src/app/globals.css"):
        fail("apps/web/src/app/globals.css: tester pack v1.129 route CSS should be consolidated into shared service layout")
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_TESTER_PACK_TARGET", "Thiết kế chi tiết gói tester", "tester-pack-detailed-design-target-v1129.png", "Gói tester công khai", "pathname === \"/release/tester-pack\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Tester Pack", "tester-pack-detailed-design-target-v1129.png", "WEB-FE-TESTER-PACK-DETAILED-DESIGN-TARGET-v1.129.png", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    for line in registry.splitlines():
        if line.startswith("| Public Service |") and "/release/tester-pack" in line:
            fail("docs/design/DESIGN-TARGET-REGISTRY.md: /release/tester-pack should not remain under broad Public Service applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129.md", "LGO-WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-REPORT-v1.129.md", "HANDOFF-LGO-WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129.md"]:
        require_text(rel, ["WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Tester Pack", "browser/e2e", "fold density", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129 WEB_CLOSED", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.130"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-TESTER-PACK-DESIGN-TARGET-DENSITY-v1.129 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE TESTER PACK DESIGN TARGET DENSITY v1.129 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE TESTER PACK DESIGN TARGET DENSITY v1.129 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
