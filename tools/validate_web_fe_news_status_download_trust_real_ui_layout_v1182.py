#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_news_status_download_trust_real_ui_layout_v1182] FAIL: {message}", file=sys.stderr)
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
    require_text("AGENTS.md", [
        "Design targets must stay synchronized with the accepted common UI/UX layout",
        "shared header, footer, menu, shell and navigation patterns",
        "Base UI/UX Layout rule",
    ])
    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        '"status-download-trust-polish-started": "Bài viết giải thích status và download trust"',
        'title={articleDetailTitle(slug)}',
        'Trang bài viết mở rộng ngữ cảnh người chơi cần biết',
        'không tuyên bố backend vận hành chính thức',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'WEB v1.10 article detail',
        'Detail section',
        'ranh giới non-claim',
        'không tuyên bố backend production',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "status-download-trust-polish-started"',
        'WEB v1.10 làm rõ niềm tin tải game, bằng chứng artifact, trạng thái public và kỳ vọng hỗ trợ mà không thêm backend claim.',
        'WEB v1.10 giải thích khi nào download đáng tin: phải có artifact thật, checksum, nguồn phát hành, giới hạn rõ và owner approval.',
        'Download trust không phải marketing CTA',
        'Status cần phân biệt public, internal và blocked',
        'Không có artifact tải game public, không có triển khai production và không có backend cấp quyền tải.',
        'Browser/e2e chỉ là bằng chứng guardrail, không phải readiness phát hành public.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "status-download-trust-polish-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for status-download-trust-polish-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'WEB v1.10 focuses on release trust wording',
        'WEB v1.10 keeps building the public web product',
        'public game artifacts, production auth, DB persistence',
        'checksum/provenance explanation',
        'support expectations without adding backend claims',
        'No public game download artifact, no production deployment, no entitlement backend.',
        'Runtime/browser/e2e is guardrail only, not public release readiness.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack',
        'max-width: 18ch;',
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

    require_text("tests/e2e/fe-news-status-download-trust-real-ui-layout-v1182.spec.ts", [
        '/news/status-download-trust-polish-started renders compact Vietnamese status download trust article flow',
        'Bài viết giải thích status và download trust',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-status-download-trust-${isMobile ? "mobile" : "desktop"}-v1182.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182 WEB_CLOSED',
        'Select `/game/loop`',
        '/tmp/news-status-download-trust-desktop-v1182.png',
        '/tmp/news-status-download-trust-mobile-v1182.png',
        'Real Browser UI/UX Layout First',
        'Base First',
        'shared header/menu/footer coherence',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217',
        'Current FE scope: select `/start`',
        'Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182 | WEB-FE | WEB_CLOSED | a2ad9e3 |',
        'Playwright desktop/mobile 2/2 news status download trust real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182.md',
        'docs/execution/LGO-WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-REPORT-v1.182.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_status_download_trust_real_ui_layout_v1182] PASS')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
