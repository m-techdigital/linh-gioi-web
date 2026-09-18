# LGO PWEB-VIS-01 — Real-data-ready Portal Visual Prototype Report v1

Date: 2026-09-18
Task: `T-873cf023757c — LGO-PWEB-VIS-01 — Real-data-ready Portal visual prototype`
Base source: `e8cbf09af61fd0daf91c8a726cecf15f333415b9`
Status: SOURCE + BROWSER + VISUAL REVIEW READY FOR CLOSURE

## 1. Goal

Move the fixture-only Player Portal toward the approved real-data product design without opening backend integration.

The task is intentionally visual/information-architecture only:
- keep provisional/no-contract boundaries explicit;
- preserve GET/HEAD-only behavior;
- use current shared tokens/primitives;
- prioritize future-real-capable account/character information;
- remove unsupported fixture fields from primary hierarchy;
- produce real desktop/tablet/mobile browser evidence;
- do not invent backend data or mutation.

## 2. BEFORE evidence

Ignored runtime evidence:
- `handoff/pweb-vis-01/before/contact-sheet.jpg`
- `handoff/pweb-vis-01/before/metrics.json`
- 12 route/profile captures:
  - routes: login, home, account, characters;
  - desktop: 1440×1000;
  - tablet: 1024×768;
  - mobile web: 390×844.

BEFORE findings:
- generic fixture/boundary presentation occupied too much visual authority;
- login placed access/world context ahead of the main account task;
- home centered development art + fixture metrics rather than account/character journey;
- account treated email/security/session fixture fields as primary account data;
- character roster used enterprise-style table columns for level/state/lastPlayed despite no current backend authority;
- mobile roster/table presentation was less aligned with the three-slot character product model.

All BEFORE captures were verified at the exact requested viewport; no page-level horizontal overflow was present.

## 3. Implementation

### Login
- task/auth card now precedes world/access journey;
- shared FormField/TextInput/CheckboxField/BlockedActionButton/LinkButton remain owners;
- real contract boundary remains explicit;
- controls stay aria-disabled and non-operational;
- register/recovery are visible secondary routes.

### Portal home
- account identity + character journey now precede decorative game-art panels;
- generic fixture metric block was removed from primary hierarchy;
- character/account/journey actions are organized as actual companion-player jobs;
- game art remains available as secondary world context;
- secondary art changed from eager to lazy loading after it moved below primary content.

### Account
Primary hierarchy now contains only fields with a clear future contract path:
- display name;
- public account ID;
- character count derived from roster context.

Email verification, security posture and durable session data remain capability boundaries rather than fake account facts.

### Character roster
- roster now models exactly three slots;
- two current fixture characters + explicit empty slot;
- no level/state/lastPlayed in the primary roster;
- no create-character CTA because Player Web character creation is not an accepted product contract;
- desktop/tablet use three columns;
- mobile uses an internal horizontal slot rail with scroll-snap instead of vertically stacking three large cards.

### Character detail
Initial detail hierarchy contains only:
- name;
- Path/class identity;
- slot.

Current location, progression and equipment are separate capability boundaries.
No character/map mutation was opened.

## 4. Shared-base / responsive ownership

No new UI kit was introduced.

Reused shared owners:
- WorkspaceAppShell / WorkspacePage / ProvisionalFeatureShell;
- DataList / KeyValueGrid;
- shared buttons/status/form controls;
- shared design tokens.

Portal-specific composition lives only in `apps/portal/src/app/globals.css`.

The existing workspace style-boundary checker remains GREEN:
- no route-local shared-token redefinition;
- no shared-selector override;
- no new unowned breakpoint;
- no page-level overflow hiding;
- no fixed-width rescue pattern.

Mobile character density was solved by a composition variant (horizontal rail), not by shrinking typography/touch targets.

## 5. Historical validator migration

The visual/product hierarchy intentionally superseded several old implementation-detail assertions.

Migrated current-state validators keep their original purpose while no longer forcing obsolete fixture presentation:
- monorepo foundation: contract tokens instead of old English sentence literals;
- shared page/form validators: shared primitive + machine boundary ownership;
- shared data display: shared table primitives remain canonical; Ops still uses them, Portal roster may use product-specific cards;
- Portal account/character depth: checks current real-data-ready hierarchy rather than requiring MetricGrid/DataTable everywhere;
- blocked-action keyboard: keeps BlockedActionButton + machine contract boundary;
- v1.51/v1.62: historical eager-LCP docs remain provenance, while current route/test authority now verifies secondary lazy art after primary account/character content.

