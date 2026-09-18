import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const ROOT=path.resolve(__dirname);
const facade=path.join(ROOT,"fixtures.ts");
const domains=["product","editorial","support","release","historical"] as const;
const expected=[
 "PROVISIONAL_WEB_FIXTURE","NOT_CANONICAL_BACKEND_CONTRACT","publicHeroStats","worldPillars","playerJourneySteps",
 "publicRoadmapItems","visualPolishItems","responsiveBreakpoints","publicPageFocus","communityPrinciples",
 "worldStoryChapters","beginnerGuideSections","downloadStatusNotes","supportFaqs","communityReadinessSteps",
 "supportTopics","downloadReadiness","contentEntries","downloadBuilds","contentDetailSections","guideDetailSteps",
 "downloadTrustGates","releaseEvidenceRequirements","statusTrustSurfaces","playerSupportExpectations",
 "communityOnboardingPaths","communityFeedbackChannels","roadmapDecisionGates","stagedReleaseMessages",
 "publicContentHubs","playerEntryQuestions","publicRouteGroups","gameplayLoopStages","beginnerExpectations",
 "guideWorldNavigationLinks","gameplayScopeBoundaries","playerSafetyPrinciples","supportIssuePaths",
 "closedTestSupportExpectations","communityConductRules","accessibilityReadabilityPrinciples","routeReadabilityChecks",
 "mobileScannabilityRules","focusOrderCheckpoints","performanceCopyBudgetPrinciples","staticRouteCompositionRules",
 "perceivedLoadSignals","mobileDensityBudgets","routeContinuityBridges","conversionSafeCtas","journeyFrictionChecks",
 "pageCohesionCheckpoints","playerTrustSignals","releaseNarrativeStages","closedTestReadinessChecks",
 "trustJourneyCheckpoints","releaseReadinessHubItems","ownerReleaseGates","testerExpectationCopy",
 "releaseSurfaceAlignment","closedTesterChecklist","safeFeedbackTemplates","knownLimitationNotes",
 "deviceReportTemplateFields","faqDiscoveryGroups","faqHelpfulnessPrompts","issueCategoryRoutes","noSearchBackendNotes",
 "downloadExplainers","statusExplainers","gameExperiencePillars","classPaths","worldRouteStops","narrativeChapters",
 "sampleSessionBeats","publicGameArtAssets","homeDiscoveryMoments"
];

function exportsIn(file:string){
 const text=fs.readFileSync(file,"utf8");
 return [...text.matchAll(/^export const ([A-Za-z0-9_]+)/gm)].map(match=>match[1]);
}

describe("WEB-OPT-22 content fixture modularization v1.299",()=>{
 it("uses a small stable facade over five domain owners",()=>{
  const source=fs.readFileSync(facade,"utf8");
  for(const domain of domains){
   expect(source).toContain(`export * from "./fixtures/${domain}";`);
   expect(fs.existsSync(path.join(ROOT,"fixtures",domain+".ts"))).toBe(true);
  }
  expect(source).not.toMatch(/^export const /m);
  expect(source.split("\n").length).toBeLessThanOrEqual(12);
 });
 it("assigns every existing fixture export to exactly one domain",()=>{
  const owners=domains.flatMap(domain=>exportsIn(path.join(ROOT,"fixtures",domain+".ts")));
  expect(owners).toHaveLength(expected.length);
  expect(new Set(owners).size).toBe(expected.length);
  expect([...owners].sort()).toEqual([...expected].sort());
 });

 it("keeps the package public export facade unchanged",()=>{
  const index=fs.readFileSync(path.join(ROOT,"index.ts"),"utf8");
  expect(index).toContain('} from "./fixtures";');
  for(const name of expected)expect(index).toContain(name);
 });
});
