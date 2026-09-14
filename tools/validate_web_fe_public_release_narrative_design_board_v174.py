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

def check_release_narrative_board() -> None:
    require_file("apps/web/public/game-art/design-boards/release-narrative-m0-to-m1-gate.svg")
    svg = read("apps/web/public/game-art/design-boards/release-narrative-m0-to-m1-gate.svg")
    if "<svg" not in svg or len(svg) > 12000:
        fail("release-narrative-m0-to-m1-gate.svg should be a small SVG reference-art asset")
    require_text("apps/web/src/app/release/page.tsx", [
        "lgo-release-narrative-design-board",
        "/game-art/design-boards/release-narrative-m0-to-m1-gate.svg",
        "Bảng thiết kế cổng M0 tới M1",
        "loading=\"eager\"",
        "Ảnh tham chiếu game",
        "không phải nút mở beta",
    ])
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.74 public release narrative M0-to-M1 gate board",
        ".lgo-release-narrative-design-board",
        ".lgo-release-narrative-design-board img",
        "grid-template-columns: 1fr",
        "overflow-wrap: anywhere",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-release-narrative-design-board-v174.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74.md",
        "LGO-WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-REPORT-v1.74.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-release-narrative-design-board-v174.spec.ts", [
        "/release",
        "Release narrative M0 to M1 gate board",
        "/game-art/design-boards/release-narrative-m0-to-m1-gate.svg",
        "loading",
        "naturalWidth",
        "release narrative horizontal overflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74.md",
        "LGO-WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-REPORT-v1.74.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74",
            "WEB_CLOSED",
            "Release narrative M0 to M1 gate board",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74 WEB_CLOSED",
        "WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_release_narrative_board()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC RELEASE NARRATIVE DESIGN BOARD v1.74 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC RELEASE NARRATIVE DESIGN BOARD v1.74 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