No validator was simply disabled or removed from active authority.

## 6. Browser verification

Focused final browser regression:
- PWEB visual prototype v1.41 extension:
  - desktop PASS;
  - mobile PASS.
- Portal access:
  - desktop/mobile 8/8 PASS.
- Portal home secondary world image v1.51:
  - desktop/mobile 2/2 PASS.
- Portal home secondary visual panels v1.62:
  - desktop/mobile 2/2 PASS.

Additional regressions run during implementation and PASS:
- shared fixture auth controls: 2/2;
- Portal journey demo: 4/4;
- Portal expanded-route readability subset: 4/4.

Behavioral assertions include:
- no non-GET/HEAD requests;
- login main task precedes world context;
- home account/character journey precedes decorative art;
- account does not present unsupported fixture data as real;
- character roster has exactly three slots;
- unsupported level/state/lastPlayed strings are absent;
- mobile roster scrolls inside its owned rail without page overflow;
- desktop/tablet roster fits the three-column composition.

## 7. AFTER visual evidence

Ignored runtime evidence:
- `handoff/pweb-vis-01/after/contact-sheet.jpg`
- `handoff/pweb-vis-01/after/metrics.json`
- 12 final route/profile screenshots.

Final hierarchy metrics:
- login task precedes journey:
  - desktop: 510 < 1224;
  - tablet: 520 < 1177;
  - mobile: 803 < 1824.
- home primary overview precedes art:
  - desktop: 570 < 1239;
  - tablet: 556 < 1195;
  - mobile: 991 < 2371.
- roster items: 3 on all profiles.
- mobile character rail:
  - client width 324;
  - scroll width 829;
  - page width remains 390 with no page overflow.
- desktop roster: 1130 / 1130, fits.
- tablet roster: 949 / 949, fits.

Mobile character page height:
- BEFORE: 2213px;
- AFTER final rail: 2192px.

The first card-stack AFTER draft was visually rejected because it made mobile roster excessively tall. It was replaced by the horizontal composition variant before closure.

## 8. Manual visual review

The final BEFORE/AFTER contact sheets and final mobile character frame were reviewed by eye.

Accepted visual findings:
- login task hierarchy is materially clearer;
- account/character journey now dominates Portal home before decoration;
- account page no longer implies unsupported email/security/session facts are canonical;
- roster reads as a game character experience rather than an admin data table;
- three-slot identity is visible on desktop/tablet/mobile;
- mobile rail preserves readable type/touch scale instead of shrinking cards;
- contract boundary remains visible without becoming the product’s main content.

No claim is made that these fixture screens are final production art or real-data integration.

## 9. Source verification

Focused source/runtime gates:
- Portal typecheck: PASS.
- Portal lint: PASS.
- `git diff --check`: PASS.
- workspace style boundary: PASS.
- shared-base validator: PASS.
- portal-shell semantics: PASS.

Clean source candidate verification:
- changed-scope ownership: Portal + browser-tests + tooling, no unknown paths;
- changed-scope checks: PASS;
- migrated historical validators: PASS;
- active validators remain 169;
- full `WEB CURRENT STATE VALIDATION PASS`.

Live-worktree generated/cache files were deliberately excluded from source evidence.
In particular, `apps/portal/next-env.d.ts` is dev-server generated noise and is not part of this task’s commit.

## 10. Non-claims

This task does NOT claim:
- accepted backend/OpenAPI contract;
- production auth/session;
- DB persistence;
- real character creation;
- real progression/inventory/support;
- character or map mutation from Web;
- production Portal release readiness.

Existing PWEB-01 cross-sandbox ASK `MM-a610edff1357` remains separate and may refine later real integration semantics without blocking this visual/IA prototype.

## 11. Closure verdict

PWEB-VIS-01 is ready to close when the exact intended source plus this report are committed/pushed and the compact evidence bundle is registered.

The implementation improves actual browser hierarchy while preserving the fixture/no-contract safety boundary and keeping the path open for real AccountResponse / CharacterResponse integration later.
