#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_faq_search_helpfulness_real_ui_layout_v1197] FAIL: {message}", file=sys.stderr)
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
        '"faq-search-helpfulness-polish-started": "Bài viết giải thích FAQ dễ tìm và hữu ích"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "faq-search-helpfulness-polish-started"',
        'title: "FAQ dễ tìm và hữu ích hơn"',
        'WEB v1.21 giúp người chơi tìm FAQ đúng nhóm, hiểu bước tiếp theo và nhận hỗ trợ tĩnh rõ ràng mà không tạo backend tìm kiếm giả.',
        'WEB v1.21 làm rõ /support/help, nhóm câu hỏi theo nhu cầu người chơi, giải thích route theo loại vấn đề và nhắc rằng tìm kiếm hiện chỉ là chỉ dẫn tĩnh cho đến khi có hợp đồng backend tìm kiếm được chấp nhận.',
        'FAQ được nhóm theo nhu cầu người chơi',
        'Bước tiếp theo hữu ích nhưng không giả hệ thống hỗ trợ',
        'Không có backend tìm kiếm, hộp chat tự động hoặc tra cứu tài khoản thật.',
        'Không có tuyến phiếu hỗ trợ, không có hộp chat live và không có SLA hỗ trợ production.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "faq-search-helpfulness-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for faq-search-helpfulness-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'FAQ search and helpfulness polish starts',
        'WEB v1.21 improves FAQ discovery, helpfulness grouping and support route clarity without adding a fake search backend.',
        'WEB v1.21 keeps building the public web product. It adds a dedicated support help route, groups common questions by player intent, explains issue-category routing and states that search is static guidance only until a real backend/search contract exists.'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-faq-search-helpfulness-real-ui-layout-v1197.spec.ts", [
        '/news/faq-search-helpfulness-polish-started renders compact Vietnamese FAQ helpfulness article flow',
        'FAQ dễ tìm và hữu ích hơn', 'Bài viết giải thích FAQ dễ tìm và hữu ích', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-faq-search-helpfulness-${isMobile ? "mobile" : "desktop"}-v1197.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.197 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-faq-search-helpfulness-desktop-v1197.png', '/tmp/news-faq-search-helpfulness-mobile-v1197.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221',
        'Current FE scope: select `/release/readiness`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.197 | WEB-FE | WEB_CLOSED | c2f820f |',
        'Playwright desktop/mobile 2/2 news FAQ search helpfulness real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.197.md',
        'docs/execution/LGO-WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-REPORT-v1.197.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.197.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.197', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_faq_search_helpfulness_real_ui_layout_v1197] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
