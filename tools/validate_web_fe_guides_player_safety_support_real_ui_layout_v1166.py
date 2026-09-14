#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_player_safety_support_real_ui_layout_v1166] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "player-safety-support-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-playersafetypage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-player-safety-guide-hero-card',
        'An toàn hỗ trợ',
        'Guide tĩnh · chưa có ticket live · chưa có tra cứu tài khoản',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "player-safety-support-guide"',
        'title: "An toàn và hỗ trợ cho người chơi mới"',
        'FAQ hỗ trợ',
        'báo lỗi an toàn',
        'Cộng đồng',
        'Đọc FAQ hỗ trợ trước',
        'Chuẩn bị báo lỗi an toàn',
        'Theo dõi cộng đồng đúng phạm vi',
        'Kiểm trạng thái trước khi chờ phản hồi',
        'Chưa có live support ticket, moderation dashboard, quyền tải, xác thực production hoặc backend contract accepted.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Hướng dẫn an toàn và hỗ trợ cho người chơi mới"',
        'Cách đọc support FAQ',
        'chuẩn bị bug report an toàn',
        'closed-test support',
        'ticket/account/moderation backend',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Player safety support guide composes compact guide-flow base',
        '.lgo-playersafetypage-stack',
        '.lgo-player-safety-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-playersafetypage-stack',
        '.lgo-player-safety-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-player-safety-support-real-ui-layout-v1166.spec.ts", [
        '/guides/player-safety-support-guide renders compact safe-support flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first safety step appears near first fold',
        'An toàn hỗ trợ',
        '/tmp/guides-player-safety-support-${isMobile ? "mobile" : "desktop"}-v1166.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166 WEB_CLOSED',
        'Select `/guides/player-safety-support-guide`',
        '/tmp/guides-player-safety-support-desktop-v1166.png',
        '/tmp/guides-player-safety-support-mobile-v1166.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.175',
        'Current FE scope: select `/patch-notes`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 player safety support guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166.md',
        'docs/execution/LGO-WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.166.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.166', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_player_safety_support_real_ui_layout_v1166] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
