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
def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a > b: fail(f"{rel}: expected {first} before {second}")
def check_routes() -> None:
    require_text("apps/web/src/app/release/page.tsx", ["PublicReleaseLanding", 'variant="immersive"'])
    require_order("apps/web/src/components/PublicReleaseLanding.tsx", "<h1>Hành trình phát hành</h1>", 'className="lgo-release-readiness-strip"')
    require_order("apps/web/src/app/release/readiness/page.tsx", "<ReleaseReadinessHero />", "<OwnerReleaseGateBoard")
    require_text("apps/web/src/components/PublicReleaseReadinessExperience.tsx", ['title="Sẵn sàng phát hành"', "ExperienceHero"])
    require_order("apps/web/src/app/release/tester-pack/page.tsx", "<TesterPackHero />", "<TesterPackShortcuts />")
    require_text("apps/web/src/components/PublicTesterPackExperience.tsx", ['title="Gói tester cộng đồng"', "ExperienceHero", "Chưa mở intake", "Không hứa slot", "không có backend tiếp nhận"])
def check_tests_and_docs() -> None:
    for rel in ["tests/e2e/fe-public-release-heading-priority-v186.spec.ts", "docs/execution/specs/WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86.md", "LGO-WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-REPORT-v1.86.md", "HANDOFF-LGO-WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86.md"]: require_file(rel)
    require_text("tests/e2e/fe-public-release-heading-priority-v186.spec.ts", ["/release", "/release/readiness", "/release/tester-pack", "starts release content with the page h1", "pageOverflow", "maxFont"])
    for rel in ["docs/execution/specs/WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86.md", "LGO-WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-REPORT-v1.86.md", "HANDOFF-LGO-WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86.md"]:
        require_text(rel, ["WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86", "WEB_CLOSED", "browser/e2e", "No production auth", "No DB persistence", "No real Portal integration", "No real Ops/Admin mutation", "NO_ACCEPTED_BACKEND_CONTRACT"])
    require_text("docs/execution/WEB-PROJECT-STATE.md", ["Current phase: WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86 WEB_CLOSED", "WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86"])
    require_text("docs/execution/WEB-TASK-LEDGER.md", ["| WEB-FE-PUBLIC-RELEASE-HEADING-PRIORITY-v1.86 | WEB-FE | WEB_CLOSED |"])
    require_text("docs/execution/WEB-NEXT-ACTION.md", ["WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT", "browser/e2e"])
def main() -> int:
    check_routes(); check_tests_and_docs()
    if ERRORS:
        print("WEB FE PUBLIC RELEASE HEADING PRIORITY v1.86 VALIDATION FAIL")
        for error in ERRORS: print(f"- {error}")
        return 1
    print("WEB FE PUBLIC RELEASE HEADING PRIORITY v1.86 VALIDATION PASS"); return 0
if __name__ == "__main__": raise SystemExit(main())
