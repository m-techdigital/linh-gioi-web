#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_beginner_real_ui_layout_v1157] FAIL: {message}", file=sys.stderr)
    sys.exit(1)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists(): fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")

def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text: fail(f"{rel} missing {needle!r}")

def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text: fail(f"{rel} still contains stale text {needle!r}")

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b: fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/beginner/page.tsx", [
        "lgo-player-facing-stack lgo-service-compact-proof-page lgo-beginnerpage-stack",
        "lgo-detail-hero-card lgo-beginner-hero-card",
        "Hướng dẫn nhập môn",
        "Cổng Linh · Đá Luyện · trạng thái tải game",
        "Xem thế giới",
        "Guide vòng lặp",
        "Tin cậy tải",
        "lgo-guide-detail-boundary",
        "WorldStoryDepth",
        "BeginnerGuideDepth",
        "DownloadStatusDepth",
        "SupportFaqDepth",
    ])
    forbid_text("apps/web/src/app/guides/beginner/page.tsx", [
        "WEB v1.8 beginner guide",
        "SpiritPanel",
        "claim production",
    ])
    require_order("apps/web/src/app/guides/beginner/page.tsx", "lgo-beginner-hero-card", "<WorldStoryDepth />")
    require_order("apps/web/src/app/guides/beginner/page.tsx", "<WorldStoryDepth />", "<BeginnerGuideDepth />")
    require_order("apps/web/src/app/guides/beginner/page.tsx", "<BeginnerGuideDepth />", "<DownloadStatusDepth />")
    require_order("apps/web/src/app/guides/beginner/page.tsx", "<DownloadStatusDepth />", "<SupportFaqDepth />")

    require_text("apps/web/src/components/PublicGameInfoDepthSections.tsx", [
        "function publicGuideText",
        "function publicBoundaryLabel",
        "Nền tảng thế giới",
        "Guide nhập môn",
        "Trạng thái tải game",
        "publicGuideText(chapter.title)",
        "publicGuideText(item.title)",
        "publicBoundaryLabel(chapter.nonClaim)",
        "publicBoundaryLabel(item.blockedScope)",
    ])
    forbid_text("apps/web/src/components/PublicGameInfoDepthSections.tsx", [
        "WEB v1.8 game info depth",
        "Beginner guide\" title",
        "Download status depth",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "Shared public game-information depth layout; moved from app globals for Base First ownership",
        ".lgo-depth-panel",
        ".lgo-story-chapters",
        ".lgo-guide-step",
        "Shared compact beginner guide page layout",
        ".lgo-beginnerpage-stack",
        ".lgo-beginner-hero-card",
        "grid-template-columns: repeat(4, minmax(0, 1fr))",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.8 public game information depth",
        ".lgo-depth-panel,",
        ".lgo-story-chapter,",
        ".lgo-guide-step > span",
        ".lgo-depth-cta",
    ])

    require_text("tests/e2e/fe-guides-beginner-real-ui-layout-v1157.spec.ts", [
        "/guides/beginner renders compact beginner path from Cổng Linh to Đá Luyện",
        "mobile page height compact",
        "desktop guide reaches first fold",
        "horizontal overflow",
        "Xem thế giới",
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157 WEB_CLOSED",
        "Select `/guides/beginner`",
        "/tmp/guides-beginner-desktop-v1157.png",
        "/tmp/guides-beginner-mobile-v1157.png",
        "Base First",
        "Real Browser UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.210",
        "Current FE scope: select `/accessibility`",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157 | WEB-FE | WEB_CLOSED |",
        "Playwright desktop/mobile 2/2 beginner guide layout checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157.md",
        "docs/execution/LGO-WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-REPORT-v1.157.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157.md",
    ]:
        require_text(rel, ["WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157", "WEB_CLOSED", "Real Browser UI/UX Layout First", "Base First", "browser/e2e", "NO_ACCEPTED_BACKEND_CONTRACT"])
    print("[validate_web_fe_guides_beginner_real_ui_layout_v1157] PASS")
    return 0

if __name__ == "__main__": sys.exit(main())
