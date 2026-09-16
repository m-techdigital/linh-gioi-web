# WEB-FE-HOMEPAGE-FINAL-DETAILS-v1.265-r5

Status: WEB_VISUAL_REVIEW_REQUIRED. Same parent task WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265, route `/`. This revision does not advance to /game or resume the deferred news queue.

Baseline: 5e578be72fc5488ca22aedfdde26fa98d5e37947. Branch main and the same Web worktree. No checkout/reset/restore.

## Browser-visible refinement

The immersive header now includes the cyan circular sigil immediately before the existing brush wordmark, matching the original homepage target hierarchy while preserving one accessible brand link. The sigil is a 42×42 source-derived decorative image; the wordmark and accessible label remain unchanged.

The hero now renders the target motto “KIẾP NÀY, THẾ GIỚI RỘNG LỚN HƠN BẠN NGHĨ” as live text with decorative separator rules. It is not baked into the panorama. Mobile keeps the motto at 12px minimum and retains the existing explanatory copy below it.

The large Khám phá card now has a decorative cyan compass/portal focal mark. It is aria-hidden, pointer-events none and does not create a video, trailer, button or second interactive target. The underlying /game anchor remains the only action. This deliberately echoes the target's circular focal rhythm without copying its unsupported play/trailer claim.

All r4 areas remain intact: original brush hero/logo, native desktop/mobile scene, three framed primary actions, three feature cards, distinct Khám phá/Bản tin imagery, compact truthful footer and “Bản public chưa mở” status. No fake login, game download, online population, platform availability or stable-server claim was added.

## Base ownership and TDD

MediaMosaic gained an optional `leadAdornment` input. A RED component test proved the first implementation wrapped the lead even without an adornment; the shared owner was corrected so its default DOM is byte-structure compatible and the wrapper exists only when the caller supplies an adornment. The homepage is currently the only app consumer of MediaMosaic.

R5 RED covered the missing header sigil, live hero motto and discovery focal. Subsequent browser failures were classified before changes: old wordmark selector ambiguity after adding the sigil; focal queried inside the anchor though it is a safe sibling overlay; mobile motto at 11px (real UI defect, fixed to 12px); and the old total-brand-width cap that ignored the intentional sigil. Tests were updated to measure the wordmark and combined brand separately, not relaxed to arbitrary values.

## Sigil provenance

header-sigil.png is an exact 42×42 integer crop from homepage-detailed-design-target-v1118.png with only alpha-keying applied. Extraction uses `sharp.raw()` so RGB bytes are preserved. The active validator compares all opaque pixels through the same raw decoder: 533 opaque pixels, zero RGB mismatch, negative one-pixel corruption rejected. Earlier browser-canvas extraction attempts produced two decoder/profile mismatches and are retained only in local evidence; no threshold was weakened.

## Verification

Final selected production browser suite: 150/150 PASS in 9 files, zero failed/skipped/flaky. It contains the homepage r1-r5 coverage plus unchanged News, guide, safety/support and navigation flows. Focused r5 suite is 28/28 PASS. Production build generated 63 static pages.

Sixteen comparisons on eight unchanged Web routes across desktop/mobile match the immutable r4 baselines in main DOM, header DOM, measured geometry and document height. These are regression checks, not design acceptance of those routes. Final tested runtime input set: 331 files, hash-stable after browser verification.

Final production screenshots at 1440/768/390/320 have no horizontal overflow or page JavaScript errors. Desktop/mobile images were reviewed directly. Existing accessibility tests cover keyboard, forced colors, text spacing and scoped axe; this is not physical-device/screen-reader testing or WCAG certification.

Component/tool gates: marketing navigation (including default-DOM compatibility), action links, route-state tooling, UI/Web typecheck/lint and the active homepage source validator PASS. Portal/Ops source is unchanged; final typechecks are run before commit.

## Runtime note

At the final r5 gate, `process.ensure` returned CREATE_REQUIRED with no existing process and explicitly did not start anything. Dynamic verification therefore used a command-scoped Next preview on the already-owned 3236 claim and terminated it after the command. No new port, Manager configuration change or persistent background process was introduced.

## Remaining review

The registered design regions are now represented with truthful live semantics. Deliberate differences remain where the design claims unsupported product state (login/download/platform/live-server/player count) or where the source is only a flattened raster target. Keep WEB_VISUAL_REVIEW_REQUIRED until owner acceptance. If accepted, /game is the next main-page review; otherwise continue only `/`.

No independent backend, production auth, DB persistence, CMS, fake game availability or Internet deployment.
