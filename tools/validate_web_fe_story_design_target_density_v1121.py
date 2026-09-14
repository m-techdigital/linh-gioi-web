#!/usr/bin/env python3
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")

def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        fail(f"{rel}: expected PNG")
        return (0, 0)
    return struct.unpack(">II", data[16:24])

def check_target() -> None:
    targets = [
        "apps/web/public/design-reference/story-detailed-design-target-v1121.png",
        "docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png",
    ]
    for rel in targets:
        require_file(rel)
        width, height = png_size(rel)
        if width < 1600 or height < 900:
            fail(f"{rel}: expected high-fidelity story target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000:
            fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets):
        if (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes():
            fail("story detailed target public/docs copies differ")

def check_tests_docs() -> None:
    for rel in [
        "tests/e2e/fe-story-design-target-density-v1121.spec.ts",
        "docs/execution/specs/WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121.md",
        "LGO-WEB-FE-STORY-DESIGN-TARGET-DENSITY-REPORT-v1.121.md",
        "HANDOFF-LGO-WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121.md",
    ]:
        require_file(rel)
    require_text("tests/e2e/fe-story-design-target-density-v1121.spec.ts", [
        "story design target density",
        "Public Story",
        "story-detailed-design-target-v1121.png",
        "desktop first chapter card enters first fold",
        "desktop first chapter card visible in first fold",
        "desktop story arc starts near target board",
        "story page h1 follows target scale",
    ])
    require_text("apps/web/src/app/story/page.tsx", ["lgo-storypage-stack", "NarrativeChapterGrid", "StoryArcTimeline", "lgo-story-fracture-design-board"])
    story = read("apps/web/src/app/story/page.tsx")
    if not (story.find("<div id=\"chapters\"><NarrativeChapterGrid /></div>") < story.find("<StoryArcTimeline />") < story.find("lgo-story-fracture-design-board")):
        fail("apps/web/src/app/story/page.tsx: expected chapters before story arc before fracture design board")
    require_text("packages/ui/src/service-layout.css", [
        "v1.214 shared story overview layout for the public narrative route",
        ".lgo-storypage-stack",
        ".lgo-story-fracture-design-board",
    ])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", [
        "PUBLIC_STORY_TARGET",
        "Thiết kế chi tiết cốt truyện",
        "story-detailed-design-target-v1121.png",
        "Public Story",
    ])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Story", "story-detailed-design-target-v1121.png", "Design Target First"])
    for rel in [
        "docs/execution/specs/WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121.md",
        "LGO-WEB-FE-STORY-DESIGN-TARGET-DENSITY-REPORT-v1.121.md",
        "HANDOFF-LGO-WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121.md",
    ]:
        require_text(rel, [
            "WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121",
            "WEB_CLOSED",
            "Design Target First",
            "Base UI/UX Layout",
            "Public Story",
            "browser/e2e",
            "fold density",
            "built-in image_gen",
            "No production auth",
            "No DB persistence",
            "No real Portal integration",
            "No real Ops/Admin mutation",
            "NO_ACCEPTED_BACKEND_CONTRACT",
        ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121 WEB_CLOSED",
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.122",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121 | WEB-FE | WEB_CLOSED |"])

def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE STORY DESIGN TARGET DENSITY v1.121 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB FE STORY DESIGN TARGET DENSITY v1.121 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
