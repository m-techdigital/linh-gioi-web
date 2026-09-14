#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "beginner-training-loop-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-traininglooppage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-training-loop-hero-card',
        'Luyện tập nhập môn',
        'Guide tĩnh · chưa có combat/reward · chưa có tiến trình tài khoản',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<WorldGameplayLoopCta />', '<RouteContinuityCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "beginner-training-loop-guide"',
        'title: "Vòng luyện tập nhập môn"',
        'Cổng Linh',
        'Gate Keeper',
        'Training Stone',
        'Chưa có bản đồ live, nhiệm vụ tài khoản hoặc quest persistence.',
        'Chưa có combat damage, loot, inventory hoặc economy.',
        'Chưa có character save, reward persistence hoặc account progression backend.',
        'Chưa có public build, launcher, entitlement hoặc open registration.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Beginner training loop guide"',
        'A player-facing explanation of the current non-combat flow',
        'This guide describes current public-facing direction only',
        'No combat damage, no loot, no inventory/economy.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        '.lgo-guide-flow-hero-card',
        'Beginner training loop guide composes compact guide-flow base',
        '.lgo-traininglooppage-stack',
        '.lgo-training-loop-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-traininglooppage-stack',
        '.lgo-training-loop-hero-card',
        '.lgo-guideflowpage-stack',
    ])

    require_text("tests/e2e/fe-guides-beginner-training-loop-real-ui-layout-v1159.spec.ts", [
        '/guides/beginner-training-loop-guide renders compact training flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first training step appears in first fold',
        'Trạng thái chơi',
        '/tmp/guides-beginner-training-loop-${isMobile ? "mobile" : "desktop"}-v1159.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159 WEB_CLOSED',
        'Select `/guides/beginner-training-loop-guide`',
        '/tmp/guides-beginner-training-loop-desktop-v1159.png',
        '/tmp/guides-beginner-training-loop-mobile-v1159.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.171',
        'Current FE scope: select `/guides/release-readiness-hub-guide`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 beginner training loop guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159.md',
        'docs/execution/LGO-WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-REPORT-v1.159.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
