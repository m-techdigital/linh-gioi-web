# HANDOFF-LGO-WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15

Final decision: `LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.15`

## Baseline

- Input baseline: `LGO-WEB-public-player-safety-support-faq-polish-v1.14-full-source.zip`
- Task: `WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15`
- Product direction: public web accessibility/readability polish; runtime/browser/e2e is guardrail only.

## Key output

- `/accessibility` route now explains heading clarity, route readability, mobile scan rules and focus order.
- Public shell includes a skip-to-main-content link.
- Main route surfaces link back to Accessibility/Readability where it helps new players scan the site.
- Copy remains explicit about boundaries: no formal audit/compliance certification and no settings backend.

## Apply full source

```bash
WEB_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-accessibility-readability-polish-v1.15-full-source.zip"
WEB_SHA="/Users/minhdc/Downloads/LGO-WEB-public-accessibility-readability-polish-v1.15-full-source.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$WEB_SHA"

rm -rf /Users/minhdc/Projects/LinhGioiOnline-Web
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip -o "$WEB_ZIP"

python3 -m py_compile tools/*.py
python3 tools/validate_web_public_accessibility_readability_polish.py
python3 tools/validate_web_current_state.py
```

## Optional runtime guardrails

```bash
corepack enable
corepack prepare pnpm@10.15.0 --activate
pnpm install
pnpm lint
pnpm --filter @lgo-web/content test
pnpm --filter @lgo-web/content typecheck
pnpm --filter @lgo-web/ui typecheck
pnpm --filter @lgo-web/web typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build
```

## Next recommended task

`WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16`

Continue public web product work: copy weight, CSS-only visual asset budget, static route composition, perceived load clarity, mobile reading density and page-level performance hygiene. Do not turn the next task into tooling-only work.

## Final package closure

- Full source ZIP: `LGO-WEB-public-accessibility-readability-polish-v1.15-full-source.zip`
- Delta ZIP: `LGO-WEB-public-accessibility-readability-polish-v1.15-delta.zip`
- Changed files: 37
- Deleted files: 0 (`No deletions.`)
- Post-package full-source validators: PASS
- Delta apply from v1.14 baseline: PASS
- Package hygiene: PASS
