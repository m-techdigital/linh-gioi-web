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

def check_public_cinematic_component() -> None:
    rel = "apps/web/src/components/PublicGameExperienceSections.tsx"
    text = require_text(rel, [
        "function CinematicWorldScene",
        "worldConceptArt.webPath",
        "loading=\"eager\"",
        "sizes={compact ?",
    ])
    scene_start = text.find("export function CinematicWorldScene")
    scene_end = text.find("export function GamePillarGrid")
    scene = text[scene_start:scene_end]
    if "priority=" in scene:
        fail(f"{rel}: CinematicWorldScene should use explicit loading, not priority")
    if "fetch(" in scene or "axios" in scene or "<form" in scene:
        fail(f"{rel}: forbidden backend/form marker in cinematic scene")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53.md",
        "LGO-WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-REPORT-v1.53.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-cinematic-image-loading-v153.spec.ts", [
        "lgo-world-concept-art",
        "loading",
        "eager",
        "horizontal overflow",
        "font-size",
        "Sống một đời khác trong Linh Giới",
        "Một thế giới có nơi để trở về",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53.md",
        "LGO-WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-REPORT-v1.53.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53",
            "WEB_CLOSED",
            "LCP",
            "loading=\"eager\"",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53 WEB_CLOSED",
        "WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-CINEMATIC-IMAGE-LOADING-v1.53 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.54",
        "browser/e2e",
    ])

def main() -> int:
    check_public_cinematic_component()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC CINEMATIC IMAGE LOADING v1.53 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC CINEMATIC IMAGE LOADING v1.53 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
