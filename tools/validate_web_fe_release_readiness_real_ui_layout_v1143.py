#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(msg: str) -> None: ERRORS.append(msg)
def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return ""
    return p.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def req(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for m in markers:
        if m not in text: fail(f"{rel}: missing {m}")
def png_size(rel: str) -> tuple[int,int]:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return (0,0)
    data = p.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0,0)
    return struct.unpack(">II", data[16:24])
def main() -> int:
    for rel in [
        "apps/web/public/design-reference/release-readiness-detailed-design-target-v1128.png",
        "docs/design/reference/WEB-FE-RELEASE-READINESS-DETAILED-DESIGN-TARGET-v1.128.png",
        "packages/ui/src/service-layout.css",
        "tests/e2e/fe-release-readiness-vietnamese-design-match-v1143.spec.ts",
        "docs/execution/specs/WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143.md",
        "LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-REPORT-v1.143.md",
        "HANDOFF-LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143.md",
    ]: require_file(rel)
    for rel in ["apps/web/public/design-reference/release-readiness-detailed-design-target-v1128.png", "docs/design/reference/WEB-FE-RELEASE-READINESS-DETAILED-DESIGN-TARGET-v1.128.png"]:
        w,h = png_size(rel)
        if w < 1600 or h < 900: fail(f"{rel}: expected high-fidelity target, got {w}x{h}")
    if (ROOT/"apps/web/public/design-reference/release-readiness-detailed-design-target-v1128.png").is_file() and (ROOT/"docs/design/reference/WEB-FE-RELEASE-READINESS-DETAILED-DESIGN-TARGET-v1.128.png").is_file():
        if (ROOT/"apps/web/public/design-reference/release-readiness-detailed-design-target-v1128.png").read_bytes() != (ROOT/"docs/design/reference/WEB-FE-RELEASE-READINESS-DETAILED-DESIGN-TARGET-v1.128.png").read_bytes(): fail("release readiness target copies differ")
    req("AGENTS.md", ["Real Browser UI/UX Layout First is Priority #1", "CSS Ownership and File-Size rule", "Base First is mandatory before adding or changing FE/UI layout"])
    req("docs/execution/WEB-NEXT-ACTION.md", ["Real Browser UI/UX Layout First is Priority #1", "CSS must be managed by owner/role", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.193", "select `/news/route-continuity-conversion-polish-started` as the next single active page"])
    req("packages/ui/package.json", ["./service-layout.css", "./src/service-layout.css"])
    req("apps/web/src/app/layout.tsx", ["@lgo-web/ui/service-layout.css"])
    req("packages/ui/src/service-layout.css", ["Shared public service/proof layout foundation", ".lgo-service-compact-proof-page", ".lgo-service-status-seal", ".lgo-service-proof-board", ".lgo-service-proof-card-grid", ".lgo-service-proof-card"])
    req("apps/web/src/app/release/readiness/page.tsx", ["Sẵn sàng phát hành", "lgo-service-compact-proof-page", "lgo-service-status-actions", "lgo-service-status-seal", "lgo-service-proof-board", "Bảng cổng readiness phát hành", "NO_ACCEPTED_BACKEND_CONTRACT", "Không mở funnel giả"])
    req("apps/web/src/components/PublicReleaseReadinessHubSections.tsx", ["lgo-service-proof-card-grid", "lgo-service-proof-card", "Cổng readiness", "Cổng owner", "labelForState"])
    globals_css = read("apps/web/src/app/globals.css")
    if "WEB v1.143 release readiness real UI layout pass" in globals_css: fail("globals.css still owns v1.143 route-local CSS instead of shared service-layout.css")
    req("tests/e2e/fe-release-readiness-vietnamese-design-match-v1143.spec.ts", ["release readiness Vietnamese design match v1.143", "owner gates stay close to readiness hub", "desktop compact readiness hero", "mobile board follows without excessive blank gap"])
    for rel in ["docs/execution/specs/WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143.md", "LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-REPORT-v1.143.md", "HANDOFF-LGO-WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143.md"]:
        req(rel, ["WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143", "WEB_CLOSED", "Real Browser UI/UX Layout First", "Base First", "service-layout.css", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    req("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143 WEB_CLOSED", "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.193"])
    req("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.143 | WEB-FE | WEB_CLOSED |"])
    if ERRORS:
        print("WEB FE RELEASE READINESS REAL UI LAYOUT v1.143 VALIDATION FAIL")
        for e in ERRORS: print(f"- {e}")
        return 1
    print("WEB FE RELEASE READINESS REAL UI LAYOUT v1.143 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
