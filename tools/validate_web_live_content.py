#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
from web_fixture_source import fixture_source
import sys
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_dir(rel: str) -> None:
    if not (ROOT / rel).is_dir():
        fail(f"missing dir: {rel}")

def read(rel: str) -> str:
    if rel == "packages/content/src/fixtures.ts": return fixture_source(ROOT)
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing readable file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_text(rel: str, needle: str) -> None:
    text = read(rel)
    if needle not in text:
        fail(f"{rel} missing required text: {needle}")

def require_any_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    if not any(n in text for n in needles):
        fail(f"{rel} missing one of: {needles}")

def check_forbidden_roots() -> None:
    for forbidden in ["client", "server", "protocol", "gamedata"]:
        if (ROOT / forbidden).exists():
            fail(f"forbidden game root present: {forbidden}")

def check_no_app_api_routes() -> None:
    for path in (ROOT / "apps").glob("*/src/app/api") if (ROOT / "apps").exists() else []:
        if path.exists():
            fail(f"forbidden app/api route present: {path.relative_to(ROOT)}")

def check_no_generated_artifacts(ignore_pycache: bool = True) -> None:
    forbidden = {"node_modules", ".next", "dist", "build", "coverage"}
    for path in ROOT.rglob("*"):
        parts = set(path.parts)
        if ignore_pycache and "__pycache__" in parts:
            continue
        if "__pycache__" in parts or forbidden.intersection(parts):
            fail(f"forbidden generated/cache artifact present: {path.relative_to(ROOT)}")

def require_non_claims() -> None:
    rel = "docs/execution/WEB-NON-CLAIMS.md"
    for phrase in [
        "No production auth", "No DB persistence", "No real account portal integration",
        "No real ops/admin mutation", "No independent backend", "No CMS",
        "No production deployment", "No payment/shop/economy"
    ]:
        require_text(rel, phrase)

def finish(name: str) -> int:
    if ERRORS:
        print(f"{name} VALIDATION FAIL")
        for e in ERRORS:
            print(f"- {e}")
        return 1
    print(f"{name} VALIDATION PASS")
    return 0

import re

def main() -> int:
    check_forbidden_roots(); check_no_app_api_routes(); check_no_generated_artifacts(); require_non_claims()
    for rel in [
        "packages/content/src/types.ts", "packages/content/src/fixtures.ts",
        "packages/content/src/repository.ts", "packages/content/src/validation.ts",
        "docs/execution/WEB-CONTENT-MODEL.md", "apps/web/src/app/events/page.tsx",
        "apps/web/src/app/guides/page.tsx", "apps/web/src/app/patch-notes/page.tsx", "apps/web/src/app/status/page.tsx",
    ]:
        require_file(rel)
    for category in ["news", "events", "patch-notes", "notices", "maintenance", "guides", "download-builds"]:
        require_text("packages/content/src/types.ts", category)
        require_text("docs/execution/WEB-CONTENT-MODEL.md", category)
    for phrase in ["ContentRepository", "LocalContentRepository", "findDuplicateSlugs", "findInvalidDates", "No CMS", "No DB persistence", "No backend API claim"]:
        require_any_text("packages/content/src/index.ts", [phrase]) if phrase.startswith("find") else require_any_text("docs/execution/WEB-CONTENT-MODEL.md", [phrase])
    fixtures = read("packages/content/src/fixtures.ts")
    content_entries_match = re.search(r"export const contentEntries: ContentEntry\[\] = \[([\s\S]*?)^\];", fixtures, re.M)
    content_entries_text = content_entries_match.group(1) if content_entries_match else fixtures
    slugs = re.findall(r'slug: "([^"]+)"', content_entries_text)
    if len(slugs) != len(set(slugs)):
        fail("duplicate content entry slug detected")
    for slug in slugs:
        if not re.match(r"^[a-z0-9]+(?:-[a-z0-9]+)*$", slug):
            fail(f"invalid slug: {slug}")
    for date in re.findall(r'publishedAt: "([^"]+)"', content_entries_text):
        if not re.match(r"^20\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$", date):
            fail(f"invalid ISO date string: {date}")
    return finish("WEB LIVE CONTENT")

if __name__ == "__main__":
    sys.exit(main())
