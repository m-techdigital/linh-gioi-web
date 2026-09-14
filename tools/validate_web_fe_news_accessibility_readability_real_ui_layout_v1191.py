#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_accessibility_readability_real_ui_layout_v1191] FAIL: {message}", file=sys.stderr)
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
        '"accessibility-readability-polish-started": "Bài viết giải thích khả năng tiếp cận và dễ đọc"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "accessibility-readability-polish-started"',
        'title: "Dễ đọc và dễ tiếp cận hơn"',
        'WEB v1.15 làm rõ tiêu đề, nhịp đọc mobile, thứ tự focus và độ thoải mái khi đọc các route public.',
        'WEB v1.15 tiếp tục hoàn thiện website public thật. Slice này gom hướng dẫn dễ đọc, mốc quét nội dung theo route, quy tắc đọc trên mobile và kỳ vọng focus order mà không tuyên bố audit WCAG chính thức, pháp lý accessibility, hỗ trợ production hoặc tích hợp backend.',
        'Nhịp đọc ưu tiên tiêu đề, khoảng thở và focus',
        'Mobile và keyboard giữ cùng một đường đọc',
        'Không tuyên bố audit WCAG chính thức, chứng nhận pháp lý accessibility, production SLA hoặc hỗ trợ backend.',
        'Không mở tính năng tài khoản, không kiểm thử thiết bị hỗ trợ chính thức và không thay thế kiểm định accessibility chuyên sâu.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "accessibility-readability-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for accessibility-readability-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Bài viết giải thích nội dung public',
        'Accessibility and readability polish starts',
        'WEB v1.15 keeps building the actual public website',
        'legal compliance or production support claim',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-accessibility-readability-real-ui-layout-v1191.spec.ts", [
        '/news/accessibility-readability-polish-started renders compact Vietnamese accessibility readability article flow',
        'Dễ đọc và dễ tiếp cận hơn', 'Bài viết giải thích khả năng tiếp cận và dễ đọc', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-accessibility-readability-${isMobile ? "mobile" : "desktop"}-v1191.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-accessibility-readability-desktop-v1191.png', '/tmp/news-accessibility-readability-mobile-v1191.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220',
        'Current FE scope: select `/release`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191 | WEB-FE | WEB_CLOSED | 1e8e358 |',
        'Playwright desktop/mobile 2/2 news accessibility readability real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191.md',
        'docs/execution/LGO-WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-REPORT-v1.191.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_accessibility_readability_real_ui_layout_v1191] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
