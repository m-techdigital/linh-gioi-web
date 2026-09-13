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

def check_public_class_art_component() -> None:
    rel = "apps/web/src/components/PublicGameExperienceSections.tsx"
    text = require_text(rel, [
        "function ClassArtSpotlight",
        "voStarterArt.webPath",
        "voSkillArt.webPath",
        "lgo-class-art-board-starter",
        "lgo-class-art-board-skill",
    ])
    start = text.find("export function ClassArtSpotlight")
    end = text.find("export function WorldPanoramaBand")
    block = text[start:end]
    if block.count('loading="eager"') < 2:
        fail(f"{rel}: ClassArtSpotlight should explicitly eager-load both art board images")
    if "priority=" in block:
        fail(f"{rel}: ClassArtSpotlight should not use priority")
    if "fetch(" in block or "axios" in block or "<form" in block:
        fail(f"{rel}: forbidden backend/form marker in class art spotlight")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-class-art-loading-v154.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54.md",
        "LGO-WEB-FE-PUBLIC-CLASS-ART-LOADING-REPORT-v1.54.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-class-art-loading-v154.spec.ts", [
        "lgo-class-art-spotlight",
        "loading",
        "eager",
        "horizontal overflow",
        "font-size",
        "Chọn cách bạn nhìn và bảo vệ thế giới",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54.md",
        "LGO-WEB-FE-PUBLIC-CLASS-ART-LOADING-REPORT-v1.54.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54",
            "WEB_CLOSED",
            "loading=\"eager\"",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54 WEB_CLOSED",
        "WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-CLASS-ART-LOADING-v1.54 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT",
        "browser/e2e",
    ])

def main() -> int:
    check_public_class_art_component()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC CLASS ART LOADING v1.54 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC CLASS ART LOADING v1.54 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
