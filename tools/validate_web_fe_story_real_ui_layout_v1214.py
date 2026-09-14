#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_story_real_ui_layout_v1214] FAIL: {message}", file=sys.stderr)
    sys.exit(1)


def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists():
        fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")


def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing {needle!r}")


def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text:
            fail(f"{rel} still contains forbidden text {needle!r}")


def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a = text.find(first)
    b = text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} must appear before {second!r}")


def main() -> int:
    require_text("apps/web/src/app/story/page.tsx", [
        "lgo-player-facing-stack lgo-storypage-stack",
        "PublicPlayerHero",
        "<div id=\"chapters\"><NarrativeChapterGrid /></div>",
        "details className=\"lgo-service-disclosure-stack lgo-storypage-expanded-evidence\"",
        "Bằng chứng phụ và tuyến cốt truyện",
        "không ép toàn bộ proof board vào first-flow `/story`",
        "lgo-service-disclosure-body",
        "StoryArcTimeline",
        "lgo-story-fracture-design-board",
        "ShadowInvasionFeature",
    ])
    require_order("apps/web/src/app/story/page.tsx", "<PublicPlayerHero", "<div id=\"chapters\"><NarrativeChapterGrid /></div>")
    require_order("apps/web/src/app/story/page.tsx", "<div id=\"chapters\"><NarrativeChapterGrid /></div>", "lgo-storypage-expanded-evidence")
    require_order("apps/web/src/app/story/page.tsx", "lgo-storypage-expanded-evidence", "<StoryArcTimeline />")
    require_order("apps/web/src/app/story/page.tsx", "<StoryArcTimeline />", "lgo-story-fracture-design-board")
    require_order("apps/web/src/app/story/page.tsx", "lgo-story-fracture-design-board", "<ShadowInvasionFeature />")
    forbid_text("apps/web/src/app/story/page.tsx", [
        "Opening narrative",
        "Dong Mon fracture",
        "quest state live",
        "Design Target First",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "v1.214 shared story overview layout for the public narrative route",
        ".lgo-storypage-stack .lgo-story-hero.lgo-cinematic-hero",
        ".lgo-storypage-stack .lgo-narrative-chapters",
        ".lgo-storypage-stack .lgo-narrative-chapter",
        ".lgo-storypage-stack .lgo-storypage-expanded-evidence",
        ".lgo-story-fracture-design-board",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
        "min-height: 166px",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        ".lgo-story-hero .lgo-cinematic-copy h1{max-width:13ch}",
        "WEB v1.84 public story fracture design board",
        ".lgo-story-fracture-design-board img",
        "WEB v1.84 shared public player hero typography cap",
    ])

    require_text("tests/e2e/fe-story-real-ui-layout-v1214.spec.ts", [
        "story real UI layout v1.214",
        "lgo-storypage-expanded-evidence",
        "one shared disclosure for secondary story proof",
        "details:not([open])",
        "desktop page height remains reviewable while proof is collapsed",
        "mobile page height remains reviewable while proof is collapsed",
        "/tmp/story-mobile-v1214.png",
        "/tmp/story-desktop-v1214.png",
    ])
    require_text("tests/e2e/fe-story-design-target-density-v1121.spec.ts", ["story design target density", "chapter cards in first fold"])
    require_text("tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts", ["story Vietnamese design match", "Bằng chứng phụ và tuyến cốt truyện"])
    require_text("tests/e2e/fe-public-story-fracture-design-board-v184.spec.ts", ["lgo-storypage-expanded-evidence > summary", "Ảnh ý tưởng Vết Nứt Đông Môn"])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-STORY-REAL-UI-LAYOUT-v1.214 WEB_CLOSED",
        "/story",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/story-desktop-v1214.png",
        "/tmp/story-mobile-v1214.png",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217",
        "Select `/start` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217",
        "Current FE scope: select `/start`",
        "Complete `/start` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-STORY-REAL-UI-LAYOUT-v1.214 | WEB-FE | WEB_CLOSED |",
        "Public Story real browser UI layout and Base First disclosure narrative flow",
        "Playwright desktop/mobile 9/9 story layout/design-board checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-STORY-REAL-UI-LAYOUT-v1.214.md",
        "docs/execution/LGO-WEB-FE-STORY-REAL-UI-LAYOUT-REPORT-v1.214.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-STORY-REAL-UI-LAYOUT-v1.214.md",
    ]:
        require_text(rel, [
            "WEB-FE-STORY-REAL-UI-LAYOUT-v1.214",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "AXIRO",
        ])

    print("[validate_web_fe_story_real_ui_layout_v1214] PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
