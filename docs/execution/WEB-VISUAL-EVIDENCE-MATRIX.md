# WEB-VISUAL-EVIDENCE-MATRIX

| Surface | Desktop source | Tablet source | Mobile source | Runtime evidence | Status |
|---|---|---|---|---|---|
| Public home | responsive CSS/grid | responsive CSS/grid | responsive CSS/grid | UNVERIFIED_ENVIRONMENT | SOURCE_READY_METRICS_UNVERIFIED |
| Public routes | route source exists | route source exists | route source exists | UNVERIFIED_ENVIRONMENT | SOURCE_READY_BROWSER_UNVERIFIED |
| Content pages | file-backed source | file-backed source | file-backed source | UNVERIFIED_ENVIRONMENT | SOURCE_READY_BROWSER_UNVERIFIED |
| Portal shell | fixture-only source | fixture-only source | fixture-only source | UNVERIFIED_ENVIRONMENT | SOURCE_READY_BROWSER_UNVERIFIED |
| Ops shell | fixture-only source | fixture-only source | fixture-only source | UNVERIFIED_ENVIRONMENT | SOURCE_READY_BROWSER_UNVERIFIED |

Visual/e2e screenshots require Node.js 24 LTS, pnpm 10.15.0 and Playwright Chromium. Use `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh` locally to create a Linux sandbox runtime kit.

| Public roadmap/community | route source exists | responsive CSS/grid | responsive CSS/grid | guarded by v1.5 browser matrix pattern; v1.6 rerun required after package | SOURCE_READY_BROWSER_GUARDED |

| Public news/guide detail pages | detail page source exists | responsive CSS/cards | single-column detail flow | targeted source/build guardrails; full browser matrix not claimed for v1.9 | SOURCE_READY_BROWSER_GUARDED |
