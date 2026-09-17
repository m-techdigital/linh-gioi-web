#!/usr/bin/env python3
"""Source/ownership guard for safe-reporting UI. Browser evidence remains separate."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing {rel}")
        return ""
    text = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text:
            ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/support/safety/page.tsx", (
        "@lgo-web/ui/safety-layout.css", "@lgo-web/ui/reading-tools.css", "lgo-safety-hub"))
    parts = ("<PublicSafetyHero/>", "<PublicSafetyChecklist/>", "<PublicSafetyDataBoundary/>", "<PublicSafetyIssuePaths/>", "<PublicSafetyCommunityNotes/>")
    offsets = [page.find(p) for p in parts]
    if -1 in offsets or offsets != sorted(offsets):
        ERRORS.append("safe-reporting page must start with real hero, preparation and data boundaries")
    for marker in ("design-reference", "lgo-service-compact-proof-page", "<form"):
        if marker in page: ERRORS.append(f"obsolete/unsafe page composition: {marker}")
    experience = require("apps/web/src/components/PublicSupportSafetyExperience.tsx", (
        'title="Báo lỗi an toàn"', 'layout="cards"', 'headingId="safety-checklist-heading"',
        'id:"hide-password"', 'id:"hide-token"', 'id:"reproduce"', 'id:"safe-capture"', 'id:"official-channel"',
        "PrivacyNotice", "DataBoundaryColumns", "supportIssuePaths.map", "deviceReportTemplateFields.map",
        "QuestionDisclosureList", 'href={item.whereToRead}', 'fetchPriority="high"',
        "NO_ACCEPTED_BACKEND_CONTRACT", "Chưa có ticket thật", "không tự che ảnh/log",
        "/release/tester-pack#tester-feedback", "/support/help"))
    privacy = require("packages/ui/src/privacy-guidance.tsx", ("export function PrivacyNotice", "export function DataBoundaryColumns", "aria-labelledby", "Không nên gửi"))
    tools = require("packages/ui/src/reading-tools.tsx", ('layout?: "list" | "cards"', 'layout = "list"', 'data-layout={layout}', "ReadonlySet<string>", "setChecked(new Set())", "role=\"status\""))
    for text, name in ((experience, "experience"), (privacy, "privacy"), (tools.split("export type ReadingTemplate")[0], "checklist")):
        for marker in ("fetch(", "XMLHttpRequest", "WebSocket", "localStorage", "sessionStorage", "<form", "type=\"file\"", "<textarea"):
            if marker in text: ERRORS.append(f"{name}: forbidden intake/persistence surrogate {marker}")
    require("packages/ui/src/index.ts", ("PrivacyNotice", "DataBoundaryColumns"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./safety-layout.css") != "./src/safety-layout.css": ERRORS.append("missing safety stylesheet export")
    require("packages/ui/src/safety-layout.css", (".lgo-privacy-notice", ".lgo-data-boundary-columns", "var(--lgo-color-jade-teal)", "@media(max-width:480px)"))
    require("packages/ui/src/reading-tools.css", ('[data-layout="cards"]', ":has(input:checked)", ":focus-within", "forced-colors:active", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for rel in ("packages/ui/src/safety-layout.css", "packages/ui/src/reading-tools.css"):
        refs = set(re.findall(r"var\((--lgo-[\w-]+)", require(rel)))
        for token in sorted(refs - tokens): ERRORS.append(f"{rel}: undefined canonical token {token}")
    service = require("packages/ui/src/service-layout.css")
    if "Shared support/safety safe-reporting layout." in service: ERRORS.append("old safety layout retained")
    if "Shared legacy safety evidence styles still consumed by sibling public pages" not in service: ERRORS.append("shared sibling evidence styles were removed")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ("support-safety-detailed-design-target-v1133.png", 'pathname === "/support/safety"'))
    for rel in ("docs/design/reference/WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png", "apps/web/public/game-art/world/dong-mon-skyline.webp"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing visual source {rel}")
    require("tests/e2e/fe-support-safety-real-ui-layout-v1226.spec.ts", ("metrics.overflow", "metrics.notice.top", "toHaveCount(5)", "1/5", "5/5", "0/5", "page.reload()", "requests).toEqual([])", "keyboard.press(\"Enter\")", "violations).toEqual([])", "checked preparation cards", "before.border", "screenshot"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No secure ticket inbox"))
    print("WEB FE SUPPORT SAFETY REAL UI LAYOUT v1.226 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__":
    raise SystemExit(main())
