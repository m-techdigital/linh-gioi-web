# LGO-WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-REPORT-v1.64

Status: WEB_CLOSED

`WEB-FE-PUBLIC-STORY-CHAPTER-TYPOGRAPHY-v1.64` reduces the oversized mobile decorative numbers in the public `/story` `NarrativeChapterGrid`. Browser audit found the chapter numbers rendering at 60.8px on Pixel 7; the mobile cap now renders them at `2.75rem` and keeps them below 48px.

Evidence:

- RED browser/e2e reproduced oversized `/story` chapter number `01` at 60.8px.
- GREEN browser/e2e passed with all three chapter numbers <= 48px, no horizontal overflow and subordinate scale to headings.
- Source validator PASS.
- Web typecheck PASS.
- Web production build PASS.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT. Browser keyboard/layout audit evidence remains part of the v1.64 closure.
