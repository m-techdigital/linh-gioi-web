#!/usr/bin/env python3
"""Community UI ownership/non-claim guard, not proof of a running social service."""
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
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/community/page.tsx", ("@lgo-web/ui/community-layout.css", "lgo-community-experience"))
    parts = ("<PublicCommunityHero/>", "<PublicCommunityPanels/>", "<PublicCommunityGallery/>", "<PublicCommunityConduct/>", "<PublicCommunityScopeNotes/>")
    offsets = [page.find(part) for part in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("community page must start with real hero/panels")
    for token in ("design-reference", "lgo-service-compact-proof-page", "<form"):
        if token in page: ERRORS.append(f"obsolete/unsafe composition {token}")
    component = require("apps/web/src/components/PublicCommunityExperience.tsx", (
        'title="Cộng đồng Linh Giới"', "lgo-community-vista", "lgo-community-columns", "PrincipleMedallions", "MediaFrame",
        "communityConductRules.map", "communityPrinciples.map", "communityReadinessSteps.map", "communityFeedbackChannels.map",
        'loading="lazy"', 'fetchPriority="high"', 'target="_blank"', 'rel="noopener noreferrer"',
        "Mở ảnh gốc", "prototype", "Chưa có trò chuyện, diễn đàn hoặc bang hội", "NO_ACCEPTED_BACKEND_CONTRACT",
        "/community/onboarding", "/release/readiness", "/release/tester-pack", "/support/safety",
        "community-rule-0", "community-rule-1", "community-rule-2"))
    for token in ("fetch(", "WebSocket", "setInterval(", "Date.now(", "<form", "<input", "localStorage", "iframe"):
        if token in component: ERRORS.append(f"forbidden community-service surrogate {token}")
    require("packages/ui/src/guidance.tsx", ("export function PrincipleMedallions", "aria-label={label}", "href={item.href}"))
    require("packages/ui/src/index.ts", ("PrincipleMedallions",))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./community-layout.css") != "./src/community-layout.css": ERRORS.append("missing shared stylesheet export")
    css = require("packages/ui/src/community-layout.css", (
        ".lgo-community-columns", "repeat(3,minmax(0,1fr))", "grid-template-rows:max-content auto",
        ".lgo-principle-medallions", ".lgo-runtime-gallery", "object-fit:contain", "min-height:44px", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    globals_css = require("apps/web/src/app/globals.css")
    if "WEB v1.91 public community real plaza screenshot gallery" in globals_css: ERRORS.append("obsolete app-global gallery owner retained")
    service = require("packages/ui/src/service-layout.css")
    if "Shared community page layout for public service/community surfaces" in service: ERRORS.append("obsolete community compact block retained")
    if "Shared legacy community evidence styles still consumed by sibling pages" not in service: ERRORS.append("missing preserved sibling evidence rules")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ("community-detailed-design-target-v1149.png", 'pathname === "/community"'))
    for rel in ("apps/web/public/design-reference/community-detailed-design-target-v1149.png", "apps/web/public/game-art/community/linh-thanh-plaza-npc-preview.png", "apps/web/public/game-art/community/linh-thanh-plaza-target-selector.png"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing approved reference {rel}")
    require("tests/e2e/fe-community-real-ui-layout-v1227.spec.ts", ("m.overflow", "m.cols", "toHaveCount(3)", "popupPromise", "new-tab cue must not be clipped", "keyboard.press('Enter')", "violations).toEqual([])", "screenshot"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No live community/chat/forum/guild backend"))
    print("WEB FE COMMUNITY REAL UI LAYOUT v1.227 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
