#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_accessibility_readability_real_ui_layout_v1167] FAIL: {message}", file=sys.stderr)
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

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/[slug]/page.tsx", [
        'entry.slug === "accessibility-readability-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-accessibilityreadpage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-accessibility-read-guide-hero-card',
        'Dễ đọc dễ dùng',
        'Guide tĩnh · chưa có audit pháp lý · chưa có chứng nhận WCAG',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "accessibility-readability-guide"',
        'title: "Đọc web Linh Giới dễ hơn"',
        'tiêu đề',
        'trang Bắt đầu',
        'thẻ mobile',
        'Quét tiêu đề trước',
        'Dùng trang Bắt đầu',
        'Đọc trên mobile theo thẻ',
        'Đọc ranh giới trước kỳ vọng live',
        'Chưa có public build, production auth, combat live, ticket live hoặc backend contract accepted.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Cách đọc web Linh Giới Online dễ hơn"',
        'Start hub',
        'mobile cards',
        'safety/download boundaries',
        'formal audit certification',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Accessibility readability guide composes compact guide-flow base',
        '.lgo-accessibilityreadpage-stack',
        '.lgo-accessibility-read-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-accessibilityreadpage-stack',
        '.lgo-accessibility-read-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-accessibility-readability-real-ui-layout-v1167.spec.ts", [
        '/guides/accessibility-readability-guide renders compact readability flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first readability step appears near first fold',
        'Dễ đọc dễ dùng',
        '/tmp/guides-accessibility-readability-${isMobile ? "mobile" : "desktop"}-v1167.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167 WEB_CLOSED',
        'Select `/guides/accessibility-readability-guide`',
        '/tmp/guides-accessibility-readability-desktop-v1167.png',
        '/tmp/guides-accessibility-readability-mobile-v1167.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.205',
        'Current FE scope: select `/support/help`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 accessibility readability guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167.md',
        'docs/execution/LGO-WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-REPORT-v1.167.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_accessibility_readability_real_ui_layout_v1167] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
