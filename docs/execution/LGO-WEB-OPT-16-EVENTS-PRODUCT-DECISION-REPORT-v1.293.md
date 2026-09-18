# LGO-WEB OPT-16 Events Product Decision Report v1.293

Status: WEB_CLOSED
Source delivery: 816421209a8bd9f5d5d92d2e10902375b763aef4
Authority: LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md

## Product decision

/events remains an Archive surface with noindex intent. The only published event record is the existing provisional fixture spirit-festival-event-placeholder; its own copy says there is no live schedule, registration, reward or accepted event backend. v1.293 therefore does not promote the route to current/live event discovery and does not fabricate a replacement event.

The player-facing state now says **Chưa có sự kiện live đang mở** and **0 sự kiện live được xác nhận**. The provisional fixture remains reachable in a collapsed **Kho chủ đề minh họa**, preserving historical/source access without presenting it as current product activity.

## Runtime improvement

Exact v1.292 baseline: desktop 1,420px, mobile 2,410px. Final: desktop 1,386px (-2.39%) and mobile 2,200px (-8.71%), with zero page-level horizontal overflow.

The current-state section shrinks desktop 443px → 267px (-39.73%) and mobile 692px → 421px (-39.16%). Mobile hero height falls 809px → 746px (-7.79%). The primary section contains zero live AnnouncementBoard instances; the single fixture remains inside a collapsed 83px mobile / 91px desktop archive.
## Browser and compatibility evidence

Fresh production-static BEFORE/RED on the verified v1.292 artifact produced 4/8 PASS and four expected failures: the fixture was still rendered as the primary announcement and no fixture archive existed.

Final browser verification is **24/24 PASS**: v1.293 focused is 8/8 desktop/mobile, and the complete v1.251 events regression is 16/16 PASS when run as independent desktop 8/8 and mobile 8/8 suites. This preserves exact fixture title/summary/body/date semantics, fragment focus, route navigation, 320px touch/readability, forced-colors focus and axe A/AA/2.1AA.

The historical v1.251 test harness was compatibility-migrated to the production-static interceptor because the old dev listener is not a reliable runtime authority. The v1.85 source guard was migrated from the superseded heading text Chủ đề đang được giới thiệu to the source-supported product heading Chưa có sự kiện live đang mở.

## Closure verification

Exact production build: 63/63 routes. Content tests: 20/20. Content/UI/Web typecheck and Web lint PASS. v1.293/v1.251/v1.281/v1.282/v1.85 source guards and git diff --check PASS. Clean 2,024-file WEB CURRENT STATE candidate PASS.

Public IA and metadata require no policy change: /events already remains archive / archive / noindex / archive. No registration, countdown, reward, account, CMS, live schedule, event backend, DB persistence or production deployment is introduced.

## Next

Continue with WEB-OPT-17-PATCH-NOTES-PRODUCT-BOUNDARY-v1.294 on /patch-notes only. Separate player/game/public release-note meaning from browser/runtime engineering history without fabricating a game release.
