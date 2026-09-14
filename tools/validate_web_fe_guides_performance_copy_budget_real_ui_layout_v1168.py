#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_performance_copy_budget_real_ui_layout_v1168] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "performance-copy-budget-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-performanceguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-performance-guide-hero-card',
        'Hiệu năng đọc',
        'Guide tĩnh · chưa có đo production · chưa có CDN',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "performance-copy-budget-guide"',
        'title: "Giữ web nhẹ và rõ"',
        'nội dung ngắn',
        'hiệu ứng CSS nhẹ',
        'route tĩnh',
        'Giữ nội dung ngắn',
        'Ưu tiên visual nhẹ',
        'Giữ route tĩnh dễ kiểm',
        'Đặt ranh giới cạnh CTA',
        'Chưa có public build, entitlement, production auth, ticket live hoặc deployment claim.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Performance copy budget guide"',
        'CSS-only visual',
        'static routes',
        'Core Web Vitals certification',
        'Lighthouse',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Performance copy budget guide composes compact guide-flow base',
        '.lgo-performanceguidepage-stack',
        '.lgo-performance-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-performanceguidepage-stack',
        '.lgo-performance-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-performance-copy-budget-real-ui-layout-v1168.spec.ts", [
        '/guides/performance-copy-budget-guide renders compact performance budget flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first performance step appears near first fold',
        'Hiệu năng đọc',
        '/tmp/guides-performance-copy-budget-${isMobile ? "mobile" : "desktop"}-v1168.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168 WEB_CLOSED',
        'Select `/guides/performance-copy-budget-guide`',
        '/tmp/guides-performance-copy-budget-desktop-v1168.png',
        '/tmp/guides-performance-copy-budget-mobile-v1168.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.212',
        'Current FE scope: select `/game/loop`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 performance copy budget guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168.md',
        'docs/execution/LGO-WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-REPORT-v1.168.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_performance_copy_budget_real_ui_layout_v1168] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
