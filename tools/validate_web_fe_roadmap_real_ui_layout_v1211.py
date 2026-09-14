#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_roadmap_real_ui_layout_v1211] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/roadmap/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-roadmappage-stack',
        'Roadmap phát triển web', 'Chưa có đăng nhập thật', 'chưa có dữ liệu tài khoản', 'chưa có tích hợp máy chủ',
        'lgo-roadmap-design-board', 'lgo-roadmap-route-board', 'lgo-roadmap-list-board', 'roadmapSteps', 'publicRoadmapItems',
        'Đọc trạng thái hiện tại', 'Tách mốc kế hoạch khỏi lời hứa', 'Chờ hợp đồng máy chủ',
        'lgo-service-disclosure-stack lgo-roadmap-expanded-evidence', 'Bằng chứng phụ và tuyến liên quan',
        'ReleaseReadinessHubCta', 'OwnerReleaseGateBoard', 'RoadmapDecisionGateBoard', 'PlayerTrustReleaseCta',
        'ReleaseNarrativeStageBoard', 'RouteContinuityCta', 'PublicRouteGroupBoard', 'GameplayScopeBoundaryBoard',
        'StagedReleaseMessagingBoard', 'PlayerSafetySupportCta', 'AccessibilityReadabilityCta', 'PerformanceBudgetCta',
        'PerceivedLoadSignalBoard', 'CommunityRoadmapOnboardingCta', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared roadmap page layout for public planning gate surfaces.', '.lgo-roadmappage-stack',
        '.lgo-roadmap-design-board', '.lgo-roadmap-route-board', '.lgo-roadmap-list-board', '.lgo-roadmap-step-grid',
        '.lgo-roadmap-expanded-evidence', 'grid-template-columns: repeat(4, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 1;', 'font-size: clamp(1.82rem, 7vw, 2.02rem);'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.211 roadmap real UI layout', '.lgo-roadmap-expanded-evidence', '.lgo-roadmappage-stack'
    ])
    require_text("tests/e2e/fe-roadmap-real-ui-layout-v1211.spec.ts", [
        'roadmap real UI layout v1.211', '/roadmap', 'secondary roadmap proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero roadmap actions',
        '/tmp/roadmap-mobile-v1211.png', '/tmp/roadmap-desktop-v1211.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.211 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/roadmap-desktop-v1211.png', '/tmp/roadmap-mobile-v1211.png',
        'desktop hero bottom 389.28px', 'mobile hero bottom 486.91px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.216', 'Current FE scope: select `/journey`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.211 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 roadmap real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.211.md',
        'docs/execution/LGO-WEB-FE-ROADMAP-REAL-UI-LAYOUT-REPORT-v1.211.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.211.md',
    ]:
        require_text(rel, ['WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.211', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_roadmap_real_ui_layout_v1211] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
