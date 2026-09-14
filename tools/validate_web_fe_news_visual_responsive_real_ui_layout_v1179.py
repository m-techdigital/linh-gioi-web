#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_visual_responsive_real_ui_layout_v1179] FAIL: {message}", file=sys.stderr)
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
        '"visual-responsive-polish-started": "Bài viết giải thích visual và responsive"',
        'title={articleDetailTitle(slug)}',
        'Trang bài viết mở rộng ngữ cảnh người chơi cần biết',
        'Kiểm tra trình duyệt/e2e là bằng chứng layout',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'Detail page mở rộng ngữ cảnh',
        'ranh giới non-claim',
        'Browser/e2e là bằng chứng',
        'WEB v1.9 article detail',
        'Detail section',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "visual-responsive-polish-started"',
        'Slice visual responsive nén lại hierarchy',
        'Thứ bậc thị giác giúp người chơi đọc đúng trọng tâm',
        'Responsive polish phải giữ cùng shell public',
        'Không tuyên bố vận hành chính thức, không có CMS, không có DB và không có backend live.',
        'Không dùng e2e, ảnh chụp hoặc validator để thay thế việc hoàn thiện layout thật trong trình duyệt.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'Runtime/browser E2E remains a regression guard. The main product work is visual and responsive polish',
        'no production auth, no DB persistence, no CMS and no real backend integration',
        'Visual hierarchy giúp người chơi đọc đúng trọng tâm',
        'Không dùng e2e, screenshot hoặc validator',
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

    require_text("tests/e2e/fe-news-visual-responsive-real-ui-layout-v1179.spec.ts", [
        '/news/visual-responsive-polish-started renders compact Vietnamese visual responsive article detail flow',
        'Bài viết giải thích visual và responsive',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-visual-responsive-${isMobile ? "mobile" : "desktop"}-v1179.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179 WEB_CLOSED',
        'Select `/support/safety`',
        '/tmp/news-visual-responsive-desktop-v1179.png',
        '/tmp/news-visual-responsive-mobile-v1179.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.206',
        'Current FE scope: select `/support/safety`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179 | WEB-FE | WEB_CLOSED | d544a02 |',
        'Playwright desktop/mobile 2/2 news visual responsive detail real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179.md',
        'docs/execution/LGO-WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-REPORT-v1.179.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_visual_responsive_real_ui_layout_v1179] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
