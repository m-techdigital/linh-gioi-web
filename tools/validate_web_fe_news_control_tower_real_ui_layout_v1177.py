#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_control_tower_real_ui_layout_v1177] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/news/[slug]/page.tsx", [
        'lgo-newsdetailpage-stack',
        'lgo-newsdetail-hero-card',
        'Bài viết công khai',
        'Tin tức · nội dung tĩnh · chưa có CMS/live feed',
        'Ranh giới:',
        'lgo-newsdetail-related',
        'lgo-newsdetail-related-grid',
        'lgo-newsdetail-related-card',
        'Tin liên quan để đọc tiếp',
    ])
    forbid_text("apps/web/src/app/news/[slug]/page.tsx", [
        'WEB v1.9 article detail',
        'Boundary:',
        'PROVISIONAL_WEB_FIXTURE',
        'NOT_CANONICAL_BACKEND_CONTRACT',
        'This public content is',
        'no CMS/live announcement backend',
    ])

    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-grid',
        'lgo-newsdetail-depth-card',
        'Bài viết giải thích governance web độc lập',
        'Chi tiết bài viết',
        'Nội dung public tĩnh',
        'lgo-newsdetail-next-steps',
        'Trạng thái',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'WEB v1.9 article detail',
        'Detail section',
        'Static public content',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'title: "Control tower web đã được thiết lập"',
        'Bản tin này là nội dung source-owned của web program',
        'Control tower giữ header, footer, menu và workflow thống nhất',
        'Không có backend độc lập, không có xác thực production, không có lưu trữ DB.',
        'Không tính tiến độ design-only, không sao chép game backend, không tạo owner component trùng lặp.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'This public content is source-owned by the web program',
        'No independent backend, no production auth, no DB persistence.',
        'No design-only progress, no copied game backend, no duplicate component owner.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth-card',
        '.lgo-newsdetail-related-card',
        '.lgo-newsdetail-next-steps',
        '.lgo-service-compact-proof-page .lgo-newsdetail-related .lgo-newsdetail-related-grid',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-newsdetailpage-stack',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth',
        '.lgo-newsdetail-related',
        '.lgo-newsdetail-next-steps',
    ])

    require_text("tests/e2e/fe-news-control-tower-real-ui-layout-v1177.spec.ts", [
        '/news/web-program-control-tower renders compact Vietnamese article detail flow',
        'Bài viết công khai',
        'Bài viết giải thích governance web độc lập',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-control-tower-${isMobile ? "mobile" : "desktop"}-v1177.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-control-tower-desktop-v1177.png',
        '/tmp/news-control-tower-mobile-v1177.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217',
        'Current FE scope: select `/start`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177 | WEB-FE | WEB_CLOSED | aad6f68 |',
        'Playwright desktop/mobile 2/2 news control tower detail real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177.md',
        'docs/execution/LGO-WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-REPORT-v1.177.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_control_tower_real_ui_layout_v1177] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
