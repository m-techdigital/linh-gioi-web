#!/usr/bin/env python3
"""Source guard for the local published-guide directory; not proof of live search/backend."""
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
    page = require("apps/web/src/app/guides/page.tsx", ("@lgo-web/ui/reading-catalog.css", "@lgo-web/ui/forms.css", "<PublicGuidesDiscovery/>"))
    view = require("apps/web/src/components/PublicGuidesDiscovery.tsx", (
        'localContentRepository.list("guides")', "title:entry.title", "description:entry.summary", "id:entry.slug", "href:`/guides/${entry.slug}`",
        'title="Hướng dẫn cho Người Thức Tỉnh"', "<ExperienceHero", "<FeaturedReading", "<ReadingCatalog", 'id="guide-library"',
        'shelfBySlug[entry.slug]??"other"', "Không phải wiki trực tuyến", "không cấp quyền chơi", "/guides/beginner", "/support/safety"))
    if view.find("<ExperienceHero") >= view.find("<ReadingCatalog"): ERRORS.append("hero must precede published directory")
    catalog = require("packages/ui/src/reading-catalog.tsx", (
        "export function ReadingCatalog", "FilterChoices", "FormField", "TextInput", 'type="search"', "maxLength={120}",
        'normalize("NFD")', "text.includes(phrase)", "entry.groupId === groupId", 'initialGroupId = "all"', 'useState(initialGroupId)', 'useState("")',
        'role="status"', 'aria-live="polite"', "visible.length", "entries.length", "document.getElementById(inputId)?.focus()",
        "setQuery(\"\"); setGroupId(\"all\")", "Chưa tìm thấy bài phù hợp", "Chưa có hướng dẫn công khai", "<details", "{entry.description}",
        'aria-label={`${copy.actionLabel}: ${entry.title}`}', 'actionLabel: "Đọc hướng dẫn"', 'copy = defaultCopy', "không được gửi hoặc lưu"))
    feature = require("packages/ui/src/featured-reading.tsx", ("export function FeaturedReading", "<h2>{title}</h2>", "{description}", "<details", "href={href}", "Không phải gameplay live"))
    for name, text in (("page",page),("view",view),("catalog",catalog),("feature",feature)):
        for marker in ("fetch(", "XMLHttpRequest", "localStorage", "sessionStorage", "WebSocket", "window.history", "<form", "<textarea", "dangerouslySetInnerHTML"):
            if marker in text: ERRORS.append(f"{name}: forbidden intake/persistence/backend surrogate {marker}")
    require("packages/ui/src/index.ts", ("ReadingCatalog", "FeaturedReading"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./reading-catalog.css") != "./src/reading-catalog.css": ERRORS.append("missing shared style export")
    css = require("packages/ui/src/reading-catalog.css", (".lgo-library-featured", ".lgo-reading-catalog-grid", "repeat(3,minmax(0,1fr))", "min-height:44px", "[aria-pressed=\"true\"]", "forced-colors:active", "prefers-reduced-motion", ".lgo-catalog-summary[open]"))
    if "line-clamp" in css: ERRORS.append("catalog descriptions must not be line-clamped")
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    if "Shared guide index layout for public guide/library pages" in require("packages/ui/src/service-layout.css"): ERRORS.append("obsolete line-clamped directory styles retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/guides"', "Bố cục thư viện và hành trình đọc"))
    require("tests/e2e/fe-guides-discovery-real-ui-layout-v1234.spec.ts", ("contentEntries.filter", "guides.length", "m.overflow", "screenshot", "toHaveText(entry.summary)", "toHaveText(entry.title)", "normalize('NFD')", "requests).toEqual([])", "page.reload()", "toBeFocused()", "summary disclosures", "mobile catalog rows", "violations).toEqual([])"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No live search backend"))
    print("WEB FE GUIDES DISCOVERY REAL UI LAYOUT v1.234 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
