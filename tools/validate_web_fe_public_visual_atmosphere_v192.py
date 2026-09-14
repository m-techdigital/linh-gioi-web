#!/usr/bin/env python3
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
def fail(message: str) -> None: ERRORS.append(message)
def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file(): fail(f"missing file: {rel}"); return ""
    return path.read_text(encoding="utf-8")
def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file(): fail(f"missing file: {rel}")
def require_text(rel: str, markers: list[str]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text: fail(f"{rel}: missing {marker}")
    return text
def check_css() -> None:
    require_text("apps/web/src/app/globals.css", [
        "WEB v1.92 public visual atmosphere and layout depth polish",
        ".lgo-public-shell::before", "position: fixed", "radial-gradient(circle at 18% 18%", ".lgo-public-shell::after",
        ".lgo-site-header", "backdrop-filter: blur(18px)", "box-shadow: 0 18px 44px",
        ".lgo-panel::before", ".lgo-card::before", "linear-gradient(90deg, rgba(49, 216, 232",
        ".lgo-link-button.lgo-tone-gold", ".lgo-link-button.lgo-tone-spirit", "text-shadow: 0 2px 22px"
    ])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-visual-atmosphere-v192.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92.md", "LGO-WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-REPORT-v1.92.md", "HANDOFF-LGO-WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-visual-atmosphere-v192.spec.ts", ["public visual atmosphere", "shell ambient layer", "nav glass background", "card accent layer", "button gradient tone", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92.md", "LGO-WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-REPORT-v1.92.md", "HANDOFF-LGO-WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92", "WEB_CLOSED", "browser/e2e", "UI/UX layout", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92 WEB_CLOSED", "WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-VISUAL-ATMOSPHERE-v1.92 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.93", "browser/e2e"])
def main() -> int:
    check_css(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC VISUAL ATMOSPHERE v1.92 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC VISUAL ATMOSPHERE v1.92 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
