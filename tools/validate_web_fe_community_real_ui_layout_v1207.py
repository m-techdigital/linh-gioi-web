#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_community_real_ui_layout_v1207] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/community/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-communitypage-stack',
        'Cộng đồng Linh Giới', 'chưa có trò chuyện', 'Quảng trường Linh Thành',
        'lgo-community-design-board', 'lgo-community-focus-board', 'lgo-community-real-plaza-panel',
        'CommunityReadinessDepth', 'lgo-service-disclosure-stack lgo-community-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'CommunityOnboardingPathBoard', 'CommunityFeedbackGuidance',
        'CommunityConductBoard', 'PlayerSafetySupportCta', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared community page layout for public service/community surfaces.', '.lgo-service-compact-proof-page.lgo-communitypage-stack',
        '.lgo-community-focus-grid', '.lgo-community-real-plaza-grid', '.lgo-community-expanded-evidence',
        'grid-template-columns: repeat(3, minmax(0, 1fr));', 'grid-template-columns: repeat(2, minmax(0, 1fr));',
        '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.207 community real UI layout', '.lgo-community-expanded-evidence', '.lgo-communitypage-stack'
    ])
    require_text("tests/e2e/fe-community-real-ui-layout-v1207.spec.ts", [
        'community real UI layout v1.207', '/community', 'secondary community proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero community actions',
        '/tmp/community-mobile-v1207.png', '/tmp/community-desktop-v1207.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/community-desktop-v1207.png', '/tmp/community-mobile-v1207.png',
        'desktop hero bottom 373.13px', 'mobile hero bottom 473.30px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.215', 'Current FE scope: select `/classes`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 community real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207.md',
        'docs/execution/LGO-WEB-FE-COMMUNITY-REAL-UI-LAYOUT-REPORT-v1.207.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207.md',
    ]:
        require_text(rel, ['WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_community_real_ui_layout_v1207] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
