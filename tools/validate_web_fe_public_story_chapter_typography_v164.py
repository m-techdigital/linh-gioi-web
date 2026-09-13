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

def check_story_typography() -> None:
    require_text("apps/web/src/components/PublicGameExperienceSections.tsx", [
        "export function NarrativeChapterGrid",
        "lgo-narrative-chapter",
        "lgo-chapter-visual",
        "0{index + 1}",
    ])
    css = require_text("apps/web/src/app/globals.css", [
        ".lgo-chapter-visual span",
        "font-size: 3.8rem",
        "@media (max-width: 560px)",
        ".lgo-chapter-visual { height: 5.8rem; }",
        ".lgo-chapter-visual span { font-size: 2.75rem; }",
    ])
    base = css.find(".lgo-chapter-visual span")
    mobile = css.rfind(".lgo-chapter-visual span { font-size: 2.75rem; }")
    if not (base != -1 and mobile > base):
        fail("apps/web/src/app/globals.css: mobile chapter number cap must come after base visual span style")
    for forbidden in ["fetch(", "axios", "<form", "use server"]:
        if forbidden in read("apps/web/src/components/PublicGameExperienceSections.tsx"):
            fail(f"apps/web/src/components/PublicGameExperienceSections.tsx: forbidden marker: {forbidden}")

def check_tests_and_docs() -> None:
    for rel in [
        "tests/e2e/fe-public-story-chapter-typography-v164.spec.ts",
        "docs/execution/specs/WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64.md",
        "LGO-WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-REPORT-v1.64.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-public-story-chapter-typography-v164.spec.ts", [
        "/story",
        "lgo-chapter-visual span",
        "fontSize",
        "toBeLessThanOrEqual(48)",
        "pageOverflow",
        "maxHeadingFont",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64.md",
        "LGO-WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-REPORT-v1.64.md",
        "HANDOFF-LGO-WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64.md",
    ]:
        require_text(rel, [
            "WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64",
            "WEB_CLOSED",
            "NarrativeChapterGrid",
            "2.75rem",
            "keyboard",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64 WEB_CLOSED",
        "WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64 | WEB-FE | WEB_CLOSED |",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.65",
        "browser/e2e",
    ])

def main() -> int:
    check_story_typography()
    check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC STORY CHAPTER TYPOGRAPHY v1.64 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE PUBLIC STORY CHAPTER TYPOGRAPHY v1.64 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
