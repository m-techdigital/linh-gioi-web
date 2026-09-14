#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_gate_entry_real_ui_layout_v1158] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "gate-entry-guide"',
        'lgo-gateentrypage-stack',
        'lgo-gate-entry-hero-card',
        'Cổng Linh nhập môn',
        'Guide tĩnh · chưa có bản đồ live · chưa có nhiệm vụ tài khoản',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<WorldGameplayLoopCta />', '<RouteContinuityCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "gate-entry-guide"',
        'title: "Vào Cổng Linh đúng kỳ vọng"',
        'Cổng Linh',
        'Người Giữ Cổng',
        'Đá Luyện',
        'Chưa có bản đồ live, wiki nhiệm vụ hoặc dữ liệu tiến trình tài khoản.',
        'Chưa có combat, reward, inventory hoặc quest persistence được backend chấp nhận.',
        'Chưa có public build, launcher, entitlement hoặc support ticket production.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Gate Entry guide placeholder"',
        'A future player guide area is reserved',
        'Guide content will follow the game source of truth',
        'No full world wiki, no production map database.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Shared guide detail real layout for public reading surfaces',
        'Gate Entry guide page composes the shared detail base with a denser first-read flow',
        '.lgo-gateentrypage-stack',
        '.lgo-gate-entry-hero-card',
        'grid-template-columns: repeat(3, minmax(0, 1fr));',
        '.lgo-gateentrypage-stack .lgo-detail-next-steps',
        '.lgo-gateentrypage-stack .lgo-detail-hero-card .lgo-product-first-actions',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-gateentrypage-stack',
        '.lgo-gate-entry-hero-card',
    ])
    require_text("apps/web/src/app/globals.css", [
        '.lgo-brand-links{gap:0;flex-wrap:wrap;justify-content:flex-start}',
    ])

    require_text("tests/e2e/fe-guides-gate-entry-real-ui-layout-v1158.spec.ts", [
        '/guides/gate-entry-guide renders a compact Cổng Linh guide before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first guide step appears in first fold',
        'Xem vòng lặp',
        '/tmp/guides-gate-entry-${isMobile ? "mobile" : "desktop"}-v1158.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158 WEB_CLOSED',
        'Select `/guides/gate-entry-guide`',
        '/tmp/guides-gate-entry-desktop-v1158.png',
        '/tmp/guides-gate-entry-mobile-v1158.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.198',
        'Current FE scope: select `/events`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 gate-entry guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158.md',
        'docs/execution/LGO-WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-REPORT-v1.158.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_gate_entry_real_ui_layout_v1158] PASS')
    return 0


if __name__ == "__main__":
    sys.exit(main())
