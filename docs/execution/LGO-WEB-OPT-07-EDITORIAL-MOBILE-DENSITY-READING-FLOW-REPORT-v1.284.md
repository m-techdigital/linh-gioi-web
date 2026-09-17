# LGO-WEB OPT-07 Editorial Mobile Density & Reading Flow Report v1.284

Status: WEB_CLOSED
Source delivery: `e105aa7f874730ac6c82e8c49c37499a44dd806a`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

The 33 News/Guide detail routes now use a shorter shared mobile reading rhythm without removing authored copy, truth/safety boundaries, related records or native navigation semantics. The change stays in the shared article/catalog CSS owners: compact hero/cover/TOC/chapter spacing, a two-column mobile contents index, horizontally scrollable chapter actions, and a horizontally scrollable related-reading rail.

No line-clamp or hidden-copy shortcut was introduced. Truth boundaries remain visible inside every chapter; links remain native anchors; related cards remain in the DOM and the rail deliberately exposes the next-card edge as a scroll affordance.

## Measurement

Exact post-v1.283 baseline across all 33 editorial routes: P50 height `4,845px`, P90 `5,089px`, max `5,357px`, first-useful-next-step P90 `2,193px`, horizontal-overflow routes `0`.

Final exact production build: P50 `3,544px` (-26.85%), P90 `4,016px` (-21.08% vs exact v1.283 and -18.32% vs the v1.277 ~4,917px audit baseline), max `4,264px` (-20.40%), first-useful-next-step P90 `1,846px` (-15.82%), horizontal-overflow routes `0`.

## Meaning and interaction preservation

Before/after content comparison is exact for all 33 routes: text 33/33, headings 33/33, links 33/33 and native disclosure count 33/33, with zero mismatches. The focused browser guard also verifies every `.lgo-article-boundary` remains visible, native fragment focus survives navigation, and the contents disclosure remains keyboard-operable.

Four representative mobile before/after pairs were visually reviewed: Control Tower News, FAQ/Search Guide, World Gameplay Loop Guide and Release Readiness Guide. The final layouts are materially shorter while preserving hierarchy, readable chapter copy and explicit scope boundaries.
## Verification

TDD RED was established against the exact v1.283 baseline before shared CSS changes. Final exact-source production evidence: Next.js build 63/63; v1.284 + v1.283 browser matrix 10/10 desktop/mobile; v1.279 mobile interaction guard 2/2; v1.281 + v1.278 mobile regressions 5/5; Content tests 20/20; Content/UI/Web typecheck PASS; Web lint PASS; v1.278–v1.284 source validators PASS; `git diff --check` PASS.

A clean 1,997-file candidate replay (`HEAD v1.283 + exact v1.284 source overlay`) exposed one historical validator assumption: v1.254–v1.264 required the old one-column related-card stack. The v1.254 shared validator now accepts either the historical stack or the explicit v1.284 scroll-rail contract; all 11 article validators remain active and PASS. Clean `WEB CURRENT STATE` then PASSed.

The final production-browser metric artifact is byte-identical to the recorded after artifact: SHA256 `474744742f0fb3ff30f879ad356797be560a50c67aba0861466a49b76f6ef453`.

## Non-claims

No authored article meaning was rewritten. No v1.281 public IA/player-vs-archive policy, v1.282 canonical/indexability metadata, backend contract, CMS, production auth, DB persistence, payment/economy or production deployment was added or changed.
