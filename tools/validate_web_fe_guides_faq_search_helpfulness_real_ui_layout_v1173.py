#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_faq_search_helpfulness_real_ui_layout_v1173] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "faq-search-helpfulness-guide"',
        'isFaqSearchHelpfulnessGuide',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-faqhelpfulnessguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-faq-helpfulness-guide-hero-card',
        'FAQ hữu ích',
        'Guide tĩnh · chưa có tìm kiếm trực tuyến · chưa có tuyến phiếu hỗ trợ',
        '<GuideDetailDepth slug={entry.slug} />',
        '<FaqHelpfulnessCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "faq-search-helpfulness-guide"',
        'title: "Tìm FAQ đúng nhóm và gửi feedback hữu ích"',
        'không phụ thuộc backend tìm kiếm',
        'Chọn nhóm câu hỏi trước',
        'Đọc route hỗ trợ đúng vấn đề',
        'Hiểu search chỉ là hướng dẫn tĩnh',
        'Gửi feedback giúp cải thiện FAQ',
        'Chưa có tìm kiếm trực tuyến, lập chỉ mục backend hoặc gợi ý cá nhân hóa.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "FAQ search and helpfulness guide"',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'FAQ search helpfulness guide composes compact guide-flow base',
        '.lgo-faqhelpfulnessguidepage-stack',
        '.lgo-faq-helpfulness-guide-hero-card',
        'max-width: 18ch;',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-faqhelpfulnessguidepage-stack',
        '.lgo-faq-helpfulness-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-faq-search-helpfulness-real-ui-layout-v1173.spec.ts", [
        '/guides/faq-search-helpfulness-guide renders compact FAQ-helpfulness flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first FAQ-helpfulness step appears near first fold',
        'FAQ hữu ích',
        '/tmp/guides-faq-search-helpfulness-${isMobile ? "mobile" : "desktop"}-v1173.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173 WEB_CLOSED',
        'Select `/guides/faq-search-helpfulness-guide`',
        '/tmp/guides-faq-search-helpfulness-desktop-v1173.png',
        '/tmp/guides-faq-search-helpfulness-mobile-v1173.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.187',
        'Current FE scope: select `/news/content-ia-hub-polish-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 FAQ search helpfulness guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173.md',
        'docs/execution/LGO-WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-REPORT-v1.173.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_faq_search_helpfulness_real_ui_layout_v1173] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
