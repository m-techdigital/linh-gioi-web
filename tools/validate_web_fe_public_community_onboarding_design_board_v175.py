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

def check_community_onboarding_board() -> None:
    require_file("apps/web/public/game-art/design-boards/community-onboarding-gameplay-loop.svg")
    svg = read("apps/web/public/game-art/design-boards/community-onboarding-gameplay-loop.svg")
    if "<svg" not in svg or len(svg) > 12000:
        fail("community-onboarding-gameplay-loop.svg should be a small SVG reference-art asset")
    require_text("apps/web/src/app/community/onboarding/page.tsx", [
        "lgo-community-onboarding-design-board",
        "/game-art/design-boards/community-onboarding-gameplay-loop.svg",
        "Community onboarding gameplay loop board",
        "loading=\"eager\"",
        "Game reference art",
        "không phải forum live",
    ])
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.75 public community onboarding gameplay-loop board",
        ".lgo-community-onboarding-design-board",
        ".lgo-community-onboarding-design-board img",
        "grid-template-columns: 1fr",
        "overflow-wrap: anywhere",
    ])

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-community-onboarding-design-board-v175.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75.md",
        "LGO-WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-REPORT-v1.75.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-community-onboarding-design-board-v175.spec.ts", [
        "/community/onboarding",
        "Community onboarding gameplay loop board",
        "/game-art/design-boards/community-onboarding-gameplay-loop.svg",
        "loading",
        "naturalWidth",
        "community onboarding horizontal overflow",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75.md",
        "LGO-WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-REPORT-v1.75.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75",
            "WEB_CLOSED",
            "Community onboarding gameplay loop board",
            "browser/e2e",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75 WEB_CLOSED",
        "WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-COMMUNITY-ONBOARDING-DESIGN-BOARD-v1.75 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.76",
        "browser/e2e",
    ])

def main() -> int:
    check_community_onboarding_board()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC COMMUNITY ONBOARDING DESIGN BOARD v1.75 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC COMMUNITY ONBOARDING DESIGN BOARD v1.75 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
