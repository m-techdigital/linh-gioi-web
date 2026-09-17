# LGO-WEB OPT-01 CSS Ownership & Payload Reset Report v1.278

Status: WEB_CLOSED
Source delivery: `89c391b5a240544ab6c8bac0eb3b9bdef91c84f5`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

WEB-OPT-01 removed the historical global `service-layout.css` dependency without redesigning the public site. Legacy service/editorial routes now own the service stylesheet explicitly; accepted modern landing routes keep their dedicated layout owners.

`packages/ui/src/service-layout.css` was reduced from 134,302 bytes to 50,816 bytes by removing superseded `/game` through `/release` layout sections already replaced by accepted landing CSS. `apps/web/src/app/globals.css` removed six proven-dead design-board blocks with no production source consumer.

The public route set, player-facing content and non-claims were not changed.

## Payload evidence

Fresh BEFORE on the existing production baseline: 59 routes, median decoded CSS 245,523 B, P75 248,469 B, max 251,481 B, horizontal overflow 0.

Final exact clean production build: median 171,998 B, P75 174,944 B, max 177,956 B. Median reduction is 73,525 B / 29.95%, exceeding the accepted >=20% target of <=196,418 B.

The first structural pass met the budget, so the optional active-service family split was deliberately not performed.## Regression evidence

The new v1.278 source validator was observed RED before product edits: root global ownership, 16 missing route owners, superseded modern sections, service-layout size and six dead design-board selectors all failed as intended. After the minimal ownership/prune implementation it passes.

The browser budget guard was also observed RED against the previous production source at 245,523 B median versus the 196,418 B limit. Final exact-build browser execution passes 4/4 across Chromium desktop/mobile: all 59 sitemap routes remain overflow-free and the representative modern/legacy families retain public chrome and primary headings.

A full layout fingerprint compared 59 routes × 2 viewports. 109/118 matched immediately; nine initial mismatches were loading-shell races with zero measured elements on one side. Fresh-page rerun of those nine matched 9/9. Twelve representative full-page BEFORE/AFTER screenshots were pixel-identical (0 differing pixels).

## Source and build gates

- `@lgo-web/ui` typecheck: PASS.
- `@lgo-web/web` typecheck: PASS.
- Web lint: PASS.
- Final clean production build: 63 static/SSG pages generated.
- `validate_web_opt_public_css_ownership_v1278.py`: PASS.
- Clean-source `validate_web_current_state.py`: PASS with v1.278 registered as active authority.
- `git diff --check`: PASS before source delivery.

No page copy, IA, route behavior, backend contract or visual composition was intentionally changed. No optional second-stage service-family split was needed because the first pass already exceeded the payload target.
