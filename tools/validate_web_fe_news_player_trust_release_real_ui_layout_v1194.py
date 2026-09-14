#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_player_trust_release_real_ui_layout_v1194] FAIL: {message}", file=sys.stderr)
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
        '"player-trust-release-narrative-started": "Bài viết giải thích niềm tin người chơi và lộ trình phát hành"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "player-trust-release-narrative-started"',
        'title: "Niềm tin phát hành rõ ràng hơn"',
        'WEB v1.18 giải thích lộ trình nội dung sẵn sàng → chuẩn bị kiểm thử giới hạn → ứng viên tải công khai mà không tuyên bố hệ thống phát hành production.',
        'WEB v1.18 làm rõ tín hiệu niềm tin, giai đoạn phát hành và điểm kiểm chứng để người chơi biết hôm nay có gì thật, cần bằng chứng gì tiếp theo và tuyên bố nào vẫn bị chặn.',
        'Lộ trình phát hành giải thích giai đoạn, không quảng cáo launch',
        'Hành trình tin cậy nối Tải game, Trạng thái và Hỗ trợ',
        'Không có bản tải công khai, không mở beta công khai và không có luồng cấp quyền.',
        'Không có tải game giả, không có hộp thư ticket bảo mật và không có SLA production.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "player-trust-release-narrative-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for player-trust-release-narrative-started')
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        '"player-trust-release-narrative-started": "Bài viết giải thích player trust và release narrative"'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-player-trust-release-real-ui-layout-v1194.spec.ts", [
        '/news/player-trust-release-narrative-started renders compact Vietnamese player trust release article flow',
        'Niềm tin phát hành rõ ràng hơn', 'Bài viết giải thích niềm tin người chơi và lộ trình phát hành', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-player-trust-release-${isMobile ? "mobile" : "desktop"}-v1194.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194 WEB_CLOSED',
        'Select `/patch-notes`',
        '/tmp/news-player-trust-release-desktop-v1194.png', '/tmp/news-player-trust-release-mobile-v1194.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.199',
        'Current FE scope: select `/patch-notes`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194 | WEB-FE | WEB_CLOSED | fb64071 |',
        'Playwright desktop/mobile 2/2 news player trust release real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194.md',
        'docs/execution/LGO-WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-REPORT-v1.194.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_player_trust_release_real_ui_layout_v1194] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
