#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_release_readiness_real_ui_layout_v1201] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/release/readiness/page.tsx", [
        'lgo-player-facing-stack lgo-releasereadinesspage-stack lgo-service-compact-proof-page',
        'Sẵn sàng phát hành', 'NO_ACCEPTED_BACKEND_CONTRACT', 'ReleaseReadinessHubBoard', 'OwnerReleaseGateBoard',
        'lgo-service-disclosure-stack lgo-release-readiness-expanded-evidence', 'Bằng chứng phụ và tuyến liên quan',
        'ContentIaStartCta', 'FaqHelpfulnessCta', 'ClosedTesterChecklistBoard', 'ReleaseSurfaceAlignmentBoard',
        'TrustJourneyCheckpointBoard', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Release readiness composes the shared compact proof/disclosure layout for the current public readiness page.',
        '.lgo-releasereadinesspage-stack.lgo-service-compact-proof-page .lgo-release-readiness-hero-card h1',
        '.lgo-releasereadinesspage-stack.lgo-service-compact-proof-page .lgo-release-readiness-hub-board .lgo-grid',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.201 release readiness real UI layout', '.lgo-release-readiness-expanded-evidence'
    ])
    require_text("tests/e2e/fe-release-readiness-real-ui-layout-v1201.spec.ts", [
        'release readiness real UI layout v1.201', '/release/readiness', 'secondary proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosures', 'keyboard reaches a hero action link early',
        '/tmp/release-readiness-mobile-v1201.png', '/tmp/release-readiness-desktop-v1201.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201 WEB_CLOSED',
        'Select `/accessibility`', '/tmp/release-readiness-desktop-v1201.png', '/tmp/release-readiness-mobile-v1201.png',
        'desktop hero bottom 391.50px', 'mobile hero bottom 578.94px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.210', 'Current FE scope: select `/accessibility`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201 | WEB-FE | WEB_CLOSED | a74fb66 |',
        'Playwright desktop/mobile 2/2 release readiness real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201.md',
        'docs/execution/LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-REPORT-v1.201.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201.md',
    ]:
        require_text(rel, ['WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_release_readiness_real_ui_layout_v1201] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
