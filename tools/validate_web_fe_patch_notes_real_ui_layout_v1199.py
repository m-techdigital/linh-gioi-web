#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_patch_notes_real_ui_layout_v1199] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/patch-notes/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-patchnotespage-stack',
        'lgo-detail-hero-card lgo-patchnotes-hero-card', 'Nhật ký cập nhật tĩnh', 'Ghi chú cập nhật Linh Giới',
        'lgo-service-proof-card-grid lgo-patchnotes-board', 'lgo-patchnotes-grid', 'lgo-service-proof-card lgo-patchnotes-card',
        'Chưa có release live, launcher update hoặc hợp đồng backend được chấp nhận.', 'lgo-action-band'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'category: "patch-notes"', 'title: "Nền tảng web đã sẵn sàng cho kiểm runtime local"',
        'title: "Browser matrix trở thành guardrail hỗ trợ"', 'runtime gate vẫn phải được xác minh',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Patch notes page composes shared service proof/card layout for static release-note boundaries.',
        '.lgo-patchnotespage-stack', '.lgo-patchnotes-hero-card', '.lgo-patchnotes-board', '.lgo-patchnotes-card',
        '.lgo-service-compact-proof-page', '.lgo-service-proof-card-grid', '.lgo-service-proof-card', '.lgo-action-band'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-patchnotespage-stack', '.lgo-patchnotes-hero-card', '.lgo-patchnotes-board', '.lgo-patchnotes-card'])
    require_text("tests/e2e/fe-patch-notes-real-ui-layout-v1199.spec.ts", [
        '/patch-notes renders compact Vietnamese release-note page with shared service layout', 'Ghi chú cập nhật Linh Giới',
        'toHaveCount(2)', 'desktop action band reachable', 'mobile action band reachable',
        '/tmp/patch-notes-${isMobile ? "mobile" : "desktop"}-v1199.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.199 WEB_CLOSED', 'Select `/game/loop`',
        '/tmp/patch-notes-desktop-v1199.png', '/tmp/patch-notes-mobile-v1199.png', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.217', 'Current FE scope: select `/start`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.199 | WEB-FE | WEB_CLOSED | dcef67f |',
        'Playwright desktop/mobile 2/2 patch notes real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.199.md',
        'docs/execution/LGO-WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-REPORT-v1.199.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.199.md',
    ]:
        require_text(rel, ['WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.199', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_patch_notes_real_ui_layout_v1199] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
