#!/usr/bin/env bash
set -euo pipefail
KIT_ROOT="${LGO_WEB_RUNTIME_KIT_ROOT:-/mnt/data/lgo-web-runtime-kit}"
REPO_ROOT="${1:-$PWD}"
test -f "$KIT_ROOT/env.sh"
test -f "$KIT_ROOT/install-into-repo.sh"
export LGO_WEB_RUNTIME_KIT_ROOT="$KIT_ROOT"
source "$KIT_ROOT/env.sh"
export NEXT_TELEMETRY_DISABLED=1
cd "$REPO_ROOT"
test -f package.json
hash -r
node --version
pnpm --version
python3 -m py_compile tools/*.py
python3 tools/validate_web_current_state.py
if [ -f "$KIT_ROOT/workspace/pnpm-lock.yaml" ]; then
  cp -a "$KIT_ROOT/workspace/pnpm-lock.yaml" "$REPO_ROOT/pnpm-lock.yaml"
fi
pnpm install --offline --ignore-scripts --frozen-lockfile=false --prefer-offline --store-dir "$KIT_ROOT/cache/pnpm-store" --reporter=append-only
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
