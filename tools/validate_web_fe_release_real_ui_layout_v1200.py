#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_release_real_ui_layout_v1200] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} still contains forbidden text {needle!r}")

def main() -> int:
    require_text("apps/web/src/app/release/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-releasepage-stack',
        'lgo-release-narrative-hero-card', 'Hành trình phát hành', 'Không build public · không open beta · không funnel quyền truy cập',
        'lgo-release-narrative-design-board', 'ReleaseNarrativeStageBoard', 'ReleaseReadinessHubCta',
        'lgo-service-disclosure-stack lgo-release-expanded-evidence', 'Chi tiết bằng chứng mở rộng',
        'ReleaseReadinessHubBoard', 'OwnerReleaseGateBoard', 'PlayerTrustSignalBoard', 'ClosedTestReadinessBoard', 'TrustJourneyCheckpointBoard'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        '.lgo-releasepage-stack.lgo-service-compact-proof-page .lgo-detail-hero-card h1',
        '.lgo-releasepage-stack.lgo-service-compact-proof-page h2',
        '.lgo-releasepage-stack.lgo-service-compact-proof-page .lgo-release-narrative-list',
        'grid-template-columns: repeat(2, minmax(0, 1fr));'
    ])
    forbid_text("apps/web/src/app/globals.css", ['WEB v1.200 release real UI layout', '.lgo-service-disclosure-stack', '.lgo-release-expanded-evidence'])
    require_text("tests/e2e/fe-release-real-ui-layout-v1200.spec.ts", [
        '/release renders compact Vietnamese release narrative with target and keyboard path', 'Public Release',
        'toHaveCount(6)', 'desktop readiness CTA reachable after stage board', 'mobile readiness CTA reachable',
        'details:not([open]) .lgo-service-disclosure-body', '/tmp/release-${isMobile ? "mobile" : "desktop"}-v1200.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200 WEB_CLOSED', 'Select `/support`',
        '/tmp/release-desktop-v1200.png', '/tmp/release-mobile-v1200.png', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.204', 'Current FE scope: select `/support`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200 | WEB-FE | WEB_CLOSED | a74fb66 |',
        'Playwright desktop/mobile 2/2 release real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200.md',
        'docs/execution/LGO-WEB-FE-RELEASE-REAL-UI-LAYOUT-REPORT-v1.200.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200.md',
    ]:
        require_text(rel, ['WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_release_real_ui_layout_v1200] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
