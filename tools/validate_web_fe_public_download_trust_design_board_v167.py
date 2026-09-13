#!/usr/bin/env python3
from pathlib import Path

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

def check_download_trust_board() -> None:
    require_file("apps/web/public/game-art/design-boards/release-trust-gate.svg")
    svg = read("apps/web/public/game-art/design-boards/release-trust-gate.svg")
    if "<svg" not in svg or len(svg) > 12000:
        fail("release-trust-gate.svg should be a small SVG design-board asset")
    require_text("apps/web/src/components/PublicTrustSections.tsx", [
        "ReleaseTrustDesignBoard",
        "/game-art/design-boards/release-trust-gate.svg",
        "Release trust gate design board",
        "loading=\"eager\"",
        "Game reference art",
        "copied from LinhGioiOnline docs",
    ])
    require_text("apps/web/src/app/download/trust/page.tsx", [
        "ReleaseTrustDesignBoard",
        "<ReleaseTrustDesignBoard />",
    ])
    require_text("apps/web/src/app/globals.css", [
        ".lgo-release-trust-board",
        ".lgo-release-trust-board img",
        "overflow: hidden",
        "grid-template-columns: 1fr",
        "overflow-wrap: anywhere",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-download-trust-design-board-v167.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67.md",
        "LGO-WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-REPORT-v1.67.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-download-trust-design-board-v167.spec.ts", [
        "/download/trust",
        "Release trust gate design board",
        "/game-art/design-boards/release-trust-gate.svg",
        "loading",
        "naturalWidth",
        "pageOverflow",
        "visible font cap",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67.md",
        "LGO-WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-REPORT-v1.67.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67",
            "WEB_CLOSED",
            "ReleaseTrustDesignBoard",
            "Release trust gate design board",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67 WEB_CLOSED",
        "WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.68",
        "browser/e2e",
    ])

def main() -> int:
    check_download_trust_board()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC DOWNLOAD TRUST DESIGN BOARD v1.67 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC DOWNLOAD TRUST DESIGN BOARD v1.67 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
