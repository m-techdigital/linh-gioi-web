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
    targets = ["apps/web/public/design-reference/support-safety-detailed-design-target-v1133.png", "docs/design/reference/WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity support safety target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("support safety detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts", "docs/execution/specs/WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133.md", "LGO-WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-REPORT-v1.133.md", "HANDOFF-LGO-WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133.md"]: require_file(rel)
    require_text("tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts", ["support safety Vietnamese design target density", "Public Support Safety", "support-safety-detailed-design-target-v1133.png", "support/safety first-flow visible copy should be Vietnamese", "desktop support/safety board enters first fold", "desktop issue routing remains discoverable", "support/safety h1 follows target scale"])
    require_text("apps/web/src/app/support/safety/page.tsx", ["lgo-supportsafetypage-stack", "lgo-safety-support-design-board", "support-safety-detailed-design-target-v1133.png", "Báo lỗi an toàn cho người chơi mới", "Không gửi dữ liệu nhạy cảm", "Chưa có ticket thật", "safetyChecklist"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.133 support safety Vietnamese design target density", ".lgo-supportsafetypage-stack", ".lgo-support-safety-checklist", ".lgo-safety-support-design-board", ".lgo-player-safety-board", ".lgo-support-issue-path-board"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_SUPPORT_SAFETY_TARGET", "Support safety detailed design target", "support-safety-detailed-design-target-v1133.png", "Public Support Safety", "pathname === \"/support/safety\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Support Safety", "support-safety-detailed-design-target-v1133.png", "WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png", "Vietnamese", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    for line in registry.splitlines():
        if line.startswith("| Public Service |") and "`/support/safety`" in line:
            fail("docs/design/DESIGN-TARGET-REGISTRY.md: /support/safety should not remain under broad Public Service applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133.md", "LGO-WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-REPORT-v1.133.md", "HANDOFF-LGO-WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133.md"]:
        require_text(rel, ["WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Support Safety", "Vietnamese", "browser/e2e", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.134"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.134", "Design Target First", "Base UI/UX Layout", "browser/e2e", "Vietnamese"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE SUPPORT SAFETY DESIGN TARGET DENSITY v1.133 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE SUPPORT SAFETY DESIGN TARGET DENSITY v1.133 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
