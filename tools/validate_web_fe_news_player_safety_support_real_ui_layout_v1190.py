#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_player_safety_support_real_ui_layout_v1190] FAIL: {message}", file=sys.stderr)
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

def main() -> int:
    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        '"player-safety-support-faq-polish-started": "Bài viết giải thích an toàn người chơi và FAQ hỗ trợ"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "player-safety-support-faq-polish-started"',
        'title: "FAQ an toàn và hỗ trợ rõ hơn"',
        'WEB v1.14 tập trung vào wording an toàn người chơi, chất lượng FAQ hỗ trợ, báo lỗi an toàn dữ liệu và kỳ vọng hỗ trợ thử nghiệm.',
        'WEB v1.14 giữ trọng tâm ở website public. Slice này thêm hub an toàn/hỗ trợ, hướng dẫn báo lỗi an toàn dữ liệu, kỳ vọng hỗ trợ thử nghiệm và ranh giới cộng đồng mà không tuyên bố có ticket hỗ trợ trực tiếp, tra cứu account, dashboard điều phối hoặc tích hợp backend.',
        'FAQ an toàn đặt ranh giới hỗ trợ trước kỳ vọng ticket',
        'Hỗ trợ thử nghiệm nói rõ điều gì đang bị chặn',
        'Không có ticket hỗ trợ trực tiếp, không tra cứu account, không có dashboard điều phối và không có tích hợp backend.',
        'Không có hộp thư bảo mật, không có live moderation, không có SLA production và không có quyền tải game.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "player-safety-support-faq-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for player-safety-support-faq-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Bài viết giải thích nội dung public',
        'claim ticket live',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-player-safety-support-real-ui-layout-v1190.spec.ts", [
        '/news/player-safety-support-faq-polish-started renders compact Vietnamese player safety support article flow',
        'FAQ an toàn và hỗ trợ rõ hơn', 'Bài viết giải thích an toàn người chơi và FAQ hỗ trợ', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-player-safety-support-${isMobile ? "mobile" : "desktop"}-v1190.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190 WEB_CLOSED',
        'Select `/support`',
        '/tmp/news-player-safety-support-desktop-v1190.png', '/tmp/news-player-safety-support-mobile-v1190.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.204',
        'Current FE scope: select `/support`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190 | WEB-FE | WEB_CLOSED | 1d9abc1 |',
        'Playwright desktop/mobile 2/2 news player safety support real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190.md',
        'docs/execution/LGO-WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.190.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_player_safety_support_real_ui_layout_v1190] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
