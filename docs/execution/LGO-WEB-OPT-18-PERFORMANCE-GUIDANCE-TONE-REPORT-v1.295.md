# LGO-WEB OPT-18 Performance Guidance Tone Report v1.295

Status: WEB_CLOSED
Source delivery: 1524fbc299c7e43403ac1bbc380224c7299c4b6d
Authority: LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md

## Outcome

/performance now leads with player-readable guidance instead of engineering-dashboard language. The H1 is “Đọc nhẹ và rõ trên thiết bị của bạn”, the local ReadingPreview remains the main interactive practice, and the old three-cell Core Web Vitals / Lighthouse / CDN dashboard is replaced by one concise non-measurement boundary.

The four useful reading routes remain unchanged, but their repeated “Ghi chú trong source” disclosures are removed. Technical non-claims remain consolidated in the measurement boundary and the final collapsed mobile-reading notes; no performance score, monitoring result or certification is introduced.

## Runtime improvement

Exact v1.294 baseline: desktop 2,412px, mobile 4,428px. Final: desktop 2,367px (-1.87%) and mobile 3,966px (-10.43%), with zero page-level horizontal overflow.

Mobile hero height falls 749px → 680px (-9.21%), measurement block 548px → 373px (-31.93%), and route block 1,271px → 1,053px (-17.15%). Repeated proof density changes from hero note 1 → 0, measurement cells 3 → 1, and route proof disclosures 4 → 0.
## Browser and compatibility evidence

Fresh production-static BEFORE/RED on verified v1.294 produced 4/8 PASS and four expected failures around the engineering H1 and three-cell dashboard. Workshop behavior and route/non-claim safety already passed on baseline.

Final browser verification is **20/20 PASS**: v1.295 focused 8/8 desktop/mobile plus the complete v1.229 performance regression as desktop 6/6 and mobile 6/6. The historical v1.229 harness was migrated to the production-static interceptor; its optional-image request assertion remains active and was fixed so the request-counting page route fulfills the exact build WebP in static mode instead of bypassing the interceptor.

Historical v1.89 heading-priority validation now tracks the source-supported H1 while preserving Core Web Vitals / Lighthouse / CDN / benchmark non-claim markers.

## Closure verification

Exact production build: 63/63 routes. Content tests: 20/20. Content/UI/Web typecheck and Web lint PASS. v1.295/v1.229/v1.89/v1.85/v1.281/v1.282 source guards and git diff --check PASS. Clean 2,030-file WEB CURRENT STATE candidate PASS.

No RUM, telemetry, Lighthouse score, Core Web Vitals pass, FPS, CDN certification, device benchmark, persisted reading preference, production auth, DB persistence or production deployment is introduced.

## Next

Continue with WEB-OPT-19-ACCESSIBILITY-PLAYER-HELP-v1.296 on /accessibility only. Preserve native keyboard/readability practice and truthful limits while presenting the page as player help rather than compliance tooling; do not invent WCAG certification, legal compliance or persisted preferences.
