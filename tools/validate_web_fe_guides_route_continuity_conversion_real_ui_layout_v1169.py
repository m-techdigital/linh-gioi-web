#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_route_continuity_conversion_real_ui_layout_v1169] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "route-continuity-conversion-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-routecontinuityguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-route-continuity-guide-hero-card',
        'Luồng đọc an toàn',
        'Guide tĩnh · chưa có conversion backend · chưa có quyền tải',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "route-continuity-conversion-guide"',
        'title: "Đi tiếp đúng luồng đọc"',
        'Bắt đầu → Vòng lặp thế giới → Tin cậy tải game → Trạng thái → Hỗ trợ',
        'Bắt đầu từ câu hỏi người chơi',
        'Đi qua vòng lặp thế giới',
        'Kiểm gate tải game và trạng thái',
        'Đóng vòng bằng hỗ trợ an toàn',
        'Chưa có public build, checksum thật, entitlement backend hoặc deployment claim.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Route continuity and safe conversion guide"',
        'No personalized recommendation backend or account-aware routing.',
        'No public game artifact, no placeholder checksum, no entitlement backend.',
        'No secure inbox, no account lookup, no SLA or moderation dashboard.',
        'No live forum/chat/guild backend or production deployment.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Route continuity conversion guide composes compact guide-flow base',
        '.lgo-routecontinuityguidepage-stack',
        '.lgo-route-continuity-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-routecontinuityguidepage-stack',
        '.lgo-route-continuity-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-route-continuity-conversion-real-ui-layout-v1169.spec.ts", [
        '/guides/route-continuity-conversion-guide renders compact reading-route flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first route-continuity step appears near first fold',
        'Luồng đọc an toàn',
        '/tmp/guides-route-continuity-conversion-${isMobile ? "mobile" : "desktop"}-v1169.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169 WEB_CLOSED',
        'Select `/guides/route-continuity-conversion-guide`',
        '/tmp/guides-route-continuity-conversion-desktop-v1169.png',
        '/tmp/guides-route-continuity-conversion-mobile-v1169.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.211',
        'Current FE scope: select `/roadmap`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 route continuity conversion guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169.md',
        'docs/execution/LGO-WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-REPORT-v1.169.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_route_continuity_conversion_real_ui_layout_v1169] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
