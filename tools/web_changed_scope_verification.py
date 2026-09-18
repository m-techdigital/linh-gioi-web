#!/usr/bin/env python3
from __future__ import annotations

import argparse
import fnmatch
import json
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "tools" / "web_verification_ownership_v1.json"


class VerificationConfigError(RuntimeError):
    pass


def load_manifest(path: Path) -> Dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if data.get("schema_version") != 1:
        raise VerificationConfigError("unsupported verification manifest schema")
    modes = data.get("modes")
    if modes != ["changed", "focused", "integration", "release"]:
        raise VerificationConfigError("verification manifest modes are invalid")
    checks = data.get("checks")
    owners = data.get("owners")
    if not isinstance(checks, dict) or not checks:
        raise VerificationConfigError("verification manifest has no checks")
    if not isinstance(owners, list) or not owners:
        raise VerificationConfigError("verification manifest has no owners")
    for check_id, check in checks.items():
        command = check.get("command")
        if not isinstance(command, list) or not command or not all(isinstance(x, str) and x for x in command):
            raise VerificationConfigError(f"invalid command for check: {check_id}")

    referenced: List[str] = []
    referenced.extend(data.get("always_checks", []))
    referenced.extend(data.get("release_checks", []))
    for values in data.get("unknown_checks", {}).values():
        referenced.extend(values)
    owner_ids: List[str] = []
    for owner in owners:
        owner_id = owner.get("id")
        if not isinstance(owner_id, str) or not owner_id or owner_id in owner_ids:
            raise VerificationConfigError("verification manifest owner ids are missing or duplicated")
        owner_ids.append(owner_id)
        patterns = owner.get("patterns")
        if not isinstance(patterns, list) or not patterns:
            raise VerificationConfigError(f"verification owner has no patterns: {owner_id}")
        for mode in modes:
            referenced.extend(owner.get("checks", {}).get(mode, []))
    missing = sorted({check_id for check_id in referenced if check_id not in checks})
    if missing:
        raise VerificationConfigError("manifest references unknown checks: " + ", ".join(missing))
    return data


def normalize_path(path: str) -> str:
    return path.replace("\\", "/").lstrip("./")


def _matches(path: str, patterns: Iterable[str]) -> bool:
    return any(fnmatch.fnmatch(path, pattern) for pattern in patterns)


def _append_unique(target: List[str], values: Iterable[str]) -> None:
    seen = set(target)
    for value in values:
        if value not in seen:
            target.append(value)
            seen.add(value)


