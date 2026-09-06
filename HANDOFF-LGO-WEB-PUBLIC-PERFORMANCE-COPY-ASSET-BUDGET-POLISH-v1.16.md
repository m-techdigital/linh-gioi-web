# HANDOFF-LGO-WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16

Final decision: LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.16

## Baseline

Input baseline: LGO-WEB-public-accessibility-readability-polish-v1.15-full-source.zip

## Output

- LGO-WEB-public-performance-copy-asset-budget-polish-v1.16-full-source.zip
- LGO-WEB-public-performance-copy-asset-budget-polish-v1.16-delta.zip
- SHA256 sidecars
- changed/deletions lists
- runtime evidence log
- artifact summary SHA256

## What changed

WEB v1.16 adds a public `/performance` hub and supporting source-owned content so the website explains performance as product clarity:

- copy weight;
- CSS-only visual asset budget;
- static route composition;
- perceived-load clarity;
- mobile reading density;
- explicit non-claims around Core Web Vitals, Lighthouse, RUM, CDN and image pipeline.

## Apply full source

```bash
WEB_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-performance-copy-asset-budget-polish-v1.16-full-source.zip"
WEB_SHA="/Users/minhdc/Downloads/LGO-WEB-public-performance-copy-asset-budget-polish-v1.16-full-source.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$WEB_SHA"

rm -rf /Users/minhdc/Projects/LinhGioiOnline-Web
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip -o "$WEB_ZIP"

python3 -m py_compile tools/*.py
python3 tools/validate_web_current_state.py
pnpm install
pnpm lint
pnpm --filter @lgo-web/content test
pnpm --filter @lgo-web/content typecheck
pnpm --filter @lgo-web/ui typecheck
pnpm --filter @lgo-web/web typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build
```

## Non-claims

No production auth, DB persistence, real portal integration, real ops/admin mutation, independent backend, CMS, production deployment, payment/shop/economy, live community backend, live support ticket, public game download artifact, Core Web Vitals measured PASS, Lighthouse certification, production RUM monitoring, CDN deployment, image CDN integration or approved production art pipeline is claimed.

## Next recommended task

WEB-PUBLIC-ROUTE-CONTINUITY-CONVERSION-POLISH-v1.17
