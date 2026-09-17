#!/usr/bin/env python3
"""Source authority guard for WEB-OPT-05 SEO metadata/sitemap ownership v1.282."""
from pathlib import Path
import re

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
    source = require("packages/content/src/public-metadata.ts", (
        'PUBLIC_SITE_ORIGIN = "https://linhgioi.vn"',
        "publicMetadataForRoute",
        "publicLastModifiedForRoute",
        'replace(/\\bbackend\\b/gi, "hệ thống máy chủ")',
        '"/events": { title: "Sự kiện Linh Giới"',
        '"/patch-notes": { title: "Ghi chú cập nhật Linh Giới"',
    ))
    if 'new Date("2026-09-13")' in source:
        fail("public metadata source contains stale global lastModified")

    require("apps/web/src/lib/public-metadata.ts", (
        "publicMetadataBase",
        "metadataForRoute",
        "alternates: { canonical: source.canonical }",
        "index: false",
        "url: source.canonical",
    ))
    require("apps/web/src/app/layout.tsx", (
        'metadataForRoute("/")',
        "metadataBase: publicMetadataBase",
        'template: "%s | Linh Giới Online"',
    ))

    expected_pages = {
        "apps/web/src/app/game/page.tsx": "/game",
        "apps/web/src/app/classes/page.tsx": "/classes",
        "apps/web/src/app/story/page.tsx": "/story",
        "apps/web/src/app/game/loop/page.tsx": "/game/loop",
        "apps/web/src/app/journey/page.tsx": "/journey",
        "apps/web/src/app/start/page.tsx": "/start",
        "apps/web/src/app/download/page.tsx": "/download",
        "apps/web/src/app/download/trust/page.tsx": "/download/trust",
        "apps/web/src/app/release/page.tsx": "/release",
        "apps/web/src/app/release/readiness/page.tsx": "/release/readiness",
        "apps/web/src/app/release/tester-pack/page.tsx": "/release/tester-pack",
        "apps/web/src/app/status/page.tsx": "/status",
        "apps/web/src/app/community/page.tsx": "/community",
        "apps/web/src/app/community/onboarding/page.tsx": "/community/onboarding",
        "apps/web/src/app/roadmap/page.tsx": "/roadmap",
    }
    expected_pages.update({
        "apps/web/src/app/support/page.tsx": "/support",
        "apps/web/src/app/support/help/page.tsx": "/support/help",
        "apps/web/src/app/support/safety/page.tsx": "/support/safety",
        "apps/web/src/app/accessibility/page.tsx": "/accessibility",
        "apps/web/src/app/performance/page.tsx": "/performance",
        "apps/web/src/app/guides/page.tsx": "/guides",
        "apps/web/src/app/guides/beginner/page.tsx": "/guides/beginner",
        "apps/web/src/app/news/page.tsx": "/news",
        "apps/web/src/app/events/page.tsx": "/events",
        "apps/web/src/app/patch-notes/page.tsx": "/patch-notes",
    })
    for rel, route in expected_pages.items():
        require(rel, ("metadataForRoute", f'metadataForRoute("{route}")'))

    require("apps/web/src/app/news/[slug]/page.tsx", (
        'metadataForRoute(`/news/${entry.slug}`)',
        'entry.category !== "news"',
    ))
    require("apps/web/src/app/guides/[slug]/page.tsx", (
        'metadataForRoute(`/guides/${entry.slug}`)',
        'entry.category !== "guides"',
    ))

    sitemap = require("apps/web/src/app/sitemap.ts", (
        "publicRouteMatrix",
        'policy.indexability === "index"',
        "publicLastModifiedForRoute",
        "PUBLIC_SITE_ORIGIN",
    ))
    if "staticRoutes" in sitemap or 'new Date("2026-09-13")' in sitemap:
        fail("sitemap retains independent route list or stale global date")

    require("apps/web/src/app/robots.ts", (
        "PUBLIC_SITE_ORIGIN",
        "host: PUBLIC_SITE_ORIGIN",
        "`${PUBLIC_SITE_ORIGIN}/sitemap.xml`",
    ))
    require("packages/content/src/public-metadata.test.ts", (
        "gives every indexable route unique truthful metadata",
        "keeps archive routes canonical but explicitly noindex",
    ))
    require("tests/e2e/web-opt-seo-metadata-v1282.spec.ts", (
        "all 40 indexable routes expose unique descriptions",
        "all 19 archive routes are canonical noindex surfaces",
        "sitemap contains only indexable routes",
        "robots publishes an explicit host",
    ))

    next_action = read("docs/execution/WEB-NEXT-ACTION.md")
    if "WEB-OPT-05-SEO-METADATA-SITEMAP-OWNERSHIP-v1.282" not in next_action:
        fail("WEB-NEXT-ACTION does not point to WEB-OPT-05 v1.282")
    current_state = read("tools/validate_web_current_state.py")
    if '"validate_web_opt_seo_metadata_v1282.py"' not in current_state:
        fail("v1.282 validator is not registered in WEB CURRENT STATE authority")

    if ERRORS:
        print("WEB OPT SEO METADATA v1.282 VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB OPT SEO METADATA v1.282 VALIDATION PASS")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
