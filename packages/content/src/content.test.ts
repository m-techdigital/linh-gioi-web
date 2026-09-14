import { describe, expect, it } from "vitest";
import {
  contentEntries,
  playerEntryQuestions,
  publicContentHubs,
  publicRouteGroups,
  playerSafetyPrinciples,
  supportIssuePaths,
  closedTestSupportExpectations,
  communityConductRules,
  accessibilityReadabilityPrinciples,
  routeReadabilityChecks,
  mobileScannabilityRules,
  focusOrderCheckpoints,
  performanceCopyBudgetPrinciples,
  staticRouteCompositionRules,
  perceivedLoadSignals,
  mobileDensityBudgets,
  routeContinuityBridges,
  conversionSafeCtas,
  journeyFrictionChecks,
  pageCohesionCheckpoints,
  playerTrustSignals,
  releaseNarrativeStages,
  closedTestReadinessChecks,
  trustJourneyCheckpoints,
  releaseReadinessHubItems,
  ownerReleaseGates,
  testerExpectationCopy,
  releaseSurfaceAlignment,
  closedTesterChecklist,
  safeFeedbackTemplates,
  knownLimitationNotes,
  deviceReportTemplateFields,
  faqDiscoveryGroups,
  faqHelpfulnessPrompts,
  issueCategoryRoutes,
  noSearchBackendNotes,
  gameExperiencePillars,
  classPaths,
  worldRouteStops,
  narrativeChapters,
  sampleSessionBeats,
  publicGameArtAssets,
  homeDiscoveryMoments
} from "./fixtures";
import { LocalContentRepository } from "./repository";
import { assertContentFixturesValid } from "./validation";

describe("content fixtures", () => {
  it("are valid and published entries are readable", () => {
    assertContentFixturesValid(contentEntries);
    const repo = new LocalContentRepository(contentEntries);
    expect(repo.list().length).toBeGreaterThan(0);
    expect(repo.bySlug("web-program-control-tower")?.status).toBe("published");
  });

  it("keeps WEB v1.12 content IA hub data route-driven and bounded", () => {
    expect(publicContentHubs.length).toBeGreaterThanOrEqual(4);
    expect(playerEntryQuestions.map((item) => item.recommendedRoute)).toContain("/start");
    expect(publicRouteGroups.flatMap((group) => group.routes)).toContain("/download/trust");
    expect(publicContentHubs.every((hub) => hub.nonClaim.includes("No "))).toBe(true);
  });
});


it("keeps WEB v1.14 player safety/support guidance bounded", () => {
  expect(playerSafetyPrinciples.length).toBeGreaterThanOrEqual(3);
  expect(supportIssuePaths.map((item) => item.whereToRead)).toContain("/support/safety");
  expect(closedTestSupportExpectations.every((item) => item.cannotPromise.includes("No "))).toBe(true);
  expect(communityConductRules.every((item) => item.moderationBoundary.includes("No "))).toBe(true);
});


it("keeps WEB v1.15 accessibility/readability guidance bounded", () => {
  expect(accessibilityReadabilityPrinciples.length).toBeGreaterThanOrEqual(3);
  expect(routeReadabilityChecks.map((item) => item.route)).toContain("/accessibility");
  expect(mobileScannabilityRules.every((item) => item.failureToAvoid.length > 0)).toBe(true);
  expect(focusOrderCheckpoints.map((item) => item.label)).toContain("Skip to main content");
  expect(accessibilityReadabilityPrinciples.every((item) => item.nonClaim.includes("No "))).toBe(true);
});


it("keeps WEB v1.16 performance/copy budget guidance bounded", () => {
  expect(performanceCopyBudgetPrinciples.length).toBeGreaterThanOrEqual(4);
  expect(staticRouteCompositionRules.map((item) => item.route)).toContain("/performance");
  expect(perceivedLoadSignals.every((item) => item.mustAvoid.length > 0)).toBe(true);
  expect(mobileDensityBudgets.every((item) => item.failureToAvoid.length > 0)).toBe(true);
  expect(performanceCopyBudgetPrinciples.every((item) => item.nonClaim.includes("No "))).toBe(true);
});


