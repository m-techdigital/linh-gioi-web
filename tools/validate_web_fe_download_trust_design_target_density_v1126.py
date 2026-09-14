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
    targets = ["apps/web/public/design-reference/download-trust-detailed-design-target-v1126.png", "docs/design/reference/WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity download trust target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("download trust detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts", "docs/execution/specs/WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126.md", "LGO-WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-REPORT-v1.126.md", "HANDOFF-LGO-WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126.md"]: require_file(rel)
    require_text("tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts", ["download trust design target density", "Public Download Trust", "download-trust-detailed-design-target-v1126.png", "desktop release readiness enters first fold", "desktop owner gate follows target board density", "desktop trust gate board stays near the target sequence", "download trust h1 follows target scale"])
    require_text("apps/web/src/app/download/trust/page.tsx", ["lgo-downloadtrustpage-stack", "lgo-download-trust-hero-card", "lgo-download-trust-first-gates", "DownloadTrustGateBoard", "OwnerReleaseGateBoard"])
    page = read("apps/web/src/app/download/trust/page.tsx")
    if page.find("<DownloadTrustGateBoard />") > page.find("<PerformanceBudgetCta />"):
        fail("apps/web/src/app/download/trust/page.tsx: DownloadTrustGateBoard should stay near the first trust gates")
    require_text("apps/web/src/app/globals.css", ["WEB v1.126 download trust detailed design target density", ".lgo-downloadtrustpage-stack", ".lgo-download-trust-hero-card", ".lgo-download-trust-first-gates", ".lgo-owner-release-gate-board", ".lgo-trust-panel"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_DOWNLOAD_TRUST_TARGET", "Download trust detailed design target", "download-trust-detailed-design-target-v1126.png", "Public Download Trust", "pathname === \"/download/trust\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Download Trust", "download-trust-detailed-design-target-v1126.png", "WEB-FE-DOWNLOAD-TRUST-DETAILED-DESIGN-TARGET-v1.126.png", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    for line in registry.splitlines():
        if line.startswith("| Public Service |") and "/download/trust" in line:
            fail("docs/design/DESIGN-TARGET-REGISTRY.md: /download/trust should not remain under broad Public Service applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126.md", "LGO-WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-REPORT-v1.126.md", "HANDOFF-LGO-WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126.md"]:
        require_text(rel, ["WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Download Trust", "browser/e2e", "fold density", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126 WEB_CLOSED", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.127"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-DOWNLOAD-TRUST-DESIGN-TARGET-DENSITY-v1.126 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE DOWNLOAD TRUST DESIGN TARGET DENSITY v1.126 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE DOWNLOAD TRUST DESIGN TARGET DENSITY v1.126 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
