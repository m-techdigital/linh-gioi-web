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
    targets = ["apps/web/public/design-reference/download-detailed-design-target-v1125.png", "docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity download target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("download detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-download-design-target-density-v1125.spec.ts", "docs/execution/specs/WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md", "LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-REPORT-v1.125.md", "HANDOFF-LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md"]: require_file(rel)
    require_text("tests/e2e/fe-download-design-target-density-v1125.spec.ts", ["download design target density", "Public Download", "download-detailed-design-target-v1125.png", "desktop readiness list enters first fold", "desktop readiness list visible in first fold", "desktop status depth starts near target board", "download page h1 follows target scale"])
    require_text("apps/web/src/app/download/page.tsx", ["lgo-downloadpage-stack", "lgo-download-readiness-target-panel", "lgo-readiness-list", "DownloadStatusDepth"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.125 download detailed design target density", ".lgo-downloadpage-stack", ".lgo-download-readiness-target-panel", ".lgo-readiness-list"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_DOWNLOAD_TARGET", "Download detailed design target", "download-detailed-design-target-v1125.png", "Public Download", "pathname === \"/download\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Download", "download-detailed-design-target-v1125.png", "WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    if "| Public Service | `apps/web/public/design-reference/design-atlas-public-service-v195.png` | `/download`," in registry: fail("docs/design/DESIGN-TARGET-REGISTRY.md: /download should not remain under broad Public Service applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md", "LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-REPORT-v1.125.md", "HANDOFF-LGO-WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125.md"]:
        require_text(rel, ["WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Download", "browser/e2e", "fold density", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125 WEB_CLOSED", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.126"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-DOWNLOAD-DESIGN-TARGET-DENSITY-v1.125 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE DOWNLOAD DESIGN TARGET DENSITY v1.125 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE DOWNLOAD DESIGN TARGET DENSITY v1.125 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