def build_plan(
    manifest: Dict[str, Any],
    paths: Iterable[str],
    mode: str,
    source: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    if mode not in manifest["modes"]:
        raise VerificationConfigError(f"unsupported verification mode: {mode}")

    normalized_paths: List[str] = []
    _append_unique(normalized_paths, [normalize_path(p) for p in paths if normalize_path(p)])

    matched_owner_ids: List[str] = []
    path_owners: Dict[str, List[str]] = {}
    unknown_paths: List[str] = []

    for path in normalized_paths:
        owners_for_path: List[str] = []
        for owner in manifest["owners"]:
            if _matches(path, owner.get("patterns", [])):
                owners_for_path.append(owner["id"])
                if owner["id"] not in matched_owner_ids:
                    matched_owner_ids.append(owner["id"])
        path_owners[path] = owners_for_path
        if not owners_for_path:
            unknown_paths.append(path)

    check_ids: List[str] = []
    _append_unique(check_ids, manifest.get("always_checks", []))

    owner_by_id = {owner["id"]: owner for owner in manifest["owners"]}
    for owner_id in matched_owner_ids:
        owner = owner_by_id[owner_id]
        mode_checks = owner.get("checks", {}).get(mode, [])
        _append_unique(check_ids, mode_checks)

    if unknown_paths:
        _append_unique(check_ids, manifest.get("unknown_checks", {}).get(mode, []))

    if mode == "release":
        _append_unique(check_ids, manifest.get("release_checks", []))

    unknown_check_ids = [check_id for check_id in check_ids if check_id not in manifest["checks"]]
    if unknown_check_ids:
        raise VerificationConfigError(
            "manifest references unknown checks: " + ", ".join(unknown_check_ids)
        )

    return {
        "schema_version": 1,
        "mode": mode,
        "source": source or {"kind": "unspecified"},
        "paths": normalized_paths,
        "path_owners": path_owners,
        "owners": matched_owner_ids,
        "unknown_paths": unknown_paths,
        "broadened": bool(unknown_paths),
        "check_ids": check_ids,
        "checks": [
            {
                "id": check_id,
                "command": manifest["checks"][check_id]["command"],
                "cost": manifest["checks"][check_id].get("cost", "unknown"),
                **(
                    {"note": manifest["checks"][check_id]["note"]}
                    if manifest["checks"][check_id].get("note")
                    else {}
                ),
            }
            for check_id in check_ids
        ],
    }


def _git(args: List[str]) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return result.stdout.strip()


def _working_tree_paths() -> List[str]:
    paths: List[str] = []

    for args in (
        ["diff", "--name-only"],
        ["diff", "--cached", "--name-only"],
        ["ls-files", "--others", "--exclude-standard"],
    ):
        output = _git(args)
        if output:
            _append_unique(paths, [normalize_path(line) for line in output.splitlines() if line.strip()])
    return paths


def resolve_paths(explicit_paths: List[str], changed_from: Optional[str]) -> tuple[List[str], Dict[str, Any]]:
    head = _git(["rev-parse", "HEAD"])

    if explicit_paths:
        paths = []
        _append_unique(paths, [normalize_path(p) for p in explicit_paths])
        return paths, {
            "kind": "explicit",
            "head": head,
            "path_count": len(paths),
        }

    if changed_from:
        committed = _git(["diff", "--name-only", f"{changed_from}...HEAD"])
        paths: List[str] = []
        if committed:
            _append_unique(paths, [normalize_path(line) for line in committed.splitlines() if line.strip()])
        _append_unique(paths, _working_tree_paths())
        return paths, {
            "kind": "git-diff",
            "ref": changed_from,
            "head": head,
            "path_count": len(paths),
        }

    paths = _working_tree_paths()
    return paths, {
        "kind": "working-tree",
        "head": head,
        "path_count": len(paths),
    }


def _write_report(path: Path, payload: Dict[str, Any]) -> None:
    if not path.is_absolute():
        path = ROOT / path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def execute_plan(plan: Dict[str, Any], manifest: Dict[str, Any]) -> tuple[int, List[Dict[str, Any]]]:
    results: List[Dict[str, Any]] = []

    for check_id in plan["check_ids"]:
        check = manifest["checks"][check_id]
        command = check["command"]
        print(f"\n== {check_id} [{check.get('cost', 'unknown')}] ==")
        print("$ " + " ".join(command))
        started = time.perf_counter()
        return_code = subprocess.run(command, cwd=ROOT).returncode
        duration_ms = round((time.perf_counter() - started) * 1000, 2)
        row = {
            "id": check_id,
            "command": command,
            "cost": check.get("cost", "unknown"),
            "return_code": return_code,
            "duration_ms": duration_ms,
        }
        results.append(row)
        print(f"== {check_id} rc={return_code} duration_ms={duration_ms:.2f} ==")
        if return_code != 0:
            return return_code, results

    return 0, results


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run compact changed-scope verification for LGO Web/Admin."
    )
    parser.add_argument(
        "--manifest",
        type=Path,
        default=DEFAULT_MANIFEST,
        help="Verification ownership manifest.",
    )
    parser.add_argument(
        "--mode",
        choices=("changed", "focused", "integration", "release"),
        default="focused",
    )
    parser.add_argument(
        "--path",
        action="append",
        default=[],
        help="Explicit changed path. Repeat for multiple paths.",
    )
    parser.add_argument(
        "--changed-from",
        help="Include committed changes from REF...HEAD plus current working-tree changes.",
    )
    parser.add_argument(
        "--plan",
        action="store_true",
        help="Print the deduplicated verification plan without running checks.",
    )
    parser.add_argument(
        "--report",
        type=Path,
        help="Write plan/result provenance JSON to this path.",
    )
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)

    try:
        manifest_path = args.manifest
        if not manifest_path.is_absolute():
            manifest_path = ROOT / manifest_path
        manifest = load_manifest(manifest_path)
        paths, source = resolve_paths(args.path, args.changed_from)
        plan = build_plan(manifest, paths, args.mode, source=source)
    except (VerificationConfigError, subprocess.CalledProcessError, OSError, json.JSONDecodeError) as exc:
        print(f"WEB CHANGED-SCOPE VERIFICATION CONFIG FAIL: {exc}", file=sys.stderr)
        return 2

    print(json.dumps(plan, indent=2, ensure_ascii=False))

    started_at = datetime.now(timezone.utc).isoformat()
    if args.plan:
        payload = {
            "plan": plan,
            "execution": {
                "executed": False,
                "started_at": started_at,
                "finished_at": started_at,
                "results": [],
            },
        }
        if args.report:
            _write_report(args.report, payload)
        return 0

    rc, results = execute_plan(plan, manifest)
    finished_at = datetime.now(timezone.utc).isoformat()
    payload = {
        "plan": plan,
        "execution": {
            "executed": True,
            "started_at": started_at,
            "finished_at": finished_at,
            "return_code": rc,
            "results": results,
        },
    }
    if args.report:
        _write_report(args.report, payload)

    if rc == 0:
        print("\nWEB CHANGED-SCOPE VERIFICATION PASS")
    else:
        print(f"\nWEB CHANGED-SCOPE VERIFICATION FAIL rc={rc}")
    return rc


if __name__ == "__main__":
    raise SystemExit(main())
