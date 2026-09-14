#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_news_release_readiness_real_ui_layout_v1184] FAIL: {message}", file=sys.stderr)
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
        '"release-readiness-hub-polish-started": "Bài viết giải thích hub sẵn sàng phát hành"',
        'title={articleDetailTitle(slug)}',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "release-readiness-hub-polish-started"',
        'title: "Hub sẵn sàng phát hành rõ ràng hơn"',
        'WEB v1.19 gom cổng phê duyệt, kỳ vọng kiểm thử và sự đồng bộ Tải game · Trạng thái · Hỗ trợ vào một hub sẵn sàng riêng.',
        'WEB v1.19 làm rõ /release/readiness để người chơi và reviewer thấy cổng nào công khai',
        'Hub sẵn sàng phát hành gom các cổng quan trọng về một chỗ',
        'Tải game, Trạng thái và Hỗ trợ phải cùng nói một sự thật',
        'Không có bản tải công khai, không mở beta công khai và không tự động cấp quyền.',
        'Không có phiếu hỗ trợ giả, không có checksum giữ chỗ và không tuyên bố sẵn sàng phát hành.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "release-readiness-hub-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for release-readiness-hub-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Release readiness hub gets clearer',
        'WEB v1.19 groups owner gates',
        'WEB v1.19 keeps building the public web product',
        'players and reviewers can see',
        'before any download, test, support or community CTA is treated as real',
        'No public download, no open beta, no entitlement automation.',
        'No fake ticket, no placeholder checksum, no sẵn sàng phát hành claim.',
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

    require_text("tests/e2e/fe-news-release-readiness-real-ui-layout-v1184.spec.ts", [
        '/news/release-readiness-hub-polish-started renders compact Vietnamese release readiness article flow',
        'Hub sẵn sàng phát hành rõ ràng hơn',
        'Bài viết giải thích hub sẵn sàng phát hành',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        '/tmp/news-release-readiness-${isMobile ? "mobile" : "desktop"}-v1184.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-release-readiness-desktop-v1184.png',
        '/tmp/news-release-readiness-mobile-v1184.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220',
        'Current FE scope: select `/release`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184 | WEB-FE | WEB_CLOSED | 3c7d13a |',
        'Playwright desktop/mobile 2/2 news release readiness real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184.md',
        'docs/execution/LGO-WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-REPORT-v1.184.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_release_readiness_real_ui_layout_v1184] PASS')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
