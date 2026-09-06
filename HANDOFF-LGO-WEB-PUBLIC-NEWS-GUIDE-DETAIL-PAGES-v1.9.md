# HANDOFF-LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9

Status: SOURCE_READY_WITH_TARGETED_RUNTIME_GUARDRAILS

Final decision: `LGO_WEB_PUBLIC_NEWS_GUIDE_DETAIL_PAGES_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.9`

## Baseline

Input source: `LGO-WEB-public-game-info-depth-v1.8-full-source.zip`

## What changed

- Added richer public article/detail UX for news.
- Added source-owned guide detail routes under `/guides/[slug]`.
- Added typed content detail models for article sections, guide detail steps, download explainers and status explainers.
- Deepened download/status transparency without public build claims.
- Updated public sitemap and execution docs for v1.9.
- Updated validators so historical duplicate slug checks only apply to `contentEntries`, not detail-section references that intentionally reuse content slugs.

## Artifacts

- `LGO-WEB-public-news-guide-detail-pages-v1.9-full-source.zip`
- `LGO-WEB-public-news-guide-detail-pages-v1.9-full-source.zip.sha256`
- `LGO-WEB-public-news-guide-detail-pages-v1.9-delta.zip`
- `LGO-WEB-public-news-guide-detail-pages-v1.9-delta.zip.sha256`
- `LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-REPORT-v1.9.md`
- `HANDOFF-LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9.md`
- `LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9-CHANGED-FILES.txt`
- `LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-v1.9-DELETIONS.txt`
- `LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-RUNTIME-EVIDENCE-v1.9.log`
- `LGO-WEB-PUBLIC-NEWS-GUIDE-DETAIL-PAGES-ARTIFACTS-v1.9.sha256`

## Commands executed

```bash
python3 -m py_compile tools/*.py
python3 tools/validate_web_public_news_guide_detail_pages.py
python3 tools/validate_web_current_state.py
source /mnt/data/lgo-web-runtime-kit-v13/env.sh
pnpm install --offline --ignore-scripts
pnpm lint
pnpm --filter @lgo-web/content test
pnpm --filter @lgo-web/content typecheck
pnpm --filter @lgo-web/ui typecheck
pnpm --filter @lgo-web/web typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build
```

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.
- No public game download artifact.
- No full v1.9 browser matrix PASS claim.

## Next allowed step

`WEB-PUBLIC-STATUS-DOWNLOAD-TRUST-POLISH-v1.10` — continue building public web/product trust: release readiness wording, download checksum/provenance explanation, status taxonomy and support expectation clarity. Runtime/browser/e2e remains a regression guard only.