it("keeps WEB v1.17 route continuity/conversion guidance bounded", () => {
  expect(routeContinuityBridges.length).toBeGreaterThanOrEqual(5);
  expect(routeContinuityBridges.map((item) => item.toRoute)).toContain("/download/trust");
  expect(conversionSafeCtas.every((item) => item.mustNotImply.length > 0)).toBe(true);
  expect(journeyFrictionChecks.map((item) => item.nextBestRoute)).toContain("/journey");
  expect(pageCohesionCheckpoints.flatMap((item) => item.routeSet)).toContain("/support/safety");
  expect(pageCohesionCheckpoints.every((item) => item.blockedClaim.includes("No "))).toBe(true);
});


it("keeps WEB v1.18 player trust/release narrative bounded", () => {
  expect(playerTrustSignals.length).toBeGreaterThanOrEqual(4);
  expect(playerTrustSignals.every((item) => item.forbiddenShortcut.includes("No "))).toBe(true);
  expect(releaseNarrativeStages.map((item) => item.nextSafeRoute)).toContain("/download/trust");
  expect(closedTestReadinessChecks.map((item) => item.check)).toContain("Build artifact and checksum");
  expect(closedTestReadinessChecks.every((item) => item.mustNotPromise.includes("No "))).toBe(true);
  expect(trustJourneyCheckpoints.map((item) => item.route)).toContain("/release");
});


it("keeps WEB v1.19 release readiness hub bounded", () => {
  expect(releaseReadinessHubItems.length).toBeGreaterThanOrEqual(4);
  expect(releaseReadinessHubItems.map((item) => item.route)).toContain("/release/readiness");
  expect(ownerReleaseGates.map((item) => item.gate)).toContain("Release artifact");
  expect(ownerReleaseGates.every((item) => item.mustNotSkip.includes("No "))).toBe(true);
  expect(testerExpectationCopy.every((item) => item.supportBoundary.includes("No "))).toBe(true);
  expect(releaseSurfaceAlignment.map((item) => item.mustLinkTo)).toContain("/release/readiness");
});


it("keeps WEB v1.20 closed tester information pack bounded", () => {
  expect(closedTesterChecklist.length).toBeGreaterThanOrEqual(4);
  expect(closedTesterChecklist.map((item) => item.whereToRead)).toContain("/release/tester-pack");
  expect(closedTesterChecklist.every((item) => item.nonClaim.includes("No "))).toBe(true);
  expect(safeFeedbackTemplates.every((item) => item.privacyBoundary.length > 0)).toBe(true);
  expect(knownLimitationNotes.every((item) => item.mustNotClaim.includes("No "))).toBe(true);
  expect(deviceReportTemplateFields.every((item) => item.doNotCollect.length > 0)).toBe(true);
});


it("keeps WEB v1.21 FAQ search/helpfulness guidance bounded", () => {
  expect(faqDiscoveryGroups.length).toBeGreaterThanOrEqual(5);
  expect(faqDiscoveryGroups.map((item) => item.route)).toContain("/support/help");
  expect(faqDiscoveryGroups.every((item) => item.nonClaim.includes("No "))).toBe(true);
  expect(faqHelpfulnessPrompts.every((item) => item.mustAvoid.length > 0)).toBe(true);
  expect(issueCategoryRoutes.map((item) => item.recommendedRoute)).toContain("/download/trust");
  expect(issueCategoryRoutes.every((item) => item.privacyBoundary.length > 0)).toBe(true);
  expect(noSearchBackendNotes.every((item) => item.notClaimed.includes("No "))).toBe(true);
});


