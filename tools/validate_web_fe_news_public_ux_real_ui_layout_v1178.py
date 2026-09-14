#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_public_ux_real_ui_layout_v1178] FAIL: {message}", file=sys.stderr)
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
        'articleDetailTitles',
        '"public-ux-content-polish-started": "Bài viết giải thích polish UX public"',
        'title={articleDetailTitle(slug)}',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'title="Bài viết giải thích governance web độc lập"',
        'WEB v1.9 article detail',
        'Detail section',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "public-ux-content-polish-started"',
        'WEB v1.6 đặt nền UX public cho người chơi',
        'UX public chuyển từ danh sách thô sang hành trình đọc',
        'Nội dung public phải đồng bộ với shell và menu chung',
        'Không có xác thực production, không có DB, không có CMS và không tích hợp backend thật.',
        'Không xem dịch chữ, chỉ sửa design hoặc chỉ chạy validator là hoàn thiện UI/UX Layout.',
        'ranh giới không tuyên bố quá phạm vi',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'WEB v1.6 content polish established the player-facing foundation',
        'player-facing foundation while keeping non-claims explicit',
        'guardrail non-claim',
        'Không có auth production',
        'design-only hoặc validator-only',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack',
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

    require_text("tests/e2e/fe-news-public-ux-real-ui-layout-v1178.spec.ts", [
        '/news/public-ux-content-polish-started renders compact Vietnamese UX article detail flow',
        'Bài viết giải thích polish UX public',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-public-ux-${isMobile ? "mobile" : "desktop"}-v1178.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178 WEB_CLOSED',
        'Select `/news/visual-responsive-polish-started`',
        '/tmp/news-public-ux-desktop-v1178.png',
        '/tmp/news-public-ux-mobile-v1178.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.179',
        'Current FE scope: select `/news/visual-responsive-polish-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178 | WEB-FE | WEB_CLOSED | 387405a |',
        'Playwright desktop/mobile 2/2 news public UX detail real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178.md',
        'docs/execution/LGO-WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-REPORT-v1.178.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_public_ux_real_ui_layout_v1178] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
