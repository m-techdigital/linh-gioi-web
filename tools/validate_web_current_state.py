#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import sys
import re
import json
from web_fixture_source import fixture_source
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
        if "__pycache__" in parts:
            continue
        if forbidden.intersection(parts):
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

import runpy

ACTIVE_SUITE_MANIFEST = "tools/web_active_suite_manifest_v1298.json"

def load_active_suite_manifest() -> dict:
    path = ROOT / ACTIVE_SUITE_MANIFEST
    if not path.is_file():
        fail(f"missing active-suite manifest: {ACTIVE_SUITE_MANIFEST}")
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"invalid active-suite manifest: {exc}")
        return {}
    if data.get("historical_is_provenance_not_pass") is not True:
        fail("active-suite manifest must declare historical suites as provenance, not PASS")
    return data


def public_route_exists(route: str) -> bool:
    """Resolve literal pages and the existing file-backed published guide/news renderers.

    This is intentionally not a general Next.js route parser. Unknown dynamic
    families fail closed; browser tests must still prove runtime reachability.
    """
    if not re.fullmatch(r"/(?:[a-z0-9-]+(?:/[a-z0-9-]+)*)?", route):
        return False
    app = ROOT / "apps/web/src/app"
    if (app / route.lstrip("/") / "page.tsx").is_file():
        return True
    match = re.fullmatch(r"/(guides|news)/([a-z0-9-]+)", route)
    if not match:
        return False
    category, slug = match.groups()
    renderer = app / category / "[slug]/page.tsx"
    fixtures = ROOT / "packages/content/src/fixtures.ts"
    if not match or not renderer.is_file() or not fixtures.is_file():
        return False
    source = renderer.read_text(encoding="utf-8")
    required = ('generateStaticParams', f'localContentRepository.list("{category}")',
                'localContentRepository.bySlug(slug)', f'entry.category !== "{category}"', 'notFound()')
    if not all(marker in source for marker in required):
        return False
    entries = re.search(r"export const contentEntries\s*:\s*ContentEntry\[\]\s*=\s*\[(.*?)^\];",
                        fixture_source(ROOT), re.S | re.M)
    if not entries:
        return False
    for block in re.findall(r"^  \{\n(.*?)^  \}", entries[1], re.S | re.M):
        values = dict(re.findall(r'^\s*(slug|category|status):\s*"([^"\n]+)"\s*,?\s*$', block, re.M))
        if values == {"slug": slug, "category": category, "status": "published"}:
            return True
    return False

def check_active_checkpoint() -> None:
    state = read("docs/execution/WEB-PROJECT-STATE.md")
    queue = read("docs/execution/WEB-NEXT-ACTION.md")
    current = re.match(r"Current phase: ([A-Z0-9-]+)-v(\d+)\.(\d+) (WEB_CLOSED|WEB_VISUAL_REVIEW_REQUIRED)", state)
    upcoming = re.search(r"(?m)^Next task:\s*\n((?:WEB-FE|WEB-OPT)-[A-Z0-9-]+-v(\d+)\.(\d+))", queue)
    route = re.search(r"Current FE scope: select `([^`]+)`", queue)
    shared_scope = re.search(r"(?m)^Current optimization scope:\s*(.+)$", queue)
    if not current or not upcoming:
        fail("active checkpoint/next task header is missing or ambiguous")
        return
    phase = f"{current[1]}-v{current[2]}.{current[3]}"
    status = current[4]
    if status == "WEB_CLOSED":
        if (int(upcoming[2]), int(upcoming[3])) != (int(current[2]), int(current[3]) + 1):
            fail("next task must be the successor of the first, active checkpoint (not a historical marker)")
    else:
        current_route = re.search(r"(?m)^Current route: `([^`]+)`", state)
        if not upcoming[1].startswith("WEB-FE-") or upcoming[1] != phase or not current_route or not route or route[1] != current_route[1]:
            fail("visual review must remain on the same task and route; no assumed closure or automatic advance")
    phase_kind = "WEB-OPT" if phase.startswith("WEB-OPT-") else "WEB-FE"
    require_text("docs/execution/WEB-TASK-LEDGER.md", f"| {phase} | {phase_kind} | {status} |")
    if upcoming[1].startswith("WEB-FE-"):
        if not route:
            fail("page-scoped WEB-FE task requires an explicit Current FE scope route")
        elif not public_route_exists(route[1]):
            fail(f"next public page does not exist: {route[1]}")
    elif not shared_scope:
        fail("shared WEB-OPT task requires an explicit Current optimization scope")

