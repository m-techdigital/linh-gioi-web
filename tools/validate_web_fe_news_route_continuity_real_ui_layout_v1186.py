#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_route_continuity_real_ui_layout_v1186] FAIL: {message}", file=sys.stderr)
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
        '"route-continuity-conversion-polish-started": "Bài viết giải thích route continuity và conversion-safe"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "route-continuity-conversion-polish-started"',
        'title: "Route tiếp theo rõ và an toàn hơn"',
        'WEB v1.17 nối các route public thành hành trình an toàn: Bắt đầu, vòng lặp thế giới, tin cậy tải game, trạng thái, hỗ trợ an toàn và hiệu năng đều dẫn đúng bước tiếp.',
        'WEB v1.17 cải thiện nhịp nối giữa các page, thứ bậc CTA và bước đọc an toàn',
        'Route continuity biến menu dài thành hành trình đọc có thứ tự',
        'Bước tiếp an toàn nghĩa là không hứa nhầm',
        'Không có luồng chuyển đổi giả, không có artifact public và không có backend tài khoản/hỗ trợ.',
        'Không có quyền tải, giao dịch, launcher, hộp thư bảo mật hoặc moderation live.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "route-continuity-conversion-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for route-continuity-conversion-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Route continuity and safe next steps get clearer',
        'WEB v1.17 connects public routes',
        'This update focuses on the public website product',
        'page-to-page cohesion',
        'conversion-safe routing',
        'fake download, account, portal, ticket, payment',

    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-route-continuity-real-ui-layout-v1186.spec.ts", [
        '/news/route-continuity-conversion-polish-started renders compact Vietnamese route continuity article flow',
        'Route tiếp theo rõ và an toàn hơn', 'Bài viết giải thích route continuity và conversion-safe', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-route-continuity-${isMobile ? "mobile" : "desktop"}-v1186.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186 WEB_CLOSED',
        'Select `/accessibility`',
        '/tmp/news-route-continuity-desktop-v1186.png', '/tmp/news-route-continuity-mobile-v1186.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.210',
        'Current FE scope: select `/accessibility`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186 | WEB-FE | WEB_CLOSED | 7258f8d |',
        'Playwright desktop/mobile 2/2 news route continuity real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186.md',
        'docs/execution/LGO-WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-REPORT-v1.186.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_route_continuity_real_ui_layout_v1186] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
