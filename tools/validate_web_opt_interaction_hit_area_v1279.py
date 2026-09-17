#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require(rel: str, needle: str, label: str) -> None:
    if needle not in read(rel):
        ERRORS.append(f"{rel} missing {label}")

def forbid(rel: str, needle: str, label: str) -> None:
    if needle in read(rel):
        ERRORS.append(f"{rel} retains {label}")

def main() -> int:
    release = read("packages/ui/src/release-landing-layout.css")
    status = read("packages/ui/src/status-landing-layout.css")
    service = read("packages/ui/src/service-layout.css")
    nav = read("packages/ui/src/marketing-navigation.css")

    for needle, label in [
        (".lgo-release-stage-card>a{margin-top:auto;font-size:12px;min-height:40px", "40px release stage action"),
        (".lgo-release-readiness-strip article>a{min-height:38px", "38px release evidence action"),
    ]:
        if needle in release:
            ERRORS.append(f"release layout retains {label}")
    for needle, label in [
        (".lgo-status-landing .lgo-visibility-card summary{min-height:40px", "40px status summary"),
        (".lgo-status-landing .lgo-visibility-filters .lgo-button{min-height:40px", "40px mobile status filter"),
        (".lgo-status-landing .lgo-visibility-card summary{font-size:.62rem;min-height:38px", "38px mobile status summary"),
    ]:
        if needle in status:
            ERRORS.append(f"status layout retains {label}")

    news_mobile_old = ".lgo-newsdetailpage-stack .lgo-link-button {\n    justify-content: center;\n    min-height: 31px;"
    news_mobile_new = ".lgo-newsdetailpage-stack .lgo-link-button {\n    justify-content: center;\n    min-height: 44px;"
    if news_mobile_old in service:
        ERRORS.append("service layout retains 31px mobile news-detail actions")
    if news_mobile_new not in service:
        ERRORS.append("service layout does not enforce 44px mobile news-detail actions")
    generic_mobile = ".lgo-service-compact-proof-page .lgo-service-proof-card .lgo-link-button {\n    min-height: 44px;"
    if generic_mobile not in service:
        ERRORS.append("service layout does not enforce 44px mobile proof-card actions")
    if "::-webkit-scrollbar" not in nav or ("height:5px" not in nav and "height: 5px" not in nav):
        ERRORS.append("marketing navigation lacks the 5px WebKit horizontal scrollbar cue")

    browser_test = read("tests/e2e/web-opt-interaction-hit-area-v1279.spec.ts")
    for needle in ["all 59 public routes keep ergonomic mobile action hit areas", "scrollbarHeight", "hitHeight >= 44"]:
        if needle not in browser_test:
            ERRORS.append(f"v1.279 browser guard missing marker: {needle}")

    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    project_state = read("docs/execution/WEB-PROJECT-STATE.md")
    ledger = read("docs/execution/WEB-TASK-LEDGER.md")
    report = read("docs/execution/LGO-WEB-OPT-02-INTERACTION-HIT-AREA-MOBILE-NAVIGATION-REPORT-v1.279.md")
    active_checkpoint = project_state.startswith("Current phase: WEB-OPT-02-INTERACTION-HIT-AREA-MOBILE-NAVIGATION-v1.279 WEB_CLOSED")
    if active_checkpoint and "WEB-OPT-03-PUBLIC-ASSET-BOUNDARY-IMAGE-DELIVERY-v1.280" not in next_action:
        ERRORS.append("active v1.279 checkpoint does not advance to WEB-OPT-03 v1.280")
    if "| WEB-OPT-02-INTERACTION-HIT-AREA-MOBILE-NAVIGATION-v1.279 | WEB-OPT | WEB_CLOSED |" not in ledger:
        ERRORS.append("WEB-TASK-LEDGER does not record WEB-OPT-02 v1.279 closure")
    if "72 controls below 44px" not in report or "5de43e8de9378d57162ad741dd5b3a4e87609417" not in report:
        ERRORS.append("v1.279 report is missing final geometry/source evidence")
    current_state = read("tools/validate_web_current_state.py")
    if '"validate_web_opt_interaction_hit_area_v1279.py"' not in current_state:
        ERRORS.append("v1.279 validator is not registered in WEB CURRENT STATE authority")

    if ERRORS:
        print("WEB OPT INTERACTION HIT AREA v1.279 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB OPT INTERACTION HIT AREA v1.279 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
