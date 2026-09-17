#!/usr/bin/env python3
"""Source authority guard for WEB-OPT-04 public IA/player language v1.281."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(message: str) -> None:
    ERRORS.append(message)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.is_file():
        fail(f"missing file: {rel}")
        return ""
    return path.read_text(encoding="utf-8")

def require(rel: str, markers: tuple[str, ...]) -> str:
    text = read(rel)
    for marker in markers:
        if marker not in text:
            fail(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    ia = require("packages/content/src/public-ia.ts", (
        'PublicRouteOwner = "product" | "guide" | "news" | "support" | "archive"',
        'route("/events", "archive", "archive", "noindex", "archive")',
        'route("/patch-notes", "archive", "archive", "noindex", "archive")',
        '"web-program-control-tower": "archive"',
        "playerNewsEntries",
        "archiveNewsEntries",
        "publicRouteMatrix",
        "publicLanguageContract",
        '"WEB v"',
        'backend: "hệ thống máy chủ hoặc dịch vụ vận hành chưa được kết nối"',
    ))
    policy_block = ia.split("currentNewsPolicy", 1)[1].split("= {", 1)[1].split("};", 1)[0]
    if ': "player",' in policy_block:
        fail("current Web-program news must not be classified as player news")

    require("packages/content/src/index.ts", (
        "archiveNewsEntries",
        "playerNewsEntries",
        "publicRouteMatrix",
        "publicLanguageContract",
        "PublicRoutePolicy",
    ))

    home = require("apps/web/src/components/PublicHomeLanding.tsx", (
        "playerNewsEntries",
        "Chưa có bản tin game mới",
        "Xem kho bản tin",
        'href="/status"',
    ))
    if "localContentRepository.list(\"news\")" in home:
        fail("homepage still selects raw Web-program news as primary discovery")

    news = require("apps/web/src/components/PublicNewsDiscovery.tsx", (
        "playerNewsEntries",
        "archiveNewsEntries",
        "Chưa có bản tin game mới",
        'id="news-devlog-archive"',
        "Nhật ký phát triển web",
        'href="/events"',
        'href="/patch-notes"',
        "Không biến thay đổi kỹ thuật thành tin game",
    ))
    if "localContentRepository.list(\"news\")" in news:
        fail("news discovery still reads raw source list without IA classification")

    require("docs/content/PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281.md", (
        "All 17 currently published `news` records",
        "archive + noindex intent",
        "Player-language rule",
        "WEB-OPT-05",
    ))

    require("packages/content/src/public-ia.test.ts", (
        "classifies all 59 public routes exactly once",
        "keeps current web-program news out of primary player discovery",
        "fixture-only events route",
    ))
    require("tests/e2e/web-opt-public-ia-language-v1281.spec.ts", (
        "primary news discovery is player-facing",
        "homepage stops promoting development-history articles",
        "all sitemap routes have an intentional inbound public link",
    ))

    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    project_state = read("docs/execution/WEB-PROJECT-STATE.md")
    ledger = read("docs/execution/WEB-TASK-LEDGER.md")
    report = read("docs/execution/LGO-WEB-OPT-04-PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-REPORT-v1.281.md")
    active_prefix = "Current phase: WEB-OPT-04-PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281 WEB_CLOSED"
    if project_state.startswith(active_prefix) and "WEB-OPT-05-SEO-METADATA-SITEMAP-OWNERSHIP-v1.282" not in next_action:
        fail("active v1.281 checkpoint does not advance to WEB-OPT-05 v1.282")
    if "| WEB-OPT-04-PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281 | WEB-OPT | WEB_CLOSED |" not in ledger:
        fail("WEB-TASK-LEDGER does not record WEB-OPT-04 v1.281 closure")
    if "a5659a33e0e74710efe334a96057dad7f64489c2" not in report or "3232px" not in report or "1266px" not in report:
        fail("v1.281 report is missing source/IA closure evidence")
    current_state = read("tools/validate_web_current_state.py")
    if '"validate_web_opt_public_ia_language_v1281.py"' not in current_state:
        fail("v1.281 validator is not registered in WEB CURRENT STATE authority")
    if '"validate_web_fe_news_discovery_v1253.py": "validate_web_opt_public_ia_language_v1281.py"' not in current_state:
        fail("v1.253 news discovery is not explicitly superseded by v1.281")

    if ERRORS:
        print("WEB OPT PUBLIC IA LANGUAGE v1.281 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB OPT PUBLIC IA LANGUAGE v1.281 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
