#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_real_ui_layout_v1176] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/news/page.tsx", [
        'metadata = { title: "Tin tức Linh Giới" }',
        'lgo-newspage-stack',
        'lgo-news-hero-card',
        'Bản tin công khai',
        'Tin tức Linh Giới',
        'lgo-news-board',
        'lgo-newsfeed-grid',
        'lgo-newsfeed-card',
        'lgo-action-band',
        'slice(0, 3)',
        'Trạng thái chơi',
        'Ranh giới:',
    ])
    forbid_text("apps/web/src/app/news/page.tsx", [
        'PageHeader',
        'ContentIaStartCta',
        'Fixture entries',
        'PROVISIONAL_WEB_FIXTURE',
        'Summary-only fixture',
        'News list is now',
        'No CMS and no backend API',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'title: "Control tower web đã được thiết lập"',
        'title: "Bắt đầu polish UX và nội dung public"',
        'title: "Bắt đầu polish visual và responsive"',
        'Repo web độc lập của Linh Giới Online đã có governance',
        'Slice web trước tập trung vào hierarchy trang chủ',
        'Slice này làm rõ visual hierarchy',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Web program control tower established"',
        'title: "Public UX/content polish starts"',
        'title: "Visual responsive polish starts"',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News page composes shared service proof/card layout for static public news boundaries.',
        '.lgo-newspage-stack',
        '.lgo-news-hero-card',
        '.lgo-news-board',
        '.lgo-newsfeed-card',
        '.lgo-service-compact-proof-page .lgo-news-board .lgo-newsfeed-grid',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-newspage-stack',
        '.lgo-news-hero-card',
        '.lgo-news-board',
        '.lgo-newsfeed-card',
    ])

    require_text("tests/e2e/fe-news-real-ui-layout-v1176.spec.ts", [
        '/news renders compact public news layout without raw fixture cards',
        'Tin tức Linh Giới',
        'mobile action band not pushed by raw fixtures',
        'desktop action band stays visible soon after board',
        'heroStatusLink',
        '/tmp/news-${isMobile ? "mobile" : "desktop"}-v1176.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176 WEB_CLOSED',
        'Select `/news`',
        '/tmp/news-desktop-v1176.png',
        '/tmp/news-mobile-v1176.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.204',
        'Current FE scope: select `/support`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 news real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176.md',
        'docs/execution/LGO-WEB-FE-NEWS-REAL-UI-LAYOUT-REPORT-v1.176.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_real_ui_layout_v1176] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
