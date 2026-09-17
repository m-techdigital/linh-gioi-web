# LGO-WEB OPT-08 Support Entry Hierarchy Report v1.285

Status: WEB_CLOSED
Source delivery: `dcbe319887d021b2ab864b2c2222e39ddcb96018`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/support` now has one primary support-entry hierarchy instead of repeating the same four destinations twice. The hero's existing “Trạm hỗ trợ người chơi” remains the canonical quick-path owner for Download Trust, Help, safe feedback preparation and Support Safety. The duplicated four-card topic wall was removed from the route composition, so FAQ guidance now follows the hero immediately.

The change is intentionally route-local. Shared `GuidanceStation`, FAQ, truth-boundary and scope components are unchanged, and `/support/help` plus `/support/safety` source remains untouched.

## Runtime improvement

Exact v1.284 baseline desktop height was `1,751px`; final v1.285 is `1,378px` (-21.30%). Mobile was `3,301px`; final is `2,548px` (-22.81%). FAQ moved from `918px` to `544px` on desktop and from `1,683px` to `1,009px` on mobile.

The final FAQ begins only `32px` after the hero on desktop and `24px` after it on mobile. Horizontal overflow remains zero in both viewports. All four station destinations are unchanged.

## Truth and interaction preservation

The six native FAQ disclosures remain keyboard-operable; the no-ticket paper boundary, sensitive-data warning, status CTA, collapsed support-scope disclosure and `NO_ACCEPTED_BACKEND_CONTRACT` remain present. No form, input, textarea, download action, account lookup, ticket intake, SLA or backend capability was added.

The v1.224 Support layout browser/source guard required the now-superseded duplicated topic wall. v1.285 replaces that layout authority explicitly; the older v1.87 heading-priority guard remains active with only its route-order source marker updated from Hero→Topics to Hero→Answers. Its h1/help/safety/non-claim protections remain intact.

## Verification

TDD RED: the new v1.285 source guard failed on the duplicate topic owner/authority registration and the browser suite failed desktop/mobile because `.lgo-guidance-topics` still existed. GREEN: focused v1.285 browser `4/4`; Phase-A mobile regressions v1.279 + v1.278 + v1.281 `7/7`; v1.285/v1.281/v1.280/v1.279/v1.278 source guards PASS; Support Help/Safety source guards PASS; Web typecheck and lint PASS; exact production build generated 63 pages; clean 2,000-file candidate `WEB CURRENT STATE` PASS; `git diff --check` PASS.

Fresh BEFORE/AFTER desktop/mobile screenshots and runtime geometry are stored under `handoff/web-opt-v1.285/evidence/`.
 Fresh closure also migrated the v1.284 validator from an active-head-only next-action assertion to a preserved-history transition check, so successor tasks do not invalidate an already closed predecessor.

## Non-claims / next

No production auth, DB persistence, live support intake, account recovery, CMS, payment/economy or production deployment is claimed. Next: `WEB-OPT-09-SUPPORT-HELP-DISCOVERY-v1.286` on `/support/help` only; preserve v1.285 Support hierarchy and do not batch Support Safety.
