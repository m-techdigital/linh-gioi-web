#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_news_closed_tester_pack_real_ui_layout_v1183] FAIL: {message}", file=sys.stderr)
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
        '"closed-tester-information-pack-started": "Bài viết giải thích gói thông tin người kiểm thử"',
        'title={articleDetailTitle(slug)}',
        'Trang bài viết mở rộng ngữ cảnh người chơi cần biết',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "closed-tester-information-pack-started"',
        'title: "Gói thông tin người kiểm thử đã sẵn sàng"',
        'WEB v1.20 giải thích người chơi kiểm thử tương lai nên đọc gì, chuẩn bị gì và tránh chia sẻ gì trước khi có kênh đăng ký thật.',
        'Gói thông tin người kiểm thử giữ web public hữu ích mà không mở đăng ký.',
        'Gói người kiểm thử là hướng dẫn, không phải kênh đăng ký',
        'Ranh giới riêng tư được đặt cạnh phần góp ý',
        'Không mở kênh đăng ký trực tiếp, không bảo đảm suất kiểm thử và không mở đăng ký công khai.',
        'Không thu mật khẩu, mã bảo mật, dữ liệu thanh toán hoặc dữ liệu cá nhân nhạy cảm.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "closed-tester-information-pack-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for closed-tester-information-pack-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Closed tester information pack is prepared',
        'WEB v1.20 explains what a future tester should read',
        'The closed tester information pack keeps the public website useful',
        'without opening registration',
        'no tester intake backend',
        'no account entitlement',
        'No live tester intake, no guaranteed tester slot, no open registration.',
        'No collection of passwords, tokens, dữ liệu thanh toán or sensitive personal data.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack',
        'max-width: 18ch;',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth-card',
        '.lgo-newsdetail-related-card',
        '.lgo-newsdetail-next-steps',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-newsdetailpage-stack',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth',
        '.lgo-newsdetail-related',
        '.lgo-newsdetail-next-steps',
    ])

    require_text("tests/e2e/fe-news-closed-tester-pack-real-ui-layout-v1183.spec.ts", [
        '/news/closed-tester-information-pack-started renders compact Vietnamese closed tester information article flow',
        'Gói thông tin người kiểm thử đã sẵn sàng',
        'Bài viết giải thích gói thông tin người kiểm thử',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        '/tmp/news-closed-tester-pack-${isMobile ? "mobile" : "desktop"}-v1183.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.183 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-closed-tester-pack-desktop-v1183.png',
        '/tmp/news-closed-tester-pack-mobile-v1183.png',
        'Real Browser UI/UX Layout First',
        'Base First',
        'shared header/menu/footer coherence',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.212',
        'Current FE scope: select `/game/loop`',
        'Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.183 | WEB-FE | WEB_CLOSED | bd06781 |',
        'Playwright desktop/mobile 2/2 news closed tester pack real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.183.md',
        'docs/execution/LGO-WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-REPORT-v1.183.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.183.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.183', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_closed_tester_pack_real_ui_layout_v1183] PASS')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
