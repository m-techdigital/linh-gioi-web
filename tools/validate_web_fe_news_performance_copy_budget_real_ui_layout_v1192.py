#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_performance_copy_budget_real_ui_layout_v1192] FAIL: {message}", file=sys.stderr)
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
        '"performance-copy-asset-budget-polish-started": "Bài viết giải thích hiệu năng và ngân sách nội dung"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "performance-copy-asset-budget-polish-started"',
        'title: "Web nhẹ và rõ hơn"',
        'WEB v1.16 làm route public dễ đọc hơn bằng ngân sách chữ gọn, hiệu ứng CSS nhẹ, cấu trúc tĩnh và kỳ vọng tải trang rõ cho người chơi.',
        'WEB v1.16 giữ trọng tâm ở public web thật. Slice này làm rõ ngân sách nội dung, giới hạn hiệu ứng, nhịp card tĩnh và cảm nhận tải trang mà không tuyên bố điểm Web Vitals production, giám sát vận hành, phát hành CDN, chứng nhận phân tích bundle hoặc tích hợp CDN ảnh.',
        'Ngân sách chữ giữ route nhẹ và dễ quét',
        'Hiệu ứng và asset giữ vai trò nền, không lấn nội dung',
        'Không tuyên bố điểm Web Vitals production, giám sát vận hành, phát hành CDN, chứng nhận phân tích bundle hoặc tích hợp CDN ảnh.',
        'Không có đo đạc RUM production, không có pipeline CDN, không có ngân sách CI production và không có quyền tải game.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "performance-copy-asset-budget-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for performance-copy-asset-budget-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Bài viết giải thích nội dung public',
        'Performance and copy budget get a public polish pass',
        'This update keeps product focus on the public web',
        'Web Vitals PASS',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-performance-copy-budget-real-ui-layout-v1192.spec.ts", [
        '/news/performance-copy-asset-budget-polish-started renders compact Vietnamese performance copy budget article flow',
        'Web nhẹ và rõ hơn', 'Bài viết giải thích hiệu năng và ngân sách nội dung', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-performance-copy-budget-${isMobile ? "mobile" : "desktop"}-v1192.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-performance-copy-budget-desktop-v1192.png', '/tmp/news-performance-copy-budget-mobile-v1192.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.213',
        'Current FE scope: select `/game`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192 | WEB-FE | WEB_CLOSED | c55d03c |',
        'Playwright desktop/mobile 2/2 news performance copy budget real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192.md',
        'docs/execution/LGO-WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-REPORT-v1.192.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_performance_copy_budget_real_ui_layout_v1192] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
