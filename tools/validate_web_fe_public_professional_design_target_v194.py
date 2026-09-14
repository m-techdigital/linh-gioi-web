#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
    return text
def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])
def check_targets() -> None:
    for rel in ["apps/web/public/design-reference/public-professional-design-target-v194.png", "docs/design/reference/WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94.png"]:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected high-fidelity desktop board dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size
        if size < 500_000:
            fail(f"{rel}: expected full raster design board, got {size} bytes")
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-professional-design-target-v194.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94.md", "LGO-WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-REPORT-v1.94.md", "HANDOFF-LGO-WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-professional-design-target-v194.spec.ts", ["professional design target", "public-professional-design-target-v194.png", "width", "height", "homepage/community comparison"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94.md", "LGO-WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-REPORT-v1.94.md", "HANDOFF-LGO-WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94", "WEB_CLOSED", "browser/e2e", "UI/UX layout", "high-fidelity", "design target", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("LGO-WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-REPORT-v1.94.md", ["Final image generation prompt", "built-in image_gen", "Homepage", "Community"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94 WEB_CLOSED", "WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-PROFESSIONAL-DESIGN-TARGET-v1.94 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.95", "browser/e2e"])
def main() -> int:
    check_targets(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC PROFESSIONAL DESIGN TARGET v1.94 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC PROFESSIONAL DESIGN TARGET v1.94 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
