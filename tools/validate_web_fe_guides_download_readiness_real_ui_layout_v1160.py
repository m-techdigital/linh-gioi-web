#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_download_readiness_real_ui_layout_v1160] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "download-readiness-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-downloadreadinesspage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-download-readiness-hero-card',
        'Tin cậy tải game',
        'Guide tĩnh · chưa có public build · chưa có entitlement',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "download-readiness-guide"',
        'title: "Sẵn sàng tải game đúng bằng chứng"',
        'gói build',
        'checksum',
        'owner approval',
        'Chưa có public build artifact hoặc launcher production.',
        'Chưa có checksum thật, provenance hoặc artifact verification.',
        'Chưa có release note được duyệt, support SLA hoặc closed-test intake live.',
        'Chưa có portal entitlement, account gate, open registration hoặc backend contract accepted.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Download readiness guide"',
        'A player-facing explanation of why a real build link requires checksum',
        'This guide explains the public download gate',
        'No public game download artifact, no portal entitlement backend.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Download readiness guide composes compact guide-flow base',
        '.lgo-downloadreadinesspage-stack',
        '.lgo-download-readiness-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-downloadreadinesspage-stack',
        '.lgo-download-readiness-hero-card',
    ])

    require_text("tests/e2e/fe-guides-download-readiness-real-ui-layout-v1160.spec.ts", [
        '/guides/download-readiness-guide renders proof-before-download flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first download step appears in first fold',
        'Tin cậy tải game',
        '/tmp/guides-download-readiness-${isMobile ? "mobile" : "desktop"}-v1160.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160 WEB_CLOSED',
        'Select `/guides/download-readiness-guide`',
        '/tmp/guides-download-readiness-desktop-v1160.png',
        '/tmp/guides-download-readiness-mobile-v1160.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.161',
        'Current FE scope: select `/guides/support-and-community-guide`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 download readiness guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160.md',
        'docs/execution/LGO-WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-REPORT-v1.160.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_download_readiness_real_ui_layout_v1160] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
