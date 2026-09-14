#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_community_roadmap_real_ui_layout_v1188] FAIL: {message}", file=sys.stderr)
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
        '"community-roadmap-onboarding-started": "Bài viết giải thích community onboarding và roadmap"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "community-roadmap-onboarding-started"',
        'title: "Onboarding cộng đồng và roadmap rõ hơn"',
        'WEB v1.11 nối homepage, community, roadmap, support và staged release messaging để người chơi biết đi đâu và kỳ vọng gì.',
        'cộng đồng vẫn là hướng dẫn tĩnh.',
        'Onboarding cộng đồng nối các trang public',
        'Thông điệp phát hành theo giai đoạn giữ kỳ vọng an toàn',
        'Không có community backend live, không có waitlist giả và không có tài khoản production.',
        'Không có artifact tải game public, không có entitlement portal và không có CMS.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "community-roadmap-onboarding-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for community-roadmap-onboarding-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'Community / roadmap onboarding được làm rõ',
        'No live community backend',
        'No public game download artifact, no portal entitlement, no CMS.',
        'No live community backend, no fake waitlist, no production account.',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-community-roadmap-real-ui-layout-v1188.spec.ts", [
        '/news/community-roadmap-onboarding-started renders compact Vietnamese community roadmap onboarding article flow',
        'Onboarding cộng đồng và roadmap rõ hơn', 'Bài viết giải thích community onboarding và roadmap', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-community-roadmap-${isMobile ? "mobile" : "desktop"}-v1188.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-community-roadmap-desktop-v1188.png', '/tmp/news-community-roadmap-mobile-v1188.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.218',
        'Current FE scope: select `/download`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188 | WEB-FE | WEB_CLOSED | eb4b2ad |',
        'Playwright desktop/mobile 2/2 news community roadmap real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188.md',
        'docs/execution/LGO-WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-REPORT-v1.188.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_community_roadmap_real_ui_layout_v1188] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
