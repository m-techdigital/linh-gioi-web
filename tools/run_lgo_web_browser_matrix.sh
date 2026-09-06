#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$(pwd)}"
cd "$ROOT"

PUBLIC_PORT="${LGO_WEB_PUBLIC_PORT:-3000}"
PORTAL_PORT="${LGO_WEB_PORTAL_PORT:-3001}"
OPS_PORT="${LGO_WEB_OPS_PORT:-3002}"
export LGO_WEB_PUBLIC_BASE_URL="${LGO_WEB_PUBLIC_BASE_URL:-http://127.0.0.1:${PUBLIC_PORT}}"
export LGO_WEB_PORTAL_BASE_URL="${LGO_WEB_PORTAL_BASE_URL:-http://127.0.0.1:${PORTAL_PORT}}"
export LGO_WEB_OPS_BASE_URL="${LGO_WEB_OPS_BASE_URL:-http://127.0.0.1:${OPS_PORT}}"
export LGO_WEB_BASE_URL="${LGO_WEB_BASE_URL:-$LGO_WEB_PUBLIC_BASE_URL}"
export LGO_WEB_SKIP_WEBSERVER=1
export CI=1

LOG_DIR="${LGO_WEB_BROWSER_MATRIX_LOG_DIR:-$ROOT/reports/runtime-browser-matrix-v1.5}"
mkdir -p "$LOG_DIR"
: > "$LOG_DIR/server-pids.txt"

cleanup() {
  if [ -f "$LOG_DIR/server-pids.txt" ]; then
    while read -r pid; do
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || :
      fi
    done < "$LOG_DIR/server-pids.txt"
  fi
}
trap cleanup EXIT

wait_url() {
  local url="$1"
  local label="$2"
  python3 - "$url" "$label" <<'PYWAIT'
import sys, time, urllib.request
url, label = sys.argv[1], sys.argv[2]
deadline = time.time() + 120
last = None
while time.time() < deadline:
    try:
        with urllib.request.urlopen(url, timeout=2) as response:
            if 200 <= response.status < 500:
                print(f"{label} ready: {url} status={response.status}")
                raise SystemExit(0)
    except SystemExit:
        raise
    except Exception as exc:
        last = exc
        time.sleep(1)
print(f"{label} not ready: {url}; last_error={last}", file=sys.stderr)
raise SystemExit(41)
PYWAIT
}

start_server() {
  local app="$1"
  local port="$2"
  local logfile="$LOG_DIR/${app}-server.log"
  pnpm --filter "@lgo-web/${app}" dev --hostname 127.0.0.1 --port "$port" > "$logfile" 2>&1 &
  local pid="$!"
  echo "$pid" >> "$LOG_DIR/server-pids.txt"
}

start_server web "$PUBLIC_PORT"
start_server portal "$PORTAL_PORT"
start_server ops "$OPS_PORT"

wait_url "$LGO_WEB_PUBLIC_BASE_URL" "public web"
wait_url "$LGO_WEB_PORTAL_BASE_URL" "player portal"
wait_url "$LGO_WEB_OPS_BASE_URL" "ops admin"

run_shard() {
  local name="$1"
  shift
  local logfile="$LOG_DIR/${name}.log"
  echo "Running browser matrix shard: $name"
  pnpm exec playwright test "$@" --reporter=list --timeout=15000 2>&1 | tee "$logfile"
}

run_shard public-navigation-desktop tests/e2e/public-navigation.spec.ts --project=chromium-desktop
run_shard public-navigation-mobile tests/e2e/public-navigation.spec.ts --project=chromium-mobile
run_shard matrix-public-desktop tests/e2e/runtime-multi-app.spec.ts -g "public web" --project=chromium-desktop
run_shard matrix-portal-desktop tests/e2e/runtime-multi-app.spec.ts -g "player portal" --project=chromium-desktop
run_shard matrix-ops-desktop tests/e2e/runtime-multi-app.spec.ts -g "ops admin" --project=chromium-desktop
run_shard matrix-public-mobile tests/e2e/runtime-multi-app.spec.ts -g "public web" --project=chromium-mobile
run_shard matrix-portal-mobile tests/e2e/runtime-multi-app.spec.ts -g "player portal" --project=chromium-mobile
run_shard matrix-ops-mobile tests/e2e/runtime-multi-app.spec.ts -g "ops admin" --project=chromium-mobile

echo "LGO_WEB_BROWSER_MATRIX_RESULT PASS"
