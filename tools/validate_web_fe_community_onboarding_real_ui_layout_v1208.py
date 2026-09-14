#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_community_onboarding_real_ui_layout_v1208] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} contains forbidden text {needle!r}")

def main() -> int:
    require_text("apps/web/src/app/community/onboarding/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-community-onboardingpage-stack',
        'Hòa nhập cộng đồng Linh Giới', 'Chưa có diễn đàn', 'chưa có bang hội', 'chưa có danh sách chờ',
        'lgo-community-onboarding-design-board', 'lgo-community-onboarding-route-board', 'onboardingSteps',
        'Kiểm tra trạng thái', 'Đọc mốc mở dần', 'Quay lại cộng đồng',
        'lgo-service-disclosure-stack lgo-community-onboarding-expanded-evidence', 'Bằng chứng phụ và tuyến liên quan',
        'ReleaseReadinessHubCta', 'TesterExpectationCopyBoard', 'PlayerTrustReleaseCta', 'ReleaseNarrativeStageBoard',
        'ContentIaStartCta', 'RouteContinuityCta', 'CommunityOnboardingPathBoard', 'RoadmapDecisionGateBoard',
        'CommunityFeedbackGuidance', 'StagedReleaseMessagingBoard', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared community onboarding page layout for static public participation guidance.', '.lgo-community-onboardingpage-stack',
        '.lgo-community-onboarding-design-board', '.lgo-community-onboarding-route-board', '.lgo-community-onboarding-step-grid',
        '.lgo-community-onboarding-expanded-evidence', 'grid-template-columns: repeat(3, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;', 'font-size: clamp(1.82rem, 7vw, 2.02rem);'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.208 community onboarding real UI layout', '.lgo-community-onboarding-expanded-evidence', '.lgo-community-onboardingpage-stack'
    ])
    require_text("tests/e2e/fe-community-onboarding-real-ui-layout-v1208.spec.ts", [
        'community onboarding real UI layout v1.208', '/community/onboarding', 'secondary onboarding proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero onboarding actions',
        '/tmp/community-onboarding-mobile-v1208.png', '/tmp/community-onboarding-desktop-v1208.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/community-onboarding-desktop-v1208.png', '/tmp/community-onboarding-mobile-v1208.png',
        'desktop hero bottom 372.75px', 'mobile hero bottom 514.86px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.215', 'Current FE scope: select `/classes`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 community onboarding real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208.md',
        'docs/execution/LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-REPORT-v1.208.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208.md',
    ]:
        require_text(rel, ['WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.208', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_community_onboarding_real_ui_layout_v1208] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