it("keeps WEB v1.22 game experience narrative anchored to the 2D scenario", () => {
  expect(gameExperiencePillars.map((item) => item.id)).toEqual(["social", "action", "progression"]);
  expect(classPaths.map((item) => item.name)).toEqual(["Võ", "Kiếm", "Pháp", "Cơ", "Linh"]);
  expect(worldRouteStops.map((item) => item.name)).toEqual(["Linh Thành", "Đông Môn", "Linh Lâm", "Cổ Di Tích", "Âm Giới"]);
  expect(narrativeChapters.map((item) => item.title)).toEqual([
    "Vết Nứt Đông Môn",
    "Những Cánh Cổng Không Thuộc Về Thế Giới Này",
    "Âm Giới Xâm Lăng"
  ]);
  expect(sampleSessionBeats.length).toBeGreaterThanOrEqual(6);
  expect(sampleSessionBeats.at(-1)?.title).toContain("Linh Thành");
});


it("keeps WEB v1.24 public art provenance and claims bounded", () => {
  expect(publicGameArtAssets).toHaveLength(3);
  expect(publicGameArtAssets.map((item) => item.webStatus)).toEqual([
    "WEB_REFERENCE_APPROVED",
    "WEB_REFERENCE_APPROVED",
    "WEB_REFERENCE_APPROVED"
  ]);
  expect(publicGameArtAssets.some((item) => item.upstreamStatus === "DRAFT_OWNER_REVIEW")).toBe(true);
  expect(publicGameArtAssets.some((item) => item.upstreamStatus === "APPROVED_RUNTIME_ART")).toBe(true);
  expect(publicGameArtAssets.every((item) => item.notFinalArt.includes("không phải"))).toBe(true);
  expect(publicGameArtAssets.some((item) => item.notFinalArt.includes("ảnh gameplay"))).toBe(true);
});

it("keeps WEB v1.25 class/world/story depth complete and balanced", () => {
  expect(classPaths).toHaveLength(5);
  expect(classPaths.every((item) => item.battleRhythm.length > 0)).toBe(true);
  expect(classPaths.every((item) => item.worldLens.length > 0)).toBe(true);
  expect(classPaths.every((item) => item.teamFantasy.length > 0)).toBe(true);
  expect(classPaths.every((item) => item.signatureVerbs.length >= 3)).toBe(true);

  expect(worldRouteStops).toHaveLength(5);
  expect(worldRouteStops.every((item) => item.mood.length > 0)).toBe(true);
  expect(worldRouteStops.every((item) => item.playerPromise.length > 0)).toBe(true);
  expect(worldRouteStops.every((item) => item.signatureActivity.length > 0)).toBe(true);
  expect(worldRouteStops.every((item) => item.narrativePressure.length > 0)).toBe(true);

  expect(narrativeChapters).toHaveLength(3);
  expect(narrativeChapters.every((item) => item.openingImage.length > 0)).toBe(true);
  expect(narrativeChapters.every((item) => item.stakes.length > 0)).toBe(true);
  expect(narrativeChapters.every((item) => item.closingTurn.length > 0)).toBe(true);
});


it("keeps WEB v1.26 homepage discovery references canonical deep content", () => {
  expect(homeDiscoveryMoments).toHaveLength(3);
  expect(homeDiscoveryMoments.map((item) => item.kind)).toEqual(["class", "world", "story"]);
  expect(new Set(homeDiscoveryMoments.map((item) => item.id)).size).toBe(3);
  expect(homeDiscoveryMoments.every((item) => item.href.startsWith("/"))).toBe(true);
  expect(classPaths.some((item) => item.id === homeDiscoveryMoments.find((item) => item.kind === "class")?.sourceRef)).toBe(true);
  expect(worldRouteStops.some((item) => item.name === homeDiscoveryMoments.find((item) => item.kind === "world")?.sourceRef)).toBe(true);
  expect(narrativeChapters.some((item) => item.chapter === homeDiscoveryMoments.find((item) => item.kind === "story")?.sourceRef)).toBe(true);
});
