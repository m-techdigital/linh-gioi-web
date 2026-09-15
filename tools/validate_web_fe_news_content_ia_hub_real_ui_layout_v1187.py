#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_content_ia_hub_real_ui_layout_v1187] FAIL: {message}", file=sys.stderr)
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
        '"content-ia-hub-polish-started": "Bài viết giải thích content IA và hub bắt đầu"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "content-ia-hub-polish-started"',
        'title: "Content hub và lộ trình đọc được làm rõ"',
        'WEB v1.12 gom các trang quan trọng thành trang Bắt đầu để người chơi mới biết đọc gì trước, đi đâu tiếp và không hiểu nhầm trạng thái release.',
        'Kiểm tra trình duyệt chỉ là bằng chứng layout, không phải lời hứa vận hành backend.',
        'Trang Bắt đầu biến website thành hành trình đọc có thứ tự',
        'Route được nhóm theo câu hỏi người chơi mới',
        'Không có CMS, không cá nhân hóa live và không có recommendation backend theo tài khoản.',
        'Không có CMS, không có feed live, không có portal account và không có backend gợi ý cá nhân.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "content-ia-hub-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for content-ia-hub-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Bài viết giải thích nội dung public',
        'Runtime/browser/e2e vẫn chỉ là guardrail',
        'trang Bắt đầu biến website thành hành trình đọc có thứ tự',
        'No CMS, no live personalization, no account-aware recommendation backend.',
        'Runtime/browser/e2e vẫn chỉ là guardrail, không phải nội dung chính.',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-content-ia-hub-real-ui-layout-v1187.spec.ts", [
        '/news/content-ia-hub-polish-started renders compact Vietnamese content IA hub article flow',
        'Content hub và lộ trình đọc được làm rõ', 'Bài viết giải thích content IA và hub bắt đầu', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-content-ia-hub-${isMobile ? "mobile" : "desktop"}-v1187.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-content-ia-hub-desktop-v1187.png', '/tmp/news-content-ia-hub-mobile-v1187.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221',
        'Current FE scope: select `/release/readiness`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187 | WEB-FE | WEB_CLOSED | 823b55e |',
        'Playwright desktop/mobile 2/2 news content IA hub real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187.md',
        'docs/execution/LGO-WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-REPORT-v1.187.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_content_ia_hub_real_ui_layout_v1187] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
