#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_community_roadmap_real_ui_layout_v1163] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "community-roadmap-onboarding-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-communityroadmappage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-community-roadmap-hero-card',
        'Lộ trình cộng đồng',
        'Guide tĩnh · chưa có diễn đàn/chat live · chưa có lịch test',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "community-roadmap-onboarding-guide"',
        'title: "Lộ trình cộng đồng đúng kỳ vọng"',
        'Trạng thái chơi',
        'Tin cậy tải game',
        'mốc quyết định',
        'Xem trạng thái công khai trước',
        'Đọc mốc quyết định lộ trình',
        'Góp ý đúng phạm vi',
        'Chờ thông báo chủ sở hữu',
        'Chưa có lịch test được duyệt, quyền tải, tài khoản production hoặc moderation live.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Cách theo dõi roadmap và tham gia cộng đồng đúng kỳ vọng"',
        'status, roadmap, feedback và staged release',
        'Xem public status trước',
        'Đọc roadmap decision gates',
        'No forum/chat/guild backend, no ticket backend, no account lookup.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Community roadmap onboarding guide composes compact guide-flow base',
        '.lgo-communityroadmappage-stack',
        '.lgo-community-roadmap-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-communityroadmappage-stack',
        '.lgo-community-roadmap-hero-card',
    ])

    require_text("tests/e2e/fe-guides-community-roadmap-real-ui-layout-v1163.spec.ts", [
        '/guides/community-roadmap-onboarding-guide renders roadmap/community expectation flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first roadmap step appears in first fold',
        'Lộ trình cộng đồng',
        '/tmp/guides-community-roadmap-${isMobile ? "mobile" : "desktop"}-v1163.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163 WEB_CLOSED',
        'Select `/guides/community-roadmap-onboarding-guide`',
        '/tmp/guides-community-roadmap-desktop-v1163.png',
        '/tmp/guides-community-roadmap-mobile-v1163.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.190',
        'Current FE scope: select `/news/player-safety-support-faq-polish-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 community roadmap guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163.md',
        'docs/execution/LGO-WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-REPORT-v1.163.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_community_roadmap_real_ui_layout_v1163] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
