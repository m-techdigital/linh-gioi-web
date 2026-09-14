#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_closed_tester_information_pack_real_ui_layout_v1172] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "closed-tester-information-pack-guide"',
        'isClosedTesterInformationPackGuide',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-closedtesterpackguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-closed-tester-pack-guide-hero-card',
        'Gói closed tester',
        'Guide tĩnh · chưa có đăng ký · chưa có quyền kiểm thử',
        '<GuideDetailDepth slug={entry.slug} />',
        '<ClosedTesterInformationPackCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "closed-tester-information-pack-guide"',
        'title: "Chuẩn bị gói thông tin closed tester"',
        'mẫu feedback an toàn',
        'không mở đăng ký, không cấp quyền test',
        'Đọc tester pack như checklist chuẩn bị',
        'Giữ feedback an toàn',
        'Đối chiếu giới hạn đã biết',
        'Quay lại readiness trước mọi CTA',
        'Chưa có tiếp nhận tester live, đăng ký mở hoặc tự động cấp quyền.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Closed tester information pack guide"',
        'No live tester intake, no open registration, no entitlement automation.',
        'No secure ticket inbox, no account lookup, no collection backend.',
        'No public build, no reward/economy promise, no live world claim.',
        'No owner sign-off bypass, no guaranteed tester slot, no production support SLA.',
    ])

    require_text("apps/web/src/components/PublicClosedTesterInformationPackSections.tsx", [
        'Chuẩn bị hướng dẫn tester trước, không mở nhận đăng ký hoặc hứa suất test.',
        'feedback an toàn, giới hạn đã biết và mẫu báo cáo thiết bị',
    ])
    forbid_text("apps/web/src/components/PublicClosedTesterInformationPackSections.tsx", [
        'tester guidance',
        'safe feedback, known limitations',
        'secrets hoặc dữ liệu nhạy cảm',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Closed tester information pack guide composes compact guide-flow base',
        '.lgo-closedtesterpackguidepage-stack',
        '.lgo-closed-tester-pack-guide-hero-card',
        'max-width: 15ch;',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-closedtesterpackguidepage-stack',
        '.lgo-closed-tester-pack-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-closed-tester-information-pack-real-ui-layout-v1172.spec.ts", [
        '/guides/closed-tester-information-pack-guide renders compact tester-pack flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first tester-pack step appears near first fold',
        'Gói closed tester',
        '/tmp/guides-closed-tester-information-pack-${isMobile ? "mobile" : "desktop"}-v1172.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172 WEB_CLOSED',
        'Select `/guides/closed-tester-information-pack-guide`',
        '/tmp/guides-closed-tester-information-pack-desktop-v1172.png',
        '/tmp/guides-closed-tester-information-pack-mobile-v1172.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219',
        'Current FE scope: select `/download/trust`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 closed tester information pack guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172.md',
        'docs/execution/LGO-WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-REPORT-v1.172.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_closed_tester_information_pack_real_ui_layout_v1172] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