def main() -> int:
    check_active_checkpoint()
    check_forbidden_roots(); check_no_app_api_routes(); check_no_generated_artifacts(); require_non_claims()
    for rel in ["docs/execution/WEB-PROJECT-STATE.md", "docs/execution/WEB-NEXT-ACTION.md", "docs/execution/WEB-TASK-LEDGER.md"]:
        require_file(rel)
    require_any_text("docs/execution/WEB-PROJECT-STATE.md", [
        "LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.35",
        "LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_VERIFYING_v1.35",
        "LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.34",
        "LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_VERIFYING_v1.34",
        "LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.33",
        "LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_VERIFYING_v1.33",
        "LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.32",
        "LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_VERIFYING_v1.32",
        "LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.31",
        "LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_VERIFYING_v1.31",
        "LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.30",
        "LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_VERIFYING_v1.30",
        "LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.29",
        "LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_VERIFYING_v1.29",
        "LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.28",
        "LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_VERIFYING_v1.28",
        "LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_VERIFYING_v1.26",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26",
        "LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.26",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_VERIFYING_v1.25",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25",
        "LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_SOURCE_READY_ENV_LIMITED_v1.25",
        "LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_VERIFYING_v1.24",
        "LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_SOURCE_READY_ENV_LIMITED_v1.23",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_VERIFYING_v1.23",
        "LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_READY_v1.23",
        "LGO_WEB_PUBLIC_GAME_EXPERIENCE_BRAND_REALIGNMENT_READY_v1.22",
        "LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21",
        "LGO_WEB_PUBLIC_CLOSED_TESTER_INFORMATION_PACK_READY_v1.20",
        "LGO_WEB_PUBLIC_RELEASE_READINESS_HUB_POLISH_READY_v1.19",
        "LGO_WEB_PUBLIC_PLAYER_TRUST_RELEASE_NARRATIVE_READY_v1.18",
        "LGO_WEB_PUBLIC_ROUTE_CONTINUITY_CONVERSION_POLISH_READY_v1.17",
        "LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_v1.16",
        "LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15",
        "LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14",
        "LGO_WEB_PUBLIC_WORLD_GAMEPLAY_LOOP_DEPTH_READY_v1.13",
        "LGO_WEB_PUBLIC_CONTENT_IA_HUB_POLISH_READY_v1.12",
        "LGO_WEB_PUBLIC_COMMUNITY_ROADMAP_ONBOARDING_READY_v1.11",
        "LGO_WEB_PUBLIC_STATUS_DOWNLOAD_TRUST_POLISH_READY_v1.10",
        "LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_v1.9",
        "LGO_WEB_PUBLIC_GAME_INFO_DEPTH_READY_v1.8",
        "LGO_WEB_PUBLIC_VISUAL_RESPONSIVE_POLISH_READY_v1.7",
        "LGO_WEB_PUBLIC_UX_CONTENT_POLISH_READY_v1.6",
        "LGO_WEB_RUNTIME_BROWSER_E2E_MATRIX_PASSED_v1.5",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "browser/e2e")
    for phrase in ["No independent backend", "No CMS", "No production deployment", "No payment/shop/economy"]:
        require_text("docs/execution/WEB-NON-CLAIMS.md", phrase)
    forbidden_pkg_markers = ["express", "nestjs", "laravel", "typeorm", "prisma", "sequelize"]
    pkg = read("package.json").lower()
    for marker in forbidden_pkg_markers:
        if marker in pkg:
            fail(f"independent backend/database package marker present: {marker}")
    if ERRORS:
        return finish("WEB CURRENT STATE")
    active_suite = load_active_suite_manifest()
    active_validators = active_suite.get("active", {}).get("validators", [])
    active_browser_specs = active_suite.get("active", {}).get("browser_specs", [])
    superseded_validators = active_suite.get("superseded", {}).get("validators", {})
    superseded_browser_specs = active_suite.get("superseded", {}).get("browser_specs", {})
    if not active_validators or not active_browser_specs:
        fail("active-suite manifest has no active validators/browser specs")
    if ERRORS:
        return finish("WEB CURRENT STATE")
    print(
        "WEB ACTIVE SUITE AUTHORITY "
        f"validators={len(active_validators)} browser_specs={len(active_browser_specs)} "
        f"historical_validators={len(superseded_validators)} "
        f"historical_browser_specs={len(superseded_browser_specs)}; historical entries are provenance, not PASS"
    )
    for validator in active_validators:
        validator_path = ROOT / "tools" / validator
        if not validator_path.is_file():
            fail(f"active validator missing: {validator}")
            continue
        namespace = runpy.run_path(str(validator_path), run_name=f"lgo_web_validator_{validator}")
        validator_main = namespace.get("main")
        if validator_main is None:
            fail(f"validator has no main: {validator}")
            continue
        result = validator_main()
        if result != 0:
            fail(f"validator failed: {validator}")

    require_text("docs/execution/WEB-NEXT-ACTION.md", "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "Real Browser UI/UX Layout First")
    require_text("docs/execution/WEB-NEXT-ACTION.md", "Base UI/UX Layout")
    require_text("docs/execution/WEB-TASK-LEDGER.md", "| WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220 | WEB-FE | WEB_CLOSED |")
    return finish("WEB CURRENT STATE")

if __name__ == "__main__":
    sys.exit(main())

# v1.27 historical standalone validator marker: validate_web_shared_app_shell_v127.py
# v1.28 validator: validate_web_shared_page_patterns_v128.py
# v1.29 validator: validate_web_shared_form_controls_v129.py
# v1.30 validator: validate_web_shared_data_display_v130.py
