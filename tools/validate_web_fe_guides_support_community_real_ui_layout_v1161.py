#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_support_community_real_ui_layout_v1161] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "support-and-community-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-supportcommunitypage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-support-community-hero-card',
        'Hỗ trợ cộng đồng',
        'Guide tĩnh · chưa có ticket/chat live · chưa có moderation',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "support-and-community-guide"',
        'title: "Hỗ trợ và cộng đồng đúng kỳ vọng"',
        'FAQ',
        'feedback',
        'ticket',
        'Chưa có ticket inbox live hoặc SLA hỗ trợ production.',
        'Chưa có secure upload, account lookup hoặc ticket backend.',
        'Chưa có chat, forum, guild, moderation backend hoặc RBAC/audit contract.',
        'Chưa có live support ticket, moderation backend hoặc community backend.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Support and community readiness guide"',
        'A static guide for support expectations',
        'This guide prepares public copy',
        'No live support ticket, no moderation backend, no community chat/forum/guild backend.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Support and community guide composes compact guide-flow base',
        '.lgo-supportcommunitypage-stack',
        '.lgo-support-community-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-supportcommunitypage-stack',
        '.lgo-support-community-hero-card',
    ])

    require_text("tests/e2e/fe-guides-support-community-real-ui-layout-v1161.spec.ts", [
        '/guides/support-and-community-guide renders safe-feedback flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first support step appears in first fold',
        'Hỗ trợ cộng đồng',
        '/tmp/guides-support-community-${isMobile ? "mobile" : "desktop"}-v1161.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161 WEB_CLOSED',
        'Select `/guides/support-and-community-guide`',
        '/tmp/guides-support-community-desktop-v1161.png',
        '/tmp/guides-support-community-mobile-v1161.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.173',
        'Current FE scope: select `/guides/faq-search-helpfulness-guide`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 support community guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161.md',
        'docs/execution/LGO-WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-REPORT-v1.161.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-SUPPORT-COMMUNITY-REAL-UI-LAYOUT-v1.161', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_support_community_real_ui_layout_v1161] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
