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
    if "WEB-OPT-02-INTERACTION-HIT-AREA-MOBILE-NAVIGATION-v1.279" not in next_action:
        ERRORS.append("WEB-NEXT-ACTION does not point to WEB-OPT-02 v1.279")
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
