#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_release_tester_pack_real_ui_layout_v1202] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/release/tester-pack/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-testerpackpage-stack',
        'Gói tester cộng đồng', 'Không có form đăng ký', 'Không hứa slot', 'Feedback an toàn',
        'ClosedTesterChecklistBoard', 'lgo-service-disclosure-stack lgo-tester-pack-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'SafeFeedbackTemplateBoard', 'KnownLimitationNotesBoard', 'DeviceReportTemplateBoard',
        'ContentIaStartCta', 'FaqHelpfulnessCta', 'ReleaseReadinessHubCta', 'PerformanceBudgetCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Tester pack composes the shared compact proof/disclosure layout for the current public closed-test preparation page.',
        '.lgo-testerpackpage-stack.lgo-service-compact-proof-page .lgo-closed-tester-hero-card',
        '.lgo-testerpackpage-stack.lgo-service-compact-proof-page .lgo-closed-tester-design-board',
        '.lgo-testerpackpage-stack.lgo-service-compact-proof-page .lgo-closed-tester-checklist-board .lgo-grid',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.202 release tester pack real UI layout', '.lgo-tester-pack-expanded-evidence'
    ])
    require_text("tests/e2e/fe-release-tester-pack-real-ui-layout-v1202.spec.ts", [
        'release tester pack real UI layout v1.202', '/release/tester-pack', 'secondary proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero status controls',
        '/tmp/release-tester-pack-mobile-v1202.png', '/tmp/release-tester-pack-desktop-v1202.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/release-tester-pack-desktop-v1202.png', '/tmp/release-tester-pack-mobile-v1202.png',
        'desktop hero bottom 401.98px', 'mobile hero bottom 573.80px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.212', 'Current FE scope: select `/game/loop`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202 | WEB-FE | WEB_CLOSED | d72aca6 |',
        'Playwright desktop/mobile 2/2 release tester pack real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202.md',
        'docs/execution/LGO-WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-REPORT-v1.202.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202.md',
    ]:
        require_text(rel, ['WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_release_tester_pack_real_ui_layout_v1202] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
