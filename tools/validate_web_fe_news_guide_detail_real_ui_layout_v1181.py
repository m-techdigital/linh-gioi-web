#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_news_guide_detail_real_ui_layout_v1181] FAIL: {message}", file=sys.stderr)
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
    require_text("AGENTS.md", [
        "Design targets must stay synchronized with the accepted common UI/UX layout",
        "shared header, footer, menu, shell and navigation patterns",
        "Base UI/UX Layout rule",
    ])
    require_text("docs/execution/WEB-ACTIVE-GOAL.md", [
        "Nếu design target không đồng bộ UI/UX Layout chung như header, footer, menu, shell hoặc navigation đã được chấp nhận",
        "Base First là luật chặn bắt buộc",
        "Real UI/UX Layout trong browser",
    ])
    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        '"news-guide-detail-pages-started": "Bài viết giải thích news và guide detail"',
        'title={articleDetailTitle(slug)}',
        'Trang bài viết mở rộng ngữ cảnh người chơi cần biết',
        'không tuyên bố backend vận hành chính thức',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'Detail page mở rộng ngữ cảnh',
        'ranh giới non-claim',
        'không tuyên bố backend production',
        'WEB v1.9 article detail',
        'Detail section',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "news-guide-detail-pages-started"',
        'WEB v1.9 biến trang danh sách thành trải nghiệm detail dễ đọc cho tin tức, hướng dẫn, trạng thái và tải game.',
        'WEB v1.9 làm sâu các trang detail public: bài news có ngữ cảnh, guide có bước đọc tiếp, trạng thái có giải thích và tải game có ranh giới rõ.',
        'Detail page giải thích sâu hơn summary',
        'News, guide, status và download phải cùng nhịp đọc',
        'Không mở CMS, không có workflow biên tập backend và không có dữ liệu live support.',
        'Không công bố artifact tải game, không mở xác thực vận hành chính thức và không tạo quyền tải game.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "news-guide-detail-pages-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for news-guide-detail-pages-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'WEB v1.9 keeps the product focus on public website quality',
        'article detail sections, guide detail steps',
        'no CMS, no production auth, no DB persistence',
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

    require_text("tests/e2e/fe-news-guide-detail-real-ui-layout-v1181.spec.ts", [
        '/news/news-guide-detail-pages-started renders compact Vietnamese news guide detail article flow',
        'Bài viết giải thích news và guide detail',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-guide-detail-${isMobile ? "mobile" : "desktop"}-v1181.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181 WEB_CLOSED',
        'Select `/performance`',
        '/tmp/news-guide-detail-desktop-v1181.png',
        '/tmp/news-guide-detail-mobile-v1181.png',
        'Real Browser UI/UX Layout First',
        'Base First',
        'shared header/menu/footer coherence',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.209',
        'Current FE scope: select `/performance`',
        'Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181 | WEB-FE | WEB_CLOSED | 76d0aa1 |',
        'Playwright desktop/mobile 2/2 news guide detail real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181.md',
        'docs/execution/LGO-WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-REPORT-v1.181.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_guide_detail_real_ui_layout_v1181] PASS')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
