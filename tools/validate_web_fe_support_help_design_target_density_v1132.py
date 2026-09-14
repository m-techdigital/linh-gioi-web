#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file(): fail(f"missing file: {rel}"); return ""
    return p.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> None:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
def png_size(rel: str) -> tuple[int, int]:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return (0, 0)
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"): fail(f"{rel}: expected PNG"); return (0, 0)
    return struct.unpack(">II", data[16:24])
def check_target() -> None:
    targets = ["apps/web/public/design-reference/support-help-detailed-design-target-v1132.png", "docs/design/reference/WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png"]
    for rel in targets:
        require_file(rel); width, height = png_size(rel)
        if width < 1600 or height < 900: fail(f"{rel}: expected high-fidelity support help target dimensions, got {width}x{height}")
        size = (ROOT / rel).stat().st_size if (ROOT / rel).is_file() else 0
        if size < 500_000: fail(f"{rel}: expected full raster design board, got {size} bytes")
    if all((ROOT / rel).is_file() for rel in targets) and (ROOT / targets[0]).read_bytes() != (ROOT / targets[1]).read_bytes(): fail("support help detailed target public/docs copies differ")
def check_tests_docs() -> None:
    for rel in ["tests/e2e/fe-support-help-design-target-density-v1132.spec.ts", "docs/execution/specs/WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132.md", "LGO-WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-REPORT-v1.132.md", "HANDOFF-LGO-WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132.md"]: require_file(rel)
    require_text("tests/e2e/fe-support-help-design-target-density-v1132.spec.ts", ["support help Vietnamese design target density", "Public Support Help", "support-help-detailed-design-target-v1132.png", "support/help first-flow visible copy should be Vietnamese", "desktop support/help board enters first fold", "desktop issue routing remains discoverable", "support/help h1 follows target scale"])
    require_text("apps/web/src/app/support/help/page.tsx", ["lgo-supporthelppage-stack", "lgo-support-help-design-board", "support-help-detailed-design-target-v1132.png", "FAQ nhanh: tìm đúng câu trả lời trước khi gửi phản hồi", "Bản đồ câu hỏi", "chưa có tìm kiếm thật", "chưa có ticket thật", "quickRoutes"])
    require_text("apps/web/src/app/globals.css", ["WEB v1.132 support help Vietnamese design target density", ".lgo-supporthelppage-stack", ".lgo-support-help-route-grid", ".lgo-support-help-design-board", ".lgo-faq-discovery-board", ".lgo-issue-category-board"])
    require_text("apps/web/src/components/PublicDesignTargetReference.tsx", ["PUBLIC_SUPPORT_HELP_TARGET", "Thiết kế chi tiết trung tâm trợ giúp", "support-help-detailed-design-target-v1132.png", "Public Support Help", "pathname === \"/support/help\""])
    require_text("docs/design/DESIGN-TARGET-REGISTRY.md", ["Public Support Help", "support-help-detailed-design-target-v1132.png", "WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png", "Vietnamese", "Design Target First"])
    registry = read("docs/design/DESIGN-TARGET-REGISTRY.md")
    for line in registry.splitlines():
        if line.startswith("| Public Service |") and "`/support/help`" in line:
            fail("docs/design/DESIGN-TARGET-REGISTRY.md: /support/help should not remain under broad Public Service applies-to list")
    for rel in ["docs/execution/specs/WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132.md", "LGO-WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-REPORT-v1.132.md", "HANDOFF-LGO-WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132.md"]:
        require_text(rel, ["WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132", "WEB_CLOSED", "Design Target First", "Base UI/UX Layout", "Public Support Help", "Vietnamese", "browser/e2e", "built-in image_gen", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132 WEB_CLOSED", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "Design Target First", "Base UI/UX Layout", "browser/e2e", "Vietnamese"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132 | WEB-FE | WEB_CLOSED |"])
def main() -> int:
    check_target(); check_tests_docs()
    if ERRORS:
        print("WEB FE SUPPORT HELP DESIGN TARGET DENSITY v1.132 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE SUPPORT HELP DESIGN TARGET DENSITY v1.132 VALIDATION PASS")
    return 0
if __name__ == "__main__": raise SystemExit(main())
