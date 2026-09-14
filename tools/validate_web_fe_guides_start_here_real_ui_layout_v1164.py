#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_start_here_real_ui_layout_v1164] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} still contains stale text {needle!r}")

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/[slug]/page.tsx", [
        'entry.slug === "start-here-content-hub-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-starthubpage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-start-hub-hero-card',
        'Bắt đầu đọc web',
        'Guide tĩnh · chưa có gợi ý backend · chưa có đăng nhập',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "start-here-content-hub-guide"',
        'title: "Bắt đầu đọc web Linh Giới"',
        'trang Bắt đầu',
        'Tin cậy tải game',
        'ranh giới',
        'Bắt đầu từ trang Bắt đầu',
        'Đi theo nhóm trang phù hợp',
        'Kiểm tra ranh giới trước kỳ vọng phát hành',
        'Đi tiếp bằng đường dẫn an toàn',
        'Chưa có nút tải thật, đăng nhập production, quyền tải hoặc lịch test được duyệt.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Start here: cách đọc website Linh Giới Online"',
        'Start hub để chọn đúng trang',
        'download trust, roadmap, status, support hoặc community',
        'non-claim trước khi kỳ vọng release',
        'Bắt đầu từ Start hub',
        'Đi theo route group phù hợp',
        'No personalized account route, no backend recommendation, no CMS navigation.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Start content hub guide composes compact guide-flow base',
        '.lgo-starthubpage-stack',
        '.lgo-start-hub-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-starthubpage-stack',
        '.lgo-start-hub-hero-card',
    ])

    require_text("tests/e2e/fe-guides-start-here-real-ui-layout-v1164.spec.ts", [
        '/guides/start-here-content-hub-guide renders first-reading route flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first start step appears in first fold',
        'Bắt đầu đọc web',
        '/tmp/guides-start-here-${isMobile ? "mobile" : "desktop"}-v1164.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164 WEB_CLOSED',
        'Select `/guides/start-here-content-hub-guide`',
        '/tmp/guides-start-here-desktop-v1164.png',
        '/tmp/guides-start-here-mobile-v1164.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.195',
        'Current FE scope: select `/news/release-readiness-hub-polish-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 start here guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164.md',
        'docs/execution/LGO-WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-REPORT-v1.164.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_start_here_real_ui_layout_v1164] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
